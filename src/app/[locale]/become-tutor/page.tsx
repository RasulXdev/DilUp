import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { BecomeTutorPage as BecomeTutorBody } from "@/components/public/BecomeTutorPage";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.becomeTutor" });

  return pageMetadata({
    title: t("title"),
    description: t("description"),
    locale,
    path: "/become-tutor",
  });
}

export default async function BecomeTutorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <BecomeTutorBody locale={locale} />;
}
