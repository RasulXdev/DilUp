"use client";

import { ChevronsUp } from "lucide-react";

export function BackToTop({ label }: { label: string }) {
  const handleClick = () => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={handleClick}
      className="absolute right-4 top-0 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-2xl border border-white/80 bg-accent-400 text-ink shadow-accent transition-all duration-200 hover:-translate-y-[60%] hover:bg-accent-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:right-6 lg:right-10"
    >
      <ChevronsUp className="h-5 w-5" aria-hidden="true" strokeWidth={2.4} />
    </button>
  );
}
