import { profile } from "../../data/portfolioData";
import { Reveal } from "../ui/Reveal";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <Reveal className="container footer__inner" direction="fade" duration={0.5} amount={0.4}>
        <div className="footer__logo">
          <span className="footer__logo-bracket">&lt;</span>
          YJW
          <span className="footer__logo-bracket">/&gt;</span>
        </div>

        <p className="footer__copy">
          Designed & built by Yu Jin Wong · {new Date().getFullYear()}
        </p>

        <div className="footer__socials">
          <a href={`mailto:${profile.email}`} className="footer__social">Email</a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="footer__social">LinkedIn</a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="footer__social">GitHub</a>
        </div>
      </Reveal>
    </footer>
  );
}
