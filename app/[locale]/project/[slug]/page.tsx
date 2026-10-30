import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/content/projects";
import { locales, Locale, defaultLocale } from "@/data/locales";
import { getDictionary } from "@/data/dictionaries";
import { PERSON_ID, absoluteUrl, breadcrumbs, pageMetadata, snippet } from "@/data/seo";
import JsonLd from "@/components/JsonLd";
import ProjectDetailsClient from "@/components/ProjectDetailsClient";

interface PageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

// Only known project slugs exist; anything else 404s instead of rendering on demand.
export const dynamicParams = false;

export async function generateStaticParams() {
  return locales.flatMap((locale) => projects.map((project) => ({ locale, slug: project.slug })));
}

const resolve = async (params: PageProps["params"]) => {
  const { locale, slug } = await params;
  const safeLocale: Locale = locale === "ar" ? "ar" : defaultLocale;
  const project = getProject(slug);
  return {
    locale: safeLocale,
    dict: getDictionary(safeLocale),
    project,
    title: project ? project.title[safeLocale] : "",
    description: project ? snippet(project.description[safeLocale]) : "",
  };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, project, title, description } = await resolve(params);
  if (!project) return {};

  const subtitle = project.subtitle?.[locale];
  return pageMetadata({
    locale,
    path: `/project/${project.slug}`,
    title: subtitle ? `${title} | ${subtitle}` : title,
    description,
    type: "article",
    image: { url: `/og/${project.slug}-${locale}.jpg`, alt: title },
  });
}

export default async function ProjectPage({ params }: PageProps) {
  const { locale, dict, project, title, description } = await resolve(params);
  if (!project) notFound();

  const path = `/${locale}/project/${project.slug}`;

  return (
    <>
      <JsonLd
        data={[
          {
            "@type": "CreativeWork",
            "@id": `${absoluteUrl(path)}#work`,
            name: title,
            description,
            url: absoluteUrl(path),
            image: absoluteUrl(`/og/${project.slug}-${locale}.jpg`),
            inLanguage: locale,
            keywords: project.tags.join(", "),
            author: { "@id": PERSON_ID },
            creator: { "@id": PERSON_ID },
            ...(project.link || project.repo ? { sameAs: project.link ?? project.repo } : {}),
          },
          breadcrumbs([
            { name: dict.meta.breadcrumbHome, path: `/${locale}` },
            { name: title, path },
          ]),
        ]}
      />
      <ProjectDetailsClient slug={project.slug} />
    </>
  );
}
