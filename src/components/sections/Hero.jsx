import { motion, useReducedMotion } from "framer-motion";
import { profile } from "../../data/portfolioData";
import "./Hero.css";

const yearsExp = new Date().getFullYear() - profile.year_start_work;

const profileJsonData = {
  name: profile.name,
  role: "Lead Engineer",
  currently_at: "NAB",
  based_in: profile.location,
  years_exp: yearsExp,
  industry: ["Banking", "Insurance", "Telecom"],
  strengths: ["Problem Solving", "Technical Design", "Code Review", "Mentoring"],
  primary_stack: ["Salesforce FSC", "SOQL/SOSL", "Apex", "Javascript", "Cursor/Claude", "..more"],
  also_builds_with: ["TypeScript", "React", "AWS", "Firebase", "Express.js", "Node.js", "Swift", "..more"],
  impacts: {
    users_scaled: "3,000 -> 13,000",
    processing_gain: "4x",
    setup_time_saved: "10-30 min",
  },
  open_to_roles: true,
};

const arrayItemsPerLine = {
  industry: 3,
  strengths: 2,
  primary_stack: 2,
  also_builds_with: 3,
};

const ease = [0.22, 1, 0.36, 1];

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
  if (typeof value === "number") {
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

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

/* Avoid transform on the name — it clips font descenders (e.g. the "g" in Wong) */
const fadeName = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.55, ease };

  return (
    <section className="hero" id="hero">
      <div className="hero__grid-bg" aria-hidden />
      <div className="container hero__inner">
        <motion.div
          className="hero__content"
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.08, delayChildren: 0.05 },
            },
          }}
        >
          <motion.p className="hero__greeting" variants={fadeUp} transition={transition}>
            <span className="hero__prompt">$&gt;</span> hello, world
          </motion.p>

          <motion.h1
            className="hero__name"
            variants={fadeName}
            transition={transition}
            style={{ overflow: "visible" }}
          >
            <span className="hero__name-line">Yu Jin</span>
            <span className="hero__name-line">Wong</span>
          </motion.h1>

          <motion.p className="hero__title" variants={fadeUp} transition={transition}>
            {profile.title}
          </motion.p>

          <motion.div className="hero__actions" variants={fadeUp} transition={transition}>
            <a href="#projects" className="hero__btn hero__btn--primary">
              View My Work
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero__terminal"
          initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.7, delay: 0.28, ease }}
        >
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
        </motion.div>
      </div>
    </section>
  );
}
