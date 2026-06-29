import { setRequestLocale } from "next-intl/server";
import { redirect } from "@/i18n/navigation";
import { createClient } from "@/lib/supabase/server";
import { resolveUserHome } from "@/lib/auth/redirects";
import { Logo } from "@/components/shared/Logo";
import { LocaleCurrencySwitcher } from "@/components/shared/LocaleCurrencySwitcher";
import { AuthBrandPanel } from "@/components/auth/AuthBrandPanel";

export default async function AuthLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (data.user) {
    const home = await resolveUserHome(supabase, data.user.id);
    redirect({ href: home, locale });
  }

  return (
    <div className="grid min-h-dvh lg:grid-cols-[1.05fr_1fr]">
      <AuthBrandPanel />
      <div className="relative flex items-center justify-start px-5 py-16 sm:justify-center sm:px-10">
        <div className="absolute left-5 top-5 sm:left-8 sm:top-7">
          <Logo />
        </div>
        <LocaleCurrencySwitcher className="absolute right-5 top-5 sm:right-8 sm:top-7" />
        <div className="w-full min-w-0 max-w-[350px] animate-rise sm:max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}
