import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import ProjectCard from "./ProjectCard";
import "./ProjectStage.css";

/**
 * One project = one scroll beat.
 * Desktop: sticky panel owns the viewport while the track advances.
 * Uses a single `transform` string (GPU) + opacity — not Framer x/y/scale shorthands.
 */
export default function ProjectStage({ project, index, total }) {
  const reduceMotion = useReducedMotion();
  const stageRef = useRef(null);
  const [active, setActive] = useState(false);

  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.42, 0.58, 0.82, 1],
    reduceMotion ? [1, 1, 1, 1, 1, 1] : [0.15, 1, 1, 1, 1, 0.15]
  );
  const y = useTransform(
    scrollYProgress,
    [0, 0.22, 0.78, 1],
    reduceMotion ? [0, 0, 0, 0] : [56, 0, 0, -56]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.22, 0.78, 1],
    reduceMotion ? [1, 1, 1, 1] : [0.96, 1, 1, 0.96]
  );
  const transform = useMotionTemplate`translate3d(0, ${y}px, 0) scale(${scale})`;

  const mediaOpacity = useTransform(
    scrollYProgress,
    [0, 0.16, 0.8, 1],
    [0.25, 1, 1, 0.35]
  );
  const mediaTransform = useTransform(
    scrollYProgress,
    [0, 0.2, 0.78, 1],
    [
      "translate3d(-24px, 0, 0) scale(0.985)",
      "translate3d(0, 0, 0) scale(1)",
      "translate3d(0, 0, 0) scale(1)",
      "translate3d(18px, 0, 0) scale(0.99)",
    ]
  );
  const copyOpacity = useTransform(
    scrollYProgress,
    [0.08, 0.24, 0.76, 0.92],
    [0, 1, 1, 0]
  );
  const copyTransform = useTransform(
    scrollYProgress,
    [0.08, 0.24, 0.76, 0.92],
    [
      "translate3d(0, 24px, 0)",
      "translate3d(0, 0, 0)",
      "translate3d(0, 0, 0)",
      "translate3d(0, -14px, 0)",
    ]
  );
  const indexTransform = useTransform(
    scrollYProgress,
    [0.08, 0.24, 0.76, 0.92],
    [
      "translate3d(0, 10px, 0)",
      "translate3d(0, 0, 0)",
      "translate3d(0, 0, 0)",
      "translate3d(0, -8px, 0)",
    ]
  );
  const stageMotion = reduceMotion
    ? undefined
    : {
        media: {
          opacity: mediaOpacity,
          transform: mediaTransform,
        },
        copy: { opacity: copyOpacity, transform: copyTransform },
      };

  useEffect(() => {
    const node = stageRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setActive(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setActive(entry.isIntersecting && entry.intersectionRatio >= 0.45);
      },
      { threshold: [0.25, 0.45, 0.6, 0.8] }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={stageRef}
      className={`project-stage${active ? " is-active" : ""}`}
      data-project-stage={index}
      data-project-total={total}
      aria-label={project.title}
    >
      <div className="project-stage__sticky">
        <motion.div
          className="project-stage__panel"
          style={reduceMotion ? undefined : { opacity, transform }}
        >
          <motion.p
            className="project-stage__index"
            style={
              reduceMotion
                ? undefined
                : { opacity: copyOpacity, transform: indexTransform }
            }
          >
            <span className="project-stage__index-num">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="project-stage__index-sep">/</span>
            <span className="project-stage__index-total">
              {String(total).padStart(2, "0")}
            </span>
          </motion.p>
          <ProjectCard
            project={project}
            featured={Boolean(project.featured)}
            stageActive={active}
            stageMotion={stageMotion}
          />
        </motion.div>
      </div>
    </article>
  );
}
