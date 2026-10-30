"use client";

import { useEffect, useRef } from "react";
import { socialMedia } from "@/data";
import { useLocale } from "../LocaleContext";
import { SplitText, sectionPad } from "./primitives";
import { cn } from "@/utils/cn";

export default function SiteFooter() {
  const { dict, locale } = useLocale();
  const h = dict.home;
  const fitRef = useRef<HTMLDivElement>(null);

  // Scale the wordmark so it spans the full content width.
  useEffect(() => {
    const box = fitRef.current;
    const text = box?.firstElementChild as HTMLElement | null;
    if (!box || !text) return;
    const fit = () => {
      text.style.fontSize = "";
      const size = parseFloat(getComputedStyle(text).fontSize);
      text.style.fontSize = `${(size * box.clientWidth) / text.offsetWidth}px`;
    };
    fit();
    document.fonts?.ready.then(fit);
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [locale]);

  return (
    <footer className="overflow-hidden border-t border-line" data-print-hide>
      <div className={cn("grid grid-cols-1 gap-6 py-8 md:grid-cols-3 md:items-center", sectionPad)}>
        <p className="label">
          <span dir="ltr">©2026</span> {dict.socialProfile.cardHolderName} — {h.rights}
        </p>
        <ul className="flex flex-wrap gap-x-5 gap-y-2 md:justify-center">
          {socialMedia.map((s) => (
            <li key={s.id}>
              <a
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] uppercase tracking-[0.12em] text-paper/60 transition-colors hover:text-paper"
              >
                {s.name === "X Formally Twitter" ? "X" : s.name} ↗
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between gap-4 md:justify-end">
          <p className="label normal-case tracking-normal md:hidden">{h.footerTagline}</p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-paper/70 transition-colors hover:text-paper"
          >
            {h.backToTop}
            <span className="inline-block transition-transform group-hover:-translate-y-0.5">↑</span>
          </button>
        </div>
      </div>

      <div className={cn("pb-6 md:pb-8", sectionPad)}>
        <div ref={fitRef}>
          <SplitText
            as="p"
            text={h.wordmark}
            className={cn(
              "display inline-block whitespace-nowrap text-paper",
              locale === "ar" ? "text-[19vw] leading-[1.1]" : "text-[24vw] leading-[0.8]"
            )}
          />
        </div>
      </div>
    </footer>
  );
}
