"use client";

import { stackGroups } from "@/data";
import { useLocale } from "../LocaleContext";
import { SectionKicker, SplitText, sectionPad } from "./primitives";
import { cn } from "@/utils/cn";

export default function Stack() {
  const { dict } = useLocale();
  const h = dict.home;
  const total = stackGroups.reduce((n, g) => n + g.items.length, 0);

  return (
    <section id="stack" className={cn("scroll-mt-16 py-20 md:py-28", sectionPad)}>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <SectionKicker index={2} total={5}>
            {h.nav.stack} · <span dir="ltr">{total}</span>
          </SectionKicker>
          <SplitText as="h2" text={h.stackTitle} className="display mt-6 block text-[clamp(3rem,8vw,8rem)]" />
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 border-s border-t border-line sm:grid-cols-2 lg:grid-cols-4">
        {stackGroups.map((group, gi) => (
          <div
            key={group.key}
            className="reveal border-b border-e border-line p-5 md:p-6"
            style={{ transitionDelay: `${gi * 80}ms` }}
          >
            <p className="label flex justify-between">
              <span>{h.stackGroups[group.key]}</span>
              <span dir="ltr">
                <span className="text-paper">{String(group.items.length).padStart(2, "0")}</span>
              </span>
            </p>
            <ul className="mt-6">
              {group.items.map((item, i) => (
                <li
                  key={item}
                  className="group flex items-baseline justify-between border-b border-line py-2 last:border-b-0"
                >
                  <span className="heading text-[1.6rem] text-paper/85 transition-colors group-hover:text-paper">
                    {item}
                  </span>
                  <span className="font-mono text-[10px] text-paper/35">{String(i + 1).padStart(2, "0")}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="reveal mt-14">
        <p className="label mb-4">{h.expertiseLabel}</p>
        <p className="heading text-[clamp(1.8rem,4vw,3.8rem)] uppercase leading-[1.05] text-paper/85 rtl:normal-case">
          {h.expertise.map((e, i) => (
            <span key={e}>
              <span className="whitespace-nowrap">{e}</span>
              {i < h.expertise.length - 1 && <span className="mx-3 text-paper/25">/</span>}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
