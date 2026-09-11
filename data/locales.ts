export type Locale = "en" | "ar";

export const defaultLocale: Locale = "en";
export const locales: Locale[] = ["en", "ar"];

export interface LocaleInfo {
  code: Locale;
  name: string;
  nativeName: string;
  dir: "ltr" | "rtl";
  langName: string;
}

export const localeDetails: Record<Locale, LocaleInfo> = {
  en: {
    code: "en",
    name: "English",
    nativeName: "English",
    dir: "ltr",
    langName: "en-US",
  },
  ar: {
    code: "ar",
    name: "Arabic",
    nativeName: "العربية",
    dir: "rtl",
    langName: "ar-IQ",
  },
};
