"use client";

import { projects } from "@/data";
import dynamic from "next/dynamic";
import { ProjectCardProps } from "./ProjectCard";
import { useLocale } from "./LocaleContext";

const ProjectCard = dynamic(() => import("./ProjectCard"), {
  ssr: false,
});

const RecentProjects = () => {
  const { dict } = useLocale();

  return (
    <div className="py-24 w-full" id="projects">
      <h1 className="heading capitalize text-center mb-16">
        {dict.projects.headingPrefix}{" "}
        <span className="text-purple">{dict.projects.headingHighlight}</span>
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 w-full max-w-6xl mx-auto px-1">
        {(projects as ProjectCardProps[]).map((project) => {
          const localized = dict.projects.items[project.id];
          return (
            <ProjectCard
              key={project.id}
              {...project}
              title={localized?.title || project.title}
              des={localized?.des || project.des}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RecentProjects;
