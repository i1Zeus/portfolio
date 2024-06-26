import { companies, testimonials } from "@/data";
import Image from "next/image";
import { InfiniteMovingCards } from "./ui/InfiniteMovingCards";

const Clients = () => {
  return (
    <div className="py-20" id="testimonials">
      <h1 className="heading">
        Kind Words From <span className="text-purple">Satisfied Clients</span>
      </h1>
      <div className="flex flex-col items-center">
        <div className="h-[50vh] md:h-[30rem] rounded-md flex flex-col antialiased  items-center justify-center relative overflow-hidden">
          <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="slow"
          />
          <div className="md:gap-16 max-lg: flex flex-wrap items-center justify-center gap-4 mt-10">
            {companies.map(({ id, name, img, nameImg }) => (
              <div className="md:max-w-60 max-w-32 flex gap-2" key={id}>
                <Image
                  width={24}
                  height={24}
                  src={`./company/${img}`}
                  alt={name}
                  className="md:w-10 w-5"
                />
                <Image
                  width={24}
                  height={24}
                  src={`./company/${nameImg}`}
                  alt={name}
                  className="md:w-24 w-20"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clients;
