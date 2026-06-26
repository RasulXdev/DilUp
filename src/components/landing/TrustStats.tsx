import { useTranslations } from "next-intl";

export function TrustStats() {
  const t = useTranslations("trustStats");

  const stats = [
    { value: "1,200+", label: t("tutors") },
    { value: "48k", label: t("reviews") },
    { value: "9", label: t("languages") },
    { value: "30+", label: t("countries") },
    { value: "4.9★", label: t("rating") },
  ];

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold uppercase tracking-wide text-muted">
          {t("title")}
        </p>
        <dl className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block font-display text-3xl font-extrabold text-brand-600 sm:text-4xl">
                  {s.value}
                </span>
                <span className="mt-1 block text-sm text-ink-soft">
                  {s.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
