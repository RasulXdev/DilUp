import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes with conditional logic, de-duping conflicts. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a money amount in the platform's locale-aware currency style. */
export function formatPrice(
  amount: number,
  currency = "AZN",
  locale = "az",
): string {
  const localeMap: Record<string, string> = {
    az: "az-AZ",
    en: "en-US",
    ru: "ru-RU",
  };
  return new Intl.NumberFormat(localeMap[locale] ?? "az-AZ", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}
