import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { SavedTutorsPage } from "@/components/platform/SavedTutorsPage";
import { pageMetadata } from "@/lib/seo";
import { getTutors } from "@/lib/tutors/db";

const savedMeta = {
  az: {
    title: "Yadda saxlanılan müəllimlər",
    description: "Bəyəndiyin DilUp müəllimlərini saxla, müqayisə et və profilə geri qayıt.",
  },
  en: {
    title: "Saved tutors",
    description: "Keep track of the DilUp tutors you liked, compare them and return to their profiles.",
  },
  ru: {
    title: "Сохранённые репетиторы",
    description: "Сохраняй понравившихся репетиторов DilUp, сравнивай их и возвращайся к профилям.",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const copy = savedMeta[locale as keyof typeof savedMeta] ?? savedMeta.az;

  return pageMetadata({
    ...copy,
    locale,
    path: "/saved-tutors",
  });
}

export default async function SavedTutorsRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tutors = await getTutors();
  return <SavedTutorsPage tutors={tutors} />;
}
