import { useReducedMotion } from "framer-motion";
import DotGrid from "./DotGrid";
import "./PageDotGrid.css";

export default function PageDotGrid() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="page-dot-grid" aria-hidden>
      <DotGrid
        cellSize={36}
        lineWidth={1}
        baseColor="#1e2d3d"
        activeColor="#00d4ff"
        proximity={110}
        speedTrigger={120}
        shockRadius={200}
        shockStrength={3.5}
        resistance={750}
        returnDuration={0.75}
        interactive={!reduceMotion}
      />
    </div>
  );
}
