"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { GoogleIcon } from "@/components/icons/BrandIcons";

export function SocialButtons({
  next = "/",
  role = "student",
}: {
  next?: string;
  role?: "student" | "tutor";
}) {
  const t = useTranslations("auth");
  const locale = useLocale();
  const [loading, setLoading] = useState(false);

  async function signInWithGoogle() {
    setLoading(true);
    const callbackUrl = new URL(
      `/${locale}/auth/callback`,
      window.location.origin,
    );
    callbackUrl.searchParams.set("next", next);
    callbackUrl.searchParams.set("role", role);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: callbackUrl.toString(),
      },
    });
    if (error) {
      toast.error(error.message);
      setLoading(false);
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="lg"
      className="w-full"
      onClick={signInWithGoogle}
      disabled={loading}
    >
      {loading ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        <GoogleIcon className="h-5 w-5" />
      )}
      {t("continueGoogle")}
    </Button>
  );
}
