export const profile = {
  name: "Yu Jin Wong",
  title: "Lead Engineer @ National Australia Bank",
  year_start_work : 2019,
  tagline:
    "7+ years delivering enterprise software in banking across Salesforce and AWS, with proven impact in platform scalability, API integration, and CI/CD.",
  location: "Melbourne / Sydney",
  email: "wongyj812@gmail.com",
  phone: "0452 630 812",
  linkedin: "https://www.linkedin.com/in/yu-jin-wong/",
  github: "https://github.com/yjinn812",
  summary:
  "I'm a Lead Engineer who's spent 7+ years at the intersection of product, infrastructure, and people. At NAB, I've led large-scale CRM transformations, modernised CI/CD pipelines, and built the kind of full-stack systems that banking staff rely on daily. I bring strong opinions on architecture, a bias toward delivery, and a habit of mentoring engineers who want to grow. Outside the enterprise world, I build side projects in React and TypeScript, because good engineering is also something you do for fun."
};

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
  years_exp: new Date().getFullYear() - profile.year_start_work,
  industry: ["Banking", "Insurance", "Telecom"],
  strengths: [
    "Technical Design",
    "Web UI Design",
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
    title: "Salesforce & platforms",
    note: "Most of my production time lives here.",
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
    title: "App code & APIs",
    note: "Services, UIs, and other tools I've worked with.",
    items: [
      "TypeScript",
      "JavaScript",
      "React",
      "Node.js",
      "Express",
      "REST APIs",
    ],
  },
  {
    title: "Web UI & design",
    note: "Layout, polish, and motion I own in the browser.",
    items: [
      "Responsive layout",
      "CSS / design tokens",
      "Typography",
      "Framer Motion",
      "Interactive demos",
      "Vite",
    ],
  },
  {
    title: "Delivery & cloud",
    note: "Release plumbing and cloud basics, plus the AI tools I actually use.",
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
      "Microservice to insert data into specific google sheets.",
    story:
      "Hit POST /sheets/append with a typed payload. The service handles Google OAuth and writes the row into the target spreadsheet range.",
    tags: ["Google APIs", "OAuth2.0", "Microservice", "Typescript", "ExpressJS", "Zod", "NodeJS"],
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
      "Designed and built end-to-end: composition, typography, motion, and interactive demos that show the work instead of only listing it.",
    story:
      "You're looking at the proof. Custom terminal hero, scroll-stacked projects, and a reactive line grid under the page.",
    tags: ["UI Design", "React", "Vite", "Framer Motion", "CSS"],
    github: null,
    live: "https://www.yujinwong.com",
    demo: "portfolio-browser",
  },
  {
    id: 4,
    wide: true,
    eyebrow: "In progress",
    title: "[Name - TBC] Roguelite - Card Game RPG",
    description:
      "Card-game designed using inspirations of game play from Slay the Spire, concept/character inspiration from Dungeon and Dragons with progression of MMORPG with inspiration from games like WOW/Lost ARK/Maplestory. Design to have endless scaling/fun and meaningful progression.",
    tags: ["Pixi.JS", "React", "Vite.JS" , "GO", "Game Design"],
    github: null,
    live: null,
  },
];
