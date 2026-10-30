import type { Localized } from "./projects/types";

/**
 * CV content, transcribed from public/hussein-najah-cv.pdf (Arabic translated).
 * Phone, gender and birth month are intentionally left out of the web version.
 * Dates are "YYYY-MM"; update this file and the PDF together.
 */

export interface CvJob {
  role: Localized;
  company: string;
  location: Localized;
  start: string;
  end: string;
  bullets: Localized[];
}

export interface CvProject {
  name: string;
  kind: Localized;
  url: string;
  /** Portfolio case-study slug, when one exists. */
  slug?: string;
  bullets: Localized[];
}

export const cv = {
  name: { en: "Hussein Najah Shaban", ar: "حسين نجاح شعبان" } as Localized,
  title: { en: "Software Engineer", ar: "مهندس برمجيات" } as Localized,
  location: { en: "Basra, Iraq", ar: "البصرة، العراق" } as Localized,
  email: "husseinnajah.it@gmail.com",
  website: "https://www.hussein-najah.com",
  pdf: "/hussein-najah-cv.pdf",

  summary: {
    en: "Results-driven Full Stack Web Developer with over 5 years of experience delivering high-performance, scalable, and user-centric web applications. At DevHouse, I play a key role across front-end, back-end, and UI/UX, turning complex ideas into polished digital experiences.",
    ar: "مطور ويب متكامل (Full Stack) يركّز على النتائج، بخبرة تزيد على 5 سنوات في تقديم تطبيقات ويب عالية الأداء وقابلة للتوسع ومحورها المستخدم. في DevHouse أؤدي دوراً أساسياً في الواجهات الأمامية والأنظمة الخلفية وتصميم UI/UX، وأحوّل الأفكار المعقدة إلى تجارب رقمية متقنة.",
  } as Localized,

  experience: [
    {
      role: { en: "Software Engineer", ar: "مهندس برمجيات" },
      company: "Devhouse",
      location: { en: "Basra, Iraq", ar: "البصرة، العراق" },
      start: "2024-12",
      end: "2026-01",
      bullets: [
        {
          en: "Designed and implemented multiple web systems in collaboration with UI/UX designers and cross-functional teams.",
          ar: "تصميم وتنفيذ عدة أنظمة ويب بالتعاون مع مصممي UI/UX وفرق متعددة التخصصات.",
        },
        {
          en: "Translated business requirements into scalable, maintainable solutions while ensuring smooth system integration.",
          ar: "تحويل متطلبات العمل إلى حلول قابلة للتوسع والصيانة مع ضمان تكامل سلس بين الأنظمة.",
        },
        {
          en: "Contributed to improving development workflows and code quality across projects.",
          ar: "المساهمة في تحسين سير عمل التطوير وجودة الشيفرة في المشاريع.",
        },
      ],
    },
    {
      role: { en: "Software Engineer", ar: "مهندس برمجيات" },
      company: "Gulf Falcon General Trading LLC",
      location: { en: "Basra, Iraq", ar: "البصرة، العراق" },
      start: "2024-05",
      end: "2024-08",
      bullets: [
        {
          en: "Managed and maintained company websites and digital services as a Web Administrator.",
          ar: "إدارة وصيانة مواقع الشركة وخدماتها الرقمية بصفتي مدير مواقع الويب.",
        },
        {
          en: "Developed and enhanced internal and external web solutions to support business operations.",
          ar: "تطوير وتحسين حلول ويب داخلية وخارجية لدعم عمليات الشركة.",
        },
        {
          en: "Ensured website reliability, performance, and content updates.",
          ar: "ضمان موثوقية المواقع وأدائها وتحديث محتواها.",
        },
      ],
    },
    {
      role: { en: "Software Developer (Front-End)", ar: "مطور برمجيات (واجهات أمامية)" },
      company: "LVN",
      location: { en: "Basra, Iraq", ar: "البصرة، العراق" },
      start: "2023-09",
      end: "2024-01",
      bullets: [
        {
          en: "Worked as a front-end developer to improve and modernize the company's system interfaces.",
          ar: "العمل مطوراً للواجهات الأمامية لتحسين واجهات أنظمة الشركة وتحديثها.",
        },
        {
          en: "Implemented responsive UI components and enhanced user experience across platforms.",
          ar: "تنفيذ مكونات واجهة متجاوبة وتحسين تجربة المستخدم على مختلف المنصات.",
        },
        {
          en: "Collaborated with team members to deliver features aligned with project goals.",
          ar: "التعاون مع أعضاء الفريق لتسليم مزايا تتوافق مع أهداف المشروع.",
        },
      ],
    },
    {
      role: { en: "Full Stack Developer (Freelance)", ar: "مطور ويب متكامل (عمل حر)" },
      company: "Freelance",
      location: { en: "Globally", ar: "عن بُعد، عالمياً" },
      start: "2024-12",
      end: "2026-01",
      bullets: [
        {
          en: "Delivered full-stack web applications for local and international clients.",
          ar: "تسليم تطبيقات ويب متكاملة لعملاء محليين ودوليين.",
        },
        {
          en: "Handled end-to-end development including UI/UX design, front-end, back-end, and database integration.",
          ar: "تولي التطوير من البداية إلى النهاية، من تصميم UI/UX والواجهات الأمامية إلى الأنظمة الخلفية وقواعد البيانات.",
        },
        {
          en: "Worked directly with clients to gather requirements, propose solutions, and deliver on time.",
          ar: "العمل مباشرة مع العملاء لجمع المتطلبات واقتراح الحلول والتسليم في الموعد.",
        },
      ],
    },
  ] as CvJob[],

  projects: [
    {
      name: "Taeen Platform",
      kind: { en: "Job Posting Website", ar: "منصة نشر وظائف" },
      url: "https://taeen.iq",
      slug: "taeen",
      bullets: [
        {
          en: "Designed, developed, and launched a professional job posting platform to showcase services and improve online visibility.",
          ar: "تصميم وتطوير وإطلاق منصة احترافية لنشر الوظائف لعرض الخدمات وتعزيز الحضور على الإنترنت.",
        },
      ],
    },
    {
      name: "Nexogroup Store",
      kind: { en: "E-Commerce Platform", ar: "منصة تجارة إلكترونية" },
      url: "https://www.nexogroup.store",
      slug: "nexogroup",
      bullets: [
        {
          en: "Implemented product listings, categories, filtering, shopping cart, and checkout functionality.",
          ar: "تنفيذ عرض المنتجات والتصنيفات والتصفية وسلة التسوق وإتمام الطلب.",
        },
      ],
    },
    {
      name: "E-Store",
      kind: { en: "E-Commerce Website", ar: "متجر إلكتروني" },
      url: "https://www.estore.iq",
      slug: "estore",
      bullets: [
        {
          en: "Built and maintained an online e-commerce platform for consumer electronics, mobile devices, and accessories.",
          ar: "بناء وصيانة منصة تجارة إلكترونية للإلكترونيات الاستهلاكية والهواتف والإكسسوارات.",
        },
      ],
    },
    {
      name: "Devhouse Company Website",
      kind: { en: "Corporate Portfolio", ar: "موقع شركة" },
      url: "https://dev-house.com",
      bullets: [
        {
          en: "Designed and developed a professional company website showcasing services, portfolio, and brand identity.",
          ar: "تصميم وتطوير موقع احترافي للشركة يعرض خدماتها وأعمالها وهويتها.",
        },
      ],
    },
  ] as CvProject[],

  skills: [
    "JavaScript (ES6+)",
    "TypeScript",
    "React.js",
    "Next.js",
    "Tailwind CSS",
    "HTML5, CSS3",
    "Node.js",
    "NestJS",
    "Express.js",
    "RESTful APIs",
    "Authentication & Authorization",
    "PostgreSQL",
    "Prisma ORM",
    "Git & GitHub",
    "Figma",
    "Echo API",
  ],

  languages: [
    { name: { en: "Arabic", ar: "العربية" }, level: { en: "Native", ar: "اللغة الأم" } },
    {
      name: { en: "English", ar: "الإنجليزية" },
      level: { en: "Advanced (Professional Working Proficiency)", ar: "متقدم (كفاءة مهنية)" },
    },
    { name: { en: "Persian", ar: "الفارسية" }, level: { en: "Beginner", ar: "مبتدئ" } },
  ] as { name: Localized; level: Localized }[],

  education: [
    {
      degree: {
        en: "Bachelor's Degree in Computer Science and Information Technology",
        ar: "بكالوريوس علوم الحاسوب وتكنولوجيا المعلومات",
      },
      school: {
        en: "College of Computer Science and Information Technology",
        ar: "كلية علوم الحاسوب وتكنولوجيا المعلومات",
      },
      start: "2021",
      end: "2025",
      notes: [
        { en: "Graduated with distinction.", ar: "التخرج بدرجة امتياز." },
        { en: "Ranked 2nd place in college.", ar: "المرتبة الثانية على الكلية." },
      ],
    },
  ] as { degree: Localized; school: Localized; start: string; end: string; notes: Localized[] }[],

  certificates: [
    {
      name: "Front End Development Libraries",
      issuer: "freeCodeCamp",
      url: "https://www.freecodecamp.org/certification/i1zeus/front-end-development-libraries",
    },
    {
      name: "JavaScript Algorithms and Data Structures",
      issuer: "freeCodeCamp",
      url: "https://www.freecodecamp.org/certification/i1zeus/javascript-algorithms-and-data-structures",
    },
    {
      name: "Responsive Web Design",
      issuer: "freeCodeCamp",
      url: "https://www.freecodecamp.org/certification/i1zeus/responsive-web-design",
    },
    { name: "IOSH Managing Safely", issuer: "IOSH UK" },
    { name: "English Certificate — C2 Proficient", issuer: "EF SET", url: "https://cert.efset.org/pYLRVY" },
  ] as { name: string; issuer: string; url?: string }[],
};

/** "2024-12" → "Dec 2024" / "ديسمبر 2024"; a bare year is returned as-is. */
export const formatCvDate = (value: string, locale: "en" | "ar") => {
  const [year, month] = value.split("-").map(Number);
  if (!month) return String(year);
  return new Intl.DateTimeFormat(locale === "ar" ? "ar-IQ-u-nu-latn" : "en-GB", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, 1)));
};
