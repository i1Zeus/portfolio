"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import confetti from "canvas-confetti";
import { downloadVCard, triggerHapticFeedback } from "@/utils/vcard";
import { soundManager } from "@/utils/soundEffects";
import { useLocale } from "../LocaleContext";

interface QuickActionsProps {
  onOpenQr: () => void;
}

export default function QuickActions({ onOpenQr }: QuickActionsProps) {
  const [toast, setToast] = useState<string | null>(null);
  const { locale, dict } = useLocale();

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast(null);
    }, 2800);
  };

  const handleSaveContact = () => {
    soundManager.playSuccess();
    triggerHapticFeedback([40, 50, 40]);

    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 },
        shapes: ["square"],
        colors: ["#f2f2ee", "#9a9a96", "#5a5a58"],
      });
    } catch {
      // Ignore confetti errors
    }

    downloadVCard({
      firstName: locale === "ar" ? "حسين" : "Hussein",
      lastName: locale === "ar" ? "نجاح" : "Najah",
      title: dict.socialProfile.cardRole,
      organization: "Software Engineer",
      email: "husseinnajah.it@gmail.com",
      website: `https://www.hussein-najah.com/${locale}`,
      linkedin: "https://www.linkedin.com/in/i1zeus",
      github: "https://github.com/i1Zeus",
      x: "https://x.com/i1Zeus",
      instagram: "https://www.instagram.com/hxg.1",
      facebook: "https://www.facebook.com/iZeus01",
      note:
        locale === "ar"
          ? "حسين نجاح - مهندس برمجيات • فل ستاك | تواصل عبر بطاقة NFC الذكية (@i1Zeus)"
          : "Hussein Najah - Software Engineer • Full Stack | Connected via NFC Smart Card (@i1Zeus)",
    });
    showToast(dict.socialProfile.contactSaved);
  };

  const handleShare = async () => {
    soundManager.playTap();
    triggerHapticFeedback(20);

    const shareData = {
      title: `${dict.socialProfile.cardHolderName} (@i1Zeus) - ${dict.socialProfile.instantConnect}`,
      text: dict.socialProfile.instantConnectDesc,
      url:
        typeof window !== "undefined"
          ? window.location.href
          : `https://www.hussein-najah.com/${locale}/qr`,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // User cancelled or share failed, fallback to copy
      }
    }

    // Fallback: Copy link
    navigator.clipboard.writeText(shareData.url);
    showToast(dict.socialProfile.copied);
  };

  return (
    <div className="w-full">
      <AnimatePresence>
        {toast && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed left-1/2 top-16 z-[70] flex max-w-[90vw] -translate-x-1/2 items-center gap-2 border border-line-strong bg-ink px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.08em] text-paper"
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-paper" />
            <span>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-2 gap-2">
        <button type="button" onClick={handleSaveContact} className="btn-solid col-span-2 py-4">
          {dict.socialProfile.saveContact} ↓
        </button>
        <button type="button" onClick={handleShare} className="btn-ghost px-3">
          {dict.socialProfile.shareCard}
        </button>
        <button
          type="button"
          onClick={() => {
            soundManager.playTap();
            triggerHapticFeedback(20);
            onOpenQr();
          }}
          className="btn-ghost px-3"
        >
          {dict.socialProfile.showQr}
        </button>
      </div>
    </div>
  );
}
