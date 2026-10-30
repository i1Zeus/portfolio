"use client";

import { useLocale } from "../LocaleContext";
import { Arrow, SplitText, sectionPad } from "./primitives";
import { cn } from "@/utils/cn";

export default function Words() {
  const { dict } = useLocale();
  const h = dict.home;
  const quotes = dict.clients.items;

  return (
    <section id="testimonials" className={cn("scroll-mt-16 border-t border-line py-16 md:py-24", sectionPad)}>
      <div className="mb-10 flex items-end justify-between">
        <SplitText
          as="h2"
          text={h.wordsTitle}
          className="heading block text-[clamp(2.4rem,5vw,4.5rem)] uppercase rtl:normal-case"
        />
        <p className="label hidden md:block">{h.wordsLabel}</p>
      </div>

      <ul className="grid grid-cols-1 border-s border-t border-line md:grid-cols-2 lg:grid-cols-3">
        {quotes.map((q, i) => (
          <li
            key={q.name}
            className="reveal group flex flex-col border-b border-e border-line p-6 transition-colors duration-500 hover:bg-paper hover:text-ink md:p-8"
            style={{ transitionDelay: `${(i % 3) * 80}ms` }}
          >
            <span
              className="font-display text-6xl font-light text-paper/55 transition-colors group-hover:text-ink/60"
              dir="ltr"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <blockquote className="mt-6 flex-1 text-[15px] leading-relaxed text-paper/75 transition-colors group-hover:text-ink/80">
              “{q.quote}”
            </blockquote>
            <footer className="mt-6 border-t border-line pt-4 transition-colors group-hover:border-ink/20">
              <p className="font-display text-[19px] uppercase text-paper transition-colors group-hover:text-ink">
                {q.name}
              </p>
              <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-paper/55 transition-colors group-hover:text-ink/60">
                {q.title}
              </p>
            </footer>
          </li>
        ))}
        {quotes.length % 2 !== 0 && quotes.length % 3 !== 0 && (
          <li className="reveal border-b border-e border-line max-md:hidden">
            <a
              href="#contact"
              className="group flex h-full min-h-[16rem] flex-col justify-between p-6 transition-colors duration-500 hover:bg-paper hover:text-ink md:p-8"
            >
              <span className="label transition-colors group-hover:text-ink/60">{h.ctaContact}</span>
              <span className="display flex items-end justify-between gap-4 text-[clamp(2.4rem,3.6vw,3.6rem)]">
                {h.wordsCta}
                <Arrow className="shrink-0 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
              </span>
            </a>
          </li>
        )}
      </ul>
    </section>
  );
}
