"use client";

import { workExperience } from "@/data";
import { useLocale } from "../LocaleContext";
import { SectionKicker, SplitText, sectionPad } from "./primitives";
import { cn } from "@/utils/cn";

export default function Path() {
  const { dict } = useLocale();
  const h = dict.home;

  return (
    <section id="path" className={cn("scroll-mt-16 border-t border-line py-20 md:py-28", sectionPad)}>
      <SectionKicker index={4} total={5}>
        {h.nav.path}
      </SectionKicker>
      <SplitText as="h2" text={h.pathTitle} className="display mt-6 block text-[clamp(3rem,8vw,8rem)]" />

      <ol className="mt-12 border-t border-line">
        {workExperience.map((job, i) => {
          const localized = dict.experience.items.find((item) => item.id === job.id);
          return (
            <li
              key={job.id}
              className="reveal grid grid-cols-1 gap-4 border-b border-line py-8 transition-colors hover:bg-white/[0.025] md:grid-cols-12 md:gap-8"
            >
              <div className="label md:col-span-2" dir="ltr">
                <span className="text-paper">#{i + 1}</span>
              </div>
              <h3 className="heading text-3xl md:col-span-4 md:text-4xl">{localized?.title || job.title}</h3>
              <p className="leading-relaxed text-paper/70 md:col-span-6">{localized?.desc || job.desc}</p>
            </li>
          );
        })}
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
