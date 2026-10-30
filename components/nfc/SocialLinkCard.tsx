"use client";

import React, { useState } from "react";
import { soundManager } from "@/utils/soundEffects";
import { triggerHapticFeedback } from "@/utils/vcard";
import { useLocale } from "../LocaleContext";
import { Arrow } from "../home/primitives";

export interface SocialItem {
  id: string;
  name: string;
  handle: string;
  url: string;
  copyValue: string;
  icon: React.ReactNode;
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

  const copyLabel = copied ? dict.socialProfile.copied : `${dict.socialProfile.copyLink}: ${item.handle}`;

  return (
    <li className="reveal border-b border-line" style={{ transitionDelay: `${index * 60}ms` }}>
      <div className="group relative flex items-center gap-3 py-4 transition-colors hover:bg-paper/[0.03] sm:gap-4">
        <span className="label w-6 shrink-0 text-paper/55" dir="ltr">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-line text-base text-paper/80 transition-colors group-hover:border-paper group-hover:bg-paper group-hover:text-ink">
          {item.icon}
        </span>

        <div className="min-w-0 flex-1 text-start">
          <div className="flex items-center gap-2">
            <a
              href={item.url}
              target={item.url.startsWith("mailto:") ? "_self" : "_blank"}
              rel="noopener noreferrer"
              onClick={handleCardClick}
              className="heading truncate text-xl text-paper after:absolute after:inset-0 sm:text-2xl"
            >
              {item.name}
            </a>
            {item.badge && <span className="chip hidden shrink-0 sm:inline-flex">{item.badge}</span>}
          </div>
          <p className="truncate font-mono text-[12px] text-paper/55 rtl:text-end" dir="ltr">
            {item.handle}
          </p>
          {item.description && (
            <p className="mt-0.5 hidden truncate text-[12px] text-paper/55 sm:block">{item.description}</p>
          )}
        </div>

        <button
          type="button"
          onClick={handleCopy}
          title={copyLabel}
          aria-label={copyLabel}
          className="relative z-10 shrink-0 border border-line px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-paper/60 transition-colors hover:border-paper hover:text-paper"
        >
          {copied ? "✓" : dict.socialProfile.copyLink}
        </button>
        <Arrow className="h-4 w-4 shrink-0 text-paper/50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-paper rtl:group-hover:-translate-x-0.5" />
      </div>
    </li>
  );
}
