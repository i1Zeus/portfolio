"use client";

import React from "react";
import { useLocale } from "./LocaleContext";
import { FaGlobe } from "react-icons/fa6";

interface LanguageSwitcherProps {
  className?: string;
  variant?: "floating" | "inline";
}

export default function LanguageSwitcher({
  className = "",
  variant = "inline",
}: LanguageSwitcherProps) {
  const { locale, switchLocale } = useLocale();

  const isArabic = locale === "ar";

  const handleToggle = () => {
    switchLocale(isArabic ? "en" : "ar");
  };

  if (variant === "floating") {
    return (
      <button
        onClick={handleToggle}
        aria-label={isArabic ? "التبديل إلى الإنجليزية" : "Switch to Arabic"}
        className={`fixed top-5 end-5 z-[5001] flex items-center gap-2 px-3.5 py-1.5 rounded-full backdrop-blur-md bg-[#0e1327]/80 border border-white/10 text-xs font-medium text-white shadow-lg hover:border-purple/50 transition-all active:scale-95 ${className}`}
      >
        <FaGlobe className="text-purple size-3.5" />
        <span>{isArabic ? "English" : "العربية"}</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleToggle}
      type="button"
      aria-label={isArabic ? "التبديل إلى الإنجليزية" : "Switch to Arabic"}
      className={`group relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 backdrop-blur-md border border-white/10 hover:border-purple/50 bg-black-200/50 hover:bg-white/[0.05] text-neutral-200 select-none cursor-pointer ${className}`}
    >
      <FaGlobe className="text-purple size-3.5 transition-transform duration-300 group-hover:rotate-45" />
      <div className="flex items-center gap-1">
        <span
          className={`transition-colors ${
            !isArabic ? "text-purple font-semibold" : "text-neutral-400"
          }`}
        >
          EN
        </span>
        <span className="text-neutral-600 text-[10px]">/</span>
        <span
          className={`transition-colors font-arabic ${
            isArabic ? "text-purple font-semibold" : "text-neutral-400"
          }`}
        >
          عربي
        </span>
      </div>
    </button>
  );
}
