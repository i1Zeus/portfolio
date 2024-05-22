export const navItems = [
  { name: "About", link: "#about" },
  { name: "Projects", link: "#projects" },
  { name: "Testimonials", link: "#testimonials" },
  { name: "Contact", link: "#contact" },
];

export const words = ["better", "cute", "beautiful", "modern"];

export const gridItems = [
  {
    id: 1,
    title: "I prioritize client collaboration, fostering open communication ",
    description: "",
    className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
    imgClassName: "w-full h-full",
    titleClassName: "justify-end",
    img: "/b1.svg",
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
    spareImg: "/b4.svg",
  },

  {
    id: 5,
    title: "Building the future of the web with the latest technologies.",
    description: "The Inside Scoop",
    className: "md:col-span-3 md:row-span-2",
    imgClassName: "absolute right-0 bottom-0 md:w-[500px] w-60",
    titleClassName: "justify-center md:justify-start lg:justify-center",
    img: "/b5.svg",
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
    id: 1,
    title: "Discord Clone",
    des: "A Discord clone with voice, video, and text chat features. Built with Next, TailwindCSS, Prisma and MySQL.",
    img: "/dc.svg",
    iconLists: ["/next.svg", "/tail.svg", "/ts.svg", "/c.svg", "/p.svg"],
    link: "https://github.com/i1Zeus/discord-clone",
  },
  {
    id: 2,
    title: "Notion Clone",
    des: "A Notion clone with drag-and-drop, dark mode, and real-time collaboration features. Built with Next.js, TailwindCSS, Prisma and MySQL.",
    img: "/nc.svg",
    iconLists: ["/next.svg", "/tail.svg", "/ts.svg", "/c.svg", "/p.svg"],
    link: "https://github.com/i1Zeus/notion-clone",
  },
  {
    id: 3,
    title: "Generative AI Platform",
    des: "A REAL Software-as-a-Service app with AI features and a payments and credits system using the latest tech stack.",
    img: "/qg.svg",
    iconLists: ["/next.svg", "/tail.svg", "/ts.svg", "/c.svg", "/p.svg"],
    link: "https://github.com/i1Zeus/AI-Saas",
  },
  {
    id: 4,
    title: "ECommerce Admin",
    des: "An ECommerce admin dashboard with CRUD operations, authentication, and role-based access control. Built with Next.js, TailwindCSS, Prisma and MySQL.",
    img: "/ea.svg",
    iconLists: ["/next.svg", "/tail.svg", "/ts.svg", "/c.svg", "/p.svg"],
    link: "https://github.com/i1Zeus/ecommerce-admin",
  },
  ,
  {
    id: 5,
    title: "Abdulkareem for Charity",
    des: "A charity website created by a set of collage developers including myself, to help rising money for a charity event, any other event like environment, animals, etc.",
    img: "/ak.svg",
    iconLists: [
      "/laravel.svg",
      "/tail.svg",
      "/php.svg",
      "/mySql.svg",
      "/boot.svg",
    ],
    link: "https://github.com/Gruce/abdulkareem-for-charity",
  },
  ,
  {
    id: 6,
    title: "ECommerce Store",
    des: "An ECommerce store that allows users to buy products, add to cart, and checkout. Built with Next.js, TailwindCSS, Prisma and MySQL.",
    img: "/es.svg",
    iconLists: ["/next.svg", "/tail.svg", "/ts.svg", "/c.svg", "/p.svg"],
    link: "https://github.com/i1Zeus/ecommerce-store",
  },
];

export const testimonials = [
  {
    quote:
      "Hussein is one of the people we have interacted with. His behavior is very pleasant, and he has assisted us with many things. Whenever we needed something, he would do it for us, and whatever we requested, he would respond affirmatively. His capabilities are impressive and strong. Wishing you all the best, my dear.",
    name: "Ameer Riyadh",
    title: "",
  },
  {
    quote:
      "Well done on the graduation project you completed. It is very well-organized, and all your work is precise. It is something truly refined and outstanding. Your attention to detail and dedication are evident in every aspect of the project, making it exceptionally impressive. Keep up the excellent work! ",
    name: "Ali Issa",
    title: "",
  },
  {
    quote:
      "Well done on the graduation project you completed. It is very well-organized, and all your work is precise. It is something truly refined and outstanding. Your attention to detail and dedication are evident in every aspect of the project, making it exceptionally impressive. Keep up the excellent work! ",
    name: "Hassan Khalid",
    title: "CTO and The Founder of Enab Web App",
  },
];

export const companies = [
  // {
  //   id: 1,
  //   name: "GPS LVN",
  //   img: "/lvn.svg",
  //   nameImg: "/lvnName.svg",
  // },
  {
    id: 2,
    name: "Enab Web App",
    img: "/enab.svg",
    nameImg: "/enabName.svg",
  },
  {
    id: 3,
    name: "CSIT ELITES",
    img: "/csit.svg",
    nameImg: "/csitName.svg",
  },
];

export const workExperience = [
  {
    id: 1,
    title: "Frontend Engineer Intern",
    desc: "Assisted in the development of a web-based platform using Next.js, enhancing interactivity.",
    className: "md:col-span-2",
    thumbnail: "/exp1.svg",
  },
  {
    id: 2,
    title: "UI/UX Designer & Developer",
    desc: "Designed and developed a responsive web app for a startup, focusing on user experience.",
    className: "md:col-span-2",
    thumbnail: "/exp2.svg",
  },
  {
    id: 3,
    title: "Freelance Web Dev Project",
    desc: "Led the dev of a web app for a client, from initial concept to deployment.",
    className: "md:col-span-2",
    thumbnail: "/exp3.svg",
  },
  {
    id: 4,
    title: "Lead Frontend Developer",
    desc: "Developed and maintained user-facing features using modern frontend technologies.",
    className: "md:col-span-2",
    thumbnail: "/exp4.svg",
  },
];

export const socialMedia = [
  {
    id: 1,
    img: "/git.svg",
  },
  {
    id: 2,
    img: "/twit.svg",
  },
  {
    id: 3,
    img: "/link.svg",
  },
];
