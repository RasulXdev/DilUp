import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import type { Tutor, TutorLanguageLevel, TutorReview } from "@/lib/tutors";

const ONLINE_WINDOW_MINUTES = 2;

const DAY_LABELS: Record<string, string> = {
  monday: "Mon",
  tuesday: "Tue",
  wednesday: "Wed",
  thursday: "Thu",
  friday: "Fri",
  saturday: "Sat",
  sunday: "Sun",
};

function countryCodeToFlag(code: string | null) {
  if (!code || code.length !== 2) return "🏳️";
  return code
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
}

function isRecentlyOnline(isOnline: boolean | null, lastSeenAt: string | null) {
  if (!isOnline || !lastSeenAt) return false;
  return Date.now() - new Date(lastSeenAt).getTime() < ONLINE_WINDOW_MINUTES * 60_000;
}

function buildSchedule(
  rows: { day_of_week: string; start_time: string; end_time: string }[],
): Record<string, string[]> {
  const schedule: Record<string, string[]> = {};
  for (const row of rows) {
    const day = DAY_LABELS[row.day_of_week] ?? row.day_of_week;
    const [startH, startM] = row.start_time.split(":").map(Number);
    const [endH, endM] = row.end_time.split(":").map(Number);
    let h = startH;
    let m = startM;
    const slots: string[] = [];
    while (h < endH || (h === endH && m < endM)) {
      slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
      m += 30;
      if (m >= 60) {
        m -= 60;
        h += 1;
      }
    }
    schedule[day] = [...(schedule[day] ?? []), ...slots];
  }
  return schedule;
}

function average(values: (number | null)[]): number {
  const present = values.filter((value): value is number => value != null);
  if (present.length === 0) return 0;
  return present.reduce((sum, value) => sum + value, 0) / present.length;
}

type TutorProfileRow = {
  id: string;
  user_id: string;
  headline: string | null;
  about: string | null;
  price_per_lesson: number;
  trial_price_per_lesson: number | null;
  lesson_duration_minutes: number;
  years_experience: number | null;
  total_lessons: number | null;
  total_students: number | null;
  average_rating: number | null;
  total_reviews: number | null;
  specializations: string[] | null;
  certificates: string[] | null;
  is_professional: boolean | null;
  is_featured: boolean | null;
  profiles: {
    id: string;
    full_name: string;
    avatar_url: string | null;
    country: string | null;
    city: string | null;
    is_online: boolean | null;
    last_seen_at: string | null;
  } | null;
};

async function mapRowToTutor(
  row: TutorProfileRow,
  languages: { code: string; level: TutorLanguageLevel; is_teaching: boolean }[],
  reviews: (TutorReview & { rating_reassurance: number | null; rating_clarity: number | null; rating_progress: number | null; rating_preparation: number | null })[],
  availability: { day_of_week: string; start_time: string; end_time: string }[],
): Promise<Tutor> {
  const profile = row.profiles;
  const teaching = languages.find((language) => language.is_teaching);
  const placeholderPhoto = "/images/footer/dilup-tutor-profile.jpg";

  return {
    source: "db",
    id: row.user_id,
    name: profile?.full_name ?? "Tutor",
    online: isRecentlyOnline(profile?.is_online ?? null, profile?.last_seen_at ?? null),
    country: profile?.country ?? "",
    countryCode: profile?.country ?? "",
    flag: countryCodeToFlag(profile?.country ?? null),
    photo: profile?.avatar_url ?? placeholderPhoto,
    videoImage: profile?.avatar_url ?? placeholderPhoto,
    title: row.headline ?? "",
    headline: row.headline ?? "",
    bio: row.about ?? "",
    about: row.about ?? "",
    subject: (teaching?.code as Tutor["subject"]) ?? "en",
    languages: languages.map((language) => ({ code: language.code as Tutor["languages"][number]["code"], level: language.level })),
    alsoSpeaks: languages.map((language) => language.code as Tutor["alsoSpeaks"][number]),
    specialties: row.specializations ?? [],
    categories: [
      ...(row.is_featured ? (["super"] as const) : []),
      ...(row.is_professional ? (["professional"] as const) : []),
    ],
    price: row.price_per_lesson,
    originalPrice: undefined,
    rating: row.average_rating ?? 0,
    reviewsCount: row.total_reviews ?? 0,
    students: row.total_students ?? 0,
    lessons: row.total_lessons ?? 0,
    recentlyBooked: 0,
    lessonDuration: row.lesson_duration_minutes,
    highlights: [],
    lessonRating: {
      reassurance: average(reviews.map((review) => review.rating_reassurance)) || row.average_rating || 0,
      clarity: average(reviews.map((review) => review.rating_clarity)) || row.average_rating || 0,
      progress: average(reviews.map((review) => review.rating_progress)) || row.average_rating || 0,
      preparation: average(reviews.map((review) => review.rating_preparation)) || row.average_rating || 0,
      reviews: reviews.length,
    },
    reviewSummary: "",
    reviews: reviews.map(({ author, date, rating, text }) => ({ author, date, rating, text })),
    schedule: buildSchedule(availability),
    certificates: (row.certificates ?? []).map((title) => ({ years: "", title, description: "", verified: true })),
  };
}

