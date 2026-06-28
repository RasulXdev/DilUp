import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { TutorProfilePage } from "@/components/tutors/TutorProfilePage";
import { pageMetadata } from "@/lib/seo";
import { tutorById, tutors } from "@/lib/tutors";

export function generateStaticParams() {
  return tutors.map((tutor) => ({ id: tutor.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}): Promise<Metadata> {
  const { id, locale } = await params;
  const tutor = tutorById(id);
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
  const tutor = tutorById(id);

  if (!tutor) notFound();

  return <TutorProfilePage tutor={tutor} />;
}

