import type { Metadata } from "next";

export const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export const publicRoutes = [
  "",
  "get-started",
  "about",
  "how-it-works",
  "how-it-works/tutors",
  "faq",
  "become-tutor",
  "privacy",
  "terms",
  "contact",
] as const;

export function absoluteUrl(path = "") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalizedPath, siteUrl).toString();
}

export function pageMetadata({
  description,
  locale,
  path,
  title,
}: {
  description: string;
  locale: string;
  path: string;
  title: string;
}): Metadata {
  const url = absoluteUrl(`/${locale}${path}`);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        az: absoluteUrl(`/az${path}`),
        en: absoluteUrl(`/en${path}`),
        ru: absoluteUrl(`/ru${path}`),
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "DilUp",
      locale,
      type: "website",
      images: [
        {
          url: absoluteUrl("/images/dilup-hero-tutor.png"),
          width: 1200,
          height: 630,
          alt: "DilUp online tutor marketplace",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl("/images/dilup-hero-tutor.png")],
    },
  };
}
