"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { projects } from "@/content/projects";
import { useLocale } from "../LocaleContext";
import { Arrow, SectionKicker, SplitText } from "./primitives";

/**
 * Selected work. On large screens the section is pinned and vertical scroll
 * drives a horizontal track; below `lg` it is a regular vertical list.
 */
export default function Work() {
  const { dict, locale, dir } = useLocale();
  const h = dict.home;
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const mq = window.matchMedia("(min-width: 1024px)");
    const measure = () =>
      setDistance(mq.matches ? Math.max(0, track.scrollWidth - window.innerWidth) : 0);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    mq.addEventListener("change", measure);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      mq.removeEventListener("change", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, dir === "rtl" ? distance : -distance]);
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const total = String(projects.length).padStart(2, "0");

  // Keyboard users: when focus lands on an off-screen card, scroll to where the track shows it.
  const revealFocused = (e: React.FocusEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    const section = sectionRef.current;
    const card = (e.target as HTMLElement).closest("article");
    if (!distance || !track || !section || !card) return;
    const t = track.getBoundingClientRect();
    const c = card.getBoundingClientRect();
    const lead = dir === "rtl" ? t.right - c.right : c.left - t.left;
    const offset = Math.min(distance, Math.max(0, lead - window.innerWidth * 0.2));
    const top = section.getBoundingClientRect().top + window.scrollY + offset;
    requestAnimationFrame(() => window.scrollTo({ top, behavior: "instant" }));
  };

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative scroll-mt-0 border-t border-line"
      style={distance ? { height: `calc(${distance}px + 100vh)` } : undefined}
    >
      <div className="lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden">
        <motion.div
          ref={trackRef}
          onFocus={revealFocused}
          style={distance ? { x } : undefined}
          className="flex flex-col lg:h-full lg:w-max lg:flex-row"
        >
          <div className="flex flex-col justify-between px-4 pb-10 pt-20 sm:px-6 md:px-10 md:pt-28 lg:h-full lg:w-[38vw] lg:border-e lg:border-line lg:pb-14">
            <div>
              <SectionKicker index={3} total={5}>
                {h.nav.work}
              </SectionKicker>
              <SplitText
                as="h2"
                text={h.workTitle}
                className="display mt-6 block text-[clamp(3.2rem,8vw,9rem)]"
              />
            </div>
            <div className="mt-8 flex items-end justify-between gap-6">
              <p className="max-w-xs text-paper/60">{h.workLead}</p>
              <p className="label hidden lg:block">
                {h.dragHint} <span className="inline-block rtl:-scale-x-100">→</span>
              </p>
            </div>
          </div>

          {projects.map((project, i) => {
            const title = project.title[locale];
            const subtitle = project.subtitle?.[locale];
            const description = project.description[locale];
            const caseHref = `/${locale}/project/${project.slug}`;
            const external = project.link ?? project.repo;

            return (
              <article
                key={project.slug}
                className="group flex flex-col border-t border-line px-4 py-10 sm:px-6 md:px-10 lg:h-full lg:w-[60vw] lg:border-e lg:border-t-0 lg:pb-12 lg:pt-24 xl:w-[52vw]"
              >
                <div className="label mb-5 flex items-baseline justify-between gap-4">
                  <span dir="ltr">
                    <span className="text-paper">{String(i + 1).padStart(2, "0")}</span> / {total}
                  </span>
                  <span className="truncate">
                    {subtitle ?? (external ? new URL(external).hostname.replace("www.", "") : h.caseStudy)}
                  </span>
                </div>

                <Link
                  href={caseHref}
                  aria-label={`${h.caseStudy} — ${title}`}
                  className="relative block aspect-[4/3] overflow-hidden border border-line bg-stage lg:aspect-auto lg:min-h-0 lg:flex-1"
                >
                  <Image
                    src={project.cover}
                    alt={title}
                    fill
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    className="object-cover object-top brightness-[0.8] contrast-[1.1] grayscale transition-[filter,transform] duration-700 ease-out group-hover:scale-[1.03] group-hover:brightness-100 group-hover:contrast-100 group-hover:grayscale-0"
                  />
                  <span className="label absolute bottom-3 end-3 bg-ink/80 px-2 py-1 text-paper opacity-0 backdrop-blur transition-opacity duration-500 group-hover:opacity-100">
                    {h.caseStudy}
                  </span>
                </Link>

                <div className="mt-6 grid gap-5 lg:grid-cols-12 lg:gap-8">
                  <h3 className="heading text-[clamp(2rem,3.2vw,3.4rem)] lg:col-span-5">{title}</h3>
                  <div className="lg:col-span-7">
                    <p className="line-clamp-3 leading-relaxed text-paper/65">{description}</p>
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <li key={tag} className="chip">
                          {tag}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 flex flex-wrap gap-2">
                      <Link href={caseHref} className="btn-ghost px-4 py-2.5">
                        {h.caseStudy} <Arrow />
                      </Link>
                      {external && (
                        <a
                          href={external}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-ghost px-4 py-2.5"
                        >
                          {project.link ? h.liveSite : dict.projects.sourceCode} <Arrow />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </motion.div>

        {distance > 0 && (
          <div className="absolute inset-x-10 bottom-5 hidden h-px bg-line lg:block" aria-hidden="true">
            <motion.div
              className="h-px bg-paper ltr:origin-left rtl:origin-right"
              style={{ scaleX: progress }}
            />
          </div>
        )}
      </div>
    </section>
  );
}
