import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { VscFolder } from "react-icons/vsc";
import {
  profileJsonArrayPreview,
  profileJsonData,
  profileJsonDetailKeys,
  profileJsonItemsPerLine,
} from "../../data/portfolioData";
import { easeOut } from "../../lib/motion";
import { Reveal } from "../ui/Reveal";
import "./Profile.css";

const DETAIL_KEYS = new Set(profileJsonDetailKeys);
const ARRAY_PREVIEW = profileJsonArrayPreview;

/** Symmetric timing: close = BODY then SIZE, open = SIZE then BODY */
const BODY_MS = 250;
const SIZE_MS = 250;
const FACE_MS = 200;
const FOLDER_SIZE = 118;
const HEADER_HEIGHT = 52;

function JsonIndent({ level }) {
  if (level <= 0) return null;
  return <span className="terminal__indent" style={{ width: `${level * 16}px` }} />;
}

function chunkArray(items, size) {
  const chunks = [];
  for (let i = 0; i < items.length; i += size) chunks.push(items.slice(i, i + size));
  return chunks;
}

function renderJsonInlineValue(value) {
  if (typeof value === "string") return <span className="terminal__string">"{value}"</span>;
  if (typeof value === "boolean" || typeof value === "number") {
    return <span className="terminal__boolean">{String(value)}</span>;
  }
  return <span className="terminal__brace">{String(value)}</span>;
}

