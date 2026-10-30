import type { Project } from "./types";

const project: Project = {
  id: 5,
  slug: "abdulkareem-charity",
  order: 7,
  title: { en: "Abdulkareem for Charity", ar: "منصة عبد الكريم الخيرية" },
  description: {
    en: "A charity website created by a set of college developers including myself, to help raise money for charity events, and any other events like environment, animals, etc.",
    ar: "موقع خيري أُنشئ بمبادرة من نخبة من المطورين الجامعيين للمساعدة في جمع التبرعات للفعاليات والأنشطة الإنسانية ورعاية البيئة والمبادرات المجتمعية.",
  },
  cover: "/project/abdulkareem-charity/cover.webp",
  gallery: [],
  tags: ["Laravel", "PHP", "MySQL", "Bootstrap"],
  repo: "https://github.com/Gruce/abdulkareem-for-charity",
  architecture: {
    nodes: [
      {
        id: "fe",
        type: "frontend",
        label: { en: "Blade UI Template", ar: "واجهة قوالب Blade المتجاوبة" },
        details: {
          en: "Responsive HTML templates rendered server-side with Bootstrap 5 design tokens, emphasizing accessibility and donor readability.",
          ar: "صفحات ويب مصيرة على الخادم بتصميم Bootstrap 5 تركز على سهولة الاستخدام وتيسير التبرع السريع.",
        },
      },
      {
        id: "api",
        type: "backend",
        label: { en: "Laravel Core Framework", ar: "إطار عمل Laravel الخلفي" },
        details: {
          en: "Monolithic Laravel application processing backend routes, donation tallies, campaign management, and admin forms.",
          ar: "تطبيق متكامل يعالج مسارات الموقع، حصيلة الحملات التبرعية، ولوحة إدارة المبادرات والأنشطة.",
        },
      },
      {
        id: "db",
        type: "database",
        label: { en: "MySQL DB Storage", ar: "قاعدة بيانات MySQL" },
        details: {
          en: "Stores event timelines, active campaigns, financial donation records, and donor audit logs.",
          ar: "حفظ سجلات التبرعات المالية، تفاصيل الحملات النشطة، والبيانات التدقيقية.",
        },
      },
      {
        id: "sms",
        type: "external",
        label: { en: "SMS Gateway API", ar: "بوابة الرسائل النصية SMS Gateway" },
        details: {
          en: "Sends thank-you verification messages and updates to donors on active campaigns.",
          ar: "إرسال رسائل تأكيد فورية للمتبرعين ورسائل شكر ومتابعة لمستجدات الحملات الإنسانية.",
        },
      },
    ],
    edges: [
      { from: "fe", to: "api", label: "Form Posts & Page Views" },
      { from: "api", to: "db", label: "Record logs & campaigns" },
      { from: "api", to: "sms", label: "Trigger SMS alerts" },
    ],
  },
};

export default project;
