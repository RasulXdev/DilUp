import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Providers } from "../providers";
import { Toaster } from "@/components/ui/sonner";
import { absoluteUrl } from "@/lib/seo";
import "../globals.css";

const fontVariables = {
  "--font-heading": 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  "--font-body": 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
} as CSSProperties;

export const metadata: Metadata = {
  title: {
    default: "DilUp — Dilini yüksəlt",
    template: "%s · DilUp",
  },
  description:
    "DilUp — Azərbaycanın online dil öyrənmə platforması. Sənə uyğun müəllimi tap və ilk dərsindən danışmağa başla.",
  metadataBase: new URL(absoluteUrl()),
  openGraph: {
    title: "DilUp — Dilini yüksəlt",
    description:
      "DilUp — Azərbaycanın online dil öyrənmə platforması. Sənə uyğun müəllimi tap və ilk dərsindən danışmağa başla.",
    siteName: "DilUp",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
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
      style={fontVariables}
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
