import Image from "next/image";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { FaqAccordion } from "@/components/public/sections/FaqAccordion";
import { Link } from "@/i18n/navigation";
import { getBecomeTutorContent } from "@/lib/become-tutor";
import { ArrowRight, Check, UserPlus } from "lucide-react";

const TUTOR_AUTH_HREF = "/login?role=tutor&next=%2Ftutor-onboarding";

export function BecomeTutorPage({ locale }: { locale: string }) {
  const copy = getBecomeTutorContent(locale);

  return (
    <>
      <Navbar />
      <main className="flex-1 overflow-hidden bg-white">
        <section className="bg-brand-300">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-14 sm:px-6 sm:py-18 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:px-8 lg:py-24">
            <div className="min-w-0">
              <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-brand-900">
                {copy.eyebrow}
              </p>
              <h1 className="mt-5 max-w-3xl text-balance font-display text-5xl font-extrabold leading-[0.98] text-ink sm:text-6xl lg:text-7xl">
                {copy.title}
              </h1>
              <p className="mt-6 max-w-2xl text-pretty text-lg font-medium leading-8 text-ink-soft">
                {copy.description}
              </p>
              <Link
                href={TUTOR_AUTH_HREF}
                className="mt-8 inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-xl bg-ink px-8 text-base font-extrabold text-white shadow-card transition-colors hover:bg-brand-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-brand-300 sm:w-auto sm:min-w-80"
              >
                {copy.cta}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>

            <div className="relative min-h-[330px] min-w-0 sm:min-h-[440px] lg:min-h-[520px]">
              <div className="absolute left-[18%] top-[16%] h-[68%] w-[68%] overflow-hidden rounded-2xl border-2 border-ink bg-brand-100 opacity-50 shadow-soft" />
              <div className="absolute left-[10%] top-[10%] h-[72%] w-[72%] overflow-hidden rounded-2xl border-2 border-ink bg-brand-100 opacity-75 shadow-card" />
              <div className="absolute left-0 top-0 h-[78%] w-[78%] overflow-hidden rounded-2xl border-2 border-ink bg-brand-100 shadow-card">
                <Image
                  src={copy.heroImage}
                  alt={copy.heroAlt}
                  fill
                  sizes="(min-width: 1024px) 560px, 92vw"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute right-2 top-8 w-[34%] min-w-28 overflow-hidden rounded-xl border-2 border-ink bg-white shadow-card">
                <div className="relative aspect-[4/5]">
                  <Image
                    src={copy.heroImage}
                    alt=""
                    fill
                    sizes="180px"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="absolute bottom-0 right-0 max-w-[260px] rounded-2xl border-2 border-ink bg-white p-4 shadow-card">
                <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-brand-700">
                  {copy.preview.badge}
                </p>
                <p className="mt-2 text-balance font-display text-xl font-extrabold leading-tight text-ink">
                  {copy.preview.title}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-line bg-white px-4 py-10 sm:px-6 lg:px-8">
          <dl className="mx-auto grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-3">
            {copy.stats.map((stat) => (
              <div key={stat.label} className="min-w-0 text-center">
                <dt className="break-words font-display text-4xl font-extrabold leading-none text-ink sm:text-5xl">
                  {stat.value}
                </dt>
                <dd className="mt-2 text-base font-semibold leading-6 text-muted">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
            <div className="min-w-0">
              <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-brand-700">
                {copy.featuresEyebrow}
              </p>
              <h2 className="mt-4 max-w-xl text-balance font-display text-4xl font-extrabold leading-tight text-ink sm:text-5xl">
                {copy.featuresTitle}
              </h2>
              <ul className="mt-8 space-y-5">
                {copy.features.map((feature) => (
                  <li key={feature.title} className="flex min-w-0 gap-4">
                    <Check className="mt-1 h-6 w-6 shrink-0 text-brand-600" />
                    <div className="min-w-0">
                      <h3 className="text-balance font-display text-2xl font-extrabold text-ink">
                        {feature.title}
                      </h3>
                      <p className="mt-1 text-pretty leading-7 text-ink-soft">
                        {feature.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <Link
                href={TUTOR_AUTH_HREF}
                className="mt-9 inline-flex min-h-13 items-center justify-center gap-2 rounded-xl bg-accent-400 px-7 text-base font-extrabold text-ink shadow-accent transition-colors hover:bg-accent-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2"
              >
                {copy.cta}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>

            <div className="relative min-h-[260px] min-w-0 sm:min-h-[360px]">
              <div className="absolute right-0 top-0 h-28 w-[54%] overflow-hidden rounded-xl bg-brand-50 opacity-75 sm:h-36">
                <Image
                  src={copy.heroImage}
                  alt=""
                  fill
                  sizes="420px"
                  className="object-cover"
                />
              </div>
              <div className="absolute right-8 top-20 h-28 w-[54%] overflow-hidden rounded-xl bg-brand-50 opacity-90 sm:top-24 sm:h-36">
                <Image
                  src={copy.heroImage}
                  alt=""
                  fill
                  sizes="420px"
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-0 left-0 h-[72%] w-[78%] overflow-hidden rounded-2xl border border-line bg-brand-50 shadow-card">
                <Image
                  src={copy.heroImage}
                  alt={copy.heroAlt}
                  fill
                  sizes="(min-width: 1024px) 520px, 92vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-2 lg:items-stretch">
            <div className="min-w-0 rounded-2xl border border-line bg-white p-7 shadow-soft sm:p-10">
              <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-brand-700">
                {copy.stepsEyebrow}
              </p>
              <h2 className="mt-4 text-balance font-display text-4xl font-extrabold leading-tight text-ink">
                {copy.stepsTitle}
              </h2>
              <ol className="mt-8 space-y-5">
                {copy.steps.map((step, index) => (
                  <li key={step.title} className="flex min-w-0 gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink font-display text-base font-extrabold text-white">
                      {index + 1}
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-balance font-display text-xl font-extrabold text-ink">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-pretty leading-7 text-ink-soft">
                        {step.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="min-w-0 rounded-2xl border border-brand-100 bg-brand-50 p-7 shadow-soft sm:p-10">
              <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-brand-700">
                {copy.earnings.eyebrow}
              </p>
              <h2 className="mt-4 text-balance font-display text-4xl font-extrabold leading-tight text-ink">
                {copy.earnings.title}
              </h2>
              <p className="mt-5 text-pretty text-lg leading-8 text-ink-soft">
                {copy.earnings.body}
              </p>
              <div className="mt-8 rounded-2xl border-2 border-ink bg-white p-5 font-display text-xl font-extrabold leading-8 text-ink">
                {copy.earnings.example}
              </div>
              <p className="mt-3 text-sm font-medium text-muted">
                {copy.earnings.note}
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
            <div className="relative min-h-[340px] min-w-0 sm:min-h-[460px]">
              <div className="absolute left-0 top-20 h-[62%] w-[58%] overflow-hidden rounded-2xl bg-brand-50 opacity-50 shadow-soft" />
              <div className="absolute left-[12%] top-10 h-[70%] w-[62%] overflow-hidden rounded-2xl bg-brand-50 opacity-70 shadow-soft" />
              <div className="absolute right-0 top-0 h-[82%] w-[68%] overflow-hidden rounded-2xl bg-brand-50 shadow-card">
                <Image
                  src={copy.heroImage}
                  alt={copy.heroAlt}
                  fill
                  sizes="(min-width: 1024px) 460px, 90vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="min-w-0">
              <blockquote className="text-balance font-display text-4xl font-extrabold leading-tight text-ink sm:text-5xl">
                “{copy.testimonial.quote}”
              </blockquote>
              <p className="mt-6 text-lg font-bold text-ink">
                {copy.testimonial.author}
                <span className="font-medium text-muted"> · {copy.testimonial.role}</span>
              </p>
              <Link
                href={TUTOR_AUTH_HREF}
                className="mt-8 inline-flex min-h-13 items-center justify-center gap-2 rounded-xl bg-accent-400 px-7 text-base font-extrabold text-ink shadow-accent transition-colors hover:bg-accent-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2"
              >
                {copy.testimonial.cta}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        <FaqAccordion groups={[{ items: copy.faq }]} />

        <section className="bg-white px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
          <div className="mx-auto grid max-w-7xl grid-cols-1 overflow-hidden rounded-2xl border-2 border-ink bg-brand-300 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
            <div className="relative min-h-[240px] bg-white">
              <Image
                src={copy.heroImage}
                alt={copy.heroAlt}
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="min-w-0 p-7 sm:p-10 lg:p-14">
              <h2 className="text-balance font-display text-4xl font-extrabold leading-tight text-ink sm:text-5xl">
                {copy.title}
              </h2>
              <p className="mt-5 text-pretty text-lg font-medium leading-8 text-ink-soft">
                {copy.requirements.body}
              </p>
              <Link
                href={TUTOR_AUTH_HREF}
                className="mt-8 inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-xl bg-ink px-8 text-base font-extrabold text-white shadow-card transition-colors hover:bg-brand-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-brand-300 sm:w-auto"
              >
                <UserPlus className="h-5 w-5" />
                {copy.cta}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
