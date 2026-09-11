import { MetadataRoute } from "next";
import { projects } from "@/data";
import { locales } from "@/data/locales";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://husseinnajah.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [];

  // Home Page entries
  for (const locale of locales) {
    routes.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: {
          en: `${baseUrl}/en`,
          ar: `${baseUrl}/ar`,
          "x-default": `${baseUrl}/en`,
        },
      },
    });
  }

  // Project pages entries
  for (const project of projects) {
    for (const locale of locales) {
      routes.push({
        url: `${baseUrl}/${locale}/project/${project.id}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: {
          languages: {
            en: `${baseUrl}/en/project/${project.id}`,
            ar: `${baseUrl}/ar/project/${project.id}`,
            "x-default": `${baseUrl}/en/project/${project.id}`,
          },
        },
      });
    }
  }

  // NFC & QR pages
  for (const pageName of ["nfc", "qr"]) {
    for (const locale of locales) {
      routes.push({
        url: `${baseUrl}/${locale}/${pageName}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: {
          languages: {
            en: `${baseUrl}/en/${pageName}`,
            ar: `${baseUrl}/ar/${pageName}`,
            "x-default": `${baseUrl}/en/${pageName}`,
          },
        },
      });
    }
  }

  return routes;
}
