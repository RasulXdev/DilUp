import { NextResponse } from "next/server";
import { isSafeRedirectPath, resolvePostAuthPath, type UserRole } from "@/lib/auth/redirects";
import { createClient } from "@/lib/supabase/server";

/** OAuth / magic-link / password-reset code exchange. */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale } = await params;
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next");
  const roleParam = searchParams.get("role");

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const intendedRole = normalizeRole(
        roleParam ?? user?.user_metadata?.intended_role,
      );

      if (user && intendedRole) {
        await supabase
          .from("profiles")
          .update({
            role: intendedRole,
            full_name:
              user.user_metadata?.full_name ??
              user.user_metadata?.name ??
              user.email?.split("@")[0] ??
              "DilUp user",
            avatar_url: user.user_metadata?.avatar_url ?? null,
          })
          .eq("id", user.id);

        if (intendedRole === "tutor") {
          await supabase.from("tutor_profiles").upsert(
            {
              user_id: user.id,
              price_per_lesson: 20,
              trial_price_per_lesson: 10,
              headline: "DilUp tutor",
              about: "Ready to teach live language lessons on DilUp.",
            },
            { onConflict: "user_id" },
          );
        }

        // Link the anonymous onboarding answers carried through signup metadata,
        // so a freshly confirmed user is not pushed back through setup.
        const onboardingSession = user.user_metadata?.onboarding_session;
        if (typeof onboardingSession === "string" && onboardingSession) {
          await supabase.rpc("claim_onboarding_session" as never, {
            p_session_id: onboardingSession,
          } as never);
        }
      }

      const fallback = user ? await resolvePostAuthPath(supabase, user.id) : "/";
      const path = isSafeRedirectPath(next) && next !== "/" ? next : fallback;
      return NextResponse.redirect(`${origin}/${locale}${path}`);
    }
  }

  return NextResponse.redirect(`${origin}/${locale}/login?error=auth`);
}

function normalizeRole(role: unknown): UserRole | null {
  return role === "student" || role === "tutor" || role === "admin"
    ? role
    : null;
}
