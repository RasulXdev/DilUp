import { setRequestLocale } from "next-intl/server";
import { Logo } from "@/components/shared/Logo";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
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

  return (
    <div className="grid min-h-dvh lg:grid-cols-[1.05fr_1fr]">
      <AuthBrandPanel />
      <div className="relative flex items-center justify-center px-5 py-16 sm:px-10">
        <div className="absolute left-5 top-5 sm:left-8 sm:top-7">
          <Logo />
        </div>
        <LanguageSwitcher className="absolute right-5 top-5 sm:right-8 sm:top-7" />
        <div className="w-full max-w-md animate-rise">{children}</div>
      </div>
    </div>
  );
}
