"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaLocationArrow } from "react-icons/fa6";
import ProjectGallery from "@/components/ProjectGallery";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLocale } from "./LocaleContext";
import { projects } from "@/data";

interface ProjectDetailsClientProps {
  id: string;
}

export default function ProjectDetailsClient({ id }: ProjectDetailsClientProps) {
  const { dict, locale, dir } = useLocale();
  const isRtl = dir === "rtl";

  const project = projects.find((p) => p.id === Number(id));

  if (!project) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-black-100 text-white">
        <h1 className="text-2xl font-bold">{dict.projects.notFound}</h1>
      </div>
    );
  }

  const localized = dict.projects.items[project.id];
  const title = localized?.title || project.title;
  const des = localized?.des || project.des;

  // Localized architecture if available
  const localizedArchitecture = project.architecture
    ? {
        nodes: project.architecture.nodes.map((node) => {
          const locNode = localized?.architectureNodes?.[node.id];
          return {
            ...node,
            label: locNode?.label || node.label,
            details: locNode?.details || node.details,
          };
        }),
        edges: project.architecture.edges,
      }
    : undefined;

  return (
    <div className="min-h-screen bg-black-100 flex flex-col items-center justify-start pt-16 pb-10 px-5 relative overflow-hidden text-start">
      {/* Background Grid */}
      <div className="h-full w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.03] bg-grid-black/[0.2] absolute top-0 left-0 flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>

      <div className="max-w-6xl w-full z-10">
        {/* Header navigation with back link and language switcher */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href={`/${locale}#projects`}
            className="text-purple hover:underline inline-flex items-center gap-2 select-none text-sm font-medium"
          >
            <span>{isRtl ? "→" : "←"}</span>
            <span>{dict.projects.backToProjects}</span>
          </Link>

          <LanguageSwitcher />
        </div>

        <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 text-center">
          {title}
        </h1>

        <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/[0.1] shadow-2xl mb-10 bg-[#13162d]">
          <Image
            unoptimized
            src="/bg.png"
            alt="bg-img"
            width={300}
            height={500}
            className="object-contain opacity-20"
          />
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <Image
              unoptimized
              src={`/project/${project.img}`}
              alt={title}
              width={800}
              height={500}
              className="rounded-xl object-cover w-full h-full shadow-lg rotate-1 hover:rotate-0 transition-all duration-500"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-10 justify-between items-start">
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-white mb-4">
              {dict.projects.descriptionTitle}
            </h2>
            <p className="text-white-200 text-lg leading-relaxed font-light">
              {des}
            </p>

            <h2 className="text-2xl font-semibold text-white mb-4 mt-8">
              {dict.projects.techStackTitle}
            </h2>
            <div className="flex items-center mt-5">
              {project.iconLists.map((icon, index) => (
                <div
                  key={index}
                  className="border border-white/[0.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
                  style={{
                    transform: isRtl
                      ? `translateX(${5 * index * 2}px)`
                      : `translateX(-${5 * index * 2}px)`,
                  }}
                >
                  <Image
                    src={`/logo/${icon}`}
                    alt={icon}
                    width={40}
                    height={40}
                    className="p-1.5"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="md:w-1/3 w-full flex flex-col gap-5">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="w-full relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
              >
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl gap-2 select-none">
                  {dict.projects.liveSite}{" "}
                  <FaLocationArrow
                    color="#CBACF9"
                    className={isRtl ? "-scale-x-100" : ""}
                  />
                </span>
              </a>
            )}
          </div>
        </div>

        {/* Project Architecture */}
        {localizedArchitecture && (
          <ArchitectureDiagram architecture={localizedArchitecture} />
        )}

        {/* Project Gallery Bento Grid */}
        <ProjectGallery images={project.images || []} />
      </div>
    </div>
  );
}
