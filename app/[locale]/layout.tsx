import type { Metadata, Viewport } from "next";
import { Big_Shoulders, Cairo } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import "../globals.css";
import { LocaleProvider } from "@/components/LocaleContext";
import TerminalOverlay from "@/components/TerminalOverlayLazy";
import JsonLd from "@/components/JsonLd";
import { Locale, defaultLocale, locales, localeDetails, siteUrl } from "@/data/locales";
import { getDictionary } from "@/data/dictionaries";
import { SITE_NAME, siteGraph } from "@/data/seo";

const display = Big_Shoulders({
  subsets: ["latin"],
  axes: ["opsz"],
  fallback: ["Arial Narrow", "sans-serif"],
  adjustFontFallback: false,
  variable: "--font-display",
  display: "swap",
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

type LayoutParams = Promise<{ locale: string }>;

// Only /en and /ar exist; anything else 404s instead of rendering on demand.
export const dynamicParams = false;

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
};

// Site-wide defaults only; every page sets its own canonical, hreflang and share card.
export async function generateMetadata({
  params,
}: {
  params: LayoutParams;
}): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale: Locale = locale === "ar" ? "ar" : defaultLocale;
  const dict = getDictionary(safeLocale);

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: dict.meta.title,
      template: `%s | ${SITE_NAME}`,
    },
    description: dict.meta.description,
    applicationName: SITE_NAME,
    keywords: dict.meta.keywords,
    authors: [{ name: SITE_NAME, url: siteUrl }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: "technology",
    formatDetection: { email: false, address: false, telephone: false },
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

export default async function RootLocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: LayoutParams;
}>) {
  const { locale } = await params;
  const safeLocale: Locale = locale === "ar" ? "ar" : defaultLocale;
  const dir = localeDetails[safeLocale].dir;
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
        <JsonLd data={siteGraph(safeLocale)} />
      </head>
      <body
        className={`site-frame ${safeLocale === "ar" ? "font-cairo" : "font-sans"}`}
      >
        <LocaleProvider locale={safeLocale}>
          {children}
          <TerminalOverlay />
        </LocaleProvider>
      </body>
    </html>
  );
}
