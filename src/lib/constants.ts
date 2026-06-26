export const APP_NAME = "DilUp";

export const DEFAULT_COMMISSION_RATE = 25; // platform commission %
export const DEFAULT_CURRENCY = "AZN";

export const LESSON_DURATIONS = [25, 50] as const;

/** Interface locales (site language) — distinct from languages being taught. */
export const UI_LOCALES = [
  { code: "az", label: "Azərbaycanca", short: "AZ" },
  { code: "en", label: "English", short: "EN" },
  { code: "ru", label: "Русский", short: "RU" },
] as const;

/**
 * Cancellation policy windows (hours before lesson → charge %).
 * 24h+: free · 12–24h: 50% · <12h / no-show: 100%.
 */
export const CANCELLATION_POLICY = {
  freeUntilHours: 24,
  halfChargeUntilHours: 12,
} as const;
