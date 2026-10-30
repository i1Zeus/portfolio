import type { Project } from "./types";

const project: Project = {
  id: 0,
  slug: "izeus-erp",
  order: 2,
  title: { en: "iZeus-ERP", ar: "iZeus-ERP" },
  description: {
    en: "Independently designed, developed, and deployed a full-stack Enterprise Resource Planning (ERP) system from the ground up, integrating core business operations into a centralized platform that was successfully sold and implemented for clients. Architected scalable frontend and backend solutions to support business process automation and efficient data management. Collaborated directly with clients to gather requirements, customize workflows, and deliver solutions aligned with operational needs.",
    ar: "تصميم وتطوير ونشر نظام متكامل لإدارة وتخطيط موارد المؤسسات (ERP) من الصفر، لدمج العمليات التشغيلية الأساسية للأعمال في منصة سحابية مركزية تم بيعها وتنفيذها للعملاء بنجاح. تصميم حلول برمجية قابلة للتوسع على مستوى الواجهة والخلفية لأتمتة العمليات وإدارة البيانات بكفاءة، والتعاون المباشر مع العملاء لتخصيص دورات العمل بما يتوافق بدقة مع احتياجاتهم التشغيلية.",
  },
  cover: "/project/izeus-erp/cover.webp",
  gallery: ["/project/izeus-erp/1.webp", "/project/izeus-erp/2.webp", "/project/izeus-erp/3.webp", "/project/izeus-erp/4.webp", "/project/izeus-erp/5.webp", "/project/izeus-erp/6.webp"],
  tags: ["React", "NestJS", "PostgreSQL", "Prisma", "Cloudflare R2"],
  architecture: {
    nodes: [
      {
        id: "fe",
        type: "frontend",
        label: { en: "Vite + React SPA", ar: "تطبيق أحادي الصفحة (Vite + React SPA)" },
        details: {
          en: "High-performance Single Page Application built using React 19, TypeScript, and Tailwind CSS. Employs Zustand, TanStack Query, and Ant Design plots for interactive administrative, POS, and HR dashboards.",
          ar: "تطبيق واجهة مستخدم فائق السرعة مبني باستخدام React 19 و TypeScript و Tailwind CSS. يعتمد على Zustand و TanStack Query و Ant Design Plots للوحات التحكم الإدارية ونقاط البيع (POS) وإدارة الموارد البشرية.",
        },
      },
      {
        id: "api",
        type: "backend",
        label: { en: "NestJS Modular Monolith", ar: "محرك الخادم المركزي (NestJS Modular Monolith)" },
        details: {
          en: "Modular Node.js server engine built with NestJS & TypeScript. Governs JWT/Passport auth, multi-tenant workspace routing, payroll processing, PDFKit invoice rendering, and background cron schedules.",
          ar: "محرك خادم معياري مبني بإطار عمل NestJS و TypeScript. يتولى التوثيق (JWT/Passport)، توجيه مساحات العمل متعددة المستأجرين (Multi-Tenant)، معالجة الرواتب، توليد فواتير PDF عبر PDFKit، وجدولة المهام الدورية.",
        },
      },
      {
        id: "db",
        type: "database",
        label: { en: "PostgreSQL Database", ar: "قاعدة بيانات PostgreSQL" },
        details: {
          en: "Relational database schema managed via Prisma ORM, capturing comprehensive records for accounting logs, multi-tenant workspaces, HR attendance, and CRM pipelines.",
          ar: "مخطط قاعدة بيانات علائقية مدار عبر Prisma ORM، يحفظ السجلات المحاسبية الشاملة، بيانات الحضور والانصراف، وإدارة علاقات العملاء (CRM).",
        },
      },
      {
        id: "s3",
        type: "database",
        label: { en: "Cloudflare R2 Storage", ar: "تخزين الملفات السحابي Cloudflare R2" },
        details: {
          en: "S3-compatible object storage used for storing user uploads, contracts, employee documents, and generated invoices with secure presigned URLs.",
          ar: "تخزين سحابي متوافق مع S3 مخصص لرفع وحفظ العقود، وثائق الموظفين، والفواتير الرقمية بروابط مشفرة ومؤقتة آمنة.",
        },
      },
      {
        id: "ai",
        type: "external",
        label: { en: "AI Orchestrator", ar: "منسق الذكاء الاصطناعي (AI Orchestrator)" },
        details: {
          en: "Integrates Google Gemini AI and OpenAI services to power intelligent automated actions, data parsing, and smart ERP features.",
          ar: "دمج خدمات Google Gemini AI و OpenAI لتوفير أتمتة ذكية، وتحليل البيانات المستخرجة، ومميزات الـ ERP التنبؤية.",
        },
      },
      {
        id: "comm",
        type: "external",
        label: { en: "Notification Services", ar: "خدمات الإشعارات والمراسلة" },
        details: {
          en: "Handles messaging via WhatsApp (Green API Client) and SMTP (Nodemailer) for real-time employee updates, task alerts, and transaction billing.",
          ar: "إدارة إرسال الإشعارات الفورية للموظفين والعملاء عبر واتساب (Green API) والبريد الإلكتروني عبر خوادم SMTP.",
        },
      },
    ],
    edges: [
      { from: "fe", to: "api", label: "REST HTTPS / Axios" },
      { from: "api", to: "db", label: "Prisma Client ORM" },
      { from: "api", to: "s3", label: "AWS S3 SDK / Presigner" },
      { from: "api", to: "ai", label: "Gemini / OpenAI API Calls" },
      { from: "api", to: "comm", label: "Nodemailer & WhatsApp Webhooks" },
    ],
  },
};

export default project;
