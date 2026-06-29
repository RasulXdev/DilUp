import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { TutorProfilePage } from "@/components/tutors/TutorProfilePage";
import { pageMetadata } from "@/lib/seo";
import { getTutors } from "@/lib/tutors/db";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}): Promise<Metadata> {
  const { id, locale } = await params;
  const tutors = await getTutors();
  const tutor = tutors.find((item) => item.id === id);
  if (!tutor) {
    return {};
  }

  return pageMetadata({
    title: `${tutor.name} — ${tutor.title}`,
    description: `${tutor.headline} ${tutor.bio}`,
    locale,
    path: `/tutors/${tutor.id}`,
  });
}

export default async function TutorProfileRoute({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id, locale } = await params;
  setRequestLocale(locale);
  const tutors = await getTutors();
  const tutor = tutors.find((item) => item.id === id);

  if (!tutor) notFound();

  return <TutorProfilePage tutor={tutor} allTutors={tutors} />;
}
