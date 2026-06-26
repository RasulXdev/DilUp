import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/types/database";

export type UserRole = Database["public"]["Enums"]["user_role"];

const ROLE_HOME: Record<UserRole, string> = {
  student: "/dashboard",
  tutor: "/tutor-dashboard",
  admin: "/admin",
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
