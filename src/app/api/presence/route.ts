import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/** Heartbeat ping: a tutor's client calls this periodically while the site is open to mark them online. */
export async function POST() {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { error } = await supabase
    .from("profiles")
    .update({ is_online: true, last_seen_at: new Date().toISOString() })
    .eq("id", auth.user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

/** Called on tab close / sign-out so the tutor stops showing as online immediately instead of waiting for staleness to expire. */
export async function DELETE() {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { error } = await supabase
    .from("profiles")
    .update({ is_online: false })
    .eq("id", auth.user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
