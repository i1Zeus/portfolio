import type { Metadata } from "next";
import { Inter, Cairo } from "next/font/google";
import dynamic from "next/dynamic";

import "../globals.css";
import { ThemeProvider } from "../provider";
import { LocaleProvider } from "@/components/LocaleContext";
import { Locale, defaultLocale, locales, localeDetails } from "@/data/locales";
import { getDictionary } from "@/data/dictionaries";

const TerminalOverlay = dynamic(() => import("@/components/TerminalOverlay"), {
  ssr: false,
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://husseinnajah.com";

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: dict.meta.title,
      template: `%s | Hussein Najah`,
    },
    description: dict.meta.description,
    keywords: dict.meta.keywords,
    authors: [{ name: "Hussein Najah", url: "https://husseinnajah.com" }],
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
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://husseinnajah.com";

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
      className={`${inter.variable} ${cairo.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={safeLocale === "ar" ? `${cairo.className} font-cairo` : `${inter.className} font-sans`}>
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
