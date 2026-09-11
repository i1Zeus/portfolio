"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { FaCopy, FaCheck, FaDownload } from "react-icons/fa6";
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
  const [pageUrl, setPageUrl] = useState("https://husseinnajah.com/qr");
  const { dict } = useLocale();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const current = window.location.href;
      setPageUrl(current);
      QRCode.toDataURL(current, {
        width: 400,
        margin: 2,
        color: {
          dark: "#000319",
          light: "#ffffff",
        },
      })
        .then((url) => setQrUrl(url))
        .catch(console.error);
    }
  }, []);

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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm rounded-3xl bg-gradient-to-b from-[#10133a] via-[#070924] to-[#040515] border border-purple/30 p-6 shadow-2xl flex flex-col items-center text-center"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 end-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors cursor-pointer"
              title={dict.socialProfile.close}
            >
              <IoClose className="text-xl" />
            </button>

            {/* Header */}
            <h3 className="text-xl font-bold text-white mb-1">
              {dict.socialProfile.qrScanConnect}
            </h3>
            <p className="text-xs text-white/60 mb-5 leading-relaxed">
              {dict.socialProfile.qrInstruction}
            </p>

            {/* QR Frame */}
            <div className="p-3 bg-white rounded-2xl shadow-xl border border-white/20 mb-5">
              {qrUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={qrUrl}
                  alt={dict.socialProfile.showQr}
                  className="w-56 h-56 object-contain rounded-lg"
                />
              ) : (
                <div className="w-56 h-56 bg-slate-100 flex items-center justify-center text-black text-xs font-mono">
                  {dict.socialProfile.generatingQr}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 w-full">
              <button
                type="button"
                onClick={handleCopyLink}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-purple/15 hover:bg-purple/25 text-purple border border-purple/30 font-medium text-xs transition-colors cursor-pointer active:scale-95"
              >
                {copied ? (
                  <>
                    <FaCheck className="text-xs text-emerald-400" />
                    <span>{dict.socialProfile.copied}</span>
                  </>
                ) : (
                  <>
                    <FaCopy className="text-xs" />
                    <span>{dict.socialProfile.copyLink}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleDownloadQr}
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 font-medium text-xs border border-white/15 transition-colors cursor-pointer active:scale-95"
              >
                <FaDownload className="text-xs" />
                <span>{dict.socialProfile.savePng}</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
