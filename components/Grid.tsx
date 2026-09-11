"use client";

import React from "react";
import dynamic from "next/dynamic";
import { gridItems } from "@/data";
import { useLocale } from "./LocaleContext";

const BentoGrid = dynamic(
  () => import("./ui/BentoGrid").then((m) => m.BentoGrid),
  {
    ssr: false,
  }
);

const BentoGridItem = dynamic(
  () => import("./ui/BentoGrid").then((m) => m.BentoGridItem),
  {
    ssr: false,
  }
);

const Grid = () => {
  const { dict } = useLocale();

  const getLocalizedContent = (id: number) => {
    switch (id) {
      case 1:
        return {
          title: dict.bento.item1Title,
          description: dict.bento.item1Desc,
        };
      case 2:
        return {
          title: dict.bento.item2Title,
          description: dict.bento.item2Desc,
        };
      case 3:
        return {
          title: dict.bento.item3Title,
          description: dict.bento.item3Desc,
        };
      case 4:
        return {
          title: dict.bento.item4Title,
          description: dict.bento.item4Desc,
        };
      case 5:
        return {
          title: dict.bento.item5Title,
          description: dict.bento.item5Desc,
        };
      case 6:
        return {
          title: dict.bento.item6Title,
          description: "",
        };
      default:
        return { title: "", description: "" };
    }
  };

  return (
    <section id="about">
      <BentoGrid className="w-full py-20">
        {gridItems.map(
          ({
            id,
            className,
            img,
            imgClassName,
            spareImg,
            titleClassName,
          }) => {
            const { title, description } = getLocalizedContent(id);
            return (
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
            );
          }
        )}
      </BentoGrid>
    </section>
  );
};

export default Grid;
