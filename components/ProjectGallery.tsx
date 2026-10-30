"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaEye } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { useLocale } from "./LocaleContext";

interface ProjectGalleryProps {
  images: string[];
  title: string;
}

const getGridSpans = (count: number, rand: () => number = Math.random) => {
  if (count === 0) return [];
  if (count === 1) return ["md:col-span-3 md:row-span-2"];

  if (count === 3) {
    const options = [
      [
        "md:col-span-2 md:row-span-2",
        "md:col-span-1 md:row-span-1",
        "md:col-span-1 md:row-span-1",
      ],
      [
        "md:col-span-1 md:row-span-1",
        "md:col-span-1 md:row-span-1",
        "md:col-span-2 md:row-span-2",
      ],
      [
        "md:col-span-1 md:row-span-1",
        "md:col-span-1 md:row-span-1",
        "md:col-span-1 md:row-span-1",
      ],
    ];
    return options[Math.floor(rand() * options.length)];
  }

  // Block definitions (always 3 columns total width)
  const getBlockType1 = () =>
    rand() > 0.5
      ? ["md:col-span-2 md:row-span-2", "md:col-span-1 md:row-span-2"] // Large left, Tall right
      : ["md:col-span-1 md:row-span-2", "md:col-span-2 md:row-span-2"]; // Tall left, Large right

  const getBlockType2 = () =>
    rand() > 0.5
      ? ["md:col-span-2 md:row-span-1", "md:col-span-1 md:row-span-1"] // Wide left, Small right
      : ["md:col-span-1 md:row-span-1", "md:col-span-2 md:row-span-1"]; // Small left, Wide right

  const getBlockType3 = () => [
    "md:col-span-1 md:row-span-1",
    "md:col-span-1 md:row-span-1",
    "md:col-span-1 md:row-span-1",
  ];

  // Resolve count into size-2 and size-3 blocks:
  // count = 2 * numSize2 + 3 * numSize3
  let numSize2 = 0;
  let numSize3 = 0;

  if (count % 2 === 0) {
    numSize2 = count / 2;
  } else {
    numSize2 = (count - 3) / 2;
    numSize3 = 1;
  }

  const blocks: (() => string[])[] = [];

  for (let i = 0; i < numSize2; i++) {
    // Alternating between height 2 (Type 1) and height 1 (Type 2) blocks for visual richness
    if (i % 2 === 0) {
      blocks.push(getBlockType1);
    } else {
      blocks.push(getBlockType2);
    }
  }

  for (let i = 0; i < numSize3; i++) {
    blocks.push(getBlockType3);
  }

  // Shuffle the blocks themselves so order of block types changes
  const shuffledBlocks = [...blocks].sort(() => rand() - 0.5);

  const spans: string[] = [];
  shuffledBlocks.forEach((generator) => {
    spans.push(...generator());
  });

  return spans;
};

const layout = (images: string[], rand: () => number) => {
  const shuffled = [...images].sort(() => rand() - 0.5);
  const spans = getGridSpans(shuffled.length, rand);
  return shuffled.map((src, i) => ({ src, span: spans[i] }));
};

