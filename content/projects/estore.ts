import type { Project } from "./types";

const project: Project = {
  id: 3,
  slug: "estore",
  order: 5,
  title: { en: "Estore", ar: "Estore" },
  subtitle: { en: "Iraq's Leading E-commerce Platform", ar: "منصة التجارة الإلكترونية الرائدة في العراق" },
  description: {
    en: "Contributed to both web and mobile app development, upgrading the platform to React 19 and integrating Odoo ERP to manage central business data alongside compatible realtime services.",
    ar: "المساهمة في تطوير تطبيقات الويب والموبايل، وترقية المنصة إلى React 19 والربط مع نظام Odoo ERP لإدارة بيانات الأعمال المركزية والخدمات التزامنية اللحظية.",
  },
  cover: "/project/estore/cover.webp",
  gallery: [],
  tags: ["Next.js", "React Native", "Odoo", "Firebase"],
  link: "https://www.estore.iq/",
  highlights: [
    { en: "Built and maintained an online e-commerce platform for consumer electronics, mobile devices, and accessories.", ar: "بناء وصيانة منصة تجارة إلكترونية للإلكترونيات الاستهلاكية والهواتف والإكسسوارات." },
    { en: "Developed responsive product browsing, cart, and checkout features.", ar: "تطوير تصفح المنتجات وسلة التسوق وإتمام الطلب بواجهات متجاوبة." },
    { en: "Ensured platform stability, performance optimization, and usability improvements.", ar: "ضمان استقرار المنصة وتحسين الأداء وسهولة الاستخدام." },
  ],
  architecture: {
    nodes: [
      {
        id: "fe",
        type: "frontend",
        label: { en: "Next.js (React 19) & React Native", ar: "واجهة الويب وتطبيق الموبايل" },
        details: {
          en: "Cross-platform mobile apps (iOS/Android) and modern web UI built on React 19, connecting to serverless API gateways.",
          ar: "تطبيقات هواتف ذكية (iOS/Android) وواجهة ويب حديثة بالاعتماد على React 19 متصلة ببوابات برمجية سحابية.",
        },
      },
      {
        id: "api",
        type: "backend",
        label: { en: "Serverless Route Handlers", ar: "مسارات معالجة الخادم" },
        details: {
          en: "Next.js serverless functions acting as API gateways to query Odoo ERP and orchestrate compatible third-party services.",
          ar: "دوال برمجية بدون خادم (Serverless) تتصل بنظام Odoo ERP وتنظم تكامل الخدمات المتوافقة.",
        },
      },
      {
        id: "odoo",
        type: "backend",
        label: { en: "Odoo ERP System", ar: "نظام إدارة المؤسسات Odoo ERP" },
        details: {
          en: "Centralized business suite serving as the primary data engine for inventory management, product catalogs, customer CRM, and billing.",
          ar: "جناح إدارة أعمال متكامل يمثل المحرك الأساسي للمخزون، كتالوج المنتجات، فواتير المبيعات، ونظام CRM.",
        },
      },
      {
        id: "db",
        type: "database",
        label: { en: "Firebase Firestore", ar: "قاعدة بيانات Firebase Firestore" },
        details: {
          en: "NoSQL realtime database to handle compatible instant sync features such as live shopping cart updates and active auctions.",
          ar: "قاعدة بيانات فورية NoSQL لإدارة التزامن اللحظي لسلة المشتريات والمزادات النشطة للمستخدمين.",
        },
      },
      {
        id: "storage",
        type: "external",
        label: { en: "Firebase Cloud Storage", ar: "التخزين السحابي Firebase Storage" },
        details: {
          en: "Houses product images, user profile avatars, and attachment files.",
          ar: "استضافة صور المنتجات، الملفات المرفقة، وملفات تعريف العملاء.",
        },
      },
    ],
    edges: [
      { from: "fe", to: "api", label: "API Requests" },
      { from: "fe", to: "db", label: "Realtime updates" },
      { from: "api", to: "odoo", label: "XML-RPC / JSON-RPC" },
      { from: "api", to: "db", label: "Sync operations" },
      { from: "fe", to: "storage", label: "File uploads" },
    ],
  },
};

export default project;
