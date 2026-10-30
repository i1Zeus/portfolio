import type { Metadata } from "next";
import { contactEmail, stackGroups } from "./index";
import { Locale, siteUrl } from "./locales";
import { getDictionary } from "./dictionaries";

const OG_LOCALE: Record<Locale, string> = { en: "en_US", ar: "ar_IQ" };

export const SITE_NAME = "Hussein Najah";
export const PERSON_ID = `${siteUrl}/#person`;
export const WEBSITE_ID = `${siteUrl}/#website`;

export const sameAs = [
  "https://github.com/i1Zeus",
  "https://www.linkedin.com/in/i1zeus",
  "https://x.com/i1Zeus",
  "https://www.instagram.com/hxg.1",
  "https://www.facebook.com/iZeus01",
];

export const absoluteUrl = (path: string) => `${siteUrl}${path}`;

/** Trims to a search-snippet friendly length without cutting a word in half. */
export const snippet = (text: string, max = 155) => {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
};

interface PageMetaInput {
  locale: Locale;
  /** Path after the locale prefix, e.g. "" or "/project/2". */
  path: string;
  title: string;
  description: string;
  /** Use the title as-is instead of applying the "%s | Hussein Najah" template. */
  absoluteTitle?: boolean;
  image?: { url: string; alt: string };
  type?: "website" | "article" | "profile";
  /** Point search engines at another path when this page duplicates it. */
  canonicalPath?: string;
}

/** Canonical, hreflang, Open Graph and Twitter tags for one localized page. */
export function pageMetadata({
  locale,
  path,
  title,
  description,
  absoluteTitle = false,
  image,
  type = "website",
  canonicalPath = path,
}: PageMetaInput): Metadata {
  const dict = getDictionary(locale);
  const url = `/${locale}${path}`;
  const ogImage = image ?? { url: `/og/home-${locale}.jpg`, alt: dict.meta.imageAlt };
  const images = [{ url: ogImage.url, width: 1200, height: 630, alt: ogImage.alt }];
  const shareTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: `/${locale}${canonicalPath}`,
      languages: {
        en: `/en${canonicalPath}`,
        ar: `/ar${canonicalPath}`,
        "x-default": `/en${canonicalPath}`,
      },
    },
    openGraph: {
      type,
      url,
      siteName: SITE_NAME,
      locale: OG_LOCALE[locale],
      alternateLocale: OG_LOCALE[locale === "ar" ? "en" : "ar"],
      title: shareTitle,
      description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      creator: "@i1Zeus",
      title: shareTitle,
      description,
      images: images.map((i) => i.url),
    },
  };
}

/** Site-wide Person + WebSite entities that every page's structured data refers to. */
export function siteGraph(locale: Locale) {
  const dict = getDictionary(locale);
  return [
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: "Hussein Najah",
      alternateName: ["حسين نجاح", "i1Zeus"],
      jobTitle: dict.meta.personJobTitle,
      description: dict.meta.description,
      url: absoluteUrl(`/${locale}`),
      image: absoluteUrl("/icon.png"),
      email: `mailto:${contactEmail}`,
      address: { "@type": "PostalAddress", addressLocality: "Basra", addressCountry: "IQ" },
      sameAs,
      knowsAbout: stackGroups.flatMap((g) => g.items),
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: siteUrl,
      name: SITE_NAME,
      alternateName: "حسين نجاح",
      inLanguage: ["en", "ar"],
      publisher: { "@id": PERSON_ID },
    },
  ];
}

export const breadcrumbs = (items: { name: string; path: string }[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});
