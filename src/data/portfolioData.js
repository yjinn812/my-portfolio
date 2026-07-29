export function getYearsExp(startYear) {
  return new Date().getFullYear() - startYear;
}

export const profile = {
  name: "Yu Jin Wong",
  title: "Lead Engineer @ National Australia Bank",
  year_start_work: 2019,
  get yearsExp() {
    return getYearsExp(this.year_start_work);
  },
  get tagline() {
    return `${this.yearsExp} years building software people in banking rely on. I lead the work from design through production, and care as much about the team as the system.`;
  },
  location: "Melbourne / Sydney",
  email: "wongyj812@gmail.com",
  phone: "0452 630 812",
  linkedin: "https://www.linkedin.com/in/yu-jin-wong/",
  github: "https://github.com/yjinn812",
  summary:
    "I'm a Lead Engineer who's spent 7+ years at the intersection of product, infrastructure, and people. At NAB, I've led large-scale CRM transformations, modernised CI/CD pipelines, and built the kind of full-stack systems that banking staff rely on daily. I bring strong opinions on architecture, a bias toward delivery, and a habit of mentoring engineers who want to grow. Outside the enterprise world, I build side projects in React and TypeScript, because good engineering is also something you do for fun.",
};

/** Rotating commands in the hero command bar under View My Work */
export const heroCommands = [
  "yujin@nab -v",
  "open_to --roles lead_engineer architect",
  "stack --enterprise salesforce js",
  "npm i cursor claude",
  "ping --open-to-work",
];

/** Hero terminal JSON — full lists; preview/detail rules control what shows before green expand. */
export const profileJsonOpenToRoles = [
  "Staff / Lead Engineer roles (Salesforce)",
  "CRM / Salesforce Solutions Architect",
  "Full-stack engineer in a product company",
  "AI adoption across the SDLC",
];

export const profileJsonData = {
  name: profile.name,
  role: "Lead Engineer",
  currently_at: "NAB",
  based_in: profile.location,
  years_exp: profile.yearsExp,
  industry: ["Banking", "Insurance", "Telecom"],
  strengths: [
    "Technical Design",
    "Stakeholder Management",
    "Code Review",
    "Mentoring",
    "Delivery Leadership",
  ],
  primary_stack: [
    "Salesforce",
    "JavaScript",
    "Cursor",
    "Claude",
    "Lightning Web Components",
    "GraphQL",
    "Apex",
    "SOQL/SOSL",
    "Financial Services Cloud",
    "CRM Analytics",
  ],
  also_builds_with: [
    "TypeScript",
    "React",
    "Express.js",
    "Node.js",
    "AWS",
    "Firebase",
    "Swift",
    "Vite",
  ],
  impacts: {
    users_scaled: "3,000 -> 13,000",
    processing_gain: "4x",
    setup_time_saved: "30 minutes",
  },
  open_to: {
    status: true,
    roles: profileJsonOpenToRoles,
  },
};

/** Entire key hidden until green expand */
export const profileJsonDetailKeys = ["based_in", "industry"];

/** Array keys: show first N items in base view; remainder on expand */
export const profileJsonArrayPreview = {
  strengths: 2,
  primary_stack: 3,
  also_builds_with: 3,
};

export const profileJsonItemsPerLine = {
  industry: 3,
  strengths: 2,
  primary_stack: 2,
  also_builds_with: 3,
};

export const impactMetrics = [
  {
    value: "3k → 13k",
    label: "Users on the CRM platform",
    detail: "Scaled live users across multiple business domains",
  },
  {
    value: "4×",
    label: "Record processing speedup",
    detail: "Trigger Automation handler architecture overhaul",
  },
  {
    value: "30 min",
    label: "Setup time saved per developer",
    detail: "CI/CD pipeline overhaul & improvements",
  },
];

export const featuredCaseStudies = [
  {
    id: "saas-conversion",
    shortLabel: "SaaS conversion",
    eyebrow: "Featured case study · NAB",
    title: "One-month SaaS conversion under a security deadline",
    context: "Lead Engineer · legacy Salesforce instance",
    problem:
      "A critical third-party SaaS dependency needed to leave the platform on a hard security timeline. Delivery had to land in a month, on a legacy Salesforce org I hadn’t worked in before.",
    did:
      "Owned the conversion end-to-end: ramped up on the legacy org, mapped existing behaviour, designed and shipped the new path, and coordinated cutover with stakeholders under a fixed one-month window.",
    result:
      "Cleared the security risk on schedule, kept banker workflows intact, and moved the capability onto a supported platform path.",
  },
  {
    id: "ai-adoption",
    shortLabel: "AI adoption",
    eyebrow: "Featured case study · NAB",
    title: "AI-assisted development across the engineering org",
    context: "Lead Engineer · Cursor POCs, guidelines & workshops",
    problem:
      "AI tooling was showing up unevenly across delivery. Leadership wanted a credible path that captured productivity upside without ignoring legal, IP, and quality risk in a regulated banking environment.",
    did:
      "Ran Cursor POCs, wrote adoption guidelines (including legal considerations), and presented estimated productivity gains to executives and the wider engineering team. Ran prompt-engineering workshops across the full SDLC: solution architecture, development, testing, and documentation.",
    result:
      "Gave the squad a shared playbook for responsible AI use, aligned leadership on expected gains, and equipped teams to apply prompting practices across design, build, test, and docs, not just autocomplete.",
  },
];

