import type { Metadata } from "next";
import CvPage from "@/components/cv/CvPage";
import JsonLd from "@/components/JsonLd";
import { getDictionary } from "@/data/dictionaries";
import { Locale } from "@/data/locales";
import { PERSON_ID, WEBSITE_ID, absoluteUrl, breadcrumbs, pageMetadata } from "@/data/seo";

type Params = Promise<{ locale: string }>;

const toLocale = (locale: string): Locale => (locale === "ar" ? "ar" : "en");

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const locale = toLocale((await params).locale);
  const dict = getDictionary(locale);
  return pageMetadata({
    locale,
    path: "/cv",
    title: dict.cv.title,
    description: dict.cv.description,
    type: "profile",
  });
}

export default async function CvRoute({ params }: { params: Params }) {
  const locale = toLocale((await params).locale);
  const dict = getDictionary(locale);
  const url = absoluteUrl(`/${locale}/cv`);

  return (
    <>
      <JsonLd
        data={[
          {
            "@type": "WebPage",
            "@id": `${url}#page`,
            url,
            name: dict.cv.title,
            description: dict.cv.description,
            inLanguage: locale,
            isPartOf: { "@id": WEBSITE_ID },
            about: { "@id": PERSON_ID },
          },
          breadcrumbs([
            { name: dict.meta.breadcrumbHome, path: `/${locale}` },
            { name: dict.cv.title, path: `/${locale}/cv` },
          ]),
        ]}
      />
      <CvPage locale={locale} />
    </>
  );
}