export default function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const { dict, dir } = useLocale();
  // Start in a fixed order so the images are in the server HTML, then shuffle on the client.
  const [shuffledImages, setShuffledImages] = useState(() => layout(images, () => 0.5));
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (images.length > 0) setShuffledImages(layout(images, Math.random));
  }, [images]);

  const openLightbox = (index: number) => {
    openerRef.current = document.activeElement as HTMLElement | null;
    setLightboxIndex(index);
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    openerRef.current?.focus();
  }, []);

  const navigateLightbox = useCallback(
    (direction: "prev" | "next") => {
      setLightboxIndex((prev) => {
        if (prev === null) return null;
        if (direction === "prev") {
          return prev === 0 ? shuffledImages.length - 1 : prev - 1;
        } else {
          return prev === shuffledImages.length - 1 ? 0 : prev + 1;
        }
      });
    },
    [shuffledImages.length],
  );

  // Handle keyboard events for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      // Arrow keys follow the reading direction.
      if (e.key === "ArrowLeft") navigateLightbox(dir === "rtl" ? "next" : "prev");
      if (e.key === "ArrowRight") navigateLightbox(dir === "rtl" ? "prev" : "next");
      // Keep Tab inside the dialog.
      if (e.key === "Tab" && dialogRef.current) {
        const buttons = Array.from(dialogRef.current.querySelectorAll<HTMLElement>("button"));
        const i = buttons.indexOf(document.activeElement as HTMLElement);
        const next = e.shiftKey ? (i <= 0 ? buttons.length - 1 : i - 1) : (i + 1) % buttons.length;
        e.preventDefault();
        buttons[next]?.focus();
      }
    };

    dialogRef.current?.querySelector<HTMLElement>("button")?.focus();

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, closeLightbox, navigateLightbox, dir]);

  if (!images || images.length === 0) return null;

  return (
    <div className="w-full mt-20">
      <h2 className="heading text-[clamp(2.4rem,5vw,4.5rem)] uppercase text-paper rtl:normal-case mb-3">
        {dict.projects.galleryTitle}
      </h2>
      <p className="text-paper/60 text-sm md:text-base max-w-xl mb-10">
        {dict.projects.gallerySubtitle}
      </p>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:grid-flow-row-dense gap-4 md:gap-6 auto-rows-[250px]">
        {shuffledImages.map((item, index) => (
          <motion.button
            type="button"
            key={item.src}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative rounded-none border border-line bg-stage overflow-hidden cursor-pointer group flex flex-col justify-between text-start ${item.span}`}
            onClick={() => openLightbox(index)}
            aria-label={`${dict.projects.viewFullImage}: ${title} ${index + 1}`}
          >
            {/* Image Wrapper */}
            <span className="relative block w-full h-full">
              <Image
                src={item.src}
                alt={`${title} — screenshot ${index + 1}`}
                fill
                className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
              {/* Hover / focus overlay */}
              <span className="absolute inset-0 bg-ink/70 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center backdrop-blur-sm z-10">
                <motion.span
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileHover={{ scale: 1.1 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="block p-4 rounded-none bg-white/10 border border-white/20 text-white backdrop-blur-md shadow-lg"
                >
                  <FaEye size={24} />
                </motion.span>
                <span className="text-paper font-mono uppercase mt-3 text-[11px] tracking-[0.12em]">
                  {dict.projects.viewFullImage}
                </span>
              </span>
            </span>
          </motion.button>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={`${title} — ${lightboxIndex + 1} / ${shuffledImages.length}`}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/95 backdrop-blur-xl"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-5 end-5 z-50 p-3 rounded-none bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-colors duration-200 cursor-pointer"
              aria-label={dict.projects.lightboxClose}
              title={dict.projects.lightboxClose}
            >
              <IoClose size={24} />
            </button>

            {/* Previous Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox("prev");
              }}
              className="absolute start-5 z-50 p-3 rounded-none bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-colors duration-200 cursor-pointer"
              aria-label={dict.projects.lightboxPrev}
              title={dict.projects.lightboxPrev}
            >
              <FaArrowLeft size={20} className={dir === "rtl" ? "rotate-180" : ""} />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox("next");
              }}
              className="absolute end-5 z-50 p-3 rounded-none bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-colors duration-200 cursor-pointer"
              aria-label={dict.projects.lightboxNext}
              title={dict.projects.lightboxNext}
            >
              <FaArrowRight size={20} className={dir === "rtl" ? "rotate-180" : ""} />
            </button>

            {/* Main Lightbox Content */}
            <div
              className="relative max-w-7xl w-full h-[80vh] px-10 flex items-center justify-center select-none"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                key={lightboxIndex}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-full flex items-center justify-center"
              >
                <Image
                  src={shuffledImages[lightboxIndex].src}
                  alt={`${title} — screenshot ${lightboxIndex + 1}`}
                  fill
                  className="object-contain max-w-full max-h-full"
                />
              </motion.div>
            </div>

            {/* Indicator */}
            <div className="absolute bottom-5 text-white/60 text-sm select-none">
              {lightboxIndex + 1} / {shuffledImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
