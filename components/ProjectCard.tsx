import { motion } from "framer-motion";
import { PinContainer } from "./ui/3d-pin";

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
      className="group lg:min-h-[28rem] sm:h-[35rem] h-[28rem] flex items-center justify-center sm:w-[480px] w-[90vw] max-w-[480px] cursor-pointer"
      onClick={() => window.open(link, "_blank")}
    >
      <PinContainer title={title} href={link}>
        <div className="relative flex items-center justify-center sm:w-[480px] sm:h-[35vh] h-[28vh] w-[90vw] max-w-[480px] overflow-hidden mb-6 group">
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
          <img
            src={`./project/${img}`}
            alt={title}
            className="absolute bottom-0 z-10 transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        <h1 className="text-sm font-bold transition-colors lg:text-xl md:text-lg line-clamp-1 group-hover:text-purple">
          {title}
        </h1>

        <p className="lg:text-lg lg:font-normal line-clamp-3 text-xs font-light text-[#BEC1DD] my-2">
          {des}
        </p>

        <div className="flex items-center justify-between mb-3 mt-5">
          <div className="flex items-center">
            {iconLists.map((icon: string, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                className="border border-white/[.2] rounded-full bg-black lg:w-9 lg:h-9 w-7 h-7 flex justify-center items-center transition-colors"
                style={{ transform: `translateX(-${4 * index + 2}px)` }}
              >
                <img src={`./logo/${icon}`} alt="icon" className="p-1.5" />
              </motion.div>
            ))}
          </div>

          {/* <motion.div
            className="flex items-center justify-center transition-colors cursor-pointer hover:text-purple"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGithubClick}
          >
            <p className="flex text-xs lg:text-lg md:text-xs text-purple">
              View on
            </p>
            <BsGithub className="ms-2" color="#CBACF9" />
          </motion.div> */}
        </div>
      </PinContainer>
    </motion.div>
  );
};

export default ProjectCard;
