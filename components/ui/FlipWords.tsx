"use client";
import React, { useEffect, useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/utils/cn";

export const FlipWords = ({
  words,
  duration = 3000,
  className,
}: {
  words: string[];
  duration?: number;
  className?: string;
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  // Reset index when words array changes
  useEffect(() => {
    setCurrentWordIndex(0);
  }, [words]);

  useEffect(() => {
    if (!words || words.length <= 1) return;

    const intervalId = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, duration);

    return () => {
      clearInterval(intervalId);
    };
  }, [words, duration]);

  const currentWord = words[currentWordIndex] || words[0] || "";

  // Check if current word contains Arabic characters
  const isArabic = useMemo(() => /[\u0600-\u06FF]/.test(currentWord), [currentWord]);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={currentWord}
        initial={{
          opacity: 0,
          y: 10,
          filter: "blur(4px)",
        }}
        animate={{
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
        }}
        exit={{
          opacity: 0,
          y: -20,
          filter: "blur(4px)",
          transition: { duration: 0.25 },
        }}
        transition={{
          duration: 0.4,
          ease: "easeInOut",
        }}
        className={cn(
          "z-10 inline-block relative text-center text-purple px-1.5",
          className
        )}
      >
        {isArabic ? (
          // In Arabic, letters must remain connected as a single text node
          <span className="inline-block font-arabic">
            {currentWord}
          </span>
        ) : (
          // For Latin words, animate letter by letter without breaking word boundaries
          currentWord.split(" ").map((word, wordIdx) => (
            <span key={word + wordIdx} className="inline-block whitespace-nowrap">
              {word.split("").map((letter, letterIdx) => (
                <motion.span
                  key={word + letterIdx}
                  initial={{ opacity: 0, y: 8, filter: "blur(2px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    delay: (wordIdx * word.length + letterIdx) * 0.05,
                    duration: 0.3,
                  }}
                  className="inline-block"
                >
                  {letter}
                </motion.span>
              ))}
              {wordIdx < currentWord.split(" ").length - 1 && (
                <span className="inline-block">&nbsp;</span>
              )}
            </span>
          ))
        )}
      </motion.span>
    </AnimatePresence>
  );
};
