"use client";

import { projects } from "@/data";
import ProjectCard from "./ProjectCard";
import { ProjectCardProps } from "./ProjectCard";

const RecentProjects = () => {
  return (
    <div className="py-20" id="projects">
      <h1 className="heading">
        A small selection of{" "}
        <span className="text-purple">recent projects</span>
      </h1>
      <div className="flex flex-wrap items-center justify-center p-4 mt-10 gap-x-24 gap-y-8">
        {(projects as ProjectCardProps[]).map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </div>
  );
};

export default RecentProjects;
