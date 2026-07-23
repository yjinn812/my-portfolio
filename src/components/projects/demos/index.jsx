import { useEffect, useRef, useState } from "react";
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

export default function ProjectDemo({ type, active }) {
  const Demo = demos[type];
  const rootRef = useRef(null);
  const [inView, setInView] = useState(false);

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

  if (!Demo) return null;
  return (
    <div ref={rootRef} className="project-demo-root">
      <Demo active={active} inView={inView} />
    </div>
  );
}
