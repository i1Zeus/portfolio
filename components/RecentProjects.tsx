"use client";
import dynamic from "next/dynamic";
import { projects } from "@/data";
import { ProjectCardProps } from "./ProjectCard";

const ProjectCard = dynamic(() => import("./ProjectCard"), {
  ssr: false,
});

const RecentProjects = () => {
  return (
    <div className="py-20" id="projects">
      <h1 className="heading">
        A small selection of{" "}
        <span className="text-purple">recent projects</span>
      </h1>
      <div className="flex flex-wrap items-center justify-center p-4 mt-10 gap-x-16 gap-y-6">
        {(projects as ProjectCardProps[]).map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </div>
  );
};

export default RecentProjects;
