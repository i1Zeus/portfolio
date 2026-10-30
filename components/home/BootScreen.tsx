"use client";

import { useEffect, useState } from "react";
import { useLocale } from "../LocaleContext";
import { markSiteReady } from "./SiteEffects";

const STORAGE_KEY = "hn-booted";
const DURATION = 1100;

/**
 * Full-screen 000 → 100 counter shown on the first visit of a session.
 * Rendered on the server so it covers the page before hydration; an inline
 * script in the layout hides it straight away on repeat visits.
 */
export default function BootScreen() {
  const { dict } = useLocale();
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<"count" | "exit" | "done">("count");

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(STORAGE_KEY) === "1";
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {}

    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("done");
      markSiteReady();
      return;
    }

    document.documentElement.style.overflow = "hidden";
    const start = performance.now();
    let frame = 0;
    let exitTimer = 0;

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) {
        frame = requestAnimationFrame(tick);
        return;
      }
      setPhase("exit");
      document.documentElement.style.overflow = "";
      markSiteReady();
      exitTimer = window.setTimeout(() => setPhase("done"), 900);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(exitTimer);
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      role="status"
      aria-label="Loading"
      className={`boot-screen fixed inset-0 z-[100] flex flex-col justify-between bg-ink px-4 py-5 text-paper transition-transform duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)] md:px-10 md:py-8 ${
        phase === "exit" ? "-translate-y-full" : ""
      }`}
    >
      <div className="label flex justify-between text-paper/60">
        <span>{dict.home.bootLabel}</span>
        <span>©2026</span>
      </div>
      <div dir="ltr">
        <span className="block font-display text-[clamp(7rem,26vw,24rem)] font-light leading-[0.78] tabular-nums">
          {String(count).padStart(3, "0")}
        </span>
        <div className="mt-4 h-px bg-line">
          <i
            className="block h-px origin-left bg-paper"
            style={{ transform: `scaleX(${count / 100})` }}
          />
        </div>
      </div>
    </div>
  );
}
