export interface ProfileLink {
  label: string;
  href: string;
}

export interface ProofSignal {
  label: string;
  value: string;
}

export interface Profile {
  name: string;
  headline: string;
  positioning: string;
  introduction: string;
  contextLine: string;
  location: string;
  currentRole: string;
  portrait: string;
  proofSignals: ProofSignal[];
  links: ProfileLink[];
}

export interface PortfolioEntry {
  slug: string;
  kind: "featured" | "archive";
  eyebrow: string;
  title: string;
  summary: string;
  role: string;
  period: string;
  location: string;
  image?: string;
  liveUrl?: string;
  stack: string[];
  highlights: string[];
  context: string;
  outcome: string;
  technicalContribution: string;
  supportingNotes: string[];
}

export interface ExperienceItem {
  organization: string;
  role: string;
  period: string;
  location: string;
  summary: string;
}

export interface SkillGroup {
  title: string;
  note: string;
  items: string[];
}

export interface CredentialHighlight {
  title: string;
  issuer: string;
  note: string;
}

export const profile = {
  name: "Dweight Dewey Fuentes",
  headline: "Mid-level full-stack engineer",
  positioning:
    "Shipping production systems with careful product judgment across hiring, commerce, and operational tools.",
  introduction:
    "I work across frontend and backend delivery, translating product requirements into dependable interfaces, tested workflows, and release-ready systems.",
  contextLine: "LinkedIn portfolio / currently building at DXForm PH",
  location: "Cebu, Philippines",
  currentRole: "Mid Software Engineer at DXForm PH",
  portrait: "/dweightproImage.jpg",
  proofSignals: [
    {
      label: "Current focus",
      value: "Production web apps with shipping discipline",
    },
    {
      label: "Delivery style",
      value: "Full-stack execution with QA-minded detail",
    },
    {
      label: "Reader promise",
      value: "Fast to scan, deep enough to verify",
    },
  ] satisfies ProofSignal[],
  links: [
    { label: "Email", href: "mailto:dwieghtpro@gmail.com" },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/dweight-dewey-fuentes-692078200",
    },
    { label: "GitHub", href: "https://github.com/Dwieght" },
  ] satisfies ProfileLink[],
} satisfies Profile;

export const featuredProjects = [
  {
    slug: "aicquire",
    kind: "featured",
    eyebrow: "Hiring systems",
    title: "Aicquire",
    summary:
      "An applicant tracking product for structured hiring workflows, candidate visibility, and collaboration across recruiting teams.",
    role: "Full-stack development and delivery support",
    period: "2024",
    location: "Production product",
    image: "/aicquireImage.png",
    liveUrl: "https://aicquire.com/",
    stack: ["React", "Node.js", "MongoDB", "AI-assisted tooling"],
    highlights: [
      "Worked on the web surfaces that help teams review applicants, move candidates through stages, and keep hiring operations aligned.",
      "Balanced day-to-day product delivery with QA-aware execution so the experience held up under real operational use.",
    ],
    context:
      "Aicquire serves teams that need a clearer hiring pipeline than email, spreadsheets, and ad hoc coordination can provide. The work required building flows that feel straightforward for daily operations while still supporting the underlying complexity of candidate management.",
    outcome:
      "The result is a more credible, production-ready hiring surface that makes candidate review, status movement, and internal coordination easier to follow. For the portfolio, it demonstrates product relevance, operational thinking, and delivery on a serious software surface.",
    technicalContribution:
      "I contributed to full-stack product delivery across interactive UI, application logic, and release quality. My focus was translating product requirements into reliable workflows, refining implementation details, and helping the surface feel stable enough for repeated real-world use.",
    supportingNotes: [
      "Confidentiality-safe framing with public product context",
      "Focus on delivery quality rather than internal-only metrics",
      "Best example of product maturity on the current portfolio",
    ],
  },
  {
    slug: "gigi-pos",
    kind: "featured",
    eyebrow: "Commerce operations",
    title: "GiGi POS",
    summary:
      "A point-of-sale system shaped around speed at the counter, day-to-day operations, and the practical realities of business workflow software.",
    role: "Frontend and systems delivery",
    period: "2024",
    location: "Production product",
    image: "/posImage.png",
    liveUrl: "https://gigipos.com/",
    stack: ["Next.js", "React Native", "PostgreSQL", "Stripe"],
    highlights: [
      "Helped ship interfaces that support transactional work where speed and clarity matter more than visual noise.",
      "Worked in a domain where reliable UI behavior and disciplined information hierarchy directly affect daily business use.",
    ],
    context:
      "POS software has to support fast decisions under operational pressure. That creates a different UX bar from a marketing page or internal dashboard: the interface must communicate clearly, avoid hesitation, and stay dependable during repeat use.",
    outcome:
      "GiGi POS demonstrates that I can contribute to business-critical interfaces where usability is measured by how little friction the operator feels. It broadens the portfolio beyond hiring software into transactional product work.",
    technicalContribution:
      "My contribution centered on implementation quality and interface reliability across a product with real operational stakes. I worked within the delivery layer that turns product intent into responsive UI, clear states, and maintainable behavior across web and mobile-adjacent surfaces.",
    supportingNotes: [
      "Operational workflow credibility",
      "Useful contrast against recruiting and survey products",
      "Shows product judgment under practical constraints",
    ],
  },
  {
    slug: "lemur-survey",
    kind: "featured",
    eyebrow: "Field data systems",
    title: "Lemur Survey",
    summary:
      "A survey platform that combines a web admin surface with field collection workflows, including offline-capable operation for real-world data gathering.",
    role: "Full-stack product execution",
    period: "2024",
    location: "Production product",
    image: "/lemurSurveyImage.png",
    liveUrl:
      "https://play.google.com/store/apps/details?id=com.lemursurvey.app&hl=en",
    stack: ["React", "React Native", "Node.js", "SQLite"],
    highlights: [
      "Adds offline and synchronization complexity to the portfolio, which makes the project feel materially different from a standard web admin app.",
      "Shows comfort with systems that have both operator-facing management and field-use constraints.",
    ],
    context:
      "Survey collection is messy in the real world: connectivity is inconsistent, workflows need to survive interruption, and the admin side must still make collected information usable. That makes Lemur Survey a strong example of software that serves actual operational context.",
    outcome:
      "The project strengthens the portfolio by showing range: not just polished screens, but product work that has to account for environmental constraints and field reality. It is one of the clearest indicators of engineering depth in the current body of work.",
    technicalContribution:
      "I worked within the implementation layer that makes these workflows usable: translating product requirements into interfaces, behavior, and system coordination that hold up in both admin and collection contexts. The key value here is not novelty, but dependable execution under more complex conditions.",
    supportingNotes: [
      "Offline-capable workflow complexity",
      "Good signal for engineering managers and developers",
      "Strong contrast to commerce and hiring products",
    ],
  },
] satisfies PortfolioEntry[];

