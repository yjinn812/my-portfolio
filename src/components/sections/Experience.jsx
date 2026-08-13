import { useState } from "react";
import { impactMetrics, featuredCaseStudies } from "../../data/portfolioData";
import { Reveal, RevealGroup, RevealItem, SectionHeader } from "../ui/Reveal";
import { openResumeRequest } from "./ResumeRequestForm";
import "./Experience.css";

function CasePanel({ caseStudy }) {
  return (
    <>
      <p className="case-study__eyebrow">{caseStudy.eyebrow}</p>
      <h3 className="case-study__title">{caseStudy.title}</h3>
      <p className="case-study__context">{caseStudy.context}</p>

      <div className="case-study__beats">
        <div className="case-study__beat">
          <span className="case-study__step">01 · Problem</span>
          <p>{caseStudy.problem}</p>
        </div>
        <div className="case-study__beat">
          <span className="case-study__step">02 · What I did</span>
          <p>{caseStudy.did}</p>
        </div>
        <div className="case-study__beat">
          <span className="case-study__step">03 · Result</span>
          <p>{caseStudy.result}</p>
        </div>
      </div>
    </>
  );
}

export default function Experience() {
  const [caseIndex, setCaseIndex] = useState(0);

  const focusTab = (index) => {
    document
      .getElementById(`case-tab-${featuredCaseStudies[index].id}`)
      ?.focus({ preventScroll: true });
  };

  return (
    <section className="experience" id="experience">
      <div className="container">
        <SectionHeader label="work" title="Work" />

        <div className="impact-strip">
          <RevealGroup className="impact-strip__grid" stagger={0.05} delay={0.04} amount={0.3}>
            {impactMetrics.map((metric) => (
              <RevealItem key={metric.label} className="impact-strip__item" direction="interface">
                <p className="impact-strip__value">{metric.value}</p>
                <p className="impact-strip__name">{metric.label}</p>
                <p className="impact-strip__detail">{metric.detail}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <Reveal className="case-study" direction="up" delay={0.04} amount={0.2}>
          <div className="case-study__nav" role="tablist" aria-label="Featured case studies">
            {featuredCaseStudies.map((study, i) => (
              <button
                key={study.id}
                type="button"
                role="tab"
                id={`case-tab-${study.id}`}
                aria-selected={caseIndex === i}
                aria-controls={`case-panel-${study.id}`}
                tabIndex={caseIndex === i ? 0 : -1}
                className={`case-study__nav-btn ${caseIndex === i ? "case-study__nav-btn--active" : ""}`}
                onClick={() => setCaseIndex(i)}
                onKeyDown={(event) => {
                  if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
                  event.preventDefault();
                  const delta = event.key === "ArrowRight" ? 1 : -1;
                  const next =
                    (i + delta + featuredCaseStudies.length) %
                    featuredCaseStudies.length;
                  setCaseIndex(next);
                  requestAnimationFrame(() => focusTab(next));
                }}
              >
                {study.shortLabel}
              </button>
            ))}
          </div>

          <div className="case-study__panels">
            {featuredCaseStudies.map((study, i) => {
              const selected = caseIndex === i;
              return (
                <div
                  key={study.id}
                  id={`case-panel-${study.id}`}
                  role="tabpanel"
                  aria-labelledby={`case-tab-${study.id}`}
                  aria-hidden={!selected}
                  inert={!selected}
                  className={`case-study__panel${selected ? "" : " is-inactive"}`}
                >
                  <CasePanel caseStudy={study} />
                </div>
              );
            })}
          </div>
        </Reveal>

        <Reveal className="experience__resume" direction="fade" delay={0.04} amount={0.4}>
          <p className="experience__resume-copy">
            Role history, stack, and the rest of the detail.
          </p>
          <a
            href="#resume"
            className="experience__resume-link"
            onClick={openResumeRequest}
          >
            Request resume →
          </a>
        </Reveal>
      </div>
    </section>
  );
}
