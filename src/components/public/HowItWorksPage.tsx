import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { getPublicPageCopy } from "@/lib/public-pages";
import { PageHero } from "@/components/public/sections/PageHero";
import { StepFlow } from "@/components/public/sections/StepFlow";
import { ValueGrid } from "@/components/public/sections/ValueGrid";
import { FaqAccordion } from "@/components/public/sections/FaqAccordion";
import { CtaBand } from "@/components/public/sections/CtaBand";

export function HowItWorksPage({ locale }: { locale: string }) {
  const copy = getPublicPageCopy(locale, "how-it-works");

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-white">
        <PageHero
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.description}
        />

        <StepFlow
          eyebrow={copy.studentStepsEyebrow}
          title={copy.studentStepsTitle}
          steps={copy.studentSteps}
          kind="student"
        />

        <ValueGrid
          eyebrow={copy.valuesEyebrow}
          title={copy.valuesTitle}
          items={copy.values}
        />

        <FaqAccordion groups={[{ items: copy.faq }]} />

        <CtaBand />
      </main>
      <Footer />
    </>
  );
}

export function TutorHowItWorksPage({ locale }: { locale: string }) {
  const copy = getPublicPageCopy(locale, "how-it-works");

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-white">
        <PageHero
          eyebrow={copy.tutorEyebrow}
          title={copy.tutorTitle}
          description={copy.tutorDescription}
        />

        <StepFlow
          eyebrow={copy.tutorStepsEyebrow}
          title={copy.tutorStepsTitle}
          steps={copy.tutorSteps}
          kind="tutor"
        />

        <ValueGrid
          eyebrow={copy.tutorValuesEyebrow}
          title={copy.tutorValuesTitle}
          items={copy.tutorValues}
        />

        <FaqAccordion groups={[{ items: copy.tutorFaq }]} />

        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
