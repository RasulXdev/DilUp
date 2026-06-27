"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import { createClient } from "@/lib/supabase/client";

function isQuickSetupResponse(response: { free_text: string | null }) {
  return (
    response.free_text === "quick_setup_completed" ||
    response.free_text === "quick_setup_skipped"
  );
}

export function OnboardingGate({
  children,
  nextPath = "/tutors",
}: {
  children: ReactNode;
  nextPath?: string;
}) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let active = true;

    async function checkExistingOnboarding() {
      const localAnswers = window.localStorage.getItem("dilup_onboarding_answers");
      if (localAnswers) {
        router.replace(nextPath);
        return;
      }

      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data } = await supabase
          .from("onboarding_responses")
          .select("id, free_text")
          .eq("user_id", user.id)
          .limit(20);

        if (data?.some((response) => !isQuickSetupResponse(response))) {
          router.replace(nextPath);
          return;
        }
      }

      if (active) setChecking(false);
    }

    void checkExistingOnboarding();

    return () => {
      active = false;
    };
  }, [nextPath, router]);

  if (checking) {
    return (
      <main className="flex min-h-dvh items-center justify-center bg-brand-50">
        <Loader2 className="h-8 w-8 animate-spin text-brand-700" />
      </main>
    );
  }

  return children;
}
