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
} from "react-icons/si";
import { FaAws, FaSalesforce } from "react-icons/fa";
import { toolkit } from "../../data/portfolioData";
import LogoLoop from "../ui/LogoLoop";
import { Reveal, RevealGroup, RevealItem, SectionHeader } from "../ui/Reveal";
import "./Skills.css";

const techLogos = [
  { node: <FaSalesforce />, title: "Salesforce" },
  { node: <SiTypescript />, title: "TypeScript" },
  { node: <SiJavascript />, title: "JavaScript" },
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

export default function Skills() {
  return (
    <section className="skills" id="skills">
      <div className="container">
        <SectionHeader label="toolkit" title="What I work with" />
        <Reveal as="p" className="skills__lede" direction="fade" delay={0.04}>
          Tools I’ve shipped with — not a claim that I know every library by heart.
        </Reveal>
      </div>

      <Reveal className="skills__loop" direction="fade" delay={0.06}>
        <LogoLoop
          logos={techLogos}
          speed={90}
          direction="left"
          logoHeight={36}
          gap={48}
          hoverSpeed={0}
          scaleOnHover
          fadeOut
          fadeOutColor="#080c10"
          ariaLabel="Tools I work with"
          renderItem={(item) => (
            <span className="logoloop__node" title={item.title}>
              {item.node}
              <span className="logoloop__label">{item.title}</span>
            </span>
          )}
        />
      </Reveal>

      <div className="container">
        <RevealGroup className="skills__list" stagger={0.08} delay={0.08}>
          {toolkit.map((group) => (
            <RevealItem key={group.title} className="skills__group" direction="up">
              <div className="skills__group-head">
                <h3 className="skills__group-title">{group.title}</h3>
                <p className="skills__group-note">{group.note}</p>
              </div>
              <p className="skills__items">{group.items.join(" · ")}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
