import type { Project } from "./types";

const project: Project = {
  id: 4,
  slug: "hoster",
  order: 6,
  title: { en: "Hoster", ar: "Hoster" },
  subtitle: { en: "Web Hosting Platform", ar: "منصة الاستضافة السحابية" },
  description: {
    en: "Developed web and mobile app versions to deliver a seamless hosting management experience for developers. Implemented responsive design patterns and cross-platform functionality.",
    ar: "تطوير نسخة الويب وتطبيق الهاتف لتوفير تجربة سلسة ومتكاملة للمطورين في إدارة الخوادم والاستضافات، مع تصميم تفاعلي مخصص وسريع الاستجابة.",
  },
  cover: "/project/hoster/cover.webp",
  gallery: [],
  tags: ["React", "Node.js", "Docker", "MongoDB"],
  architecture: {
    nodes: [
      {
        id: "fe",
        type: "frontend",
        label: { en: "React Control Panel", ar: "لوحة تحكم المطورين React" },
        details: {
          en: "Dashboard client that enables users to spin up VPS containers, view CPU/RAM usage graphs, and configure subdomains.",
          ar: "واجهة مستخدم تتيح للمطورين تشغيل حاويات السيرفرات ومراقبة استهلاك المعالج والذاكرة وإدارة النطاقات.",
        },
      },
      {
        id: "api",
        type: "backend",
        label: { en: "Host Manager Daemon", ar: "خدمة إدارة الخوادم Node.js Daemon" },
        details: {
          en: "Node.js daemon service communicating with local systems via Docker API, SSH agents, and process supervisors.",
          ar: "خدمة داخلية تتواصل مع الأنظمة السحابية عبر Docker API ووكلاء SSH لمتابعة العمليات والحاويات.",
        },
      },
      {
        id: "db",
        type: "database",
        label: { en: "MongoDB Store", ar: "مستودع بيانات MongoDB" },
        details: {
          en: "Stores user accounts, server resource graphs, billing entries, and dynamic server environment blueprints.",
          ar: "حفظ سجلات الحسابات، قراءات الأداء السحابية، والبيانات التكوينية لبيئات الاستضافة.",
        },
      },
      {
        id: "docker",
        type: "external",
        label: { en: "Docker Daemon / VPS Node", ar: "عقد الخوادم السحابية Docker / VPS" },
        details: {
          en: "Local or remote nodes hosting user environments inside isolated containers.",
          ar: "عقد سحابية معزولة تستضيف بيئات تشغيل المطورين داخل حاويات مستقلة وآمنة.",
        },
      },
    ],
    edges: [
      { from: "fe", to: "api", label: "WebSocket / HTTPS logs" },
      { from: "api", to: "db", label: "Read / Write specs" },
      { from: "api", to: "docker", label: "Container Orchestration" },
    ],
  },
};

export default project;
