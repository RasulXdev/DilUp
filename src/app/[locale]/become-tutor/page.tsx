import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BecomeTutorCTA } from "@/components/landing/BecomeTutorCTA";

export const metadata: Metadata = { title: "Become a tutor" };

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
