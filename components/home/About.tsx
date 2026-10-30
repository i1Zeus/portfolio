"use client";

import { useState } from "react";
import { useLocale } from "../LocaleContext";
import { KeyValue, SectionKicker, SplitText, sectionPad } from "./primitives";
import { cn } from "@/utils/cn";

const ART = ["art-rings", "art-lines", "art-dots"];

export default function About() {
  const { dict } = useLocale();
  const h = dict.home;
  const [open, setOpen] = useState(false);

  return (
    <section id="about" className="w-full scroll-mt-16">
      <div className={cn("pt-20 md:pt-28", sectionPad)}>
        <SectionKicker index={1} total={5}>
          {h.nav.about}
        </SectionKicker>
        <SplitText as="h2" text={h.aboutTitle} className="display mt-6 block text-[clamp(3rem,8vw,8rem)]" />
      </div>

      <div className={cn("grid grid-cols-1 gap-10 border-b border-line py-12 md:py-16 lg:grid-cols-12", sectionPad)}>
        <div className="lg:col-span-7">
          <p className="reveal heading text-[clamp(1.6rem,2.6vw,2.6rem)] leading-[1.12] text-paper">{h.aboutIntro}</p>
          <div
            id="about-more"
            className={cn(
              "grid transition-[grid-template-rows] duration-500 ease-out",
              open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            )}
          >
            <div className="overflow-hidden">
              <div className="space-y-5 pt-6">
                {h.aboutMore.map((p) => (
                  <p key={p} className="max-w-2xl leading-relaxed text-paper/70">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="about-more"
            className="mt-5 border-b border-line pb-1 font-mono text-[11px] uppercase tracking-[0.12em] text-paper/70 transition-colors hover:border-paper hover:text-paper"
          >
            {open ? h.readLess : h.readMore} {open ? "−" : "+"}
          </button>
        </div>

        <aside className="reveal lg:col-span-4 lg:col-start-9">
          <div className="crosshair border border-line p-5">
            <p className="label mb-3">{h.profile}</p>
            {h.facts.map((f) => (
              <KeyValue key={f.k} k={f.k} v={f.v} />
            ))}
            <div className="mt-5 grid grid-cols-2 gap-2">
              <a href="https://github.com/i1Zeus" target="_blank" rel="noopener noreferrer" className="btn-ghost px-3">
                GitHub ↗
              </a>
              <a
                href="https://www.linkedin.com/in/i1zeus"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost px-3"
              >
                LinkedIn ↗
              </a>
            </div>
          </div>
        </aside>
      </div>

      <ul className="grid grid-cols-1 border-b border-line md:grid-cols-3">
        {h.capabilities.map((c, i) => (
          <li
            key={c.tag}
            className={cn(
              "reveal group border-line md:border-e [&:last-child]:border-e-0",
              i < h.capabilities.length - 1 && "max-md:border-b"
            )}
            style={{ transitionDelay: `${i * 90}ms` }}
          >
            <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-stage">
              <div
                className={cn(
                  "art-fade absolute inset-0 transition-transform duration-[1.2s] ease-out group-hover:scale-110",
                  ART[i % ART.length]
                )}
              />
              <span className="label absolute start-4 top-4 text-paper" dir="ltr">
                #0{i + 1} · {c.tag}
              </span>
              <span
                className="display absolute bottom-3 end-4 text-[clamp(4rem,7vw,7rem)] text-paper/15"
                aria-hidden="true"
                dir="ltr"
              >
                0{i + 1}
              </span>
            </div>
            <div className="p-5 md:p-6">
              <h3 className="heading text-3xl md:text-4xl">{c.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-paper/65">{c.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
