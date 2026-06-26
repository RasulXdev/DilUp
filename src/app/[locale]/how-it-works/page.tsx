import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PublicInfoPage } from "@/components/public/PublicInfoPage";
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
    title: copy.title,
    description: copy.description,
    locale,
    path: "/how-it-works",
  });
}

export default async function HowItWorksPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PublicInfoPage locale={locale} slug="how-it-works" />;
}
