import { useTranslations } from "next-intl";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Link } from "@/i18n/navigation";
import { getPublicPageCopy } from "@/lib/public-pages";
import { PageHero } from "@/components/public/sections/PageHero";
import { FaqAccordion } from "@/components/public/sections/FaqAccordion";

export function FaqPage({ locale }: { locale: string }) {
  const copy = getPublicPageCopy(locale, "faq");
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

        <FaqAccordion groups={copy.groups} />

        <section className="px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl rounded-3xl border border-brand-100 bg-brand-50/60 p-8 text-center sm:p-10">
            <h2 className="font-display text-2xl font-extrabold text-ink">
              {t("faqStillTitle")}
            </h2>
            <p className="mx-auto mt-3 max-w-md leading-7 text-ink-soft">
              {t("faqStillText")}
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-brand-600 px-6 py-3 text-sm font-bold text-white shadow-brand transition-colors hover:bg-brand-700"
            >
              {t("faqStillCta")}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
