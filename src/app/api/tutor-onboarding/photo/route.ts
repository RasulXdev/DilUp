import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const MAX_PHOTO_SIZE = 5 * 1024 * 1024;
const ALLOWED_PHOTO_TYPES = new Set(["image/jpeg", "image/png"]);
const PHOTO_BUCKET = "tutor-photos";

function extensionForMimeType(type: string) {
  return type === "image/png" ? "png" : "jpg";
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();

  if (!auth.user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("photo");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "missing_photo" }, { status: 400 });
  }

  if (!ALLOWED_PHOTO_TYPES.has(file.type)) {
    return NextResponse.json({ error: "invalid_type" }, { status: 415 });
  }

  if (file.size > MAX_PHOTO_SIZE) {
    return NextResponse.json({ error: "too_large" }, { status: 413 });
  }

  const { error: tutorProfileError } = await supabase.rpc("ensure_tutor_profile");

  if (tutorProfileError) {
    return NextResponse.json({ error: tutorProfileError.message }, { status: 500 });
  }

  const extension = extensionForMimeType(file.type);
  const objectPath = `${auth.user.id}/profile-photo-${Date.now()}.${extension}`;
  const { data: previousPhoto } = await supabase
    .from("tutor_photos")
    .select("storage_path")
    .eq("user_id", auth.user.id)
    .maybeSingle();
  const { error: uploadError } = await supabase.storage
    .from(PHOTO_BUCKET)
    .upload(objectPath, file, {
      cacheControl: "3600",
      contentType: file.type,
      upsert: false,
    });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(PHOTO_BUCKET).getPublicUrl(objectPath);

  const { error: photoMetadataError } = await supabase
    .from("tutor_photos")
    .upsert(
      {
        user_id: auth.user.id,
        storage_bucket: PHOTO_BUCKET,
        storage_path: objectPath,
        public_url: publicUrl,
        mime_type: file.type,
        file_size_bytes: file.size,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" },
    );

  if (photoMetadataError) {
    await supabase.storage.from(PHOTO_BUCKET).remove([objectPath]);
    return NextResponse.json({ error: photoMetadataError.message }, { status: 500 });
  }

  const { error: profileError } = await supabase
    .from("profiles")
    .update({
      avatar_url: publicUrl,
      updated_at: new Date().toISOString(),
    })
    .eq("id", auth.user.id);

  if (profileError) {
    await supabase.storage.from(PHOTO_BUCKET).remove([objectPath]);
    await supabase.from("tutor_photos").delete().eq("storage_path", objectPath);
    return NextResponse.json({ error: profileError.message }, { status: 500 });
  }

  if (previousPhoto?.storage_path && previousPhoto.storage_path !== objectPath) {
    await supabase.storage.from(PHOTO_BUCKET).remove([previousPhoto.storage_path]);
  }

  return NextResponse.json({
    ok: true,
    path: objectPath,
    url: publicUrl,
  });
}
