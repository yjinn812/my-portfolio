import { useState } from "react";
import "./ResumeRequestForm.css";

const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

export default function ResumeRequestForm() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState("");

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
    formData.append("subject", "Portfolio — resume request");
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

  if (status === "success") {
    return (
      <p className="resume-form__status resume-form__status--ok" role="status">
        Request sent — I&apos;ll follow up with the resume.
      </p>
    );
  }

  if (!open) {
    return (
      <button
        type="button"
        className="contact__cta-btn contact__cta-btn--ghost"
        onClick={() => setOpen(true)}
      >
        Request a resume
      </button>
    );
  }

  return (
    <form className="resume-form" onSubmit={onSubmit}>
      <p className="resume-form__hint">
        Leave your email and a short note — I&apos;ll send the resume through.
      </p>

      <label className="resume-form__field">
        <span className="resume-form__label">Contact email</span>
        <input
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
          onClick={() => {
            setOpen(false);
            setStatus("idle");
            setErrorMessage("");
          }}
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
  );
}
