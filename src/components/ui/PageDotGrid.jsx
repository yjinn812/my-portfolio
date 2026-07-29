import { useReducedMotion } from "framer-motion";
import DotGrid from "./DotGrid";
import "./PageDotGrid.css";

export default function PageDotGrid() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="page-dot-grid" aria-hidden>
      <DotGrid
        cellSize={40}
        lineWidth={1}
        baseColor="#1e2d3d"
        activeColor="#00d4ff"
        proximity={88}
        speedTrigger={160}
        shockRadius={140}
        shockStrength={2.2}
        resistance={900}
        returnDuration={0.22}
        interactive={!reduceMotion}
      />
    </div>
  );
}
