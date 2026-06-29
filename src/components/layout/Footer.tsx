import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  FacebookGlyphIcon,
  InstagramIcon,
  LinkedInIcon,
  YouTubeIcon,
} from "@/components/icons/BrandIcons";
import { BackToTop } from "@/components/layout/BackToTop";

const SOCIALS = [
  { key: "instagram", href: "https://instagram.com", Icon: InstagramIcon },
  { key: "facebook", href: "https://facebook.com", Icon: FacebookGlyphIcon },
  { key: "linkedin", href: "https://linkedin.com", Icon: LinkedInIcon },
  { key: "youtube", href: "https://youtube.com", Icon: YouTubeIcon },
] as const;

// English is live; the rest mirror the DB "Coming Soon" languages.
const TEACH_LANGUAGES = [
  { code: "en", live: true },
  { code: "ru", live: false },
  { code: "tr", live: false },
  { code: "de", live: false },
  { code: "fr", live: false },
  { code: "es", live: false },
  { code: "ar", live: false },
  { code: "it", live: false },
] as const;

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  const columns = [
    {
      title: t("company"),
      links: [
        { href: "/about", label: t("about") },
        { href: "/contact", label: t("contact") },
      ],
    },
    {
      title: t("forStudents"),
      links: [
        { href: "/get-started", label: t("getStarted") },
        { href: "/how-it-works", label: t("howItWorksStudents") },
        { href: "/faq", label: t("faq") },
      ],
    },
    {
      title: t("forTutors"),
      links: [
        { href: "/become-tutor", label: t("becomeTutor") },
        { href: "/how-it-works/tutors", label: t("howItWorksTutors") },
      ],
    },
  ];

  return (
    <footer className="relative mt-auto bg-brand-950 text-white">
      <BackToTop label={t("backToTop")} />

      {/* gold hairline */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-accent-400/60 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand + social */}
          <div className="lg:col-span-4">
            <Link
              href="/"
              aria-label="DilUp"
              className="group inline-flex items-center gap-2 font-display text-2xl font-extrabold tracking-tight text-white"
            >
              <span
                className="flex h-9 w-9 items-end justify-center gap-[3px] rounded-xl bg-brand-600 px-2 pb-2 shadow-brand transition-transform group-hover:-translate-y-0.5"
                aria-hidden
              >
                <span className="h-2.5 w-[3px] rounded-full bg-white/60" />
                <span className="h-3.5 w-[3px] rounded-full bg-white/80" />
                <span className="h-5 w-[3px] rounded-full bg-accent-400" />
              </span>
              <span>
                Dil<span className="text-brand-300">Up</span>
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
              {t("tagline")}
            </p>

            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
              {t("followUs")}
            </p>
            <div className="mt-3 flex items-center gap-3">
              {SOCIALS.map(({ key, href, Icon }) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={key}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/75 transition-colors hover:border-accent-300/60 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-300 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-950"
                >
                  <Icon className="h-[1.15rem] w-[1.15rem]" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            {columns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-white/45">
                  {col.title}
                </h4>
                <ul className="mt-5 space-y-3.5">
                  {col.links.map((l) => (
                    <li key={l.href + l.label}>
                      <Link
                        href={l.href}
                        className="group inline-flex items-center text-sm text-white/70 transition-colors hover:text-white"
                      >
                        <span className="h-px w-0 bg-accent-300 transition-all duration-200 group-hover:mr-2 group-hover:w-3" />
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            {/* SEO: Learn a language */}
            <nav aria-label={t("learnLanguage")}>
              <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-white/45">
                {t("learnLanguage")}
              </h4>
              <ul className="mt-5 space-y-3.5">
                {TEACH_LANGUAGES.map((lang) =>
                  lang.live ? (
                    <li key={lang.code}>
                      <Link
                        href="/get-started"
                        className="group inline-flex items-center text-sm text-white/70 transition-colors hover:text-white"
                      >
                        <span className="h-px w-0 bg-accent-300 transition-all duration-200 group-hover:mr-2 group-hover:w-3" />
                        {t(`languages.${lang.code}`)}
                      </Link>
                    </li>
                  ) : (
                    <li
                      key={lang.code}
                      className="flex items-center gap-2 text-sm text-white/35"
                    >
                      {t(`languages.${lang.code}`)}
                      <span className="rounded-full bg-accent-400/15 px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-wide text-accent-300">
                        {t("comingSoon")}
                      </span>
                    </li>
                  ),
                )}
              </ul>
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col gap-5 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1 text-sm text-white/55 sm:flex-row sm:items-center sm:gap-4">
            <span>
              © {year} DilUp. {t("rights")}
            </span>
            <span className="hidden sm:inline text-white/20">·</span>
            <span>{t("madeIn")} 🇦🇿</span>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
            <Link
              href="/privacy"
              className="text-white/60 transition-colors hover:text-white"
            >
              {t("privacy")}
            </Link>
            <Link
              href="/terms"
              className="text-white/60 transition-colors hover:text-white"
            >
              {t("terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
