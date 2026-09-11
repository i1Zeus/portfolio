"use client";
import { cn } from "@/utils/cn";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import LanguageSwitcher from "../LanguageSwitcher";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();

  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex max-w-fit md:min-w-[70vw] lg:min-w-fit fixed z-[5000] top-[90dvh] md:top-10 inset-x-0 mx-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl border border-black/.1 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] items-center justify-center gap-4 sm:gap-6",
          className
        )}
        style={{
          backdropFilter: "blur(16px) saturate(180%)",
          backgroundColor: "rgba(17, 25, 40, 0.75)",
          borderRadius: "14px",
          border: "1px solid rgba(255, 255, 255, 0.125)",
        }}
      >
        <div className="flex items-center gap-4 sm:gap-6">
          {navItems.map((navItem: any, idx: number) => (
            <Link
              key={`link=${idx}`}
              href={navItem.link}
              className={cn(
                "relative text-neutral-50 items-center flex gap-2 hover:text-purple transition-colors"
              )}
            >
              <span className="sm:hidden block">{navItem.icon}</span>
              <span className="text-sm !cursor-pointer hidden sm:block font-medium">
                {navItem.name}
              </span>
            </Link>
          ))}
        </div>

        <div className="h-4 w-[1px] bg-white/20 hidden sm:block" />

        <LanguageSwitcher />
      </motion.div>
    </AnimatePresence>
  );
};
