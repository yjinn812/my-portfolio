import { useRef, useEffect, useCallback, useMemo } from "react";
import { gsap } from "gsap";
import { InertiaPlugin } from "gsap/InertiaPlugin";

import "./DotGrid.css";

gsap.registerPlugin(InertiaPlugin);

const IDLE_MS = 900;
const MOVE_THROTTLE_MS = 80;
const INTERACTIVE =
  'a,button,input,textarea,select,label,[role="button"],[role="tab"],[contenteditable="true"]';

const throttle = (func, limit) => {
  let lastCall = 0;
  return function (...args) {
    const now = performance.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      func.apply(this, args);
    }
  };
};

function hexToRgb(hex) {
  const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!m) return { r: 0, g: 0, b: 0 };
  return {
    r: parseInt(m[1], 16),
    g: parseInt(m[2], 16),
    b: parseInt(m[3], 16),
  };
}

function colorAt(baseRgb, activeRgb, baseColor, t) {
  if (t <= 0) return baseColor;
  if (t >= 1) {
    return `rgb(${activeRgb.r},${activeRgb.g},${activeRgb.b})`;
  }
  const r = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * t);
  const g = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * t);
  const b = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * t);
  return `rgb(${r},${g},${b})`;
}

/**
 * Interactive line grid. Intersection nodes displace under fast pointer /
 * background click; H+V lines redraw through those nodes.
 */
