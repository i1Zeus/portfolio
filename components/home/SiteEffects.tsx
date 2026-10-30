"use client";

import { useEffect, useRef } from "react";

export const READY_EVENT = "hn:ready";

export const isSiteReady = () =>
  typeof document !== "undefined" &&
  document.documentElement.dataset.ready === "1";

export const markSiteReady = () => {
  document.documentElement.dataset.ready = "1";
  window.dispatchEvent(new Event(READY_EVENT));
};

/** Runs `fn` once the boot screen has finished (immediately if it already has). */
export const onSiteReady = (fn: () => void) => {
  if (isSiteReady()) {
    fn();
    return () => {};
  }
  window.addEventListener(READY_EVENT, fn, { once: true });
  return () => window.removeEventListener(READY_EVENT, fn);
};

/**
 * Page-wide behaviour: reveals `.reveal` / `.split` elements as they enter the
 * viewport and drives the custom cursor on fine pointers.
 */
export default function SiteEffects({ waitForBoot = false }: { waitForBoot?: boolean }) {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!waitForBoot) markSiteReady();

    let io: IntersectionObserver | null = null;
    const stop = onSiteReady(() => {
      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            entry.target.setAttribute("data-in", "");
            io?.unobserve(entry.target);
          }
        },
        { rootMargin: "0px 0px -8% 0px" }
      );
      document.querySelectorAll(".reveal, .split").forEach((el) => io!.observe(el));
    });

    return () => {
      stop();
      io?.disconnect();
    };
  }, [waitForBoot]);

  useEffect(() => {
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (
      !ring ||
      !dot ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    const root = document.documentElement;
    root.classList.add("has-cursor");

    let x = -100,
      y = -100,
      rx = -100,
      ry = -100,
      scale = 1,
      targetScale = 1,
      frame = 0;

    // Runs only while the ring is catching up with the pointer, then sleeps.
    const loop = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      scale += (targetScale - scale) * 0.18;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) scale(${scale})`;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      const settled =
        Math.abs(x - rx) < 0.1 && Math.abs(y - ry) < 0.1 && Math.abs(targetScale - scale) < 0.001;
      frame = settled ? 0 : requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const interactive = (e.target as Element | null)?.closest?.("a, button, [data-cursor]");
      targetScale = interactive ? 1.9 : 1;
      ring.style.opacity = dot.style.opacity = "1";
      if (!frame) frame = requestAnimationFrame(loop);
    };
    const onLeave = () => {
      ring.style.opacity = dot.style.opacity = "0";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      root.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[90] -ml-[17px] -mt-[17px] h-[34px] w-[34px] rounded-full border border-paper/60 opacity-0 mix-blend-difference transition-opacity duration-300"
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[90] -ml-[2px] -mt-[2px] h-1 w-1 rounded-full bg-paper opacity-0 mix-blend-difference"
      />
    </>
  );
}
