import { profile, education, certifications } from "../data/portfolioData";
import "./About.css";

export default function About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <p className="section-label">about me</p>
        <h2 className="section-title">Who I Am</h2>

        <div className="about__grid">
          <div className="about__bio">
            <p className="about__summary">{profile.summary}</p>

            <div className="about__info-grid">
              <div className="about__info-item">
                <span className="about__info-key">location</span>
                <span className="about__info-val">{profile.location}</span>
              </div>
              <div className="about__info-item">
                <span className="about__info-key">email</span>
                <a href={`mailto:${profile.email}`} className="about__info-val about__info-val--link">
                  {profile.email}
                </a>
              </div>
              <div className="about__info-item">
                <span className="about__info-key">experience</span>
                <span className="about__info-val">6 years</span>
              </div>
              <div className="about__info-item">
                <span className="about__info-key">certifications</span>
                <span className="about__info-val">{certifications.length}</span>
              </div>
            </div>
          </div>

          <div className="about__right">
            <div className="about__education">
              <h3 className="about__sub-title">Education</h3>
              {education.map((edu, i) => (
                <div key={i} className="about__edu-item">
                  <div className="about__edu-year">{edu.year}</div>
                  <div>
                    <div className="about__edu-degree">{edu.degree}</div>
                    <div className="about__edu-school">{edu.school}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="about__certs">
              <h3 className="about__sub-title">Certifications</h3>
              <div className="about__cert-list">
                {certifications.map((cert, i) => (
                  <div key={i} className="about__cert-badge">
                    <span className="about__cert-check">✓</span>
                    {cert.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
