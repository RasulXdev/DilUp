import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { QuickSetup } from "@/components/onboarding/QuickSetup";
import { hasCompletedStudentSetup } from "@/lib/auth/redirects";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Setup",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function SetupPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect(`/${locale}/login?next=/setup`);

  const completed = await hasCompletedStudentSetup(supabase, user.id);
  if (completed) redirect(`/${locale}/dashboard`);

  return <QuickSetup />;
}
