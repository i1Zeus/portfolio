export interface ProjectNodeTranslation {
  id: string;
  label: string;
  details: string;
}

export interface TestimonialTranslation {
  quote: string;
  name: string;
  title: string;
}

export interface ExperienceTranslation {
  id: number;
  title: string;
  desc: string;
}

export interface ApproachPhaseTranslation {
  order: string;
  title: string;
  description: string;
}

export interface SocialLinkDict {
  name: string;
  badge: string;
  description: string;
}

export interface Dictionary {
  meta: {
    title: string;
    description: string;
    keywords: string[];
    ogTitle: string;
    ogDescription: string;
    personJobTitle: string;
    nfcTitle: string;
    nfcDescription: string;
    imageAlt: string;
    breadcrumbHome: string;
  };
  nav: {
    home: string;
    about: string;
    projects: string;
    testimonials: string;
    contact: string;
  };
  hero: {
    tagline: string;
    title: string;
    description: string;
    showWork: string;
    downloadCv: string;
  };
  home: {
    bootLabel: string;
    available: string;
    location: string;
    region: string;
    role: string;
    roleDetail: string;
    localTime: string;
    heroTitle: string[];
    heroLead: string;
    ctaProjects: string;
    ctaContact: string;
    scroll: string;
    menu: string;
    close: string;
    cv: string;
    nav: {
      about: string;
      stack: string;
      work: string;
      path: string;
      contact: string;
    };
    manifesto: string[];
    manifestoSub: string;
    aboutTitle: string;
    aboutIntro: string;
    aboutMore: string[];
    readMore: string;
    readLess: string;
    profile: string;
    facts: { k: string; v: string }[];
    capabilities: { tag: string; title: string; text: string }[];
    stackTitle: string;
    stackGroups: Record<"frontend" | "backend" | "data" | "infra", string>;
    expertiseLabel: string;
    expertise: string[];
    workTitle: string;
    workLead: string;
    dragHint: string;
    caseStudy: string;
    nextProject: string;
    liveSite: string;
    pathTitle: string;
    approachTitle: string;
    wordsTitle: string;
    wordsLabel: string;
    wordsCta: string;
    contactTitle: string;
    contactSubtitle: string;
    contactText: string;
    channels: Record<"email" | "github" | "linkedin" | "x" | "instagram", string>;
    status: { k: string; v: string }[];
    backToTop: string;
    footerTagline: string;
    wordmark: string;
    rights: string;
  };
  projects: {
    headingPrefix: string;
    headingHighlight: string;
    backToProjects: string;
    descriptionTitle: string;
    techStackTitle: string;
    liveSite: string;
    architectureTitle: string;
    architectureSubtitle: string;
    clientLayer: string;
    serverLayer: string;
    storageLayer: string;
    clientUi: string;
    serverApi: string;
    dataStore: string;
    externalApi: string;
    architectureHint: string;
    galleryTitle: string;
    gallerySubtitle: string;
    viewFullImage: string;
    lightboxClose: string;
    lightboxPrev: string;
    lightboxNext: string;
    close: string;
    notFound: string;
    sourceCode: string;
    highlightsTitle: string;
  };
  notFound: {
    title: string;
    description: string;
    backHome: string;
  };
  clients: {
    headingPrefix: string;
    headingHighlight: string;
    items: TestimonialTranslation[];
  };
  experience: {
    headingPrefix: string;
    headingHighlight: string;
    items: ExperienceTranslation[];
  };
  approach: {
    headingPrefix: string;
    headingHighlight: string;
    phases: ApproachPhaseTranslation[];
  };
  footer: {
    readyPrefix: string;
    flipWords: string[];
    readySuffix: string;
    description: string;
    ctaButton: string;
    copyright: string;
  };
  terminal: {
    buttonTitle: string;
    headerTitle: string;
    hotkeyHint: string;
    welcome: string;
    helpText: string;
    aboutText: string;
    skillsHeading: string;
    projectsHeading: string;
    projectUsageHint: string;
    contactText: string;
    cmdNotFound: string;
    langChanged: string;
  };
  socialProfile: {
    portfolioBack: string;
    nfcCardActive: string;
    location: string;
    cardHolderName: string;
    cardRole: string;
    nfcWallet: string;
    tapToFlip: string;
    flipToFront: string;
    flipToBack: string;
    signatureRequired: string;
    instantConnect: string;
    instantConnectDesc: string;
    saveContact: string;
    contactSaved: string;
    shareCard: string;
    showQr: string;
    qrScanConnect: string;
    qrInstruction: string;
    generatingQr: string;
    copyLink: string;
    copied: string;
    savePng: string;
    close: string;
    connectSocialsHeading: string;
    scanHintBottom: string;
    skip: string;
    handshakeActive: string;
    ready: string;
    tapToConnectProtocol: string;
    statusTexts: [string, string, string, string];
    links: {
      linkedin: SocialLinkDict;
      github: SocialLinkDict;
      x: SocialLinkDict;
      instagram: SocialLinkDict;
      facebook: SocialLinkDict;
      portfolio: SocialLinkDict;
      cv: SocialLinkDict;
      email: SocialLinkDict;
    };
  };
}
