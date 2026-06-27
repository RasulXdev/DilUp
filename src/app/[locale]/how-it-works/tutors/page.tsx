import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { TutorHowItWorksPage as TutorHowItWorksBody } from "@/components/public/HowItWorksPage";
import { getPublicPageCopy } from "@/lib/public-pages";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const copy = getPublicPageCopy(locale, "how-it-works");

  return pageMetadata({
    title: copy.tutorTitle,
    description: copy.tutorDescription,
    locale,
    path: "/how-it-works/tutors",
  });
}

export default async function TutorHowItWorksPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <TutorHowItWorksBody locale={locale} />;
}
