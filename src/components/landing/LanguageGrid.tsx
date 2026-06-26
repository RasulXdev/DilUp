import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type Lang = {
  code: string;
  flag: string;
  name: string;
  tutors: number;
  active: boolean;
};

const LANGUAGES: Lang[] = [
  { code: "en", flag: "🇬🇧", name: "English", tutors: 1200, active: true },
  { code: "ru", flag: "🇷🇺", name: "Русский", tutors: 0, active: false },
  { code: "tr", flag: "🇹🇷", name: "Türkçe", tutors: 0, active: false },
  { code: "de", flag: "🇩🇪", name: "Deutsch", tutors: 0, active: false },
  { code: "fr", flag: "🇫🇷", name: "Français", tutors: 0, active: false },
  { code: "es", flag: "🇪🇸", name: "Español", tutors: 0, active: false },
  { code: "ar", flag: "🇸🇦", name: "العربية", tutors: 0, active: false },
  { code: "it", flag: "🇮🇹", name: "Italiano", tutors: 0, active: false },
];

export function LanguageGrid() {
  const t = useTranslations("languageGrid");
  const common = useTranslations("common");

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <h2 className="font-display text-3xl font-extrabold text-ink sm:text-4xl">
          {t("title")}
        </h2>
        <p className="mt-3 text-lg text-ink-soft">{t("subtitle")}</p>
      </div>

      <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {LANGUAGES.map((lang) => {
          const content = (
            <>
              <span
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface text-2xl"
                aria-hidden
              >
                {lang.flag}
              </span>
              <div className="flex-1">
                <p className="font-display font-bold text-ink">{lang.name}</p>
                <p className="text-sm text-muted">
                  {lang.active
                    ? t("tutorsCount", { count: lang.tutors })
                    : common("comingSoon")}
                </p>
              </div>
              {lang.active && (
                <ArrowUpRight className="h-5 w-5 text-brand-600 opacity-0 transition-opacity group-hover:opacity-100" />
              )}
            </>
          );

          return (
            <li key={lang.code}>
              {lang.active ? (
                <Link
                  href={`/tutors?lang=${lang.code}`}
                  className="group flex items-center gap-4 rounded-2xl border border-line bg-white p-4 shadow-soft transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-card"
                >
                  {content}
                </Link>
              ) : (
                <div
                  className={cn(
                    "flex items-center gap-4 rounded-2xl border border-dashed border-line bg-surface/50 p-4",
                    "opacity-70",
                  )}
                >
                  {content}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
