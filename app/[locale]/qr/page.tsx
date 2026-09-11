"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaLinkedin,
  FaXTwitter,
  FaInstagram,
  FaFacebook,
  FaGithub,
  FaEnvelope,
  FaFilePdf,
  FaGlobe,
  FaVolumeHigh,
  FaVolumeXmark,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa6";
import { MdNfc } from "react-icons/md";

import NfcStartupScreen from "@/components/nfc/NfcStartupScreen";
import HolographicCard from "@/components/nfc/HolographicCard";
import QuickActions from "@/components/nfc/QuickActions";
import SocialLinkCard, { SocialItem } from "@/components/nfc/SocialLinkCard";
import QrModal from "@/components/nfc/QrModal";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLocale } from "@/components/LocaleContext";
import { soundManager } from "@/utils/soundEffects";

export default function LocalizedQrPage() {
  const [showStartup, setShowStartup] = useState(true);
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [baghdadTime, setBaghdadTime] = useState("");

  const { locale, dict, dir } = useLocale();
  const isRtl = dir === "rtl";

  const handleStartupComplete = React.useCallback(() => {
    setShowStartup(false);
  }, []);

  // Live Baghdad Clock
  useEffect(() => {
    const updateTime = () => {
      try {
        const timeStr = new Intl.DateTimeFormat(
          locale === "ar" ? "ar-US" : "en-US",
          {
            timeZone: "Asia/Baghdad",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
          },
        ).format(new Date());
        setBaghdadTime(timeStr);
      } catch {
        setBaghdadTime(new Date().toLocaleTimeString());
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [locale]);

  const toggleSound = () => {
    soundManager.isMuted = !soundManager.isMuted;
    setIsMuted(soundManager.isMuted);
    if (!soundManager.isMuted) {
      soundManager.playTap();
    }
  };

  const socialLinks: SocialItem[] = [
    {
      id: "linkedin",
      name: dict.socialProfile.links.linkedin.name,
      handle: "in/i1zeus",
      url: "https://www.linkedin.com/in/i1zeus",
      copyValue: "https://www.linkedin.com/in/i1zeus",
      icon: <FaLinkedin />,
      gradient: "bg-gradient-to-br from-blue-600 to-cyan-700",
      accentColor: "#0284c7",
      badge: dict.socialProfile.links.linkedin.badge,
      description: dict.socialProfile.links.linkedin.description,
    },
    {
      id: "github",
      name: dict.socialProfile.links.github.name,
      handle: "github.com/i1Zeus",
      url: "https://github.com/i1Zeus",
      copyValue: "https://github.com/i1Zeus",
      icon: <FaGithub />,
      gradient: "bg-gradient-to-br from-slate-700 to-purple-900",
      accentColor: "#9333ea",
      badge: dict.socialProfile.links.github.badge,
      description: dict.socialProfile.links.github.description,
    },
    {
      id: "x",
      name: dict.socialProfile.links.x.name,
      handle: "@i1Zeus",
      url: "https://x.com/i1Zeus",
      copyValue: "https://x.com/i1Zeus",
      icon: <FaXTwitter />,
      gradient:
        "bg-gradient-to-br from-gray-900 to-black border border-white/20",
      accentColor: "#e2e8f0",
      badge: dict.socialProfile.links.x.badge,
      description: dict.socialProfile.links.x.description,
    },
    {
      id: "instagram",
      name: dict.socialProfile.links.instagram.name,
      handle: "@hxg.1",
      url: "https://www.instagram.com/hxg.1",
      copyValue: "https://www.instagram.com/hxg.1",
      icon: <FaInstagram />,
      gradient: "bg-gradient-to-br from-amber-600 via-pink-600 to-purple-700",
      accentColor: "#db2777",
      badge: dict.socialProfile.links.instagram.badge,
      description: dict.socialProfile.links.instagram.description,
    },
    {
      id: "facebook",
      name: dict.socialProfile.links.facebook.name,
      handle: "fb.com/iZeus01",
      url: "https://www.facebook.com/iZeus01",
      copyValue: "https://www.facebook.com/iZeus01",
      icon: <FaFacebook />,
      gradient: "bg-gradient-to-br from-blue-700 to-indigo-800",
      accentColor: "#2563eb",
      badge: dict.socialProfile.links.facebook.badge,
      description: dict.socialProfile.links.facebook.description,
    },
    // {
    //   id: "portfolio",
    //   name: dict.socialProfile.links.portfolio.name,
    //   handle: "husseinnajah.com",
    //   url: `/${locale}`,
    //   copyValue: `https://husseinnajah.com/${locale}`,
    //   icon: <FaGlobe />,
    //   gradient: "bg-gradient-to-br from-purple to-indigo-900",
    //   accentColor: "#CBACF9",
    //   badge: dict.socialProfile.links.portfolio.badge,
    //   description: dict.socialProfile.links.portfolio.description,
    // },
    {
      id: "cv",
      name: dict.socialProfile.links.cv.name,
      handle:
        locale === "ar" ? "تحميل السيرة الذاتية PDF" : "Download PDF Resume",
      url: "/hussein-najah-cv.pdf",
      copyValue: "https://husseinnajah.com/hussein-najah-cv.pdf",
      icon: <FaFilePdf />,
      gradient: "bg-gradient-to-br from-rose-700 to-red-900",
      accentColor: "#e11d48",
      badge: dict.socialProfile.links.cv.badge,
      description: dict.socialProfile.links.cv.description,
    },
    // {
    //   id: "email",
    //   name: dict.socialProfile.links.email.name,
    //   handle: "husseinnajah.it@gmail.com",
    //   url: "mailto:husseinnajah.it@gmail.com",
    //   copyValue: "husseinnajah.it@gmail.com",
    //   icon: <FaEnvelope />,
    //   gradient: "bg-gradient-to-br from-emerald-600 to-teal-800",
    //   accentColor: "#059669",
    //   badge: dict.socialProfile.links.email.badge,
    //   description: dict.socialProfile.links.email.description,
    // },
  ];

  return (
    <div className="min-h-screen bg-black-100 text-white flex flex-col items-center justify-start relative overflow-x-hidden selection:bg-purple selection:text-white">
      {/* NFC Startup Sequence */}
      {showStartup && <NfcStartupScreen onComplete={handleStartupComplete} />}

      {/* Cyber Grid Background */}
      <div className="fixed inset-0 pointer-events-none bg-dot-white/[0.12]" />
      <div className="fixed inset-0 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] bg-black-100/80" />

      {/* Ambient background glow orbs */}
      <div className="fixed -top-40 -left-40 w-96 h-96 rounded-full bg-purple/15 blur-[120px] pointer-events-none" />
      <div className="fixed -bottom-40 -right-40 w-96 h-96 rounded-full bg-blue-500/15 blur-[120px] pointer-events-none" />

      {/* Main Container */}
      <main className="w-full max-w-lg z-10 flex flex-col items-center px-4 sm:px-6 pt-6 pb-20">
        {/* Top Navbar */}
        <header className="w-full flex items-center justify-between py-2 mb-2 gap-2">
          {/* Back to Portfolio */}
          <Link
            href={`/${locale}`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono text-white/70 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors backdrop-blur-md"
          >
            {isRtl ? (
              <FaArrowRight className="text-[10px]" />
            ) : (
              <FaArrowLeft className="text-[10px]" />
            )}
            <span>{dict.socialProfile.portfolioBack}</span>
          </Link>

          {/* Center NFC Status Pill */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono bg-purple/10 border border-purple/20 text-purple/90 backdrop-blur-md">
            <MdNfc className="text-sm animate-pulse text-purple" />
            <span>{dict.socialProfile.nfcCardActive}</span>
          </div>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />

            {/* Sound Toggle */}
            <button
              type="button"
              onClick={toggleSound}
              aria-label={
                isMuted
                  ? locale === "ar"
                    ? "تشغيل المؤثرات الصوتية"
                    : "Unmute sound effects"
                  : locale === "ar"
                    ? "كتم المؤثرات الصوتية"
                    : "Mute sound effects"
              }
              className="p-2 rounded-full text-xs text-white/70 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors backdrop-blur-md"
            >
              {isMuted ? (
                <FaVolumeXmark className="text-xs text-red-400" />
              ) : (
                <FaVolumeHigh className="text-xs text-purple" />
              )}
            </button>
          </div>
        </header>

        {/* Live Status & Baghdad Local Time */}
        <div className="w-full flex items-center justify-center gap-2 text-xs font-mono text-white/50 mb-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
            <span className="text-white/80">{dict.socialProfile.location}</span>
          </div>
          {baghdadTime && (
            <>
              <span>•</span>
              <span className="text-purple/80">{baghdadTime}</span>
            </>
          )}
        </div>

        {/* 3D Holographic NFC Card */}
        <HolographicCard />

        {/* Quick Actions Bar */}
        <QuickActions onOpenQr={() => setIsQrOpen(true)} />

        {/* Section Divider */}
        <div className="w-full flex items-center justify-between gap-3 my-4">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/15" />
          <span className="text-[11px] font-mono tracking-[0.2em] text-purple uppercase font-semibold">
            {dict.socialProfile.connectSocialsHeading}
          </span>
          <div className="h-[1px] flex-1 bg-gradient-l from-transparent to-white/15" />
        </div>

        {/* Social Links Cards List */}
        <div className="w-full max-w-[420px] flex flex-col gap-2.5">
          {socialLinks.map((item, idx) => (
            <SocialLinkCard key={item.id} item={item} index={idx} />
          ))}
        </div>

        {/* QR Code Floating Action Card */}
        <div className="w-full max-w-[420px] mt-8 text-center">
          <div className="p-4 rounded-2xl bg-[#090b20]/60 border border-white/10 backdrop-blur-md flex flex-col items-center justify-center gap-2">
            <p className="text-xs text-white/50 font-mono">
              {dict.socialProfile.scanHintBottom}
            </p>
            <span className="text-[10px] text-purple/80 font-mono tracking-wider">
              {dict.footer.copyright}
            </span>
          </div>
        </div>
      </main>

      {/* QR Code Modal Overlay */}
      <QrModal isOpen={isQrOpen} onClose={() => setIsQrOpen(false)} />
    </div>
  );
}
