import React from "react";
import { Spotlight } from "./ui/Spotlight";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";
import MagicButton from "./MagicButton";
import { FaLocationArrow } from "react-icons/fa";

const Hero = () => {
  return (
    <div className="pt-36 pb-20">
      {/* Spotlights */}
      <div>
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill="white"
        />

        <Spotlight
          className="top-10 left-full h-[80vh] w-[50vw]"
          fill="purple"
        />

        <Spotlight className="top-28 left-80 h-[80vh] w-[50vw]" fill="blue" />
      </div>

      {/* Background Image */}
      <div className="h-screen w-full dark:bg-black-100 bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] absolute top-0 left-0 flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>

      <div className="relative z-10 flex justify-center my-20">
        <div className="max-w--[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
          <h2 className="max-w-80 text-xs tracking-widest text-center text-blue-100 uppercase">
            Iraqi&apos;s web magic next.js
          </h2>
          <TextGenerateEffect
            className="text-center text-[40px] md:text-5xl lg:text-6xl"
            words="Transforming Ideas into Seamless Reality"
          />
          <p className="md:text-lg lg:text-2xl text-[40px] md:tracking-wider mb-4 text-sm text-center capitalize">
            Hi I&apos;m Hussein, a Web Developer Based in Iraq.
          </p>
          <a href="#about">
            <MagicButton
              title="Show my work"
              position="right"
              icon={<FaLocationArrow />}
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
