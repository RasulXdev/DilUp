"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import type { Provider } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { AppleIcon, FacebookIcon, GoogleIcon } from "@/components/icons/BrandIcons";

const providers = [
  {
    id: "google",
    labelKey: "continueGoogle",
    icon: GoogleIcon,
  },
  {
    id: "facebook",
    labelKey: "continueFacebook",
    icon: FacebookIcon,
  },
  {
    id: "apple",
    labelKey: "continueApple",
    icon: AppleIcon,
  },
] as const;

export function SocialButtons({
  next = "/",
  role = "student",
}: {
  next?: string;
  role?: "student" | "tutor";
}) {
  const t = useTranslations("auth");
  const locale = useLocale();
  const [loadingProvider, setLoadingProvider] = useState<Provider | null>(null);

  async function signInWithProvider(provider: Provider) {
    setLoadingProvider(provider);
    const callbackUrl = new URL(
      `/${locale}/auth/callback`,
      window.location.origin,
    );
    callbackUrl.searchParams.set("next", next);
    callbackUrl.searchParams.set("role", role);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: callbackUrl.toString(),
      },
    });
    if (error) {
      toast.error(error.message);
      setLoadingProvider(null);
    }
  }

  return (
    <div className="space-y-3">
      {providers.map(({ id, labelKey, icon: Icon }) => {
        const loading = loadingProvider === id;

        return (
          <Button
            key={id}
            type="button"
            variant="outline"
            size="lg"
            className="w-full border-ink/80 text-[15px] hover:border-brand-500 hover:bg-brand-50 sm:text-base"
            onClick={() => signInWithProvider(id)}
            disabled={!!loadingProvider}
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Icon className="h-5 w-5" />
            )}
            {t(labelKey)}
          </Button>
        );
      })}
    </div>
  );
}
