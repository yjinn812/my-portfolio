import {
  SiTypescript,
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiJenkins,
  SiDocker,
  SiGithubactions,
  SiFirebase,
  SiGnubash,
  SiAnthropic,
  SiCursor,
  SiVite,
  SiPython,
} from "react-icons/si";
import { FaAws, FaSalesforce } from "react-icons/fa";
import { toolkit } from "../../data/portfolioData";
import LogoLoop from "../ui/LogoLoop";
import "./Skills.css";

const techLogos = [
  { node: <FaSalesforce />, title: "Salesforce" },
  { node: <SiTypescript />, title: "TypeScript" },
  { node: <SiJavascript />, title: "JavaScript" },
  { node: <SiPython />, title: "Python" },
  { node: <SiReact />, title: "React" },
  { node: <SiNodedotjs />, title: "Node.js" },
  { node: <SiExpress />, title: "Express" },
  { node: <FaAws />, title: "AWS" },
  { node: <SiJenkins />, title: "Jenkins" },
  { node: <SiDocker />, title: "Docker" },
  { node: <SiGithubactions />, title: "GitHub Actions" },
  { node: <SiFirebase />, title: "Firebase" },
  { node: <SiCursor />, title: "Cursor" },
  { node: <SiAnthropic />, title: "Claude" },
  { node: <SiVite />, title: "Vite" },
  { node: <SiGnubash />, title: "Shell" },
];

/** NSIDE-style scatter: alternate lean, straighten on hover (CSS-driven). */
const TILTS = [-4.5, 3.2, -3.6];

function ToolkitCard({ group, index }) {
  const tilt = TILTS[index % TILTS.length];

  return (
    <div className="toolkit-card-slot">
      <article
        className={`toolkit-card toolkit-card--${group.tone}`}
        style={{
          "--tilt": tilt,
          "--tilt-dim": tilt * 1.35,
          "--enter-delay": `${index * 70}ms`,
        }}
      >
        <div className="toolkit-card__visual" aria-hidden="true" />
        <div className="toolkit-card__veil" aria-hidden="true" />

        <div className="toolkit-card__content">
          <p className="toolkit-card__eyebrow">{group.eyebrow}</p>
          <h3 className="toolkit-card__title">{group.title}</h3>

          <ul className="toolkit-card__items">
            {group.items.map((item, itemIndex) => (
              <li key={item} style={{ "--scan-i": itemIndex }}>
                <span className="toolkit-card__chip-label">{item}</span>
              </li>
            ))}
          </ul>

          <p className="toolkit-card__footer">
            <span>{String(group.items.length).padStart(2, "0")} tools</span>
            <span className="toolkit-card__hint">{group.note}</span>
          </p>
        </div>
      </article>
    </div>
  );
}

export default function Skills() {
  return (
    <section className="skills" id="skills">
      <div className="container skills__intro">
        <p className="section-label">toolkit</p>
        <h2 className="section-title">What I work with</h2>
        <p className="skills__lede">
          Tools I’ve shipped with, not a claim that I know every library by heart.
        </p>
      </div>

      <div className="skills__loop">
        <LogoLoop
          logos={techLogos}
          speed={90}
          direction="left"
          logoHeight={36}
          gap={48}
          hoverSpeed={0}
          fadeOut
          fadeOutColor="var(--bg)"
          ariaLabel="Tools I work with"
          renderItem={(item) => (
            <span className="logoloop__node" title={item.title}>
              {item.node}
              <span className="logoloop__label">{item.title}</span>
            </span>
          )}
        />
      </div>

      <div className="container">
        <div className="toolkit-gallery">
          {toolkit.map((group, index) => (
            <ToolkitCard key={group.id} group={group} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
