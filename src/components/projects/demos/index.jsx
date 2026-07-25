import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import FoodTrackerDemo from "./FoodTrackerDemo";
import SheetsApiDemo from "./SheetsApiDemo";
import ExpenseTrackerDemo from "./ExpenseTrackerDemo";
import PortfolioDemo from "./PortfolioDemo";

const demos = {
  "food-tracker-chat": FoodTrackerDemo,
  "sheets-api-postman": SheetsApiDemo,
  "expense-tracker-screens": ExpenseTrackerDemo,
  "portfolio-browser": PortfolioDemo,
};

const COARSE_MQ = "(hover: none), (pointer: coarse)";

export default function ProjectDemo({ type, active }) {
  const Demo = demos[type];
  const rootRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [coarse, setCoarse] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const node = rootRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "100px 0px", threshold: 0.05 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return undefined;
    const mq = window.matchMedia(COARSE_MQ);
    const sync = () => setCoarse(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  if (!Demo) return null;

  const effectiveActive = reduceMotion ? false : coarse ? inView : active;

  return (
    <div ref={rootRef} className="project-demo-root">
      <Demo active={effectiveActive} inView={inView} />
    </div>
  );
}
