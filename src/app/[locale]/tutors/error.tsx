"use client";

import { useTranslations } from "next-intl";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";

export default function TutorsError({ reset }: { reset: () => void }) {
  const t = useTranslations("tutors");

  return (
    <>
      <Navbar className="static bg-white" />
      <main className="min-h-dvh bg-white">
        <section className="mx-auto flex min-h-[60vh] w-full max-w-2xl flex-col items-center justify-center px-5 text-center">
          <h1 className="text-3xl font-black text-ink">{t("errorTitle")}</h1>
          <p className="mt-3 text-base font-semibold leading-7 text-ink-soft">{t("errorText")}</p>
          <Button type="button" variant="accent" size="lg" className="mt-6" onClick={reset}>
            {t("tryAgain")}
          </Button>
        </section>
      </main>
      <Footer />
    </>
  );
}
