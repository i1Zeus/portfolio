import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Hussein Najah — Full-Stack Software Engineer",
    short_name: "Hussein Najah",
    description:
      "Portfolio of Hussein Najah, a full-stack software engineer in Basra, Iraq building ERP systems, e-commerce platforms and web apps.",
    start_url: "/",
    display: "standalone",
    background_color: "#050505",
    theme_color: "#050505",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
