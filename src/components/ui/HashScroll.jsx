import { useEffect } from "react";

const ANCHOR_IDS = new Set([
  "hero",
  "experience",
  "projects",
  "about",
  "skills",
  "contact",
  "resume",
]);

function getScrollPad() {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--scroll-pad")
    .trim();
  const px = Number.parseFloat(raw);
  return Number.isFinite(px) ? px : 88;
}

function targetTopFor(el) {
  return el.getBoundingClientRect().top + window.scrollY - getScrollPad();
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function raf() {
  return new Promise((resolve) => requestAnimationFrame(resolve));
}

function delay(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function waitForScrollEnd(timeoutMs = 1200) {
  return new Promise((resolve) => {
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      window.removeEventListener("scrollend", onEnd);
      resolve();
    };
    const onEnd = () => finish();
    window.addEventListener("scrollend", onEnd, { once: true });
    window.setTimeout(finish, timeoutMs);
  });
}

/** Re-lock until late layout (fonts / sticky stages) settles on the target. */
async function lockToElement(el) {
  for (let i = 0; i < 16; i++) {
    const next = Math.max(0, targetTopFor(el));
    if (Math.abs(window.scrollY - next) <= 1) {
      await raf();
      await raf();
      const confirmed = Math.max(0, targetTopFor(el));
      if (Math.abs(window.scrollY - confirmed) <= 1) return;
    }
    window.scrollTo({ top: next, behavior: "auto" });
    await delay(40);
  }
}

let scrollGen = 0;

async function scrollToHash({ behavior = "smooth" } = {}) {
  const id = window.location.hash.replace(/^#/, "");
  if (!id || !ANCHOR_IDS.has(id)) return;

  const el = document.getElementById(id);
  if (!el) return;

  const gen = ++scrollGen;
  const useSmooth = behavior === "smooth" && !prefersReducedMotion();

  if (useSmooth) {
    window.scrollTo({ top: Math.max(0, targetTopFor(el)), behavior: "smooth" });
    await waitForScrollEnd();
  }

  if (gen !== scrollGen) return;
  await lockToElement(el);
}

/**
 * Keeps in-page #hash jumps aligned under the fixed nav, even when layout
 * height changes mid-scroll (e.g. project scroll stages).
 */
export default function HashScroll() {
  useEffect(() => {
    let cancelled = false;

    const boot = async () => {
      if (!window.location.hash) return;
      try {
        await document.fonts.ready;
      } catch {
        /* ignore */
      }
      await raf();
      await raf();
      if (cancelled) return;
      await scrollToHash({ behavior: "auto" });
      if (cancelled) return;
      // One late pass after sticky stacks / images settle
      await delay(280);
      if (!cancelled) await scrollToHash({ behavior: "auto" });
    };

    boot();
    return () => {
      cancelled = true;
      scrollGen += 1;
    };
  }, []);

  useEffect(() => {
    const onHashChange = () => {
      scrollToHash({ behavior: "smooth" });
    };

    const onClick = (event) => {
      const anchor = event.target.closest?.('a[href^="#"]');
      if (
        !anchor ||
        event.defaultPrevented ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      const id = href.slice(1);
      if (!ANCHOR_IDS.has(id) || !document.getElementById(id)) return;

      event.preventDefault();
      if (window.location.hash === href) {
        scrollToHash({ behavior: "smooth" });
      } else {
        window.location.hash = href;
      }
    };

    window.addEventListener("hashchange", onHashChange);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("hashchange", onHashChange);
      document.removeEventListener("click", onClick);
      scrollGen += 1;
    };
  }, []);

  return null;
}
