"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLocale } from "../LocaleContext";
import { cn } from "@/utils/cn";

const SECTIONS = ["about", "stack", "work", "path", "contact"] as const;

export default function SiteHeader() {
  const { dict, locale, switchLocale } = useLocale();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const href = (id: string) => `/${locale}#${id}`;

  const langToggle = (
    <button
      type="button"
      onClick={() => switchLocale(locale === "ar" ? "en" : "ar")}
      aria-label={locale === "ar" ? "Switch to English" : "التبديل إلى العربية"}
      className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em]"
      dir="ltr"
    >
      <span className={locale === "en" ? "text-paper" : "text-paper/40 hover:text-paper"}>EN</span>
      <span className="text-paper/30">/</span>
      <span className={cn("font-cairo text-[14px] leading-none", locale === "ar" ? "text-paper" : "text-paper/40 hover:text-paper")}>
        ع
      </span>
    </button>
  );

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-2 top-2 z-50 border-b transition-colors duration-500 sm:inset-x-2",
          scrolled ? "border-line bg-ink/80 backdrop-blur-md" : "border-transparent"
        )}
      >
        <div className="flex items-center justify-between gap-6 px-3 py-3 sm:px-4 md:px-8">
          <Link
            href={`/${locale}`}
            aria-label="Hussein Najah — home"
            className="border border-paper/70 px-1.5 pb-0.5 pt-1 font-display text-[20px] font-semibold uppercase leading-none tracking-tight text-paper transition-colors hover:bg-paper hover:text-ink"
            dir="ltr"
          >
            HN
          </Link>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-7">
              {SECTIONS.map((id, i) => (
                <li key={id}>
                  <a
                    href={href(id)}
                    className="group flex items-baseline gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-paper/60 transition-colors hover:text-paper"
                  >
                    <span className="text-paper/35 group-hover:text-paper/70" dir="ltr">
                      0{i + 1}
                    </span>
                    {dict.home.nav[id]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-5">
            <div className="hidden md:block">{langToggle}</div>
            <a
              href="/hussein-najah-cv.pdf"
              download
              className="hidden border border-line-strong px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors hover:border-paper hover:bg-paper hover:text-ink sm:inline-block"
            >
              {dict.home.cv} ↓
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="font-mono text-[11px] uppercase tracking-[0.12em] md:hidden"
            >
              {dict.home.menu} +
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label={dict.home.menu}
        className={cn(
          "fixed inset-0 z-[80] flex flex-col bg-ink px-5 pb-8 pt-5 transition-[clip-path] duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] md:hidden",
          open ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]"
        )}
      >
        <div className="flex items-center justify-between">
          <span className="label">{dict.home.bootLabel}</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="font-mono text-[11px] uppercase tracking-[0.12em]"
          >
            {dict.home.close} ×
          </button>
        </div>
        <ul className="mt-auto border-t border-line">
          {SECTIONS.map((id, i) => (
            <li key={id} className="border-b border-line">
              <a
                href={href(id)}
                onClick={() => setOpen(false)}
                className="flex items-baseline justify-between py-4 text-paper"
              >
                <span className="display text-[clamp(3rem,15vw,5rem)]">{dict.home.nav[id]}</span>
                <span className="label" dir="ltr">
                  0{i + 1}
                </span>
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex items-center justify-between">
          {langToggle}
          <a href="/hussein-najah-cv.pdf" download className="btn-ghost px-3 py-2">
            {dict.home.cv} ↓
          </a>
        </div>
      </div>
    </>
  );
}
