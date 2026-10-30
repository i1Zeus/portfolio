"use client";

import { useEffect, useRef } from "react";

const SIZE = 160;
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const PAPER = 0xffeef2f2; // ABGR for #f2f2ee, fully opaque

/**
 * A rotating globe rendered with a 4×4 ordered (Bayer) dither at low
 * resolution and upscaled with pixelated sampling. The light follows the pointer.
 */
export default function DitherSphere({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    canvas.width = canvas.height = SIZE;
    const image = ctx.createImageData(SIZE, SIZE);
    const pixels = new Uint32Array(image.data.buffer);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let px = 0.35,
      py = -0.4,
      tx = px,
      ty = py,
      frame = 0,
      last = 0,
      visible = true;

    const draw = (t: number) => {
      px += (tx - px) * 0.06;
      py += (ty - py) * 0.06;
      const lx0 = -0.55 + px * 0.9 + Math.sin(t * 0.0003) * 0.15;
      const ly0 = -0.45 + py * 0.9;
      const len = Math.hypot(lx0, ly0, 0.75);
      const lx = lx0 / len,
        ly = ly0 / len,
        lz = 0.75 / len;
      const spin = t * 0.00018;

      for (let y = 0; y < SIZE; y++) {
        const ny = ((y + 0.5) / SIZE) * 2.2 - 1.1;
        for (let x = 0; x < SIZE; x++) {
          const nx = ((x + 0.5) / SIZE) * 2.2 - 1.1;
          const r2 = nx * nx + ny * ny;
          let v = 0;
          if (r2 <= 1) {
            const nz = Math.sqrt(1 - r2);
            const diffuse = Math.max(0, nx * lx + ny * ly + nz * lz);
            const lon = Math.atan2(nx, nz) + spin;
            const lat = Math.asin(ny);
            const grid =
              Math.abs(Math.sin(lon * 6)) < 0.07 || Math.abs(Math.sin(lat * 6)) < 0.05 ? 0.45 : 0;
            v = diffuse * 0.72 + grid * (0.2 + diffuse * 0.6) + Math.pow(1 - nz, 4) * 0.22;
          } else {
            const d = Math.sqrt(r2);
            if (d < 1.06) v = 0.14 * (1 - (d - 1) / 0.06);
          }
          pixels[y * SIZE + x] = v > (BAYER[(y & 3) * 4 + (x & 3)] + 0.5) / 16 ? PAPER : 0;
        }
      }
      ctx.putImageData(image, 0, 0);
    };

    const loop = (t: number) => {
      frame = requestAnimationFrame(loop);
      if (!visible || t - last < 33) return;
      last = t;
      draw(t);
    };

    const onMove = (e: PointerEvent) => {
      tx = e.clientX / window.innerWidth;
      ty = e.clientY / window.innerHeight - 0.5;
    };

    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(canvas);

    if (reduced) {
      draw(0);
    } else {
      window.addEventListener("pointermove", onMove, { passive: true });
      frame = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{ imageRendering: "pixelated" }}
    />
  );
}
