"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  CalendarDays,
  ChevronDown,
  Clock3,
  Flame,
  Heart,
  Languages,
  MessageSquare,
  Play,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  BadgePercent,
  Star,
  Sun,
  Sunrise,
  Sunset,
  Trophy,
  UserRoundCheck,
  X,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { useCurrency } from "@/components/shared/CurrencyProvider";
import { Button, buttonVariants } from "@/components/ui/button";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { type SpecialtyCode, type SubjectCode, type Tutor } from "@/lib/tutors";
import { useSavedTutors } from "@/lib/tutors/useSavedTutors";
import { useTutorsQuery } from "@/lib/tutors/useTutorsQuery";
import { cn } from "@/lib/utils";

type SortKey = "top" | "priceLow" | "priceHigh" | "popular" | "reviews" | "rating";

const languages: SubjectCode[] = ["en", "ru", "tr", "de", "fr", "es", "ar", "it"];
const countries = ["AZ", "US", "GB", "UA", "CA", "FI"];
const specialties: SpecialtyCode[] = [
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
];
const alsoSpeaks = ["az", "ru", "tr", "en", "fi"] as const;
type SpokenLanguage = (typeof alsoSpeaks)[number];
const timeRanges = [
  { value: "9-12", group: "daytime" },
  { value: "12-15", group: "daytime" },
  { value: "15-18", group: "daytime" },
  { value: "18-21", group: "evening" },
  { value: "21-24", group: "evening" },
  { value: "0-3", group: "evening" },
  { value: "3-6", group: "morning" },
  { value: "6-9", group: "morning" },
] as const;
const timeGroupIcons: Record<(typeof timeRanges)[number]["group"], LucideIcon> = {
  daytime: Sun,
  evening: Sunset,
  morning: Sunrise,
};
const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

const subjectParamToCode: Record<string, SubjectCode> = {
  en: "en",
  english: "en",
  ru: "ru",
  russian: "ru",
  tr: "tr",
  turkish: "tr",
  de: "de",
  german: "de",
  fr: "fr",
  french: "fr",
  es: "es",
  spanish: "es",
  ar: "ar",
  arabic: "ar",
  it: "it",
  italian: "it",
};

const subjectCodeToOnboarding: Record<SubjectCode, string> = {
  en: "english",
  ru: "russian",
  tr: "turkish",
  de: "german",
  fr: "french",
  es: "spanish",
  ar: "arabic",
  it: "italian",
};

function initialSubjectCode(subject?: string): SubjectCode | null {
  if (!subject) return null;
  return subjectParamToCode[subject.toLowerCase()] ?? null;
}

function hasCompletedSubject(code: SubjectCode) {
  if (typeof window === "undefined") return false;

  try {
    const raw = window.localStorage.getItem("dilup_completed_onboarding_subjects");
    const completed = raw ? JSON.parse(raw) : [];
    return Array.isArray(completed) && completed.includes(subjectCodeToOnboarding[code]);
  } catch {
    return false;
  }
}

