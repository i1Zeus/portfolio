"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { RiQrCodeLine } from "react-icons/ri";
import { MdNfc } from "react-icons/md";
import { FaRotate } from "react-icons/fa6";
import QRCode from "qrcode";
import { soundManager } from "@/utils/soundEffects";
import { triggerHapticFeedback } from "@/utils/vcard";
import { useLocale } from "../LocaleContext";

export default function HolographicCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const cardRef = useRef<HTMLDivElement>(null);
  const { dict } = useLocale();

  // Mouse tilt physics (isolated from the 180deg flip)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const tiltRotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const tiltRotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  // Holographic glare position
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

  useEffect(() => {
    // Generate QR for the current card URL
    const currentUrl =
      typeof window !== "undefined"
        ? window.location.href
        : "https://www.hussein-najah.com/qr";

    QRCode.toDataURL(currentUrl, {
      width: 260,
      margin: 1,
      color: {
        dark: "#000319",
        light: "#ffffff",
      },
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error("QR Code Error:", err));
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
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
    <div className="w-full flex flex-col items-center justify-center my-4">
      {/* 3D Perspective Card Viewport */}
      <div
        style={{ perspective: 1200 }}
        className="w-full max-w-[370px] sm:max-w-[420px] aspect-[1.586/1] relative cursor-pointer group select-none"
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
          className="w-full h-full relative"
        >
          {/* Layer 2: 180-Degree 3D Card Flip */}
          <motion.div
            initial={false}
            animate={{
              rotateY: isFlipped ? 180 : 0,
            }}
            transition={{
              duration: 0.6,
              ease: [0.23, 1, 0.32, 1],
            }}
            style={{
              transformStyle: "preserve-3d",
              WebkitTransformStyle: "preserve-3d",
            }}
            className="w-full h-full relative rounded-2xl shadow-2xl transition-shadow duration-300 group-hover:shadow-[0_20px_50px_rgba(203,172,249,0.25)]"
          >
            {/* ======================================================== */}
            {/* CARD FRONT FACE */}
            {/* ======================================================== */}
            <div
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transformStyle: "preserve-3d",
                WebkitTransformStyle: "preserve-3d",
              }}
              className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-[#0c0d1e] via-[#050616] to-[#120826] border border-white/15 p-6 flex flex-col justify-between shadow-inner"
            >
              {/* Holographic Sheen Layer */}
              <motion.div
                style={{
                  background:
                    "radial-gradient(circle at center, rgba(203,172,249,0.22) 0%, rgba(120,119,198,0.1) 40%, transparent 80%)",
                  left: glareX,
                  top: glareY,
                  transform: "translate(-50%, -50%)",
                }}
                className="absolute w-[200%] h-[200%] pointer-events-none opacity-70 group-hover:opacity-100 transition-opacity"
              />

              {/* Brushed Metal Texture Overlay */}
              <div className="absolute inset-0 bg-dot-white/[0.1] pointer-events-none" />

              {/* Top Row: Chip & Contactless Wave */}
              <div className="flex items-center justify-between relative z-10">
                {/* EMV Microchip Graphic */}
                <div className="relative w-11 h-9 rounded-md bg-gradient-to-br from-amber-200 via-yellow-400 to-amber-600 p-[1px] shadow-md">
                  <div className="w-full h-full rounded-[5px] bg-gradient-to-br from-yellow-300 via-amber-400 to-amber-500 flex flex-col justify-between p-1 border border-yellow-200/50">
                    <div className="w-full h-[1px] bg-amber-700/60" />
                    <div className="flex justify-between items-center w-full">
                      <div className="w-2.5 h-[1px] bg-amber-700/60" />
                      <div className="w-2.5 h-2.5 rounded-full border border-amber-800/50" />
                      <div className="w-2.5 h-[1px] bg-amber-700/60" />
                    </div>
                    <div className="w-full h-[1px] bg-amber-700/60" />
                  </div>
                </div>

                {/* NFC Contactless Wave */}
                <div className="flex items-center gap-1.5 text-white/80">
                  <MdNfc className="text-2xl text-purple drop-shadow-[0_0_8px_rgba(203,172,249,0.8)]" />
                  <span className="text-[10px] font-mono tracking-widest text-purple/90 font-semibold uppercase">
                    {dict.socialProfile.nfcWallet}
                  </span>
                </div>
              </div>

              {/* Middle Row: Embossed Digits Placeholder & Tagline */}
              <div className="relative z-10 my-auto text-start">
                <p className="font-mono text-xs tracking-[0.3em] text-white/40 mb-1" dir="ltr">
                  ••••  ••••  ••••  2026
                </p>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  {dict.socialProfile.cardHolderName}
                </h2>
                <p className="text-xs font-medium text-purple/90 tracking-wider">
                  {dict.socialProfile.cardRole}
                </p>
              </div>

              {/* Bottom Row: Social Handle & Brand */}
              <div className="flex items-center justify-between relative z-10 pt-2 border-t border-white/10">
                <div className="flex items-center gap-1.5">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
                  <span className="font-mono text-xs font-medium text-white/90 tracking-wide" dir="ltr">
                    @i1Zeus
                  </span>
                </div>
                <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase">
                  {dict.socialProfile.tapToFlip}
                </span>
              </div>
            </div>

            {/* ======================================================== */}
            {/* CARD BACK FACE (Revealed when rotated 180deg) */}
            {/* ======================================================== */}
            <div
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
                WebkitTransform: "rotateY(180deg)",
                transformStyle: "preserve-3d",
                WebkitTransformStyle: "preserve-3d",
              }}
              className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-[#070817] via-[#050616] to-[#120826] border border-purple/30 p-5 flex flex-col justify-between shadow-2xl"
            >
              {/* Magnetic Stripe */}
              <div className="absolute top-4 left-0 w-full h-8 bg-black/90 border-y border-white/10" />

              {/* Signature & Security Panel */}
              <div className="relative z-10 mt-10 flex items-center justify-between gap-4">
                <div className="flex-1 bg-white/15 h-8 rounded px-3 flex items-center border border-white/20">
                  <span className="font-mono text-xs text-white/70 italic tracking-wider" dir="ltr">
                    Hussein Najah // @i1Zeus
                  </span>
                </div>
                <div className="bg-white/20 h-8 px-2.5 rounded flex items-center justify-center font-mono text-xs text-white/90 border border-white/20">
                  <span>CVC 777</span>
                </div>
              </div>

              {/* Live QR Code & Scan Instructions */}
              <div className="relative z-10 flex items-center justify-between gap-4 bg-white/5 p-2.5 rounded-xl border border-white/10 text-start">
                <div className="flex flex-col text-start">
                  <div className="flex items-center gap-1 text-purple text-xs font-semibold">
                    <RiQrCodeLine className="text-sm shrink-0" />
                    <span>{dict.socialProfile.instantConnect}</span>
                  </div>
                  <p className="text-[11px] text-white/70 mt-0.5 leading-tight">
                    {dict.socialProfile.instantConnectDesc}
                  </p>
                </div>

                {/* QR Image */}
                {qrDataUrl ? (
                  <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-lg overflow-hidden bg-white p-1 shadow-md shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={qrDataUrl}
                      alt="Hussein Najah QR Code"
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-lg bg-white/10 animate-pulse shrink-0" />
                )}
              </div>

              {/* Bottom Status */}
              <div className="flex items-center justify-between text-[10px] font-mono text-white/40 relative z-10">
                <span className="truncate">{dict.socialProfile.signatureRequired}</span>
                <span className="text-purple/80 font-medium shrink-0">{dict.socialProfile.tapToFlip}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Flip Helper Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handleFlip();
        }}
        className="mt-3 flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono text-white/70 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple/30 transition-all cursor-pointer shadow-sm"
      >
        <FaRotate
          className={`text-purple text-xs transition-transform duration-500 ${
            isFlipped ? "rotate-180" : ""
          }`}
        />
        <span>{isFlipped ? dict.socialProfile.flipToFront : dict.socialProfile.flipToBack}</span>
      </button>
    </div>
  );
}
