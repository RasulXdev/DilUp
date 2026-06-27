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

export async function hasCompletedStudentSetup(
  supabase: SupabaseClient<Database>,
  userId: string,
) {
  const { data } = await supabase
    .from("onboarding_responses")
    .select("id")
    .eq("user_id", userId)
    .limit(1)
    .maybeSingle();

  return Boolean(data?.id);
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

  if (role === "student") {
    const completedSetup = await hasCompletedStudentSetup(supabase, userId);
    if (!completedSetup) return "/setup";
  }

  return getRoleHome(role);
}