export const archiveProjects = [
  {
    slug: "zukify",
    kind: "archive",
    eyebrow: "Membership commerce",
    title: "Zukify",
    summary:
      "Subscription discount platform connecting consumers and merchants through ongoing offer discovery.",
    role: "Product implementation",
    period: "2024",
    location: "Production product",
    image: "/zukifyImage.png",
    liveUrl: "https://www.zukify.com/",
    stack: ["React", "Next.js", "MongoDB", "Stripe"],
    highlights: [],
    context: "",
    outcome: "",
    technicalContribution: "",
    supportingNotes: [],
  },
  {
    slug: "payruler-learn",
    kind: "archive",
    eyebrow: "Education software",
    title: "Payruler Learn LMS",
    summary:
      "Learning management product supporting course delivery, progress tracking, and instructor workflows.",
    role: "Product implementation",
    period: "2024",
    location: "Production product",
    image: "/lmsImage.png",
    liveUrl: "https://lms.tundra.dxform.ph/",
    stack: ["React", "Node.js", "MongoDB", "WebRTC"],
    highlights: [],
    context: "",
    outcome: "",
    technicalContribution: "",
    supportingNotes: [],
  },
  {
    slug: "mayplaka",
    kind: "archive",
    eyebrow: "Government service",
    title: "MAYPLAKA",
    summary:
      "Vehicle plate tracking and delivery coordination experience for public-facing status workflows.",
    role: "Product implementation",
    period: "2024",
    location: "Production product",
    image: "/mayplakaImage.png",
    liveUrl: "https://www.mayplaka.com/",
    stack: ["React", "Node.js", "PostgreSQL", "SMS API"],
    highlights: [],
    context: "",
    outcome: "",
    technicalContribution: "",
    supportingNotes: [],
  },
] satisfies PortfolioEntry[];

export const allProjects = [
  ...featuredProjects,
  ...archiveProjects,
] satisfies PortfolioEntry[];

export const experienceItems = [
  {
    organization: "DXForm PH",
    role: "Mid Software Engineer",
    period: "Aug 2024 - Present",
    location: "Cebu, Philippines",
    summary:
      "Building production software across hiring, business operations, and workflow-driven web products. Current role that anchors the portfolio's credibility and level framing.",
  },
  {
    organization: "Skanlog",
    role: "Software Developer Intern",
    period: "Jan 2024 - May 2024",
    location: "Cebu, Philippines",
    summary:
      "Early professional delivery experience focused on software design, implementation, and working habits that transferred into later production work.",
  },
  {
    organization: "Pixel8 Academy",
    role: "System Analyst Trainee",
    period: "Jan 2024 - Apr 2024",
    location: "Cebu, Philippines",
    summary:
      "Training foundation in systems thinking, requirements interpretation, and technical communication before moving deeper into shipped product work.",
  },
] satisfies ExperienceItem[];

export const skillGroups = [
  {
    title: "Product delivery",
    note: "Where I tend to create the most leverage.",
    items: [
      "Translating ambiguous product asks into shippable scopes",
      "Frontend architecture with production-minded detail",
      "QA-aware implementation and release support",
      "Workflow design that stays legible under real use",
    ],
  },
  {
    title: "Frontend systems",
    note: "Core tools used to ship interfaces that hold up.",
    items: [
      "React and Next.js",
      "TypeScript",
      "Tailwind CSS and component composition",
      "Interaction detail, layout discipline, and polish",
    ],
  },
  {
    title: "Backend and data",
    note: "Enough depth to deliver end-to-end product work.",
    items: [
      "Node.js",
      "PostgreSQL",
      "MongoDB",
      "API integration and application logic",
    ],
  },
] satisfies SkillGroup[];

export const credentialHighlights = [
  {
    title: "School of Agility",
    issuer: "Professional learning program",
    note: "Useful signal of structured growth, kept secondary to shipped work.",
  },
  {
    title: "Design Hill Certificate",
    issuer: "Design and interface learning",
    note: "Supports the portfolio's emphasis on taste and execution.",
  },
  {
    title: "ICT Congress Participation",
    issuer: "Industry event",
    note: "Shown as supporting context, not as the main proof of capability.",
  },
] satisfies CredentialHighlight[];

export function getProjectBySlug(slug: string) {
  return allProjects.find((entry) => entry.slug === slug);
}
