import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { getPublicPageCopy } from "@/lib/public-pages";
import { PageHero } from "@/components/public/sections/PageHero";
import { FeatureSplit } from "@/components/public/sections/FeatureSplit";
import { ValueGrid } from "@/components/public/sections/ValueGrid";
import { CtaBand } from "@/components/public/sections/CtaBand";

export function AboutPage({ locale }: { locale: string }) {
  const copy = getPublicPageCopy(locale, "about");

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

        {copy.story.map((row, i) => (
          <FeatureSplit
            key={row.title}
            eyebrow={row.eyebrow}
            title={row.title}
            body={row.body}
            bullets={row.bullets}
            image={row.image}
            reverse={i % 2 === 1}
          />
        ))}

        <ValueGrid
          eyebrow={copy.valuesEyebrow}
          title={copy.valuesTitle}
          items={copy.values}
        />

        <div className="pt-8">
          <CtaBand />
        </div>
      </main>
      <Footer />
    </>
  );
}
