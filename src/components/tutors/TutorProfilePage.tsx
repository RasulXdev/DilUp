"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Award,
  BadgeCheck,
  BookOpen,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  GraduationCap,
  Heart,
  MessageSquare,
  PencilLine,
  Play,
  Quote,
  Share2,
  ShieldCheck,
  Star,
  Target,
  Trophy,
  Users,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { useCurrency } from "@/components/shared/CurrencyProvider";
import { Button, buttonVariants } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { resolveTutorsGateHref } from "@/lib/auth/redirects";
import { createClient } from "@/lib/supabase/client";
import { useSavedTutors } from "@/lib/tutors/useSavedTutors";
import { cn } from "@/lib/utils";
import type { Tutor } from "@/lib/tutors";
import { tutors } from "@/lib/tutors";

const azMonths = [
  "yanvar",
  "fevral",
  "mart",
  "aprel",
  "may",
  "iyun",
  "iyul",
  "avqust",
  "sentyabr",
  "oktyabr",
  "noyabr",
  "dekabr",
];

function formatLongDate(locale: string, date: Date, withYear: boolean) {
  if (locale === "az") {
    const day = date.getDate();
    const month = azMonths[date.getMonth()];
    return withYear ? `${day} ${month} ${date.getFullYear()}` : `${day} ${month}`;
  }
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    ...(withYear ? { year: "numeric" as const } : {}),
  }).format(date);
}

const DAY_KEYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function getWeekDays(weekOffset = 0) {
  const now = new Date();
  const day = now.getDay();
  const monday = new Date(now);
  monday.setDate(now.getDate() - ((day + 6) % 7));
  monday.setDate(monday.getDate() + weekOffset * 7);
  return DAY_KEYS.map((key, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return { key, day: String(d.getDate()), date: d };
  });
}

function formatShortDate(locale: string, date: Date) {
  if (locale === "az") {
    return `${date.getDate()} ${azMonths[date.getMonth()].slice(0, 3)}`;
  }

  return new Intl.DateTimeFormat(locale, { day: "numeric", month: "short" }).format(date);
}

const timezones = [
  { name: "Pacific/Auckland", gmt: "GMT +13:00" },
  { name: "Australia/Sydney", gmt: "GMT +11:00" },
  { name: "Asia/Tokyo", gmt: "GMT +9:00" },
  { name: "Asia/Seoul", gmt: "GMT +9:00" },
  { name: "Asia/Shanghai", gmt: "GMT +8:00" },
  { name: "Asia/Singapore", gmt: "GMT +8:00" },
  { name: "Asia/Bangkok", gmt: "GMT +7:00" },
  { name: "Asia/Dhaka", gmt: "GMT +6:00" },
  { name: "Asia/Kolkata", gmt: "GMT +5:30" },
  { name: "Asia/Karachi", gmt: "GMT +5:00" },
  { name: "Asia/Dubai", gmt: "GMT +4:00" },
  { name: "Asia/Baku", gmt: "GMT +4:00" },
  { name: "Asia/Tehran", gmt: "GMT +3:30" },
  { name: "Europe/Moscow", gmt: "GMT +3:00" },
  { name: "Europe/Istanbul", gmt: "GMT +3:00" },
  { name: "Europe/Kyiv", gmt: "GMT +2:00" },
  { name: "Europe/Nicosia", gmt: "GMT +2:00" },
  { name: "Europe/Riga", gmt: "GMT +2:00" },
  { name: "Europe/Sofia", gmt: "GMT +2:00" },
  { name: "Europe/Tallinn", gmt: "GMT +2:00" },
  { name: "Europe/Vilnius", gmt: "GMT +2:00" },
  { name: "Europe/Berlin", gmt: "GMT +1:00" },
  { name: "Europe/Madrid", gmt: "GMT +1:00" },
  { name: "Europe/Paris", gmt: "GMT +1:00" },
  { name: "Europe/Rome", gmt: "GMT +1:00" },
  { name: "Europe/Warsaw", gmt: "GMT +1:00" },
  { name: "Europe/London", gmt: "GMT +0:00" },
  { name: "Atlantic/Reykjavik", gmt: "GMT +0:00" },
  { name: "America/Sao_Paulo", gmt: "GMT -3:00" },
  { name: "America/New_York", gmt: "GMT -5:00" },
  { name: "America/Toronto", gmt: "GMT -5:00" },
  { name: "America/Chicago", gmt: "GMT -6:00" },
  { name: "America/Denver", gmt: "GMT -7:00" },
  { name: "America/Los_Angeles", gmt: "GMT -8:00" },
];

