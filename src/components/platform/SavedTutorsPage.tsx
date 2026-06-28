"use client";

import Image from "next/image";
import { Heart, Search, Star, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { useCurrency } from "@/components/shared/CurrencyProvider";
import { Button, buttonVariants } from "@/components/ui/button";
import type { Tutor } from "@/lib/tutors";
import { useSavedTutors } from "@/lib/tutors/useSavedTutors";
import { cn } from "@/lib/utils";

export function SavedTutorsPage({ tutors }: { tutors: Tutor[] }) {
  const t = useTranslations("platform.savedTutors");
  const labels = useTranslations("tutors");
  const { format } = useCurrency();
  const { savedIds, toggleSaved } = useSavedTutors();
  const savedTutors = tutors.filter((tutor) => savedIds.includes(tutor.id));

  return (
    <>
      <Navbar />
      <main className="min-h-dvh bg-white">
        <section className="mx-auto w-full max-w-[1120px] px-5 py-10 sm:px-7 lg:px-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-black text-brand-700">{t("eyebrow")}</p>
              <h1 className="mt-2 text-3xl font-black tracking-normal text-ink sm:text-5xl">{t("title")}</h1>
              <p className="mt-3 max-w-2xl text-base font-semibold leading-7 text-ink-soft">
                {t("subtitle", { count: savedTutors.length })}
              </p>
            </div>
            <Link href="/tutors" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full sm:w-auto")}>
              <Search className="h-5 w-5" />
              {t("findMore")}
            </Link>
          </div>

          {savedTutors.length === 0 ? (
            <div className="mt-10 rounded-xl border border-dashed border-line bg-surface p-10 text-center">
              <Heart className="mx-auto h-10 w-10 text-brand-700" />
              <h2 className="mt-4 text-2xl font-black text-ink">{t("emptyTitle")}</h2>
              <p className="mx-auto mt-2 max-w-md text-sm font-semibold leading-6 text-ink-soft">{t("emptyText")}</p>
              <Link href="/tutors" className={cn(buttonVariants({ variant: "accent", size: "lg" }), "mt-6")}>
                {t("browseTutors")}
              </Link>
            </div>
          ) : (
            <div className="mt-8 grid gap-4">
              {savedTutors.map((tutor) => (
                <article key={tutor.id} className="grid gap-5 rounded-xl border border-line bg-white p-4 shadow-soft sm:grid-cols-[160px_minmax(0,1fr)_220px]">
                  <Link href={`/tutors/${tutor.id}`} className="relative aspect-[4/3] overflow-hidden rounded-lg bg-surface sm:aspect-square">
                    <Image src={tutor.photo} alt={t("photoAlt", { name: tutor.name })} fill className="object-cover" sizes="180px" />
                  </Link>
                  <div className="min-w-0">
                    <Link href={`/tutors/${tutor.id}`} className="text-2xl font-black text-ink hover:text-brand-700">
                      {tutor.name} {tutor.flag}
                    </Link>
                    <p className="mt-2 line-clamp-2 text-base font-semibold leading-7 text-ink">
                      <span className="font-black">{tutor.source === "db" ? tutor.headline : labels(`copy.${tutor.headline}`)}</span>{" "}
                      <span className="text-ink-soft">{tutor.source === "db" ? tutor.bio : labels(`copy.${tutor.id}.bio`)}</span>
                    </p>
                    <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-sm font-black text-amber-800">
                      <Star className="h-4 w-4 fill-current" />
                      {t("rating", { rating: tutor.rating, count: tutor.reviewsCount })}
                    </p>
                  </div>
                  <div className="flex flex-col justify-between gap-4">
                    <p className="text-2xl font-black text-ink">
                      {format(tutor.price)} <span className="text-sm font-semibold text-muted">{t("perLesson")}</span>
                    </p>
                    <div className="grid gap-2">
                      <Link href={`/tutors/${tutor.id}`} className={cn(buttonVariants({ variant: "accent", size: "lg" }), "w-full")}>
                        {t("viewProfile")}
                      </Link>
                      <Button type="button" variant="outline" size="lg" onClick={() => toggleSaved(tutor.id)}>
                        <Trash2 className="h-5 w-5" />
                        {t("remove")}
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
