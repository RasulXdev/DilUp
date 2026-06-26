import { useTranslations } from "next-intl";
import { Star, Quote } from "lucide-react";

/**
 * Immersive blue brand panel for the split-screen auth layout.
 * Pure CSS/SVG animation (no JS) — gradient mesh, flowing line-art,
 * floating multilingual greeting bubbles, and a glass testimonial.
 */
export function AuthBrandPanel() {
  const t = useTranslations("auth.panel");

  const greetings = [
    { text: "Hello", flag: "🇬🇧", className: "left-[8%] top-[18%]", delay: "0s" },
    { text: "Salam", flag: "🇦🇿", className: "right-[10%] top-[26%]", delay: "1.2s" },
    { text: "Привет", flag: "🇷🇺", className: "left-[14%] top-[46%]", delay: "0.6s" },
    { text: "Bonjour", flag: "🇫🇷", className: "right-[14%] top-[54%]", delay: "1.8s" },
    { text: "Hola", flag: "🇪🇸", className: "left-[20%] top-[70%]", delay: "0.9s" },
  ];

  return (
    <div className="relative hidden overflow-hidden bg-brand-700 lg:block">
      {/* Gradient mesh */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-10 h-96 w-96 rounded-full bg-brand-400/40 blob" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-accent-400/25 blob" />
      </div>

      {/* Flowing line-art */}
      <svg
        aria-hidden
        className="absolute inset-0 h-full w-full opacity-[0.18]"
        viewBox="0 0 600 800"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        {Array.from({ length: 7 }).map((_, i) => (
          <path
            key={i}
            d={`M-50 ${120 + i * 95} C 150 ${40 + i * 95}, 350 ${260 + i * 95}, 650 ${120 + i * 95}`}
            stroke="white"
            strokeWidth="1.5"
            style={{
              strokeDasharray: 1200,
              strokeDashoffset: 1200,
              animation: `dash 6s ease-out ${i * 0.25}s forwards`,
            }}
          />
        ))}
      </svg>

      {/* Floating greeting bubbles */}
      <div aria-hidden className="absolute inset-0">
        {greetings.map((g) => (
          <div
            key={g.text}
            className={`animate-float absolute flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md ${g.className}`}
            style={{ animationDelay: g.delay }}
          >
            <span>{g.flag}</span>
            {g.text}
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative flex h-full flex-col justify-between p-12 text-white">
        <div className="flex items-center gap-2.5">
          <span
            className="flex h-10 w-10 items-end justify-center gap-[3px] rounded-xl bg-white/15 px-2 pb-2.5 backdrop-blur"
            aria-hidden
          >
            <span className="h-2.5 w-[3px] rounded-full bg-white/50" />
            <span className="h-4 w-[3px] rounded-full bg-white/80" />
            <span className="h-6 w-[3px] rounded-full bg-accent-400" />
          </span>
          <span className="font-display text-2xl font-extrabold">DilUp</span>
        </div>

        <div className="max-w-md">
          <h2 className="font-display text-4xl font-extrabold leading-tight">
            {t("headline")}
          </h2>
          <p className="mt-4 text-lg text-brand-100">{t("subline")}</p>
        </div>

        {/* Glass testimonial */}
        <figure className="max-w-md rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-md">
          <Quote className="h-7 w-7 text-accent-300" />
          <blockquote className="mt-3 text-lg leading-relaxed">
            {t("quote")}
          </blockquote>
          <figcaption className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span
                className="h-10 w-10 rounded-full bg-gradient-to-br from-accent-300 to-accent-500"
                aria-hidden
              />
              <div>
                <p className="text-sm font-semibold">{t("author")}</p>
                <p className="text-xs text-brand-200">{t("authorRole")}</p>
              </div>
            </div>
            <div className="flex gap-0.5 text-accent-300">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
