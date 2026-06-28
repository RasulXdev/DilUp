import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/types/database";

export type UserRole = Database["public"]["Enums"]["user_role"];

const ROLE_HOME: Record<UserRole, string> = {
  student: "/tutors",
  tutor: "/tutors",
  admin: "/tutors",
};

export function getRoleHome(role?: UserRole | null) {
  return ROLE_HOME[role ?? "student"];
}

export function isSafeRedirectPath(path: string | null) {
  return !!path && path.startsWith("/") && !path.startsWith("//");
}

export async function resolveUserHome(
  supabase: SupabaseClient<Database>,
  userId: string,
) {
  const { data } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .maybeSingle();

  return getRoleHome(data?.role);
}

export async function hasCompletedFullOnboarding(
  supabase: SupabaseClient<Database>,
  userId: string,
) {
  const { data } = await supabase
    .from("full_onboarding_responses")
    .select("id")
    .eq("user_id", userId)
    .limit(1)
    .maybeSingle();

  return Boolean(data?.id);
}

export async function hasCompletedFullOnboardingForSubject(
  supabase: SupabaseClient<Database>,
  userId: string,
  subject: string,
) {
  const { data } = await supabase
    .from("full_onboarding_responses")
    .select("id")
    .eq("user_id", userId)
    .like("session_id", `full-${subject}-%`)
    .limit(1)
    .maybeSingle();

  return Boolean(data?.id);
}

/** Resolves where a "find tutors" / "book" link should go: straight to `dest`
 * if the user is a tutor/admin or already finished the long quiz, otherwise
 * through `/get-started` first so they only ever see it once. */
export async function resolveTutorsGateHref(
  supabase: SupabaseClient<Database>,
  userId: string | null,
  dest: string,
) {
  if (!userId) return `/get-started?next=${encodeURIComponent(dest)}`;

  const { data } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .maybeSingle();
  if ((data?.role ?? "student") !== "student") return dest;

  const completed = await hasCompletedFullOnboarding(supabase, userId);
  return completed ? dest : `/get-started?next=${encodeURIComponent(dest)}`;
}

export async function resolvePostAuthPath(
  supabase: SupabaseClient<Database>,
  userId: string,
) {
  const { data } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .maybeSingle();
  const role = data?.role ?? "student";

  return getRoleHome(role);
}
