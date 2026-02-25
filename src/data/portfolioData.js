export const profile = {
  name: "Yu Jin Wong",
  title: "Lead Engineer / Technical Lead",
  tagline: "6 years building high-performance solutions on Salesforce & AWS",
  location: "Melbourne / Sydney",
  email: "wongyj812@gmail.com",
  phone: "0452 630 812",
  linkedin: "https://linkedin.com/in/yujinwong", // update with real URL
  github: "https://github.com/yujinwong", // update with real URL
  summary:
    "Dynamic Lead Engineer with 6 years of experience driving innovative solutions and enhancing operational efficiency within Salesforce and AWS environments. Expertise in CI/CD automation, significantly reducing development time, and introducing effective frameworks for Lightning Web Components. Proven ability to facilitate cross-collaboration among diverse teams, fostering improved communication and technical design alignment.",
};

export const experience = [
  {
    id: 1,
    company: "National Australia Bank",
    role: "Lead Engineer / Technical Lead",
    period: "October 2024 – Present",
    highlights: [
      "First adopter of Amazon Q within squad; ran workshops on prompt engineering and provided guidance on using Claude 4/4.5 via Amazon Q to aid in development and testing.",
      "Improved CI/CD automation saving approximately 10–30 minutes per dev environment setup using shell scripts on Salesforce native CLI in Docker containers.",
      "Introduced developer forum/discussion sessions each sprint to improve cross-collaboration in an onshore-offshore delivery model, highly reducing sprint spillover.",
      "Reduced complex Salesforce trigger handler methods by introducing a record processing function, improving record processing speed by 400%.",
      "Responsible for leading majority of pull request reviews and key technical solution design decisions.",
    ],
  },
  {
    id: 2,
    company: "National Australia Bank",
    role: "Senior Analyst Engineer",
    period: "May 2022 – October 2024",
    highlights: [
      "Part of the expansion of bankers from 3,000 to 13,000 live bankers on Salesforce.",
      "Led the Salesforce side of the migration and go-live of NAB Personal Banking staff from Siebel to Salesforce, including lead management and legacy data migration.",
      "Developed a multi-API service to link potential sales items with new customer accounts or card openings originating from legacy on-premise systems.",
      "Introduced a high-efficiency, high-performance framework/guideline for multi-page Lightning Web Components for various user personas.",
    ],
  },
  {
    id: 3,
    company: "National Australia Bank",
    role: "Technical Product Owner",
    period: "July 2021 – April 2023",
    highlights: [
      "Worked with Product Managers, CRM Consultants, and Business Managers to design and deliver Salesforce BAU enhancements.",
      "Collaborated with Engineering Managers on monthly release scoping and planning.",
      "Designed and delivered the Customer Conversation Framework using Financial Services Cloud Interactions to ensure APRA compliance, scaled across all banking units.",
      "Resolved several high-severity production incidents involving third-party vendors (Salesforce, Microsoft).",
    ],
  },
  {
    id: 4,
    company: "National Australia Bank",
    role: "Analyst Engineer (Salesforce & DevOps)",
    period: "April 2021 – May 2022",
    highlights: [
      "Managed BAU tickets and developed/maintained enhancements across multiple Salesforce instances.",
      "Maintained and improved existing CI/CD infrastructure leveraging AWS, Jenkins, Docker, and GitHub.",
      "Improved resilience of multiple daily batch job runs (internal Salesforce & external AWS) with better retry, logging, and alerting mechanisms.",
    ],
  },
  {
    id: 5,
    company: "Appirio / Wipro Graduate Program",
    role: "Graduate Consultant",
    period: "September 2019 – April 2021",
    highlights: [
      "Resolution Life: Migrated 40+ Aura components for the AMP Life divest project. Designed an application log framework using Java singleton pattern to avoid heap size/limit issues.",
      "Telstra: Investigated technical limits of Salesforce Flows and provided detailed analysis on recommended solutions. Maintained complex multi-flow call center architecture.",
      "AMP Capital: Led a pre-sales graduate team of 5 to create a POC for a property management calendar app embedded in Salesforce, challenging UX design with best practices (SLDS).",
    ],
  },
];

export const skills = {
  "Salesforce Platform": [
    "Lightning Web Components",
    "Apex",
    "Flows",
    "SOQL",
    "Financial Services Cloud",
    "CRM Analytics",
    "Agentforce",
    "SLDS",
  ],
  "DevOps & Cloud": [
    "AWS",
    "Jenkins",
    "Docker",
    "GitHub Actions",
    "CI/CD",
    "Shell Scripting",
    "Salesforce CLI",
  ],
  "Languages & Dev": ["JavaScript", "Java", "Python", "REST APIs", "SOQL", "HTML/CSS"],
  "Architecture & Leadership": [
    "Technical Design",
    "Solution Architecture",
    "Agile / Scrum",
    "Code Review",
    "Mentoring",
    "Stakeholder Management",
  ],
};

export const certifications = [
  { name: "Salesforce Certified Application Architect", issuer: "Salesforce" },
  { name: "Salesforce Certified Platform Data Architect", issuer: "Salesforce" },
  { name: "Salesforce Certified Platform Sharing & Visibility Architect", issuer: "Salesforce" },
  { name: "Salesforce Certified CRM Analytics & Einstein Discovery Consultant", issuer: "Salesforce" },
  { name: "Salesforce Certified Agentforce Specialist", issuer: "Salesforce" },
  { name: "Salesforce Certified Platform Developer", issuer: "Salesforce" },
  { name: "Salesforce Certified Platform App Builder", issuer: "Salesforce" },
  { name: "Salesforce Certified Admin", issuer: "Salesforce" },
  { name: "Black Belt (JavaScript)", issuer: "Codility" },
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
    title: "CI/CD Automation Pipeline",
    description:
      "Enhanced CI/CD automation integrated with Jenkins using shell scripts on Salesforce native CLI in Docker containers, saving 10–30 minutes per dev environment setup.",
    tags: ["Jenkins", "Docker", "Salesforce CLI", "Shell", "DevOps"],
    github: "#",
    live: null,
  },
  {
    id: 2,
    title: "Customer Conversation Framework",
    description:
      "Designed and delivered a compliance framework using Financial Services Cloud Interactions for APRA regulations on banker-customer communication, scaled across all NAB banking units.",
    tags: ["Salesforce FSC", "APRA Compliance", "LWC", "Architecture"],
    github: "#",
    live: null,
  },
  {
    id: 3,
    title: "Multi-API Banking Integration",
    description:
      "Developed a multi-API service to link potential sales items with new customer accounts or card openings originating from legacy on-premise systems (Siebel).",
    tags: ["REST APIs", "Salesforce", "AWS", "Integration", "Apex"],
    github: "#",
    live: null,
  },
  {
    id: 4,
    title: "Application Log Framework",
    description:
      "Designed a Salesforce application log framework using Java singleton pattern to capture all errors while avoiding heap size and governor limit issues.",
    tags: ["Apex", "Salesforce", "Design Patterns", "Performance"],
    github: "#",
    live: null,
  },
];
