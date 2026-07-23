import { projects } from "../../data/portfolioData";
import ProjectCard from "../projects/ProjectCard";
import ScrollStack, { ScrollStackItem } from "../ui/ScrollStack";
import { SectionHeader } from "../ui/Reveal";
import "./Projects.css";

export default function Projects() {
  return (
    <section className="projects" id="projects">
      <div className="container">
        <SectionHeader label="projects" title="Personal Projects" />
      </div>

      <div className="projects__stack">
        <div className="container">
          <ScrollStack useWindowScroll itemDistance={140} itemStackDistance={18} stackPosition="12%">
            {projects.map((project) => (
              <ScrollStackItem key={project.id}>
                <ProjectCard project={project} featured={Boolean(project.featured)} />
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </div>
      </div>
    </section>
  );
}
