import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { VscFolder } from "react-icons/vsc";
import { profile } from "../../data/portfolioData";
import "./Hero.css";

const yearsExp = new Date().getFullYear() - profile.year_start_work;

const openToRoles = [
  "Staff / Lead Engineer (Salesforce or platform)",
  "Solutions / Technical Architect",
  "Roles spanning Salesforce + AI across the SDLC",
  "Hands-on engineering leadership in complex orgs",
];

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
  open_to: {
    status: true,
    roles: openToRoles,
  },
};

const DETAIL_KEYS = new Set(["based_in", "industry"]);

/** Symmetric timing: close = BODY then SIZE, open = SIZE then BODY */
const BODY_MS = 400;
const SIZE_MS = 420;
const FACE_MS = 420;
const FOLDER_SIZE = 118;
const HEADER_HEIGHT = 52;
const CONTENT_SLIDE_X = 64;

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

function OpenToEntry({ value, indentLevel, isLast, expanded, reduceMotion }) {
  const roles = value.roles ?? [];
  const [showCollapsedMarker, setShowCollapsedMarker] = useState(!expanded);
  const expandMotion = reduceMotion
    ? { duration: 0 }
    : { height: { duration: 0.52, ease }, opacity: { duration: 0.36, ease } };

  useEffect(() => {
    if (expanded) setShowCollapsedMarker(false);
    else if (reduceMotion) setShowCollapsedMarker(true);
  }, [expanded, reduceMotion]);

  return (
    <div>
      <div className="terminal__line terminal__line--open-to">
        <JsonIndent level={indentLevel} />
        <span className="terminal__key">"open_to"</span>: <span className="terminal__brace">{"{"}</span>
        <span className="terminal__key"> "status"</span>: {renderJsonInlineValue(value.status)}
        <span className="terminal__brace">,</span>
        <span className="terminal__key"> "roles"</span>:{" "}
        {showCollapsedMarker ? (
          <>
            <span className="terminal__comment">...</span>
            <span className="terminal__brace"> {"}"}</span>
            {!isLast ? "," : ""}
          </>
        ) : (
          <span className="terminal__brace">[</span>
        )}
      </div>

      <motion.div
        className="terminal__open-to-roles"
        initial={false}
        animate={{
          height: expanded ? "auto" : 0,
          opacity: expanded ? 1 : 0,
        }}
        transition={expandMotion}
        style={{ overflow: "hidden" }}
        aria-hidden={!expanded}
        onAnimationComplete={() => {
          if (!expanded) setShowCollapsedMarker(true);
        }}
      >
        {roles.map((role, index) => (
          <div key={role} className="terminal__line">
            <JsonIndent level={indentLevel + 1} />
            {renderJsonInlineValue(role)}
            {index < roles.length - 1 ? "," : ""}
          </div>
        ))}
        <div className="terminal__line">
          <JsonIndent level={indentLevel} />
          <span className="terminal__brace">]</span>
        </div>
        <div className="terminal__line">
          <JsonIndent level={indentLevel} />
          <span className="terminal__brace">{"}"}</span>
          {!isLast ? "," : ""}
        </div>
      </motion.div>
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const fadeName = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

/**
 * phase machine (open ↔ close are exact reverses):
 *   open  → minimized → folder   (close / red)
 *   folder → minimized → open    (open / folder click)
 * Yellow toggles open ↔ minimized.
 * Green toggles json details while open.
 */
export default function Hero() {
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState("open");
  const [jsonExpanded, setJsonExpanded] = useState(false);
  const [busy, setBusy] = useState(false);
  const timersRef = useRef([]);

  const transition = reduceMotion ? { duration: 0 } : { duration: 0.55, ease };
  const sizeMotion = reduceMotion ? { duration: 0 } : { duration: SIZE_MS / 1000, ease };
  const detailMotion = reduceMotion
    ? { duration: 0 }
    : { height: { duration: 0.5, ease }, opacity: { duration: 0.34, ease } };
  const faceMotion = reduceMotion ? { duration: 0 } : { duration: FACE_MS / 1000, ease };

  function clearTimers() {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  }

  function after(ms, fn) {
    const id = window.setTimeout(fn, ms);
    timersRef.current.push(id);
    return id;
  }

  useEffect(() => () => clearTimers(), []);

  const isFolder = phase === "folder";
  const isMinimized = phase === "minimized";
  const isOpen = phase === "open";
  const bodyCollapsed = !isOpen;
  const showFolderFace = isFolder;

  function handleClose() {
    if (busy || isFolder) return;
    clearTimers();
    setJsonExpanded(false);

    if (reduceMotion) {
      setPhase("folder");
      return;
    }

    // open → minimized → folder (skip body wait if already minimized)
    setBusy(true);
    if (isMinimized) {
      setPhase("folder");
      after(SIZE_MS, () => setBusy(false));
      return;
    }
    setPhase("minimized");
    after(BODY_MS, () => {
      setPhase("folder");
      after(SIZE_MS, () => setBusy(false));
    });
  }

  function handleMinimize() {
    if (busy || isFolder) return;
    clearTimers();
    setBusy(false);
    if (isMinimized) {
      setPhase("open");
      return;
    }
    setJsonExpanded(false);
    setPhase("minimized");
  }

  function handleExpand() {
    if (busy || isFolder) return;
    clearTimers();
    if (isMinimized) {
      setPhase("open");
      setJsonExpanded(true);
      return;
    }
    setJsonExpanded((open) => !open);
  }

  function handleRestoreFromFolder() {
    if (busy || !isFolder) return;
    clearTimers();
    setJsonExpanded(false);

    if (reduceMotion) {
      setPhase("open");
      return;
    }

    // folder → minimized → open (exact reverse)
    setBusy(true);
    setPhase("minimized");
    after(SIZE_MS, () => {
      setPhase("open");
      setBusy(false);
    });
  }

  // Width: folder uses px; open/minimized use 100% of the visual column (min-width:0 so
  // the shell never inflates the grid track). Height: explicit only for folder ↔ bar.
  const shellAnimate =
    phase === "folder"
      ? { width: FOLDER_SIZE, height: FOLDER_SIZE }
      : phase === "minimized"
        ? { width: "100%", height: HEADER_HEIGHT }
        : { width: "100%" };

  const visibleEntries = Object.entries(profileJsonData);

  return (
    <section className="hero" id="hero">
      <div className="hero__grid-bg" aria-hidden />
      <div className="container hero__inner">
        <motion.div
          className="hero__content"
          animate={{ x: isFolder ? CONTENT_SLIDE_X : 0 }}
          transition={{ x: sizeMotion }}
        >
          <motion.div
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
        </motion.div>

        <div className="hero__visual">
          <motion.div
            className={`hero__profile-shell${isFolder ? " hero__profile-shell--folder" : ""}${bodyCollapsed ? " hero__profile-shell--collapsed" : ""}`}
            initial={false}
            animate={shellAnimate}
            transition={{
              width: sizeMotion,
              height: isOpen ? { duration: 0 } : sizeMotion,
            }}
            style={isOpen ? { height: "auto" } : undefined}
            onClick={isFolder ? handleRestoreFromFolder : undefined}
            role={isFolder ? "button" : undefined}
            tabIndex={isFolder ? 0 : undefined}
            onKeyDown={
              isFolder
                ? (event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      handleRestoreFromFolder();
                    }
                  }
                : undefined
            }
            aria-label={isFolder ? "Open profile.json" : undefined}
            title={isFolder ? "Open profile.json" : undefined}
            data-phase={phase}
          >
            <motion.div
              className="hero__profile-face hero__profile-face--folder"
              initial={false}
              animate={{ opacity: showFolderFace ? 1 : 0 }}
              transition={faceMotion}
              aria-hidden={!showFolderFace}
              style={{ pointerEvents: isFolder ? "auto" : "none" }}
            >
              <VscFolder aria-hidden />
              <span>profile.json</span>
            </motion.div>

            <motion.div
              className="hero__profile-face hero__profile-face--terminal"
              initial={false}
              animate={{ opacity: showFolderFace ? 0 : 1 }}
              transition={faceMotion}
              aria-hidden={showFolderFace}
              style={{ pointerEvents: showFolderFace ? "none" : "auto" }}
            >
              <div className="terminal__header">
                <div
                  className="terminal__controls"
                  role="group"
                  aria-label="Terminal controls"
                  onClick={(event) => {
                    if (busy || isFolder) return;
                    const action = event.target
                      .closest("[data-terminal-action]")
                      ?.getAttribute("data-terminal-action");
                    if (!action) return;
                    event.preventDefault();
                    event.stopPropagation();
                    if (action === "close") handleClose();
                    else if (action === "minimize") handleMinimize();
                    else if (action === "expand") handleExpand();
                  }}
                >
                  <button
                    type="button"
                    className="terminal__dot terminal__dot--red"
                    data-terminal-action="close"
                    aria-label="Close terminal"
                    title="Close"
                    disabled={busy || isFolder}
                  >
                    close
                  </button>
                  <button
                    type="button"
                    className="terminal__dot terminal__dot--yellow"
                    data-terminal-action="minimize"
                    aria-label={isMinimized ? "Restore terminal" : "Minimize terminal"}
                    title={isMinimized ? "Restore" : "Minimize"}
                    disabled={busy || isFolder}
                  >
                    minimize
                  </button>
                  <button
                    type="button"
                    className="terminal__dot terminal__dot--green"
                    data-terminal-action="expand"
                    aria-label={jsonExpanded ? "Collapse profile details" : "Expand profile details"}
                    title={jsonExpanded ? "Collapse" : "Expand"}
                    disabled={busy || isFolder}
                  >
                    expand
                  </button>
                </div>
                <span className="terminal__title">profile.json</span>
              </div>

              <div
                className={`terminal__body${bodyCollapsed ? "" : " is-open"}`}
                aria-hidden={bodyCollapsed}
              >
                <div className="terminal__body-inner">
                  <div className="terminal__json">
                    <div className="terminal__line">
                      <span className="terminal__brace">{"{"}</span>
                    </div>
                    {visibleEntries.map(([key, value], index, entries) => {
                      const isLast = index === entries.length - 1;
                      if (key === "open_to") {
                        return (
                          <OpenToEntry
                            key={key}
                            value={value}
                            indentLevel={1}
                            isLast={isLast}
                            expanded={jsonExpanded}
                            reduceMotion={reduceMotion}
                          />
                        );
                      }
                      if (DETAIL_KEYS.has(key)) {
                        return (
                          <motion.div
                            key={key}
                            initial={false}
                            animate={{
                              height: jsonExpanded ? "auto" : 0,
                              opacity: jsonExpanded ? 1 : 0,
                            }}
                            transition={detailMotion}
                            style={{ overflow: "hidden" }}
                            aria-hidden={!jsonExpanded}
                          >
                            {renderJsonEntry([key, value], 1, isLast)}
                          </motion.div>
                        );
                      }
                      return renderJsonEntry([key, value], 1, isLast);
                    })}
                    <div className="terminal__line">
                      <span className="terminal__brace">{"}"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
