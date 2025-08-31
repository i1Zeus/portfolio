"use client";

import dynamic from "next/dynamic";
import { projects } from "@/data";
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl mx-auto px-4">
        {(projects as ProjectCardProps[]).map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </div>
  );
};

export default RecentProjects;
