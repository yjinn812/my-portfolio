import { useRef, useCallback, useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import "./BorderGlow.css";

export function useBorderGlowTheme(overrides = {}) {
  return {
    backgroundColor: "#111820",
    borderRadius: 12,
    glowRadius: 28,
    glowIntensity: 0.85,
    edgeSensitivity: 28,
    coneSpread: 22,
    fillOpacity: 0.35,
    glowColor: "190 100 55",
    colors: ["#00d4ff", "#ff6b35", "#9bd8ff"],
    ...overrides,
  };
}

function parseHSL(hslStr) {
  const match = hslStr.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
  if (!match) return { h: 40, s: 80, l: 80 };
  return { h: parseFloat(match[1]), s: parseFloat(match[2]), l: parseFloat(match[3]) };
}

function buildGlowVars(glowColor, intensity) {
  const { h, s, l } = parseHSL(glowColor);
  const base = `${h}deg ${s}% ${l}%`;
  const opacities = [100, 60, 50, 40, 30, 20, 10];
  const keys = ["", "-60", "-50", "-40", "-30", "-20", "-10"];
  const vars = {};
  for (let i = 0; i < opacities.length; i++) {
    vars[`--glow-color${keys[i]}`] = `hsl(${base} / ${Math.min(opacities[i] * intensity, 100)}%)`;
  }
  return vars;
}

const GRADIENT_POSITIONS = ["80% 55%", "69% 34%", "8% 6%", "41% 38%", "86% 85%", "82% 18%", "51% 4%"];
const GRADIENT_KEYS = [
  "--gradient-one",
  "--gradient-two",
  "--gradient-three",
  "--gradient-four",
  "--gradient-five",
  "--gradient-six",
  "--gradient-seven",
];
const COLOR_MAP = [0, 1, 2, 0, 1, 2, 1];

function buildGradientVars(colors) {
  const vars = {};
  for (let i = 0; i < 7; i++) {
    const c = colors[Math.min(COLOR_MAP[i], colors.length - 1)];
    vars[GRADIENT_KEYS[i]] = `radial-gradient(at ${GRADIENT_POSITIONS[i]}, ${c} 0px, transparent 50%)`;
  }
  vars["--gradient-base"] = `linear-gradient(${colors[0]} 0 100%)`;
  return vars;
}

function easeOutCubic(x) {
  return 1 - Math.pow(1 - x, 3);
}

function animateValue({ start = 0, end = 100, duration = 1000, delay = 0, ease = easeOutCubic, onUpdate, onEnd }) {
  const t0 = performance.now() + delay;
  let raf = 0;
  function tick(now) {
    const elapsed = now - t0;
    const t = Math.min(elapsed / duration, 1);
    onUpdate(start + (end - start) * ease(t));
    if (t < 1) raf = requestAnimationFrame(tick);
    else if (onEnd) onEnd();
  }
  const startId = window.setTimeout(() => {
    raf = requestAnimationFrame(tick);
  }, delay);
  return () => {
    window.clearTimeout(startId);
    cancelAnimationFrame(raf);
  };
}

const BorderGlow = ({
  children,
  className = "",
  edgeSensitivity = 30,
  glowColor = "40 80 80",
  backgroundColor = "#120F17",
  borderRadius = 28,
  glowRadius = 40,
  glowIntensity = 1.0,
  coneSpread = 25,
  animated = false,
  colors = ["#c084fc", "#f472b6", "#38bdf8"],
  fillOpacity = 0.5,
}) => {
  const cardRef = useRef(null);
  const fxRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const rafRef = useRef(0);
  const pendingRef = useRef(null);

  const getCenterOfElement = useCallback((el) => {
    const { width, height } = el.getBoundingClientRect();
    return [width / 2, height / 2];
  }, []);

  const getEdgeProximity = useCallback(
    (el, x, y) => {
      const [cx, cy] = getCenterOfElement(el);
      const dx = x - cx;
      const dy = y - cy;
      let kx = Infinity;
      let ky = Infinity;
      if (dx !== 0) kx = cx / Math.abs(dx);
      if (dy !== 0) ky = cy / Math.abs(dy);
      return Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
    },
    [getCenterOfElement]
  );

  const getCursorAngle = useCallback(
    (el, x, y) => {
      const [cx, cy] = getCenterOfElement(el);
      const dx = x - cx;
      const dy = y - cy;
      if (dx === 0 && dy === 0) return 0;
      const radians = Math.atan2(dy, dx);
      let degrees = radians * (180 / Math.PI) + 90;
      if (degrees < 0) degrees += 360;
      return degrees;
    },
    [getCenterOfElement]
  );

  const flushPointer = useCallback(() => {
    rafRef.current = 0;
    const pending = pendingRef.current;
    const fx = fxRef.current;
    if (!pending || !fx) return;
    fx.style.setProperty("--edge-proximity", pending.edge);
    fx.style.setProperty("--cursor-angle", pending.angle);
  }, []);

  const handlePointerMove = useCallback(
    (e) => {
      if (reduceMotion) return;
      const card = cardRef.current;
      const fx = fxRef.current;
      if (!card || !fx) return;
      if (!card.matches(":hover, .sweep-active")) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      pendingRef.current = {
        edge: `${(getEdgeProximity(card, x, y) * 100).toFixed(2)}`,
        angle: `${getCursorAngle(card, x, y).toFixed(2)}deg`,
      };

      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(flushPointer);
      }
    },
    [getEdgeProximity, getCursorAngle, reduceMotion, flushPointer]
  );

  useEffect(() => {
    if (reduceMotion || !animated || !cardRef.current || !fxRef.current) return undefined;
    const card = cardRef.current;
    const fx = fxRef.current;
    const angleStart = 110;
    const angleEnd = 465;
    card.classList.add("sweep-active");
    fx.style.setProperty("--cursor-angle", `${angleStart}deg`);
    fx.style.setProperty("--edge-proximity", "0");

    const cleanups = [
      animateValue({
        duration: 220,
        onUpdate: (v) => fx.style.setProperty("--edge-proximity", String(v)),
      }),
      animateValue({
        ease: easeOutCubic,
        duration: 220,
        end: 100,
        onUpdate: (v) => {
          const angle = (angleEnd - angleStart) * (v / 100) + angleStart;
          fx.style.setProperty("--cursor-angle", `${angle.toFixed(2)}deg`);
        },
      }),
      animateValue({
        ease: easeOutCubic,
        delay: 220,
        duration: 200,
        start: 100,
        end: 0,
        onUpdate: (v) => fx.style.setProperty("--edge-proximity", String(v)),
        onEnd: () => card.classList.remove("sweep-active"),
      }),
    ];

    return () => {
      cleanups.forEach((fn) => fn?.());
      card.classList.remove("sweep-active");
    };
  }, [animated, reduceMotion]);

  useEffect(
    () => () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    },
    []
  );

  const glowVars = buildGlowVars(glowColor, glowIntensity);

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      className={`border-glow-card ${className}`.trim()}
      style={{
        "--card-bg": backgroundColor,
        "--edge-sensitivity": edgeSensitivity,
        "--border-radius": `${borderRadius}px`,
        "--glow-padding": `${glowRadius}px`,
        "--cone-spread": coneSpread,
        "--fill-opacity": fillOpacity,
        ...glowVars,
        ...buildGradientVars(colors),
      }}
    >
      <div className="border-glow-fx" ref={fxRef} aria-hidden>
        <span className="edge-light" />
      </div>
      <div className="border-glow-inner">{children}</div>
    </div>
  );
};

export default BorderGlow;
