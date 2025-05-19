import { BsGithub } from "react-icons/bs";
import { PinContainer } from "./ui/3d-pin";
import { motion } from "framer-motion";

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
  const handleGithubClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(link, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      className="lg:min-h-[32.5rem] sm:h-[41rem] h-[32rem] flex items-center justify-center sm:w-[570px] w-[80vw] cursor-pointer"
      onClick={() => window.open(link, "_blank")}
    >
      <PinContainer title={title} href={link}>
        <div className="relative flex items-center justify-center sm:w-[570px] sm:h-[41vh] h-[30vh] w-[80vw] overflow-hidden mb-10 group">
          <div
            className="relative overflow-hidden transition-transform duration-300 lg:rounded-3xl size-full group-hover:scale-105"
            style={{ backgroundColor: "#13162D" }}
          >
            <img
              src="./bg.png"
              alt="bgimg"
              className="object-cover w-full h-full"
            />
          </div>
          <motion.img
            src={`./project/${img}`}
            alt={title}
            className="absolute bottom-0 z-10 transition-transform duration-300 group-hover:scale-110"
            whileHover={{ y: -10 }}
          />
        </div>

        <h1 className="text-base font-bold transition-colors lg:text-2xl md:text-xl line-clamp-1 hover:text-purple">
          {title}
        </h1>

        <p className="lg:text-xl lg:font-normal line-clamp-2 text-sm font-light text-[#BEC1DD] my-2">
          {des}
        </p>

        <div className="flex items-center justify-between mb-3 mt-7">
          <div className="flex items-center">
            {iconLists.map((icon: string, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                className="border border-white/[.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center hover:border-purple transition-colors"
                style={{ transform: `translateX(-${5 * index + 2}px)` }}
              >
                <img src={`./logo/${icon}`} alt="icon" className="p-2" />
              </motion.div>
            ))}
          </div>

          <motion.div
            className="flex items-center justify-center transition-colors cursor-pointer hover:text-purple"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGithubClick}
          >
            <p className="flex text-sm lg:text-xl md:text-xs text-purple">
              View on
            </p>
            <BsGithub className="ms-2" color="#CBACF9" />
          </motion.div>
        </div>
      </PinContainer>
    </motion.div>
  );
};

export default ProjectCard;
