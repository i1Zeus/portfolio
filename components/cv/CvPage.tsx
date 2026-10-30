import Link from "next/link";
import { cv, formatCvDate } from "@/content/cv";
import { getDictionary } from "@/data/dictionaries";
import type { Locale } from "@/data/locales";
import SiteEffects from "@/components/home/SiteEffects";
import SiteFooter from "@/components/home/SiteFooter";
import SiteHeader from "@/components/home/SiteHeader";
import { Arrow, KeyValue, SplitText, sectionPad } from "@/components/home/primitives";
import { cn } from "@/utils/cn";
import PrintButton from "./PrintButton";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="grid grid-cols-1 gap-6 border-t border-line py-10 md:grid-cols-12 md:gap-8 md:py-14 print:py-5">
    <h2 className="label text-paper md:col-span-3">{title}</h2>
    <div className="md:col-span-9">{children}</div>
  </section>
);

const range = (start: string, end: string, locale: Locale) =>
  `${formatCvDate(start, locale)} — ${formatCvDate(end, locale)}`;

export default function CvPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const c = dict.cv;
  const host = new URL(cv.website).host.replace("www.", "");

  return (
    <>
      <SiteEffects />
      <SiteHeader />
      <main className={cn("min-h-screen bg-ink pb-20 pt-28 text-paper md:pt-32 print:pt-0", sectionPad)}>
        <header className="pb-10 md:pb-14">
          <p className="label">{c.title}</p>
          <SplitText as="h1" text={cv.name[locale]} className="display mt-6 block text-[clamp(3rem,9vw,8.5rem)] print:text-5xl" />
          <p className="heading mt-4 text-2xl text-paper/80 md:text-3xl">{cv.title[locale]}</p>
          <p className="label mt-5 flex flex-wrap gap-x-4 gap-y-2">
            <span>{cv.location[locale]}</span>
            <a href={`mailto:${cv.email}`} className="hover:text-paper" dir="ltr">
              {cv.email}
            </a>
            <a href={cv.website} className="hover:text-paper" dir="ltr">
              {host}
            </a>
          </p>
          <div className="mt-8 flex flex-wrap gap-2" data-print-hide>
            <a href={cv.pdf} download className="btn-solid">
              {c.downloadPdf} ↓
            </a>
            <PrintButton label={c.print} />
          </div>
        </header>

        <Section title={c.summary}>
          <p className="max-w-3xl text-lg leading-relaxed text-paper/80">{cv.summary[locale]}</p>
        </Section>

        <Section title={c.experience}>
          <ol className="space-y-10 print:space-y-5">
            {cv.experience.map((job) => (
              <li key={`${job.company}-${job.start}`} className="print:break-inside-avoid">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="heading text-2xl md:text-3xl">{job.role[locale]}</h3>
                  <span className="label">{range(job.start, job.end, locale)}</span>
                </div>
                <p className="label mt-1">
                  {job.company} · {job.location[locale]}
                </p>
                <ul className="mt-4 space-y-2 leading-relaxed text-paper/75">
                  {job.bullets.map((bullet, i) => (
                    <li key={i} className="flex gap-3">
                      <span aria-hidden="true" className="text-paper/60">
                        —
                      </span>
                      {bullet[locale]}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </Section>

        <Section title={c.projects}>
          <ul className="grid gap-4 md:grid-cols-2">
            {cv.projects.map((project) => (
              <li key={project.name} className="crosshair border border-line p-5 print:break-inside-avoid">
                <h3 className="heading text-2xl">{project.name}</h3>
                <p className="label mt-1">{project.kind[locale]}</p>
                {project.bullets.map((bullet, i) => (
                  <p key={i} className="mt-3 text-sm leading-relaxed text-paper/70">
                    {bullet[locale]}
                  </p>
                ))}
                <p className="mt-4 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.12em]">
                  <a href={project.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-paper/70 hover:text-paper" dir="ltr">
                    {new URL(project.url).host.replace("www.", "")} <Arrow />
                  </a>
                  {project.slug && (
                    <Link href={`/${locale}/project/${project.slug}`} className="text-paper/70 hover:text-paper" data-print-hide>
                      {c.caseStudy} →
                    </Link>
                  )}
                </p>
              </li>
            ))}
          </ul>
        </Section>

        <Section title={c.skills}>
          <ul className="flex flex-wrap gap-1.5">
            {cv.skills.map((skill) => (
              <li key={skill} className="chip">
                {skill}
              </li>
            ))}
          </ul>
        </Section>

        <Section title={c.languages}>
          <div className="max-w-xl">
            {cv.languages.map((lang) => (
              <KeyValue key={lang.name.en} k={lang.name[locale]} v={lang.level[locale]} />
            ))}
          </div>
        </Section>

        <Section title={c.education}>
          {cv.education.map((edu) => (
            <div key={edu.degree.en}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h3 className="heading text-2xl md:text-3xl">{edu.degree[locale]}</h3>
                <span className="label" dir="ltr">
                  {edu.start} — {edu.end}
                </span>
              </div>
              <p className="label mt-1">{edu.school[locale]}</p>
              <ul className="mt-4 space-y-2 text-paper/75">
                {edu.notes.map((note, i) => (
                  <li key={i} className="flex gap-3">
                    <span aria-hidden="true" className="text-paper/60">
                      —
                    </span>
                    {note[locale]}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Section>

        <Section title={c.certificates}>
          <ul className="border-t border-line">
            {cv.certificates.map((cert) => (
              <li key={cert.name} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-line py-3">
                <span dir="ltr" className="text-paper/85">
                  {cert.name}
                </span>
                <span className="label flex items-center gap-4">
                  <span>{cert.issuer}</span>
                  {cert.url && (
                    <a href={cert.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-paper" data-print-hide>
                      {c.verify} <Arrow />
                    </a>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
