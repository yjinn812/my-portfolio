export const profile = {
  name: "Yu Jin Wong",
  title: "Lead Engineer @ National Australia Bank",
  tagline:
    "7+ years delivering enterprise software in banking across Salesforce and AWS, with proven impact in platform scalability, API integration, and CI/CD.",
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
    "id": 1,
    "company": "National Australia Bank",
    "role": "Lead Engineer",
    "period": "October 2024 – Present",
    "summary":"Technical lead for NAB's enterprise CRM engineering squad, accountable for architecture decisions, delivery quality, and engineering capability across a 13,000+ user platform spanning Personal, Corporate, and Business Banking.",
    "highlights": [
      "Provided technical direction and design governance to senior developers on feature delivery, platform architecture, and clean/reusable code standards.",
      "Led pull request reviews and technical design alignment forums; accountable for technical quality and sprint velocity across the onshore-offshore delivery model. Up-skilled senior engineers on PR reviews and peer reviews to improve velocity on delivery without lowering quality of code.",
      "Acted as technical SME for monthly production deployments, providing rapid resolution of post-deployment issues and maintaining platform stability across release cycles.",
      "Championed AI-assisted development: ran Cursor POCs, built adoption guidelines (including legal considerations), and presented estimated productivity gains to executives and the wider engineering team. Ran prompt engineering workshops across full SDLC including solution architecture, software development, testing, and documentation.",
      "Replaced Conga mail merge (AppExchange) with a CCOM-based solution within one month on an unfamiliar legacy Salesforce instance — driven by third-party security vulnerabilities.",
      "Led migration of ~20% of Corporate & Institutional Banking users from Salesforce Classic to the enterprise CRM platform.",
      "Overhauled CI/CD pipeline saving 10–30 minutes per developer setup; refactored trigger handler architecture achieving a 400% improvement in record processing speed."
    ]
  },
  {
    "id": 2,
    "company": "National Australia Bank",
    "role": "Senior Analyst Engineer / Technical Product Owner",
    "period": "May 2022 – October 2024",
    "summary": "Key full-stack contributor to NAB's Salesforce expansion from 3,000 to 13,000 live bankers, acting as defacto solution architect on flagship initiatives including APRA-regulated compliance frameworks and a major legacy CRM migration.",
    "highlights": [
      "Acted as defacto solution architect for the Customer Conversation Framework — designed the FSC Interactions-based solution, presented to the Security Architect Review Board and business/delivery stakeholders to obtain implementation approval; scaled across all Personal, Business, and Corporate Banking divisions in compliance with APRA requirements.",
      "Led the Salesforce side of NAB Personal Banking's Siebel-to-Salesforce migration — data migration, lead management, and a multi-API service connecting Salesforce to originating legacy systems.",
      "Resolved a major production outage on the appointment booking system — diagnosed a Salesforce backend Outlook calendar batch syncing bottleneck and implemented a targeted fix that restored service ahead of the automated cycle.",
      "Architected a high-performance multi-page LWC framework to standardize component patterns across multiple user personas for 13,000+ bankers.",
      "Resolved high-severity production incidents involving Salesforce and Microsoft SaaS products, providing technical guidance across vendor teams.",
      "Continued in a dual capacity as Technical Product Owner through April 2023, applying hands-on stakeholder management and sprint planning expertise to bridge the gap between business priorities and engineering delivery.",
    ]
  },
  {
    "id": 3,
    "company": "National Australia Bank",
    "role": "Technical Product Owner / Analyst Engineer",
    "period": "April 2021 – April 2022",
    "summary": "Wore two hats as both Technical Product Owner and DevOps engineer within NAB's BAU team — balancing sprint delivery and release governance with hands-on CI/CD infrastructure ownership and complex production incident resolution.",
    "highlights": [
      "Scoped and delivered BAU Salesforce enhancements in collaboration with Product Managers, CRM Consultants, Business Managers, and end users.",
      "Worked with Engineering Managers on monthly release scoping and planning.",
      "In-charge of sprint planning for upcoming Salesforce-related enhancement and fix work.",
      "Maintained CI/CD infrastructure (AWS, Jenkins, Docker, GitHub); improved resilience of batch jobs with enhanced retry, logging, and alerting.",
      "Triaged and resolved a complex multi-system customer data sync issue across NAB's data pipeline (on-prem → Kafka → Oracle → Salesforce via AWS Lambda), coordinating a production data fix across multiple teams."
    ]
  },
  {
    "id": 4,
    "company": "Appirio / Wipro",
    "role": "Graduate Software Engineer",
    "period": "September 2019 – April 2021",
    "summary": "Rotated across three enterprise Salesforce engagements — Resolution Life, Telstra, and AMP Capital — delivering component migrations, call center flow architecture, and a pre-sales POC that outperformed the competing team's demo.",
    "highlights": [
      "Resolution Life (AMP Life Divestiture): Migrated approximately 40+ Aura components to a new Salesforce org under tight timelines. Designed an application log framework using a Singleton pattern to reliably capture errors while avoiding heap size and platform limit issues. Provided insights on security model design to solution architects and business analysts.",
      "Telstra: Investigated technical limits and architectural trade-offs of Salesforce Flows for the technical architect, providing a detailed recommended solution. Maintained and introduced new call center flows within a complex multi-flow architecture.",
      "AMP Capital: Led a pre-sales graduate team of 5 to build and present a property management calendar app POC for Salesforce homepages. Challenged the original UX design by applying SLDS patterns and standard LWC components, delivering a cleaner solution than the competing team."
    ]
  }
];

export const skills = {
  "Software Engineering": [
    "JavaScript",
    "TypeScript",
    "REST APIs",
    "System Integration",
    "Microservices",
    "Express.js",
    "BFFs",
    "Mini-apps",
    "Performance Optimization",
    "HTML/CSS"
  ],
  "Cloud & DevOps": [
    "AWS",
    "Jenkins",
    "Docker",
    "GitHub Actions",
    "CI/CD",
    "Shell Scripting"
  ],
  "Platform Engineering (Salesforce)": [
    "Lightning Web Components",
    "Apex",
    "Flows",
    "SOQL",
    "Financial Services Cloud",
    "CRM Analytics",
    "Agentforce"
  ],
  "Architecture & Leadership": [
    "Technical Design",
    "Solution Architecture",
    "Code Review",
    "Mentoring",
    "Stakeholder Management",
    "Agile / Scrum"
  ]
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

export const projects = 
[
  {
    id: 1,
    title: "Google Sheets Microservice",
    description:
      "Microservice to insert data into specific google sheets.",
    tags: ["Google APIs", "OAuth2.0", "Microservice", "Typescript", "ExpressJS", "Zod", "NodeJS"],
    github: "https://github.com/yjinn812/google-microservice",
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
    github: "https://github.com/yjinn812/my-portfolio",
    live: null,
  },
  {
    id: 4,
    title: "[Name - TBC] Roguelite - Card Game RPG",
    description:
      "Card-game designed using inspirations of game play from Slay the Spire, concept/character inspiration from Dungeon and Dragons with progression of MMORPG with inspiration from games like WOW/Lost ARK/Maplestory. Design to have endless scaling/fun and meaningful progression.",
    tags: ["Pixi.JS", "React", "Vite.JS" , "GO", "Game Design"],
    github: null,
    live: null,
  },
];
