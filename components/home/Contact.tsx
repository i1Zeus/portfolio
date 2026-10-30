"use client";

import { contactEmail, contactLinks } from "@/data";
import { useLocale } from "../LocaleContext";
import { Arrow, KeyValue, SectionKicker, SplitText, sectionPad } from "./primitives";
import { cn } from "@/utils/cn";

export default function Contact() {
  const { dict } = useLocale();
  const h = dict.home;

  return (
    <section id="contact" className={cn("scroll-mt-16 border-t border-line pb-16 pt-20 md:pb-24 md:pt-28", sectionPad)}>
      <SectionKicker index={5} total={5}>
        {h.nav.contact}
      </SectionKicker>
      <SplitText as="h2" text={h.contactTitle} className="display mt-6 block text-[clamp(3rem,9vw,9rem)]" />

      <a
        href={`mailto:${contactEmail}`}
        className="group mt-8 inline-flex max-w-full items-center gap-4 border-b border-line pb-2 font-display text-[clamp(1.5rem,4.4vw,4.6rem)] font-light leading-none text-paper/80 transition-colors hover:border-paper hover:text-paper"
        dir="ltr"
      >
        <span className="truncate">{contactEmail}</span>
        <Arrow className="h-[0.7em] w-[0.7em] shrink-0 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
      </a>

      <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="reveal lg:col-span-6">
          <h3 className="heading text-3xl md:text-4xl">{h.contactSubtitle}</h3>
          <p className="mt-4 max-w-md leading-relaxed text-paper/70">{h.contactText}</p>
          <ul className="mt-8 border-t border-line">
            {contactLinks.map((c) => (
              <li key={c.key} className="border-b border-line">
                <a
                  href={c.href}
                  target={c.key === "email" ? undefined : "_blank"}
                  rel={c.key === "email" ? undefined : "noopener noreferrer"}
                  className="group flex items-center gap-4 py-4 text-paper/80 transition-colors hover:text-paper"
                >
                  <span className="label w-20 shrink-0">{h.channels[c.key]}</span>
                  <span className="flex-1 truncate font-mono text-[13px]" dir="ltr">
                    {c.value}
                  </span>
                  <Arrow className="h-4 w-4 text-paper/55 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <aside className="reveal lg:col-span-4 lg:col-start-9">
          <div className="crosshair border border-line p-5">
            <p className="label mb-3 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-paper" />
              {h.available}
            </p>
            {h.status.map((s) => (
              <KeyValue key={s.k} k={s.k} v={s.v} />
            ))}
            <div className="mt-5 grid gap-2">
              <a href={`mailto:${contactEmail}`} className="btn-solid">
                {h.ctaContact}
              </a>
              <a href="/hussein-najah-cv.pdf" download className="btn-ghost">
                {dict.hero.downloadCv} ↓
              </a>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
