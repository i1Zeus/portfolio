import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import NfcPage from "@/components/nfc/NfcPage";
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
    path: "/nfc",
    title: dict.meta.nfcTitle,
    description: dict.meta.nfcDescription,
    type: "profile",
  });
}

export default async function NfcRoute({ params }: { params: Params }) {
  const locale = toLocale((await params).locale);
  const dict = getDictionary(locale);
  const url = absoluteUrl(`/${locale}/nfc`);

  return (
    <>
      <JsonLd
        data={[
          {
            "@type": "ContactPage",
            "@id": `${url}#page`,
            url,
            name: dict.meta.nfcTitle,
            description: dict.meta.nfcDescription,
            inLanguage: locale,
            isPartOf: { "@id": WEBSITE_ID },
            mainEntity: { "@id": PERSON_ID },
          },
          breadcrumbs([
            { name: dict.meta.breadcrumbHome, path: `/${locale}` },
            { name: dict.meta.nfcTitle, path: `/${locale}/nfc` },
          ]),
        ]}
      />
      <NfcPage />
    </>
  );
}
