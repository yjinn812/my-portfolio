import { useEffect, useRef, useState } from "react";
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
import { Reveal, SectionHeader } from "../ui/Reveal";
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
        tabIndex={0}
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
  const galleryRef = useRef(null);
  const [galleryInView, setGalleryInView] = useState(false);

  useEffect(() => {
    const node = galleryRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setGalleryInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setGalleryInView(true);
        observer.disconnect();
      },
      { threshold: 0.22, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="skills" id="skills">
      <div className="container skills__intro">
        <SectionHeader label="toolkit" title="What I work with" />
        <Reveal as="p" className="skills__lede" direction="fade" delay={0.06}>
          Tools I’ve shipped with, not a claim that I know every library by heart.
        </Reveal>
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
        <div
          ref={galleryRef}
          className={`toolkit-gallery${galleryInView ? " is-inview" : ""}`}
        >
          {toolkit.map((group, index) => (
            <ToolkitCard key={group.id} group={group} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
