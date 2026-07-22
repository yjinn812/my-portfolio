import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { experience, impactMetrics, featuredCaseStudies } from "../../data/portfolioData";
import { Reveal, RevealGroup, RevealItem, SectionHeader } from "../ui/Reveal";
import "./Experience.css";

const ease = [0.22, 1, 0.36, 1];

export default function Experience() {
  const [active, setActive] = useState(0);
  const [caseIndex, setCaseIndex] = useState(0);
  const current = experience[active];
  const caseStudy = featuredCaseStudies[caseIndex];
  const reduceMotion = useReducedMotion();

  return (
    <section className="experience" id="experience">
      <div className="container">
        <SectionHeader label="work history" title="Experience" />

        <Reveal className="experience__layout" direction="up" delay={0.08} amount={0.12}>
          <div className="experience__tabs">
            {experience.map((exp, i) => (
              <button
                key={exp.id}
                className={`experience__tab ${active === i ? "experience__tab--active" : ""}`}
                onClick={() => setActive(i)}
              >
                <span className="experience__tab-company">{exp.company}</span>
                <span className="experience__tab-role">{exp.role}</span>
              </button>
            ))}
          </div>

          <div className="experience__content">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                transition={reduceMotion ? { duration: 0 } : { duration: 0.28, ease }}
              >
                <div className="experience__header">
                  <h3 className="experience__role">{current.role}</h3>
                  <span className="experience__at">@ {current.company}</span>
                  <span className="experience__period">{current.period}</span>
                </div>

                {current.summary && (
                  <div className="experience__summary">
                    <p>{current.summary}</p>
                  </div>
                )}

                <ul className="experience__highlights">
                  {current.highlights.map((h, i) => (
                    <motion.li
                      key={`${current.id}-${i}`}
                      className="experience__highlight"
                      initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : { duration: 0.3, delay: 0.04 + i * 0.035, ease }
                      }
                    >
                      <span className="experience__bullet">▸</span>
                      {h}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>

        <Reveal className="case-study" direction="up" delay={0.06} amount={0.2}>
          <div className="case-study__nav" role="tablist" aria-label="Featured case studies">
            {featuredCaseStudies.map((study, i) => (
              <button
                key={study.id}
                type="button"
                role="tab"
                aria-selected={caseIndex === i}
                className={`case-study__nav-btn ${caseIndex === i ? "case-study__nav-btn--active" : ""}`}
                onClick={() => setCaseIndex(i)}
              >
                {study.shortLabel}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={caseStudy.id}
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.28, ease }}
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

        <div className="impact-strip">
          <Reveal as="p" className="impact-strip__label" direction="fade" duration={0.4}>
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
      </div>
    </section>
  );
}
