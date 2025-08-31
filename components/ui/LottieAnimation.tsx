"use client";

import { useEffect, useRef } from "react";
import lottie from "lottie-web";

interface LottieAnimationProps {
  animationData: any;
  loop?: boolean;
  autoplay?: boolean;
  height?: number;
  width?: number;
}

export default function LottieAnimation({
  animationData,
  loop = true,
  autoplay = true,
  height = 200,
  width = 400,
}: LottieAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<any>(null);

  useEffect(() => {
    if (containerRef.current && typeof window !== "undefined") {
      animationRef.current = lottie.loadAnimation({
        container: containerRef.current,
        renderer: "svg",
        loop,
        autoplay,
        animationData,
      });

      return () => {
        if (animationRef.current) {
          animationRef.current.destroy();
        }
      };
    }
  }, [animationData, loop, autoplay]);

  return (
    <div
      ref={containerRef}
      style={{
        width: width,
        height: height,
      }}
    />
  );
}
