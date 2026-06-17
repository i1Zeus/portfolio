import { BiCode, BiHome, BiMessage, BiUser, BiUserPlus } from "react-icons/bi";

export const navItems = [
  {
    name: "Home",
    link: "",
    icon: <BiHome className="text-white size-5" />,
  },
  {
    name: "About",
    link: "#about",
    icon: <BiUser className="text-white size-5" />,
  },
  {
    name: "Projects",
    link: "#projects",
    icon: <BiCode className="text-white size-5" />,
  },
  {
    name: "Testimonials",
    link: "#testimonials",
    icon: <BiUserPlus className="text-white size-5" />,
  },
  {
    name: "Contact",
    link: "#contact",
    icon: <BiMessage className="text-white size-5" />,
  },
];

export const words = ["collaborate", "Integrate", "partner"];

export const gridItems = [
  {
    id: 1,
    title: "I prioritize client collaboration, fostering open communication ",
    description: "",
    className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
    imgClassName: "w-full h-full",
    titleClassName: "justify-end",
    img: "/section/b1.svg",
    spareImg: "",
  },
  {
    id: 2,
    title: "I'm very flexible with time zone communications",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "",
    spareImg: "",
  },
  {
    id: 3,
    title: "My tech stack",
    description: "I constantly try to improve",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-center",
    img: "",
    spareImg: "",
  },
  {
    id: 4,
    title: "Tech enthusiast with a passion for development.",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "/grid.svg",
    spareImg: "/section/b4.svg",
  },
  {
    id: 5,
    title: "Building the future of the web with the latest technologies.",
    description: "The Inside Scoop",
    className: "md:col-span-3 md:row-span-2",
    imgClassName: "absolute right-0 bottom-0 md:w-[500px] w-60",
    titleClassName: "justify-center md:justify-start lg:justify-center",
    img: "/section/b5.svg",
    spareImg: "/grid.svg",
  },
  {
    id: 6,
    title: "Do you want to start a project together?",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-center md:max-w-full max-w-60 text-center",
    img: "",
    spareImg: "",
  },
];

