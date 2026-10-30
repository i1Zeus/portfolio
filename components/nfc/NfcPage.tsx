"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaLinkedin,
  FaXTwitter,
  FaInstagram,
  FaFacebook,
  FaGithub,
  FaFilePdf,
} from "react-icons/fa6";

import NfcStartupScreen from "@/components/nfc/NfcStartupScreen";
import HolographicCard from "@/components/nfc/HolographicCard";
import QuickActions from "@/components/nfc/QuickActions";
import SocialLinkCard, { SocialItem } from "@/components/nfc/SocialLinkCard";
import QrModal from "@/components/nfc/QrModal";
import SiteEffects from "@/components/home/SiteEffects";
import { SectionKicker, SplitText } from "@/components/home/primitives";
import { useLocale } from "@/components/LocaleContext";
import { soundManager } from "@/utils/soundEffects";
import { cn } from "@/utils/cn";

const baghdadTime = () =>
  new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Baghdad",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
    .format(new Date())
    .split(":");

export default function NfcPage() {
  const [showStartup, setShowStartup] = useState(true);
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [time, setTime] = useState<string[] | null>(null);

  const { locale, dict, switchLocale } = useLocale();
  const p = dict.socialProfile;

  const handleStartupComplete = React.useCallback(() => {
    setShowStartup(false);
  }, []);

  const closeQr = React.useCallback(() => setIsQrOpen(false), []);

  // Live Baghdad Clock
  useEffect(() => {
    setTime(baghdadTime());
    const id = window.setInterval(() => setTime(baghdadTime()), 10_000);
    return () => clearInterval(id);
  }, []);

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
      name: p.links.linkedin.name,
      handle: "in/i1zeus",
      url: "https://www.linkedin.com/in/i1zeus",
      copyValue: "https://www.linkedin.com/in/i1zeus",
      icon: <FaLinkedin />,
      badge: p.links.linkedin.badge,
      description: p.links.linkedin.description,
    },
    {
      id: "github",
      name: p.links.github.name,
      handle: "github.com/i1Zeus",
      url: "https://github.com/i1Zeus",
      copyValue: "https://github.com/i1Zeus",
      icon: <FaGithub />,
      badge: p.links.github.badge,
      description: p.links.github.description,
    },
    {
      id: "x",
      name: p.links.x.name,
      handle: "@i1Zeus",
      url: "https://x.com/i1Zeus",
      copyValue: "https://x.com/i1Zeus",
      icon: <FaXTwitter />,
      badge: p.links.x.badge,
      description: p.links.x.description,
    },
    {
      id: "instagram",
      name: p.links.instagram.name,
      handle: "@hxg.1",
      url: "https://www.instagram.com/hxg.1",
      copyValue: "https://www.instagram.com/hxg.1",
      icon: <FaInstagram />,
      badge: p.links.instagram.badge,
      description: p.links.instagram.description,
    },
    {
      id: "facebook",
      name: p.links.facebook.name,
      handle: "fb.com/iZeus01",
      url: "https://www.facebook.com/iZeus01",
      copyValue: "https://www.facebook.com/iZeus01",
      icon: <FaFacebook />,
      badge: p.links.facebook.badge,
      description: p.links.facebook.description,
    },
    {
      id: "cv",
      name: p.links.cv.name,
      handle: locale === "ar" ? "تحميل السيرة الذاتية PDF" : "Download PDF Resume",
      url: "/hussein-najah-cv.pdf",
      copyValue: "https://www.hussein-najah.com/hussein-najah-cv.pdf",
      icon: <FaFilePdf />,
      badge: p.links.cv.badge,
      description: p.links.cv.description,
    },
  ];

  const navBtn =
    "font-mono text-[11px] uppercase tracking-[0.12em] text-paper/60 transition-colors hover:text-paper";

  return (
    <div className="relative min-h-screen bg-ink text-paper">
      {showStartup ? <NfcStartupScreen onComplete={handleStartupComplete} /> : <SiteEffects />}

      <header className="fixed inset-x-2 top-2 z-50 border-b border-line bg-ink/80 backdrop-blur-md">
        <div className="flex items-center justify-between gap-4 px-3 py-3 sm:px-4 md:px-8">
          <div className="flex items-center gap-5">
            <Link
              href={`/${locale}`}
              aria-label="Hussein Najah — home"
              className="border border-paper/70 px-1.5 pb-0.5 pt-1 font-display text-[20px] font-semibold uppercase leading-none tracking-tight text-paper transition-colors hover:bg-paper hover:text-ink"
              dir="ltr"
            >
              HN
            </Link>
            <Link href={`/${locale}`} className={cn(navBtn, "flex items-center gap-1.5")}>
              <span className="rtl:-scale-x-100">←</span>
              {p.portfolioBack}
            </Link>
          </div>

          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => switchLocale(locale === "ar" ? "en" : "ar")}
              aria-label={locale === "ar" ? "Switch to English" : "التبديل إلى العربية"}
              className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em]"
              dir="ltr"
            >
              <span className={locale === "en" ? "text-paper" : "text-paper/55 hover:text-paper"}>EN</span>
              <span className="text-paper/30" aria-hidden="true">/</span>
              <span
                className={cn(
                  "font-cairo text-[14px] leading-none",
                  locale === "ar" ? "text-paper" : "text-paper/55 hover:text-paper"
                )}
              >
                ع
              </span>
            </button>
            <button
              type="button"
              onClick={toggleSound}
              aria-pressed={!isMuted}
              aria-label={
                isMuted
                  ? locale === "ar"
                    ? "تشغيل المؤثرات الصوتية"
                    : "Unmute sound effects"
                  : locale === "ar"
                    ? "كتم المؤثرات الصوتية"
                    : "Mute sound effects"
              }
              className={navBtn}
              dir="ltr"
            >
              SFX <span className={isMuted ? "text-paper/55" : "text-paper"}>{isMuted ? "OFF" : "ON"}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 pb-10 pt-24 sm:px-6 md:px-10 md:pt-28">
        {/* Info strip */}
        <div className="reveal grid grid-cols-2 gap-4 border-y border-line py-4">
          <div>
            <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-paper">{p.cardHolderName}</p>
            <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-paper/55">{p.location}</p>
          </div>
          <div className="text-end">
            <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-paper/55">{dict.home.localTime}</p>
            <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-paper">
              <span dir="ltr">
                {time ? (
                  <>
                    {time[0]}
                    <span className="animate-blink">:</span>
                    {time[1]}
                  </>
                ) : (
                  "--:--"
                )}{" "}
                <span className="text-paper/55">GMT+3</span>
              </span>
            </p>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-14 lg:mt-14 lg:grid-cols-12 lg:gap-12">
          {/* Card column */}
          <section className="lg:col-span-5">
            <SectionKicker index={1} total={2}>
              {p.nfcWallet}
            </SectionKicker>
            <SplitText as="h1" text={p.cardHolderName} className="display mt-5 block text-[clamp(3.4rem,15vw,6.5rem)]" />
            <p className="reveal label mt-3 flex items-center gap-2 text-paper/70">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-paper opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-paper" />
              </span>
              {p.cardRole}
            </p>

            <div className="reveal mt-10 mx-auto max-w-[440px]">
              <HolographicCard />
            </div>

            <div className="reveal mt-8 mx-auto max-w-[440px]">
              <QuickActions onOpenQr={() => setIsQrOpen(true)} />
            </div>
          </section>

          {/* Links column */}
          <section className="lg:col-span-6 lg:col-start-7">
            <SectionKicker index={2} total={2}>
              {p.connectSocialsHeading}
            </SectionKicker>
            <ul className="mt-6 border-t border-line">
              {socialLinks.map((item, idx) => (
                <SocialLinkCard key={item.id} item={item} index={idx} />
              ))}
            </ul>

            <div className="reveal crosshair mt-10 border border-line p-5">
              <p className="text-sm leading-relaxed text-paper/70">{p.scanHintBottom}</p>
              <button
                type="button"
                onClick={() => setIsQrOpen(true)}
                className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-paper/70 underline decoration-line-strong underline-offset-4 transition-colors hover:text-paper hover:decoration-paper"
              >
                {p.showQr} <span className="inline-block rtl:-scale-x-100">→</span>
              </button>
            </div>
          </section>
        </div>

        <footer className="mt-16 flex flex-col gap-2 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="label">
            <span dir="ltr">©2026</span> {p.cardHolderName} — {dict.home.rights}
          </p>
          <p className="label text-paper/55" dir="ltr">
            NFC · ISO/IEC 14443-A
          </p>
        </footer>
      </main>

      <QrModal isOpen={isQrOpen} onClose={closeQr} />
    </div>
  );
}
