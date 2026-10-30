"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import QRCode from "qrcode";
import { soundManager } from "@/utils/soundEffects";
import { triggerHapticFeedback } from "@/utils/vcard";
import { useLocale } from "../LocaleContext";

interface QrModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QrModal({ isOpen, onClose }: QrModalProps) {
  const [qrUrl, setQrUrl] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [pageUrl, setPageUrl] = useState("https://www.hussein-najah.com/qr");
  const { dict } = useLocale();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const current = window.location.href;
      setPageUrl(current);
      QRCode.toDataURL(current, {
        width: 400,
        margin: 2,
        color: {
          dark: "#050505",
          light: "#f2f2ee",
        },
      })
        .then((url) => setQrUrl(url))
        .catch(console.error);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(pageUrl);
    setCopied(true);
    soundManager.playSuccess();
    triggerHapticFeedback([20, 20]);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadQr = () => {
    if (!qrUrl) return;
    const a = document.createElement("a");
    a.href = qrUrl;
    a.download = "Hussein_Najah_QR.png";
    a.click();
    soundManager.playTap();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/85 p-4 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={dict.socialProfile.qrScanConnect}
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="crosshair relative w-full max-w-sm border border-line-strong bg-ink p-5 sm:p-6"
          >
            <div className="label flex items-center justify-between">
              <span dir="ltr">[ QR ]</span>
              <button
                type="button"
                onClick={onClose}
                className="font-mono text-[11px] uppercase tracking-[0.12em] text-paper/70 transition-colors hover:text-paper"
              >
                {dict.socialProfile.close} ×
              </button>
            </div>

            <h3 className="display mt-5 text-5xl">{dict.socialProfile.qrScanConnect}</h3>
            <p className="mt-3 text-sm leading-relaxed text-paper/60">{dict.socialProfile.qrInstruction}</p>

            <div className="mt-6 border border-line bg-paper p-3">
              {qrUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={qrUrl} alt={dict.socialProfile.showQr} className="aspect-square w-full object-contain" />
              ) : (
                <div className="flex aspect-square w-full items-center justify-center font-mono text-xs text-ink/60">
                  {dict.socialProfile.generatingQr}
                </div>
              )}
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2">
              <button type="button" onClick={handleCopyLink} className="btn-solid px-3">
                {copied ? `${dict.socialProfile.copied} ✓` : dict.socialProfile.copyLink}
              </button>
              <button type="button" onClick={handleDownloadQr} className="btn-ghost px-3">
                {dict.socialProfile.savePng} ↓
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
