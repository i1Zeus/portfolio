"use client";

import { useEffect, useRef } from "react";
import { useLocale } from "../LocaleContext";

/** Infinite display-type marquee that follows scroll direction and skews with velocity. */
export default function Manifesto() {
  const { dict } = useLocale();
  const words = dict.home.manifesto;
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let offset = 0,
      skew = 0,
      direction = -1,
      lastY = window.scrollY,
      half = track.scrollWidth / 2,
      frame = 0;

    const loop = () => {
      const y = window.scrollY;
      const velocity = y - lastY;
      lastY = y;
      if (velocity !== 0) direction = velocity > 0 ? -1 : 1;

      offset += direction * (0.6 + Math.min(Math.abs(velocity) * 0.5, 18));
      if (offset <= -half) offset += half;
      if (offset > 0) offset -= half;
      skew += (Math.max(-12, Math.min(12, velocity * 0.6)) - skew) * 0.12;

      track.style.transform = `translate3d(${offset}px,0,0) skewX(${skew}deg)`;
      frame = requestAnimationFrame(loop);
    };

    // Only animate while the marquee is on screen.
    const io = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(frame);
      frame = 0;
      if (entry.isIntersecting) {
        lastY = window.scrollY;
        frame = requestAnimationFrame(loop);
      }
    });
    const ro = new ResizeObserver(() => (half = track.scrollWidth / 2));
    io.observe(track);
    ro.observe(track);

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  const run = [...words, ...words];

  return (
    <section aria-label={words.join(", ")} className="relative overflow-hidden border-y border-line">
      <div className="art-dots absolute inset-0 opacity-25" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/50 to-ink" aria-hidden="true" />
      <div className="relative py-10 md:py-16">
        <div ref={trackRef} dir="ltr" className="flex w-max will-change-transform" aria-hidden="true">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {run.map((word, i) => (
                <span key={`${copy}-${i}`} className="display flex items-center text-[clamp(4rem,13vw,13rem)]">
                  <span className={i % 2 ? "text-outline" : ""}>{word}</span>
                  <span className="mx-6 font-mono text-[0.18em] text-paper/50 md:mx-10">✳</span>
                </span>
              ))}
            </div>
          ))}
        </div>
        <p className="label mx-auto mt-6 max-w-md px-4 text-center text-paper/70">{dict.home.manifestoSub}</p>
      </div>
    </section>
  );
}
