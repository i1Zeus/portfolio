import React from "react";
import dynamic from "next/dynamic";
import { gridItems } from "@/data";

const BentoGrid = dynamic(() => import("./ui/BentoGrid").then((m) => m.BentoGrid), {
  ssr: false,
});

const BentoGridItem = dynamic(() => import("./ui/BentoGrid").then((m) => m.BentoGridItem), {
  ssr: false,
});

const Grid = () => {
  return (
    <section id="about">
      <BentoGrid className="w-full py-20">
        {gridItems.map(
          ({
            id,
            title,
            description,
            className,
            img,
            imgClassName,
            spareImg,
            titleClassName,
          }) => (
            <BentoGridItem
              id={id}
              key={id}
              title={title}
              description={description}
              className={className}
              img={img}
              imgClassName={imgClassName}
              titleClassName={titleClassName}
              spareImg={spareImg}
            />
          )
        )}
      </BentoGrid>
    </section>
  );
};

export default Grid;
