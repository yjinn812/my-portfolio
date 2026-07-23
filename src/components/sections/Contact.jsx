import { profile } from "../../data/portfolioData";
import BorderGlow, { useBorderGlowTheme } from "../ui/BorderGlow";
import { Reveal, RevealGroup, RevealItem, SectionHeader } from "../ui/Reveal";
import "./Contact.css";

export default function Contact() {
  const glow = useBorderGlowTheme({
    borderRadius: 10,
    glowRadius: 18,
    glowIntensity: 0.75,
    fillOpacity: 0.28,
  });

  return (
    <section className="contact" id="contact">
      <div className="container">
        <SectionHeader label="get in touch" title="Contact" />

        <div className="contact__grid">
          <Reveal className="contact__left" direction="left" delay={0.05}>
            <p className="contact__intro">
              Working on something in Salesforce, AI across the SDLC, or platform
              engineering? I like hard problems and clear delivery — reach out.
            </p>

            <RevealGroup className="contact__links" stagger={0.07} delay={0.12}>
              <RevealItem>
                <BorderGlow className="contact__link-glow" {...glow}>
                  <a href={`mailto:${profile.email}`} className="contact__link">
                    <span className="contact__link-icon">✉</span>
                    <div>
                      <span className="contact__link-label">Email</span>
                      <span className="contact__link-value">{profile.email}</span>
                    </div>
                  </a>
                </BorderGlow>
              </RevealItem>

              <RevealItem>
                <BorderGlow className="contact__link-glow" {...glow}>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact__link"
                  >
                    <span className="contact__link-icon">in</span>
                    <div>
                      <span className="contact__link-label">LinkedIn</span>
                      <span className="contact__link-value">Connect with me</span>
                    </div>
                  </a>
                </BorderGlow>
              </RevealItem>

              <RevealItem>
                <BorderGlow className="contact__link-glow" {...glow}>
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact__link"
                  >
                    <span className="contact__link-icon">⌥</span>
                    <div>
                      <span className="contact__link-label">GitHub</span>
                      <span className="contact__link-value">See my code</span>
                    </div>
                  </a>
                </BorderGlow>
              </RevealItem>

              <RevealItem>
                <div className="contact__link contact__link--info">
                  <span className="contact__link-icon">📍</span>
                  <div>
                    <span className="contact__link-label">Location</span>
                    <span className="contact__link-value">{profile.location}, Australia</span>
                  </div>
                </div>
              </RevealItem>
            </RevealGroup>
          </Reveal>

          <Reveal className="contact__cta-box" direction="right" delay={0.12} amount={0.25}>
            <div className="contact__cta-label">// say hello</div>
            <h3 className="contact__cta-heading">Let&apos;s talk engineering.</h3>
            <a href={`mailto:${profile.email}`} className="contact__cta-btn">
              Send me an email →
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
