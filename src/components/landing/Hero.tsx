import { useTranslations } from "next-intl";
import { Star, Sparkles, ArrowRight, Play, BadgeCheck } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative overflow-hidden">
      {/* Atmospheric background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-32 -top-24 h-96 w-96 rounded-full bg-brand-300 blob" />
        <div className="absolute right-0 top-32 h-80 w-80 rounded-full bg-accent-200 blob" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-200 to-transparent" />
        <div className="absolute right-1/3 top-1/2 h-40 w-40 dot-grid opacity-60" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:py-24 lg:px-8">
        {/* Copy */}
        <div className="max-w-xl">
          <span className="animate-rise inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-1.5 text-sm font-semibold text-brand-700">
            <Sparkles className="h-4 w-4 text-accent-500" />
            {t("badge")}
          </span>

          <h1
            className="animate-rise mt-6 font-display text-4xl font-extrabold leading-[1.08] text-ink sm:text-5xl lg:text-6xl"
            style={{ animationDelay: "60ms" }}
          >
            {t.rich("title", {
              mark: (chunks) => (
                <span className="relative whitespace-nowrap text-brand-600">
                  <span className="relative z-10">{chunks}</span>
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-1 -z-0 h-3 rounded-full bg-accent-300/60"
                  />
                </span>
              ),
            })}
          </h1>

          <p
            className="animate-rise mt-6 text-lg leading-relaxed text-ink-soft"
            style={{ animationDelay: "120ms" }}
          >
            {t("subtitle")}
          </p>

          <div
            className="animate-rise mt-8 flex flex-col gap-3 sm:flex-row"
            style={{ animationDelay: "180ms" }}
          >
            <Link
              href="/get-started"
              className={cn(buttonVariants({ variant: "primary", size: "lg" }))}
            >
              {t("ctaPrimary")}
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/how-it-works"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              <Play className="h-4 w-4 text-brand-600" />
              {t("ctaSecondary")}
            </Link>
          </div>

          <div
            className="animate-rise mt-8 flex items-center gap-4"
            style={{ animationDelay: "240ms" }}
          >
            <div className="flex -space-x-3">
              {["#2456e6", "#f98e07", "#16a34a", "#6092fa"].map((c, i) => (
                <span
                  key={i}
                  className="h-9 w-9 rounded-full border-2 border-white"
                  style={{ background: c }}
                  aria-hidden
                />
              ))}
            </div>
            <div className="text-sm">
              <div className="flex items-center gap-1 text-accent-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-0.5 text-ink-soft">{t("trustNote")}</p>
            </div>
          </div>
        </div>

        {/* Visual */}
        <div className="relative mx-auto hidden w-full max-w-md lg:block">
          <div className="absolute inset-0 -z-10 rounded-[2.5rem] bg-gradient-to-br from-brand-600 to-brand-400 blur-2xl opacity-25" />

          {/* Main tutor card */}
          <div className="animate-float rounded-3xl border border-line bg-white p-5 shadow-card">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700" />
                <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white bg-success" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <p className="font-display font-bold text-ink">Leyla M.</p>
                  <BadgeCheck className="h-4 w-4 text-brand-600" />
                  <span aria-hidden>🇬🇧</span>
                </div>
                <p className="text-sm text-muted">English · IELTS</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between rounded-2xl bg-surface px-4 py-3">
              <div className="flex items-center gap-1 text-sm font-semibold text-ink">
                <Star className="h-4 w-4 fill-accent-400 text-accent-400" />
                4.9
                <span className="font-normal text-muted">· 312</span>
              </div>
              <p className="font-display text-lg font-bold text-brand-600">
                25 ₼<span className="text-sm font-medium text-muted">/dərs</span>
              </p>
            </div>
            <div
              className={cn(
                buttonVariants({ variant: "accent", size: "md" }),
                "mt-4 w-full",
              )}
            >
              Trial dərs sifariş et
            </div>
          </div>

          {/* Floating progress pill */}
          <div
            className="animate-float absolute -left-10 top-20 rounded-2xl border border-line bg-white px-4 py-3 shadow-soft"
            style={{ animationDelay: "1.5s" }}
          >
            <p className="text-xs font-medium text-muted">Bu həftə</p>
            <p className="font-display text-lg font-bold text-success">
              +3 dərs
            </p>
          </div>

          {/* Floating language chip */}
          <div
            className="animate-float absolute -bottom-6 right-2 flex items-center gap-2 rounded-2xl border border-line bg-white px-4 py-3 shadow-soft"
            style={{ animationDelay: "0.8s" }}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-50 text-base">
              🇬🇧
            </span>
            <div>
              <p className="text-xs font-semibold text-ink">English</p>
              <p className="text-[11px] text-muted">B2 · Upper-Int.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
