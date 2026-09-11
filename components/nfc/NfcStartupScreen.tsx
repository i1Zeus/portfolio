"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdNfc } from "react-icons/md";
import { HiLightningBolt } from "react-icons/hi";
import { soundManager } from "@/utils/soundEffects";
import { triggerHapticFeedback } from "@/utils/vcard";
import { useLocale } from "../LocaleContext";

interface NfcStartupScreenProps {
  onComplete: () => void;
}

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
    }, 350);
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
          transition={{ duration: 0.3 }}
          onClick={handleFinish}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black-100 text-white select-none px-6 cursor-pointer"
        >
          {/* Subtle Cyber Grid Background */}
          <div className="absolute inset-0 bg-dot-white/[0.12] pointer-events-none" />
          <div className="absolute inset-0 bg-radial-vignette pointer-events-none [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

          {/* Top Skip Button with logical positioning */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleFinish();
            }}
            className="absolute top-8 end-6 z-20 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider text-purple/80 bg-purple/10 border border-purple/20 hover:bg-purple/20 transition-all cursor-pointer backdrop-blur-md"
          >
            {dict.socialProfile.skip}
          </button>

          {/* Central NFC Handshake Radar Animation */}
          <div className="relative flex items-center justify-center mb-10">
            {/* Concentric Radar Rings */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ scale: 0.8, opacity: 0.8 }}
                animate={{
                  scale: [0.8, 2.2, 3],
                  opacity: [0.8, 0.4, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeOut",
                }}
                className="absolute w-24 h-24 rounded-full border border-purple/40 pointer-events-none"
              />
            ))}

            {/* Glowing Center Badge */}
            <motion.div
              initial={{ scale: 0.5, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="relative z-10 w-24 h-24 rounded-2xl bg-gradient-to-br from-[#1b1c3a] via-[#0d0f2b] to-[#12072b] p-[1.5px] shadow-[0_0_50px_rgba(203,172,249,0.35)]"
            >
              <div className="w-full h-full bg-black-100 rounded-2xl flex flex-col items-center justify-center border border-purple/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-purple/20 to-transparent opacity-60" />
                <motion.div
                  animate={{
                    y: [-2, 2, -2],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <MdNfc className="text-4xl text-purple drop-shadow-[0_0_12px_rgba(203,172,249,0.8)]" />
                </motion.div>
                <div className="flex items-center gap-1 mt-1 text-[10px] font-mono tracking-widest text-white/70">
                  <HiLightningBolt className="text-yellow-400 text-xs animate-pulse" />
                  <span>NFC 13.56MHz</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Terminal / Handshake Readout */}
          <div className="text-center max-w-sm w-full space-y-3 relative z-10">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="space-y-1"
            >
              <p className="text-[11px] font-mono tracking-[0.25em] text-purple uppercase">
                {step === 3 ? dict.socialProfile.ready : dict.socialProfile.handshakeActive}
              </p>
              <h2 className="text-base sm:text-lg font-mono font-semibold tracking-wide text-white drop-shadow">
                {statusTexts[step]}
              </h2>
            </motion.div>

            {/* Futuristic Progress Bar */}
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden p-[1px] backdrop-blur-sm border border-white/10">
              <motion.div
                initial={{ width: "15%" }}
                animate={{
                  width:
                    step === 0
                      ? "30%"
                      : step === 1
                      ? "65%"
                      : step === 2
                      ? "90%"
                      : "100%",
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-blue-500 via-purple to-pink-500 rounded-full shadow-[0_0_10px_rgba(203,172,249,0.8)]"
              />
            </div>

            {/* Protocol Badge */}
            <p className="text-[10px] font-mono text-white/40 tracking-wider">
              {dict.socialProfile.tapToConnectProtocol}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
