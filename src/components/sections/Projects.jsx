import { projects } from "../../data/portfolioData";
import ProjectCard from "../projects/ProjectCard";
import { Reveal, RevealGroup, RevealItem, SectionHeader } from "../ui/Reveal";
import "./Projects.css";

export default function Projects() {
  const featured = projects.find((project) => project.featured);
  const rest = projects.filter((project) => !project.featured);

  return (
    <section className="projects" id="projects">
      <div className="container">
        <SectionHeader label="projects" title="Personal Projects" />

        {featured && (
          <Reveal className="projects__featured" direction="up" delay={0.05} amount={0.12}>
            <ProjectCard project={featured} featured />
          </Reveal>
        )}

        <RevealGroup className="projects__grid" stagger={0.09} delay={0.08} amount={0.1}>
          {rest.map((project) => (
            <RevealItem
              key={project.id}
              direction="up"
              className={project.wide ? "projects__wide" : undefined}
            >
              <ProjectCard project={project} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
