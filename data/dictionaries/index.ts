import { Locale, defaultLocale } from "../locales";
import { ar } from "./ar";
import { en } from "./en";
import { Dictionary } from "./types";

const dictionaries: Record<Locale, Dictionary> = {
  en,
  ar,
};

export const getDictionary = (locale?: string | null): Dictionary => {
  if (locale && locale in dictionaries) {
    return dictionaries[locale as Locale];
  }
  return dictionaries[defaultLocale];
};

export * from "./types";
