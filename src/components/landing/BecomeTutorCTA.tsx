import { useTranslations } from "next-intl";
import { Check, ArrowRight, Wallet, Clock, GraduationCap } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function BecomeTutorCTA() {
  const t = useTranslations("becomeTutor");

  const bullets = [
    { icon: Wallet, text: t("bullet1") },
    { icon: Clock, text: t("bullet2") },
    { icon: GraduationCap, text: t("bullet3") },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        {/* Visual */}
        <div className="relative order-last lg:order-first">
          <div className="relative rounded-3xl border border-line bg-gradient-to-br from-brand-50 to-surface p-8">
            <div className="rounded-2xl border border-line bg-white p-6 shadow-card">
              <p className="text-sm font-medium text-muted">
                {t("bullet1")}
              </p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-display text-4xl font-extrabold text-ink">
                  30 ₼
                </span>
                <span className="text-muted">/ dərs</span>
              </div>
              <div className="mt-5 space-y-3">
                {bullets.map((b) => (
                  <div key={b.text} className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                      <b.icon className="h-4.5 w-4.5" />
                    </span>
                    <span className="text-sm font-medium text-ink">
                      {b.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <span
            aria-hidden
            className="animate-float absolute -right-4 -top-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-400 font-display text-2xl font-extrabold text-ink shadow-accent"
          >
            ₼
          </span>
        </div>

        {/* Copy */}
        <div className="max-w-xl">
          <h2 className="font-display text-3xl font-extrabold text-ink sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            {t("text")}
          </p>
          <ul className="mt-6 space-y-3">
            {bullets.map((b) => (
              <li key={b.text} className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-success/10 text-success">
                  <Check className="h-4 w-4" />
                </span>
                <span className="text-ink">{b.text}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/register/tutor"
              className={cn(buttonVariants({ variant: "primary", size: "lg" }))}
            >
              {t("cta")}
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/how-it-works"
              className={cn(buttonVariants({ variant: "ghost", size: "lg" }))}
            >
              {t("secondary")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
