import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { heroCommands } from "../../data/portfolioData";

const TYPE_MS = 42;
const HOLD_MS = 2400;
const DELETE_MS = 28;
const GAP_MS = 420;

export default function HeroCommandBar() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(() => (reduceMotion ? heroCommands[0] : ""));
  const [phase, setPhase] = useState(() => (reduceMotion ? "hold" : "type"));

  useEffect(() => {
    if (reduceMotion) {
      setText(heroCommands[index]);
      const timer = window.setTimeout(() => {
        setIndex((i) => (i + 1) % heroCommands.length);
      }, HOLD_MS + 800);
      return () => window.clearTimeout(timer);
    }

    const command = heroCommands[index];
    let timer = 0;

    if (phase === "type") {
      if (text.length < command.length) {
        timer = window.setTimeout(() => {
          setText(command.slice(0, text.length + 1));
        }, TYPE_MS);
      } else {
        timer = window.setTimeout(() => setPhase("hold"), 0);
      }
    } else if (phase === "hold") {
      timer = window.setTimeout(() => setPhase("delete"), HOLD_MS);
    } else if (phase === "delete") {
      if (text.length > 0) {
        timer = window.setTimeout(() => setText(text.slice(0, -1)), DELETE_MS);
      } else {
        timer = window.setTimeout(() => {
          setIndex((i) => (i + 1) % heroCommands.length);
          setPhase("type");
        }, GAP_MS);
      }
    }

    return () => window.clearTimeout(timer);
  }, [phase, text, index, reduceMotion]);

  return (
    <div className="hero__cmd" aria-hidden="true">
      <span className="hero__cmd-prompt">$</span>
      <span className="hero__cmd-text">{text}</span>
      <span
        className={`hero__cmd-cursor${phase === "hold" || reduceMotion ? " is-blink" : ""}`}
      />
    </div>
  );
}
