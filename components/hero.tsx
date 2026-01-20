import dynamic from "next/dynamic";
import { FaDownload, FaLocationArrow } from "react-icons/fa";
import MagicButton from "./MagicButton";

const Spotlight = dynamic(
  () => import("./ui/Spotlight").then((m) => m.Spotlight),
  {
    ssr: false,
  },
);

const TextGenerateEffect = dynamic(
  () => import("./ui/TextGenerateEffect").then((m) => m.TextGenerateEffect),
  {
    ssr: false,
  },
);

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
      <div className="h-screen w-full bg-black-100 bg-dot-white/[0.2] absolute top-0 left-0 flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black-100 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
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
            Hi I&apos;m Hussein, a Software Engineer Based in Iraq.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <a href="#about">
              <MagicButton
                title="Show my work"
                position="right"
                icon={<FaLocationArrow />}
              />
            </a>
            <a href="/Hussein Najah-Software Eng.pdf" download>
              <MagicButton
                title="Download CV"
                position="right"
                icon={<FaDownload />}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
