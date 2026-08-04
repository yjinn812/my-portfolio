import { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { easeOut } from "../../lib/motion";
import "./Navbar.css";

const navLinks = [
  { label: "work", href: "#experience" },
  { label: "projects", href: "#projects" },
  { label: "about", href: "#about" },
  { label: "skills", href: "#skills" },
  { label: "contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("");
  const reduceMotion = useReducedMotion();
  const burgerRef = useRef(null);
  const linksRef = useRef(null);

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
    const ids = navLinks.map((link) => link.href.slice(1));
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (elements.length === 0) return undefined;

    const ratios = new Map();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.set(entry.target.id, entry.intersectionRatio);
        });
        let bestId = "";
        let bestRatio = 0;
        ratios.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        });
        if (bestId) setActiveHref(`#${bestId}`);
      },
      {
        root: null,
        threshold: [0.12, 0.25, 0.4, 0.55],
        rootMargin: "-20% 0px -45% 0px",
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        burgerRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || !linksRef.current) return;
      const focusable = [
        ...linksRef.current.querySelectorAll('a[href], button:not([disabled])'),
        burgerRef.current,
      ].filter(Boolean);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    const firstLink = linksRef.current?.querySelector("a[href]");
    firstLink?.focus();

    const main = document.getElementById("main");
    main?.setAttribute("inert", "");

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      main?.removeAttribute("inert");
    };
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <motion.nav
      className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.28, ease: easeOut }}
    >
      <div className="navbar__inner container">
        <a href="#hero" className="navbar__logo">
          <span className="navbar__logo-bracket">&lt;</span>
          YJW
          <span className="navbar__logo-bracket">/&gt;</span>
        </a>

        <div className="navbar__actions">
          <ul
            ref={linksRef}
            id="primary-nav"
            className={`navbar__links ${menuOpen ? "navbar__links--open" : ""}`}
          >
            {navLinks.map((link, i) => {
              const isActive = activeHref === link.href;
              return (
              <motion.li
                key={link.label}
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { duration: 0.28, delay: 0.06 + i * 0.04, ease: easeOut }
                }
              >
                <a
                  href={link.href}
                  className={`navbar__link${isActive ? " navbar__link--active" : ""}`}
                  aria-current={isActive ? "location" : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="navbar__link-num">0{i + 1}.</span>
                  {link.label}
                </a>
              </motion.li>
              );
            })}
            <motion.li
              className="navbar__cta-group"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { duration: 0.28, delay: 0.06 + navLinks.length * 0.04, ease: easeOut }
              }
            >
              <a href="mailto:wongyj812@gmail.com" className="navbar__cta">
                hire me
              </a>
            </motion.li>
          </ul>

          <button
            ref={burgerRef}
            type="button"
            className={`navbar__burger ${menuOpen ? "navbar__burger--open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="primary-nav"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {menuOpen && (
        <button
          type="button"
          className="navbar__backdrop"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </motion.nav>
  );
}
