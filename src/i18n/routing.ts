import { defineRouting } from "next-intl/routing";

export const locales = ["az", "en", "ru"] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: "az",
  // Explicit /az, /en, /ru prefixes for every locale (per blueprint).
  localePrefix: "always",
});
