import { profile } from "../data/portfolioData";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero__grid-bg" aria-hidden />
      <div className="container hero__inner">
        <div className="hero__content fade-up">
          <p className="hero__greeting">
            <span className="hero__prompt">$&gt;</span> hello, world
          </p>
          <h1 className="hero__name">{profile.name}</h1>
          <h2 className="hero__title">{profile.title}</h2>
          <p className="hero__tagline">{profile.tagline}</p>

          <div className="hero__meta">
            <span>📍 {profile.location}</span>
            <span className="hero__dot" />
            <span>6 yrs exp</span>
            <span className="hero__dot" />
            <span>8 Salesforce certs</span>
          </div>

          <div className="hero__actions">
            <a href="#projects" className="hero__btn hero__btn--primary">
              View My Work
            </a>
            <a href="#contact" className="hero__btn hero__btn--ghost">
              Get In Touch
            </a>
          </div>
        </div>

        <div className="hero__terminal fade-up" style={{ animationDelay: "0.2s" }}>
          <div className="terminal__header">
            <span className="terminal__dot terminal__dot--red" />
            <span className="terminal__dot terminal__dot--yellow" />
            <span className="terminal__dot terminal__dot--green" />
            <span className="terminal__title">profile.json</span>
          </div>
          <pre className="terminal__body">
{`{
  "name": "Yu Jin Wong",
  "role": "Lead Engineer",
  "stack": [
    "Salesforce",
    "AWS",
    "LWC",
    "Jenkins",
    "Docker"
  ],
  "certs": 8,
  "experience_yrs": 6,
  "currently": "NAB",
  "open_to_roles": true
}`}
          </pre>
        </div>
      </div>

      <div className="hero__scroll-hint">
        <span>scroll</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  );
}
