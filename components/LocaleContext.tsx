"use client";

import React, { createContext, useContext, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Locale, defaultLocale, localeDetails } from "@/data/locales";
import { Dictionary, getDictionary } from "@/data/dictionaries";

interface LocaleContextValue {
  locale: Locale;
  dir: "ltr" | "rtl";
  dict: Dictionary;
  switchLocale: (newLocale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export const LocaleProvider = ({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const safeLocale: Locale = locale === "ar" ? "ar" : defaultLocale;
  const dir = localeDetails[safeLocale].dir;
  const dict = useMemo(() => getDictionary(safeLocale), [safeLocale]);

  const switchLocale = (newLocale: Locale) => {
    if (newLocale === safeLocale) return;

    // Persist choice in cookie for 1 year
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;

    // Calculate new path by replacing the current locale prefix
    // e.g. /en/project/0 -> /ar/project/0
    // or /en -> /ar
    let newPath = pathname;
    if (pathname.startsWith(`/${safeLocale}`)) {
      newPath = pathname.replace(`/${safeLocale}`, `/${newLocale}`);
    } else {
      newPath = `/${newLocale}${pathname === "/" ? "" : pathname}`;
    }

    router.push(newPath);
  };

  const value = useMemo(
    () => ({
      locale: safeLocale,
      dir,
      dict,
      switchLocale,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [safeLocale, dir, dict, pathname]
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
};

export const useLocale = (): LocaleContextValue => {
  const context = useContext(LocaleContext);
  if (!context) {
    // Fallback if rendered outside provider
    return {
      locale: defaultLocale,
      dir: "ltr",
      dict: getDictionary(defaultLocale),
      switchLocale: () => {},
    };
  }
  return context;
};
