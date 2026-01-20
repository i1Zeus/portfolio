"use client";

import { projects } from "@/data";
import Image from "next/image";
import Link from "next/link";
import { FaLocationArrow } from "react-icons/fa6";

const ProjectDetails = ({ params }: { params: { id: string } }) => {
  const project = projects.find((p) => p.id === Number(params.id));

  if (!project) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-black-100 text-white">
        <h1 className="text-2xl font-bold">Project not found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black-100 flex flex-col items-center justify-start pt-20 pb-10 px-5 relative overflow-hidden">
      {/* Background Grid */}
      <div className="h-full w-full dark:bg-black-100 bg-white  dark:bg-grid-white/[0.03] bg-grid-black/[0.2] absolute top-0 left-0 flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>

      <div className="max-w-4xl w-full z-10">
        <Link
          href="/#projects"
          className="text-purple hover:underline mb-8 inline-block select-none"
        >
          &larr; Back to Projects
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center">
          {project.title}
        </h1>

        <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/[0.1] shadow-2xl mb-10 bg-[#13162d]">
          <Image
            src="/bg.png"
            alt="bg-img"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <Image
              src={`/project/${project.img}`}
              alt={project.title}
              width={800}
              height={500}
              className="rounded-xl object-cover w-full h-full shadow-lg rotate-2 hover:rotate-0 transition-all duration-500"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-10 justify-between items-start">
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Description
            </h2>
            <p className="text-white-200 text-lg leading-relaxed font-light">
              {project.des}
            </p>

            <h2 className="text-2xl font-semibold text-white mb-4 mt-8">
              Tech Stack
            </h2>
            <div className="flex items-center mt-5">
              {project.iconLists.map((icon, index) => (
                <div
                  key={index}
                  className="border border-white/[0.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
                  style={{
                    transform: `translateX(-${5 * index * 2}px)`,
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

          <div className=" md:w-1/3 w-full flex flex-col gap-5">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="w-full relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
              >
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl gap-2 select-none">
                  Check Live Site <FaLocationArrow color="#CBACF9" />
                </span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
