import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { TutorOnboardingWizard } from "@/components/tutor-onboarding/TutorOnboardingWizard";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.tutorOnboarding" });

  return pageMetadata({
    title: t("title"),
    description: t("description"),
    locale,
    path: "/tutor-onboarding",
  });
}

export default async function TutorOnboardingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <TutorOnboardingWizard />;
}
