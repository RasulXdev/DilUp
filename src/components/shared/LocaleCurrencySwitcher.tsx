"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Check, ChevronDown, Globe2 } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { UI_LOCALES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const CURRENCIES = ["AZN", "USD", "EUR"] as const;

export function LocaleCurrencySwitcher({ className }: { className?: string }) {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [currency, setCurrency] = useState<(typeof CURRENCIES)[number]>("AZN");
  const [isPending, startTransition] = useTransition();
  const ref = useRef<HTMLDivElement>(null);

  const currentLocale =
    UI_LOCALES.find((item) => item.code === locale) ?? UI_LOCALES[0];

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      if (!ref.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  function switchLocale(code: string) {
    startTransition(() => {
      router.replace(pathname, { locale: code });
    });
  }

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        disabled={isPending}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="inline-flex h-11 max-w-[11rem] items-center gap-2 rounded-lg border border-transparent bg-transparent px-3 text-sm font-semibold text-ink transition-colors hover:border-brand-700 hover:bg-white/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:opacity-60 sm:max-w-none sm:px-3.5"
      >
        <Globe2 className="h-4 w-4 shrink-0 text-brand-600" />
        <span className="truncate">{currentLocale.label}, {currency}</span>
        <ChevronDown
          className={cn("h-4 w-4 shrink-0 text-ink-soft transition-transform", open && "rotate-180")}
        />
      </button>

      {open && (
        <div
          role="dialog"
          aria-label={t("preferences")}
          className="absolute right-0 z-50 mt-3 w-[19rem] rounded-xl border border-brand-100 bg-white p-4 shadow-card"
        >
          <PreferenceSelect
            label={t("language")}
            value={currentLocale.label}
            options={UI_LOCALES.map((item) => ({
              value: item.code,
              label: item.label,
              active: item.code === locale,
            }))}
            onChange={switchLocale}
            disabled={isPending}
          />
          <div className="mt-4">
            <PreferenceSelect
              label={t("currency")}
              value={currency}
              options={CURRENCIES.map((item) => ({
                value: item,
                label: item,
                active: item === currency,
              }))}
              onChange={(value) =>
                setCurrency(value as (typeof CURRENCIES)[number])
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}

function PreferenceSelect({
  label,
  value,
  options,
  onChange,
  disabled,
}: {
  label: string;
  value: string;
  options: Array<{ value: string; label: string; active: boolean }>;
  onChange: (value: string) => void;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <p className="mb-2 text-sm font-semibold text-ink">{label}</p>
      <button
        type="button"
        onClick={() => setOpen((state) => !state)}
        disabled={disabled}
        className="flex h-12 w-full items-center justify-between rounded-lg border border-line bg-white px-3.5 text-left text-sm font-semibold text-ink shadow-sm transition-colors hover:border-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 disabled:opacity-60"
      >
        <span>{value}</span>
        <ChevronDown
          className={cn("h-4 w-4 text-ink-soft transition-transform", open && "rotate-180")}
        />
      </button>

      {open && (
        <div className="mt-2 max-h-64 overflow-y-auto rounded-lg border border-line bg-white p-1 shadow-soft">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className={cn(
                "flex w-full items-center justify-between rounded-md border border-transparent px-3 py-2.5 text-left text-sm transition-colors hover:border-brand-200",
                option.active
                  ? "bg-brand-50 font-semibold text-brand-700"
                  : "text-ink-soft hover:bg-surface hover:text-ink",
              )}
            >
              {option.label}
              {option.active && <Check className="h-4 w-4 text-brand-600" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