export function TutorSearchPage({
  initialSubject,
  tutors: initialTutors,
}: {
  initialSubject?: string;
  tutors: Tutor[];
}) {
  const t = useTranslations("tutors");
  const dayLabels = useTranslations("onboarding");
  const { format } = useCurrency();
  const { data: tutors, isError, isFetching, refetch } = useTutorsQuery(initialTutors);
  const { isSaved, toggleSaved } = useSavedTutors();
  const normalizedInitialSubject = initialSubjectCode(initialSubject);
  const [activeTutorId, setActiveTutorId] = useState(tutors[0]?.id ?? "");
  const [subject, setSubject] = useState<SubjectCode | null>(normalizedInitialSubject);
  const [draftSubject, setDraftSubject] = useState<SubjectCode | null>(normalizedInitialSubject);
  const [price, setPrice] = useState([4, 68]);
  const [country, setCountry] = useState<string | null>(null);
  const [selectedSpecialties, setSelectedSpecialties] = useState<SpecialtyCode[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<SpokenLanguage[]>([]);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [nativeOnly, setNativeOnly] = useState(false);
  const [professionalOnly, setProfessionalOnly] = useState(false);
  const [superOnly, setSuperOnly] = useState(false);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("top");

  const filteredTutors = useMemo(() => {
    if (!subject) return [];

    const loweredQuery = query.trim().toLowerCase();
    const result = tutors.filter((tutor) => {
      const inPrice = tutor.price >= price[0] && tutor.price <= price[1];
      const inCountry = !country || tutor.countryCode === country;
      const inSubject = tutor.subject === subject;
      const inSpecialty =
        selectedSpecialties.length === 0 ||
        selectedSpecialties.some((item) => tutor.specialties.includes(item));
      const inLanguage =
        selectedLanguages.length === 0 ||
        selectedLanguages.some((item) => tutor.alsoSpeaks.includes(item));
      const nativeMatch = !nativeOnly || tutor.languages.some((language) => language.code === subject && language.level === "native");
      const professionalMatch = !professionalOnly || tutor.categories.includes("professional");
      const superMatch = !superOnly || tutor.categories.includes("super");
      const queryMatch =
        !loweredQuery ||
        [
          tutor.name,
          tutor.source === "db" ? tutor.headline : t(`copy.${tutor.headline}`),
          tutor.bio,
          t(`countries.${tutor.countryCode}`),
          ...tutor.specialties.map((specialty) => (tutor.source === "db" ? specialty : t(`specialties.${specialty}`))),
        ]
          .join(" ")
          .toLowerCase()
          .includes(loweredQuery);

      return (
        inSubject &&
        inPrice &&
        inCountry &&
        inSpecialty &&
        inLanguage &&
        nativeMatch &&
        professionalMatch &&
        superMatch &&
        queryMatch
      );
    });

    return result.sort((a, b) => {
      if (sort === "priceLow") return a.price - b.price;
      if (sort === "priceHigh") return b.price - a.price;
      if (sort === "popular") return b.lessons - a.lessons;
      if (sort === "reviews") return b.reviewsCount - a.reviewsCount;
      if (sort === "rating") return b.rating - a.rating;
      return b.recentlyBooked + b.rating - (a.recentlyBooked + a.rating);
    });
  }, [
    country,
    nativeOnly,
    price,
    professionalOnly,
    query,
    selectedLanguages,
    selectedSpecialties,
    sort,
    subject,
    superOnly,
    t,
    tutors,
  ]);

  const activeTutor = filteredTutors.find((tutor) => tutor.id === activeTutorId) ?? filteredTutors[0] ?? tutors[0];
  const draftSubjectLabel = draftSubject ? t(`subjects.${draftSubject}`) : t("filters.chooseLanguage");
  const quizHref = draftSubject ? `/get-started?subject=${subjectCodeToOnboarding[draftSubject]}` : "/get-started";

  function chooseSubject(nextSubject: SubjectCode) {
    setDraftSubject(nextSubject);
    if (hasCompletedSubject(nextSubject)) {
      setSubject(nextSubject);
      setActiveTutorId(tutors.find((tutor) => tutor.subject === nextSubject)?.id ?? tutors[0]?.id ?? "");
      return;
    }
    setSubject(null);
  }

  function toggleValue<T extends string>(value: T, values: T[], setValues: (next: T[]) => void) {
    setValues(values.includes(value) ? values.filter((item) => item !== value) : [...values, value]);
  }

  return (
    <>
      <Navbar />
      <main className="min-h-dvh bg-white">
      <section className="mx-auto w-full max-w-[1500px] px-5 pb-16 pt-8 sm:px-7 lg:px-10">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold text-brand-700">{t("eyebrow")}</p>
            <h1 className="mt-2 max-w-4xl text-3xl font-black tracking-normal text-ink sm:text-4xl lg:text-5xl">
              {subject ? t("title", { subject: t(`subjects.${subject}`) }) : t("chooseTitle")}
            </h1>
            {!subject ? (
              <p className="mt-3 max-w-2xl text-base font-semibold leading-7 text-ink-soft">
                {t("chooseSubtitle")}
              </p>
            ) : null}
          </div>
          <div className="flex items-center gap-3">
            {isFetching ? (
              <span className="hidden rounded-full bg-surface px-4 py-2 text-sm font-bold text-ink-soft md:inline-flex">
                {t("refreshing")}
              </span>
            ) : null}
            <div className="hidden rounded-full bg-brand-50 px-4 py-2 text-sm font-bold text-brand-800 md:block">
              {t("resultCount", { count: filteredTutors.length })}
            </div>
          </div>
        </div>

        {isError ? (
          <div className="mt-6 flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-black text-red-950">{t("errorTitle")}</p>
              <p className="mt-1 text-sm font-semibold text-red-800">{t("errorText")}</p>
            </div>
            <Button type="button" variant="outline" onClick={() => refetch()}>
              {t("tryAgain")}
            </Button>
          </div>
        ) : null}

        <div className="relative z-30 mt-8 bg-white py-3">
          <div className="grid gap-3 lg:grid-cols-4">
            <Picker label={t("filters.learn")} value={draftSubjectLabel} className="lg:col-span-1">
              <CommandList
                items={languages.map((value) => ({ value, label: t(`subjects.${value}`), available: value === "en" }))}
                activeItems={draftSubject ? [draftSubject] : []}
                onSelect={(item) => chooseSubject(item as SubjectCode)}
              />
            </Picker>

            {subject ? (
            <Picker label={t("filters.price")} value={`${format(price[0])} - ${format(price[1])}`}>
              <div className="px-2 py-4">
                <div className="text-center text-2xl font-black text-ink">{format(price[0])} - {format(price[1])}</div>
                <Slider
                  min={4}
                  max={68}
                  step={1}
                  value={price}
                  onValueChange={setPrice}
                  className="mt-7"
                />
              </div>
            </Picker>
            ) : null}

            {subject ? (
            <Picker label={t("filters.country")} value={country ? t(`countries.${country}`) : t("filters.anyCountry")}>
              <CommandList
                items={countries.map((value) => ({ value, label: t(`countries.${value}`) }))}
                activeItems={country ? [country] : []}
                searchable
                onSelect={(item) => setCountry(country === item ? null : item)}
              />
            </Picker>
            ) : null}

            {subject ? (
            <Picker
              label={t("filters.available")}
              value={selectedTimes.length || selectedDays.length ? t("filters.timesSelected", { count: selectedTimes.length + selectedDays.length }) : t("filters.anyTime")}
            >
              <div className="space-y-5">
                <FilterGroup icon={timeGroupIcons.daytime} title={t("filters.daytime")}>
                  {timeRanges.filter((item) => item.group === "daytime").map((item) => (
                    <TimeButton
                      key={item.value}
                      value={item.value}
                      active={selectedTimes.includes(item.value)}
                      onClick={() => toggleValue(item.value, selectedTimes, setSelectedTimes)}
                    />
                  ))}
                </FilterGroup>
                <FilterGroup icon={timeGroupIcons.evening} title={t("filters.evening")}>
                  {timeRanges.filter((item) => item.group === "evening").map((item) => (
                    <TimeButton
                      key={item.value}
                      value={item.value}
                      active={selectedTimes.includes(item.value)}
                      onClick={() => toggleValue(item.value, selectedTimes, setSelectedTimes)}
                    />
                  ))}
                </FilterGroup>
                <FilterGroup icon={timeGroupIcons.morning} title={t("filters.morning")}>
                  {timeRanges.filter((item) => item.group === "morning").map((item) => (
                    <TimeButton
                      key={item.value}
                      value={item.value}
                      active={selectedTimes.includes(item.value)}
                      onClick={() => toggleValue(item.value, selectedTimes, setSelectedTimes)}
                    />
                  ))}
                </FilterGroup>
                <FilterGroup title={t("filters.days")}>
                  {days.map((item) => {
                    const active = selectedDays.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleValue(item, selectedDays, setSelectedDays)}
                        className={cn(
                          "h-11 rounded-xl border text-sm font-black transition",
                          active
                            ? "border-brand-600 bg-brand-600 text-white"
                            : "border-line bg-white text-ink-soft hover:border-brand-500 hover:bg-brand-50 hover:text-brand-800",
                        )}
                      >
                        {dayLabels(`days.${item}`)}
                      </button>
                    );
                  })}
                </FilterGroup>
              </div>
              {selectedTimes.length || selectedDays.length ? (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedTimes([]);
                    setSelectedDays([]);
                  }}
                  className="mt-4 w-full rounded-lg border border-line py-2.5 text-sm font-bold text-ink-soft hover:border-brand-400 hover:text-brand-700"
                >
                  {t("filters.clearTimes")}
                </button>
              ) : null}
            </Picker>
            ) : null}
          </div>

          {subject ? (
          <div className="mt-3 flex flex-wrap gap-3">
            <Picker label={t("filters.specialties")} value={selectedSpecialties.length ? `${selectedSpecialties.length}` : ""} compact>
              <CommandList
                items={specialties.map((value) => ({ value, label: t(`specialties.${value}`) }))}
                activeItems={selectedSpecialties}
                onSelect={(item) => toggleValue(item as SpecialtyCode, selectedSpecialties, setSelectedSpecialties)}
              />
            </Picker>
            <Picker label={t("filters.alsoSpeaks")} value={selectedLanguages.length ? `${selectedLanguages.length}` : ""} compact>
              <CommandList
                items={alsoSpeaks.map((value) => ({ value, label: t(`languages.${value}`) }))}
                activeItems={selectedLanguages}
                searchable
                onSelect={(item) => toggleValue(item as SpokenLanguage, selectedLanguages, setSelectedLanguages)}
              />
            </Picker>
            <TogglePicker label={t("filters.native")} checked={nativeOnly} onCheckedChange={setNativeOnly} />
            <Popover>
              <PopoverTrigger asChild>
                <button type="button" className="flex h-14 min-w-0 items-center justify-between gap-3 rounded-xl border border-line bg-white px-4 text-base font-bold text-ink-soft hover:border-brand-400">
                  <span className="truncate">{t("filters.categories")}</span>
                  <ChevronDown className="h-5 w-5" />
                </button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-[min(24rem,calc(100vw-32px))] p-0">
                <CategoryToggle title={t("filters.superTutor")} text={t("filters.superText")} checked={superOnly} onCheckedChange={setSuperOnly} icon="super" />
                <CategoryToggle title={t("filters.professionalTutor")} text={t("filters.professionalText")} checked={professionalOnly} onCheckedChange={setProfessionalOnly} icon="professional" />
              </PopoverContent>
            </Popover>
            <SortPicker sort={sort} setSort={setSort} />
            <label className="flex h-14 min-w-[260px] flex-1 items-center gap-3 rounded-xl border border-line bg-white px-4 focus-within:border-brand-500">
              <Search className="h-5 w-5 text-muted" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t("filters.search")}
                className="min-w-0 flex-1 bg-transparent text-base font-semibold outline-none placeholder:text-muted"
              />
              {query ? (
                <button type="button" onClick={() => setQuery("")} aria-label={t("filters.clear")}>
                  <X className="h-4 w-4" />
                </button>
              ) : null}
            </label>
          </div>
          ) : null}
        </div>

        <div className="mt-4">
          {!subject ? (
            <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px] xl:grid-cols-[minmax(0,1fr)_410px]">
              <div className="rounded-2xl border border-line bg-surface p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <Search className="h-6 w-6" />
                </div>
                <h2 className="mt-5 text-2xl font-black text-ink">{t("chooseCardTitle")}</h2>
                <p className="mt-2 max-w-2xl text-base font-semibold leading-7 text-ink-soft">
                  {t("chooseCardText")}
                </p>
                <Link
                  href={quizHref}
                  aria-disabled={!draftSubject}
                  className={cn(
                    buttonVariants({ variant: "accent", size: "lg" }),
                    "mt-6",
                    !draftSubject && "pointer-events-none opacity-50",
                  )}
                >
                  {t("startMatching")}
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
              <div className="hidden lg:block" />
            </div>
          ) : null}
          {subject ? (
          <>
          <div className="mb-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px] xl:grid-cols-[minmax(0,1fr)_410px]">
            <div className="flex items-center gap-4 rounded-xl border border-line bg-surface px-4 py-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                <BadgePercent className="h-5 w-5" />
              </span>
              <div>
                <p className="font-black text-ink">{t("promoTitle")}</p>
                <p className="text-sm font-semibold text-ink-soft">{t("promoText")}</p>
              </div>
            </div>
            <div className="hidden lg:block" />
          </div>

          <div className="space-y-5">
            {filteredTutors.map((tutor) => (
              <div key={tutor.id} className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px] lg:min-h-[312px] xl:grid-cols-[minmax(0,1fr)_410px]">
                <TutorCard
                  tutor={tutor}
                  active={activeTutor.id === tutor.id}
                  onActivate={() => setActiveTutorId(tutor.id)}
                  saved={isSaved(tutor.id)}
                  onToggleSaved={() => toggleSaved(tutor.id)}
                />
                {activeTutor.id === tutor.id ? <TutorPreview tutor={activeTutor} /> : <div className="hidden lg:block" />}
              </div>
            ))}
            {filteredTutors.length === 0 ? (
              <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px] xl:grid-cols-[minmax(0,1fr)_410px]">
                <div className="rounded-2xl border border-dashed border-line bg-surface p-10 text-center">
                  <SlidersHorizontal className="mx-auto h-9 w-9 text-brand-600" />
                  <h2 className="mt-4 text-xl font-black text-ink">{t("emptyTitle")}</h2>
                  <p className="mt-2 text-sm font-semibold text-ink-soft">{t("emptyText")}</p>
                </div>
                <div className="hidden lg:block" />
              </div>
            ) : null}
          </div>
          </>
          ) : null}
        </div>
      </section>
      </main>
      <Footer />
    </>
  );
}

