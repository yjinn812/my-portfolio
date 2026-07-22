import { useEffect, useState } from "react";
import "./PortfolioDemo.css";

const SCREENS = [
  {
    id: "hero",
    label: "Hero",
    caption: "Name, CTAs, and live profile.json terminal",
    url: "www.yujinwong.com/#hero",
  },
  {
    id: "experience",
    label: "Experience",
    caption: "Role tabs with animated highlight swaps",
    url: "www.yujinwong.com/#experience",
  },
  {
    id: "projects",
    label: "Projects",
    caption: "Interactive demos — chat, API client, iOS gallery",
    url: "www.yujinwong.com/#projects",
  },
];

function Chevron({ dir }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d={dir === "prev" ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"}
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HeroScreen() {
  return (
    <div className="pf-screen pf-screen--hero">
      <div className="pf-nav">
        <span className="pf-nav__brand">YJ</span>
        <div className="pf-nav__links">
          <span>About</span>
          <span>Work</span>
          <span>Projects</span>
        </div>
        <span className="pf-nav__theme" title="Light / dark theme">◐</span>
      </div>
      <div className="pf-hero">
        <div className="pf-hero__copy">
          <p className="pf-hero__greet">
            <span>$&gt;</span> hello, world
          </p>
          <h3 className="pf-hero__name">
            Yu Jin
            <br />
            Wong
          </h3>
          <p className="pf-hero__role">Lead Engineer @ NAB</p>
          <div className="pf-hero__btns">
            <span className="pf-hero__btn pf-hero__btn--primary">View My Work</span>
            <span className="pf-hero__btn">Get In Touch</span>
          </div>
        </div>
        <div className="pf-terminal">
          <div className="pf-terminal__bar">
            <span /><span /><span />
            <em>profile.json</em>
          </div>
          <pre className="pf-terminal__body">{`{
  "role": "Lead Engineer",
  "impacts": {
    "users": "3k → 13k",
    "speed": "4x"
  },
  "open_to_roles": true
}`}</pre>
        </div>
      </div>
    </div>
  );
}

function ExperienceScreen() {
  return (
    <div className="pf-screen pf-screen--experience">
      <div className="pf-section-label">// work history</div>
      <h3 className="pf-section-title">Experience</h3>
      <div className="pf-exp">
        <div className="pf-exp__tabs">
          <div className="pf-exp__tab is-active">
            <strong>NAB</strong>
            <span>Lead Engineer</span>
          </div>
          <div className="pf-exp__tab">
            <strong>NAB</strong>
            <span>Senior Analyst</span>
          </div>
          <div className="pf-exp__tab">
            <strong>Appirio</strong>
            <span>Graduate SE</span>
          </div>
        </div>
        <div className="pf-exp__panel">
          <div className="pf-exp__role">Lead Engineer <em>@ NAB</em></div>
          <p className="pf-exp__period">Oct 2024 – Present</p>
          <ul className="pf-exp__list">
            <li>Technical direction across 13,000+ user CRM</li>
            <li>CI/CD overhaul — 10–30 min setup saved</li>
            <li>400% record processing improvement</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function ProjectsScreen() {
  return (
    <div className="pf-screen pf-screen--projects">
      <div className="pf-section-label">// projects</div>
      <h3 className="pf-section-title">Personal Projects</h3>
      <div className="pf-projects">
        <div className="pf-project pf-project--feature">
          <div className="pf-project__demo">AI chat · macros → Firestore</div>
          <strong>AI Food Tracker</strong>
        </div>
        <div className="pf-project">
          <div className="pf-project__demo">POST /sheets/append</div>
          <strong>Sheets Microservice</strong>
        </div>
        <div className="pf-project">
          <div className="pf-project__demo">iOS · trip splits</div>
          <strong>Expense Tracker</strong>
        </div>
      </div>
    </div>
  );
}

function ScreenContent({ id }) {
  if (id === "hero") return <HeroScreen />;
  if (id === "experience") return <ExperienceScreen />;
  if (id === "projects") return <ProjectsScreen />;
  return null;
}

export default function PortfolioDemo({ active }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return undefined;

    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % SCREENS.length);
    }, active ? 2600 : 3600);

    return () => window.clearInterval(id);
  }, [active, paused]);

  const go = (delta) => {
    setPaused(true);
    setIndex((current) => (current + delta + SCREENS.length) % SCREENS.length);
  };

  const screen = SCREENS[index];

  return (
    <div className={`pf-demo ${active ? "pf-demo--active" : ""}`}>
      <div className="pf-carousel">
        <button
          type="button"
          className="pf-nav-btn"
          aria-label="Previous screen"
          onClick={() => go(-1)}
        >
          <Chevron dir="prev" />
        </button>

        <div className="pf-browser">
          <div className="pf-browser__chrome">
            <div className="pf-browser__traffic">
              <span /><span /><span />
            </div>
            <div className="pf-browser__url">
              <span className="pf-browser__lock" aria-hidden />
              {screen.url}
            </div>
          </div>
          <div className="pf-browser__viewport">
            {SCREENS.map((item, i) => (
              <div
                key={item.id}
                className={`pf-browser__page ${i === index ? "pf-browser__page--active" : ""}`}
              >
                <ScreenContent id={item.id} />
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="pf-nav-btn"
          aria-label="Next screen"
          onClick={() => go(1)}
        >
          <Chevron dir="next" />
        </button>
      </div>

      <div className="pf-demo__meta">
        <span className="pf-demo__label">{screen.label}</span>
        <span className="pf-demo__caption">{screen.caption}</span>
        <span className="pf-demo__count">
          {index + 1} / {SCREENS.length}
        </span>
      </div>
    </div>
  );
}
