import type { Metadata } from "next";
import { Big_Shoulders_Display, Cairo } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import dynamic from "next/dynamic";

import "../globals.css";
import { ThemeProvider } from "../provider";
import { LocaleProvider } from "@/components/LocaleContext";
import { Locale, defaultLocale, locales, localeDetails, siteUrl } from "@/data/locales";
import { getDictionary } from "@/data/dictionaries";

const TerminalOverlay = dynamic(() => import("@/components/TerminalOverlay"), {
  ssr: false,
});

const display = Big_Shoulders_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-cairo",
  display: "swap",
});

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const safeLocale: Locale = params.locale === "ar" ? "ar" : defaultLocale;
  const dict = getDictionary(safeLocale);
  const isArabic = safeLocale === "ar";
  const baseUrl = siteUrl;

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: dict.meta.title,
      template: `%s | Hussein Najah`,
    },
    description: dict.meta.description,
    keywords: dict.meta.keywords,
    authors: [{ name: "Hussein Najah", url: baseUrl }],
    creator: "Hussein Najah",
    alternates: {
      canonical: `/${safeLocale}`,
      languages: {
        en: `${baseUrl}/en`,
        ar: `${baseUrl}/ar`,
        "x-default": `${baseUrl}/en`,
      },
    },
    openGraph: {
      title: dict.meta.ogTitle,
      description: dict.meta.ogDescription,
      url: `${baseUrl}/${safeLocale}`,
      siteName: "Hussein Najah Portfolio",
      locale: isArabic ? "ar_IQ" : "en_US",
      type: "website",
      images: [
        {
          url: "/project/izeus-erp.png",
          width: 1200,
          height: 630,
          alt: dict.meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.ogTitle,
      description: dict.meta.ogDescription,
      creator: "@i1Zeus",
      images: ["/project/izeus-erp.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default function RootLocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const safeLocale: Locale = params.locale === "ar" ? "ar" : defaultLocale;
  const dir = localeDetails[safeLocale].dir;
  const dict = getDictionary(safeLocale);
  const baseUrl = siteUrl;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Hussein Najah",
    alternateName: "حسين نجاح",
    jobTitle: dict.meta.personJobTitle,
    url: `${baseUrl}/${safeLocale}`,
    sameAs: [
      "https://github.com/i1Zeus",
      "https://www.linkedin.com/in/i1zeus",
      "https://x.com/i1Zeus",
      "https://www.instagram.com/hxg.1",
    ],
    knowsAbout: [
      "Software Engineering",
      "Next.js",
      "React",
      "TypeScript",
      "Full-Stack Development",
      "System Architecture",
      "Enterprise Resource Planning (ERP)",
    ],
  };

  return (
    <html
      lang={safeLocale}
      dir={dir}
      className={`${GeistSans.variable} ${GeistMono.variable} ${display.variable} ${cairo.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "var d=document.documentElement;d.classList.add('js');try{if(sessionStorage.getItem('hn-booted'))d.classList.add('booted')}catch(e){}",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`site-frame ${safeLocale === "ar" ? "font-cairo" : "font-sans"}`}
      >
        <LocaleProvider locale={safeLocale}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            forcedTheme="dark"
            disableTransitionOnChange
          >
            {children}
            <TerminalOverlay />
          </ThemeProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