function Picker({ children, className, compact = false, label, value }: { children: React.ReactNode; className?: string; compact?: boolean; label: string; value: string }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex h-14 min-w-0 items-center justify-between gap-3 rounded-xl border border-line bg-white px-4 text-left hover:border-brand-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
            className,
          )}
        >
          <span className="min-w-0">
            <span className={cn("block truncate text-sm font-semibold text-ink-soft", compact && "text-base font-bold")}>{label}</span>
            {value ? <span className="block truncate text-base font-black text-ink">{value}</span> : null}
          </span>
          <ChevronDown className="h-5 w-5 shrink-0" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[min(360px,calc(100vw-32px))] p-3">
        {children}
      </PopoverContent>
    </Popover>
  );
}

function CommandList({
  activeItems,
  items,
  onSelect,
  searchable = false,
}: {
  activeItems: string[];
  items: { available?: boolean; label: string; value: string }[];
  onSelect: (item: string) => void;
  searchable?: boolean;
}) {
  const t = useTranslations("tutors");
  const onboardingT = useTranslations("onboarding");
  const [search, setSearch] = useState("");
  const visibleItems = items.filter((item) => item.label.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      {searchable ? (
        <label className="mb-3 flex h-12 items-center gap-2 rounded-xl border border-line px-3">
          <Search className="h-4 w-4 text-muted" />
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={t("filters.typeSearch")} className="min-w-0 flex-1 bg-transparent text-sm font-semibold outline-none" />
        </label>
      ) : null}
      <div className="max-h-80 overflow-y-auto overflow-x-hidden pr-2 [scrollbar-gutter:stable] [scrollbar-width:thin] [scrollbar-color:var(--color-brand-200)_transparent] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-brand-200 [&::-webkit-scrollbar-track]:bg-transparent">
        {visibleItems.map((item) => {
          const active = activeItems.includes(item.value);
          const available = item.available ?? true;
          return (
            <button
              key={item.value}
              type="button"
              disabled={!available}
              onClick={() => available && onSelect(item.value)}
              className={cn(
                "flex min-h-12 w-full items-center justify-between gap-4 border-b border-line py-1 pl-1 pr-2 text-left text-base font-semibold last:border-0",
                available ? "hover:text-brand-700" : "cursor-not-allowed text-muted",
              )}
            >
              <span className="flex min-w-0 flex-1 items-center gap-2 pr-2">
                <span className="truncate">{item.label}</span>
                {available ? null : (
                  <span className="shrink-0 rounded-full bg-line px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-muted">
                    {onboardingT("subjects.comingSoon")}
                  </span>
                )}
              </span>
              <span className={cn("flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-line", active && "border-brand-600 bg-brand-600 text-white")}>
                {active ? <BadgeCheck className="h-4 w-4" /> : null}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TogglePicker({ checked, label, onCheckedChange }: { checked: boolean; label: string; onCheckedChange: (checked: boolean) => void }) {
  const t = useTranslations("tutors");

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button type="button" className="flex h-14 min-w-0 items-center justify-between gap-3 rounded-xl border border-line bg-white px-4 text-base font-bold text-ink-soft hover:border-brand-400">
          <span className="truncate">{label}</span>
          <ChevronDown className="h-5 w-5" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-80">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-base font-black text-ink">{label}</p>
            <p className="mt-2 text-sm font-semibold leading-6 text-ink-soft">{t("filters.nativeText")}</p>
          </div>
          <Switch checked={checked} onCheckedChange={onCheckedChange} />
        </div>
      </PopoverContent>
    </Popover>
  );
}

function CategoryToggle({ checked, icon, onCheckedChange, text, title }: { checked: boolean; icon: "super" | "professional"; onCheckedChange: (checked: boolean) => void; text: string; title: string }) {
  const Icon = icon === "super" ? Trophy : UserRoundCheck;
  return (
    <div className="flex items-start justify-between gap-4 border-b border-line p-5 last:border-0">
      <div className="flex gap-3">
        <Icon className="mt-0.5 h-5 w-5 text-brand-700" />
        <div>
          <p className="font-black text-ink">{title}</p>
          <p className="mt-2 text-sm font-semibold leading-6 text-ink-soft">{text}</p>
        </div>
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}

function SortPicker({ setSort, sort }: { sort: SortKey; setSort: (sort: SortKey) => void }) {
  const t = useTranslations("tutors");
  const options: { key: SortKey; label: string }[] = [
    { key: "priceLow", label: t("sort.priceLow") },
    { key: "priceHigh", label: t("sort.priceHigh") },
    { key: "popular", label: t("sort.popular") },
    { key: "reviews", label: t("sort.reviews") },
    { key: "rating", label: t("sort.rating") },
    { key: "top", label: t("sort.top") },
  ];
  const active = options.find((option) => option.key === sort)?.label ?? t("sort.top");
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button type="button" className="flex h-14 min-w-0 max-w-full items-center justify-between gap-3 rounded-xl border border-line bg-white px-4 text-base font-bold text-ink-soft hover:border-brand-400">
          <span className="truncate">{t("sort.label", { value: active })}</span>
          <ChevronDown className="h-5 w-5" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-72 p-2">
        {options.map((option) => (
          <button key={option.key} type="button" onClick={() => setSort(option.key)} className="flex min-h-11 w-full items-center justify-between rounded-lg px-3 text-left text-sm font-bold hover:bg-brand-50">
            {option.label}
            {sort === option.key ? <BadgeCheck className="h-4 w-4 text-brand-700" /> : null}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
}

function FilterGroup({ children, icon: Icon, title }: { children: React.ReactNode; icon?: LucideIcon; title: string }) {
  return (
    <div>
      <p className="mb-3 flex items-center gap-2 text-sm font-black text-ink">
        {Icon ? (
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
            <Icon className="h-4 w-4" />
          </span>
        ) : null}
        {title}
      </p>
      <div className="grid grid-cols-3 gap-2">{children}</div>
    </div>
  );
}

function TimeButton({ active, onClick, value }: { active: boolean; onClick: () => void; value: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex h-12 items-center justify-center gap-2 rounded-xl border px-2 text-sm font-black transition",
        active
          ? "border-brand-600 bg-brand-600 text-white"
          : "border-line bg-white text-ink-soft hover:border-brand-500 hover:bg-brand-50 hover:text-brand-800",
      )}
    >
      <Clock3 className="h-4 w-4 shrink-0" />
      <span>{value}</span>
    </button>
  );
}

function TutorPreview({ tutor }: { tutor: Tutor }) {
  const t = useTranslations("tutors");

  return (
    <aside className="hidden lg:block">
      <div className="rounded-2xl border border-line bg-white p-4 shadow-card">
        <div className="relative aspect-video overflow-hidden rounded-xl border-2 border-ink bg-surface">
          <Image src={tutor.videoImage} alt="" fill className="object-cover" sizes="410px" />
          <div className="absolute inset-0 bg-ink/10" />
          <button
            type="button"
            aria-label={t("preview.play")}
            className="absolute bottom-5 right-5 flex h-16 w-16 items-center justify-center rounded-full bg-accent-400 text-ink shadow-accent"
          >
            <Play className="h-7 w-7 fill-current" />
          </button>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <Link href={`/tutors/${tutor.id}`} className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full px-2")}>
            <CalendarDays className="h-5 w-5 shrink-0" />
            {t("preview.schedule")}
          </Link>
          <Link href={`/tutors/${tutor.id}`} className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full truncate px-2")}>
            {t("preview.profile", { name: tutor.name })}
          </Link>
        </div>
      </div>
    </aside>
  );
}

function TutorCard({
  active,
  onActivate,
  onToggleSaved,
  saved,
  tutor,
}: {
  active: boolean;
  onActivate: () => void;
  onToggleSaved: () => void;
  saved: boolean;
  tutor: Tutor;
}) {
  const t = useTranslations("tutors");
  const { format } = useCurrency();
  return (
    <article
      onMouseEnter={onActivate}
      onFocus={onActivate}
      className={cn(
        "grid min-w-0 gap-5 rounded-2xl border bg-white p-4 transition-shadow sm:grid-cols-[190px_minmax(0,1fr)_260px]",
        active ? "border-ink shadow-card" : "border-line hover:border-brand-300 hover:shadow-card",
      )}
    >
      <Link href={`/tutors/${tutor.id}`} className="relative aspect-square overflow-hidden rounded-xl bg-surface sm:aspect-[4/5]">
        <Image src={tutor.photo} alt={t("card.photoAlt", { name: tutor.name })} fill className="object-cover" sizes="190px" />
        <span
          className={cn(
            "absolute bottom-3 right-3 h-4 w-4 rounded-full border-2 border-white",
            tutor.online ? "bg-emerald-500" : "bg-gray-400",
          )}
        />
      </Link>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <Link href={`/tutors/${tutor.id}`} className="text-2xl font-black text-ink hover:text-brand-700">
            {tutor.name}
          </Link>
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 text-white">
            <ShieldCheck className="h-3 w-3" />
          </span>
          <span>{tutor.flag}</span>
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2 text-sm font-bold text-ink-soft">
          {tutor.categories.includes("super") ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-amber-800">
              <Trophy className="h-3.5 w-3.5" />
              {t("card.superTutor")}
            </span>
          ) : null}
          {tutor.categories.includes("professional") ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-2.5 py-1 text-brand-800">
              <UserRoundCheck className="h-3.5 w-3.5" />
              {t("card.professional")}
            </span>
          ) : null}
        </div>
        <p className="mt-2 flex min-w-0 items-center gap-2 text-base font-semibold text-ink-soft">
          <BookOpen className="h-4 w-4 shrink-0 text-brand-600" />
          {t(`subjects.${tutor.subject}`)}
        </p>
        <p className="mt-1.5 flex min-w-0 items-center gap-2 truncate text-base font-semibold text-ink-soft">
          <Languages className="h-4 w-4 shrink-0 text-brand-600" />
          <span className="truncate">
            {t("card.speaks", {
              languages: tutor.languages.map((language) => `${t(`languages.${language.code}`)} (${t(`levels.${language.level}`)})`).join(", "),
            })}
          </span>
        </p>
        <p className="mt-2.5 line-clamp-2 text-base font-semibold leading-7 text-ink">
          <span className="font-black">{tutor.source === "db" ? tutor.headline : t(`copy.${tutor.headline}`)}</span>{" "}
          <span className="text-ink-soft">{tutor.source === "db" ? tutor.bio : t(`copy.${tutor.id}.bio`)}</span>
        </p>
        <Link href={`/tutors/${tutor.id}`} className="mt-1.5 inline-block text-sm font-black text-brand-700 underline underline-offset-4 hover:text-brand-800">
          {t("card.learnMore")}
        </Link>
        {tutor.recentlyBooked > 20 ? (
          <p className="mt-2.5 flex items-center gap-2 text-sm font-bold text-brand-700">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-600">
              <Flame className="h-3.5 w-3.5 fill-current" />
            </span>
            {t("card.popular", { count: tutor.recentlyBooked })}
          </p>
        ) : null}
      </div>
      <div className="flex flex-col gap-4 sm:items-stretch">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-ink">{format(tutor.price)}</span>
              {tutor.originalPrice ? (
                <span className="text-base font-bold text-red-700 line-through">{format(tutor.originalPrice)}</span>
              ) : null}
            </div>
            <p className="text-sm font-semibold text-muted">{t("card.duration", { minutes: tutor.lessonDuration })}</p>
          </div>
          <button
            type="button"
            aria-label={saved ? t("card.unsave") : t("card.save")}
            onClick={onToggleSaved}
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-full border transition",
              saved
                ? "border-brand-300 bg-brand-50 text-brand-700"
                : "border-line text-ink-soft hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700",
            )}
          >
            <Heart className={cn("h-5 w-5", saved && "fill-current")} />
          </button>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <CardStat value={tutor.rating} icon={<Star className="h-4 w-4 fill-amber-500 text-amber-500" />} label={t("card.reviews", { count: tutor.reviewsCount })} />
          <CardStat value={`${tutor.students}`} label={t("card.students")} />
          <CardStat value={`${tutor.lessons}`} label={t("card.lessons")} />
        </div>
        <Link href={`/tutors/${tutor.id}`} className={cn(buttonVariants({ variant: "accent", size: "lg" }), "w-full")}>
          <CalendarDays className="h-5 w-5" />
          {t("card.book")}
        </Link>
        <Button variant="outline" size="lg" className="w-full" onClick={() => toast.info(t("messageSoon"))}>
          <MessageSquare className="h-5 w-5" />
          {t("card.message")}
        </Button>
      </div>
    </article>
  );
}

function CardStat({ icon, label, value }: { icon?: React.ReactNode; label: string; value: string | number }) {
  return (
    <div className="min-w-0">
      <p className="flex items-center gap-1.5 truncate text-xl font-black text-ink">
        {value}
        {icon}
      </p>
      <p className="text-xs font-semibold leading-4 text-muted">{label}</p>
    </div>
  );
}
