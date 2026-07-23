import { useState } from "react";
import { profile, education, certifications } from "../../data/portfolioData";
import BorderGlow, { useBorderGlowTheme } from "../ui/BorderGlow";
import { Reveal, RevealGroup, RevealItem, SectionHeader } from "../ui/Reveal";
import "./About.css";

function SalesforceMark() {
  return (
    <svg
      className="about__sf-mark"
      viewBox="0 0 32 22"
      width="22"
      height="15"
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M11.2 6.4c.7-1.5 2.2-2.5 3.9-2.5 1 0 1.9.3 2.6.9A4.3 4.3 0 0 1 22 3.2c2.4 0 4.3 1.9 4.3 4.3 0 .3 0 .6-.1.9A3.9 3.9 0 0 1 29.5 12c0 2.2-1.8 4-4 4H8.2A4.7 4.7 0 0 1 3.5 11.3c0-1.8 1-3.3 2.5-4.1A4.2 4.2 0 0 1 11.2 6.4Z"
      />
    </svg>
  );
}

export default function About() {
  const [showAllCerts, setShowAllCerts] = useState(false);
  const glow = useBorderGlowTheme({
    borderRadius: 10,
    glowRadius: 18,
    glowIntensity: 0.75,
    fillOpacity: 0.28,
  });

  return (
    <section className="about" id="about">
      <div className="container">
        <SectionHeader label="about me" title="Who I Am" />

        <div className="about__grid">
          <Reveal className="about__bio" direction="left" delay={0.05}>
            <p className="about__summary">{profile.summary}</p>

            <div className="about__info-grid">
              <BorderGlow className="about__info-glow" {...glow}>
                <div className="about__info-item">
                  <span className="about__info-key">location</span>
                  <span className="about__info-val">{profile.location}</span>
                </div>
              </BorderGlow>

              <BorderGlow className="about__info-glow" {...glow}>
                <div className="about__info-item">
                  <span className="about__info-key">email</span>
                  <a href={`mailto:${profile.email}`} className="about__info-val about__info-val--link">
                    {profile.email}
                  </a>
                </div>
              </BorderGlow>

              <BorderGlow className="about__info-glow" {...glow}>
                <div className="about__info-item">
                  <span className="about__info-key">experience</span>
                  <span className="about__info-val">
                    {new Date().getFullYear() - profile.year_start_work}+
                  </span>
                </div>
              </BorderGlow>
            </div>
          </Reveal>

          <RevealGroup className="about__right" stagger={0.1} delay={0.1}>
            <RevealItem className="about__education">
              <h3 className="about__sub-title">Education</h3>
              {education.map((edu, i) => (
                <div key={i} className="about__edu-item">
                  <div>
                    <div className="about__edu-degree">{edu.degree}</div>
                    <div className="about__edu-school">{edu.school}</div>
                  </div>
                </div>
              ))}
            </RevealItem>

            <RevealItem className="about__certs">
              <h3 className="about__sub-title">Certifications</h3>

              <div className="about__architect">
                <div className="about__architect-head">
                  <SalesforceMark />
                  <span>Salesforce Architect path</span>
                </div>
                <div className="about__architect-row" role="list">
                  {certifications.architectPath.map((cert, index) => (
                    <span
                      key={cert.short}
                      className="about__architect-chip"
                      role="listitem"
                      title={cert.full}
                    >
                      {index > 0 && <span className="about__architect-plus" aria-hidden>+</span>}
                      <span className="about__architect-name">{cert.short}</span>
                    </span>
                  ))}
                </div>
              </div>

              <button
                type="button"
                className={`about__certs-toggle ${showAllCerts ? "is-open" : ""}`}
                aria-expanded={showAllCerts}
                onClick={() => setShowAllCerts((open) => !open)}
              >
                {showAllCerts ? "Hide certs" : `All certs (${certifications.all.length})`}
                <span aria-hidden>{showAllCerts ? "−" : "+"}</span>
              </button>

              {showAllCerts && (
                <ul className="about__cert-list">
                  {certifications.all.map((cert) => (
                    <li key={cert.name} className="about__cert-item">
                      <span className="about__cert-issuer">{cert.issuer}</span>
                      <span className="about__cert-name">
                        {cert.name.replace(/^Salesforce Certified /, "")}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </RevealItem>
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
