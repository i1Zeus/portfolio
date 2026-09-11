"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUserPlus, FaShareNodes, FaQrcode } from "react-icons/fa6";
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

    // Burst confetti!
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#CBACF9", "#38bdf8", "#818cf8", "#f472b6"],
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
      website: `https://husseinnajah.com/${locale}`,
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
          : `https://husseinnajah.com/${locale}/qr`,
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
    <div className="w-full max-w-[420px] my-4">
      {/* Toast notification */}
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10 }}
          className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#12163b]/95 border border-purple/40 text-white text-xs px-4 py-2.5 rounded-full shadow-2xl backdrop-blur-md flex items-center gap-2 max-w-[90vw]"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>{toast}</span>
        </motion.div>
      )}

      {/* Action Buttons Grid */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
        {/* Save Contact - Highlighted Hero Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleSaveContact}
          className="col-span-2 relative group overflow-hidden rounded-2xl p-[1.5px] shadow-lg shadow-purple/10 cursor-pointer"
        >
          {/* Moving gradient border */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple via-blue-400 to-pink-500 rounded-2xl animate-pulse" />

          <div className="relative flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-2xl bg-[#0b0c26] group-hover:bg-[#0f1133] transition-colors text-white font-medium text-sm">
            <FaUserPlus className="text-purple text-base group-hover:scale-110 transition-transform" />
            <span className="font-semibold tracking-wide">
              {dict.socialProfile.saveContact}
            </span>
          </div>
        </motion.button>

        {/* Share Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleShare}
          className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple/30 text-white/90 text-xs font-medium transition-all backdrop-blur-md cursor-pointer"
        >
          <FaShareNodes className="text-purple text-sm" />
          <span>{dict.socialProfile.shareCard}</span>
        </motion.button>

        {/* Show QR Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => {
            soundManager.playTap();
            triggerHapticFeedback(20);
            onOpenQr();
          }}
          className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple/30 text-white/90 text-xs font-medium transition-all backdrop-blur-md cursor-pointer"
        >
          <FaQrcode className="text-purple text-sm" />
          <span>{dict.socialProfile.showQr}</span>
        </motion.button>
      </div>
    </div>
  );
}