/** Approved, accepting-students tutors from Supabase, mapped into the shared Tutor shape. Returns [] if none exist yet. */
export const getTutors = cache(async (): Promise<Tutor[]> => {
  const supabase = await createClient();

  const { data: rows } = await supabase
    .from("tutor_profiles")
    .select(
      `id, user_id, headline, about, price_per_lesson, trial_price_per_lesson,
       lesson_duration_minutes, years_experience, total_lessons, total_students,
       average_rating, total_reviews, specializations, certificates, is_professional,
       is_featured,
       profiles ( id, full_name, avatar_url, country, city, is_online, last_seen_at )`,
    )
    .eq("application_status", "approved")
    .eq("is_accepting_students", true);

  const tutorRows = (rows ?? []) as unknown as TutorProfileRow[];
  if (tutorRows.length === 0) return [];

  const userIds = tutorRows.map((row) => row.user_id);
  const tutorProfileIds = tutorRows.map((row) => row.id);

  const [languagesResult, reviewsResult, availabilityResult] = await Promise.all([
    supabase
      .from("user_languages")
      .select("user_id, level, is_teaching, languages ( code )")
      .in("user_id", userIds),
    supabase
      .from("reviews")
      .select(
        "tutor_id, rating, comment, created_at, rating_reassurance, rating_clarity, rating_progress, rating_preparation, profiles ( full_name )",
      )
      .in("tutor_id", tutorProfileIds)
      .eq("is_visible", true)
      .order("created_at", { ascending: false }),
    supabase
      .from("tutor_availability")
      .select("tutor_id, day_of_week, start_time, end_time")
      .in("tutor_id", tutorProfileIds)
      .eq("is_active", true),
  ]);

  const languagesByUser = new Map<string, { code: string; level: TutorLanguageLevel; is_teaching: boolean }[]>();
  for (const language of languagesResult.data ?? []) {
    const code = (language as { languages: { code: string } | null }).languages?.code;
    if (!code) continue;
    const list = languagesByUser.get(language.user_id) ?? [];
    list.push({ code, level: language.level as TutorLanguageLevel, is_teaching: language.is_teaching ?? false });
    languagesByUser.set(language.user_id, list);
  }

  const reviewRows = new Map<
    string,
    {
      author: string;
      date: string;
      rating: number;
      text: string;
      rating_reassurance: number | null;
      rating_clarity: number | null;
      rating_progress: number | null;
      rating_preparation: number | null;
    }[]
  >();
  for (const review of reviewsResult.data ?? []) {
    const r = review as {
      tutor_id: string;
      rating: number;
      comment: string | null;
      created_at: string | null;
      rating_reassurance: number | null;
      rating_clarity: number | null;
      rating_progress: number | null;
      rating_preparation: number | null;
      profiles: { full_name: string } | null;
    };
    const list = reviewRows.get(r.tutor_id) ?? [];
    list.push({
      author: r.profiles?.full_name ?? "Student",
      date: r.created_at ?? "",
      rating: r.rating,
      text: r.comment ?? "",
      rating_reassurance: r.rating_reassurance,
      rating_clarity: r.rating_clarity,
      rating_progress: r.rating_progress,
      rating_preparation: r.rating_preparation,
    });
    reviewRows.set(r.tutor_id, list);
  }

  const availabilityByTutor = new Map<string, { day_of_week: string; start_time: string; end_time: string }[]>();
  for (const slot of availabilityResult.data ?? []) {
    const list = availabilityByTutor.get(slot.tutor_id) ?? [];
    list.push(slot);
    availabilityByTutor.set(slot.tutor_id, list);
  }

  return Promise.all(
    tutorRows.map((row) =>
      mapRowToTutor(
        row,
        languagesByUser.get(row.user_id) ?? [],
        reviewRows.get(row.id) ?? [],
        availabilityByTutor.get(row.id) ?? [],
      ),
    ),
  );
});
