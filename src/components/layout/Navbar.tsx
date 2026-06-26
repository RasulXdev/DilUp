"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X, HelpCircle, LogIn } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/shared/Logo";
import { LocaleCurrencySwitcher } from "@/components/shared/LocaleCurrencySwitcher";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/tutors", label: t("findTutors") },
    { href: "/become-tutor", label: t("becomeTutor") },
    { href: "/how-it-works", label: t("howItWorks") },
    { href: "/how-it-works#results", label: t("outcomes") },
  ];

  return (
    <header className="sticky top-0 z-40 bg-brand-300">
      <nav className="flex h-18 w-full items-center justify-between gap-4 px-5 sm:px-7 lg:px-8 xl:px-10">
        <div className="flex items-center gap-7">
          <Logo />
          <ul className="hidden min-w-0 items-center gap-0.5 xl:flex">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="rounded-full px-2.5 py-2 text-xs font-semibold text-ink-soft transition-colors hover:bg-white/80 hover:text-brand-700 2xl:px-3.5 2xl:text-sm"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <LocaleCurrencySwitcher />
          <Link
            href="/contact"
            aria-label={t("help")}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-white/70 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          >
            <HelpCircle className="h-5 w-5" />
          </Link>
          <Link
            href="/login"
            className={cn(
              buttonVariants({ variant: "outline", size: "md" }),
              "border-transparent bg-transparent shadow-none hover:border-transparent hover:bg-white/70",
            )}
          >
            <LogIn className="h-4 w-4" />
            {t("logIn")}
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LocaleCurrencySwitcher className="hidden sm:block" />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-transparent bg-transparent text-ink cursor-pointer hover:bg-white/70"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-brand-300/55 bg-brand-100 lg:hidden">
          <div className="flex w-full flex-col gap-1 px-5 py-4 sm:px-7">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2.5 text-base font-semibold text-ink-soft hover:bg-brand-50 hover:text-brand-700"
              >
                {l.label}
              </Link>
            ))}
            <LocaleCurrencySwitcher className="mt-3 sm:hidden" />
            <div className="mt-3 flex flex-col gap-2">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
              >
                <LogIn className="h-4 w-4" />
                {t("logIn")}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
