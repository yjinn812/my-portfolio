import { projects } from "../data/portfolioData";
import ProjectCard from "./ProjectCard";
import "./Projects.css";

export default function Projects() {
  return (
    <section className="projects" id="projects">
      <div className="container">
        <p className="section-label">portfolio</p>
        <h2 className="section-title">Notable Work</h2>

        <div className="projects__grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
