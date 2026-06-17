"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaEye } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

interface ProjectGalleryProps {
  images: string[];
}

const getGridSpans = (count: number) => {
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
    return options[Math.floor(Math.random() * options.length)];
  }

  // Block definitions (always 3 columns total width)
  const getBlockType1 = () =>
    Math.random() > 0.5
      ? ["md:col-span-2 md:row-span-2", "md:col-span-1 md:row-span-2"] // Large left, Tall right
      : ["md:col-span-1 md:row-span-2", "md:col-span-2 md:row-span-2"]; // Tall left, Large right

  const getBlockType2 = () =>
    Math.random() > 0.5
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
  const shuffledBlocks = [...blocks].sort(() => Math.random() - 0.5);

  const spans: string[] = [];
  shuffledBlocks.forEach((generator) => {
    spans.push(...generator());
  });

  return spans;
};

export default function ProjectGallery({ images }: ProjectGalleryProps) {
  const [shuffledImages, setShuffledImages] = useState<
    { src: string; span: string }[]
  >([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (images && images.length > 0) {
      const shuffled = [...images].sort(() => Math.random() - 0.5);
      const spans = getGridSpans(shuffled.length);
      const items = shuffled.map((src, i) => ({
        src,
        span: spans[i],
      }));
      setShuffledImages(items);
    }
  }, [images]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
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
      if (e.key === "ArrowLeft") navigateLightbox("prev");
      if (e.key === "ArrowRight") navigateLightbox("next");
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, closeLightbox, navigateLightbox]);

  if (!images || images.length === 0) return null;

  return (
    <div className="w-full mt-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-2">
        Project <span className="text-purple">Gallery</span>
      </h2>
      <p className="text-center text-white-200 text-sm md:text-base font-light mb-10">
        Interact with the bento layout to view full screenshots and details
      </p>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:grid-flow-row-dense gap-4 md:gap-6 auto-rows-[250px]">
        {shuffledImages.map((item, index) => (
          <motion.div
            key={item.src}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative rounded-3xl border border-white/[0.1] bg-[#04071D] bg-opacity-50 overflow-hidden cursor-pointer group flex flex-col justify-between ${item.span}`}
            onClick={() => openLightbox(index)}
          >
            {/* Image Wrapper */}
            <div className="relative w-full h-full">
              <Image
                unoptimized
                src={item.src}
                alt={`Project screenshot ${index + 1}`}
                fill
                className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
              {/* Glassmorphism Hover Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center backdrop-blur-sm z-10">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileHover={{ scale: 1.1 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="p-4 rounded-full bg-white/10 border border-white/20 text-white backdrop-blur-md shadow-lg"
                >
                  <FaEye size={24} />
                </motion.div>
                <span className="text-white font-medium mt-3 text-sm tracking-wide">
                  View Screenshot
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 z-50 p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-colors duration-200"
              aria-label="Close Lightbox"
            >
              <IoClose size={24} />
            </button>

            {/* Previous Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox("prev");
              }}
              className="absolute left-5 z-50 p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-colors duration-200"
              aria-label="Previous Image"
            >
              <FaArrowLeft size={20} />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox("next");
              }}
              className="absolute right-5 z-50 p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-colors duration-200"
              aria-label="Next Image"
            >
              <FaArrowRight size={20} />
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
                  unoptimized
                  src={shuffledImages[lightboxIndex].src}
                  alt={`Project image ${lightboxIndex + 1}`}
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
