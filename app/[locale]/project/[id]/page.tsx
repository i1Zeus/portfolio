import { Metadata } from "next";
import { projects, projectTags } from "@/data";
import { locales, Locale, defaultLocale } from "@/data/locales";
import { getDictionary } from "@/data/dictionaries";
import { PERSON_ID, absoluteUrl, breadcrumbs, pageMetadata, snippet } from "@/data/seo";
import JsonLd from "@/components/JsonLd";
import ProjectDetailsClient from "@/components/ProjectDetailsClient";

interface PageProps {
  params: Promise<{
    locale: string;
    id: string;
  }>;
}

// Only the generated project ids exist; unknown ids 404 instead of rendering on demand.
export const dynamicParams = false;

export async function generateStaticParams() {
  const paths: { locale: string; id: string }[] = [];
  for (const locale of locales) {
    for (const project of projects) {
      paths.push({
        locale,
        id: project.id.toString(),
      });
    }
  }
  return paths;
}

const resolve = async (params: PageProps["params"]) => {
  const { locale, id } = await params;
  const safeLocale: Locale = locale === "ar" ? "ar" : defaultLocale;
  const dict = getDictionary(safeLocale);
  const project = projects.find((p) => p.id === Number(id));
  const localized = project ? dict.projects.items[project.id] : undefined;
  return {
    id,
    locale: safeLocale,
    dict,
    project,
    title: localized?.title || project?.title || dict.projects.notFound,
    description: snippet(localized?.des || project?.des || ""),
  };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id, locale, project, title, description } = await resolve(params);
  if (!project) return { title };

  return pageMetadata({
    locale,
    path: `/project/${id}`,
    title,
    description,
    type: "article",
    image: { url: `/og/project-${project.id}.jpg`, alt: title },
  });
}

export default async function ProjectPage({ params }: PageProps) {
  const { id, locale, dict, project, title, description } = await resolve(params);
  const path = `/${locale}/project/${id}`;

  return (
    <>
      {project && (
        <JsonLd
          data={[
            {
              "@type": "CreativeWork",
              "@id": `${absoluteUrl(path)}#work`,
              name: title,
              description,
              url: absoluteUrl(path),
              image: absoluteUrl(`/og/project-${project.id}.jpg`),
              inLanguage: locale,
              keywords: projectTags[project.id]?.join(", "),
              author: { "@id": PERSON_ID },
              creator: { "@id": PERSON_ID },
              ...(project.link ? { sameAs: project.link } : {}),
            },
            breadcrumbs([
              { name: dict.meta.breadcrumbHome, path: `/${locale}` },
              { name: title, path },
            ]),
          ]}
        />
      )}
      <ProjectDetailsClient id={id} />
    </>
  );
}
