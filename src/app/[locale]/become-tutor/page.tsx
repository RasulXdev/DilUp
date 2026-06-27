import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BecomeTutorCTA } from "@/components/landing/BecomeTutorCTA";
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

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <BecomeTutorCTA />
      </main>
      <Footer />
    </>
  );
}
