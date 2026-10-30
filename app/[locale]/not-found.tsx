"use client";

import Link from "next/link";
import { useLocale } from "@/components/LocaleContext";

export default function LocalizedNotFound() {
  const { dict, locale } = useLocale();

  return (
    <div className="flex h-screen w-full flex-col justify-between bg-ink px-4 py-8 text-paper sm:px-6 md:px-10">
      <span className="label">[ 404 ] · {dict.notFound.title}</span>
      <div>
        <h1 className="display text-[clamp(8rem,30vw,26rem)]" dir="ltr">
          404
        </h1>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-6 border-t border-line pt-6">
          <p className="max-w-md text-paper/70">{dict.notFound.description}</p>
          <Link href={`/${locale}`} className="btn-solid">
            {dict.notFound.backHome}
          </Link>
        </div>
      </div>
    </div>
  );
}
