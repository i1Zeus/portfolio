import { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { locales, siteUrl } from "@/data/locales";

const baseUrl = siteUrl;

/** One entry per locale, each listing every language version as an alternate. */
const localized = (
  path: string,
  options: Omit<MetadataRoute.Sitemap[number], "url" | "alternates">,
  images: (locale: string) => string[] = () => []
): MetadataRoute.Sitemap =>
  locales.map((locale) => ({
    url: `${baseUrl}/${locale}${path}`,
    alternates: {
      languages: {
        en: `${baseUrl}/en${path}`,
        ar: `${baseUrl}/ar${path}`,
        "x-default": `${baseUrl}/en${path}`,
      },
    },
    images: images(locale),
    ...options,
  }));

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    ...localized("", { lastModified, changeFrequency: "weekly", priority: 1 }, (locale) => [
      `${baseUrl}/og/home-${locale}.jpg`,
    ]),
    ...projects.flatMap((project) =>
      localized(`/project/${project.slug}`, { lastModified, changeFrequency: "monthly", priority: 0.8 }, () =>
        [project.cover, ...project.gallery].map((src) => `${baseUrl}${src}`)
      )
    ),
    // /qr renders the same card and declares /nfc as canonical, so only /nfc is listed.
    ...localized("/nfc", { lastModified, changeFrequency: "monthly", priority: 0.5 }),
  ];
}
