export const profile = {
  name: "Yu Jin Wong",
  title: "Lead Engineer @ National Australia Bank",
  tagline:
    "6+ years delivering enterprise software in banking across Salesforce and AWS, with proven impact in platform scalability, API integration, and CI/CD.",
  location: "Melbourne / Sydney",
  email: "wongyj812@gmail.com",
  phone: "0452 630 812",
  linkedin: "https://www.linkedin.com/in/yu-jin-wong/",
  github: "https://github.com/yjinn812",
  summary:
  "I'm a Lead Engineer who's spent 6+ years at the intersection of product, infrastructure, and people. At NAB, I've led large-scale CRM transformations, modernised CI/CD pipelines, and built the kind of full-stack systems that banking staff rely on daily. I bring strong opinions on architecture, a bias toward delivery, and a habit of mentoring engineers who want to grow. Outside the enterprise world, I build side projects in React and TypeScript — because good engineering is also something you do for fun."
};

export const experience = [
  {
    id: 1,
    company: "National Australia Bank",
    role: "Lead Engineer",
    period: "October 2024 – Present",
    highlights: [
      "Championed AI-assisted development by introducing Amazon Q and Claude 4/4.5 to the team; ran workshops on prompt engineering, code generation, branch debugging, and deployment automation.",
      "Optimized CI/CD pipelines using Jenkins, Docker, and Salesforce CLI, reducing developer environment setup time by 10-30 minutes per run.",
      "Refactored complex trigger-handler logic with a centralized record-processing pattern, reducing code complexity and improving processing performance by 400%.",
      "Established and facilitated bi-sprint developer forums to align onshore/offshore teams on technical design, reducing sprint spillover and improving collaboration.",
      "Led the majority of pull request reviews and served as a key technical decision-maker for architecture and implementation strategy.",
    ],
  },
  {
    id: 2,
    company: "National Australia Bank",
    role: "Senior Analyst Engineer",
    period: "May 2022 – October 2024",
    highlights: [
      "Contributed to major CRM expansion scaling the platform from 3,000 to 13,000 live users, delivering full-stack solutions across AWS and Salesforce.",
      "Led technical delivery of a large-scale legacy migration from Siebel to Salesforce, including data migration pipelines, lead management features, and multi-API integrations.",
      "Designed and implemented a reusable, high-performance multi-page component framework (LWC), standardizing front-end development patterns across user personas.",
      "Resolved high-severity production incidents involving third-party SaaS vendors, including Salesforce and Microsoft, while coordinating cross-team resolution.",
      "Built and deployed the Customer Conversation Framework using Financial Services Cloud Interactions to support APRA compliance at scale.",
    ],
  },
  {
    id: 3,
    company: "National Australia Bank",
    role: "Technical Product Owner",
    period: "July 2021 – April 2023",
    highlights: [
      "Collaborated with Product Managers, CRM Consultants, and Business Managers to define, scope, and deliver Salesforce platform enhancements.",
      "Owned sprint planning and monthly release scoping in partnership with Engineering Managers across multiple Salesforce instances.",
    ],
  },
  {
    id: 4,
    company: "National Australia Bank",
    role: "Analyst Engineer - CRM & DevOps",
    period: "April 2021 – May 2022",
    highlights: [
      "Managed and delivered BAU tickets while developing and maintaining full-stack enhancements across multiple platform environments.",
      "Maintained and improved CI/CD infrastructure leveraging AWS, Jenkins, Docker, and GitHub to support continuous delivery workflows.",
      "Improved resilience of daily batch jobs across internal Salesforce and external AWS systems with retry logic, structured logging, and alerting.",
    ],
  },
  {
    id: 5,
    company: "Appirio / Wipro",
    role: "Graduate Software Engineer",
    period: "September 2019 – April 2021",
    highlights: [
      "Resolution Life (AMP Life Divestiture): Delivered migration of 40+ Aura components to a new Salesforce org under tight timelines and designed a Singleton-based application log framework to handle governor and heap limits.",
      "Telstra: Investigated Salesforce Flow limits and architectural trade-offs, then built and maintained call center flows within a complex multi-flow architecture.",
      "AMP Capital: Led a graduate pre-sales team of 5 to deliver a property management calendar app in Salesforce, improving UX with SLDS patterns and standard LWC components.",
    ],
  },
];

export const skills = {
  "Software Engineering": [
    "JavaScript",
    "TypeScript",
    "REST APIs",
    "System Integration",
    "Performance Optimization",
    "HTML/CSS",
  ],
  "Cloud & DevOps": [
    "AWS",
    "Jenkins",
    "Docker",
    "GitHub Actions",
    "CI/CD",
    "Shell Scripting",
  ],
  "Platform Engineering (Salesforce)": [
    "Lightning Web Components",
    "Apex",
    "Flows",
    "SOQL",
    "Financial Services Cloud",
    "CRM Analytics",
    "Agentforce",
  ],
  "Architecture & Leadership": [
    "Technical Design",
    "Solution Architecture",
    "Code Review",
    "Mentoring",
    "Stakeholder Management",
    "Agile / Scrum",
  ],
};

export const certifications = [
  { name: "Black Belt (JavaScript)", issuer: "Codility" },
  { name: "Salesforce Certified Application Architect", issuer: "Salesforce" },
  { name: "Salesforce Certified Platform Data Architect", issuer: "Salesforce" },
  { name: "Salesforce Certified Platform Sharing & Visibility Architect", issuer: "Salesforce" },
  { name: "Salesforce Certified CRM Analytics & Einstein Discovery Consultant", issuer: "Salesforce" },
  { name: "Salesforce Certified Agentforce Specialist", issuer: "Salesforce" },
  { name: "Salesforce Certified Platform Developer", issuer: "Salesforce" },
  { name: "Salesforce Certified Platform App Builder", issuer: "Salesforce" },
  { name: "Salesforce Certified Admin", issuer: "Salesforce" }
];

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

export const projects = [
  {
    id: 1,
    title: "Google Sheets Microservice",
    description:
      "Microservice to insert data into specific google sheets.",
    tags: ["Google APIs", "OAuth2.0", "Microservice", "Typescript", "ExpressJS", "Zod", "NodeJS"],
    github: null,
    live: null,
  },
  {
    id: 2,
    title: "Expense Tracker/Splitter iOS App",
    description:
     "UI to store and record expenses made on a trip, UI to input data into google sheets to be used for analytics and budget planning.",
    tags: ["Swift", "XCode"],
    github: null,
    live: null,
  },
  {
    id: 3,
    title: "Personal Portfolio Website",
    description:
      "Personal website to display coding skills and portfolio",
    tags: ["React", "Typescript", "Vite", "HTML", "CSS"],
    github: null,
    live: null,
  },
  {
    id: 4,
    title: "Application Log Framework",
    description:
      "Designed an application log framework to capture errors reliably while minimizing heap and platform-limit exposure.",
    tags: ["Reliability", "Design Patterns", "Performance"],
    github: null,
    live: null,
  },
];