function renderJsonEntry([key, value], indentLevel, isLast) {
  if (Array.isArray(value)) {
    const itemsPerLine = Math.max(1, profileJsonItemsPerLine[key] ?? 1);
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
          renderJsonEntry(nestedEntry, indentLevel + 1, index === nestedEntries.length - 1)
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

function CollapsibleArrayEntry({
  name,
  items,
  previewCount,
  indentLevel,
  isLast,
  expanded,
  reduceMotion,
}) {
  const preview = items.slice(0, previewCount);
  const rest = items.slice(previewCount);
  const hasMore = rest.length > 0;
  const itemsPerLine = Math.max(1, profileJsonItemsPerLine[name] ?? 1);
  const previewChunks = chunkArray(preview, itemsPerLine);
  const restChunks = chunkArray(rest, itemsPerLine);
  const showEllipsis = hasMore && !expanded;

  return (
    <div>
      <div className="terminal__line">
        <JsonIndent level={indentLevel} />
        <span className="terminal__key">"{name}"</span>: <span className="terminal__brace">[</span>
      </div>
      {previewChunks.map((chunk, chunkIndex) => (
        <div key={`${name}-preview-${chunkIndex}`} className="terminal__line">
          <JsonIndent level={indentLevel + 1} />
          {chunk.map((item, itemIndex) => {
            const globalIndex = chunkIndex * itemsPerLine + itemIndex;
            const isLastPreview = globalIndex === preview.length - 1;
            const needsComma = !isLastPreview || hasMore;
            return (
              <span key={`${name}-p-${globalIndex}`}>
                {renderJsonInlineValue(item)}
                {needsComma ? ", " : ""}
                {isLastPreview && showEllipsis ? (
                  <span className="terminal__comment">...</span>
                ) : null}
              </span>
            );
          })}
        </div>
      ))}

      {hasMore && (
        <div
          className={`terminal__reveal${expanded ? " is-open" : ""}${reduceMotion ? " terminal__reveal--instant" : ""}`}
          aria-hidden={!expanded}
        >
          <div className="terminal__reveal-inner">
            {restChunks.map((chunk, chunkIndex) => (
              <div key={`${name}-rest-${chunkIndex}`} className="terminal__line">
                <JsonIndent level={indentLevel + 1} />
                {chunk.map((item, itemIndex) => {
                  const globalIndex = chunkIndex * itemsPerLine + itemIndex;
                  const hasTrailingComma = globalIndex < rest.length - 1;
                  return (
                    <span key={`${name}-r-${globalIndex}`}>
                      {renderJsonInlineValue(item)}
                      {hasTrailingComma ? ", " : ""}
                    </span>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="terminal__line">
        <JsonIndent level={indentLevel} />
        <span className="terminal__brace">]</span>
        {!isLast ? "," : ""}
      </div>
    </div>
  );
}

function OpenToEntry({ value, indentLevel, isLast, expanded, reduceMotion }) {
  const roles = value.roles ?? [];

  return (
    <div>
      <div className="terminal__line terminal__line--open-to">
        <JsonIndent level={indentLevel} />
        <span className="terminal__key">"open_to"</span>: <span className="terminal__brace">{"{"}</span>
        <span className="terminal__key"> "status"</span>: {renderJsonInlineValue(value.status)}
        <span className="terminal__brace">,</span>
        <span className="terminal__key"> "roles"</span>:{" "}
        {expanded ? (
          <span className="terminal__brace">[</span>
        ) : (
          <>
            <span className="terminal__comment">...</span>
            <span className="terminal__brace"> {"}"}</span>
            {!isLast ? "," : ""}
          </>
        )}
      </div>

      <div
        className={`terminal__reveal${expanded ? " is-open" : ""}${reduceMotion ? " terminal__reveal--instant" : ""}`}
        aria-hidden={!expanded}
      >
        <div className="terminal__reveal-inner">
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
        </div>
      </div>
    </div>
  );
}

export default function Profile() {
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState("open");
  const [jsonExpanded, setJsonExpanded] = useState(false);
  const [busy, setBusy] = useState(false);
  const [compactLayout, setCompactLayout] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(max-width: 900px)").matches : false
  );
  const timersRef = useRef([]);

  const faceMotion = reduceMotion
    ? { duration: 0 }
    : { duration: FACE_MS / 1000, ease: easeOut };

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

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 900px)");
    const sync = () => setCompactLayout(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

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

    setBusy(true);
    setPhase("minimized");
    after(SIZE_MS, () => {
      setPhase("open");
      setBusy(false);
    });
  }

  const shellStyle =
    phase === "folder"
      ? { width: FOLDER_SIZE, height: FOLDER_SIZE }
      : phase === "minimized"
        ? { width: "100%", height: HEADER_HEIGHT }
        : {
            width: "100%",
            height: isOpen && !compactLayout ? "auto" : undefined,
          };

  const visibleEntries = Object.entries(profileJsonData);

  return (
    <section
      className={`profile${jsonExpanded && isOpen ? " profile--expanded" : ""}`}
      id="profile"
    >
      <div className="container profile__inner">
        <Reveal className="profile__intro" direction="left" delay={0.04}>
          <p className="profile__kicker">profile / 001</p>
          <h2 className="profile__title">About me</h2>
          <p className="profile__copy">
            My experience, skills and summary.
          </p>
          <p className="profile__hint">
            <span aria-hidden="true">↗</span>
            Expand to see more.
          </p>
        </Reveal>

        <Reveal className="profile__terminal-wrap" direction="right" delay={0.1}>
          <div
            className={`profile__shell${isFolder ? " profile__shell--folder" : ""}${bodyCollapsed ? " profile__shell--collapsed" : ""}${jsonExpanded && isOpen ? " profile__shell--expanded" : ""}`}
            style={shellStyle}
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
              className="profile__face profile__face--folder"
              initial={false}
              animate={{
                opacity: showFolderFace ? 1 : 0,
                transform: showFolderFace ? "scale(1)" : "scale(0.94)",
              }}
              transition={faceMotion}
              aria-hidden={!showFolderFace}
              style={{ pointerEvents: isFolder ? "auto" : "none" }}
            >
              <VscFolder aria-hidden />
              <span>profile.json</span>
            </motion.div>

            <motion.div
              className="profile__face profile__face--terminal"
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
                          <div
                            key={key}
                            className={`terminal__reveal${jsonExpanded ? " is-open" : ""}${reduceMotion ? " terminal__reveal--instant" : ""}`}
                            aria-hidden={!jsonExpanded}
                          >
                            <div className="terminal__reveal-inner">
                              {renderJsonEntry([key, value], 1, isLast)}
                            </div>
                          </div>
                        );
                      }
                      if (ARRAY_PREVIEW[key] != null && Array.isArray(value)) {
                        return (
                          <CollapsibleArrayEntry
                            key={key}
                            name={key}
                            items={value}
                            previewCount={ARRAY_PREVIEW[key]}
                            indentLevel={1}
                            isLast={isLast}
                            expanded={jsonExpanded}
                            reduceMotion={reduceMotion}
                          />
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
          </div>
        </Reveal>
      </div>
    </section>
  );
}