export const toolkit = [
  {
    id: "platforms",
    eyebrow: "Enterprise CRM",
    title: "Salesforce & platforms",
    note: "Most of my production time lives here.",
    tone: "cyan",
    items: [
      "Apex",
      "Lightning Web Components",
      "SOQL",
      "Flows",
      "Financial Services Cloud",
      "CRM Analytics",
      "Agentforce",
    ],
  },
  {
    id: "app-code",
    eyebrow: "Product & services",
    title: "App code & APIs",
    note: "Services, UIs, and other tools I've worked with.",
    tone: "slate",
    items: [
      "TypeScript",
      "JavaScript",
      "React",
      "CSS",
      "Framer Motion",
      "Node.js",
      "Express",
      "Python",
      "REST APIs",
    ],
  },
  {
    id: "delivery",
    eyebrow: "Ship & operate",
    title: "Delivery & cloud",
    note: "Release plumbing, cloud basics, and the AI tools I actually use.",
    tone: "ember",
    items: [
      "AWS",
      "Jenkins",
      "Docker",
      "GitHub Actions",
      "Firebase",
      "Shell",
      "Cursor",
      "Claude",
    ],
  },
];

export const certifications = {
  architectPath: [
    { short: "Application Architect", full: "Salesforce Certified Application Architect" },
    { short: "Data Architect", full: "Salesforce Certified Platform Data Architect" },
    { short: "Sharing & Visibility", full: "Salesforce Certified Platform Sharing & Visibility Architect" },
  ],
  all: [
    { name: "Black Belt (JavaScript)", issuer: "Codility" },
    { name: "Salesforce Certified Application Architect", issuer: "Salesforce" },
    { name: "Salesforce Certified Platform Data Architect", issuer: "Salesforce" },
    { name: "Salesforce Certified Platform Sharing & Visibility Architect", issuer: "Salesforce" },
    { name: "Salesforce Certified CRM Analytics & Einstein Discovery Consultant", issuer: "Salesforce" },
    { name: "Salesforce Certified Agentforce Specialist", issuer: "Salesforce" },
    { name: "Salesforce Certified Platform Developer", issuer: "Salesforce" },
    { name: "Salesforce Certified Platform App Builder", issuer: "Salesforce" },
    { name: "Salesforce Certified Admin", issuer: "Salesforce" },
  ],
};

export const education = [
  {
    degree: "Master of Engineering (Electrical & Electronics Engineering)",
    school: "The University of Melbourne",
    year: "Dec 2017",
  },
  {
    degree: "Bachelor of Science in Electrical Systems",
    school: "The University of Melbourne",
    year: "Dec 2014",
  },
];

export const projects =
[
  {
    id: 5,
    featured: true,
    title: "AI Food Tracker",
    description:
      "Personal nutrition logger where conversational AI and photo estimates write structured meals/products to Cloud Firestore via MCP, against a daily nutritional budget. Control plane: agent playbooks, locked-down security rules, and CLI seed/query/export.",
    story:
      "Describe breakfast in plain English. The agent estimates macros, writes a Firestore meal doc, and returns what's left on the daily sat-fat budget.",
    tags: ["Firestore", "Firebase MCP", "AI Agents", "Node.js", "Cursor"],
    github: "https://github.com/yjinn812/foodtracking-cursor",
    live: null,
    demo: "food-tracker-chat",
  },
  {
    id: 1,
    wide: true,
    title: "Google Sheets Microservice",
    description:
      "Typed Express microservice that appends rows to Google Sheets via OAuth, with Zod validation at the edge.",
    story:
      "Hit POST /sheets/append with a typed payload. The service handles Google OAuth and writes the row into the target spreadsheet range.",
    tags: ["Google APIs", "OAuth2.0", "Express", "TypeScript", "Zod"],
    github: "https://github.com/yjinn812/google-microservice",
    live: null,
    demo: "sheets-api-postman",
  },
  {
    id: 2,
    wide: true,
    eyebrow: "iOS app",
    title: "Expense Tracker / Splitter iOS App",
    description:
      "Native Swift app for trip expenses with multi-currency totals, category breakdowns, and fair splits across travelers, with Google Sheets as the analytics backend.",
    story:
      "Log a ramen night in JPY, see AUD totals update, and know who paid vs who owes, then push rows into Sheets for budget planning.",
    tags: ["Swift", "Xcode", "Google Sheets", "iOS"],
    github: null,
    live: null,
    demo: "expense-tracker-screens",
  },
  {
    id: 3,
    wide: true,
    eyebrow: "This site · design + build",
    title: "Personal Portfolio Website",
    description:
      "Night Ops Terminal portfolio: Syne + JetBrains Mono, expandable profile.json hero, scroll-scrubbed project stages, and a Three.js Möbius backdrop.",
    story:
      "You're looking at the proof. Command-bar hero, Work impact + case studies, project beats synced to the hologram, and demos that play the work.",
    tags: ["UI Design", "React", "Vite", "Three.js", "Framer Motion"],
    github: null,
    live: "https://www.yujinwong.com",
    demo: "portfolio-browser",
  },
  {
    id: 4,
    wide: true,
    eyebrow: "In progress",
    title: "Roguelite card RPG",
    description:
      "Card-battler with Spire-like runs and long-term progression. In design; not public yet.",
    tags: ["Pixi.JS", "React", "Vite", "Go", "Game Design"],
    github: null,
    live: null,
  },
];
