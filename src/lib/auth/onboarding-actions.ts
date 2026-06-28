"use server";

import { createClient } from "@/lib/supabase/server";

/**
 * Links anonymous onboarding quiz answers (saved with a localStorage session id
 * before the user had an account) to the freshly authenticated user.
 *
 * Uses a SECURITY DEFINER RPC (`claim_onboarding_session`) that only claims rows
 * still unowned (`user_id is null`) and assigns them to `auth.uid()`, so it
 * cannot steal another account's responses and needs no service-role key.
 */
export async function claimOnboardingSession(sessionId: string) {
  const trimmed = sessionId?.trim();
  if (!trimmed) return;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  // Cast: the RPC is defined in a migration and not in the generated types.
  await supabase.rpc("claim_onboarding_session" as never, {
    p_session_id: trimmed,
  } as never);
}
