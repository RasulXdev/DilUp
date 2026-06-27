import { useTranslations } from "next-intl";
import type { PlatformStats } from "@/lib/stats";

const compact = new Intl.NumberFormat("en-US");

export function TrustStats({ stats }: { stats: PlatformStats }) {
  const t = useTranslations("trustStats");

  // Real marketplace metrics — each appears once it has actual data.
  const realItems: { value: string; label: string }[] = [];
  if (stats.tutors > 0) {
    realItems.push({ value: `${compact.format(stats.tutors)}+`, label: t("tutors") });
  }
  if (stats.fiveStarReviews > 0) {
    realItems.push({
      value: `${compact.format(stats.fiveStarReviews)}+`,
      label: t("reviews"),
    });
  }
  if (stats.countries > 0) {
    realItems.push({ value: `${stats.countries}+`, label: t("countries") });
  }
  if (stats.averageRating != null) {
    realItems.push({ value: `${stats.averageRating}★`, label: t("rating") });
  }

  // Honest, always-true product facts — shown only until real numbers exist,
  // then they step aside so the band reads as live marketplace metrics.
  const fillerItems = [
    { value: "1:1", label: t("liveLabel") },
    { value: "3", label: t("interfaceLabel") },
    { value: "0", label: t("payLabel") },
  ];

  const items = realItems.length > 0 ? realItems : fillerItems;

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold uppercase tracking-wide text-muted">
          {t("title")}
        </p>
        <dl className="mt-8 flex flex-wrap justify-center gap-x-10 gap-y-6 sm:gap-x-16">
          {items.map((s) => (
            <div key={s.label} className="min-w-24 text-center">
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
