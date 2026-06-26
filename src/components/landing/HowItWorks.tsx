import { useTranslations } from "next-intl";
import { Search, Video, TrendingUp } from "lucide-react";

export function HowItWorks() {
  const t = useTranslations("howItWorks");

  const steps = [
    {
      icon: Search,
      title: t("step1Title"),
      text: t("step1Text"),
    },
    {
      icon: Video,
      title: t("step2Title"),
      text: t("step2Text"),
    },
    {
      icon: TrendingUp,
      title: t("step3Title"),
      text: t("step3Text"),
    },
  ];

  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="text-center font-display text-3xl font-extrabold text-ink sm:text-4xl">
          {t("title")}
        </h2>

        <ol className="mt-14 grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <li key={step.title} className="relative">
              {i < steps.length - 1 && (
                <span
                  aria-hidden
                  className="absolute left-7 top-14 hidden h-[calc(100%-1rem)] w-px bg-gradient-to-b from-brand-200 to-transparent md:hidden"
                />
              )}
              <div className="flex flex-col items-start">
                <div className="relative">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-brand">
                    <step.icon className="h-6 w-6" />
                  </span>
                  <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border-2 border-surface bg-accent-400 font-display text-sm font-bold text-ink">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 leading-relaxed text-ink-soft">
                  {step.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
