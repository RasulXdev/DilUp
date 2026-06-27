"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Baby,
  BookOpen,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  ClipboardCheck,
  Clock3,
  Loader2,
  Moon,
  Plane,
  Search,
  ShieldCheck,
  Sun,
  Sunrise,
  Sunset,
} from "lucide-react";
import { toast } from "sonner";
import { Link, useRouter } from "@/i18n/navigation";
import { Logo } from "@/components/shared/Logo";
import { LocaleCurrencySwitcher } from "@/components/shared/LocaleCurrencySwitcher";
import { SocialButtons } from "@/components/auth/SocialButtons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

type StepId =
  | "goal"
  | "timeline"
  | "industry"
  | "role"
  | "careerSkills"
  | "topics"
  | "level"
  | "style"
  | "country"
  | "alsoSpeaks"
  | "availability"
  | "budget"
  | "future"
  | "summary";

type CatalogId = "industries" | "topics" | "countries" | "languages" | "future";

type Option = {
  value: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  flag?: string;
  disabled?: boolean;
};

type TimeGroup = Option & {
  slots: Option[];
};

type Answers = {
  subject: string;
  goal: string;
  timeline: string;
  industry: string;
  role: string;
  careerSkills: string[];
  topics: string[];
  level: string;
  style: string[];
  nativeOnly: boolean;
  country: string;
  alsoSpeaks: string[];
  days: string[];
  times: string[];
  budget: [number, number];
  future: string[];
  note: string;
};

type ArrayAnswerKey =
  | "careerSkills"
  | "topics"
  | "style"
  | "alsoSpeaks"
  | "days"
  | "times"
  | "future";

const defaultAnswers: Answers = {
  subject: "",
  goal: "",
  timeline: "",
  industry: "",
  role: "",
  careerSkills: [],
  topics: [],
  level: "",
  style: [],
  nativeOnly: false,
  country: "",
  alsoSpeaks: [],
  days: [],
  times: [],
  budget: [8, 38],
  future: [],
  note: "",
};

const subjectFlags: Record<string, string> = {
  english: "🇬🇧",
  russian: "🇷🇺",
  turkish: "🇹🇷",
  german: "🇩🇪",
  french: "🇫🇷",
  spanish: "🇪🇸",
  arabic: "🇸🇦",
  italian: "🇮🇹",
};

const countryFlags: Record<string, string> = {
  any: "🌍",
  azerbaijan: "🇦🇿",
  usa: "🇺🇸",
  uk: "🇬🇧",
  canada: "🇨🇦",
  turkey: "🇹🇷",
  ukraine: "🇺🇦",
  ireland: "🇮🇪",
  australia: "🇦🇺",
  germany: "🇩🇪",
  poland: "🇵🇱",
  netherlands: "🇳🇱",
  southAfrica: "🇿🇦",
  philippines: "🇵🇭",
  india: "🇮🇳",
  pakistan: "🇵🇰",
};

const languageFlags: Record<string, string> = {
  none: "✨",
  azerbaijani: "🇦🇿",
  russian: "🇷🇺",
  turkish: "🇹🇷",
  english: "🇬🇧",
  arabic: "🇸🇦",
  french: "🇫🇷",
  german: "🇩🇪",
  spanish: "🇪🇸",
  italian: "🇮🇹",
};

const stepOrder: StepId[] = [
  "goal",
  "timeline",
  "industry",
  "role",
  "careerSkills",
  "topics",
  "level",
  "style",
  "country",
  "alsoSpeaks",
  "availability",
  "budget",
  "future",
  "summary",
];

