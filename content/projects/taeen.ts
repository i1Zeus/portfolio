import type { Project } from "./types";

const project: Project = {
  id: 2,
  slug: "taeen",
  order: 4,
  title: { en: "Taeen Platform", ar: "منصة تعيين Taeen" },
  description: {
    en: "Taeen تعيين - Iraq's Fastest Growing Recruitment Platform. Developed a modern recruitment platform connecting job seekers with opportunities across Iraq.",
    ar: "منصة تعيين (Taeen) - منصة التوظيف الأسرع نمواً في العراق. تطوير منصة توظيف تفاعلية عصرية تربط الباحثين عن عمل بالفرص الوظيفية في كبرى الشركات والمؤسسات العراقية.",
  },
  cover: "/project/taeen/cover.webp",
  gallery: ["/project/taeen/1.webp", "/project/taeen/2.webp", "/project/taeen/3.webp", "/project/taeen/4.webp", "/project/taeen/5.webp", "/project/taeen/6.webp", "/project/taeen/7.webp"],
  tags: ["React", "NestJS", "WebSocket", "PostgreSQL", "SindiPay"],
  link: "https://taeen.iq",
  highlights: [
    { en: "Designed, developed, and launched a professional job posting platform to showcase services and improve online visibility.", ar: "تصميم وتطوير وإطلاق منصة احترافية لنشر الوظائف لعرض الخدمات وتعزيز الحضور على الإنترنت." },
    { en: "Built responsive layouts with intuitive navigation and structured content presentation.", ar: "بناء واجهات متجاوبة بتنقل سهل وعرض منظم للمحتوى." },
    { en: "Focused on user experience, accessibility, and engagement across all devices.", ar: "التركيز على تجربة المستخدم وسهولة الوصول والتفاعل على جميع الأجهزة." },
  ],
  architecture: {
    nodes: [
      {
        id: "fe",
        type: "frontend",
        label: { en: "React 19 SPA Client", ar: "تطبيق الواجهة React 19 Client" },
        details: {
          en: "High-performance React 19 SPA powered by TypeScript and Tailwind CSS. Features candidate dashboards, multi-step resume builders, and real-time overlays.",
          ar: "تطبيق واجهة ويب متطور بتقنيات React 19 و TypeScript و Tailwind CSS، يوفر لوحة تحكم للمرشحين وأداة ذكية لبناء السير الذاتية.",
        },
      },
      {
        id: "api",
        type: "backend",
        label: { en: "NestJS Backend API", ar: "خادم واجهات البرمجة NestJS Backend" },
        details: {
          en: "Modular NestJS REST engine orchestrating recruitment logic, candidate matching models, CV parsing queues, and API routes.",
          ar: "محرك REST متكامل ينظم عمليات التوظيف ومطابقة المرشحين ومعالجة ملفات السير الذاتية.",
        },
      },
      {
        id: "ws",
        type: "backend",
        label: { en: "WebSocket Gateway", ar: "بوابة الاتصال اللحظي WebSocket" },
        details: {
          en: "NestJS gateway handling real-time WebSocket messaging for ongoing recruiter-candidate live chats and immediate dashboard notifications.",
          ar: "بوابة اتصالات فورية للمحادثات المباشرة بين مسؤولي التوظيف والباحثين عن عمل والإشعارات الحية.",
        },
      },
      {
        id: "db",
        type: "database",
        label: { en: "PostgreSQL Database", ar: "قاعدة بيانات PostgreSQL" },
        details: {
          en: "Relational database capturing normalized resume entities, job boards, and message threads, queried using Prisma ORM.",
          ar: "حفظ شامل ومؤمن لبيانات السير الذاتية، إعلانات الوظائف، وسجلات الرسائل المتبادلة.",
        },
      },
      {
        id: "pay",
        type: "external",
        label: { en: "SindiPay Gateway", ar: "بوابة الدفع المحلي SindiPay" },
        details: {
          en: "Integrates SindiPay for localized payment processing of company subscription packages and job post postings.",
          ar: "الربط مع بوابة سنديباي للدفع المحلي للاشتراكات وباقات إعلانات الوظائف للشركات.",
        },
      },
    ],
    edges: [
      { from: "fe", to: "api", label: "REST HTTPS / Axios" },
      { from: "fe", to: "ws", label: "WebSocket connection" },
      { from: "api", to: "db", label: "Prisma Client ORM" },
      { from: "ws", to: "db", label: "Log chats & sessions" },
      { from: "api", to: "pay", label: "Job Packages Invoicing" },
    ],
  },
};

export default project;