export function TutorProfilePage({ tutor, allTutors }: { tutor: Tutor; allTutors?: Tutor[] }) {
  const t = useTranslations("tutorProfile");
  const labels = useTranslations("tutors");
  const dayLabels = useTranslations("onboarding");
  const locale = useLocale();
  const { format } = useCurrency();
  const [lessonLength, setLessonLength] = useState<25 | 50>(50);
  const [timezone, setTimezone] = useState("Asia/Baku");
  const [weekOffset, setWeekOffset] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState<{ dayKey: string; dayLabel: string; slot: string } | null>(null);
  const [aboutExpanded, setAboutExpanded] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [showFullSchedule, setShowFullSchedule] = useState(false);
  const [resumeTab, setResumeTab] = useState<"education" | "certificates">("education");
  const [openSpecialty, setOpenSpecialty] = useState<string | null>(tutor.specialties[0] ?? null);
  const activeTimezone = timezones.find((item) => item.name === timezone) ?? timezones[0];
  const recommendations = (allTutors ?? tutors).filter((item) => item.id !== tutor.id).slice(0, 4);
  const weekDays = getWeekDays(weekOffset);
  const weekStart = weekDays[0].date;
  const weekEnd = weekDays[6].date;
  const weekRange = `${formatLongDate(locale, weekStart, false)} - ${formatLongDate(locale, weekEnd, false)}, ${weekEnd.getFullYear()}`;
  const title = tutor.source === "db" ? tutor.title : labels(`copy.${tutor.title}`);
  const headline = tutor.source === "db" ? tutor.headline : labels(`copy.${tutor.headline}`);
  const bio = tutor.source === "db" ? tutor.bio : labels(`copy.${tutor.id}.bio`);
  const about = tutor.source === "db" ? tutor.about : labels(`copy.${tutor.id}.about`);
  const visibleAbout = aboutExpanded || about.length < 300 ? about : `${about.slice(0, 300)}...`;
  const visibleReviews = showAllReviews ? tutor.reviews : tutor.reviews.slice(0, 2);
  const totalSlots = DAY_KEYS.reduce((sum, day) => sum + (tutor.schedule[day]?.length ?? 0), 0);
  const maxVisibleSlots = showFullSchedule ? Number.POSITIVE_INFINITY : 3;

  return (
    <>
      <Navbar />
      <main className="min-h-dvh bg-white">
      <section className="mx-auto grid w-full max-w-[1240px] gap-10 px-5 pb-28 pt-8 sm:px-7 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-10">
        <div className="min-w-0">
          <div className="relative aspect-video overflow-hidden rounded-xl border border-line bg-surface shadow-card">
            <Image src={tutor.videoImage} alt={t("videoAlt", { name: tutor.name })} fill priority className="object-cover" sizes="(min-width: 1024px) 760px, 100vw" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,18,40,0.02),rgba(9,18,40,0.42))]" />
            <button type="button" aria-label={t("playVideo")} className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent-400 text-ink shadow-accent">
              <Play className="h-9 w-9 fill-current" />
            </button>
            <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-md rounded-lg bg-ink/80 px-3 py-2 text-sm font-semibold leading-5 text-white">
                {t("caption")}
              </div>
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-black text-brand-800 shadow-soft">
                <Clock3 className="h-4 w-4" />
                {t("trialReady", { minutes: lessonLength })}
              </span>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-5 sm:flex-row">
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-surface">
              <Image src={tutor.photo} alt={t("photoAlt", { name: tutor.name })} fill className="object-cover" sizes="96px" />
              <span
                className={cn(
                  "absolute bottom-2 right-2 h-4 w-4 rounded-full border-2 border-white",
                  tutor.online ? "bg-emerald-500" : "bg-gray-400",
                )}
              />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-4xl font-black tracking-normal text-ink sm:text-5xl">{tutor.name}</h1>
                {tutor.categories.includes("professional") ? (
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-brand-50 px-2.5 py-1 text-sm font-black text-brand-800">
                    <BadgeCheck className="h-4 w-4" />
                    {t("professionalBadge")}
                  </span>
                ) : null}
              </div>
              <p className="mt-2 flex flex-wrap items-center gap-2 text-base font-black text-ink-soft">
                {title}
                <span className="text-muted">·</span>
                {t("from", { country: labels(`countries.${tutor.countryCode}`) })}
                <span>{tutor.flag}</span>
              </p>
              <div className="mt-4 grid gap-2 sm:grid-cols-3">
                <ProfileStat icon={<Star />} value={String(tutor.rating)} label={t("reviews", { count: tutor.reviewsCount })} />
                <ProfileStat icon={<Users />} value={String(tutor.students)} label={t("students")} />
                <ProfileStat icon={<BookOpen />} value={String(tutor.lessons)} label={t("lessons")} />
              </div>
            </div>
          </div>

          <p className="mt-6 max-w-3xl text-lg leading-8">
            <span className="block font-black text-ink">{headline}</span>
            <span className="font-semibold text-ink-soft">{bio}</span>
          </p>

          {tutor.highlights.length > 0 ? (
            <section className="mt-7 space-y-6">
              <div>
                <h2 className="flex items-center gap-2.5 text-lg font-black text-ink">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                    <Award className="h-4 w-4" />
                  </span>
                  {t("highlights")}
                </h2>
                <p className="mt-1 text-sm font-semibold text-muted">{t("highlightsNote")}</p>
                <div className="mt-4 space-y-3">
                  {tutor.highlights.map((highlight) => (
                    <div key={highlight.title} className="rounded-xl border border-line bg-surface p-5">
                      <span className="inline-flex items-center gap-2 rounded-lg bg-brand-50 px-3 py-1 text-sm font-black text-brand-800">
                        <Target className="h-4 w-4" />
                        {labels(`highlightsList.${highlight.title}`)}
                      </span>
                      <p className="mt-4 font-bold text-ink">{labels(`copy.${tutor.id}.highlight`)}</p>
                    </div>
                  ))}
                </div>
              </div>

              <InfoRow icon={<Trophy className="h-5 w-5" />} iconClass="bg-amber-50 text-amber-600" title={t("superTutor")} text={t("superTutorText", { name: tutor.name })} accent />
              <InfoRow icon={<BookOpen className="h-5 w-5" />} iconClass="bg-brand-50 text-brand-700" title={t("teaches")} text={t("teachesText", { subject: labels(`subjects.${tutor.subject}`) })} />
            </section>
          ) : null}

          <Section title={t("aboutTitle")}>
            <p className="max-w-3xl text-base font-semibold leading-8 text-ink">{visibleAbout}</p>
            {about.length >= 300 ? (
              <button type="button" onClick={() => setAboutExpanded((value) => !value)} className="mt-3 text-sm font-black text-brand-700 underline underline-offset-4 hover:text-brand-800">
                {aboutExpanded ? t("showLess") : t("showMore")}
              </button>
            ) : null}
          </Section>

          <Section title={t("speakTitle")}>
            <div className="flex flex-wrap gap-3">
              {tutor.languages.map((language) => (
                <span key={`${language.code}-${language.level}`} className="inline-flex items-center gap-2 text-base font-semibold">
                  {labels(`languages.${language.code}`)}
                  <span className="rounded-lg bg-emerald-50 px-2 py-1 text-sm font-black text-emerald-800">{labels(`levels.${language.level}`)}</span>
                </span>
              ))}
            </div>
          </Section>

          <Section title={t("lessonRating")}>
            <div className="grid gap-3 sm:grid-cols-4">
              <RatingMetric value={tutor.lessonRating.reassurance} label={t("metrics.reassurance")} icon={<ShieldCheck />} iconClass="bg-emerald-50 text-emerald-600" />
              <RatingMetric value={tutor.lessonRating.clarity} label={t("metrics.clarity")} icon={<MessageSquare />} iconClass="bg-sky-50 text-sky-600" />
              <RatingMetric value={tutor.lessonRating.progress} label={t("metrics.progress")} icon={<Target />} iconClass="bg-brand-50 text-brand-700" />
              <RatingMetric value={tutor.lessonRating.preparation} label={t("metrics.preparation")} icon={<PencilLine />} iconClass="bg-amber-50 text-amber-600" />
            </div>
            <p className="mt-4 text-sm font-semibold text-muted">{t("anonymousReviews", { count: tutor.lessonRating.reviews })}</p>
          </Section>

          <Section title={t("studentsSay")}>
            <div className="flex flex-col gap-5 rounded-2xl border border-line bg-surface p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-end gap-3">
                  <span className="text-6xl font-black text-ink">{tutor.rating}</span>
                  <span className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent-300 text-ink">
                    <Star className="h-7 w-7 fill-current" />
                  </span>
                </div>
                <p className="mt-2 text-sm font-semibold text-muted">{t("basedReviews", { count: tutor.reviewsCount })}</p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm font-black text-ink sm:min-w-72">
                <ReviewSignal label={t("metrics.reassurance")} value={tutor.lessonRating.reassurance} />
                <ReviewSignal label={t("metrics.clarity")} value={tutor.lessonRating.clarity} />
                <ReviewSignal label={t("metrics.progress")} value={tutor.lessonRating.progress} />
                <ReviewSignal label={t("metrics.preparation")} value={tutor.lessonRating.preparation} />
              </div>
            </div>
            {tutor.source === "mock" || tutor.reviewSummary ? (
              <div className="mt-5 rounded-xl border border-brand-200 bg-white p-5 shadow-soft">
                <h3 className="flex items-center gap-2.5 font-black text-ink">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                    <Quote className="h-4 w-4" />
                  </span>
                  {t("reviewSummary")}
                </h3>
                <p className="mt-3 text-base font-semibold leading-7 text-ink">{tutor.source === "db" ? tutor.reviewSummary : labels(`copy.${tutor.id}.reviewSummary`)}</p>
                <p className="mt-3 text-sm font-semibold text-muted">{t("aiGenerated", { name: tutor.name })}</p>
              </div>
            ) : null}
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {visibleReviews.map((review, index) => (
                <article key={`${review.author}-${review.date}`} className="rounded-xl border border-line bg-white p-5 shadow-soft">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface text-lg font-black text-brand-700">
                      {review.author[0]}
                    </div>
                    <div>
                      <p className="font-black text-ink">{review.author}</p>
                      <p className="text-sm font-semibold text-muted">{formatLongDate(locale, new Date(review.date), true)}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-1" aria-label={t("ratingStars", { rating: review.rating })}>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} className="h-5 w-5 fill-ink text-ink" />
                    ))}
                  </div>
                  <p className="mt-3 text-base font-semibold leading-7 text-ink">{tutor.source === "db" ? review.text : labels(`copy.${tutor.id}.reviews.${index}`)}</p>
                </article>
              ))}
            </div>
            {tutor.reviews.length > 2 ? (
              <Button type="button" variant="outline" size="lg" className="mt-8" onClick={() => setShowAllReviews((value) => !value)}>
                {showAllReviews ? t("showLess") : t("showAllReviews", { count: tutor.reviewsCount })}
              </Button>
            ) : null}
          </Section>

          <Section title={t("scheduleTitle")}>
            <div className="rounded-xl bg-brand-50 p-4 text-base font-semibold leading-7 text-brand-950">
              {t("scheduleNote")} <span className="font-black">{t("availableSlots", { count: totalSlots })}</span>
            </div>
            <div className="mt-5 grid grid-cols-2 rounded-xl border border-line bg-surface p-1">
              {[25, 50].map((minutes) => (
                <button
                  key={minutes}
                  type="button"
                  onClick={() => setLessonLength(minutes as 25 | 50)}
                  className={cn(
                    "h-12 rounded-lg text-base font-black",
                    lessonLength === minutes && "bg-white shadow-soft",
                  )}
                >
                  {t("minutes", { minutes })}
                </button>
              ))}
            </div>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  aria-label={t("previousWeek")}
                  onClick={() => {
                    setWeekOffset((value) => value - 1);
                    setSelectedSlot(null);
                  }}
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface hover:bg-brand-50 hover:text-brand-700"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  aria-label={t("nextWeek")}
                  onClick={() => {
                    setWeekOffset((value) => value + 1);
                    setSelectedSlot(null);
                  }}
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface hover:bg-brand-50 hover:text-brand-700"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                <p className="font-black text-ink">{weekRange}</p>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <button type="button" className="flex h-14 min-w-64 items-center justify-between rounded-xl border border-line px-4 text-left">
                    <span>
                      <span className="block font-black text-ink">{activeTimezone.name}</span>
                      <span className="text-sm font-semibold text-muted">{activeTimezone.gmt}</span>
                    </span>
                    <ChevronDown className="h-5 w-5" />
                  </button>
                </PopoverTrigger>
                <PopoverContent align="end" className="max-h-96 w-80 overflow-auto p-2">
                  {timezones.map((item) => (
                    <button key={item.name} type="button" onClick={() => setTimezone(item.name)} className="flex min-h-14 w-full items-center justify-between border-b border-line px-3 text-left last:border-0 hover:text-brand-700">
                      <span>
                        <span className="block font-bold">{item.name}</span>
                        <span className="text-xs font-semibold text-muted">{item.gmt}</span>
                      </span>
                      {timezone === item.name ? <Check className="h-4 w-4" /> : null}
                    </button>
                  ))}
                </PopoverContent>
              </Popover>
            </div>
            <div className="mt-5 border-t-4 border-brand-300 pt-5">
              <div className="grid grid-cols-7 gap-1 sm:gap-2 lg:gap-3">
                {weekDays.map((day) => {
                  const slots = tutor.schedule[day.key] ?? [];
                  const visibleSlots = slots.slice(0, maxVisibleSlots);
                  const hiddenSlots = Math.max(slots.length - visibleSlots.length, 0);
                  return (
                  <div key={day.key} className="min-w-0 rounded-xl bg-white text-center">
                    <div className="border-b border-line pb-2 sm:pb-3">
                      <p className="truncate text-[10px] font-black text-ink-soft sm:text-xs lg:text-sm">{dayLabels(`days.${day.key.toLowerCase()}`)}</p>
                      <p className="mt-1 truncate text-[11px] font-black text-ink sm:text-sm lg:text-base">{formatShortDate(locale, day.date)}</p>
                    </div>
                    <div className="mt-3 flex flex-col gap-1.5 sm:mt-4 sm:gap-2 lg:mt-5 lg:gap-3">
                      {visibleSlots.map((slot) => {
                        const active = selectedSlot?.dayKey === day.key && selectedSlot.slot === slot;
                        return (
                        <button
                          key={`${day.key}-${slot}`}
                          type="button"
                          onClick={() => setSelectedSlot({ dayKey: day.key, dayLabel: dayLabels(`days.${day.key.toLowerCase()}`), slot })}
                          className={cn(
                            "flex h-9 w-full min-w-0 items-center justify-center rounded-lg border px-0.5 text-[10px] font-black transition sm:h-10 sm:px-1 sm:text-xs lg:px-3 lg:text-sm",
                            active
                              ? "border-brand-700 bg-brand-700 text-white shadow-soft"
                              : "border-line bg-surface text-ink hover:border-brand-500 hover:bg-brand-50 hover:text-brand-800",
                          )}
                        >
                          {slot}
                        </button>
                        );
                      })}
                      {hiddenSlots > 0 ? (
                        <button
                          type="button"
                          onClick={() => setShowFullSchedule(true)}
                          className="rounded-lg bg-brand-50 px-1 py-2 text-[9px] font-black text-brand-800 hover:bg-brand-100 sm:text-[11px] lg:text-xs"
                        >
                          {t("moreSlots", { count: hiddenSlots })}
                        </button>
                      ) : null}
                    </div>
                  </div>
                  );
                })}
              </div>
            </div>
            {selectedSlot ? (
              <div className="mt-5 flex flex-col gap-3 rounded-xl border border-brand-200 bg-brand-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="font-bold text-brand-950">
                  {t("selectedSlot", {
                    day: selectedSlot.dayLabel,
                    time: selectedSlot.slot,
                    timezone: activeTimezone.name,
                  })}
                </p>
                <Button type="button" variant="primary" onClick={() => setSelectedSlot(null)}>
                  {t("changeSlot")}
                </Button>
              </div>
            ) : null}
            <Button type="button" variant="outline" size="lg" className="mx-auto mt-6 flex" onClick={() => setShowFullSchedule((value) => !value)}>
              {showFullSchedule ? t("showLess") : t("viewFullSchedule")}
            </Button>
          </Section>

          <Section title={t("resumeTitle")}>
            <div className="mb-6 inline-grid rounded-xl border border-line bg-surface p-1 sm:grid-cols-2">
              {(["education", "certificates"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setResumeTab(tab)}
                  className={cn(
                    "h-11 rounded-lg px-5 text-sm font-black transition",
                    resumeTab === tab ? "bg-white text-ink shadow-soft" : "text-ink-soft hover:text-brand-700",
                  )}
                >
                  {t(`resumeTabs.${tab}`)}
                </button>
              ))}
            </div>
            {resumeTab === "education" ? (
              <div className="grid gap-4 border-t-4 border-brand-300 pt-6 sm:grid-cols-[130px_1fr]">
                <p className="font-semibold text-muted">{t("educationYears")}</p>
                <div>
                  <p className="flex items-center gap-2 font-black text-ink">
                    <GraduationCap className="h-5 w-5 text-brand-700" />
                    {t("educationTitle")}
                  </p>
                  <p className="mt-2 font-semibold text-ink-soft">{t("educationText", { subject: labels(`subjects.${tutor.subject}`) })}</p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {tutor.certificates.map((certificate) => (
                  <div key={certificate.title} className="grid gap-4 border-t-4 border-brand-300 pt-6 sm:grid-cols-[130px_1fr]">
                    <p className="font-semibold text-muted">{certificate.years}</p>
                    <div>
                      <p className="font-black text-ink">{certificate.title}</p>
                      {tutor.source === "db" ? null : (
                        <p className="mt-2 font-semibold text-ink-soft">{labels(`copy.certificates.${certificate.title}`)}</p>
                      )}
                      {certificate.verified ? (
                        <p className="mt-3 inline-flex items-center gap-2 text-sm font-black text-emerald-700">
                          <BadgeCheck className="h-4 w-4" />
                          {t("certificateVerified")}
                        </p>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Section>

          <Section title={t("specialtiesTitle")}>
            <div className="divide-y divide-line border-y border-line">
              {tutor.specialties.map((specialty) => {
                const specialtyLabel = tutor.source === "db" ? specialty : labels(`specialties.${specialty}`);
                const open = openSpecialty === specialty;

                return (
                  <div key={specialty}>
                    <button
                      type="button"
                      aria-expanded={open}
                      onClick={() => setOpenSpecialty(open ? null : specialty)}
                      className="flex min-h-16 w-full items-center justify-between gap-4 text-left font-black text-ink transition hover:text-brand-700"
                    >
                      <span>{specialtyLabel}</span>
                      <ChevronDown className={cn("h-5 w-5 shrink-0 transition-transform", open && "rotate-180 text-brand-700")} />
                    </button>
                    {open ? (
                      <div className="pb-5 pr-8">
                        <p className="max-w-2xl text-base font-semibold leading-7 text-ink-soft">
                          {t("specialtyDetail", {
                            name: tutor.name,
                            specialty: specialtyLabel,
                            subject: labels(`subjects.${tutor.subject}`),
                          })}
                        </p>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </Section>

          <Section title={t("alsoLike")}>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {recommendations.map((item) => (
                <Link key={item.id} href={`/tutors/${item.id}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-surface">
                    <Image src={item.photo} alt={item.name} fill className="object-cover transition-transform group-hover:scale-105" sizes="220px" />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-3 text-sm font-black text-white">
                      {item.name} {item.flag}
                    </div>
                  </div>
                  <p className="mt-3 flex items-center gap-1.5 font-black text-ink">
                    <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                    {item.rating} ({item.reviewsCount})
                  </p>
                  <p className="mt-1 line-clamp-2 text-sm font-semibold leading-6 text-ink-soft">{item.source === "db" ? item.headline : labels(`copy.${item.headline}`)}</p>
                  <p className="mt-2 text-lg font-black text-ink">
                    {format(item.price)} <span className="text-sm font-semibold text-muted">{t("perLesson")}</span>
                  </p>
                </Link>
              ))}
            </div>
          </Section>
        </div>

        <aside className="lg:pt-20">
          <BookingCard tutor={tutor} lessonLength={lessonLength} />
        </aside>
      </section>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 p-3 shadow-[0_-8px_24px_rgba(13,21,48,0.08)] backdrop-blur lg:hidden">
        <BookingBar tutor={tutor} lessonLength={lessonLength} />
      </div>
      </main>
      <Footer />
    </>
  );
}

function BookingCard({
  lessonLength,
  tutor,
}: {
  lessonLength: 25 | 50;
  tutor: Tutor;
}) {
  const t = useTranslations("tutorProfile");
  const { format } = useCurrency();
  const { isSaved, toggleSaved } = useSavedTutors();
  const saved = isSaved(tutor.id);
  const dest = `/checkout/${tutor.id}`;
  const [bookHref, setBookHref] = useState(`/get-started?next=${encodeURIComponent(dest)}`);

  useEffect(() => {
    let active = true;
    const supabase = createClient();

    supabase.auth.getUser().then(({ data: { user } }) => {
      resolveTutorsGateHref(supabase, user?.id ?? null, dest).then((href) => {
        if (active) setBookHref(href);
      });
    });

    return () => {
      active = false;
    };
  }, [dest]);

  return (
    <div className="sticky top-28 hidden rounded-2xl border border-line bg-white p-5 shadow-card lg:block">
      <div className="flex items-baseline gap-2">
        <span className="text-4xl font-black text-ink">{format(tutor.price)}</span>
        {tutor.originalPrice ? <span className="text-lg font-bold text-red-700 line-through">{format(tutor.originalPrice)}</span> : null}
        <span className="font-semibold text-muted">{t("lessonDuration", { minutes: lessonLength })}</span>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div>
          <p className="flex items-center gap-2 text-2xl font-black text-ink"><Star className="h-5 w-5 fill-current" />{tutor.rating}</p>
          <p className="text-sm font-semibold text-muted">{t("reviews", { count: tutor.reviewsCount })}</p>
        </div>
        <div>
          <p className="text-2xl font-black text-ink">{tutor.lessons}</p>
          <p className="text-sm font-semibold text-muted">{t("lessons")}</p>
        </div>
      </div>
      <Link href={bookHref} className={cn(buttonVariants({ variant: "accent", size: "lg" }), "mt-7 w-full")}>
        <CalendarDays className="h-5 w-5" />
        {t("bookTrial")}
      </Link>
      <div className="mt-4 grid grid-cols-3 gap-3">
        <IconButton label={t("message")} icon={<MessageSquare />} />
        <IconButton
          active={saved}
          label={saved ? t("saved") : t("save")}
          icon={<Heart className={saved ? "fill-current" : undefined} />}
          onClick={() => toggleSaved(tutor.id)}
        />
        <IconButton label={t("share")} icon={<Share2 />} />
      </div>
      <div className="mt-6 flex gap-3 rounded-xl bg-emerald-50 p-4 text-emerald-950">
        <Check className="mt-1 h-5 w-5 shrink-0" />
        <div>
          <p className="font-black">{t("notMatch")}</p>
          <p className="mt-1 text-sm font-semibold">{t("freeTrials")}</p>
        </div>
      </div>
    </div>
  );
}

function BookingBar({
  lessonLength,
  tutor,
}: {
  lessonLength: 25 | 50;
  tutor: Tutor;
}) {
  const t = useTranslations("tutorProfile");
  const { format } = useCurrency();
  const dest = `/checkout/${tutor.id}`;
  const [bookHref, setBookHref] = useState(`/get-started?next=${encodeURIComponent(dest)}`);

  useEffect(() => {
    let active = true;
    const supabase = createClient();

    supabase.auth.getUser().then(({ data: { user } }) => {
      resolveTutorsGateHref(supabase, user?.id ?? null, dest).then((href) => {
        if (active) setBookHref(href);
      });
    });

    return () => {
      active = false;
    };
  }, [dest]);

  return (
    <div className="mx-auto flex max-w-[1240px] items-center gap-3">
      <div className="min-w-0 flex-1">
        <p className="text-lg font-black text-ink">
          {format(tutor.price)} <span className="text-xs font-bold text-muted">{t("lessonDuration", { minutes: lessonLength })}</span>
        </p>
      </div>
      <Link href={bookHref} className={cn(buttonVariants({ variant: "accent", size: "lg" }), "shrink-0 px-4")}>
        <CalendarDays className="h-5 w-5" />
        {t("bookTrialShort")}
      </Link>
    </div>
  );
}

function ProfileStat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-line bg-surface px-3 py-2">
      <p className="flex items-center gap-1.5 text-lg font-black text-ink">
        <span className="text-brand-700 [&_svg]:h-4 [&_svg]:w-4">{icon}</span>
        {value}
      </p>
      <p className="mt-0.5 truncate text-xs font-bold text-muted">{label}</p>
    </div>
  );
}

function ReviewSignal({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl bg-white px-3 py-2 shadow-soft">
      <p className="text-lg font-black text-ink">{value}</p>
      <p className="text-xs font-bold text-muted">{label}</p>
    </div>
  );
}

function IconButton({
  active = false,
  icon,
  label,
  onClick,
}: {
  active?: boolean;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "flex h-16 items-center justify-center rounded-xl border hover:bg-brand-50 hover:text-brand-700",
        active ? "border-brand-300 bg-brand-50 text-brand-700" : "border-line bg-white",
      )}
    >
      <span className="[&_svg]:h-5 [&_svg]:w-5">{icon}</span>
    </button>
  );
}

function InfoRow({ accent = false, icon, iconClass, text, title }: { accent?: boolean; icon: React.ReactNode; iconClass?: string; text: string; title: string }) {
  return (
    <div className="grid gap-4 sm:grid-cols-[40px_1fr]">
      <span className={cn("flex h-10 w-10 items-center justify-center rounded-xl", iconClass ?? "bg-brand-50 text-brand-700")}>{icon}</span>
      <div>
        <h3 className={cn("font-black text-ink", accent && "text-brand-700")}>{title}</h3>
        <p className="mt-2 text-base font-semibold leading-7 text-ink-soft">{text}</p>
      </div>
    </div>
  );
}

function Section({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <section className="mt-14">
      <h2 className="mb-5 text-3xl font-black tracking-normal text-ink">{title}</h2>
      {children}
    </section>
  );
}

function RatingMetric({ icon, iconClass, label, value }: { icon: React.ReactNode; iconClass: string; label: string; value: number }) {
  return (
    <div className="rounded-xl bg-surface p-4">
      <div className="flex items-start justify-between">
        <p className="text-2xl font-black text-ink">{value}</p>
        <span className={cn("flex h-9 w-9 items-center justify-center rounded-lg [&_svg]:h-5 [&_svg]:w-5", iconClass)}>{icon}</span>
      </div>
      <p className="mt-3 font-black text-ink">{label}</p>
    </div>
  );
}
