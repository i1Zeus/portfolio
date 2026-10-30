export const socialMedia = [
  {
    id: 1,
    name: "GitHub",
    link: "https://github.com/i1Zeus",
  },
  {
    id: 2,
    name: "X Formally Twitter",
    link: "https://x.com/i1Zeus",
  },
  {
    id: 3,
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/i1zeus",
  },
  {
    id: 4,
    name: "Instagram",
    link: "https://www.instagram.com/hxg.1",
  },
];

export const contactEmail = "husseinnajah.it@gmail.com";

export const stackGroups = [
  {
    key: "frontend",
    items: ["React", "Next.js", "TanStack Start", "TypeScript", "Tailwind CSS", "Framer Motion", "React Native"],
  },
  {
    key: "backend",
    items: ["Node.js", "NestJS", "Laravel (PHP)", "REST APIs", "WebSockets"],
  },
  {
    key: "data",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Prisma ORM", "Firebase"],
  },
  {
    key: "infra",
    items: ["Docker", "Cloudflare R2", "Vercel", "Odoo ERP", "Stripe", "Gemini / OpenAI"],
  },
] as const;

export type StackGroupKey = (typeof stackGroups)[number]["key"];

export const contactLinks = [
  { key: "email", value: contactEmail, href: `mailto:${contactEmail}` },
  { key: "github", value: "github.com/i1Zeus", href: "https://github.com/i1Zeus" },
  { key: "linkedin", value: "linkedin.com/in/i1zeus", href: "https://www.linkedin.com/in/i1zeus" },
  { key: "x", value: "x.com/i1Zeus", href: "https://x.com/i1Zeus" },
  { key: "instagram", value: "@hxg.1", href: "https://www.instagram.com/hxg.1" },
] as const;
