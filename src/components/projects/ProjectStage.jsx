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
          <p className="project-stage__index">
            <span className="project-stage__index-num">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="project-stage__index-sep">/</span>
            <span className="project-stage__index-total">
              {String(total).padStart(2, "0")}
            </span>
          </p>
          <ProjectCard
            project={project}
            featured={Boolean(project.featured)}
            stageActive={active}
          />
        </motion.div>
      </div>
    </article>
  );
}
