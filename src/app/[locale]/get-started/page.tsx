import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { OnboardingGate } from "@/components/onboarding/OnboardingGate";
import { OnboardingQuiz } from "@/components/onboarding/OnboardingQuiz";
import {
  hasCompletedFullOnboarding,
  hasCompletedFullOnboardingForSubject,
  isSafeRedirectPath,
} from "@/lib/auth/redirects";
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

const subjectParamMap: Record<string, string> = {
  en: "english",
  english: "english",
  ru: "russian",
  russian: "russian",
  tr: "turkish",
  turkish: "turkish",
  de: "german",
  german: "german",
  fr: "french",
  french: "french",
  es: "spanish",
  spanish: "spanish",
  ar: "arabic",
  arabic: "arabic",
  it: "italian",
  italian: "italian",
};

function normalizeSubject(subject?: string) {
  if (!subject) return undefined;
  return subjectParamMap[subject.toLowerCase()];
}

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
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ next?: string; subject?: string }>;
}) {
  const { locale } = await params;
  const { next, subject } = (await searchParams) ?? {};
  setRequestLocale(locale);
  const selectedSubject = normalizeSubject(subject);
  const safeNextPath = isSafeRedirectPath(next ?? null) ? next : undefined;
  const completedDestination =
    safeNextPath ?? (selectedSubject ? `/tutors?subject=${selectedSubject}` : "/tutors");

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const completed = selectedSubject
      ? await hasCompletedFullOnboardingForSubject(supabase, user.id, selectedSubject)
      : await hasCompletedFullOnboarding(supabase, user.id);
    if (completed) redirect(`/${locale}${completedDestination}`);
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
      <OnboardingGate nextPath={completedDestination} subject={selectedSubject}>
        <OnboardingQuiz initialSubject={selectedSubject} nextPath={safeNextPath} />
      </OnboardingGate>
    </>
  );
}
