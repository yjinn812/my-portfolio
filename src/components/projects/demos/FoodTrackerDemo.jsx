import { useEffect, useState } from "react";
import "./FoodTrackerDemo.css";

const STEPS = [
  { id: "user", at: 350 },
  { id: "thinking", at: 1400 },
  { id: "tool", at: 2300 },
  { id: "reply", at: 3100 },
  { id: "macros", at: 3700 },
  { id: "budget", at: 4500 },
];

export default function FoodTrackerDemo({ active }) {
  const [step, setStep] = useState(0);
  const [runId, setRunId] = useState(0);

  useEffect(() => {
    if (!active) {
      setStep(0);
      return undefined;
    }

    setStep(0);
    setRunId((id) => id + 1);

    const timers = STEPS.map(({ at }, index) =>
      window.setTimeout(() => setStep(index + 1), at),
    );

    return () => timers.forEach(clearTimeout);
  }, [active]);

  const show = (id) => {
    const index = STEPS.findIndex((item) => item.id === id);
    return active && step > index;
  };

  return (
    <div className={`ft-demo ${active ? "ft-demo--active" : ""}`} key={runId} aria-hidden={!active}>
      <div className="ft-phone">
        <div className="ft-phone__bezel">
          <div className="ft-phone__island" />

          <div className="ft-phone__status">
            <span>9:41</span>
            <div className="ft-phone__status-icons">
              <span className="ft-phone__signal" />
              <span className="ft-phone__wifi" />
              <span className="ft-phone__battery" />
            </div>
          </div>

          <div className="ft-cursor">
            <header className="ft-cursor__header">
              <div className="ft-cursor__brand">
                <span className="ft-cursor__mark" aria-hidden />
                <div>
                  <strong>Cursor</strong>
                  <span>Agent · food-tracker</span>
                </div>
              </div>
              <span className="ft-cursor__model">claude</span>
            </header>

            <div className="ft-cursor__thread">
              {!active && (
                <div className="ft-idle is-in">
                  <div className="ft-msg__label">
                    <span className="ft-msg__agent-dot" />
                    Agent
                  </div>
                  <p>Ready when you are — log a meal in plain English.</p>
                </div>
              )}

              <div className={`ft-msg ft-msg--user ${show("user") ? "is-in" : ""}`}>
                <div className="ft-msg__label">You</div>
                <p>Logged rolled oats with berries and a flat white for breakfast</p>
              </div>

              <div className={`ft-msg ft-msg--agent ${show("thinking") ? "is-in" : ""}`}>
                <div className="ft-msg__label">
                  <span className="ft-msg__agent-dot" />
                  Agent
                </div>

                <div className={`ft-thinking ${show("thinking") && !show("tool") ? "is-in" : ""}`}>
                  <span /><span /><span />
                  <em>Planning next moves</em>
                </div>

                <div className={`ft-tool ${show("tool") ? "is-in" : ""}`}>
                  <div className="ft-tool__head">
                    <span className="ft-tool__icon">⚒</span>
                    <span>Called MCP tool</span>
                    <span className="ft-tool__name">firestore.write</span>
                  </div>
                  <code>meals / breakfast · Australia/Sydney</code>
                </div>

                <div className={`ft-reply ${show("reply") ? "is-in" : ""}`}>
                  <p>Logged. Matched your oats + coffee against the product bank and wrote a meal doc to Firestore.</p>
                </div>

                <div className={`ft-card ${show("macros") ? "is-in" : ""}`}>
                  <div className="ft-card__title">Nutrition · 1 serving</div>
                  <div className="ft-macros">
                    <div><span>Calories</span><strong>412</strong></div>
                    <div><span>Protein</span><strong>18g</strong></div>
                    <div><span>Carbs</span><strong>52g</strong></div>
                    <div><span>Fat</span><strong>12g</strong></div>
                    <div className="ft-macros__accent"><span>Sat fat</span><strong>2.4g</strong></div>
                  </div>
                </div>

                <div className={`ft-card ft-card--budget ${show("budget") ? "is-in" : ""}`}>
                  <div className="ft-budget__row">
                    <span>Daily sat-fat budget</span>
                    <strong>2.4 / 13g</strong>
                  </div>
                  <div className="ft-budget__bar">
                    <div className="ft-budget__fill" />
                  </div>
                  <p>10.6g remaining — still within cholesterol target.</p>
                </div>
              </div>
            </div>

            <div className="ft-composer">
              <div className="ft-composer__box">
                <span>Message agent…</span>
                <span className="ft-composer__send">↑</span>
              </div>
            </div>
          </div>

          <div className="ft-phone__home" />
        </div>
      </div>

      {!active && (
        <div className="ft-demo__hint">
          <span>Hover to play demo</span>
        </div>
      )}
    </div>
  );
}
