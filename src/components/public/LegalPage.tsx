import { useTranslations } from "next-intl";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { getPublicPageCopy } from "@/lib/public-pages";
import { PageHero } from "@/components/public/sections/PageHero";
import { LegalLayout } from "@/components/public/sections/LegalLayout";

export function LegalPage({
  locale,
  slug,
}: {
  locale: string;
  slug: "privacy" | "terms";
}) {
  const copy = getPublicPageCopy(locale, slug);
  const t = useTranslations("publicPages");

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-white">
        <PageHero
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.description}
        />
        <LegalLayout
          updated={copy.updated}
          tocLabel={t("tocLabel")}
          sections={copy.sections}
        />
      </main>
      <Footer />
    </>
  );
}
