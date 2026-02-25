import { profile } from "../data/portfolioData";
import "./Contact.css";

export default function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="container">
        <p className="section-label">get in touch</p>
        <h2 className="section-title">Contact</h2>

        <div className="contact__grid">
          <div className="contact__left">
            <p className="contact__intro">
              I'm always open to discussing new opportunities, interesting projects,
              or just a chat about tech. Feel free to reach out!
            </p>

            <div className="contact__links">
              <a href={`mailto:${profile.email}`} className="contact__link">
                <span className="contact__link-icon">✉</span>
                <div>
                  <span className="contact__link-label">Email</span>
                  <span className="contact__link-value">{profile.email}</span>
                </div>
              </a>

              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="contact__link">
                <span className="contact__link-icon">in</span>
                <div>
                  <span className="contact__link-label">LinkedIn</span>
                  <span className="contact__link-value">Connect with me</span>
                </div>
              </a>

              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="contact__link">
                <span className="contact__link-icon">⌥</span>
                <div>
                  <span className="contact__link-label">GitHub</span>
                  <span className="contact__link-value">See my code</span>
                </div>
              </a>

              <div className="contact__link contact__link--info">
                <span className="contact__link-icon">📍</span>
                <div>
                  <span className="contact__link-label">Location</span>
                  <span className="contact__link-value">{profile.location}, Australia</span>
                </div>
              </div>
            </div>
          </div>

          <div className="contact__cta-box">
            <div className="contact__cta-label">// open to opportunities</div>
            <h3 className="contact__cta-heading">Let's build something great together.</h3>
            <a href={`mailto:${profile.email}`} className="contact__cta-btn">
              Send me an email →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
