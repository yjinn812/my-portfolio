import { skills } from "../data/portfolioData";
import "./Skills.css";

export default function Skills() {
  return (
    <section className="skills" id="skills">
      <div className="container">
        <p className="section-label">expertise</p>
        <h2 className="section-title">Skills & Stack</h2>

        <div className="skills__grid">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="skills__category">
              <h3 className="skills__category-title">{category}</h3>
              <div className="skills__tags">
                {items.map((skill) => (
                  <span key={skill} className="skills__tag">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
