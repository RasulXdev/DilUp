import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight, ShieldCheck, UserPlus, CalendarClock } from "lucide-react";
import { Link } from "@/i18n/navigation";

export function BecomeTutorCTA() {
  const t = useTranslations("becomeTutor");

  const trust = [
    { icon: ShieldCheck, text: t("trust1") },
    { icon: UserPlus, text: t("trust2") },
    { icon: CalendarClock, text: t("trust3") },
  ];

  return (
    <section className="relative mt-10 overflow-hidden rounded-t-[2.5rem] bg-brand-700 sm:mt-14">
      {/* Decorative glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -right-20 -top-28 h-80 w-80 rounded-full bg-accent-400/15 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,360px)_1fr] lg:gap-16 lg:px-8 lg:py-20">
        {/* Photo */}
        <div className="relative mx-auto w-full max-w-[320px] lg:mx-0">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-brand-600 shadow-card">
            <Image
              src="/images/become-tutor-portrait.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 360px, 320px"
              className="object-cover"
            />
          </div>
          {/* Floating manat badge */}
          <span
            aria-hidden
            className="animate-float absolute -left-3 -top-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-400 font-display text-2xl font-extrabold text-ink shadow-accent"
          >
            ₼
          </span>
        </div>

        {/* Copy */}
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-400/15 px-3 py-1 text-xs font-bold text-accent-200">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-400" />
            {t("badge")}
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold leading-[1.08] text-white sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-white/75">
            {t("text")}
          </p>

          {/* Inline price stat */}
          <div className="mt-6 flex items-center gap-3">
            <span className="font-display text-4xl font-extrabold text-accent-300">
              {t("priceValue")}
            </span>
            <div className="text-sm leading-tight text-white/70">
              <span className="block">{t("priceUnit")}</span>
              <span className="block">{t("priceLabel")}</span>
            </div>
          </div>

          <ul className="mt-6 space-y-3">
            {trust.map((item) => (
              <li key={item.text} className="flex items-center gap-3 text-white">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-accent-300">
                  <item.icon className="h-4 w-4" />
                </span>
                <span className="font-medium">{item.text}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/register/tutor"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-accent-400 px-7 text-base font-semibold text-ink shadow-accent transition-colors hover:bg-accent-300"
            >
              {t("cta")}
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/how-it-works"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/30 px-6 text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              {t("secondary")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
