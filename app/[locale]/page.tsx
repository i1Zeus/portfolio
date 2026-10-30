import type { Metadata } from "next";
import About from "@/components/home/About";
import BootScreen from "@/components/home/BootScreen";
import Contact from "@/components/home/Contact";
import Hero from "@/components/home/Hero";
import Manifesto from "@/components/home/Manifesto";
import Path from "@/components/home/Path";
import SiteEffects from "@/components/home/SiteEffects";
import SiteFooter from "@/components/home/SiteFooter";
import SiteHeader from "@/components/home/SiteHeader";
import Stack from "@/components/home/Stack";
import Words from "@/components/home/Words";
import Work from "@/components/home/Work";
import JsonLd from "@/components/JsonLd";
import { getDictionary } from "@/data/dictionaries";
import { Locale } from "@/data/locales";
import { PERSON_ID, WEBSITE_ID, absoluteUrl, pageMetadata } from "@/data/seo";

type Params = Promise<{ locale: string }>;

const toLocale = (locale: string): Locale => (locale === "ar" ? "ar" : "en");

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const locale = toLocale((await params).locale);
  const dict = getDictionary(locale);
  return pageMetadata({
    locale,
    path: "",
    title: dict.meta.title,
    description: dict.meta.description,
    absoluteTitle: true,
    type: "profile",
  });
}

export default async function LocalizedHome({ params }: { params: Params }) {
  const locale = toLocale((await params).locale);
  const dict = getDictionary(locale);
  const url = absoluteUrl(`/${locale}`);

  return (
    <>
      <JsonLd
        data={{
          "@type": "ProfilePage",
          "@id": `${url}#page`,
          url,
          name: dict.meta.title,
          description: dict.meta.description,
          inLanguage: locale,
          isPartOf: { "@id": WEBSITE_ID },
          mainEntity: { "@id": PERSON_ID },
          primaryImageOfPage: absoluteUrl(`/og/home-${locale}.jpg`),
        }}
      />
      <BootScreen />
      <SiteEffects waitForBoot />
      <SiteHeader />
      <main className="relative w-full overflow-clip bg-ink text-paper">
        <Hero />
        <Manifesto />
        <About />
        <Stack />
        <Work />
        <Path />
        <Words />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
