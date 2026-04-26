import { useState } from "react";
import { experience } from "../data/portfolioData";
import "./Experience.css";

export default function Experience() {
  const [active, setActive] = useState(0);
  const current = experience[active];

  return (
    <section className="experience" id="experience">
      <div className="container">
        <p className="section-label">work history</p>
        <h2 className="section-title">Experience</h2>

        <div className="experience__layout">
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
                <li key={i} className="experience__highlight">
                  <span className="experience__bullet">▸</span>
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
