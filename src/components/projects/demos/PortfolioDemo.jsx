import { useEffect, useState } from "react";
import { portfolioDemoPreview } from "../../../data/portfolioData";
import "./PortfolioDemo.css";

const SCREENS = [
  {
    id: "hero",
    label: "Hero",
    caption: "Syne name, command bar, and expandable profile.json",
    url: "www.yujinwong.com/#hero",
  },
  {
    id: "work",
    label: "Work",
    caption: "Impact strip + featured case studies",
    url: "www.yujinwong.com/#experience",
  },
  {
    id: "projects",
    label: "Projects",
    caption: "Scroll-scrubbed stages synced to the Möbius backdrop",
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
        <span className="pf-nav__brand">
          <span className="pf-nav__bracket">&lt;</span>YJ
          <span className="pf-nav__bracket">/&gt;</span>
        </span>
        <div className="pf-nav__links">
          <span>work</span>
          <span>projects</span>
          <span>about</span>
          <span>skills</span>
          <span>contact</span>
        </div>
        <span className="pf-nav__cta">hire me</span>
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
          <p className="pf-hero__role">{portfolioDemoPreview.title}</p>
          <div className="pf-hero__btns">
            <span className="pf-hero__btn pf-hero__btn--primary">View My Work</span>
          </div>
          <div className="pf-cmd">
            <span className="pf-cmd__prompt">$</span>
            <span className="pf-cmd__text">{portfolioDemoPreview.command}</span>
            <span className="pf-cmd__cursor" />
          </div>
        </div>
        <div className="pf-terminal">
          <div className="pf-terminal__bar">
            <span /><span /><span />
            <em>profile.json</em>
          </div>
          <pre className="pf-terminal__body">{portfolioDemoPreview.jsonText}</pre>
        </div>
      </div>
      <div className="pf-hero__glow" aria-hidden />
    </div>
  );
}

function WorkScreen() {
  const featured = portfolioDemoPreview.featuredCase;

  return (
    <div className="pf-screen pf-screen--work">
      <div className="pf-section-label">// work</div>
      <h3 className="pf-section-title">Work</h3>

      <p className="pf-impact-label">Impact at a glance</p>
      <div className="pf-impact">
        {portfolioDemoPreview.impactMetrics.map((metric) => (
          <div className="pf-impact__item" key={metric.label}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </div>
        ))}
      </div>

      <div className="pf-case">
        <div className="pf-case__tabs">
          {portfolioDemoPreview.caseTabs.map((label, index) => (
            <span key={label} className={index === 0 ? "is-active" : undefined}>
              {label}
            </span>
          ))}
        </div>
        <p className="pf-case__eyebrow">{featured.eyebrow}</p>
        <h4 className="pf-case__title">{featured.title}</h4>
        <div className="pf-case__beats">
          <div>
            <em>01 · Problem</em>
            <p>{featured.problem}</p>
          </div>
          <div>
            <em>02 · What I did</em>
            <p>{featured.did}</p>
          </div>
          <div>
            <em>03 · Result</em>
            <p>{featured.result}</p>
          </div>
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
      <p className="pf-projects__hint">Scroll to advance each build</p>

      <div className="pf-stages">
        <div className="pf-stage is-active">
          <span className="pf-stage__index">01 / 05</span>
          <div className="pf-stage__card">
            <div className="pf-stage__media">AI chat · macros → Firestore</div>
            <div className="pf-stage__body">
              <span className="pf-stage__eyebrow">Featured project</span>
              <strong>AI Food Tracker</strong>
            </div>
          </div>
        </div>
        <div className="pf-stage pf-stage--next">
          <span className="pf-stage__index">02 / 05</span>
          <div className="pf-stage__card pf-stage__card--compact">
            <div className="pf-stage__media pf-stage__media--sm">POST /sheets/append</div>
            <strong>Sheets Microservice</strong>
          </div>
        </div>
        <div className="pf-stage-rail" aria-hidden>
          <i /><i /><i /><i /><i className="is-on" />
        </div>
      </div>
    </div>
  );
}

function ScreenContent({ id }) {
  if (id === "hero") return <HeroScreen />;
  if (id === "work") return <WorkScreen />;
  if (id === "projects") return <ProjectsScreen />;
  return null;
}

export default function PortfolioDemo({ active, inView = true }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || !inView) return undefined;

    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % SCREENS.length);
    }, active ? 2800 : 3800);

    return () => window.clearInterval(id);
  }, [active, paused, inView]);

  const go = (delta) => {
    setPaused(true);
    setIndex((current) => (current + delta + SCREENS.length) % SCREENS.length);
  };

  const screen = SCREENS[index];

  return (
    <div className={`pf-demo${active ? " pf-demo--active" : ""}${inView ? " pf-demo--inview" : ""}`}>
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
