import { workExperience } from "@/data";
import Image from "next/image";
import { Button } from "./ui/MovingBorder";

const Experience = () => {
  return (
    <div className="py-20" id="projects">
      <h1 className="heading">
        My <span className="text-purple">Work Experience</span>
      </h1>
      <div className="lg:grid-cols-4 grid w-full grid-cols-1 gap-10 mt-12">
        {workExperience.map((card) => (
          <Button
            key={card.id}
            borderRadius="1.75rem"
            duration={Math.floor(Math.random() * 10000) + 10000}
            className="border-neutral-200 dark:border-slate-800 flex-1 text-white"
          >
            <div className="lg:flex-row lg:items-center md:p-5 lg:p-10 flex flex-col gap-2 p-3 py-6">
              <Image
                src={card.thumbnail}
                alt={card.thumbnail}
                className="lg:w-32 md:w-20 w-16"
                width={10}
                height={10}
              />
              <div className="lg:ms-5">
                <h1 className="text-start md:text-2xl text-xl font-bold">
                  {card.title}
                </h1>
                <p className="text-start text-white-100 mt-3 font-semibold">
                  {card.desc}
                </p>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Experience;
