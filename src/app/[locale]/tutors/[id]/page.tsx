import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { TutorProfilePage } from "@/components/tutors/TutorProfilePage";
import { pageMetadata } from "@/lib/seo";
import { tutorById, tutors as mockTutors } from "@/lib/tutors";
import { getTutors } from "@/lib/tutors/db";

export function generateStaticParams() {
  return mockTutors.map((tutor) => ({ id: tutor.id }));
}

async function loadTutors() {
  const dbTutors = await getTutors();
  return dbTutors.length > 0 ? dbTutors : mockTutors;
}

async function findTutor(id: string) {
  const tutors = await loadTutors();
  return tutors.find((tutor) => tutor.id === id) ?? tutorById(id);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}): Promise<Metadata> {
  const { id, locale } = await params;
  const tutor = await findTutor(id);
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
  const tutors = await loadTutors();
  const tutor = tutors.find((item) => item.id === id) ?? tutorById(id);

  if (!tutor) notFound();

  return <TutorProfilePage tutor={tutor} allTutors={tutors} />;
}

