"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

export interface ProjectCardProps {
  id: number;
  title: string;
  des: string;
  iconLists: string[];
  img: string;
  link: string;
}

const ProjectCard = ({
  id,
  title,
  des,
  iconLists,
  img,
  link,
}: ProjectCardProps) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/project/${id}`);
  };

  return (
    <div
      className="flex items-center justify-center p-1 w-full h-full cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="flex flex-col items-center justify-center sm:w-[450px] w-[90vw] overflow-hidden sm:min-h-[30rem] h-auto mb-10 group relative shadow-2xl shadow-zinc-900 rounded-[22px] bg-black-100 border border-white/[0.1] transition-all duration-200 hover:shadow-emerald-500/[0.1]">
        {/* Image Section */}
        <div className="relative w-full h-52 md:h-64 lg:h-72 overflow-hidden rounded-t-[22px] bg-[#13162d]">
          <Image
            src="/bg.png"
            alt="bg-img"
            fill
            className="object-cover opacity-20"
          />
          <motion.div
            className="w-full h-full absolute top-0 left-0 z-10 p-5 flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={`/project/${img}`}
              alt={title}
              width={400}
              height={300}
              className="z-10 absolute bottom-0 rotate-2 rounded-t-xl w-[90%] shadow-2xl"
            />
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="relative p-6 w-full z-20 bg-black-100/50 backdrop-blur-sm flex flex-col justify-between flex-grow">
          <div>
            <h1 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1 text-white">
              {title}
            </h1>

            <p className="lg:text-lg lg:font-normal font-light text-sm line-clamp-1 text-[#BEC1DD] mt-2">
              {des}
            </p>
          </div>

          <div className="flex items-center justify-between mt-7 mb-3">
            <div className="flex items-center">
              {iconLists.map((icon, index) => (
                <div
                  key={icon}
                  className="border border-white/[0.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
                  style={{
                    transform: `translateX(-${5 * index * 2}px)`,
                  }}
                >
                  <Image
                    src={`/logo/${icon}`}
                    alt={icon}
                    width={24}
                    height={24}
                    className="p-0.5"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
