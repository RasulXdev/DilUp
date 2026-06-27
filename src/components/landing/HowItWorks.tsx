import { useTranslations } from "next-intl";
import { HowItWorksMock } from "@/components/public/sections/HowItWorksMock";

export function HowItWorks() {
  const t = useTranslations("howItWorks");

  const steps = [
    {
      title: t("step1Title"),
      text: t("step1Text"),
      badge: "bg-brand-600 text-white",
    },
    {
      title: t("step2Title"),
      text: t("step2Text"),
      badge: "bg-accent-400 text-ink",
    },
    {
      title: t("step3Title"),
      text: t("step3Text"),
      badge: "bg-success text-white",
    },
  ];

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <h2 className="font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            {t.rich("title", {
              mark: (chunks) => <span className="text-brand-600">{chunks}</span>,
            })}
          </h2>
        </div>

        <ol className="mt-14 grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <li
              key={step.title}
              className="flex h-full flex-col rounded-3xl border border-brand-100 bg-white p-7 shadow-soft"
            >
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-xl font-display text-base font-bold ${step.badge}`}
              >
                {i + 1}
              </span>

              <h3 className="mt-5 min-h-[3.5rem] font-display text-xl font-bold text-ink">
                {step.title}
              </h3>
              <p className="mt-2 min-h-[5.25rem] leading-relaxed text-ink-soft">
                {step.text}
              </p>

              <div className="mt-auto pt-6">
                <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl bg-brand-50">
                  <HowItWorksMock index={i} kind="student" />
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
