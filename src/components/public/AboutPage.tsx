import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { getPublicPageCopy } from "@/lib/public-pages";
import { PageHero } from "@/components/public/sections/PageHero";
import { FeatureSplit } from "@/components/public/sections/FeatureSplit";
import { ValueGrid } from "@/components/public/sections/ValueGrid";
import { CtaBand } from "@/components/public/sections/CtaBand";
import {
  AboutHeroMock,
  AboutMarketplaceMock,
  AboutMissionMock,
} from "@/components/public/sections/AboutMockVisual";

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
          imageAlt={copy.title}
          visual={<AboutHeroMock />}
          stats={copy.stats}
        />

        {copy.story.map((row, i) => (
          <FeatureSplit
            key={row.title}
            eyebrow={row.eyebrow}
            title={row.title}
            body={row.body}
            bullets={row.bullets}
            visual={i % 2 === 0 ? <AboutMissionMock /> : <AboutMarketplaceMock />}
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
