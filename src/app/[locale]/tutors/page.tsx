import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { TutorSearchPage } from "@/components/tutors/TutorSearchPage";
import { pageMetadata } from "@/lib/seo";
import { getTutors } from "@/lib/tutors/db";

const tutorsMeta = {
  az: {
    title: "İngilis dili müəllimləri",
    description:
      "DilUp-da qiymət, ölkə, mövcudluq və ixtisasa görə İngilis dili müəllimlərini müqayisə et.",
  },
  en: {
    title: "English tutors",
    description:
      "Compare English tutors on DilUp by price, country, availability and specialty.",
  },
  ru: {
    title: "Репетиторы английского",
    description:
      "Сравнивай репетиторов английского на DilUp по цене, стране, доступности и специализации.",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const copy = tutorsMeta[locale as keyof typeof tutorsMeta] ?? tutorsMeta.az;

  return pageMetadata({
    ...copy,
    locale,
    path: "/tutors",
  });
}

export default async function TutorsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ subject?: string }>;
}) {
  const { locale } = await params;
  const { subject } = (await searchParams) ?? {};
  setRequestLocale(locale);

  const tutors = await getTutors();
  return <TutorSearchPage initialSubject={subject} tutors={tutors} />;
}
