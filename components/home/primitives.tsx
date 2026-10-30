import React from "react";
import { cn } from "@/utils/cn";

const ARABIC = /[؀-ۿ]/;

/** Mono section label: `| [ 01 / 05 ] · About` */
export const SectionKicker = ({
  index,
  total,
  children,
  className = "",
}: {
  index: number;
  total: number;
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("label flex items-center gap-3", className)}>
    <span className="h-3 w-px bg-paper" aria-hidden="true" />
    <span aria-hidden="true" className="shrink-0 whitespace-nowrap" dir="ltr">
      [ <span className="text-paper">{String(index).padStart(2, "0")}</span> /{" "}
      {String(total).padStart(2, "0")} ]
    </span>
    <span aria-hidden="true">·</span>
    <span>{children}</span>
  </div>
);

/**
 * Text whose characters slide up when scrolled into view (driven by the
 * `.split` / `[data-in]` CSS in globals.css and the observer in SiteEffects).
 * Arabic is split per word so letter joining is preserved.
 */
export const SplitText = ({
  text,
  as: Tag = "span",
  className = "",
  delay = 0,
}: {
  text: string;
  as?: React.ElementType;
  className?: string;
  delay?: number;
}) => {
  const byWord = ARABIC.test(text);
  const words = text.split(" ");
  let i = 0;

  return (
    <Tag
      className={cn("split", className)}
      style={{ "--d": `${delay}ms` } as React.CSSProperties}
    >
      <span className="sr-only">{text}</span>
      {words.map((word, wi) => (
        <span key={wi} aria-hidden="true" className="split-word">
          {(byWord ? [word] : Array.from(word)).map((ch, ci) => (
            <span
              key={ci}
              className="split-char"
              style={{ "--i": i++ } as React.CSSProperties}
            >
              {ch}
            </span>
          ))}
          {wi < words.length - 1 && " "}
        </span>
      ))}
    </Tag>
  );
};

/** Key / value row used in the profile and status boxes. */
export const KeyValue = ({ k, v }: { k: string; v: React.ReactNode }) => (
  <div className="flex items-baseline justify-between gap-4 border-b border-line py-2 font-mono text-[11px] uppercase tracking-[0.08em]">
    <span className="text-paper/55">{k}</span>
    <span className="text-end text-paper/90">{v}</span>
  </div>
);

export const Arrow = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    className={cn("h-[1em] w-[1em] rtl:-scale-x-100", className)}
    aria-hidden="true"
  >
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

export const sectionPad = "px-4 sm:px-6 md:px-10";
