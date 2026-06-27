import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { FaqPage as FaqPageBody } from "@/components/public/FaqPage";
import { getPublicPageCopy } from "@/lib/public-pages";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const copy = getPublicPageCopy(locale, "faq");

  return pageMetadata({
    title: copy.title,
    description: copy.description,
    locale,
    path: "/faq",
  });
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <FaqPageBody locale={locale} />;
}
