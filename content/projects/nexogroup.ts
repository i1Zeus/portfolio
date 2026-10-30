import type { Project } from "./types";

const project: Project = {
  id: 1,
  slug: "nexogroup",
  order: 3,
  title: { en: "NexoGroup", ar: "NexoGroup" },
  description: {
    en: "NexoGroup - E-commerce platform for selling electronics products. including pc parts and other, it's has all the modern features and security. fully responsive and mobile first. designed by me. built from the ground up where user comes first.",
    ar: "منصة تجارة إلكترونية متطورة لبيع المنتجات الإلكترونية وقطع الحواسيب وملحقاتها. تتضمن كافة الخصائص الحديثة والأمان العالي، بتصميم متجاوب بالكامل وسلس للأجهزة المحمولة صُمم وبُني من الصفر ليركز على تجربة المستخدم أولاً.",
  },
  cover: "/project/nexogroup/cover.webp",
  gallery: ["/project/nexogroup/1.webp", "/project/nexogroup/2.webp", "/project/nexogroup/3.webp", "/project/nexogroup/4.webp"],
  tags: ["Next.js", "Prisma", "PostgreSQL", "Stripe", "Tailwind"],
  link: "https://www.nexogroup.store/en",
  highlights: [
    { en: "Developed and deployed a full-featured e-commerce website for electronics and technology products.", ar: "تطوير ونشر متجر إلكتروني متكامل المزايا للإلكترونيات والمنتجات التقنية." },
    { en: "Implemented product listings, categories, filtering, shopping cart, and checkout functionality.", ar: "تنفيذ عرض المنتجات والتصنيفات والتصفية وسلة التسوق وإتمام الطلب." },
    { en: "Optimized performance, responsiveness, and modern UI/UX for a smooth shopping experience.", ar: "تحسين الأداء والتجاوب وتصميم الواجهات لتجربة تسوق سلسة." },
  ],
  architecture: {
    nodes: [
      {
        id: "fe",
        type: "frontend",
        label: { en: "Next.js 16 Storefront", ar: "واجهة المتجر Next.js 16 Storefront" },
        details: {
          en: "Server-Side Rendered (SSR) storefront utilizing React Server Components (RSC) and Tailwind CSS. Features optimized search, multi-step checkouts, and custom PC builders.",
          ar: "واجهة متجر معتمدة على التصيير من جانب الخادم (SSR) عبر React Server Components و Tailwind CSS، تدعم البحث الفوري والسريع ومجمع أجهزة الحواسيب المخصص.",
        },
      },
      {
        id: "api",
        type: "backend",
        label: { en: "Next.js API Routes", ar: "مسارات الخادم السحابي API Routes" },
        details: {
          en: "Serverless Route Handlers executing authentication (NextAuth.js), inventory validation, secure checkouts, and system integration.",
          ar: "معالجات خادم تعمل بالبنية اللامركزية (Serverless) لتنفيذ المصادقة وإدارة المخزون والتحقق من الطلبات المكتملة.",
        },
      },
      {
        id: "db",
        type: "database",
        label: { en: "PostgreSQL Database", ar: "قاعدة بيانات PostgreSQL" },
        details: {
          en: "Structured relational database storing inventory specs, purchase records, and user data, queried using Prisma Client ORM.",
          ar: "قاعدة بيانات علائقية تسجل مواصفات المنتجات وسجلات المبيعات وحسابات المستخدمين بالاعتماد على Prisma Client ORM.",
        },
      },
      {
        id: "stripe",
        type: "external",
        label: { en: "Stripe Gateway", ar: "بوابة الدفع الإلكتروني Stripe" },
        details: {
          en: "Processes payments securely and dispatches transactional webhooks to confirm client e-commerce orders.",
          ar: "معالجة عمليات الدفع البنكي بأعلى درجات الأمان واستقبال أحداث Webhooks لتأكيد طلبيات العملاء آلياً.",
        },
      },
    ],
    edges: [
      { from: "fe", to: "api", label: "RSC Server Actions" },
      { from: "api", to: "db", label: "Prisma Client ORM" },
      { from: "fe", to: "stripe", label: "Secure Payment Session" },
      { from: "api", to: "stripe", label: "Webhook Events" },
    ],
  },
};

export default project;
