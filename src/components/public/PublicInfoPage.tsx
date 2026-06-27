import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Link } from "@/i18n/navigation";
import type { PublicPageSlug } from "@/lib/public-pages";
import { getPublicPageCopy } from "@/lib/public-pages";

export function PublicInfoPage({
  locale,
  slug,
}: {
  locale: string;
  slug: PublicPageSlug;
}) {
  const copy = getPublicPageCopy(locale, slug);
  const t = useTranslations("publicCta");

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-white">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-line bg-brand-50/70">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
          >
            <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-brand-200/45 blur-3xl" />
            <div className="absolute -right-16 top-10 h-64 w-64 rounded-full bg-accent-200/40 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/80 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-brand-700 shadow-sm backdrop-blur">
              {copy.eyebrow}
            </span>
            <h1 className="mt-5 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] text-ink sm:text-6xl">
              {copy.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-soft">
              {copy.description}
            </p>

            {copy.stats && (
              <dl className="mt-12 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-3">
                {copy.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-brand-100 bg-white/85 p-5 shadow-soft backdrop-blur"
                  >
                    <dt className="font-display text-3xl font-extrabold text-brand-700">
                      {stat.value}
                    </dt>
                    <dd className="mt-1.5 text-sm leading-snug text-ink-soft">
                      {stat.label}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </section>

        {/* Content sections */}
        <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
            {copy.sections.map((section) => (
              <article
                key={section.title}
                className="group relative overflow-hidden rounded-2xl border border-line bg-white p-7 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:border-brand-200 hover:shadow-card"
              >
                <span className="block h-1.5 w-10 rounded-full bg-accent-400 transition-all duration-200 group-hover:w-16" />
                <h2 className="mt-5 font-display text-xl font-extrabold text-ink">
                  {section.title}
                </h2>
                <p className="mt-3 leading-7 text-ink-soft">{section.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* CTA band */}
        <section className="px-4 pb-20 sm:px-6 lg:px-8">
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-brand-600 px-6 py-14 text-center shadow-brand sm:px-12 sm:py-16">
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <div className="absolute -left-12 -top-12 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
              <div className="absolute -bottom-16 -right-10 h-64 w-64 rounded-full bg-accent-400/20 blur-2xl" />
            </div>

            <div className="relative">
              <h2 className="mx-auto max-w-2xl font-display text-3xl font-extrabold text-white sm:text-4xl">
                {t("title")}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-white/80">
                {t("subtitle")}
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/get-started"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-brand-700 shadow-sm transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-600"
                >
                  {t("primary")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/become-tutor"
                  className="inline-flex items-center rounded-full border border-white/40 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-600"
                >
                  {t("secondary")}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
