import { useEffect, useRef } from "react";
import { projects } from "../../data/portfolioData";
import ProjectStage from "../projects/ProjectStage";
import { SectionHeader } from "../ui/Reveal";
import "./Projects.css";

const visibleProjects = () => projects.filter((project) => !project.hidden);

/**
 * Publish 0–1 progress through the projects track so OpsScrollScene can
 * scrub harder while this section owns the scroll (Fireship-style coupling).
 */
function publishProjectsProgress(section) {
  if (!section) return;
  const rect = section.getBoundingClientRect();
  const travel = Math.max(1, section.offsetHeight - window.innerHeight);
  const scrolled = Math.min(travel, Math.max(0, -rect.top));
  const p = scrolled / travel;
  document.documentElement.style.setProperty("--projects-progress", p.toFixed(4));
  window.dispatchEvent(
    new CustomEvent("ops-projects-progress", { detail: { p } })
  );
}

export default function Projects() {
  const sectionRef = useRef(null);
  const list = visibleProjects();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => publishProjectsProgress(section));
    };

    publishProjectsProgress(section);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.documentElement.style.removeProperty("--projects-progress");
    };
  }, []);

  return (
    <section className="projects" id="projects" ref={sectionRef}>
      <div className="container projects__header">
        <SectionHeader label="projects" title="Projects" />
      </div>

      <div className="projects__track">
        <div className="container">
          {list.map((project, index) => (
            <ProjectStage
              key={project.id}
              project={project}
              index={index}
              total={list.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