export const projects = [
  {
    id: 0,
    title: "iZeus-ERP",
    des: "Independently designed, developed, and deployed a full-stack Enterprise Resource Planning (ERP) system from the ground up, integrating core business operations into a centralized platform that was successfully sold and implemented for clients.Architected scalable frontend and backend solutions to support business process automation and efficient data management.Collaborated directly with clients to gather requirements, customize workflows, and deliver solutions aligned with operational needs.",
    img: "izeus-erp.png",
    iconLists: ["re.svg", "tail.svg", "ts.svg", "p.svg"],
    link: "",
    images: [
      "/project/erp/1.png",
      "/project/erp/2.png",
      "/project/erp/3.png",
      "/project/erp/4.png",
      "/project/erp/5.png",
      "/project/erp/6.png",
    ],
    architecture: {
      nodes: [
        {
          id: "fe",
          label: "Vite + React SPA",
          type: "frontend",
          details:
            "High-performance Single Page Application built using React 19, TypeScript, and Tailwind CSS. Employs Zustand, TanStack Query, and Ant Design plots for interactive administrative, POS, and HR dashboards.",
        },
        {
          id: "api",
          label: "NestJS Modular Monolith",
          type: "backend",
          details:
            "Modular Node.js server engine built with NestJS & TypeScript. Governs JWT/Passport auth, multi-tenant workspace routing, payroll processing, PDFKit invoice rendering, and background cron schedules.",
        },
        {
          id: "db",
          label: "PostgreSQL Database",
          type: "database",
          details:
            "Relational database schema managed via Prisma ORM, capturing comprehensive records for accounting logs, multi-tenant workspaces, HR attendance, and CRM pipelines.",
        },
        {
          id: "s3",
          label: "Cloudflare R2 Storage",
          type: "database",
          details:
            "S3-compatible object storage used for storing user uploads, contracts, employee documents, and generated invoices with secure presigned URLs.",
        },
        {
          id: "ai",
          label: "AI Orchestrator",
          type: "external",
          details:
            "Integrates Google Gemini AI and OpenAI services to power intelligent automated actions, data parsing, and smart ERP features.",
        },
        {
          id: "comm",
          label: "Notification Services",
          type: "external",
          details:
            "Handles messaging via WhatsApp (Green API Client) and SMTP (Nodemailer) for real-time employee updates, task alerts, and transaction billing.",
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
  },
  {
    id: 1,
    title: "NexoGroup",
    des: "NexoGroup - E-commerce platform for selling electronics products. including pc parts and other, it's has all the modern features and security. fully responsive and mobile first. designed by me. built from the ground up where user comes first.",
    img: "nexogroup.png",
    iconLists: ["next.svg", "tail.svg", "ts.svg", "p.svg"],
    link: "https://www.nexogroup.store/en",
    images: [
      "/project/nc/1.png",
      "/project/nc/2.png",
      "/project/nc/3.png",
      "/project/nc/4.png",
    ],
    architecture: {
      nodes: [
        {
          id: "fe",
          label: "Next.js 16 Storefront",
          type: "frontend",
          details:
            "Server-Side Rendered (SSR) storefront utilizing React Server Components (RSC) and Tailwind CSS. Features optimized search, multi-step checkouts, and custom PC builders.",
        },
        {
          id: "api",
          label: "Next.js API Routes",
          type: "backend",
          details:
            "Serverless Route Handlers executing authentication (NextAuth.js), inventory validation, secure checkouts, and system integration.",
        },
        {
          id: "db",
          label: "PostgreSQL Database",
          type: "database",
          details:
            "Structured relational database storing inventory specs, purchase records, and user data, queried using Prisma Client ORM.",
        },
        {
          id: "stripe",
          label: "Stripe Gateway",
          type: "external",
          details:
            "Processes payments securely and dispatches transactional webhooks to confirm client e-commerce orders.",
        },
      ],
      edges: [
        { from: "fe", to: "api", label: "RSC Server Actions" },
        { from: "api", to: "db", label: "Prisma Client ORM" },
        { from: "fe", to: "stripe", label: "Secure Payment Session" },
        { from: "api", to: "stripe", label: "Webhook Events" },
      ],
    },
  },
  {
    id: 2,
    title: "Taeen Platform",
    des: "Taeen تعيين - Iraq's Fastest Growing Recruitment Platform. Developed a modern recruitment platform connecting job seekers with opportunities across Iraq.",
    img: "dc.svg",
    iconLists: ["re.svg", "tail.svg", "ts.svg"],
    link: "https://taeen.iq",
    images: [
      "/project/taeen/1.png",
      "/project/taeen/2.png",
      "/project/taeen/3.png",
      "/project/taeen/4.png",
      "/project/taeen/5.png",
      "/project/taeen/6.png",
      "/project/taeen/7.png",
    ],
    architecture: {
      nodes: [
        {
          id: "fe",
          label: "React 19 SPA Client",
          type: "frontend",
          details:
            "High-performance React 19 SPA powered by TypeScript and Tailwind CSS. Features candidate dashboards, multi-step resume builders, and real-time overlays.",
        },
        {
          id: "api",
          label: "NestJS Backend API",
          type: "backend",
          details:
            "Modular NestJS REST engine orchestrating recruitment logic, candidate matching models, CV parsing queues, and API routes.",
        },
        {
          id: "ws",
          label: "WebSocket Gateway",
          type: "backend",
          details:
            "NestJS gateway handling real-time WebSocket messaging for ongoing recruiter-candidate live chats and immediate dashboard notifications.",
        },
        {
          id: "db",
          label: "PostgreSQL Database",
          type: "database",
          details:
            "Relational database capturing normalized resume entities, job boards, and message threads, queried using Prisma ORM.",
        },
        {
          id: "pay",
          label: "SindiPay Gateway",
          type: "external",
          details:
            "Integrates SindiPay for localized payment processing of company subscription packages and job post postings.",
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
  },
  {
    id: 3,
    title: "Estore | Iraq's Leading E-commerce Platform",
    des: "Contributed to both web and mobile app development, upgrading the platform to React 19 and integrating Odoo ERP to manage central business data alongside compatible realtime services.",
    img: "nc.svg",
    iconLists: ["next.svg", "tail.svg", "ts.svg", "re.svg"],
    link: "https://www.estore.iq/",
    architecture: {
      nodes: [
        {
          id: "fe",
          label: "Next.js (React 19) & React Native",
          type: "frontend",
          details:
            "Cross-platform mobile apps (iOS/Android) and modern web UI built on React 19, connecting to serverless API gateways.",
        },
        {
          id: "api",
          label: "Serverless Route Handlers",
          type: "backend",
          details:
            "Next.js serverless functions acting as API gateways to query Odoo ERP and orchestrate compatible third-party services.",
        },
        {
          id: "odoo",
          label: "Odoo ERP System",
          type: "backend",
          details:
            "Centralized business suite serving as the primary data engine for inventory management, product catalogs, customer CRM, and billing.",
        },
        {
          id: "db",
          label: "Firebase Firestore",
          type: "database",
          details:
            "NoSQL realtime database to handle compatible instant sync features such as live shopping cart updates and active auctions.",
        },
        {
          id: "storage",
          label: "Firebase Cloud Storage",
          type: "external",
          details:
            "Houses product images, user profile avatars, and attachment files.",
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
  },
  {
    id: 4,
    title: "Hoster | Web Hosting Platform",
    des: "Developed web and mobile app versions to deliver a seamless hosting management experience for developers. Implemented responsive design patterns and cross-platform functionality.",
    img: "qg.svg",
    iconLists: ["re.svg", "tail.svg", "ts.svg"],
    // link: "https://www.hoster.iq",
    architecture: {
      nodes: [
        {
          id: "fe",
          label: "React Control Panel",
          type: "frontend",
          details:
            "Dashboard client that enables users to spin up VPS containers, view CPU/RAM usage graphs, and configure subdomains.",
        },
        {
          id: "api",
          label: "Host Manager Daemon",
          type: "backend",
          details:
            "Node.js daemon service communicating with local systems via Docker API, SSH agents, and process supervisors.",
        },
        {
          id: "db",
          label: "MongoDB Store",
          type: "database",
          details:
            "Stores user accounts, server resource graphs, billing entries, and dynamic server environment blueprints.",
        },
        {
          id: "docker",
          label: "Docker Daemon / VPS Node",
          type: "external",
          details:
            "Local or remote nodes hosting user environments inside isolated containers.",
        },
      ],
      edges: [
        { from: "fe", to: "api", label: "WebSocket / HTTPS logs" },
        { from: "api", to: "db", label: "Read / Write specs" },
        { from: "api", to: "docker", label: "Container Orchestration" },
      ],
    },
  },
  {
    id: 5,
    title: "Abdulkareem for Charity",
    des: "A charity website created by a set of collage developers including myself, to help rising money for a charity event, any other event like environment, animals, etc.",
    img: "ak.svg",
    iconLists: ["laravel.svg", "tail.svg", "php.svg", "mySql.svg", "boot.svg"],
    link: "https://github.com/Gruce/abdulkareem-for-charity",
    architecture: {
      nodes: [
        {
          id: "fe",
          label: "Blade UI Template",
          type: "frontend",
          details:
            "Responsive HTML templates rendered server-side with Bootstrap 5 design tokens, emphasizing accessibility and donor readability.",
        },
        {
          id: "api",
          label: "Laravel Core Framework",
          type: "backend",
          details:
            "Monolithic Laravel application processing backend routes, donation tallies, campaign management, and admin forms.",
        },
        {
          id: "db",
          label: "MySQL DB Storage",
          type: "database",
          details:
            "Stores event timelines, active campaigns, financial donation records, and donor audit logs.",
        },
        {
          id: "sms",
          label: "SMS Gateway API",
          type: "external",
          details:
            "Sends thank-you verification messages and updates to donors on active campaigns.",
        },
      ],
      edges: [
        { from: "fe", to: "api", label: "Form Posts & Page Views" },
        { from: "api", to: "db", label: "Record logs & campaigns" },
        { from: "api", to: "sms", label: "Trigger SMS alerts" },
      ],
    },
  },
];

export const testimonials = [
  {
    quote:
      "Hussein is one of the people we have interacted with. His behavior is very pleasant, and he has assisted us with many things. Whenever we needed something, he would do it for us, and whatever we requested, he would respond affirmatively. His capabilities are impressive and strong. Wishing you all the best, my dear.",
    name: "Ameer Riyadh",
    title: "App Developer",
  },
  {
    quote:
      "Well done on the project you completed. It is very well-organized, and all your work is precise. It is something truly refined and outstanding. Your attention to detail and dedication are evident in every aspect of the project, making it exceptionally impressive. Keep up the excellent work!",
    name: "Ali Issa",
    title: "Project Manager",
  },
  {
    quote:
      "I'm pleased to recommend Hussein for their exceptional skills and dedication. As the CTO and Founder of Enab Web App, I have seen firsthand Hussein's professionalism, attention to detail, and innovative thinking. He consistently delivers high-quality work and collaborates effectively with the team. Hussein's contributions have greatly enhanced our platform. I'm confident he will excel in any future role.",
    name: "Hassan Khalid",
    title: "CTO and Founder of Enab Web App",
  },
  {
    quote:
      "One of the best programmers I've worked with. Time flew by while working with him, and his future in this field is very promising and strong. His skills and dedication are unmatched, and he consistently exceeds expectations. I have no doubt that he will achieve great success in his career.",
    name: "Steven",
    title: "Senior Developer",
  },
  {
    quote:
      "Great problem solvers I've encountered. He delivers fast results with high-quality work. His efficiency and attention to detail are remarkable, and he consistently goes above and beyond to ensure the success of every project. It's a pleasure to work with someone so skilled and dedicated.",
    name: "Hassan Mohammed",
    title: "Web Developer",
  },
];

export const companies = [
  {
    id: 1,
    name: "Enab Web App",
    img: "enab.svg",
    nameImg: "enabName.svg",
  },
  {
    id: 2,
    name: "CSIT ELITES",
    img: "csit.svg",
    nameImg: "csitName.svg",
  },
  {
    id: 3,
    name: "Devhouse",
    img: "devhouse.svg",
    nameImg: "devhouseName.svg",
  },
];

export const workExperience = [
  {
    id: 1,
    title: "Web Developer",
    desc: "Assisted in the development of a web-based platform using Next.js, Vue.js and more, enhancing interactivity.",
    className: "md:col-span-2",
    thumbnail: "exp1.svg",
  },
  {
    id: 2,
    title: "UI/UX Designer & Developer",
    desc: "Designed and developed a responsive web app for a startup, focusing on user experience.",
    className: "md:col-span-2",
    thumbnail: "exp2.svg",
  },
  {
    id: 3,
    title: "Freelance Web Dev Project",
    desc: "Led the dev of a web app for a client, from initial concept to deployment.",
    className: "md:col-span-2",
    thumbnail: "exp3.svg",
  },
  {
    id: 4,
    title: "Lead Frontend Developer",
    desc: "Developed and maintained user-facing features using modern frontend technologies.",
    className: "md:col-span-2",
    thumbnail: "exp4.svg",
  },
];

export const socialMedia = [
  {
    id: 1,
    name: "GitHub",
    link: "https://github.com/i1Zeus",
    img: "git.svg",
  },
  {
    id: 2,
    name: "X Formally Twitter",
    link: "https://x.com/i1Zeus",
    img: "x.svg",
  },
  {
    id: 3,
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/i1zeus",
    img: "linkedIn.svg",
  },
  {
    id: 4,
    name: "Instagram",
    link: "https://www.instagram.com/hxg.1",
    img: "instagram.svg",
  },
];
