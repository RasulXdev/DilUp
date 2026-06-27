import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { BecomeTutorCTA } from "@/components/landing/BecomeTutorCTA";
import { getBecomeTutorContent } from "@/lib/become-tutor";
import { PageHero } from "@/components/public/sections/PageHero";
import { ValueGrid } from "@/components/public/sections/ValueGrid";
import { FaqAccordion } from "@/components/public/sections/FaqAccordion";

export function BecomeTutorPage({ locale }: { locale: string }) {
  const copy = getBecomeTutorContent(locale);

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-white">
        <PageHero
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.description}
          image={copy.heroImage}
          imageAlt={copy.title}
          stats={copy.stats}
        />

        {/* Stepper */}
        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-12 max-w-2xl font-display text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
              {copy.stepsTitle}
            </h2>
            <ol className="grid gap-6 md:grid-cols-3">
              {copy.steps.map((step, i) => (
                <li
                  key={step.title}
                  className="relative rounded-3xl border border-brand-100 bg-surface p-7"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-600 font-display text-lg font-extrabold text-white shadow-brand">
                    {i + 1}
                  </span>
                  <h3 className="mt-5 font-display text-xl font-bold text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 leading-7 text-ink-soft">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <ValueGrid
          eyebrow={copy.featuresEyebrow}
          title={copy.featuresTitle}
          items={copy.features}
        />

        {/* Earnings explainer */}
        <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-4xl rounded-3xl border border-brand-100 bg-brand-50/60 p-8 sm:p-12">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-600">
              {copy.earnings.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
              {copy.earnings.title}
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-ink-soft">
              {copy.earnings.body}
            </p>
            <div className="mt-6 rounded-2xl border border-brand-200 bg-white p-5 font-display text-lg font-bold text-brand-700 shadow-soft">
              {copy.earnings.example}
            </div>
            <p className="mt-3 text-sm text-muted">{copy.earnings.note}</p>
          </div>
        </section>

        <FaqAccordion groups={[{ items: copy.faq }]} />

        <BecomeTutorCTA />
      </main>
      <Footer />
    </>
  );
}
