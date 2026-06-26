import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
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

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-white">
        <section className="border-b border-line bg-brand-50/70 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <p className="text-sm font-extrabold uppercase tracking-wide text-brand-700">
              {copy.eyebrow}
            </p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-extrabold leading-tight text-ink sm:text-6xl">
              {copy.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-soft">
              {copy.description}
            </p>
          </div>
        </section>
        <section className="px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
            {copy.sections.map((section) => (
              <article
                key={section.title}
                className="rounded-2xl border border-line bg-white p-6 shadow-soft"
              >
                <h2 className="font-display text-2xl font-extrabold text-ink">
                  {section.title}
                </h2>
                <p className="mt-3 leading-7 text-ink-soft">{section.body}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
