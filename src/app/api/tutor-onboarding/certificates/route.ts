import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const MAX_CERTIFICATE_SIZE = 20 * 1024 * 1024;
const ALLOWED_CERTIFICATE_TYPES = new Set(["image/jpeg", "image/png"]);
const CERTIFICATE_BUCKET = "tutor-certificates";
const PRESENT_VALUE = "present";

function extensionForMimeType(type: string) {
  return type === "image/png" ? "png" : "jpg";
}

function textField(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function yearField(formData: FormData, key: string) {
  const value = textField(formData, key);

  if (!/^\d{4}$/.test(value)) {
    return null;
  }

  return Number(value);
}

async function syncTutorCertificateNames(supabase: Awaited<ReturnType<typeof createClient>>, userId: string, tutorId: string) {
  const { data, error } = await supabase
    .from("tutor_certificates")
    .select("certificate_name")
    .eq("user_id", userId)
    .order("created_at", { ascending: true });

  if (error) {
    return error;
  }

  const names = Array.from(
    new Set(
      (data ?? [])
        .map((row) => row.certificate_name.trim())
        .filter(Boolean),
    ),
  );

  const { error: updateError } = await supabase
    .from("tutor_profiles")
    .update({
      certificates: names,
      updated_at: new Date().toISOString(),
    })
    .eq("id", tutorId)
    .eq("user_id", userId);

  return updateError;
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();

  if (!auth.user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("certificate");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "missing_certificate" }, { status: 400 });
  }

  if (!ALLOWED_CERTIFICATE_TYPES.has(file.type)) {
    return NextResponse.json({ error: "invalid_type" }, { status: 415 });
  }

  if (file.size > MAX_CERTIFICATE_SIZE) {
    return NextResponse.json({ error: "too_large" }, { status: 413 });
  }

  const { data: tutorId, error: tutorProfileError } = await supabase.rpc("ensure_tutor_profile");

  if (tutorProfileError || !tutorId) {
    return NextResponse.json({ error: tutorProfileError?.message ?? "missing_tutor_profile" }, { status: 500 });
  }

  const existingCertificateId = textField(formData, "certificateId");
  const certificateName = textField(formData, "certificateName") || file.name;
  const endYearValue = textField(formData, "endYear");
  const isCurrent = endYearValue === PRESENT_VALUE;
  const extension = extensionForMimeType(file.type);
  const objectPath = `${auth.user.id}/certificate-${crypto.randomUUID()}.${extension}`;
  const { data: previousCertificate } = existingCertificateId
    ? await supabase
        .from("tutor_certificates")
        .select("storage_path")
        .eq("id", existingCertificateId)
        .eq("user_id", auth.user.id)
        .maybeSingle()
    : { data: null };

  const { error: uploadError } = await supabase.storage
    .from(CERTIFICATE_BUCKET)
    .upload(objectPath, file, {
      cacheControl: "3600",
      contentType: file.type,
      upsert: false,
    });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  const certificatePayload = {
    user_id: auth.user.id,
    tutor_id: tutorId,
    subject: textField(formData, "subject") || null,
    certificate_name: certificateName,
    description: textField(formData, "description") || null,
    issued_by: textField(formData, "issuedBy") || null,
    start_year: yearField(formData, "startYear"),
    end_year: isCurrent ? null : yearField(formData, "endYear"),
    is_current: isCurrent,
    not_listed: textField(formData, "notListed") === "true",
    storage_bucket: CERTIFICATE_BUCKET,
    storage_path: objectPath,
    original_file_name: file.name,
    mime_type: file.type,
    file_size_bytes: file.size,
    verification_status: "pending",
    updated_at: new Date().toISOString(),
  };

  const query = existingCertificateId
    ? supabase
        .from("tutor_certificates")
        .update(certificatePayload)
        .eq("id", existingCertificateId)
        .eq("user_id", auth.user.id)
        .select("id, original_file_name, storage_path, verification_status")
        .single()
    : supabase
        .from("tutor_certificates")
        .insert(certificatePayload)
        .select("id, original_file_name, storage_path, verification_status")
        .single();
  const { data: certificate, error: certificateError } = await query;

  if (certificateError || !certificate) {
    await supabase.storage.from(CERTIFICATE_BUCKET).remove([objectPath]);
    return NextResponse.json({ error: certificateError?.message ?? "metadata_failed" }, { status: 500 });
  }

  const syncError = await syncTutorCertificateNames(supabase, auth.user.id, tutorId);

  if (syncError) {
    await supabase.storage.from(CERTIFICATE_BUCKET).remove([objectPath]);
    await supabase.from("tutor_certificates").delete().eq("id", certificate.id).eq("user_id", auth.user.id);
    return NextResponse.json({ error: syncError.message }, { status: 500 });
  }

  if (previousCertificate?.storage_path && previousCertificate.storage_path !== objectPath) {
    await supabase.storage.from(CERTIFICATE_BUCKET).remove([previousCertificate.storage_path]);
  }

  return NextResponse.json({
    ok: true,
    id: certificate.id,
    fileName: certificate.original_file_name,
    path: certificate.storage_path,
    status: certificate.verification_status,
  });
}
