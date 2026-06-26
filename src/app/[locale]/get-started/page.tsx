import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { OnboardingQuiz } from "@/components/onboarding/OnboardingQuiz";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

const getStartedMeta = {
  az: {
    title: "Sənə uyğun müəllimi tap",
    description:
      "DilUp quiz-i məqsədinə, səviyyənə, büdcənə və uyğun vaxtlarına görə müəllim siyahısını formalaşdırır.",
  },
  en: {
    title: "Find the tutor who fits you",
    description:
      "DilUp shapes a tutor shortlist around your goals, level, budget and weekly availability.",
  },
  ru: {
    title: "Найди подходящего репетитора",
    description:
      "Квиз DilUp подбирает репетиторов по твоей цели, уровню, бюджету и удобному времени.",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const copy =
    getStartedMeta[locale as keyof typeof getStartedMeta] ?? getStartedMeta.az;

  return pageMetadata({
    ...copy,
    locale,
    path: "/get-started",
  });
}

export default async function GetStartedPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const copy =
    getStartedMeta[locale as keyof typeof getStartedMeta] ?? getStartedMeta.az;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: copy.title,
    description: copy.description,
    url: absoluteUrl(`/${locale}/get-started`),
    isPartOf: {
      "@type": "WebSite",
      name: "DilUp",
      url: absoluteUrl(`/${locale}`),
    },
    potentialAction: {
      "@type": "FindAction",
      target: absoluteUrl(`/${locale}/get-started`),
      name: copy.title,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <OnboardingQuiz />
    </>
  );
}