const DotGrid = ({
  cellSize = 36,
  lineWidth = 1,
  baseColor = "#5227FF",
  activeColor = "#5227FF",
  proximity = 150,
  speedTrigger = 100,
  shockRadius = 250,
  shockStrength = 5,
  maxSpeed = 5000,
  resistance = 750,
  returnDuration = 0.75,
  interactive = true,
  className = "",
  style,
  /** @deprecated use cellSize */
  gap,
}) => {
  const resolvedCell = gap ?? cellSize;
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const gridRef = useRef({ cols: 0, rows: 0, nodes: [], width: 0, height: 0 });
  const pointerRef = useRef({
    x: -9999,
    y: -9999,
    vx: 0,
    vy: 0,
    speed: 0,
    lastTime: 0,
    lastX: 0,
    lastY: 0,
  });
  const dirtyRef = useRef(true);
  const animatingRef = useRef(0);
  const lastActivityRef = useRef(0);
  const kickRef = useRef(() => {});

  const baseRgb = useMemo(() => hexToRgb(baseColor), [baseColor]);
  const activeRgb = useMemo(() => hexToRgb(activeColor), [activeColor]);

  const buildGrid = useCallback(() => {
    const wrap = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const { width, height } = wrap.getBoundingClientRect();
    if (width < 1 || height < 1) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const cols = Math.floor(width / resolvedCell) + 1;
    const rows = Math.floor(height / resolvedCell) + 1;
    const gridW = (cols - 1) * resolvedCell;
    const gridH = (rows - 1) * resolvedCell;
    const startX = (width - gridW) / 2;
    const startY = (height - gridH) / 2;

    const nodes = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        nodes.push({
          cx: startX + x * resolvedCell,
          cy: startY + y * resolvedCell,
          xOffset: 0,
          yOffset: 0,
          _inertiaApplied: false,
        });
      }
    }
    gridRef.current = { cols, rows, nodes, width, height };
    dirtyRef.current = true;
    kickRef.current();
  }, [resolvedCell]);

  const drawFrame = useCallback(() => {
    const canvas = canvasRef.current;
    const { cols, rows, nodes, width, height } = gridRef.current;
    if (!canvas || !nodes.length) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "square";

    const { x: px, y: py } = pointerRef.current;
    const prox = proximity;

    const nodeAt = (c, r) => nodes[r * cols + c];
    const heat = (nx, ny) => {
      const d = Math.hypot(nx - px, ny - py);
      if (d >= prox) return 0;
      return 1 - d / prox;
    };

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols - 1; c++) {
        const a = nodeAt(c, r);
        const b = nodeAt(c + 1, r);
        const ax = a.cx + a.xOffset;
        const ay = a.cy + a.yOffset;
        const bx = b.cx + b.xOffset;
        const by = b.cy + b.yOffset;
        const t = Math.max(heat(ax, ay), heat(bx, by), heat((ax + bx) / 2, (ay + by) / 2));
        ctx.strokeStyle = colorAt(baseRgb, activeRgb, baseColor, t);
        ctx.globalAlpha = 0.35 + t * 0.65;
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.stroke();
      }
    }

    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows - 1; r++) {
        const a = nodeAt(c, r);
        const b = nodeAt(c, r + 1);
        const ax = a.cx + a.xOffset;
        const ay = a.cy + a.yOffset;
        const bx = b.cx + b.xOffset;
        const by = b.cy + b.yOffset;
        const t = Math.max(heat(ax, ay), heat(bx, by), heat((ax + bx) / 2, (ay + by) / 2));
        ctx.strokeStyle = colorAt(baseRgb, activeRgb, baseColor, t);
        ctx.globalAlpha = 0.35 + t * 0.65;
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.stroke();
      }
    }

    ctx.globalAlpha = 1;
    dirtyRef.current = false;
  }, [activeRgb, baseColor, baseRgb, lineWidth, proximity]);

  useEffect(() => {
    let rafId = 0;
    let running = false;

    const tick = () => {
      rafId = 0;
      const hidden = document.hidden;
      const recentlyActive = performance.now() - lastActivityRef.current < IDLE_MS;
      const shouldRun =
        interactive &&
        !hidden &&
        (dirtyRef.current || animatingRef.current > 0 || recentlyActive);

      if (shouldRun) {
        drawFrame();
        rafId = requestAnimationFrame(tick);
        running = true;
      } else {
        if (dirtyRef.current) drawFrame();
        running = false;
      }
    };

    const kick = () => {
      if (!running && !rafId) {
        rafId = requestAnimationFrame(tick);
        running = true;
      }
    };
    kickRef.current = kick;

    dirtyRef.current = true;
    lastActivityRef.current = performance.now();
    kick();

    const onVisibility = () => {
      if (document.hidden) {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = 0;
        running = false;
      } else {
        dirtyRef.current = true;
        lastActivityRef.current = performance.now();
        kick();
      }
    };

    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      document.removeEventListener("visibilitychange", onVisibility);
      kickRef.current = () => {};
    };
  }, [drawFrame, interactive]);

  useEffect(() => {
    buildGrid();
    let ro = null;
    if ("ResizeObserver" in window) {
      ro = new ResizeObserver(buildGrid);
      if (wrapperRef.current) ro.observe(wrapperRef.current);
    } else {
      window.addEventListener("resize", buildGrid);
    }
    return () => {
      if (ro) ro.disconnect();
      else window.removeEventListener("resize", buildGrid);
    };
  }, [buildGrid]);

  useEffect(() => {
    if (!interactive) {
      dirtyRef.current = true;
      drawFrame();
      return undefined;
    }

    const startReturn = (node) => {
      animatingRef.current += 1;
      gsap.to(node, {
        xOffset: 0,
        yOffset: 0,
        duration: returnDuration,
        ease: "power2.out",
        onUpdate: () => {
          dirtyRef.current = true;
        },
        onComplete: () => {
          node._inertiaApplied = false;
          animatingRef.current = Math.max(0, animatingRef.current - 1);
          dirtyRef.current = true;
        },
      });
    };

    const pushNode = (node, pushX, pushY) => {
      node._inertiaApplied = true;
      animatingRef.current += 1;
      gsap.killTweensOf(node);
      gsap.to(node, {
        inertia: { xOffset: pushX, yOffset: pushY, resistance },
        onUpdate: () => {
          dirtyRef.current = true;
        },
        onComplete: () => {
          animatingRef.current = Math.max(0, animatingRef.current - 1);
          startReturn(node);
        },
      });
    };

    const onMove = (e) => {
      lastActivityRef.current = performance.now();
      dirtyRef.current = true;
      kickRef.current();

      const now = performance.now();
      const pr = pointerRef.current;
      const dt = pr.lastTime ? now - pr.lastTime : 16;
      const dx = e.clientX - pr.lastX;
      const dy = e.clientY - pr.lastY;
      let vx = (dx / dt) * 1000;
      let vy = (dy / dt) * 1000;
      let speed = Math.hypot(vx, vy);
      if (speed > maxSpeed) {
        const scale = maxSpeed / speed;
        vx *= scale;
        vy *= scale;
        speed = maxSpeed;
      }
      pr.lastTime = now;
      pr.lastX = e.clientX;
      pr.lastY = e.clientY;

      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      pr.x = e.clientX - rect.left;
      pr.y = e.clientY - rect.top;

      const { nodes } = gridRef.current;
      let activeTweens = 0;
      for (const node of nodes) {
        if (node._inertiaApplied) activeTweens += 1;
      }
      if (activeTweens > 48) return;

      for (const node of nodes) {
        const dist = Math.hypot(node.cx - pr.x, node.cy - pr.y);
        if (speed > speedTrigger && dist < proximity && !node._inertiaApplied) {
          pushNode(
            node,
            (node.cx - pr.x) * 0.08 + vx * 0.004,
            (node.cy - pr.y) * 0.08 + vy * 0.004
          );
        }
      }
    };

    const onClick = (e) => {
      if (e.target instanceof Element && e.target.closest(INTERACTIVE)) return;

      lastActivityRef.current = performance.now();
      dirtyRef.current = true;
      kickRef.current();

      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;

      for (const node of gridRef.current.nodes) {
        const dist = Math.hypot(node.cx - cx, node.cy - cy);
        if (dist < shockRadius && !node._inertiaApplied) {
          const falloff = Math.max(0, 1 - dist / shockRadius);
          pushNode(
            node,
            (node.cx - cx) * shockStrength * falloff * 0.35,
            (node.cy - cy) * shockStrength * falloff * 0.35
          );
        }
      }
    };

    const onLeave = () => {
      pointerRef.current.x = -9999;
      pointerRef.current.y = -9999;
      dirtyRef.current = true;
      kickRef.current();
    };

    const throttledMove = throttle(onMove, MOVE_THROTTLE_MS);
    window.addEventListener("mousemove", throttledMove, { passive: true });
    window.addEventListener("click", onClick);
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", throttledMove);
      window.removeEventListener("click", onClick);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [
    interactive,
    maxSpeed,
    speedTrigger,
    proximity,
    resistance,
    returnDuration,
    shockRadius,
    shockStrength,
    drawFrame,
  ]);

  return (
    <div className={`dot-grid ${className}`.trim()} style={style} aria-hidden>
      <div ref={wrapperRef} className="dot-grid__wrap">
        <canvas ref={canvasRef} className="dot-grid__canvas" />
      </div>
    </div>
  );
};

export default DotGrid;
