import type { Project } from "./types";

const project: Project = {
  id: 6,
  slug: "ima-portal",
  order: 1,
  title: { en: "IMA Portal", ar: "بوابة نقابة الأطباء" },
  subtitle: { en: "Iraqi Medical Association — Basra Branch", ar: "نقابة أطباء العراق — فرع البصرة" },
  description: {
    en: "Designed and built the official digital portal of the Iraqi Medical Association's Basra branch, a full-stack platform that moves the association's services online: an accredited doctor directory with a profile page and QR code for every doctor, in-person electronic exams with auto-graded multiple choice, seminars and courses with CME credit tracking, secure electronic elections, surveys, research and medical book management, and digital certificates with admin approval and QR verification. Bilingual Arabic/English with full RTL/LTR support and light and dark themes.",
    ar: "تصميم وبناء البوابة الرقمية الرسمية لنقابة أطباء العراق - فرع البصرة، منصة متكاملة تنقل خدمات النقابة إلى العالم الرقمي: دليل للأطباء المعتمدين مع صفحة شخصية ورمز QR لكل طبيب، امتحانات إلكترونية حضورية بتصحيح آلي لأسئلة الاختيار من متعدد، ندوات ودورات مع احتساب نقاط التعليم الطبي المستمر (CME)، انتخابات إلكترونية آمنة، استبيانات، إدارة البحوث والكتب العلمية، وشهادات إلكترونية بموافقة إدارية وتحقق عبر رمز QR. تدعم المنصة العربية والإنجليزية مع اتجاهي RTL/LTR والوضعين الفاتح والداكن.",
  },
  cover: "/project/ima-portal/cover.webp",
  gallery: ["/project/ima-portal/1.webp", "/project/ima-portal/2.webp", "/project/ima-portal/3.webp", "/project/ima-portal/4.webp", "/project/ima-portal/5.webp", "/project/ima-portal/6.webp"],
  tags: ["TanStack Start", "PostgreSQL", "Prisma", "Better Auth", "Socket.IO", "Cloudflare R2"],
  link: "https://ida.basrahdocassos.iq/",
  architecture: {
    nodes: [
      {
        id: "fe",
        type: "frontend",
        label: { en: "TanStack Start (React SSR)", ar: "TanStack Start (React SSR)" },
        details: {
          en: "Server-rendered React app on TanStack Start with file-based routing, Tailwind CSS, Arabic/English i18n with RTL/LTR switching, and light and dark themes.",
          ar: "تطبيق React مُصيَّر على الخادم باستخدام TanStack Start مع توجيه قائم على الملفات و Tailwind CSS ودعم العربية والإنجليزية مع التبديل بين RTL و LTR والوضعين الفاتح والداكن.",
        },
      },
      {
        id: "api",
        type: "backend",
        label: { en: "Server Functions", ar: "دوال الخادم" },
        details: {
          en: "Type-safe TanStack Start server functions for doctor accreditation, exam sessions and grading, CME credits, elections, surveys and certificate issuance with QR verification.",
          ar: "دوال خادم آمنة الأنواع في TanStack Start لاعتماد الأطباء وجلسات الامتحانات والتصحيح ونقاط CME والانتخابات والاستبيانات وإصدار الشهادات مع التحقق عبر QR.",
        },
      },
      {
        id: "auth",
        type: "backend",
        label: { en: "Better Auth", ar: "Better Auth" },
        details: {
          en: "Session-based authentication with role-based access for doctors, students, examiners and association administrators.",
          ar: "مصادقة قائمة على الجلسات مع صلاحيات حسب الدور للأطباء والطلبة والممتحنين وإدارة النقابة.",
        },
      },
      {
        id: "rt",
        type: "backend",
        label: { en: "Socket.IO Realtime", ar: "Socket.IO للتحديث اللحظي" },
        details: {
          en: "Real-time channel that pushes live updates to exam sessions, elections and admin dashboards.",
          ar: "قناة لحظية تدفع التحديثات المباشرة إلى جلسات الامتحانات والانتخابات ولوحات الإدارة.",
        },
      },
      {
        id: "db",
        type: "database",
        label: { en: "PostgreSQL + Prisma", ar: "PostgreSQL + Prisma" },
        details: {
          en: "Relational schema managed with Prisma ORM for doctors, specialties, exams, CME ledgers, elections, surveys and certificates.",
          ar: "قاعدة بيانات علائقية تُدار عبر Prisma ORM للأطباء والتخصصات والامتحانات وسجلات CME والانتخابات والاستبيانات والشهادات.",
        },
      },
      {
        id: "r2",
        type: "database",
        label: { en: "Cloudflare R2 Storage", ar: "تخزين Cloudflare R2" },
        details: {
          en: "Object storage for accreditation documents, research papers, medical books and generated certificates.",
          ar: "تخزين كائنات لوثائق الاعتماد والبحوث والكتب الطبية والشهادات المُولَّدة.",
        },
      },
    ],
    edges: [
      { from: "fe", to: "api", label: "Server function calls" },
      { from: "fe", to: "rt", label: "WebSocket events" },
      { from: "api", to: "auth", label: "Session & role checks" },
      { from: "api", to: "db", label: "Prisma Client" },
      { from: "api", to: "r2", label: "S3-compatible uploads" },
    ],
  },
};

export default project;
