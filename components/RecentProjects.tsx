"use client";

import { projects } from "@/data";
import dynamic from "next/dynamic";
import { ProjectCardProps } from "./ProjectCard";

const ProjectCard = dynamic(() => import("./ProjectCard"), {
  ssr: false,
});

const RecentProjects = () => {
  return (
    <div className="py-24 w-full" id="projects">
      <h1 className="heading capitalize text-center mb-16">
        A small selection of{" "}
        <span className="text-purple">recent projects</span>
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 w-full max-w-6xl mx-auto px-1">
        {(projects as ProjectCardProps[]).map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </div>
  );
};

export default RecentProjects;
