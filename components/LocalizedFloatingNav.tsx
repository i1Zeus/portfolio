"use client";

import React from "react";
import { useLocale } from "./LocaleContext";
import { FloatingNav } from "./ui/FloatingNav";
import { BiCode, BiHome, BiMessage, BiUser, BiUserPlus } from "react-icons/bi";

export default function LocalizedFloatingNav({
  className = "max-w-[90vw]",
}: {
  className?: string;
}) {
  const { dict } = useLocale();

  const navItems = [
    {
      name: dict.nav.home,
      link: "",
      icon: <BiHome className="text-white size-5" />,
    },
    {
      name: dict.nav.about,
      link: "#about",
      icon: <BiUser className="text-white size-5" />,
    },
    {
      name: dict.nav.projects,
      link: "#projects",
      icon: <BiCode className="text-white size-5" />,
    },
    {
      name: dict.nav.testimonials,
      link: "#testimonials",
      icon: <BiUserPlus className="text-white size-5" />,
    },
    {
      name: dict.nav.contact,
      link: "#contact",
      icon: <BiMessage className="text-white size-5" />,
    },
  ];

  return <FloatingNav navItems={navItems} className={className} />;
}
