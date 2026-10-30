"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "../LocaleContext";
import DitherSphere from "./DitherSphere";
import { SplitText, sectionPad } from "./primitives";
import { cn } from "@/utils/cn";

const baghdadTime = () =>
  new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Baghdad",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
    .format(new Date())
    .split(":");

/** Variable-weight “magnet”: characters near the pointer get heavier. */
const useWeightMagnet = (ref: React.RefObject<HTMLElement | null>, enabled: boolean) => {
  useEffect(() => {
    const root = ref.current;
    if (
      !root ||
      !enabled ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    const MIN = 250,
      MAX = 800,
      RADIUS = 260;
    const chars = Array.from(root.querySelectorAll<HTMLElement>(".split-char"));
    const weights = chars.map(() => MIN);
    let centers: { x: number; y: number }[] = [];
    let mx = -9999,
      my = -9999,
      frame = 0;

    const measure = () => {
      centers = chars.map((c) => {
        const r = c.getBoundingClientRect();
        return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
      });
    };

    const step = () => {
      let moving = false;
      chars.forEach((c, i) => {
        const p = centers[i];
        const u = Math.max(0, 1 - Math.hypot(mx - p.x, my - p.y) / RADIUS);
        const target = MIN + (MAX - MIN) * u * u * (3 - 2 * u);
        weights[i] += (target - weights[i]) * 0.18;
        if (Math.abs(target - weights[i]) > 0.5) moving = true;
        c.style.fontVariationSettings = `"wght" ${weights[i].toFixed(0)}`;
      });
      frame = moving ? requestAnimationFrame(step) : 0;
    };

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!frame) {
        measure();
        frame = requestAnimationFrame(step);
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, [ref, enabled]);
};

export default function Hero() {
  const { dict, dir } = useLocale();
  const h = dict.home;
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [time, setTime] = useState<string[] | null>(null);

  useWeightMagnet(titleRef, dir === "ltr");

  useEffect(() => {
    setTime(baghdadTime());
    const id = window.setInterval(() => setTime(baghdadTime()), 10_000);
    return () => clearInterval(id);
  }, []);

  const info = [
    h.wordmark.split(" "),
    [h.location, h.region],
    [h.role, h.roleDetail],
  ];

  return (
    <section
      id="top"
      className={cn("relative flex min-h-[100svh] flex-col overflow-hidden pt-16 md:pt-[4.5rem]", sectionPad)}
    >
      <DitherSphere className="pointer-events-none absolute -end-[30%] top-[18%] aspect-square w-[115vw] opacity-40 sm:-end-[12%] md:opacity-70 sm:w-[80vw] md:top-[14%] lg:-end-[2%] lg:top-[10%] lg:w-[min(52vw,88vh)]" />

      <div className="relative z-10 -mx-4 grid grid-cols-2 gap-y-4 border-y border-line bg-ink/70 px-4 py-4 backdrop-blur-md sm:-mx-6 sm:px-6 md:-mx-10 md:mt-6 md:grid-cols-4 md:px-10">
        {info.map(([a, b], i) => (
          <div key={i} className={cn("reveal", i === 2 && "hidden md:block", i === 1 && "text-end md:text-start")}>
            <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-paper">{a}</p>
            <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-paper/55">{b}</p>
          </div>
        ))}
        <div className="reveal hidden md:block md:text-end">
          <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-paper/55">{h.localTime}</p>
          <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-paper">
            <span dir="ltr">
              {time ? (
                <>
                  {time[0]}
                  <span className="animate-blink">:</span>
                  {time[1]}
                </>
              ) : (
                "--:--"
              )}{" "}
              <span className="text-paper/55">GMT+3</span>
            </span>
          </p>
        </div>
      </div>

      <div className="relative z-10 flex flex-1 flex-col justify-end gap-8 py-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12 lg:py-[4vh]">
        <div>
          <div className="reveal label mb-6 flex items-center gap-2 text-paper/70">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-paper opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-paper" />
            </span>
            <span>
              <span dir="ltr">[ 00 ]</span> · {h.available}
            </span>
          </div>
          <h1
            ref={titleRef}
            className="display text-[clamp(3.4rem,min(10vw,12.5vh),12rem)] ltr:[font-variation-settings:'wght'_250] max-lg:ltr:[font-variation-settings:'wght'_380]"
          >
            <span className="sr-only">
              {dict.socialProfile.cardHolderName} — {dict.meta.personJobTitle}.{" "}
            </span>
            {h.heroTitle.map((line, i) => (
              <SplitText key={line} text={line} className="block" delay={i * 120} />
            ))}
          </h1>
        </div>

        <div className="reveal crosshair max-w-md shrink-0 border border-line bg-ink/75 p-5 backdrop-blur-md lg:mb-3 lg:max-w-sm">
          <p className="text-[15px] leading-relaxed text-paper/75 md:text-base">{h.heroLead}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <a href="#work" className="btn-solid">
              {h.ctaProjects} ↓
            </a>
            <a href="#contact" className="btn-ghost">
              {h.ctaContact}
            </a>
          </div>
        </div>
      </div>

      <div className="relative z-10 -mx-4 flex items-center justify-between border-t border-line px-4 py-3 sm:-mx-6 sm:px-6 md:-mx-10 md:px-10">
        <span className="label flex items-center gap-3">
          <span className="relative block h-6 w-px overflow-hidden bg-line">
            <span className="absolute inset-x-0 top-0 block h-1/2 animate-[scrollcue_1.8s_ease-in-out_infinite] bg-paper" />
          </span>
          {h.scroll}
        </span>
        <span className="label me-14">
          <bdi>33.31°N · 44.36°E</bdi>
        </span>
      </div>
    </section>
  );
}
