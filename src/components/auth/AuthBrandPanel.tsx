import Image from "next/image";
import { useTranslations } from "next-intl";
import { Star, Quote, CheckCircle2 } from "lucide-react";

/**
 * Immersive blue brand panel for the split-screen auth layout.
 * Pure CSS/SVG animation (no JS) — gradient mesh, flowing line-art,
 * floating multilingual greeting bubbles, and a glass testimonial.
 */
export function AuthBrandPanel() {
  const t = useTranslations("auth.panel");

  const greetings = [
    { text: "Hello", flag: "🇬🇧", className: "left-[8%] top-[18%]", delay: "0s" },
    { text: "Привет", flag: "🇷🇺", className: "right-[10%] top-[26%]", delay: "1.2s" },
    { text: "Merhaba", flag: "🇹🇷", className: "left-[14%] top-[42%]", delay: "0.6s" },
    { text: "Hallo", flag: "🇩🇪", className: "right-[14%] top-[50%]", delay: "1.8s" },
    { text: "Bonjour", flag: "🇫🇷", className: "left-[20%] top-[64%]", delay: "0.9s" },
    { text: "Hola", flag: "🇪🇸", className: "right-[20%] top-[70%]", delay: "1.4s" },
    { text: "مرحبا", flag: "🇸🇦", className: "left-[34%] top-[28%]", delay: "2.1s" },
    { text: "Ciao", flag: "🇮🇹", className: "right-[28%] top-[40%]", delay: "0.3s" },
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
        <div className="max-w-md">
          <h2 className="font-display text-4xl font-extrabold leading-tight">
            {t("headline")}
          </h2>
          <p className="mt-4 text-lg text-brand-100">{t("subline")}</p>
        </div>

        {/* Glass testimonial */}
        <figure className="max-w-md rounded-3xl border border-white/20 bg-white/12 p-6 shadow-2xl shadow-brand-950/20 backdrop-blur-md">
          <div className="flex items-start justify-between gap-4">
            <div className="rounded-2xl bg-white/12 p-2 ring-1 ring-white/15">
              <Quote className="h-7 w-7 text-accent-300" />
            </div>
            <div className="flex items-center gap-1.5 rounded-full border border-accent-200/30 bg-accent-300/15 px-3 py-1 text-xs font-bold text-accent-100">
              <CheckCircle2 className="h-3.5 w-3.5" />
              IELTS 7.0
            </div>
          </div>
          <blockquote className="mt-3 text-lg leading-relaxed">
            {t("quote")}
          </blockquote>
          <figcaption className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-white/70 bg-brand-100 shadow-lg shadow-brand-950/25">
                <Image
                  src="/images/nilufar-avatar.png"
                  alt={t("avatarAlt")}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </span>
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
