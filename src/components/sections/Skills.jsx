import { toolkit } from "../../data/portfolioData";
import { Reveal, RevealGroup, RevealItem, SectionHeader } from "../ui/Reveal";
import "./Skills.css";

export default function Skills() {
  return (
    <section className="skills" id="skills">
      <div className="container">
        <SectionHeader label="toolkit" title="What I work with" />
        <Reveal as="p" className="skills__lede" direction="fade" delay={0.04}>
          The tools that show up in real delivery — not a full inventory of every library I’ve touched.
        </Reveal>

        <RevealGroup className="skills__list" stagger={0.08} delay={0.06}>
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
