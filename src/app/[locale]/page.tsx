import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/landing/Hero";
import { TrustStats } from "@/components/landing/TrustStats";
import { LanguageGrid } from "@/components/landing/LanguageGrid";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { GuaranteeBanner } from "@/components/landing/GuaranteeBanner";
import { BecomeTutorCTA } from "@/components/landing/BecomeTutorCTA";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { getHomeStats } from "@/lib/stats";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.home" });

  const meta = pageMetadata({
    title: t("title"),
    description: t("description"),
    locale,
    path: "",
  });

  return {
    ...meta,
    title: { absolute: t("title") },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "meta.home" });
  const { platform, tutorsByLanguage } = await getHomeStats();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "DilUp",
        url: absoluteUrl(`/${locale}`),
        logo: absoluteUrl("/images/dilup-hero-tutor.png"),
        description: t("description"),
      },
      {
        "@type": "WebSite",
        name: "DilUp",
        url: absoluteUrl(`/${locale}`),
        inLanguage: locale,
        potentialAction: {
          "@type": "SearchAction",
          target: `${absoluteUrl(`/${locale}/get-started`)}?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar className="static bg-brand-300" />
      <main className="flex-1">
        <Hero />
        <TrustStats stats={platform} />
        <LanguageGrid tutorsByLanguage={tutorsByLanguage} />
        <HowItWorks />
        <GuaranteeBanner />
        <BecomeTutorCTA />
      </main>
      <Footer />
    </>
  );
}
