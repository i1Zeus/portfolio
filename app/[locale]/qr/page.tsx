import type { Metadata } from "next";
import NfcPage from "@/components/nfc/NfcPage";
import { getDictionary } from "@/data/dictionaries";
import { Locale } from "@/data/locales";
import { pageMetadata } from "@/data/seo";

type Params = Promise<{ locale: string }>;

// Same card as /nfc (printed QR codes point here), so search engines are sent to /nfc.
export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const locale: Locale = (await params).locale === "ar" ? "ar" : "en";
  const dict = getDictionary(locale);
  return pageMetadata({
    locale,
    path: "/qr",
    canonicalPath: "/nfc",
    title: dict.meta.nfcTitle,
    description: dict.meta.nfcDescription,
    type: "profile",
  });
}

export default function QrRoute() {
  return <NfcPage />;
}
