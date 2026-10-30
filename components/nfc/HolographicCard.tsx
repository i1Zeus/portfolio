"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { soundManager } from "@/utils/soundEffects";
import { triggerHapticFeedback } from "@/utils/vcard";
import { useLocale } from "../LocaleContext";

const NfcWaves = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={className} aria-hidden="true">
    <path d="M8.5 8.5a5 5 0 0 1 0 7M11.8 6a8.5 8.5 0 0 1 0 12M15.1 3.5a12 12 0 0 1 0 17" strokeLinecap="round" />
  </svg>
);

const face =
  "absolute inset-0 h-full w-full overflow-hidden border border-line-strong bg-stage [backface-visibility:hidden] [-webkit-backface-visibility:hidden]";

export default function HolographicCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const cardRef = useRef<HTMLDivElement>(null);
  const { dict } = useLocale();
  const p = dict.socialProfile;

  // Mouse tilt physics (isolated from the 180deg flip)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const tiltRotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const tiltRotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  // Light sweep position
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

  // The QR on the back of the card is generated once the browser is idle, off the critical path.
  useEffect(() => {
    const generate = () =>
      import("qrcode")
        .then(({ default: QRCode }) =>
          QRCode.toDataURL(window.location.href, { width: 260, margin: 1, color: { dark: "#050505", light: "#f2f2ee" } })
        )
        .then(setQrDataUrl)
        .catch((err) => console.error("QR Code Error:", err));
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(generate, { timeout: 3000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(generate, 1500);
    return () => clearTimeout(id);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleFlip = () => {
    soundManager.playFlip();
    triggerHapticFeedback([20, 20]);
    setIsFlipped((prev) => !prev);
  };

  return (
    <div className="flex w-full flex-col items-center">
      {/* 3D Perspective Card Viewport */}
      <div
        style={{ perspective: 1200 }}
        className="crosshair group relative aspect-[1.586/1] w-full cursor-pointer select-none"
        onClick={handleFlip}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        ref={cardRef}
      >
        {/* Layer 1: Mouse Tilt Physics */}
        <motion.div
          style={{
            rotateX: tiltRotateX,
            rotateY: tiltRotateY,
            transformStyle: "preserve-3d",
            WebkitTransformStyle: "preserve-3d",
          }}
          className="relative h-full w-full"
        >
          {/* Layer 2: 180-Degree 3D Card Flip */}
          <motion.div
            initial={false}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            style={{ transformStyle: "preserve-3d", WebkitTransformStyle: "preserve-3d" }}
            className="relative h-full w-full shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)]"
          >
            {/* CARD FRONT FACE */}
            <div className={`${face} flex flex-col justify-between p-5 sm:p-6`}>
              <div className="art-lines art-fade pointer-events-none absolute -end-1/4 -top-1/4 h-[130%] w-3/4 opacity-25" />
              <motion.div
                style={{
                  background: "radial-gradient(circle, rgba(242,242,238,0.12) 0%, transparent 55%)",
                  left: glareX,
                  top: glareY,
                  transform: "translate(-50%, -50%)",
                }}
                className="pointer-events-none absolute h-[200%] w-[200%]"
              />

              {/* Top Row: Mark, Chip & Contactless */}
              <div className="relative z-10 flex items-start justify-between">
                <span
                  className="border border-paper/70 px-1.5 pb-0.5 pt-1 font-display text-[18px] font-semibold uppercase leading-none tracking-tight text-paper"
                  dir="ltr"
                >
                  HN
                </span>
                <div className="flex items-center gap-3">
                  {/* Outlined EMV chip */}
                  <div className="grid h-8 w-10 grid-cols-3 grid-rows-3 border border-paper/50" aria-hidden="true">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <span key={i} className="border-[0.5px] border-paper/25" />
                    ))}
                  </div>
                  <NfcWaves className="h-6 w-6 text-paper/80" />
                </div>
              </div>

              {/* Middle Row: Name & Role */}
              <div className="relative z-10 text-start">
                <p className="label mb-2 text-paper/55" dir="ltr">
                  ••••&nbsp;&nbsp;••••&nbsp;&nbsp;••••&nbsp;&nbsp;2026
                </p>
                <h2 className="display text-[clamp(2rem,9vw,2.9rem)] text-paper">{p.cardHolderName}</h2>
                <p className="label mt-1.5 text-paper/70">{p.cardRole}</p>
              </div>

              {/* Bottom Row: Handle & Flip hint */}
              <div className="relative z-10 flex items-center justify-between border-t border-line pt-2.5">
                <span className="flex items-center gap-2 font-mono text-[11px] tracking-[0.08em] text-paper/90" dir="ltr">
                  <span className="h-1.5 w-1.5 rounded-full bg-paper" />
                  @i1Zeus
                </span>
                <span className="label text-[11px] text-paper/55">{p.tapToFlip}</span>
              </div>
            </div>

            {/* CARD BACK FACE (Revealed when rotated 180deg) */}
            <div
              style={{ transform: "rotateY(180deg)", WebkitTransform: "rotateY(180deg)" }}
              className={`${face} flex flex-col justify-between p-4 sm:p-5`}
            >
              {/* Magnetic Stripe */}
              <div className="absolute inset-x-0 top-4 h-8 border-y border-line bg-ink" />

              {/* Signature Panel */}
              <div className="relative z-10 mt-10 flex items-center gap-2">
                <div className="art-lines flex h-7 flex-1 items-center border border-line px-3 opacity-90">
                  <span className="bg-stage px-1 font-mono text-[11px] italic tracking-wider text-paper/75" dir="ltr">
                    Hussein Najah // @i1Zeus
                  </span>
                </div>
                <span className="flex h-7 items-center border border-line px-2 font-mono text-[11px] text-paper/80" dir="ltr">
                  CVC 777
                </span>
              </div>

              {/* Live QR Code & Scan Instructions */}
              <div className="relative z-10 flex items-center justify-between gap-4 border border-line bg-ink/60 p-2.5 text-start">
                <div className="min-w-0">
                  <p className="label text-paper">{p.instantConnect}</p>
                  <p className="mt-1 text-[11px] leading-snug text-paper/60">{p.instantConnectDesc}</p>
                </div>
                {qrDataUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={qrDataUrl} alt="Hussein Najah QR Code" className="h-16 w-16 shrink-0 bg-paper p-1" />
                ) : (
                  <div className="h-16 w-16 shrink-0 animate-pulse bg-paper/10" />
                )}
              </div>

              {/* Bottom Status */}
              <div className="relative z-10 flex items-center justify-between gap-3">
                <span className="label truncate text-[11px] text-paper/55">{p.signatureRequired}</span>
                <span className="label shrink-0 text-[11px] text-paper/70">{p.tapToFlip}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Flip Helper Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handleFlip();
        }}
        className="mt-5 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-paper/60 transition-colors hover:text-paper"
      >
        <span className={`inline-block transition-transform duration-500 ${isFlipped ? "rotate-180" : ""}`}>↻</span>
        {isFlipped ? p.flipToFront : p.flipToBack}
      </button>
    </div>
  );
}
