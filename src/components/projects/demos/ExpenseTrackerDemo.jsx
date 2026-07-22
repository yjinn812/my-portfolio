import { useEffect, useState } from "react";
import tripsImg from "../../../assets/projects/expense-tracker/trips.png";
import newTripImg from "../../../assets/projects/expense-tracker/new-trip.png";
import tripDetailImg from "../../../assets/projects/expense-tracker/trip-detail.png";
import newExpenseImg from "../../../assets/projects/expense-tracker/new-expense.png";
import "./ExpenseTrackerDemo.css";

const SCREENS = [
  {
    src: tripsImg,
    label: "Trips",
    caption: "Trip list with running totals",
  },
  {
    src: newTripImg,
    label: "New Trip",
    caption: "Destination, dates, travelers",
  },
  {
    src: tripDetailImg,
    label: "Trip Detail",
    caption: "Balances, FX rates, category split",
  },
  {
    src: newExpenseImg,
    label: "New Expense",
    caption: "Category, currency, paid / split",
  },
];

function Chevron({ dir }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d={dir === "prev" ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"}
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ExpenseTrackerDemo({ active }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return undefined;

    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % SCREENS.length);
    }, active ? 2200 : 3200);

    return () => window.clearInterval(id);
  }, [active, paused]);

  const go = (delta) => {
    setPaused(true);
    setIndex((current) => (current + delta + SCREENS.length) % SCREENS.length);
  };

  const screen = SCREENS[index];

  return (
    <div className={`et-demo ${active ? "et-demo--active" : ""}`}>
      <div className="et-carousel">
        <button
          type="button"
          className="et-nav et-nav--prev"
          aria-label="Previous screen"
          onClick={() => go(-1)}
        >
          <Chevron dir="prev" />
        </button>

        <div className="et-stage">
          {SCREENS.map((item, i) => (
            <img
              key={item.label}
              className={`et-shot ${i === index ? "et-shot--active" : ""}`}
              src={item.src}
              alt={item.caption}
              loading={i === 0 ? "eager" : "lazy"}
              draggable={false}
            />
          ))}
        </div>

        <button
          type="button"
          className="et-nav et-nav--next"
          aria-label="Next screen"
          onClick={() => go(1)}
        >
          <Chevron dir="next" />
        </button>
      </div>

      <div className="et-demo__meta">
        <span className="et-demo__label">{screen.label}</span>
        <span className="et-demo__caption">{screen.caption}</span>
        <span className="et-demo__count">
          {index + 1} / {SCREENS.length}
        </span>
      </div>
    </div>
  );
}
