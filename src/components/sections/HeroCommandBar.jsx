import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { heroCommands } from "../../data/portfolioData";

const TYPE_MS = 68;
const HOLD_MS = 2600;
const DELETE_MS = 42;
const GAP_MS = 520;

/** Decorative loop — idle it once the pill scrolls out of view. */
function useInView(ref) {
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref]);

  return inView;
}

function StaticCommandCycle() {
  const ref = useRef(null);
  const inView = useInView(ref);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;
    const timer = window.setTimeout(() => {
      setIndex((i) => (i + 1) % heroCommands.length);
    }, HOLD_MS + 800);
    return () => window.clearTimeout(timer);
  }, [index, inView]);

  return (
    <div className="hero__cmd" ref={ref} aria-hidden="true">
      <span className="hero__cmd-prompt">$</span>
      <span className="hero__cmd-text">{heroCommands[index]}</span>
      <span className="hero__cmd-cursor is-blink" />
    </div>
  );
}

function TypedCommandCycle() {
  const ref = useRef(null);
  const inView = useInView(ref);
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState("type");

  useEffect(() => {
    if (!inView) return undefined;

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
        timer = window.setTimeout(() => {
          setText(text.slice(0, -1));
        }, DELETE_MS);
      } else {
        timer = window.setTimeout(() => {
          setIndex((i) => (i + 1) % heroCommands.length);
          setPhase("type");
        }, GAP_MS);
      }
    }

    return () => window.clearTimeout(timer);
  }, [phase, text, index, inView]);

  return (
    <div className="hero__cmd" ref={ref} aria-hidden="true">
      <span className="hero__cmd-prompt">$</span>
      <span className="hero__cmd-text">{text}</span>
      <span className={`hero__cmd-cursor${phase === "hold" ? " is-blink" : ""}`} />
    </div>
  );
}

export default function HeroCommandBar() {
  const reduceMotion = useReducedMotion();
  return reduceMotion ? <StaticCommandCycle /> : <TypedCommandCycle />;
}
