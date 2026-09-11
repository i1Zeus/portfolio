"use client";

import { companies } from "@/data";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useLocale } from "./LocaleContext";

const InfiniteMovingCards = dynamic(
  () => import("./ui/InfiniteMovingCards").then((m) => m.InfiniteMovingCards),
  {
    ssr: false,
  }
);

const Clients = () => {
  const { dict, dir } = useLocale();

  return (
    <div className="py-20" id="testimonials">
      <h1 className="heading">
        {dict.clients.headingPrefix}{" "}
        <span className="text-purple">{dict.clients.headingHighlight}</span>
      </h1>
      <div className="flex flex-col items-center">
        <div className="h-[50vh] md:h-[30rem] rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden">
          <InfiniteMovingCards
            key={dir}
            items={dict.clients.items}
            direction={dir === "rtl" ? "left" : "right"}
            speed="slow"
          />
          <div className="md:gap-16 max-lg: flex flex-wrap items-center justify-center gap-4 mt-10">
            {companies.map(({ id, name, img, nameImg }) => (
              <div className="md:max-w-60 max-w-32 flex gap-2" key={id}>
                <Image
                  width={24}
                  height={24}
                  src={`/company/${img}`}
                  alt={name}
                  className="md:w-10 w-5"
                />
                <Image
                  width={24}
                  height={24}
                  src={`/company/${nameImg}`}
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
