import { useEffect, useState } from "react";
import "./SheetsApiDemo.css";

const STEPS = [
  { id: "url", at: 400 },
  { id: "body", at: 1200 },
  { id: "send", at: 2200 },
  { id: "loading", at: 2600 },
  { id: "response", at: 3600 },
];

const BODY_LINES = [
  '{',
  '  "sheetId": "1BxiMVs…budget",',
  '  "range": "Expenses!A:D",',
  '  "values": [',
  '    ["2026-07-21", "Uber", 24.50, "travel"]',
  '  ]',
  '}',
];

export default function SheetsApiDemo({ active }) {
  const [step, setStep] = useState(0);
  const [runId, setRunId] = useState(0);
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (!active) {
      setStep(0);
      setVisibleLines(0);
      return undefined;
    }

    setStep(0);
    setVisibleLines(0);
    setRunId((id) => id + 1);

    const timers = STEPS.map(({ at }, index) =>
      window.setTimeout(() => setStep(index + 1), at),
    );

    const lineTimers = BODY_LINES.map((_, index) =>
      window.setTimeout(() => setVisibleLines(index + 1), 1300 + index * 120),
    );

    return () => {
      timers.forEach(clearTimeout);
      lineTimers.forEach(clearTimeout);
    };
  }, [active]);

  const show = (id) => {
    const index = STEPS.findIndex((item) => item.id === id);
    return active && step > index;
  };

  return (
    <div className={`sheets-demo ${active ? "sheets-demo--active" : ""}`} key={runId} aria-hidden={!active}>
      <div className="sheets-desk">
        <div className="sheets-window">
          <div className="sheets-window__chrome">
            <div className="sheets-window__traffic">
              <span /><span /><span />
            </div>
            <div className="sheets-window__title">POST · Insert Sheet Rows — API Client</div>
          </div>

          <div className="sheets-app">
            <aside className="sheets-sidebar">
              <div className="sheets-sidebar__brand">
                <span className="sheets-sidebar__logo">P</span>
                <strong>Request Lab</strong>
              </div>
              <div className="sheets-sidebar__section">Collections</div>
              <div className="sheets-sidebar__item is-active">
                <span className="sheets-method sheets-method--post">POST</span>
                Insert row
              </div>
              <div className="sheets-sidebar__item">
                <span className="sheets-method sheets-method--get">GET</span>
                Health
              </div>
              <div className="sheets-sidebar__item">
                <span className="sheets-method sheets-method--post">POST</span>
                OAuth refresh
              </div>
            </aside>

            <div className="sheets-main">
              <div className="sheets-request">
                <div className={`sheets-urlbar ${show("url") ? "is-in" : ""}`}>
                  <span className="sheets-method sheets-method--post sheets-method--lg">POST</span>
                  <div className="sheets-url">
                    <span className={show("url") ? "is-typed" : ""}>
                      https://api.example.dev/sheets/append
                    </span>
                  </div>
                  <button
                    type="button"
                    className={`sheets-send ${show("send") ? "is-pressed" : ""}`}
                    tabIndex={-1}
                  >
                    Send
                  </button>
                </div>

                <div className="sheets-tabs">
                  <span>Params</span>
                  <span>Authorization</span>
                  <span className="is-active">Body</span>
                  <span>Headers</span>
                </div>

                <div className={`sheets-body ${show("body") ? "is-in" : ""}`}>
                  <div className="sheets-body__label">raw · JSON</div>
                  <pre>
                    {BODY_LINES.map((line, index) => (
                      <code
                        key={line}
                        className={index < visibleLines ? "is-in" : ""}
                      >
                        {line}
                      </code>
                    ))}
                  </pre>
                </div>
              </div>

              <div className="sheets-response">
                <div className="sheets-response__head">
                  <strong>Response</strong>
                  <span className={`sheets-status ${show("response") ? "is-in" : ""}`}>
                    {show("loading") && !show("response") ? "Sending…" : null}
                    {show("response") ? "201 Created · 48 ms" : null}
                    {!show("loading") && !show("response") ? "Waiting for request" : null}
                  </span>
                </div>

                <div className={`sheets-loading ${show("loading") && !show("response") ? "is-in" : ""}`}>
                  <span /><span /><span />
                </div>

                <pre className={`sheets-response__json ${show("response") ? "is-in" : ""}`}>
{`{
  "ok": true,
  "updatedRange": "Expenses!A12:D12",
  "updatedRows": 1,
  "spreadsheetId": "1BxiMVs…budget"
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      {!active && (
        <div className="sheets-demo__hint">
          <span>Hover to play demo</span>
        </div>
      )}
    </div>
  );
}
