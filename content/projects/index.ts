import type { Project } from "./types";
import imaPortal from "./ima-portal";
import izeusErp from "./izeus-erp";
import nexogroup from "./nexogroup";
import taeen from "./taeen";
import estore from "./estore";
import hoster from "./hoster";
import abdulkareemCharity from "./abdulkareem-charity";

export type { Localized, Project } from "./types";

/** All projects in Work order. Add a project: create <slug>.ts, put its images in /public/project/<slug>/, import it here. */
export const projects: Project[] = [imaPortal, izeusErp, nexogroup, taeen, estore, hoster, abdulkareemCharity].sort((a, b) => a.order - b.order);

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
