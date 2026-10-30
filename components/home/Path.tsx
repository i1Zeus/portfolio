"use client";

import { cv, formatCvDate } from "@/content/cv";
import { useLocale } from "../LocaleContext";
import { SectionKicker, SplitText, sectionPad } from "./primitives";
import { cn } from "@/utils/cn";

export default function Path() {
  const { dict, locale } = useLocale();
  const h = dict.home;

  return (
    <section id="path" className={cn("scroll-mt-16 border-t border-line py-20 md:py-28", sectionPad)}>
      <SectionKicker index={4} total={5}>
        {h.nav.path}
      </SectionKicker>
      <SplitText as="h2" text={h.pathTitle} className="display mt-6 block text-[clamp(3rem,8vw,8rem)]" />

      <ol className="mt-12 border-t border-line">
        {cv.experience.map((job, i) => (
          <li
            key={`${job.company}-${job.start}`}
            className="reveal grid grid-cols-1 gap-4 border-b border-line py-8 transition-colors hover:bg-white/[0.025] md:grid-cols-12 md:gap-8"
          >
            <div className="label flex gap-3 md:col-span-2 md:flex-col md:gap-1">
              <span className="text-paper" dir="ltr">
                #{i + 1}
              </span>
              <span>
                {formatCvDate(job.start, locale)} — {formatCvDate(job.end, locale)}
              </span>
            </div>
            <div className="md:col-span-4">
              <h3 className="heading text-3xl md:text-4xl">{job.role[locale]}</h3>
              <p className="label mt-2">
                {job.company} · {job.location[locale]}
              </p>
            </div>
            <ul className="space-y-2 leading-relaxed text-paper/70 md:col-span-6">
              {job.bullets.map((bullet, bi) => (
                <li key={bi} className="flex gap-3">
                  <span aria-hidden="true" className="text-paper/60">
                    —
                  </span>
                  {bullet[locale]}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>

      <h3 className="label mb-4 mt-16">{h.approachTitle}</h3>
      <ul className="grid grid-cols-1 border-s border-t border-line md:grid-cols-3">
        {dict.approach.phases.map((phase, i) => (
          <li
            key={phase.order}
            className="reveal border-b border-e border-line p-5 md:p-6"
            style={{ transitionDelay: `${i * 90}ms` }}
          >
            <p className="label">{phase.order}</p>
            <p className="heading mt-3 text-3xl">{phase.title}</p>
            <p className="mt-3 text-sm leading-relaxed text-paper/65">{phase.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
