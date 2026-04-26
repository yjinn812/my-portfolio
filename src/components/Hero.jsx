import { profile } from "../data/portfolioData";
import "./Hero.css";
import resumeFile from "../../YUJIN_RESUME_CV.pdf?url";

const stackPills = [
  { label: "Salesforce FSC", tone: "platform" },
  { label: "Cursor/Claude", tone: "platform" },
  { label: "Apex/Java", tone: "backend" },
  { label: "Javascript/TypeScript", tone: "frontend" },
  { label: "React", tone: "frontend" },
  { label: "AWS", tone: "cloud" },
  { label: "Jenkins / CI-CD", tone: "cloud" },
];

const profileJsonData = {
  name: "Yu Jin Wong",
  role: "Lead Engineer",
  currently_at : "NAB",
  industry: ["Banking","Insurance","Telecom"],
  strengths: ["Problem Solving", "Technical Design", "Code Review", "Mentoring"],
  primary_stack: ["Salesforce FSC", "SOQL/SOSL","Apex", "Javascript", "Cursor/Claude","..more"],
  also_builds_with: ["TypeScript", "React", "AWS", "Express.js", "Vite.js", "Node.js","Shell Scripting","Swift", "..more"],
  impacts: {
    users_scaled: "3,000 -> 13,000",
    processing_gain: "4x",
    setup_time_saved: "10-30 min",
  },
  open_to_roles: true,
};

const arrayItemsPerLine = {
  industry : 3,
  strengths: 2,
  primary_stack: 2,
  also_builds_with: 3,
};

function JsonIndent({ level }) {
  if (level <= 0) return null;
  return <span className="terminal__indent" style={{ width: `${level * 16}px` }} />;
}

function chunkArray(items, size) {
  const chunks = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
}

function renderJsonInlineValue(value) {
  if (typeof value === "string") {
    return <span className="terminal__string">"{value}"</span>;
  }
  if (typeof value === "boolean") {
    return <span className="terminal__boolean">{String(value)}</span>;
  }
  return <span className="terminal__brace">{String(value)}</span>;
}

function renderJsonEntry([key, value], indentLevel, isLast) {
  if (Array.isArray(value)) {
    const itemsPerLine = Math.max(1, arrayItemsPerLine[key] ?? 1);
    const chunks = chunkArray(value, itemsPerLine);

    return (
      <div key={key}>
        <div className="terminal__line">
          <JsonIndent level={indentLevel} />
          <span className="terminal__key">"{key}"</span>: <span className="terminal__brace">[</span>
        </div>
        {chunks.map((chunk, chunkIndex) => (
          <div key={`${key}-chunk-${chunkIndex}`} className="terminal__line">
            <JsonIndent level={indentLevel + 1} />
            {chunk.map((item, itemIndex) => {
              const globalIndex = chunkIndex * itemsPerLine + itemIndex;
              const hasTrailingComma = globalIndex < value.length - 1;
              return (
                <span key={`${key}-${globalIndex}`}>
                  {renderJsonInlineValue(item)}
                  {hasTrailingComma ? ", " : ""}
                </span>
              );
            })}
          </div>
        ))}
        <div className="terminal__line">
          <JsonIndent level={indentLevel} />
          <span className="terminal__brace">]</span>
          {!isLast ? "," : ""}
        </div>
      </div>
    );
  }

  if (value && typeof value === "object") {
    const nestedEntries = Object.entries(value);
    return (
      <div key={key}>
        <div className="terminal__line">
          <JsonIndent level={indentLevel} />
          <span className="terminal__key">"{key}"</span>: <span className="terminal__brace">{"{"}</span>
        </div>
        {nestedEntries.map((nestedEntry, index) =>
          renderJsonEntry(nestedEntry, indentLevel + 1, index === nestedEntries.length - 1),
        )}
        <div className="terminal__line">
          <JsonIndent level={indentLevel} />
          <span className="terminal__brace">{"}"}</span>
          {!isLast ? "," : ""}
        </div>
      </div>
    );
  }

  return (
    <div key={key} className="terminal__line">
      <JsonIndent level={indentLevel} />
      <span className="terminal__key">"{key}"</span>: {renderJsonInlineValue(value)}
      {!isLast ? "," : ""}
    </div>
  );
}

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero__grid-bg" aria-hidden />
      <div className="container hero__inner">
        <div className="hero__content fade-up">
          <p className="hero__greeting">
            <span className="hero__prompt">$&gt;</span> hello, world
          </p>
          <h1 className="hero__name">{profile.name}</h1>
          <h2 className="hero__title">{profile.title}</h2>
          <p className="hero__tagline">{profile.tagline}</p>

          <div className="hero__meta">
            <span>📍 {profile.location}</span>
            <span className="hero__dot" />
            <span> NAB </span>
            <span className="hero__dot" />
            <span>{new Date().getFullYear - profile.year_start_work} yrs exp</span>
          </div>

          <div className="hero__pill-list">
            {stackPills.map((skill) => (
              <span key={skill.label} className={`hero__pill hero__pill--${skill.tone}`}>
                {skill.label}
              </span>
            ))}
          </div>

          <div className="hero__actions">
            <a href="#projects" className="hero__btn hero__btn--primary">
              View My Work
            </a>
            <a href="#contact" className="hero__btn hero__btn--ghost">
              Get In Touch
            </a>
            <a href={resumeFile} download="Yu_Jin_Wong_Resume.docx" className="hero__btn hero__btn--download">
              Download Resume
            </a>
          </div>
        </div>

        <div className="hero__terminal fade-up" style={{ animationDelay: "0.2s" }}>
          <div className="terminal__header">
            <span className="terminal__dot terminal__dot--red" />
            <span className="terminal__dot terminal__dot--yellow" />
            <span className="terminal__dot terminal__dot--green" />
            <span className="terminal__title">profile.json</span>
          </div>
          <div className="terminal__body terminal__json">
            <div className="terminal__line">
              <span className="terminal__brace">{"{"}</span>
            </div>
            {Object.entries(profileJsonData).map((entry, index, entries) =>
              renderJsonEntry(entry, 1, index === entries.length - 1),
            )}
            <div className="terminal__line">
              <span className="terminal__brace">{"}"}</span>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
