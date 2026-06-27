import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type Lang = {
  code: string;
  name: string;
  flag: string;
  label: string;
};

const LANGUAGES: Lang[] = [
  { code: "en", name: "English", flag: "🇬🇧", label: "EN" },
  { code: "ru", name: "Русский", flag: "🇷🇺", label: "RU" },
  { code: "tr", name: "Türkçe", flag: "🇹🇷", label: "TR" },
  { code: "de", name: "Deutsch", flag: "🇩🇪", label: "DE" },
  { code: "fr", name: "Français", flag: "🇫🇷", label: "FR" },
  { code: "es", name: "Español", flag: "🇪🇸", label: "ES" },
  { code: "ar", name: "العربية", flag: "🇸🇦", label: "AR" },
  { code: "it", name: "Italiano", flag: "🇮🇹", label: "IT" },
];

export function LanguageGrid({
  tutorsByLanguage,
}: {
  tutorsByLanguage: Record<string, number>;
}) {
  const t = useTranslations("languageGrid");
  const common = useTranslations("common");

  return (
    <section className="bg-white py-18 sm:py-22">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-extrabold text-ink sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-base leading-7 text-ink-soft sm:text-lg">
            {t("subtitle")}
          </p>
        </div>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {LANGUAGES.map((lang, index) => {
            const tutors = tutorsByLanguage[lang.code] ?? 0;
            const active = tutors > 0;
            const status = active
              ? t("tutorsCount", { count: tutors })
              : common("comingSoon");
            const content = (
              <>
                <div className="flex min-w-0 items-center gap-4">
                  <span className="w-10 shrink-0 font-display text-sm font-extrabold text-brand-300">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white text-3xl shadow-soft ring-1 ring-brand-50"
                    aria-hidden
                  >
                    {lang.flag}
                    <span className="absolute -bottom-2 rounded-full bg-brand-600 px-2 py-0.5 font-display text-[10px] font-extrabold leading-none text-white shadow-brand">
                      {lang.label}
                    </span>
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-display text-xl font-extrabold text-ink">
                      {lang.name}
                    </span>
                    <span className="mt-1 block text-sm font-medium text-muted">
                      {status}
                    </span>
                  </span>
                </div>

                <span
                  className={cn(
                    "flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-all",
                    active
                      ? "bg-brand-50 text-brand-700 group-hover:bg-brand-600 group-hover:text-white"
                      : "bg-white text-muted shadow-soft",
                  )}
                  aria-hidden
                >
                  <ArrowRight className="h-5 w-5" />
                </span>
              </>
            );

            return (
              <li key={lang.code}>
                {active ? (
                  <Link
                    href={`/tutors?lang=${lang.code}`}
                    aria-label={`${t("explore")} ${lang.name}`}
                    className="group flex min-h-28 items-center justify-between gap-4 rounded-xl bg-white p-4 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
                  >
                    {content}
                  </Link>
                ) : (
                  <div className="flex min-h-28 items-center justify-between gap-4 rounded-xl bg-surface/70 p-4 opacity-80">
                    {content}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
