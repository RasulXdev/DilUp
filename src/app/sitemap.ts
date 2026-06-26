import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { absoluteUrl, publicRoutes } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routing.locales.flatMap((locale) =>
    publicRoutes.map((route) => {
      const path = route ? `/${locale}/${route}` : `/${locale}`;

      return {
        url: absoluteUrl(path),
        lastModified,
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1 : route === "get-started" ? 0.9 : 0.7,
      };
    }),
  );
}
