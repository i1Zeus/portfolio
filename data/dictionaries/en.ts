import { Dictionary } from "./types";

export const en: Dictionary = {
  meta: {
    title: "Hussein Najah | Full-Stack Software Engineer & UI/UX Developer",
    description:
      "Modern & Minimal Web Developer Portfolio. Hussein Najah is a dedicated Full-Stack Software Engineer & UI/UX Developer based in Iraq, specializing in Next.js, React, TypeScript, and high-performance web systems.",
    keywords: [
      "Hussein Najah",
      "Software Engineer",
      "Full-Stack Developer",
      "Next.js Developer",
      "React Developer",
      "TypeScript",
      "Web Developer Iraq",
      "UI/UX Engineer",
      "Portfolio",
      "i1Zeus",
    ],
    ogTitle: "Hussein Najah | Full-Stack Software Engineer",
    ogDescription:
      "Explore the portfolio of Hussein Najah: scalable enterprise solutions, modern web platforms, and interactive digital experiences.",
    personJobTitle: "Full-Stack Software Engineer",
  },
  nav: {
    home: "Home",
    about: "About",
    projects: "Projects",
    testimonials: "Testimonials",
    contact: "Contact",
  },
  hero: {
    tagline: "Iraqi's web magic next.js",
    title: "Transforming Ideas into Seamless Reality",
    description: "Hi I'm Hussein, a Software Engineer Based in Iraq.",
    showWork: "Show my work",
    downloadCv: "Download CV",
  },
  home: {
    bootLabel: "Hussein Najah — Portfolio",
    available: "Open to new projects",
    location: "Basra",
    region: "Iraq",
    role: "Software Engineer",
    roleDetail: "Full-Stack · UI/UX",
    localTime: "Local time",
    heroTitle: ["Transforming", "ideas into", "seamless reality"],
    heroLead:
      "Hi, I'm Hussein — a full-stack software engineer based in Iraq. I design, build and ship ERPs, e-commerce platforms and web products from the ground up.",
    ctaProjects: "See projects",
    ctaContact: "Get in touch",
    scroll: "Scroll",
    menu: "Menu",
    close: "Close",
    cv: "CV",
    nav: {
      about: "About",
      stack: "Stack",
      work: "Work",
      path: "Path",
      contact: "Contact",
    },
    manifesto: ["Design", "Build", "Deploy"],
    manifestoSub: "Building the future of the web with the latest technologies.",
    aboutTitle: "From idea to production",
    aboutIntro:
      "I'm a full-stack developer and UI/UX engineer who builds premium, highly interactive web applications — designed, coded and deployed from the ground up.",
    aboutMore: [
      "Specializing in the Next.js ecosystem, I prioritize client collaboration and system reliability, fostering open communication at every step of a project.",
      "I'm flexible with time zone communications and constantly improving my stack — a tech enthusiast with a genuine passion for development.",
    ],
    readMore: "Read more",
    readLess: "Show less",
    profile: "Profile",
    facts: [
      { k: "Based in", v: "Basra, IQ" },
      { k: "Role", v: "Full-Stack Engineer" },
      { k: "Focus", v: "Next.js · NestJS" },
      { k: "Languages", v: "Arabic · English" },
      { k: "Handle", v: "@i1Zeus" },
    ],
    capabilities: [
      {
        tag: "FRONT",
        title: "Interfaces & UX",
        text: "Responsive, accessible interfaces in React and Next.js — designed user-first and polished down to the motion.",
      },
      {
        tag: "BACK",
        title: "APIs & systems",
        text: "Modular NestJS, Node.js and Laravel back ends with REST and WebSocket APIs, auth, payments and background jobs.",
      },
      {
        tag: "DATA",
        title: "Architecture & data",
        text: "PostgreSQL, Prisma and cloud storage behind multi-tenant platforms — ERPs and stores shipped to real clients.",
      },
    ],
    stackTitle: "Tools of the trade",
    stackGroups: {
      frontend: "Frontend",
      backend: "Backend",
      data: "Data",
      infra: "Infra & services",
    },
    expertiseLabel: "Areas of expertise",
    expertise: [
      "System architecture",
      "Full-stack development",
      "UI/UX design",
      "ERP systems",
      "E-commerce",
      "Real-time apps",
    ],
    workTitle: "Selected work",
    workLead:
      "A small selection of recent projects — ERPs, e-commerce platforms and products designed, built and shipped end to end.",
    dragHint: "Scroll",
    caseStudy: "Case study",
    nextProject: "Next project",
    liveSite: "Live site",
    pathTitle: "Experience",
    approachTitle: "How I work",
    wordsTitle: "Kind words",
    wordsLabel: "Testimonials",
    wordsCta: "Your project could be next",
    contactTitle: "Let's work together",
    contactSubtitle: "Ready to partner on your next project?",
    contactText:
      "Reach out today and let's discuss how I can help you turn your idea into a product people love to use.",
    channels: {
      email: "Email",
      github: "GitHub",
      linkedin: "LinkedIn",
      x: "X",
      instagram: "Insta",
    },
    status: [
      { k: "Status", v: "Available" },
      { k: "Based in", v: "Basra, Iraq" },
      { k: "Time zone", v: "GMT+3" },
      { k: "Languages", v: "AR · EN" },
    ],
    backToTop: "Back to top",
    footerTagline: "Full-stack software engineer — Basra, Iraq.",
    wordmark: "Hussein Najah",
    rights: "All rights reserved.",
  },
  projects: {
    headingPrefix: "A small selection of",
    headingHighlight: "recent projects",
    backToProjects: "Back to Projects",
    descriptionTitle: "Description",
    techStackTitle: "Tech Stack",
    liveSite: "Check Live Site",
    architectureTitle: "System Architecture",
    architectureSubtitle:
      "Interactive structural overview of components, data pipelines, and infrastructure.",
    clientLayer: "Presentation / Client",
    serverLayer: "Application Services",
    storageLayer: "Storage & Integration",
    clientUi: "Client-side UI",
    serverApi: "Server API logic",
    dataStore: "Data Store",
    externalApi: "External API",
    architectureHint:
      "Hover or click on any system node to inspect architectural specifications.",
    galleryTitle: "Project Gallery",
    gallerySubtitle:
      "Detailed visual walkthrough and interface highlights of this project.",
    viewFullImage: "View Full Image",
    lightboxClose: "Close Lightbox",
    lightboxPrev: "Previous Image",
    lightboxNext: "Next Image",
    close: "Close",
    notFound: "Project not found",
    items: {
      0: {
        id: 0,
        title: "iZeus-ERP",
        des: "Independently designed, developed, and deployed a full-stack Enterprise Resource Planning (ERP) system from the ground up, integrating core business operations into a centralized platform that was successfully sold and implemented for clients. Architected scalable frontend and backend solutions to support business process automation and efficient data management. Collaborated directly with clients to gather requirements, customize workflows, and deliver solutions aligned with operational needs.",
        architectureNodes: {
          fe: {
            label: "Vite + React SPA",
            details:
              "High-performance Single Page Application built using React 19, TypeScript, and Tailwind CSS. Employs Zustand, TanStack Query, and Ant Design plots for interactive administrative, POS, and HR dashboards.",
          },
          api: {
            label: "NestJS Modular Monolith",
            details:
              "Modular Node.js server engine built with NestJS & TypeScript. Governs JWT/Passport auth, multi-tenant workspace routing, payroll processing, PDFKit invoice rendering, and background cron schedules.",
          },
          db: {
            label: "PostgreSQL Database",
            details:
              "Relational database schema managed via Prisma ORM, capturing comprehensive records for accounting logs, multi-tenant workspaces, HR attendance, and CRM pipelines.",
          },
          s3: {
            label: "Cloudflare R2 Storage",
            details:
              "S3-compatible object storage used for storing user uploads, contracts, employee documents, and generated invoices with secure presigned URLs.",
          },
          ai: {
            label: "AI Orchestrator",
            details:
              "Integrates Google Gemini AI and OpenAI services to power intelligent automated actions, data parsing, and smart ERP features.",
          },
          comm: {
            label: "Notification Services",
            details:
              "Handles messaging via WhatsApp (Green API Client) and SMTP (Nodemailer) for real-time employee updates, task alerts, and transaction billing.",
          },
        },
      },
      1: {
        id: 1,
        title: "NexoGroup",
        des: "NexoGroup - E-commerce platform for selling electronics products. including pc parts and other, it's has all the modern features and security. fully responsive and mobile first. designed by me. built from the ground up where user comes first.",
        architectureNodes: {
          fe: {
            label: "Next.js 16 Storefront",
            details:
              "Server-Side Rendered (SSR) storefront utilizing React Server Components (RSC) and Tailwind CSS. Features optimized search, multi-step checkouts, and custom PC builders.",
          },
          api: {
            label: "Next.js API Routes",
            details:
              "Serverless Route Handlers executing authentication (NextAuth.js), inventory validation, secure checkouts, and system integration.",
          },
          db: {
            label: "PostgreSQL Database",
            details:
              "Structured relational database storing inventory specs, purchase records, and user data, queried using Prisma Client ORM.",
          },
          stripe: {
            label: "Stripe Gateway",
            details:
              "Processes payments securely and dispatches transactional webhooks to confirm client e-commerce orders.",
          },
        },
      },
      2: {
        id: 2,
        title: "Taeen Platform",
        des: "Taeen تعيين - Iraq's Fastest Growing Recruitment Platform. Developed a modern recruitment platform connecting job seekers with opportunities across Iraq.",
        architectureNodes: {
          fe: {
            label: "React 19 SPA Client",
            details:
              "High-performance React 19 SPA powered by TypeScript and Tailwind CSS. Features candidate dashboards, multi-step resume builders, and real-time overlays.",
          },
          api: {
            label: "NestJS Backend API",
            details:
              "Modular NestJS REST engine orchestrating recruitment logic, candidate matching models, CV parsing queues, and API routes.",
          },
          ws: {
            label: "WebSocket Gateway",
            details:
              "NestJS gateway handling real-time WebSocket messaging for ongoing recruiter-candidate live chats and immediate dashboard notifications.",
          },
          db: {
            label: "PostgreSQL Database",
            details:
              "Relational database capturing normalized resume entities, job boards, and message threads, queried using Prisma ORM.",
          },
          pay: {
            label: "SindiPay Gateway",
            details:
              "Integrates SindiPay for localized payment processing of company subscription packages and job post postings.",
          },
        },
      },
      3: {
        id: 3,
        title: "Estore | Iraq's Leading E-commerce Platform",
        des: "Contributed to both web and mobile app development, upgrading the platform to React 19 and integrating Odoo ERP to manage central business data alongside compatible realtime services.",
        architectureNodes: {
          fe: {
            label: "Next.js (React 19) & React Native",
            details:
              "Cross-platform mobile apps (iOS/Android) and modern web UI built on React 19, connecting to serverless API gateways.",
          },
          api: {
            label: "Serverless Route Handlers",
            details:
              "Next.js serverless functions acting as API gateways to query Odoo ERP and orchestrate compatible third-party services.",
          },
          odoo: {
            label: "Odoo ERP System",
            details:
              "Centralized business suite serving as the primary data engine for inventory management, product catalogs, customer CRM, and billing.",
          },
          db: {
            label: "Firebase Firestore",
            details:
              "NoSQL realtime database to handle compatible instant sync features such as live shopping cart updates and active auctions.",
          },
          storage: {
            label: "Firebase Cloud Storage",
            details:
              "Houses product images, user profile avatars, and attachment files.",
          },
        },
      },
      4: {
        id: 4,
        title: "Hoster | Web Hosting Platform",
        des: "Developed web and mobile app versions to deliver a seamless hosting management experience for developers. Implemented responsive design patterns and cross-platform functionality.",
        architectureNodes: {
          fe: {
            label: "React Control Panel",
            details:
              "Dashboard client that enables users to spin up VPS containers, view CPU/RAM usage graphs, and configure subdomains.",
          },
          api: {
            label: "Host Manager Daemon",
            details:
              "Node.js daemon service communicating with local systems via Docker API, SSH agents, and process supervisors.",
          },
          db: {
            label: "MongoDB Store",
            details:
              "Stores user accounts, server resource graphs, billing entries, and dynamic server environment blueprints.",
          },
          docker: {
            label: "Docker Daemon / VPS Node",
            details:
              "Local or remote nodes hosting user environments inside isolated containers.",
          },
        },
      },
      5: {
        id: 5,
        title: "Abdulkareem for Charity",
        des: "A charity website created by a set of college developers including myself, to help raise money for charity events, and any other events like environment, animals, etc.",
        architectureNodes: {
          fe: {
            label: "Blade UI Template",
            details:
              "Responsive HTML templates rendered server-side with Bootstrap 5 design tokens, emphasizing accessibility and donor readability.",
          },
          api: {
            label: "Laravel Core Framework",
            details:
              "Monolithic Laravel application processing backend routes, donation tallies, campaign management, and admin forms.",
          },
          db: {
            label: "MySQL DB Storage",
            details:
              "Stores event timelines, active campaigns, financial donation records, and donor audit logs.",
          },
          sms: {
            label: "SMS Gateway API",
            details:
              "Sends thank-you verification messages and updates to donors on active campaigns.",
          },
        },
      },
    },
  },
  notFound: {
    title: "Page Not Found",
    description: "Sorry, we couldn't find the page you're looking for.",
    backHome: "Back to Home",
  },
  clients: {
    headingPrefix: "Kind Words From",
    headingHighlight: "People",
    items: [
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
    ],
  },
  experience: {
    headingPrefix: "My",
    headingHighlight: "Work Experience",
    items: [
      {
        id: 1,
        title: "Web Developer",
        desc: "Assisted in the development of a web-based platform using Next.js, Vue.js and more, enhancing interactivity.",
      },
      {
        id: 2,
        title: "UI/UX Designer & Developer",
        desc: "Designed and developed a responsive web app for a startup, focusing on user experience.",
      },
      {
        id: 3,
        title: "Freelance Web Dev Project",
        desc: "Led the dev of a web app for a client, from initial concept to deployment.",
      },
      {
        id: 4,
        title: "Lead Frontend Developer",
        desc: "Developed and maintained user-facing features using modern frontend technologies.",
      },
    ],
  },
  approach: {
    headingPrefix: "How I",
    headingHighlight: "Do Things",
    phases: [
      {
        order: "Phase I",
        title: "Planning & Strategy",
        description:
          "We'll collaborate to map out your website's goals, target audience, and key functionalities. We'll discuss things like site structure, navigation, and content requirements.",
      },
      {
        order: "Phase II",
        title: "Development & Progress Update",
        description:
          "Once we agree on the plan, I cue my lofi playlist and dive into coding. From initial sketches to polished code, I keep you updated every step of the way.",
      },
      {
        order: "Phase III",
        title: "Development & Launch",
        description:
          "This is where the magic happens! Based on the approved design, I'll translate everything into functional code, building your website from the ground up.",
      },
    ],
  },
  footer: {
    readyPrefix: "Ready to",
    flipWords: ["collaborate", "Integrate", "partner"],
    readySuffix: "with me on your next project?",
    description:
      "Reach out to me today and let's discuss how I can help you achieve your goals.",
    ctaButton: "Let's get in touch",
    copyright: "Copyright © 2026 Hussein Najah. All rights reserved.",
  },
  terminal: {
    buttonTitle: "Open Developer Terminal (Ctrl + `)",
    headerTitle: "Developer Command Prompt (CLI)",
    hotkeyHint: "Hotkey: Ctrl + `",
    welcome:
      "Hussein's Portfolio CLI [Version 2.0.0]\n(c) 2026 Hussein. All rights reserved.\n\nType 'help' to view available commands.",
    helpText: `Available Commands:
  help      - Show this help directory
  about     - Learn more about Hussein
  skills    - List tech stack & proficiencies
  projects  - List all projects and their IDs
  project   - View project details. Usage: project <id> (e.g. project 0)
  lang      - Switch language. Usage: lang <en|ar>
  contact   - Display contact details & social networks
  clear     - Clear terminal buffer
  exit      - Close terminal overlay`,
    aboutText: `About Hussein:
-------------------------------------------
I am a dedicated full-stack developer and UI/UX engineer with a passion for constructing premium, highly interactive web applications. Specializing in the Next.js ecosystem, I design, code, and deploy solutions from the ground up, prioritizing client collaboration and system reliability.`,
    skillsText: `Skills & Technologies:
-------------------------------------------
- Frontend: React.js, Next.js, TypeScript, Tailwind CSS, Framer Motion
- Backend: NestJS, Node.js, Laravel (PHP), REST / WebSocket APIs
- Databases: PostgreSQL, MySQL, MongoDB, Redis, Prisma ORM
- Core Competencies: System Architecture, UX/UI Design, Full-Stack Dev`,
    projectsHeading: "Portfolio Projects:",
    projectUsageHint: "Type 'project <id>' to view the interactive detail page.",
    contactText: `Contact Details & Socials:
-------------------------------------------
- Email:     husseinnajah.it@gmail.com
- GitHub:    https://github.com/i1Zeus
- LinkedIn:  https://www.linkedin.com/in/i1zeus
- X:         https://x.com/i1Zeus
- Instagram: https://www.instagram.com/hxg.1`,
    cmdNotFound: "Command not recognized: '{command}'. Type 'help' to see list of commands.",
    langChanged: "Language switched to English.",
  },
  socialProfile: {
    portfolioBack: "Portfolio",
    nfcCardActive: "NFC CARD ACTIVE",
    location: "Basra, IQ",
    cardHolderName: "Hussein Najah",
    cardRole: "Software Engineer • Full Stack",
    nfcWallet: "NFC WALLET",
    tapToFlip: "TAP TO FLIP ↻",
    flipToFront: "Flip to Front",
    flipToBack: "Flip to Back (QR Code)",
    signatureRequired: "AUTHORIZED SIGNATURE REQUIRED",
    instantConnect: "Instant Connect",
    instantConnectDesc: "Point any phone camera to instantly scan Hussein's link.",
    saveContact: "Save Contact (.vcf)",
    contactSaved: "Contact card downloaded! Add to your phone contacts.",
    shareCard: "Share Card",
    showQr: "Show QR",
    qrScanConnect: "Scan & Connect",
    qrInstruction: "Point any smartphone camera at this code to view Hussein's card",
    generatingQr: "Generating QR...",
    copyLink: "Copy Link",
    copied: "Copied!",
    savePng: "Save PNG",
    close: "Close",
    connectSocialsHeading: "CONNECT & SOCIALS",
    scanHintBottom: "Scan QR or tap NFC tag to instantly exchange details",
    skip: "SKIP >>",
    handshakeActive: "Handshake Active",
    ready: "● Ready",
    tapToConnectProtocol: "TAP-TO-CONNECT • ISO/IEC 14443-A",
    statusTexts: [
      "NFC WALLET DETECTED",
      "READING EMV CHIP & CRYPTO KEY...",
      "ACCESS GRANTED • DECRYPTING PROFILE",
      "WELCOME TO HUSSEIN'S CARD",
    ],
    links: {
      linkedin: {
        name: "LinkedIn",
        badge: "Connect",
        description: "Professional network & career updates",
      },
      github: {
        name: "GitHub",
        badge: "Open Source",
        description: "Codebases, repositories & projects",
      },
      x: {
        name: "X (Twitter)",
        badge: "Follow",
        description: "Tech thoughts & engineering snippets",
      },
      instagram: {
        name: "Instagram",
        badge: "@hxg.1",
        description: "Moments, behind the scenes & life",
      },
      facebook: {
        name: "Facebook",
        badge: "@iZeus01",
        description: "Personal updates & social connections",
      },
      portfolio: {
        name: "Main Portfolio",
        badge: "Explore",
        description: "Full interactive projects & testimonials",
      },
      cv: {
        name: "Curriculum Vitae",
        badge: "Resume",
        description: "Full work experience & engineering skills",
      },
      email: {
        name: "Direct Email",
        badge: "Inquiries",
        description: "Start a project or say hello",
      },
    },
  },
};
