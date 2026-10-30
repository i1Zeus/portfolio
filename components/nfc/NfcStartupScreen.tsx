"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { soundManager } from "@/utils/soundEffects";
import { triggerHapticFeedback } from "@/utils/vcard";
import { useLocale } from "../LocaleContext";

interface NfcStartupScreenProps {
  onComplete: () => void;
}

const PROGRESS = [0.3, 0.65, 0.9, 1];

export default function NfcStartupScreen({ onComplete }: NfcStartupScreenProps) {
  const [step, setStep] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const { dict } = useLocale();
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const handleFinish = useRef(() => {
    setIsExiting(true);
    setTimeout(() => {
      onCompleteRef.current();
    }, 700);
  }).current;

  useEffect(() => {
    // Initial sound & haptic
    soundManager.playNfcConnect();
    triggerHapticFeedback([30, 40, 30]);

    const timer1 = setTimeout(() => {
      setStep(1);
      triggerHapticFeedback(25);
    }, 300);

    const timer2 = setTimeout(() => {
      setStep(2);
      triggerHapticFeedback(30);
    }, 650);

    const timer3 = setTimeout(() => {
      setStep(3);
      soundManager.playSuccess();
      triggerHapticFeedback([40, 60, 50]);
    }, 950);

    const timerComplete = setTimeout(() => {
      handleFinish();
    }, 1250);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timerComplete);
    };
  }, [handleFinish]);

  const statusTexts = dict.socialProfile.statusTexts;

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          onClick={handleFinish}
          className="fixed inset-0 z-[100] flex cursor-pointer select-none flex-col justify-between bg-ink px-4 py-5 text-paper md:px-10 md:py-8"
        >
          <div className="label flex items-center justify-between text-paper/60">
            <span>{step === 3 ? dict.socialProfile.ready : dict.socialProfile.handshakeActive}</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleFinish();
              }}
              className="font-mono text-[11px] uppercase tracking-[0.12em] text-paper/70 transition-colors hover:text-paper"
            >
              {dict.socialProfile.skip}
            </button>
          </div>

          {/* Contactless rings */}
          <div className="relative mx-auto flex h-40 w-40 items-center justify-center" aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="absolute h-24 w-24 animate-[nfcring_2s_ease-out_infinite] rounded-full border border-paper/40 opacity-0"
                style={{ animationDelay: `${i * 0.5}s` }}
              />
            ))}
            <span className="relative flex h-20 w-20 items-center justify-center border border-paper/70 bg-ink font-display text-3xl font-semibold uppercase leading-none" dir="ltr">
              HN
            </span>
          </div>

          <div dir="ltr">
            <div className="flex items-end justify-between gap-4">
              <motion.p
                key={step}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="max-w-[70%] font-mono text-[12px] uppercase tracking-[0.12em] text-paper/80 rtl:tracking-normal"
                dir="auto"
              >
                {statusTexts[step]}
              </motion.p>
              <span className="font-display text-[clamp(4rem,16vw,9rem)] font-light leading-[0.8] tabular-nums">
                {String(Math.round(PROGRESS[step] * 100)).padStart(3, "0")}
              </span>
            </div>
            <div className="mt-4 h-px bg-line">
              <i
                className="block h-px origin-left bg-paper transition-transform duration-300 ease-out"
                style={{ transform: `scaleX(${PROGRESS[step]})` }}
              />
            </div>
            <p className="label mt-3 pe-14 text-paper/55">NFC 13.56MHz · {dict.socialProfile.tapToConnectProtocol}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
