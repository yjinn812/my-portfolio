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
  if (!Demo) return null;
  return <Demo active={active} />;
}
