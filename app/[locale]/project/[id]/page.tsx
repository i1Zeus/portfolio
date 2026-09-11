import { Metadata } from "next";
import { projects } from "@/data";
import { locales, Locale, defaultLocale } from "@/data/locales";
import { getDictionary } from "@/data/dictionaries";
import ProjectDetailsClient from "@/components/ProjectDetailsClient";

interface PageProps {
  params: {
    locale: string;
    id: string;
  };
}

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

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const safeLocale: Locale = params.locale === "ar" ? "ar" : defaultLocale;
  const dict = getDictionary(safeLocale);
  const project = projects.find((p) => p.id === Number(params.id));
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://husseinnajah.com";

  if (!project) {
    return {
      title: dict.projects.notFound,
    };
  }

  const localized = dict.projects.items[project.id];
  const title = localized?.title || project.title;
  const des = localized?.des || project.des;

  return {
    title: `${title} | Hussein Najah`,
    description: des.slice(0, 160),
    alternates: {
      canonical: `${baseUrl}/${safeLocale}/project/${params.id}`,
      languages: {
        en: `${baseUrl}/en/project/${params.id}`,
        ar: `${baseUrl}/ar/project/${params.id}`,
        "x-default": `${baseUrl}/en/project/${params.id}`,
      },
    },
    openGraph: {
      title: `${title} | Hussein Najah`,
      description: des.slice(0, 160),
      url: `${baseUrl}/${safeLocale}/project/${params.id}`,
      images: [
        {
          url: `/project/${project.img}`,
          width: 800,
          height: 500,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Hussein Najah`,
      description: des.slice(0, 160),
      images: [`/project/${project.img}`],
    },
  };
}

export default function ProjectPage({ params }: PageProps) {
  return <ProjectDetailsClient id={params.id} />;
}
