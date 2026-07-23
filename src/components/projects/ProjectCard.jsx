import { useState } from "react";
import BorderGlow, { useBorderGlowTheme } from "../ui/BorderGlow";
import ProjectDemo from "./demos";
import "./ProjectCard.css";

function ProjectLinks({ project }) {
  const isHashLive = Boolean(project.live?.startsWith("#"));

  return (
    <div className="project-card__links">
      {project.github && (
        <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
          </svg>
        </a>
      )}
      {project.live && (
        <a
          href={project.live}
          {...(isHashLive ? {} : { target: "_blank", rel: "noopener noreferrer" })}
          aria-label={isHashLive ? "You're looking at it" : "Live Demo"}
          title={isHashLive ? "You're looking at it" : undefined}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
        </a>
      )}
    </div>
  );
}

export default function ProjectCard({ project, featured = false }) {
  const [demoActive, setDemoActive] = useState(false);
  const glow = useBorderGlowTheme();
  const hasDemo = Boolean(project.demo);
  const showcase = featured || project.wide;

  return (
    <BorderGlow className="project-card-glow" {...glow}>
      <article
        className={[
          "project-card",
          featured ? "project-card--featured" : "",
          project.wide ? "project-card--wide" : "",
          hasDemo ? "project-card--has-demo" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        onMouseEnter={() => hasDemo && setDemoActive(true)}
        onMouseLeave={() => hasDemo && setDemoActive(false)}
        onFocus={() => hasDemo && setDemoActive(true)}
        onBlur={(event) => {
          if (!hasDemo) return;
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setDemoActive(false);
          }
        }}
      >
        {showcase ? (
          <>
            <div
              className={`project-card__media ${project.wide && !featured ? "project-card__media--desktop" : ""}`}
            >
              {hasDemo ? (
                <ProjectDemo type={project.demo} active={demoActive} />
              ) : (
                <div className="project-card__placeholder" aria-hidden="true">
                  <span className="project-card__placeholder-label">TBC</span>
                  <span className="project-card__placeholder-sub">No preview yet</span>
                </div>
              )}
            </div>

            <div className="project-card__body">
              <div className="project-card__top">
                <span className="project-card__eyebrow">
                  {featured ? "Featured project" : project.eyebrow || "API demo"}
                </span>
                <ProjectLinks project={project} />
              </div>

              <h3 className="project-card__title">{project.title}</h3>
              <p className="project-card__desc">{project.description}</p>
              {project.story && <p className="project-card__story">{project.story}</p>}

              <div className="project-card__tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="project-card__tag">{tag}</span>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            {hasDemo && (
              <div className="project-card__media project-card__media--compact">
                <ProjectDemo type={project.demo} active={demoActive} />
              </div>
            )}

            <div className="project-card__top">
              <span className="project-card__folder">⬡</span>
              <ProjectLinks project={project} />
            </div>

            <h3 className="project-card__title">{project.title}</h3>
            <p className="project-card__desc">{project.description}</p>

            <div className="project-card__tags">
              {project.tags.map((tag) => (
                <span key={tag} className="project-card__tag">{tag}</span>
              ))}
            </div>
          </>
        )}
      </article>
    </BorderGlow>
  );
}
