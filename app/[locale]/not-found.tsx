"use client";

import Link from "next/link";
import { useLocale } from "@/components/LocaleContext";

export default function LocalizedNotFound() {
  const { dict, locale } = useLocale();

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-black-100 text-white px-4">
      <h1 className="text-6xl font-bold text-purple mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">
        {dict.notFound.title}
      </h2>
      <p className="text-white-200 text-sm mb-6 max-w-md text-center">
        {dict.notFound.description}
      </p>
      <Link
        href={`/${locale}`}
        className="px-6 py-2.5 rounded-full bg-purple text-black font-semibold text-sm hover:opacity-90 transition-opacity"
      >
        {dict.notFound.backHome}
      </Link>
    </div>
  );
}
