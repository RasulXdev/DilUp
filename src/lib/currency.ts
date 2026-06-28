export const CURRENCIES = ["AZN", "USD", "EUR"] as const;
export type Currency = (typeof CURRENCIES)[number];

const SYMBOLS: Record<Currency, string> = {
  AZN: "₼",
  USD: "$",
  EUR: "€",
};

// Approximate fixed rates relative to AZN (the currency tutor prices are stored in).
const RATES: Record<Currency, number> = {
  AZN: 1,
  USD: 0.59,
  EUR: 0.54,
};

export function convertFromAzn(amount: number, currency: Currency) {
  const value = amount * RATES[currency];
  return currency === "AZN" ? Math.round(value) : Math.round(value * 100) / 100;
}

export function formatPrice(amount: number, currency: Currency) {
  return `${SYMBOLS[currency]}${convertFromAzn(amount, currency)}`;
}
