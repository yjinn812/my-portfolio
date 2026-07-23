import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import "./Navbar.css";

const navLinks = [
  { label: "about", href: "#about" },
  { label: "experience", href: "#experience" },
  { label: "projects", href: "#projects" },
  { label: "skills", href: "#skills" },
  { label: "contact", href: "#contact" },
];

const ease = [0.22, 1, 0.36, 1];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const next = window.scrollY > 40;
        setScrolled((prev) => (prev === next ? prev : next));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const onEscape = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, []);

  return (
    <motion.nav
      className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}
      initial={reduceMotion ? false : { opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.45, ease }}
    >
      <div className="navbar__inner container">
        <a href="#hero" className="navbar__logo">
          <span className="navbar__logo-bracket">&lt;</span>
          YJW
          <span className="navbar__logo-bracket">/&gt;</span>
        </a>

        <div className="navbar__actions">
          <ul
            id="primary-nav"
            className={`navbar__links ${menuOpen ? "navbar__links--open" : ""}`}
          >
            {navLinks.map((link, i) => (
              <motion.li
                key={link.label}
                initial={reduceMotion ? false : { opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { duration: 0.35, delay: 0.08 + i * 0.05, ease }
                }
              >
                <a
                  href={link.href}
                  className="navbar__link"
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="navbar__link-num">0{i + 1}.</span>
                  {link.label}
                </a>
              </motion.li>
            ))}
            <motion.li
              className="navbar__cta-group"
              initial={reduceMotion ? false : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { duration: 0.35, delay: 0.08 + navLinks.length * 0.05, ease }
              }
            >
              <a href="mailto:wongyj812@gmail.com" className="navbar__cta">
                hire me
              </a>
            </motion.li>
          </ul>

          <button
            className={`navbar__burger ${menuOpen ? "navbar__burger--open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="primary-nav"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
