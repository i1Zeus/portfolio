import type { Config } from "tailwindcss";

const config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Geist", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "Geist Mono", "ui-monospace", "monospace"],
        display: ["var(--font-display)", "Arial Narrow", "sans-serif"],
        cairo: ["var(--font-cairo)", "Cairo", "sans-serif"],
      },
      colors: {
        ink: "#050505",
        stage: "#0b0b0b",
        paper: "#f2f2ee",
        line: {
          DEFAULT: "rgba(242, 242, 238, 0.12)",
          strong: "rgba(242, 242, 238, 0.28)",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
