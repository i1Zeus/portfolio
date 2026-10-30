"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import ProjectGallery from "@/components/ProjectGallery";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";
import SiteHeader from "@/components/home/SiteHeader";
import SiteEffects from "@/components/home/SiteEffects";
import SiteFooter from "@/components/home/SiteFooter";
import { Arrow, KeyValue, SplitText, sectionPad } from "@/components/home/primitives";
import { useLocale } from "./LocaleContext";
import { getProject, projects } from "@/content/projects";
import { cn } from "@/utils/cn";

interface ProjectDetailsClientProps {
  slug: string;
}

export default function ProjectDetailsClient({ slug }: ProjectDetailsClientProps) {
  const { dict, locale } = useLocale();
  const h = dict.home;

  const project = getProject(slug);
  const index = project ? projects.indexOf(project) : -1;

  if (!project) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-6 bg-ink text-paper">
        <h1 className="display text-6xl">{dict.projects.notFound}</h1>
        <Link href={`/${locale}#work`} className="btn-ghost">
          {dict.projects.backToProjects}
        </Link>
      </div>
    );
  }

  const title = project.title[locale];
  const subtitle = project.subtitle?.[locale];
  const des = project.description[locale];
  const next = projects[(index + 1) % projects.length];
  const nextTitle = next.title[locale];

  const localizedArchitecture = project.architecture
    ? {
        nodes: project.architecture.nodes.map((node) => ({
          ...node,
          label: node.label[locale],
          details: node.details[locale],
        })),
        edges: project.architecture.edges,
      }
    : undefined;

  const total = String(projects.length).padStart(2, "0");

  return (
    <>
      <SiteEffects />
      <SiteHeader />
      <main className="min-h-screen bg-ink text-paper">
        <section className={cn("pt-28 md:pt-32", sectionPad)}>
          <div className="label flex flex-wrap items-center justify-between gap-4">
            <Link href={`/${locale}#work`} className="transition-colors hover:text-paper">
              <span className="inline-block rtl:-scale-x-100">←</span> {dict.projects.backToProjects}
            </Link>
            <span dir="ltr">
              {h.caseStudy} · <span className="text-paper">{String(index + 1).padStart(2, "0")}</span> / {total}
            </span>
          </div>
          <SplitText as="h1" text={title} className="display mt-8 block text-[clamp(3.2rem,10vw,10rem)]" />
          {subtitle && <p className="label mt-4">{subtitle}</p>}
        </section>

        <section className={cn("mt-10 md:mt-14", sectionPad)}>
          <div className="reveal group relative aspect-[16/10] w-full overflow-hidden border border-line bg-stage md:aspect-[16/8]">
            <Image
              src={project.cover}
              alt={title}
              fill
              priority
              sizes="100vw"
              className="object-cover object-top grayscale transition-[filter] duration-700 group-hover:grayscale-0"
            />
          </div>
        </section>

        <section className={cn("grid grid-cols-1 gap-10 border-b border-line py-14 md:py-20 lg:grid-cols-12", sectionPad)}>
          <div className="reveal lg:col-span-7">
            <p className="label mb-5">{dict.projects.descriptionTitle}</p>
            <p className="heading text-[clamp(1.5rem,2.3vw,2.3rem)] leading-[1.15] text-paper">{des}</p>
            {project.highlights && (
              <div className="mt-12">
                <p className="label mb-4">{dict.projects.highlightsTitle}</p>
                <ol className="border-t border-line">
                  {project.highlights.map((item, i) => (
                    <li key={i} className="flex gap-5 border-b border-line py-4 text-paper/80">
                      <span className="label shrink-0 pt-1 text-paper/60" dir="ltr">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="leading-relaxed">{item[locale]}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
          <aside className="reveal lg:col-span-4 lg:col-start-9">
            <div className="crosshair border border-line p-5">
              <p className="label mb-3">{dict.projects.techStackTitle}</p>
              {project.tags.map((tag, i) => (
                <KeyValue key={tag} k={String(i + 1).padStart(2, "0")} v={tag} />
              ))}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-solid mt-5 w-full"
                >
                  {dict.projects.liveSite} <Arrow />
                </a>
              )}
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost mt-2 w-full"
                >
                  {dict.projects.sourceCode} <Arrow />
                </a>
              )}
            </div>
          </aside>
        </section>

        <div className={cn("pb-10", sectionPad)}>
          {localizedArchitecture && <ArchitectureDiagram architecture={localizedArchitecture} />}
          <ProjectGallery images={project.gallery} title={title} />
        </div>

        <Link
          href={`/${locale}/project/${next.slug}`}
          className={cn(
            "group mt-16 flex flex-col gap-4 border-t border-line py-14 transition-colors duration-500 hover:bg-paper hover:text-ink md:py-20",
            sectionPad
          )}
        >
          <span className="label transition-colors group-hover:text-ink/60">{h.nextProject}</span>
          <span className="display flex items-end justify-between gap-6 text-[clamp(3rem,9vw,9rem)]">
            {nextTitle}
            <Arrow className="shrink-0 text-[0.5em] transition-transform duration-500 group-hover:-translate-y-2 group-hover:translate-x-2" />
          </span>
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
