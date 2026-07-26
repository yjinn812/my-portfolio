import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { impactMetrics, featuredCaseStudies } from "../../data/portfolioData";
import { easeOut } from "../../lib/motion";
import { Reveal, RevealGroup, RevealItem, SectionHeader } from "../ui/Reveal";
import { openResumeRequest } from "./ResumeRequestForm";
import "./Experience.css";

export default function Experience() {
  const [caseIndex, setCaseIndex] = useState(0);
  const caseStudy = featuredCaseStudies[caseIndex];
  const reduceMotion = useReducedMotion();

  return (
    <section className="experience" id="experience">
      <div className="container">
        <SectionHeader label="work" title="Work" />

        <div className="impact-strip">
          <Reveal as="p" className="impact-strip__label" direction="fade" duration={0.35}>
            Impact at a glance
          </Reveal>
          <RevealGroup className="impact-strip__grid" stagger={0.08} delay={0.06} amount={0.3}>
            {impactMetrics.map((metric) => (
              <RevealItem key={metric.label} className="impact-strip__item" direction="up">
                <p className="impact-strip__value">{metric.value}</p>
                <p className="impact-strip__name">{metric.label}</p>
                <p className="impact-strip__detail">{metric.detail}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <Reveal className="case-study" direction="up" delay={0.06} amount={0.2}>
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
                  const focusedIndex = featuredCaseStudies.findIndex(
                    (study) => `case-tab-${study.id}` === event.currentTarget.id
                  );
                  const from = focusedIndex >= 0 ? focusedIndex : caseIndex;
                  const next =
                    (from + delta + featuredCaseStudies.length) %
                    featuredCaseStudies.length;
                  setCaseIndex(next);
                  requestAnimationFrame(() => {
                    document.getElementById(`case-tab-${featuredCaseStudies[next].id}`)?.focus();
                  });
                }}
              >
                {study.shortLabel}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={caseStudy.id}
              id={`case-panel-${caseStudy.id}`}
              role="tabpanel"
              aria-labelledby={`case-tab-${caseStudy.id}`}
              initial={reduceMotion ? false : { opacity: 0, transform: "translateY(10px)" }}
              animate={{ opacity: 1, transform: "translateY(0px)" }}
              exit={reduceMotion ? undefined : { opacity: 0, transform: "translateY(-6px)" }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.28, ease: easeOut }}
            >
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
            </motion.div>
          </AnimatePresence>
        </Reveal>

        <Reveal className="experience__resume" direction="fade" delay={0.04} amount={0.4}>
          <p className="experience__resume-copy">
            Role history, stack, and the rest of the detail. Request the resume.
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
