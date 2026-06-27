import "server-only";
import { createClient } from "@/lib/supabase/server";

export type PlatformStats = {
  /** Approved tutors on the platform. */
  tutors: number;
  /** Visible 5-star reviews. */
  fiveStarReviews: number;
  /** Distinct languages that have at least one teaching tutor. */
  languagesTaught: number;
  /** Distinct countries of approved tutors. */
  countries: number;
  /** Average of all visible review ratings, or null when there are none. */
  averageRating: number | null;
};

export type HomeStats = {
  platform: PlatformStats;
  /** Approved-tutor count per language code (only languages with tutors appear). */
  tutorsByLanguage: Record<string, number>;
};

const EMPTY: HomeStats = {
  platform: {
    tutors: 0,
    fiveStarReviews: 0,
    languagesTaught: 0,
    countries: 0,
    averageRating: null,
  },
  tutorsByLanguage: {},
};

/**
 * Live marketplace numbers for the public site. Everything is derived from the
 * database, so counts grow automatically as tutors are approved and shrink when
 * they leave. Never returns fabricated values — falls back to zeros on error.
 */
export async function getHomeStats(): Promise<HomeStats> {
  try {
    const supabase = await createClient();

    const [tutorResult, reviewResult] = await Promise.all([
      supabase
        .from("tutor_profiles")
        .select("user_id, profiles!inner(country)")
        .eq("application_status", "approved"),
      supabase.from("reviews").select("rating").eq("is_visible", true),
    ]);

    const tutorRows = tutorResult.data ?? [];
    const reviewRows = reviewResult.data ?? [];

    const tutors = tutorRows.length;
    const userIds = tutorRows.map((row) => row.user_id);

    const countries = new Set(
      tutorRows
        .map((row) => {
          const profile = row.profiles as { country: string | null } | null;
          return profile?.country?.trim() || null;
        })
        .filter((country): country is string => Boolean(country)),
    ).size;

    const ratings = reviewRows
      .map((row) => row.rating)
      .filter((rating): rating is number => typeof rating === "number");
    const fiveStarReviews = ratings.filter((rating) => rating === 5).length;
    const averageRating = ratings.length
      ? Math.round((ratings.reduce((sum, n) => sum + n, 0) / ratings.length) * 10) / 10
      : null;

    const tutorsByLanguage: Record<string, number> = {};
    if (userIds.length) {
      const { data: langRows } = await supabase
        .from("user_languages")
        .select("languages!inner(code)")
        .eq("is_teaching", true)
        .in("user_id", userIds);

      for (const row of langRows ?? []) {
        const code = (row.languages as { code: string } | null)?.code;
        if (!code) continue;
        tutorsByLanguage[code] = (tutorsByLanguage[code] ?? 0) + 1;
      }
    }

    return {
      platform: {
        tutors,
        fiveStarReviews,
        languagesTaught: Object.keys(tutorsByLanguage).length,
        countries,
        averageRating,
      },
      tutorsByLanguage,
    };
  } catch {
    return EMPTY;
  }
}
