"use client";

import { projects } from "@/data";
import Image from "next/image";
import { BsGithub } from "react-icons/bs";
import { PinContainer } from "./ui/3d-pin";

const RecentProjects = () => {
  return (
    <div className="py-20" id="projects">
      <h1 className="heading">
        A small selection of{" "}
        <span className="text-purple">recent projects</span>
      </h1>
      <div className="gap-x-24 gap-y-8 flex flex-wrap items-center justify-center p-4 mt-10">
        {projects.map(({ id, title, des, iconLists, img, link }: any) => (
          <div
            className="lg:min-h-[32.5rem] sm:h-[41rem] h-[32rem] flex items-center justify-center sm:w-[570px] w-[80vw]"
            key={id}
          >
            <PinContainer title={title} href={link}>
              <div className="relative flex items-center justify-center sm:w-[570px] sm:h-[41vh] h-[30vh] w-[80vw] overflow-hidden mb-10">
                <div
                  className="lg:rounded-3xl size-full relative overflow-hidden"
                  style={{ backgroundColor: "#13162D" }}
                >
                  <Image src="/bg.png" alt="bgimg" />
                </div>
                <Image
                  src={img}
                  alt={title}
                  className="absolute bottom-0 z-10"
                />
              </div>

              <h1 className="lg:text-2xl md:text-xl line-clamp-1 text-base font-bold">
                {title}
              </h1>

              <p
                className="lg:text-xl lg:font-normal line-clamp-2 text-sm font-light"
                style={{
                  color: "#BEC1DD",
                  margin: "1vh 0",
                }}
              >
                {des}
              </p>

              <div className="mt-7 flex items-center justify-between mb-3">
                <div className="flex items-center">
                  {iconLists.map((icon: any, index: any) => (
                    <div
                      key={index}
                      className="border border-white/[.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
                      style={{
                        transform: `translateX(-${5 * index + 2}px)`,
                      }}
                    >
                      <Image src={icon} alt="icon" className="p-2" />
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-center">
                  <p className="lg:text-xl md:text-xs text-purple flex text-sm">
                    View on
                  </p>
                  <BsGithub className="ms-2" color="#CBACF9" />
                </div>
              </div>
            </PinContainer>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentProjects;
