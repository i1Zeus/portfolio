import type { Locale } from "@/data/locales";

export type Localized = Record<Locale, string>;

export type ArchitectureNodeType = "frontend" | "backend" | "database" | "external";

export interface Project {
  /** Legacy numeric id; only used to redirect old /project/<id> links. */
  id: number;
  slug: string;
  /** Position in the Work section (1 = first). */
  order: number;
  title: Localized;
  subtitle?: Localized;
  description: Localized;
  /** Paths under /public, e.g. /project/<slug>/cover.webp */
  cover: string;
  gallery: string[];
  tags: string[];
  link?: string;
  repo?: string;
  /** What I did, as bullet points (from the CV or owner-supplied copy only). */
  highlights?: Localized[];
  caseStudy?: {
    problem?: Localized;
    approach?: Localized[];
    outcome?: Localized;
    metrics?: { label: Localized; value: string }[];
  };
  architecture?: {
    nodes: { id: string; type: ArchitectureNodeType; label: Localized; details: Localized }[];
    edges: { from: string; to: string; label?: string }[];
  };
}
