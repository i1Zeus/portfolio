"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaCheck, FaCopy, FaArrowUpRightFromSquare } from "react-icons/fa6";
import { soundManager } from "@/utils/soundEffects";
import { triggerHapticFeedback } from "@/utils/vcard";
import { useLocale } from "../LocaleContext";

export interface SocialItem {
  id: string;
  name: string;
  handle: string;
  url: string;
  copyValue: string;
  icon: React.ReactNode;
  gradient: string;
  accentColor: string;
  badge?: string;
  description?: string;
}

interface SocialLinkCardProps {
  item: SocialItem;
  index: number;
}

export default function SocialLinkCard({ item, index }: SocialLinkCardProps) {
  const [copied, setCopied] = useState(false);
  const { dict } = useLocale();

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    navigator.clipboard.writeText(item.copyValue);
    setCopied(true);
    soundManager.playTap();
    triggerHapticFeedback([15, 20]);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleCardClick = () => {
    soundManager.playTap();
    triggerHapticFeedback(20);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
      className="w-full"
    >
      <a
        href={item.url}
        target={item.url.startsWith("mailto:") ? "_self" : "_blank"}
        rel="noopener noreferrer"
        onClick={handleCardClick}
        className="group relative flex items-center justify-between w-full p-4 rounded-2xl bg-[#0c0f2b]/70 hover:bg-[#12163b]/90 border border-white/10 hover:border-purple/40 backdrop-blur-xl transition-all duration-300 shadow-lg hover:shadow-[0_8px_30px_rgba(203,172,249,0.15)] overflow-hidden"
      >
        {/* Ambient Hover Glow positioned with logical end */}
        <div
          className={`absolute ltr:-right-10 rtl:-left-10 -bottom-10 w-36 h-36 rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none ${item.gradient}`}
        />

        {/* Start: Icon & Information */}
        <div className="flex items-center gap-3.5 min-w-0 z-10 rtl:text-end ltr:text-start">
          {/* Icon Container */}
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-xl text-white shadow-md border border-white/15 ${item.gradient}`}
          >
            {item.icon}
          </div>

          <div className="flex flex-col min-w-0 rtl:text-end ltr:text-start">
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-semibold text-white group-hover:text-purple transition-colors truncate">
                {item.name}
              </h3>
              {item.badge && (
                <span className="text-[10px] px-2 py-0.5 rounded-full font-mono bg-purple/15 text-purple border border-purple/30 shrink-0">
                  {item.badge}
                </span>
              )}
            </div>
            <p
              className="text-xs text-white/60 font-mono truncate rtl:text-end ltr:text-start"
              dir="ltr"
            >
              {item.handle}
            </p>
            {item.description && (
              <p className="text-[11px] text-white/50 truncate hidden sm:block mt-0.5 !rtl:text-end !ltr:text-start">
                {item.description}
              </p>
            )}
          </div>
        </div>

        {/* End: Copy & External Link Actions */}
        <div className="flex items-center gap-1.5 shrink-0 z-10 ps-2">
          {/* Copy Button */}
          <button
            type="button"
            onClick={handleCopy}
            title={
              copied
                ? dict.socialProfile.copied
                : `${dict.socialProfile.copyLink}: ${item.handle}`
            }
            aria-label={
              copied
                ? dict.socialProfile.copied
                : `${dict.socialProfile.copyLink}: ${item.handle}`
            }
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/15 text-white/70 hover:text-white border border-white/10 transition-colors flex items-center justify-center cursor-pointer active:scale-95"
          >
            {copied ? (
              <FaCheck className="text-xs text-emerald-400" />
            ) : (
              <FaCopy className="text-xs" />
            )}
          </button>

          {/* External Arrow with directional hover animation */}
          <div className="p-2.5 rounded-xl bg-white/5 group-hover:bg-purple/20 text-white/50 group-hover:text-purple transition-all flex items-center justify-center">
            <FaArrowUpRightFromSquare className="text-xs transition-transform rtl:-scale-x-100 ltr:group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </a>
    </motion.div>
  );
}
