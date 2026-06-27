import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { OnboardingGate } from "@/components/onboarding/OnboardingGate";
import { OnboardingQuiz } from "@/components/onboarding/OnboardingQuiz";
import { hasCompletedStudentSetup } from "@/lib/auth/redirects";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { createClient } from "@/lib/supabase/server";

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

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const completed = await hasCompletedStudentSetup(supabase, user.id);
    if (completed) redirect(`/${locale}/tutors`);
  }

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
      <OnboardingGate>
        <OnboardingQuiz />
      </OnboardingGate>
    </>
  );
}