function getSessionId() {
  if (typeof window === "undefined") {
    return "server";
  }

  const existing = window.localStorage.getItem("dilup_onboarding_session");
  if (existing) {
    return existing;
  }

  const next =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `session-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  window.localStorage.setItem("dilup_onboarding_session", next);
  return next;
}

function toggleValue(list: string[], value: string, max?: number) {
  if (list.includes(value)) {
    return list.filter((item) => item !== value);
  }
  if (max && list.length >= max) {
    return list;
  }
  return [...list, value];
}

function hasStepAnswer(step: StepId, answers: Answers) {
  switch (step) {
    case "goal":
      return Boolean(answers.goal);
    case "timeline":
      return Boolean(answers.timeline);
    case "industry":
      return answers.goal !== "career" || Boolean(answers.industry);
    case "role":
      return answers.goal !== "career" || answers.role.trim().length > 1;
    case "careerSkills":
      return answers.goal !== "career" || answers.careerSkills.length > 0;
    case "topics":
      return answers.topics.length > 0;
    case "level":
      return Boolean(answers.level);
    case "style":
      return answers.style.length > 0;
    case "country":
      return Boolean(answers.country);
    case "alsoSpeaks":
      return answers.alsoSpeaks.length > 0;
    case "availability":
      return answers.days.length > 0 && answers.times.length > 0;
    case "budget":
      return true;
    case "future":
      return true;
    case "summary":
      return true;
  }
}

function nextStepIndex(index: number, answers: Answers) {
  for (let i = index + 1; i < stepOrder.length; i += 1) {
    if (
      answers.goal !== "career" &&
      ["industry", "role", "careerSkills"].includes(stepOrder[i])
    ) {
      continue;
    }
    return i;
  }
  return index;
}

function previousStepIndex(index: number, answers: Answers) {
  for (let i = index - 1; i >= 0; i -= 1) {
    if (
      answers.goal !== "career" &&
      ["industry", "role", "careerSkills"].includes(stepOrder[i])
    ) {
      continue;
    }
    return i;
  }
  return 0;
}

export function OnboardingQuiz() {
  const t = useTranslations("onboarding");
  const router = useRouter();
  const [started, setStarted] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>(defaultAnswers);
  const [catalog, setCatalog] = useState<CatalogId | null>(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [subjectOpen, setSubjectOpen] = useState(false);
  const [signupEmail, setSignupEmail] = useState("");
  const subjectButtonRef = useRef<HTMLButtonElement>(null);

  const options = useMemo(
    () => ({
      subjects: [
        "english",
        "russian",
        "turkish",
        "german",
        "french",
        "spanish",
        "arabic",
        "italian",
      ].map((value) => ({
        value,
        label: t(`subjects.${value}`),
        flag: subjectFlags[value],
        disabled: value !== "english",
      })),
      goals: [
        { value: "career", label: t("goals.career"), icon: BriefcaseBusiness },
        { value: "kids", label: t("goals.kids"), icon: Baby },
        { value: "exams", label: t("goals.exams"), icon: ClipboardCheck },
        { value: "culture", label: t("goals.culture"), icon: Plane },
      ],
      timelines: ["weeks", "months1", "months3", "steady", "oneLesson"].map(
        (value) => ({ value, label: t(`timelines.${value}`) }),
      ),
      industries: [
        "finance",
        "technology",
        "healthcare",
        "education",
        "creative",
        "construction",
        "engineering",
        "hospitality",
        "law",
        "sales",
      ].map((value) => ({ value, label: t(`industries.${value}`) })),
      careerSkills: [
        "none",
        "workplace",
        "interview",
        "presentations",
        "writing",
        "relationships",
        "industryLanguage",
      ].map((value) => ({ value, label: t(`careerSkills.${value}`) })),
      topics: [
        "none",
        "business",
        "conversation",
        "intensive",
        "beginners",
        "american",
        "ielts",
        "grammar",
        "travel",
        "kids",
      ].map((value) => ({ value, label: t(`topics.${value}`) })),
      levels: ["starter", "basics", "conversation", "fluent"].map((value) => ({
        value,
        label: t(`levels.${value}`),
      })),
      styles: [
        "adaptable",
        "approachable",
        "encouraging",
        "engaging",
        "goalFocused",
        "patient",
        "structured",
      ].map((value) => ({ value, label: t(`styles.${value}`) })),
      countries: [
        "any",
        "azerbaijan",
        "usa",
        "uk",
        "canada",
        "turkey",
        "ukraine",
        "ireland",
        "australia",
        "germany",
        "poland",
        "netherlands",
        "southAfrica",
        "philippines",
        "india",
        "pakistan",
      ].map((value) => ({
        value,
        label: t(`countries.${value}`),
        flag: countryFlags[value],
      })),
      languages: [
        "none",
        "azerbaijani",
        "russian",
        "turkish",
        "english",
        "arabic",
        "french",
        "german",
        "spanish",
        "italian",
      ].map((value) => ({
        value,
        label: t(`languages.${value}`),
        flag: languageFlags[value],
      })),
      days: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"].map((value) => ({
        value,
        label: t(`days.${value}`),
      })),
      times: [
        { value: "morning", label: t("times.morning"), icon: Sunrise },
        { value: "early", label: "6-9", icon: Clock3 },
        { value: "midday", label: "9-12", icon: Clock3 },
        { value: "afternoon", label: t("times.afternoon"), icon: Sun },
        { value: "lateAfternoon", label: "12-15", icon: Clock3 },
        { value: "midAfternoon", label: "15-18", icon: Clock3 },
        { value: "evening", label: t("times.evening"), icon: Sunset },
        { value: "earlyEvening", label: "18-21", icon: Clock3 },
        { value: "night", label: t("times.night"), icon: Moon },
        { value: "deepNight", label: "0-3", icon: Clock3 },
        { value: "dawn", label: "3-6", icon: Clock3 },
      ],
      future: [
        "english",
        "russian",
        "turkish",
        "german",
        "french",
        "spanish",
        "arabic",
        "italian",
      ].map((value) => ({
        value,
        label: t(`future.${value}`),
        flag: subjectFlags[value],
      })),
    }),
    [t],
  );

  const timeGroups = useMemo<TimeGroup[]>(
    () => [
      {
        value: "morning",
        label: t("times.morning"),
        icon: Sunrise,
        slots: [
          { value: "early", label: "6-9", icon: Clock3 },
          { value: "midday", label: "9-12", icon: Clock3 },
        ],
      },
      {
        value: "afternoon",
        label: t("times.afternoon"),
        icon: Sun,
        slots: [
          { value: "lateAfternoon", label: "12-15", icon: Clock3 },
          { value: "midAfternoon", label: "15-18", icon: Clock3 },
        ],
      },
      {
        value: "evening",
        label: t("times.evening"),
        icon: Sunset,
        slots: [{ value: "earlyEvening", label: "18-21", icon: Clock3 }],
      },
      {
        value: "night",
        label: t("times.night"),
        icon: Moon,
        slots: [
          { value: "deepNight", label: "0-3", icon: Clock3 },
          { value: "dawn", label: "3-6", icon: Clock3 },
        ],
      },
    ],
    [t],
  );

  const activeStep = stepOrder[stepIndex];
  const canContinue = hasStepAnswer(activeStep, answers);
  const introCanContinue = Boolean(answers.subject);
  const subjectLabel =
    options.subjects.find((item) => item.value === answers.subject)?.label ??
    t("subjects.placeholder");
  const selectedSubject = options.subjects.find(
    (item) => item.value === answers.subject,
  );

  const catalogItems = useMemo(() => {
    const map: Record<CatalogId, Option[]> = {
      industries: options.industries,
      topics: options.topics,
      countries: options.countries,
      languages: options.languages,
      future: options.future,
    };
    const items = catalog ? map[catalog] : [];
    return items.filter((item) =>
      item.label.toLowerCase().includes(query.trim().toLowerCase()),
    );
  }, [catalog, options, query]);

  function answerSingle(key: keyof Answers, value: string) {
    setAnswers((current) => ({ ...current, [key]: value }));
  }

  function answerList(key: ArrayAnswerKey, value: string, max?: number) {
    setAnswers((current) => {
      const list = current[key];
      if (value === "none") {
        return { ...current, [key]: list.includes(value) ? [] : [value] };
      }

      const withoutNone = list.filter((item) => item !== "none");
      return { ...current, [key]: toggleValue(withoutNone, value, max) };
    });
  }

  function goNext() {
    if (!canContinue) {
      return;
    }
    if (activeStep === "summary") {
      void finish();
      return;
    }
    setStepIndex((index) => nextStepIndex(index, answers));
  }

  function goBack() {
    if (!started) {
      router.push("/");
      return;
    }
    if (stepIndex === 0) {
      setStarted(false);
      return;
    }
    setStepIndex((index) => previousStepIndex(index, answers));
  }

  function tutorSearchParams() {
    return new URLSearchParams({
      subject: answers.subject,
      priceRange: `${answers.budget[0]}-${answers.budget[1]}`,
      goal: answers.goal,
      country: answers.country,
    });
  }

  async function finish() {
    setLoading(true);
    const sessionId = getSessionId();
    let signedInUserId: string | null = null;

    if (
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ) {
      try {
        const supabase = createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();
        signedInUserId = user?.id ?? null;

        await supabase.from("onboarding_responses").insert({
          session_id: sessionId,
          user_id: signedInUserId,
          converted_to_signup: Boolean(signedInUserId),
          goal: answers.goal,
          goal_achievement_period: answers.timeline,
          career_industry: answers.industry || null,
          career_role: answers.role || null,
          career_skills: answers.careerSkills,
          specialties: answers.topics,
          level: answers.level,
          tutor_style: answers.style,
          country_of_birth: answers.country,
          also_speaks: answers.alsoSpeaks,
          available_days: answers.days,
          available_times: answers.times,
          budget_min: answers.budget[0],
          budget_max: answers.budget[1],
          future_subjects: answers.future,
          free_text: answers.note || null,
        });
      } catch {
        toast.error(t("saveError"));
      }
    }

    window.localStorage.setItem("dilup_onboarding_answers", JSON.stringify(answers));

    // Already signed in: the quiz answers are linked to the account directly,
    // so skip straight to results.
    if (signedInUserId) {
      window.setTimeout(() => {
        router.push(`/tutors?${tutorSearchParams().toString()}`);
        router.refresh();
      }, 1200);
      return;
    }

    window.setTimeout(() => {
      setLoading(false);
      setSignupOpen(true);
    }, 1200);
  }

  function catalogTitle() {
    if (!catalog) return "";
    return t(`catalog.${catalog}.title`);
  }

  function catalogPlaceholder() {
    if (!catalog) return "";
    return t(`catalog.${catalog}.placeholder`);
  }

  function chooseCatalogItem(value: string) {
    if (catalog === "industries") answerSingle("industry", value);
    if (catalog === "topics") answerList("topics", value);
    if (catalog === "countries") answerSingle("country", value);
    if (catalog === "languages") answerList("alsoSpeaks", value);
    if (catalog === "future") answerList("future", value);
  }

  function closeCatalog() {
    setCatalog(null);
    setQuery("");
  }

  function openSubjectPicker() {
    setSubjectOpen(true);
    requestAnimationFrame(() => {
      subjectButtonRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      subjectButtonRef.current?.focus();
    });
  }

  const selectedChips = [
    subjectLabel,
    labelFor(options.goals, answers.goal),
    labelFor(options.timelines, answers.timeline),
    labelFor(options.industries, answers.industry),
    answers.role,
    ...answers.careerSkills.map((value) => labelFor(options.careerSkills, value)),
    ...answers.topics.map((value) => labelFor(options.topics, value)),
    labelFor(options.levels, answers.level),
    ...answers.style.map((value) => labelFor(options.styles, value)),
    labelFor(options.countries, answers.country),
    ...answers.alsoSpeaks.map((value) => labelFor(options.languages, value)),
    ...answers.days.map((value) => labelFor(options.days, value)),
    ...answers.times.map((value) => labelFor(options.times, value)),
    `${answers.budget[0]}-${answers.budget[1]} AZN`,
    ...answers.future.map((value) => labelFor(options.future, value)),
  ].filter(Boolean);

  if (loading) {
    return (
      <main className="min-h-dvh bg-brand-600 text-white">
        <div className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
          <Loader2 className="h-10 w-10 animate-spin" />
          <h1 className="mt-8 max-w-xl font-display text-4xl font-extrabold leading-tight sm:text-6xl">
            {t("loadingTitle", { subject: subjectLabel })}
          </h1>
          <p className="mt-4 max-w-md text-lg text-white/75">
            {t("loadingText")}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-dvh bg-white">
      {!started ? (
        <section className="relative grid min-h-dvh lg:grid-cols-[0.96fr_1.04fr]">
          <div className="absolute right-4 top-4 z-20 sm:right-6 lg:right-10 lg:top-8">
            <LocaleCurrencySwitcher />
          </div>

          <div className="hidden min-h-dvh items-center bg-brand-300 px-10 lg:flex">
            <div className="mx-auto w-full max-w-xl">
              <Logo />
              <div className="mt-12">
                <TutorSignalCard t={t} onStart={openSubjectPicker} />
              </div>
            </div>
          </div>

          <div className="flex min-h-dvh items-center px-4 py-24 sm:px-6 lg:px-12">
            <div className="mx-auto w-full max-w-xl">
              <div className="mb-10 lg:hidden">
                <Logo />
              </div>
              <h1 className="font-display text-4xl font-extrabold leading-tight text-ink sm:text-5xl">
                {t.rich("introTitle", {
                  mark: (chunks) => <span className="text-brand-600">{chunks}</span>,
                })}
              </h1>
              <p className="mt-4 text-lg leading-8 text-ink-soft">
                {t("introText")}
              </p>

              <label className="mt-8 block text-sm font-bold text-ink">
                {t("subjectLabel")}
              </label>
              <div className="mt-2">
                <button
                  ref={subjectButtonRef}
                  type="button"
                  onClick={() => setSubjectOpen((open) => !open)}
                  className={cn(
                    "flex min-h-14 w-full items-center justify-between rounded-2xl border bg-white px-4 text-left text-base font-bold shadow-soft outline-none transition focus-visible:border-brand-500 focus-visible:ring-2 focus-visible:ring-brand-500/20",
                    subjectOpen ? "border-brand-500" : "border-line",
                    selectedSubject ? "text-ink" : "text-muted",
                  )}
                >
                  <span className="flex min-w-0 items-center gap-3">
                    {selectedSubject && <FlagMark flag={selectedSubject.flag} />}
                    <span className="truncate">
                      {selectedSubject?.label ?? t("subjects.placeholder")}
                    </span>
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 text-muted transition",
                      subjectOpen && "rotate-180",
                    )}
                  />
                </button>
                {subjectOpen && (
                  <div className="relative mt-2 overflow-hidden rounded-2xl border border-line bg-white shadow-card">
                    <div className="max-h-72 overflow-y-auto p-2 pb-10">
                      {options.subjects.map((item) => (
                        <button
                          key={item.value}
                          type="button"
                          onClick={() => {
                            if (item.disabled) return;
                            answerSingle("subject", item.value);
                            setSubjectOpen(false);
                          }}
                          disabled={item.disabled}
                          className={cn(
                            "group flex min-h-12 w-full items-center gap-3 rounded-xl px-3 text-left text-sm font-bold text-ink transition hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-white",
                            answers.subject === item.value && "bg-brand-50 text-brand-800 ring-1 ring-brand-200",
                          )}
                        >
                          <FlagMark flag={item.flag} />
                          <span className="min-w-0 flex-1">
                            <span className="block truncate">{item.label}</span>
                          </span>
                          {item.disabled && (
                            <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-extrabold text-brand-700">
                              {t("subjects.comingSoon")}
                            </span>
                          )}
                          {answers.subject === item.value && (
                            <Check className="h-4 w-4 text-brand-700" />
                          )}
                        </button>
                      ))}
                    </div>
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-center bg-gradient-to-t from-white via-white/95 to-transparent pb-2 pt-8">
                      <span className="rounded-full border border-line bg-white px-3 py-1 text-xs font-extrabold text-muted shadow-soft">
                        {t("subjects.scrollHint")}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <Button
                type="button"
                size="lg"
                disabled={!introCanContinue}
                className="mt-5 h-14 w-full rounded-xl text-base"
                onClick={() => setStarted(true)}
              >
                {t("introCta")}
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>
      ) : (
        <section className="relative grid min-h-dvh lg:grid-cols-[0.96fr_1.04fr]">
          <div className="absolute right-4 top-4 z-20 sm:right-6 lg:right-10 lg:top-8">
            <LocaleCurrencySwitcher />
          </div>

          <aside className="relative hidden overflow-hidden bg-brand-300 lg:block">
            <button
              type="button"
              onClick={goBack}
              aria-label={t("back")}
              className="absolute left-12 top-12 inline-flex h-11 w-11 items-center justify-center rounded-full text-ink transition hover:bg-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            <div className="flex h-full items-center justify-center px-16">
              {activeStep === "summary" ? (
                <SummaryCloud chips={selectedChips} />
              ) : (
                <StepIllustration key={activeStep} step={activeStep} />
              )}
            </div>
            <div className="absolute bottom-12 left-12">
              <Logo />
            </div>
          </aside>

          <div className="flex min-h-dvh items-center px-4 py-8 sm:px-6 lg:px-12">
            <div className="mx-auto w-full max-w-2xl">
              <div className="mb-8 flex items-center justify-between lg:hidden">
                <button
                  type="button"
                  onClick={goBack}
                  aria-label={t("back")}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <Logo />
              </div>

              <div className="mb-7 h-2 overflow-hidden rounded-full bg-brand-50">
                <div
                  className="h-full rounded-full bg-brand-600 transition-all duration-300"
                  style={{ width: `${((stepIndex + 1) / stepOrder.length) * 100}%` }}
                />
              </div>

              <StepBody
                step={activeStep}
                t={t}
                answers={answers}
                setAnswers={setAnswers}
                options={options}
                timeGroups={timeGroups}
                subjectLabel={subjectLabel}
                answerSingle={answerSingle}
                answerList={answerList}
                openCatalog={(nextCatalog) => {
                  setCatalog(nextCatalog);
                  setQuery("");
                }}
              />

              <Button
                type="button"
                size="lg"
                disabled={!canContinue}
                onClick={goNext}
                className="mt-8 h-14 w-full rounded-xl text-base"
              >
                {activeStep === "summary" ? t("finish") : t("continue")}
              </Button>
            </div>
          </div>
        </section>
      )}

      <Dialog open={Boolean(catalog)} onOpenChange={(open) => !open && closeCatalog()}>
        <DialogContent className="max-h-[88dvh] max-w-2xl overflow-hidden rounded-[2rem] border-line p-0 shadow-card">
          <div className="p-6 sm:p-8">
            <DialogHeader>
              <DialogTitle className="font-display text-3xl font-extrabold">
                {catalogTitle()}
              </DialogTitle>
              <DialogDescription className="sr-only">
                {catalogPlaceholder()}
              </DialogDescription>
            </DialogHeader>
            <div className="relative mt-6">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={catalogPlaceholder()}
                className="h-14 rounded-2xl border-line pl-12 text-base font-semibold shadow-soft"
              />
            </div>
          </div>
          <div className="max-h-[48dvh] space-y-2 overflow-y-auto px-4 pb-4 sm:px-6">
            {catalogItems.map((item) => {
              const selected =
                item.value === answers.industry ||
                item.value === answers.country ||
                answers.topics.includes(item.value) ||
                answers.alsoSpeaks.includes(item.value) ||
                answers.future.includes(item.value);

              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => chooseCatalogItem(item.value)}
                  className={cn(
                    "flex min-h-14 w-full items-center justify-between rounded-2xl px-4 text-left text-base font-bold text-ink transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
                    selected
                      ? "bg-brand-50 text-brand-900 ring-1 ring-brand-200"
                      : "hover:bg-surface",
                  )}
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <FlagMark flag={item.flag} />
                    <span className="truncate">{item.label}</span>
                  </span>
                  <span
                    className={cn(
                      "flex h-7 w-7 items-center justify-center rounded-lg border",
                      selected
                        ? "border-brand-600 bg-brand-600 text-white"
                        : "border-line bg-white",
                    )}
                  >
                    {selected && <Check className="h-4 w-4" />}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="flex items-center justify-between border-t border-line bg-surface/70 p-6 sm:p-8">
            <button
              type="button"
              onClick={() => {
                if (catalog === "industries") answerSingle("industry", "");
                if (catalog === "countries") answerSingle("country", "");
                if (catalog === "topics") setAnswers((current) => ({ ...current, topics: [] }));
                if (catalog === "languages") setAnswers((current) => ({ ...current, alsoSpeaks: [] }));
                if (catalog === "future") setAnswers((current) => ({ ...current, future: [] }));
              }}
              className="text-base font-bold text-ink underline underline-offset-4"
            >
              {t("clearAll")}
            </button>
            <Button type="button" className="rounded-xl px-8" onClick={closeCatalog}>
              {t("continue")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={signupOpen} onOpenChange={setSignupOpen}>
        <DialogContent className="max-h-[calc(100dvh-2rem)] max-w-md overflow-y-auto rounded-[2rem] border-0 p-0 shadow-card">
          <div className="bg-brand-300 px-6 pb-6 pt-7 sm:px-8 sm:pt-8">
            <div className="flex items-center">
              <Logo />
            </div>
            <span className="mt-5 inline-flex max-w-full items-center gap-2 rounded-full border border-brand-200 bg-white/75 px-3.5 py-1.5 text-xs font-bold text-brand-700 shadow-sm">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span className="truncate">{t("signup.badge")}</span>
            </span>
            <DialogHeader className="mt-5 items-start text-left">
              <DialogTitle className="font-display text-[1.45rem] font-extrabold leading-tight text-ink sm:text-[1.7rem]">
                {t("signup.title", { subject: subjectLabel })}
              </DialogTitle>
              <DialogDescription className="text-[15px] leading-6 text-ink-soft">
                {t("signup.text")}
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="space-y-4 px-6 py-6 sm:space-y-5 sm:px-8 sm:py-7">
            <SocialButtons
              next={`/tutors?${tutorSearchParams().toString()}`}
              role="student"
            />

            <div className="flex items-center gap-3">
              <Separator className="flex-1" />
              <span className="text-xs font-bold uppercase tracking-wide text-muted">
                {t("signup.emailDivider")}
              </span>
              <Separator className="flex-1" />
            </div>

            <form
              className="space-y-3"
              onSubmit={(event) => {
                event.preventDefault();
                const params = new URLSearchParams();
                if (signupEmail) params.set("email", signupEmail);
                router.push(`/register${params.toString() ? `?${params.toString()}` : ""}`);
              }}
            >
              <Input
                type="email"
                value={signupEmail}
                onChange={(event) => setSignupEmail(event.target.value)}
                placeholder={t("signup.emailPlaceholder")}
                autoComplete="email"
                className="h-13 rounded-full px-5 text-base"
              />
              <Button type="submit" size="lg" className="h-13 w-full">
                {t("signup.emailContinue")}
                <ArrowRight className="h-5 w-5" />
              </Button>
            </form>

            <button
              type="button"
              onClick={() => router.push(`/tutors?${tutorSearchParams().toString()}`)}
              className="flex h-11 w-full items-center justify-center rounded-full text-sm font-bold text-brand-700 underline underline-offset-4 hover:text-brand-800"
            >
              {t("signup.preview")}
            </button>

            <p className="text-center text-sm font-semibold text-ink-soft">
              {t("signup.loginPrompt")}{" "}
              <Link href="/login" className="text-brand-700 underline underline-offset-4">
                {t("signup.loginAction")}
              </Link>
            </p>
            <p className="text-center text-xs leading-5 text-muted">
              {t("signup.legal")}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}

function labelFor(items: Option[], value: string) {
  const item = items.find((nextItem) => nextItem.value === value);
  if (!item) return "";
  return item.flag ? `${item.flag} ${item.label}` : item.label;
}

function StepBody({
  step,
  t,
  answers,
  setAnswers,
  options,
  timeGroups,
  subjectLabel,
  answerSingle,
  answerList,
  openCatalog,
}: {
  step: StepId;
  t: ReturnType<typeof useTranslations<"onboarding">>;
  answers: Answers;
  setAnswers: React.Dispatch<React.SetStateAction<Answers>>;
  options: Record<string, Option[]>;
  timeGroups: TimeGroup[];
  subjectLabel: string;
  answerSingle: (key: keyof Answers, value: string) => void;
  answerList: (key: ArrayAnswerKey, value: string, max?: number) => void;
  openCatalog: (catalog: CatalogId) => void;
}) {
  if (step === "goal") {
    return (
      <Question title={t("questions.goal")}>
        <RadioList
          options={options.goals}
          value={answers.goal}
          onChange={(value) => answerSingle("goal", value)}
        />
      </Question>
    );
  }

  if (step === "timeline") {
    return (
      <Question title={t("questions.timeline")}>
        <RadioList
          options={options.timelines}
          value={answers.timeline}
          onChange={(value) => answerSingle("timeline", value)}
        />
      </Question>
    );
  }

  if (step === "industry") {
    return (
      <Question title={t("questions.industry")} subtitle={t("questions.industryHelp")}>
        <RadioList
          options={options.industries.slice(0, 4)}
          value={answers.industry}
          onChange={(value) => answerSingle("industry", value)}
        />
        <CatalogButton onClick={() => openCatalog("industries")}>
          {t("showAllIndustries")}
        </CatalogButton>
      </Question>
    );
  }

  if (step === "role") {
    return (
      <Question title={t("questions.role")} subtitle={t("questions.roleHelp")}>
        <Textarea
          value={answers.role}
          onChange={(event) =>
            setAnswers((current) => ({ ...current, role: event.target.value }))
          }
          placeholder={t("placeholders.role")}
          className="min-h-28 resize-none rounded-xl text-base"
        />
      </Question>
    );
  }

  if (step === "careerSkills") {
    return (
      <Question title={t("questions.careerSkills")}>
        <PillGrid
          options={options.careerSkills}
          selected={answers.careerSkills}
          onToggle={(value) => answerList("careerSkills", value)}
        />
      </Question>
    );
  }

  if (step === "topics") {
    return (
      <Question title={t("questions.topics")}>
        <PillGrid
          options={options.topics.slice(0, 6)}
          selected={answers.topics}
          onToggle={(value) => answerList("topics", value)}
        />
        <CatalogButton onClick={() => openCatalog("topics")}>
          {t("showAll")}
        </CatalogButton>
      </Question>
    );
  }

  if (step === "level") {
    return (
      <Question title={t("questions.level", { subject: subjectLabel })}>
        <RadioList
          options={options.levels}
          value={answers.level}
          onChange={(value) => answerSingle("level", value)}
        />
      </Question>
    );
  }

  if (step === "style") {
    return (
      <Question title={t("questions.style")} subtitle={t("questions.styleHelp")}>
        <PillGrid
          options={options.styles}
          selected={answers.style}
          onToggle={(value) => answerList("style", value, 3)}
        />
      </Question>
    );
  }

  if (step === "country") {
    return (
      <Question title={t("questions.country")}>
        <div className="mb-5 flex min-h-14 items-center justify-between rounded-xl border border-line px-4">
          <span className="font-semibold text-ink">{t("nativeOnly", { subject: subjectLabel })}</span>
          <Switch
            checked={answers.nativeOnly}
            onCheckedChange={(checked) =>
              setAnswers((current) => ({ ...current, nativeOnly: checked }))
            }
          />
        </div>
        <PillGrid
          options={options.countries.slice(0, 6)}
          selected={answers.country ? [answers.country] : []}
          onToggle={(value) => answerSingle("country", value)}
        />
        <CatalogButton onClick={() => openCatalog("countries")}>
          {t("showAll")}
        </CatalogButton>
      </Question>
    );
  }

  if (step === "alsoSpeaks") {
    return (
      <Question title={t("questions.alsoSpeaks")}>
        <PillGrid
          options={options.languages.slice(0, 4)}
          selected={answers.alsoSpeaks}
          onToggle={(value) => answerList("alsoSpeaks", value)}
        />
        <CatalogButton onClick={() => openCatalog("languages")}>
          {t("showAll")}
        </CatalogButton>
      </Question>
    );
  }

  if (step === "availability") {
    return (
      <Question title={t("questions.availability")}>
        <FieldGroup label={t("daysLabel")}>
          <PillGrid
            options={options.days}
            selected={answers.days}
            onToggle={(value) => answerList("days", value)}
          />
        </FieldGroup>
        <FieldGroup label={t("timesLabel")}>
          <AvailabilityPicker
            groups={timeGroups}
            selected={answers.times}
            onChange={(nextTimes) =>
              setAnswers((current) => ({ ...current, times: nextTimes }))
            }
          />
        </FieldGroup>
      </Question>
    );
  }

  if (step === "budget") {
    return (
      <Question title={t("questions.budget")}>
        <div className="mx-auto max-w-xl rounded-[1.75rem] border border-brand-100 bg-white p-5 shadow-card sm:p-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-muted">{t("budgetUnit")}</p>
              <div className="mt-2 font-display text-3xl font-extrabold text-ink">
                {answers.budget[0]} AZN - {answers.budget[1]} AZN
              </div>
            </div>
            <div className="hidden rounded-2xl bg-brand-50 px-4 py-3 text-sm font-extrabold text-brand-800 sm:block">
              AZN
            </div>
          </div>
          <Slider
            min={4}
            max={80}
            step={1}
            value={answers.budget}
            onValueChange={(value) =>
              setAnswers((current) => ({
                ...current,
                budget: [value[0] ?? 4, value[1] ?? 80],
              }))
            }
            className="mt-10"
          />
          <div className="mt-4 flex justify-between text-xs font-bold text-muted">
            <span>4 AZN</span>
            <span>80 AZN</span>
          </div>
        </div>
      </Question>
    );
  }

  if (step === "future") {
    return (
      <Question title={t("questions.future")}>
        <PillGrid
          options={options.future.slice(0, 8)}
          selected={answers.future}
          onToggle={(value) => answerList("future", value)}
        />
        <CatalogButton onClick={() => openCatalog("future")}>
          {t("showAll")}
        </CatalogButton>
      </Question>
    );
  }

  return (
    <Question title={t("questions.summary")} subtitle={t("questions.summaryHelp")}>
      <Textarea
        value={answers.note}
        onChange={(event) =>
          setAnswers((current) => ({ ...current, note: event.target.value }))
        }
        placeholder={t("placeholders.note")}
        className="min-h-32 resize-none rounded-xl text-base"
      />
    </Question>
  );
}

function Question({
  title,
  subtitle,
  children,
}: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1 className="font-display text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
        {title}
      </h1>
      {subtitle && <p className="mt-3 text-base leading-7 text-muted">{subtitle}</p>}
      <div className="mt-6">{children}</div>
    </div>
  );
}

function FieldGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-5">
      <p className="mb-3 text-sm font-bold text-ink-soft">{label}</p>
      {children}
    </div>
  );
}

function RadioList({
  options,
  value,
  onChange,
}: {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-3">
      {options.map((option) => {
        const selected = value === option.value;
        const Icon = option.icon;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              "flex min-h-16 w-full items-center gap-4 rounded-xl border bg-white px-4 text-left text-base font-semibold text-ink transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
              selected
                ? "border-brand-700 shadow-[inset_0_0_0_1px_var(--color-brand-700)]"
                : "border-line hover:border-brand-300 hover:bg-brand-50/40",
            )}
          >
            {Icon && <Icon className="h-5 w-5 text-brand-700" />}
            <FlagMark flag={option.flag} />
            <span className="flex-1">{option.label}</span>
            <span
              className={cn(
                "flex h-6 w-6 items-center justify-center rounded-full border",
                selected ? "border-brand-700 bg-brand-700" : "border-line",
              )}
            >
              {selected && <span className="h-2.5 w-2.5 rounded-full bg-white" />}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function PillGrid({
  options,
  selected,
  onToggle,
}: {
  options: Option[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {options.map((option) => {
        const active = selected.includes(option.value);
        const Icon = option.icon;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onToggle(option.value)}
            className={cn(
              "inline-flex min-h-11 items-center gap-2 rounded-xl border px-4 py-2 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
              active
                ? "border-brand-700 bg-brand-50 text-brand-900 shadow-[inset_0_0_0_1px_var(--color-brand-700)]"
                : "border-line bg-white text-ink hover:border-brand-300",
            )}
          >
            {Icon && <Icon className="h-4 w-4" />}
            <FlagMark flag={option.flag} compact />
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

function FlagMark({
  flag,
  compact = false,
}: {
  flag?: string;
  compact?: boolean;
}) {
  if (!flag) return null;
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-lg bg-white shadow-soft ring-1 ring-brand-50",
        compact ? "h-7 w-7 text-lg" : "h-10 w-10 text-2xl",
      )}
      aria-hidden
    >
      {flag}
    </span>
  );
}

function AvailabilityPicker({
  groups,
  selected,
  onChange,
}: {
  groups: TimeGroup[];
  selected: string[];
  onChange: (value: string[]) => void;
}) {
  const selectedSet = new Set(selected);

  function toggleGroup(group: TimeGroup) {
    const slotValues = group.slots.map((slot) => slot.value);
    if (selectedSet.has(group.value)) {
      onChange(
        selected.filter(
          (value) => value !== group.value && !slotValues.includes(value),
        ),
      );
      return;
    }
    onChange([...selected, group.value]);
  }

  function toggleSlot(group: TimeGroup, slot: Option) {
    const withoutNone = selected.filter(Boolean);
    const withGroup = withoutNone.includes(group.value)
      ? withoutNone
      : [...withoutNone, group.value];
    onChange(toggleValue(withGroup, slot.value));
  }

  return (
    <div className="space-y-3">
      {groups.map((group) => {
        const active = selectedSet.has(group.value);
        const Icon = group.icon;
        return (
          <div
            key={group.value}
            className={cn(
              "rounded-2xl border bg-white p-2 transition",
              active
                ? "border-brand-700 shadow-[inset_0_0_0_1px_var(--color-brand-700)]"
                : "border-line",
            )}
          >
            <button
              type="button"
              onClick={() => toggleGroup(group)}
              className="flex min-h-12 w-full items-center gap-3 rounded-xl px-3 text-left font-bold text-ink transition hover:bg-brand-50"
            >
              {Icon && (
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                  <Icon className="h-5 w-5" />
                </span>
              )}
              <span className="flex-1">{group.label}</span>
              <ChevronDown
                className={cn("h-5 w-5 text-muted transition", active && "rotate-180")}
              />
            </button>
            {active && (
              <div className="mt-2 flex flex-wrap gap-2 border-t border-line px-3 py-3">
                {group.slots.map((slot) => {
                  const slotActive = selectedSet.has(slot.value);
                  return (
                    <button
                      key={slot.value}
                      type="button"
                      onClick={() => toggleSlot(group, slot)}
                      className={cn(
                        "inline-flex h-10 items-center rounded-xl border px-4 text-sm font-extrabold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
                        slotActive
                          ? "border-brand-700 bg-brand-700 text-white"
                          : "border-line bg-surface text-ink hover:border-brand-300",
                      )}
                    >
                      {slot.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function CatalogButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-5 text-sm font-bold text-ink underline underline-offset-4"
    >
      {children}
    </button>
  );
}

function TutorSignalCard({
  onStart,
  t,
}: {
  onStart: () => void;
  t: ReturnType<typeof useTranslations<"onboarding">>;
}) {
  return (
    <div className="relative aspect-[4/4.15] overflow-hidden rounded-[2rem] bg-[linear-gradient(160deg,#ffffff_0%,#dbe7fe_52%,#93b8fd_100%)] shadow-card">
      <div className="absolute inset-0 dot-grid opacity-45" />
      <div className="absolute -left-16 top-16 h-48 w-48 rounded-full bg-white/45 blur-2xl" />
      <div className="absolute -right-14 bottom-20 h-56 w-56 rounded-full bg-brand-600/15 blur-2xl" />

      <div className="absolute left-10 right-10 top-8">
        <div className="rounded-[1.75rem] border border-white/80 bg-white/80 p-4 shadow-soft backdrop-blur">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-700 text-white">
              <BookOpen className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-extrabold uppercase text-brand-700">
                {t("visual.pathLabel")}
              </p>
              <p className="text-sm font-bold text-ink">{t("visual.pathText")}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute left-10 top-[10.25rem] h-48 w-48">
        <div className="absolute left-5 top-4 h-36 w-36 rounded-full border-[12px] border-white/75" />
        <div className="absolute left-11 top-8 h-28 w-28 rounded-full border-[9px] border-brand-600/70" />
        <div className="absolute left-24 top-[4.25rem] h-4 w-4 rounded-full bg-brand-700 shadow-card" />
        <div className="absolute left-6 top-[5.5rem] h-4 w-4 rounded-full bg-accent-400 shadow-card" />
        <div className="absolute right-6 top-8 h-4 w-4 rounded-full bg-emerald-500 shadow-card" />
        <div className="absolute bottom-7 left-20 h-4 w-4 rounded-full bg-ink shadow-card" />
        <div className="absolute left-12 top-[5.5rem] h-2 w-24 rotate-[-24deg] rounded-full bg-brand-700/80" />
        <div className="absolute left-[5.5rem] top-[3.75rem] h-2 w-20 rotate-[34deg] rounded-full bg-brand-700/80" />
        <div className="absolute left-24 top-[6.5rem] h-2 w-16 rotate-[78deg] rounded-full bg-brand-700/80" />
      </div>

      <div className="absolute right-10 top-[11rem] w-56 rounded-[1.75rem] border border-white/80 bg-white p-3.5 shadow-card">
        <div className="flex items-center gap-3">
          <div className="relative h-16 w-16 overflow-hidden rounded-2xl bg-brand-50 ring-2 ring-white">
            <Image
              src="/images/onboarding-tutor-avatar.png"
              alt=""
              width={96}
              height={96}
              className="h-full w-full object-cover"
              priority
            />
          </div>
          <div className="min-w-0">
            <p className="truncate font-display text-xl font-extrabold text-ink">
              {t("visual.tutorName")}
            </p>
            <p className="mt-1 text-sm font-semibold text-muted">
              {t("visual.tutorType")}
            </p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 text-xs font-bold text-ink">
          <BadgeCheck className="h-4 w-4 text-emerald-600" />
          {t("visual.profileText")}
        </div>
      </div>

      <div className="absolute bottom-[8.5rem] left-10 right-10 grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-white/80 bg-white/85 p-3 shadow-soft">
          <p className="text-xs font-bold text-muted">{t("visual.language")}</p>
          <p className="mt-1 font-display text-lg font-extrabold text-ink">
            🇬🇧 {t("subjects.english")}
          </p>
        </div>
        <div className="rounded-2xl border border-white/80 bg-white/85 p-3 shadow-soft">
          <p className="text-xs font-bold text-muted">{t("visual.schedule")}</p>
          <p className="mt-1 flex items-center gap-2 font-display text-lg font-extrabold text-ink">
            <Clock3 className="h-4 w-4 text-brand-700" />
            6-9
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onStart}
        className="absolute bottom-8 left-10 right-10 rounded-[1.75rem] bg-brand-700 p-4 text-left text-white shadow-brand outline-none transition hover:bg-brand-800 focus-visible:ring-4 focus-visible:ring-brand-700/25"
      >
        <div className="flex items-center justify-between gap-3">
          <span className="font-display text-xl font-extrabold">
            {t("visual.ctaHint")}
          </span>
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-brand-700">
            <ArrowRight className="h-5 w-5" />
          </span>
        </div>
      </button>
    </div>
  );
}

function StepIllustration({ step }: { step: StepId }) {
  return (
    <div className="relative flex h-[25rem] w-[25rem] items-center justify-center">
      <div className="absolute h-80 w-80 rounded-[5rem] bg-white/35 shadow-soft" />
      <div className="absolute h-64 w-64 rounded-full bg-brand-100/70" />
      <svg
        key={step}
        viewBox="0 0 320 320"
        role="img"
        aria-hidden="true"
        className="relative z-10 h-full w-full animate-rise drop-shadow-sm"
      >
        <IllustrationScene step={step} />
      </svg>
    </div>
  );
}

function IllustrationScene({ step }: { step: StepId }) {
  const base = (
    <>
      <circle cx="72" cy="72" r="14" fill="#ffd988" />
      <circle cx="250" cy="78" r="10" fill="#ffffff" opacity="0.85" />
      <path
        d="M64 250 C98 270 222 270 258 250"
        fill="none"
        stroke="#1d3585"
        strokeWidth="8"
        strokeLinecap="round"
        opacity="0.16"
      />
    </>
  );

  const scenes: Record<StepId, React.ReactNode> = {
    goal: (
      <>
        {base}
        <circle cx="160" cy="155" r="76" fill="#ffffff" />
        <circle cx="160" cy="155" r="52" fill="#dbe7fe" stroke="#162152" strokeWidth="7" />
        <circle cx="160" cy="155" r="20" fill="#2456e6" />
        <path d="M160 82 L160 52 L188 64 L160 76" fill="#ffc14a" stroke="#162152" strokeWidth="6" strokeLinejoin="round" />
        <path d="M160 155 L226 116" stroke="#162152" strokeWidth="8" strokeLinecap="round" />
        <path d="M226 116 L238 91 L247 126 Z" fill="#16a34a" stroke="#162152" strokeWidth="6" strokeLinejoin="round" />
      </>
    ),
    timeline: (
      <>
        {base}
        <path d="M82 230 H250" stroke="#162152" strokeWidth="8" strokeLinecap="round" />
        <path d="M92 230 V100" stroke="#162152" strokeWidth="8" strokeLinecap="round" />
        <rect x="112" y="172" width="32" height="58" rx="6" fill="#93b8fd" stroke="#162152" strokeWidth="6" />
        <rect x="156" y="138" width="32" height="92" rx="6" fill="#16a34a" stroke="#162152" strokeWidth="6" />
        <rect x="200" y="98" width="32" height="132" rx="6" fill="#ffc14a" stroke="#162152" strokeWidth="6" />
        <path d="M222 80 L228 94 L243 98 L228 104 L222 118 L216 104 L201 98 L216 94 Z" fill="#ffffff" stroke="#162152" strokeWidth="5" strokeLinejoin="round" />
      </>
    ),
    industry: (
      <>
        {base}
        <rect x="76" y="112" width="168" height="112" rx="18" fill="#ffffff" stroke="#162152" strokeWidth="7" />
        <rect x="116" y="84" width="88" height="44" rx="14" fill="#2456e6" stroke="#162152" strokeWidth="7" />
        <path d="M130 84 V70 H190 V84" fill="none" stroke="#162152" strokeWidth="7" strokeLinecap="round" />
        <path d="M104 154 H216 M104 184 H190" stroke="#93b8fd" strokeWidth="10" strokeLinecap="round" />
        <circle cx="222" cy="120" r="18" fill="#ffc14a" stroke="#162152" strokeWidth="6" />
      </>
    ),
    role: (
      <>
        {base}
        <rect x="92" y="86" width="136" height="168" rx="20" fill="#ffffff" stroke="#162152" strokeWidth="7" />
        <rect x="126" y="66" width="68" height="42" rx="12" fill="#ffc14a" stroke="#162152" strokeWidth="7" />
        <circle cx="138" cy="150" r="24" fill="#93b8fd" stroke="#162152" strokeWidth="6" />
        <path d="M101 214 C114 186 162 186 175 214" fill="#2456e6" stroke="#162152" strokeWidth="6" />
        <path d="M180 142 H208 M180 170 H208 M180 198 H196" stroke="#16a34a" strokeWidth="8" strokeLinecap="round" />
      </>
    ),
    careerSkills: (
      <>
        {base}
        <path d="M88 204 L178 114 L164 100 L238 82 L220 156 L206 142 L116 232 Z" fill="#16a34a" stroke="#162152" strokeWidth="7" strokeLinejoin="round" />
        <circle cx="100" cy="220" r="18" fill="#ffffff" stroke="#162152" strokeWidth="6" />
        <circle cx="232" cy="88" r="14" fill="#ffc14a" stroke="#162152" strokeWidth="5" />
      </>
    ),
    topics: (
      <>
        {base}
        <path d="M78 102 C110 84 136 88 160 112 C184 88 210 84 242 102 V226 C210 208 184 212 160 236 C136 212 110 208 78 226 Z" fill="#ffffff" stroke="#162152" strokeWidth="7" strokeLinejoin="round" />
        <path d="M160 112 V236" stroke="#162152" strokeWidth="6" />
        <path d="M104 130 H138 M104 158 H132 M184 130 H218 M184 158 H212 M184 186 H224" stroke="#93b8fd" strokeWidth="8" strokeLinecap="round" />
        <rect x="108" y="180" width="34" height="42" rx="6" fill="#ffc14a" stroke="#162152" strokeWidth="5" />
      </>
    ),
    level: (
      <>
        {base}
        <rect x="92" y="180" width="136" height="34" rx="12" fill="#2456e6" stroke="#162152" strokeWidth="7" />
        <rect x="108" y="142" width="124" height="38" rx="12" fill="#93b8fd" stroke="#162152" strokeWidth="7" />
        <rect x="126" y="104" width="102" height="38" rx="12" fill="#ffffff" stroke="#162152" strokeWidth="7" />
        <path d="M118 104 C104 96 102 80 118 72 C138 62 162 82 126 104" fill="#ffc14a" stroke="#162152" strokeWidth="6" />
      </>
    ),
    style: (
      <>
        {base}
        <circle cx="160" cy="160" r="70" fill="#ffffff" stroke="#162152" strokeWidth="7" />
        <path d="M132 164 C142 184 178 184 188 164" fill="none" stroke="#162152" strokeWidth="7" strokeLinecap="round" />
        <circle cx="134" cy="140" r="8" fill="#162152" />
        <circle cx="186" cy="140" r="8" fill="#162152" />
        <path d="M92 112 L70 86 M226 112 L250 86 M160 86 V52" stroke="#2456e6" strokeWidth="8" strokeLinecap="round" />
        <path d="M242 206 L252 230 L276 236 L252 246 L242 270 L232 246 L208 236 L232 230 Z" fill="#ffc14a" stroke="#162152" strokeWidth="5" strokeLinejoin="round" />
      </>
    ),
    country: (
      <>
        {base}
        <circle cx="160" cy="150" r="72" fill="#93b8fd" stroke="#162152" strokeWidth="7" />
        <path d="M104 130 C132 122 142 96 166 112 C176 120 166 140 186 148 C204 156 212 136 232 148" fill="none" stroke="#16a34a" strokeWidth="16" strokeLinecap="round" />
        <path d="M122 190 C148 174 176 202 206 180" fill="none" stroke="#16a34a" strokeWidth="16" strokeLinecap="round" />
        <path d="M160 222 V252 M122 252 H198" stroke="#162152" strokeWidth="7" strokeLinecap="round" />
      </>
    ),
    alsoSpeaks: (
      <>
        {base}
        <path d="M92 128 C92 102 118 84 152 84 C190 84 216 105 216 134 C216 160 190 180 154 180 H126 L94 204 L104 174 C96 164 92 148 92 128Z" fill="#2456e6" stroke="#162152" strokeWidth="7" strokeLinejoin="round" />
        <path d="M132 138 H176 M132 116 H188" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" />
        <path d="M144 204 C144 184 164 170 190 170 C220 170 240 188 240 210 C240 232 218 248 190 248 H172 L148 266 L156 242 C148 232 144 220 144 204Z" fill="#ffc14a" stroke="#162152" strokeWidth="7" strokeLinejoin="round" />
      </>
    ),
    availability: (
      <>
        {base}
        <rect x="86" y="94" width="148" height="148" rx="18" fill="#ffffff" stroke="#162152" strokeWidth="7" />
        <rect x="86" y="94" width="148" height="42" rx="18" fill="#2456e6" stroke="#162152" strokeWidth="7" />
        <path d="M116 76 V108 M204 76 V108" stroke="#162152" strokeWidth="8" strokeLinecap="round" />
        <path d="M112 164 H208 M112 194 H208 M142 136 V236 M178 136 V236" stroke="#bfd5fe" strokeWidth="5" />
        <circle cx="126" cy="162" r="11" fill="#ffc14a" stroke="#162152" strokeWidth="5" />
        <circle cx="194" cy="202" r="11" fill="#16a34a" stroke="#162152" strokeWidth="5" />
      </>
    ),
    budget: (
      <>
        {base}
        <ellipse cx="146" cy="214" rx="62" ry="22" fill="#dd6b02" stroke="#162152" strokeWidth="7" />
        <rect x="84" y="138" width="124" height="76" rx="22" fill="#ffc14a" stroke="#162152" strokeWidth="7" />
        <ellipse cx="146" cy="138" rx="62" ry="22" fill="#ffd988" stroke="#162152" strokeWidth="7" />
        <circle cx="216" cy="126" r="46" fill="#ffc14a" stroke="#162152" strokeWidth="7" />
        <path d="M202 126 H230 M216 110 V142" stroke="#162152" strokeWidth="8" strokeLinecap="round" />
      </>
    ),
    future: (
      <>
        {base}
        <path d="M88 120 L190 92 L238 122 L136 150 Z" fill="#ffffff" stroke="#162152" strokeWidth="7" strokeLinejoin="round" />
        <path d="M88 120 V214 L136 244 V150 Z" fill="#93b8fd" stroke="#162152" strokeWidth="7" strokeLinejoin="round" />
        <path d="M136 150 V244 L238 214 V122 Z" fill="#dbe7fe" stroke="#162152" strokeWidth="7" strokeLinejoin="round" />
        <circle cx="208" cy="168" r="34" fill="#ffc14a" stroke="#162152" strokeWidth="7" />
        <path d="M232 192 L256 216" stroke="#162152" strokeWidth="9" strokeLinecap="round" />
      </>
    ),
    summary: (
      <>
        {base}
        <rect x="72" y="96" width="176" height="128" rx="26" fill="#ffffff" stroke="#162152" strokeWidth="7" />
        <path d="M106 130 H210 M106 162 H190 M106 194 H156" stroke="#93b8fd" strokeWidth="9" strokeLinecap="round" />
        <circle cx="224" cy="210" r="34" fill="#16a34a" stroke="#162152" strokeWidth="7" />
        <path d="M210 210 L220 220 L240 198" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  };

  return scenes[step];
}

function SummaryCloud({ chips }: { chips: string[] }) {
  return (
    <div className="flex max-w-xl flex-wrap gap-3">
      {chips.map((chip, index) => (
        <span
          key={`${chip}-${index}`}
          className="inline-flex min-h-11 items-center rounded-full border border-brand-900/20 bg-white/80 px-4 py-2 text-base font-extrabold text-brand-950 shadow-soft"
        >
          {chip}
        </span>
      ))}
    </div>
  );
}
