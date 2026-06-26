import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight, BadgeCheck, Play, ShieldCheck, Star } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative -mt-px overflow-hidden bg-brand-300">
      <div aria-hidden className="absolute inset-0">
        <div className="absolute right-0 top-20 h-[72%] w-1/2 bg-[radial-gradient(circle_at_70%_35%,rgba(36,86,230,0.13),transparent_48%)]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pb-12 pt-9 sm:px-6 lg:grid-cols-[0.86fr_1.14fr] lg:px-8 lg:pb-14 lg:pt-10">
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/75 px-4 py-2 text-sm font-bold text-brand-700 shadow-sm">
            <ShieldCheck className="h-4 w-4" />
            {t("badge")}
          </span>

          <h1 className="mt-7 font-display text-5xl font-extrabold leading-[0.98] text-ink sm:text-6xl lg:text-7xl">
            {t.rich("title", {
              mark: (chunks) => (
                <span className="text-brand-700">{chunks}</span>
              ),
            })}
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-soft">
            {t("subtitle")}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/get-started"
              className={cn(
                buttonVariants({ variant: "primary", size: "lg" }),
                "h-14 px-8 text-base shadow-brand",
              )}
            >
              {t("ctaPrimary")}
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/how-it-works"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-14 border-brand-200 bg-white/70 px-7 text-base hover:bg-white",
              )}
            >
              <Play className="h-4 w-4 text-brand-600" />
              {t("ctaSecondary")}
            </Link>
          </div>

          <div className="mt-8 flex items-center gap-3 text-sm text-ink-soft">
            <div className="flex items-center gap-1 text-accent-500">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <span className="font-semibold text-ink">{t("trustNote")}</span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-3xl">
          <div
            aria-hidden
            className="absolute -right-10 top-12 h-[88%] w-[92%] overflow-hidden rounded-[1.6rem] border border-white/45 bg-white shadow-soft"
          >
            <Image
              src="/images/dilup-hero-tutor.png"
              alt=""
              fill
              sizes="44vw"
              className="object-cover object-center"
            />
          </div>
          <div
            aria-hidden
            className="absolute -right-20 top-24 h-[76%] w-[82%] overflow-hidden rounded-[1.4rem] border border-white/35 bg-white shadow-soft"
          >
            <Image
              src="/images/dilup-hero-tutor.png"
              alt=""
              fill
              sizes="38vw"
              className="object-cover object-center"
            />
          </div>

          <div className="relative z-10 overflow-hidden rounded-[2rem] border border-white/70 bg-white shadow-card">
            <Image
              src="/images/dilup-hero-tutor.png"
              alt={t("imageAlt")}
              width={1792}
              height={1024}
              priority
              className="aspect-[16/10] h-auto w-full object-cover"
            />
            <div className="absolute left-4 top-4 flex items-center gap-2 rounded-2xl border border-white/70 bg-white/85 px-3 py-2 shadow-soft backdrop-blur-md sm:left-5 sm:top-5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                <BadgeCheck className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-bold text-ink">{t("liveBadgeTitle")}</p>
                <p className="text-[11px] font-medium text-muted">
                  {t("liveBadgeText")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
