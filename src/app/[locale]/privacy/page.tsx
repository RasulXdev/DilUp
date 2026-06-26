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
  const copy = getPublicPageCopy(locale, "privacy");

  return pageMetadata({
    title: copy.title,
    description: copy.description,
    locale,
    path: "/privacy",
  });
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PublicInfoPage locale={locale} slug="privacy" />;
}
