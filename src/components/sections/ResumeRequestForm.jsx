import { useEffect, useRef, useState } from "react";
import "./ResumeRequestForm.css";

const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
const RESUME_HASH = "#resume";
const OPEN_EVENT = "portfolio:open-resume";

function hashRequestsResume() {
  return typeof window !== "undefined" && window.location.hash === RESUME_HASH;
}

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export default function ResumeRequestForm() {
  const [open, setOpen] = useState(hashRequestsResume);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState("");
  const rootRef = useRef(null);
  const emailRef = useRef(null);
  const shouldRevealRef = useRef(hashRequestsResume());

  useEffect(() => {
    function openFromHash() {
      if (!hashRequestsResume()) return;
      shouldRevealRef.current = true;
      setStatus((current) => (current === "success" ? current : "idle"));
      setOpen(true);
    }

    function openFromEvent() {
      shouldRevealRef.current = true;
      setStatus((current) => (current === "success" ? current : "idle"));
      setOpen(true);
      if (!hashRequestsResume()) {
        const { pathname, search } = window.location;
        window.history.pushState(null, "", `${pathname}${search}${RESUME_HASH}`);
      }
    }

    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    window.addEventListener(OPEN_EVENT, openFromEvent);
    return () => {
      window.removeEventListener("hashchange", openFromHash);
      window.removeEventListener(OPEN_EVENT, openFromEvent);
    };
  }, []);

  useEffect(() => {
    if (!open || !shouldRevealRef.current) return undefined;

    let cancelled = false;
    const reduceMotion = prefersReducedMotion();
    let focusTimer = 0;

    // Wait for the expanded form to paint, then scroll past the CTA chrome
    // into the form fields (native hash scroll runs before expand).
    const frame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        if (cancelled) return;

        const target = emailRef.current ?? rootRef.current;
        if (target) {
          // Prefer window.scrollTo — scrollIntoView is unreliable when a
          // transformed ancestor (Reveal/Framer) wraps the form.
          const nav = document.querySelector(".navbar");
          const offset = (nav?.getBoundingClientRect().height ?? 88) + 16;
          const top =
            target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({
            top: Math.max(0, top),
            behavior: reduceMotion ? "auto" : "smooth",
          });
        }

        const focusEmail = () => {
          if (cancelled) return;
          emailRef.current?.focus({ preventScroll: true });
          shouldRevealRef.current = false;
        };

        // Cold loads can steal focus during paint; retry after scroll settles.
        focusEmail();
        focusTimer = window.setTimeout(focusEmail, reduceMotion ? 50 : 450);
      });
    });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
      window.clearTimeout(focusTimer);
    };
  }, [open]);

  function closeForm() {
    setOpen(false);
    setStatus("idle");
    setErrorMessage("");
    if (hashRequestsResume()) {
      const { pathname, search } = window.location;
      window.history.replaceState(null, "", `${pathname}${search}`);
    }
  }

  async function onSubmit(event) {
    event.preventDefault();
    if (!ACCESS_KEY) {
      setStatus("error");
      setErrorMessage("Form is not configured yet.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    // Honeypot — bots fill this; humans never see it
    if (formData.get("botcheck")) {
      setStatus("success");
      setOpen(false);
      return;
    }

    formData.append("access_key", ACCESS_KEY);
    formData.append("subject", "Portfolio resume request");
    formData.append("from_name", "Portfolio contact");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setOpen(false);
        return;
      }

      setStatus("error");
      setErrorMessage(data.message || "Something went wrong. Try email instead.");
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again.");
    }
  }

  return (
    <div className="resume-form-root" id="resume" ref={rootRef}>
      {status === "success" ? (
        <p
          className="resume-form__status resume-form__status--ok resume-form__enter resume-form__enter--success"
          role="status"
        >
          Request sent. I&apos;ll follow up with the resume.
        </p>
      ) : !open ? (
        <button
          type="button"
          className="contact__cta-btn contact__cta-btn--ghost resume-form__enter resume-form__enter--closed"
          onClick={() => setOpen(true)}
        >
          Request a resume
        </button>
      ) : (
        <form className="resume-form resume-form__enter resume-form__enter--form" onSubmit={onSubmit}>
          <p className="resume-form__hint">
            Leave your email and a short note. I&apos;ll send the resume through.
          </p>

          <label className="resume-form__field">
            <span className="resume-form__label">Contact email</span>
            <input
              ref={emailRef}
              className="resume-form__input"
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder="you@company.com"
              disabled={status === "loading"}
            />
          </label>

          <label className="resume-form__field">
            <span className="resume-form__label">Comment</span>
            <textarea
              className="resume-form__input resume-form__textarea"
              name="message"
              required
              rows={3}
              placeholder="Role, company, or why you're reaching out"
              disabled={status === "loading"}
            />
          </label>

          {/* Honeypot */}
          <input
            type="checkbox"
            name="botcheck"
            className="resume-form__honeypot"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          <div className="resume-form__actions">
            <button
              type="submit"
              className="contact__cta-btn"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Sending…" : "Send request →"}
            </button>
            <button
              type="button"
              className="resume-form__cancel"
              onClick={closeForm}
              disabled={status === "loading"}
            >
              Cancel
            </button>
          </div>

          {status === "error" && (
            <p className="resume-form__status resume-form__status--err" role="alert">
              {errorMessage}
            </p>
          )}
        </form>
      )}
    </div>
  );
}

export function openResumeRequest(event) {
  if (event) event.preventDefault();
  window.dispatchEvent(new Event(OPEN_EVENT));
}
