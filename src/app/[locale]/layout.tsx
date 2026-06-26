import type { Metadata } from "next";
import { Onest, Manrope } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Providers } from "../providers";
import { Toaster } from "@/components/ui/sonner";
import "../globals.css";

const fontHeading = Onest({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-heading",
  display: "swap",
});

const fontBody = Manrope({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "DilUp — Dilini yüksəlt",
    template: "%s · DilUp",
  },
  description:
    "DilUp — Azərbaycanın online dil öyrənmə platforması. Sənə uyğun müəllimi tap və ilk dərsindən danışmağa başla.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  ),
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${fontHeading.variable} ${fontBody.variable}`}
    >
      <body className="flex min-h-dvh flex-col bg-white antialiased">
        <NextIntlClientProvider>
          <Providers>{children}</Providers>
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
