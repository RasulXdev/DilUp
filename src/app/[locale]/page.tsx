import { setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/landing/Hero";
import { TrustStats } from "@/components/landing/TrustStats";
import { LanguageGrid } from "@/components/landing/LanguageGrid";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { GuaranteeBanner } from "@/components/landing/GuaranteeBanner";
import { BecomeTutorCTA } from "@/components/landing/BecomeTutorCTA";

export default async function HomePage({
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
        <Hero />
        <TrustStats />
        <LanguageGrid />
        <HowItWorks />
        <GuaranteeBanner />
        <BecomeTutorCTA />
      </main>
      <Footer />
    </>
  );
}
