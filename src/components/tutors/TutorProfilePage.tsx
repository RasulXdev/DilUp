"use client";

import { useState } from "react";
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
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
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

const weekDays = [
  { key: "Sun", day: "28" },
  { key: "Mon", day: "29" },
  { key: "Tue", day: "30" },
  { key: "Wed", day: "1" },
  { key: "Thu", day: "2" },
  { key: "Fri", day: "3" },
  { key: "Sat", day: "4" },
];

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

export function TutorProfilePage({ tutor }: { tutor: Tutor }) {
  const t = useTranslations("tutorProfile");
  const labels = useTranslations("tutors");
  const dayLabels = useTranslations("onboarding");
  const locale = useLocale();
  const [lessonLength, setLessonLength] = useState<25 | 50>(50);
  const [timezone, setTimezone] = useState("Asia/Baku");
  const activeTimezone = timezones.find((item) => item.name === timezone) ?? timezones[0];
  const recommendations = tutors.filter((item) => item.id !== tutor.id).slice(0, 4);
  const weekRange = `${formatLongDate(locale, new Date("2026-06-28"), false)} - ${formatLongDate(locale, new Date("2026-07-04"), false)}, 2026`;

  return (
    <>
      <Navbar />
      <main className="min-h-dvh bg-white">
      <section className="mx-auto grid w-full max-w-[1240px] gap-10 px-5 pb-20 pt-8 sm:px-7 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-10">
        <div className="min-w-0">
          <div className="relative aspect-video overflow-hidden rounded-xl border border-line bg-surface shadow-card">
            <Image src={tutor.videoImage} alt={t("videoAlt", { name: tutor.name })} fill priority className="object-cover" sizes="(min-width: 1024px) 760px, 100vw" />
            <div className="absolute inset-0 bg-ink/15" />
            <button type="button" aria-label={t("playVideo")} className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent-400 text-ink shadow-accent">
              <Play className="h-9 w-9 fill-current" />
            </button>
            <div className="absolute bottom-4 left-4 max-w-md rounded-lg bg-ink/80 px-3 py-2 text-sm font-semibold leading-5 text-white">
              {t("caption")}
            </div>
          </div>

          <div className="mt-8 flex gap-5">
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-surface">
              <Image src={tutor.photo} alt={t("photoAlt", { name: tutor.name })} fill className="object-cover" sizes="96px" />
              <span className="absolute bottom-2 right-2 h-4 w-4 rounded-full border-2 border-white bg-emerald-500" />
            </div>
            <div className="min-w-0">
              <h1 className="text-5xl font-black tracking-normal text-ink">{tutor.name}</h1>
              <p className="mt-2 flex flex-wrap items-center gap-2 text-base font-black text-ink-soft">
                {labels(`copy.${tutor.title}`)}
                <span className="text-muted">·</span>
                {t("from", { country: labels(`countries.${tutor.countryCode}`) })}
                <span>{tutor.flag}</span>
              </p>
            </div>
          </div>

          <p className="mt-6 max-w-3xl text-lg leading-8">
            <span className="block font-black text-ink">{labels(`copy.${tutor.headline}`)}</span>
            <span className="font-semibold text-ink-soft">{labels(`copy.${tutor.id}.bio`)}</span>
          </p>

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

          <Section title={t("aboutTitle")}>
            <p className="max-w-3xl text-base font-semibold leading-8 text-ink">{labels(`copy.${tutor.id}.about`)}</p>
            <button type="button" className="mt-3 text-sm font-black text-brand-700 underline underline-offset-4 hover:text-brand-800">{t("showMore")}</button>
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
            <div className="flex items-end gap-3">
              <span className="text-6xl font-black text-ink">{tutor.rating}</span>
              <span className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent-300 text-ink">
                <Star className="h-7 w-7 fill-current" />
              </span>
            </div>
            <p className="mt-2 text-sm font-semibold text-muted">{t("basedReviews", { count: tutor.reviewsCount })}</p>
            <div className="mt-5 rounded-xl border border-brand-200 bg-white p-5 shadow-soft">
              <h3 className="flex items-center gap-2.5 font-black text-ink">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                  <Quote className="h-4 w-4" />
                </span>
                {t("reviewSummary")}
              </h3>
              <p className="mt-3 text-base font-semibold leading-7 text-ink">{labels(`copy.${tutor.id}.reviewSummary`)}</p>
              <p className="mt-3 text-sm font-semibold text-muted">{t("aiGenerated", { name: tutor.name })}</p>
            </div>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {tutor.reviews.map((review, index) => (
                <article key={`${review.author}-${review.date}`}>
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
                  <p className="mt-3 text-base font-semibold leading-7 text-ink">{labels(`copy.${tutor.id}.reviews.${index}`)}</p>
                </article>
              ))}
            </div>
            <Button variant="outline" size="lg" className="mt-8">
              {t("showAllReviews", { count: tutor.reviewsCount })}
            </Button>
          </Section>

          <Section title={t("scheduleTitle")}>
            <div className="rounded-xl bg-brand-50 p-4 text-base font-semibold leading-7 text-brand-950">
              {t("scheduleNote")}
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
                <button type="button" aria-label={t("previousWeek")} className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button type="button" aria-label={t("nextWeek")} className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface">
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
            <div className="mt-5 overflow-x-auto border-t-4 border-brand-300 pt-5">
              <div className="grid min-w-[700px] grid-cols-7 gap-3">
                {weekDays.map((day) => (
                  <div key={day.key} className="min-h-80 rounded-xl bg-white text-center">
                    <div className="border-b border-line pb-3">
                      <p className="text-sm font-black text-ink-soft">{dayLabels(`days.${day.key.toLowerCase()}`)}</p>
                      <p className="mt-1 text-base font-black text-ink">{day.day}</p>
                    </div>
                    <div className="mt-5 flex flex-col gap-3">
                      {(tutor.schedule[day.key] ?? []).map((slot) => (
                        <button
                          key={`${day.key}-${slot}`}
                          type="button"
                          className="mx-auto flex h-10 min-w-20 items-center justify-center rounded-lg border border-line bg-surface px-3 text-sm font-black text-ink transition hover:border-brand-500 hover:bg-brand-50 hover:text-brand-800"
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Button variant="outline" size="lg" className="mx-auto mt-6 flex">
              {t("viewFullSchedule")}
            </Button>
          </Section>

          <Section title={t("resumeTitle")}>
            {tutor.certificates.map((certificate) => (
              <div key={certificate.title} className="grid gap-4 border-t-4 border-brand-300 pt-6 sm:grid-cols-[130px_1fr]">
                <p className="font-semibold text-muted">{certificate.years}</p>
                <div>
                  <p className="font-black text-ink">{certificate.title}</p>
                  <p className="mt-2 font-semibold text-ink-soft">{labels(`copy.certificates.${certificate.title}`)}</p>
                  {certificate.verified ? (
                    <p className="mt-3 inline-flex items-center gap-2 text-sm font-black text-emerald-700">
                      <BadgeCheck className="h-4 w-4" />
                      {t("certificateVerified")}
                    </p>
                  ) : null}
                </div>
              </div>
            ))}
          </Section>

          <Section title={t("specialtiesTitle")}>
            <div className="divide-y divide-line border-y border-line">
              {tutor.specialties.map((specialty) => (
                <button key={specialty} type="button" className="flex min-h-16 w-full items-center justify-between text-left font-black text-ink">
                  {labels(`specialties.${specialty}`)}
                  <ChevronDown className="h-5 w-5" />
                </button>
              ))}
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
                  <p className="mt-1 line-clamp-2 text-sm font-semibold leading-6 text-ink-soft">{labels(`copy.${item.headline}`)}</p>
                  <p className="mt-2 text-lg font-black text-ink">
                    ₼{item.price} <span className="text-sm font-semibold text-muted">{t("perLesson")}</span>
                  </p>
                </Link>
              ))}
            </div>
          </Section>
        </div>

        <aside className="lg:pt-20">
          <BookingCard tutor={tutor} />
        </aside>
      </section>
      </main>
      <Footer />
    </>
  );
}

function BookingCard({ tutor }: { tutor: Tutor }) {
  const t = useTranslations("tutorProfile");
  return (
    <div className="sticky top-28 rounded-2xl border border-line bg-white p-5 shadow-card">
      <div className="flex items-baseline gap-2">
        <span className="text-4xl font-black text-ink">₼{tutor.price}</span>
        {tutor.originalPrice ? <span className="text-lg font-bold text-red-700 line-through">₼{tutor.originalPrice}</span> : null}
        <span className="font-semibold text-muted">{t("lessonDuration", { minutes: tutor.lessonDuration })}</span>
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
      <Link href={`/checkout/${tutor.id}`} className={cn(buttonVariants({ variant: "accent", size: "lg" }), "mt-7 w-full")}>
        <CalendarDays className="h-5 w-5" />
        {t("bookTrial")}
      </Link>
      <div className="mt-4 grid grid-cols-3 gap-3">
        <IconButton label={t("message")} icon={<MessageSquare />} />
        <IconButton label={t("save")} icon={<Heart />} />
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

function IconButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button type="button" aria-label={label} className="flex h-16 items-center justify-center rounded-xl border border-line bg-white hover:bg-brand-50 hover:text-brand-700">
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
