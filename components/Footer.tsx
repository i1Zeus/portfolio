import dynamic from "next/dynamic";
import { FaLocationArrow } from "react-icons/fa6";

import { socialMedia, words } from "@/data";
import Image from "next/image";
import MagicButton from "./MagicButton";

const FlipWords = dynamic(
  () => import("./ui/FlipWords").then((m) => m.FlipWords),
  {
    ssr: false,
  }
);

const Footer = () => {
  return (
    <footer className="w-full mb-[100px] pb-10 md:mb-5" id="contact">
      <div className="flex flex-col items-center">
        <h1 className="heading lg:max-w-[45vw] text-balance">
          Ready to
          <FlipWords words={words} />
          with me on your next project?
        </h1>
        <p className="text-white-200 md:mt-10 my-5 text-center">
          Reach out to me today and let&apos;s discuss how I can help you
          achieve your goals.
        </p>
        <a href="mailto:husseinnajah123@gmail.com">
          <MagicButton
            title="Let's get in touch"
            icon={<FaLocationArrow />}
            position="right"
          />
        </a>
      </div>
      <div className="md:flex-row flex flex-col items-center justify-between mt-16 gap-5">
        <p className="md:text-base md:font-normal text-sm font-light">
          Copyright © 2024 Hussein Najah
        </p>

        <div className="md:gap-3 flex items-center gap-6">
          {socialMedia.map(({ id, img, link, name }) => (
            <a key={id} href={link} target="_blank" title={name}>
              <div
                key={id}
                className="backdrop-filter backdrop-blur-lg saturate-180 bg-black-200 border-black-300 flex items-center justify-center w-10 h-10 bg-opacity-75 border rounded-lg cursor-pointer"
              >
                <Image
                  width={24}
                  height={24}
                  src={`/socialMedia/${img}`}
                  alt="icons"
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
