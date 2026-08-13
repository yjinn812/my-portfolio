import { motion, useReducedMotion } from "framer-motion";
import { easeOut } from "../../lib/motion";

/**
 * Motion families (Night Ops):
 * - editorial — clipped section titles
 * - interface — short UI / data reveals (metrics, lists)
 * - up/left/right/… — showcase body blocks (existing)
 */
const presets = {
  editorial: {
    hidden: {
      opacity: 0,
      transform: "translateY(14px)",
      clipPath: "inset(0 0 100% 0)",
    },
    visible: {
      opacity: 1,
      transform: "translateY(0px)",
      clipPath: "inset(0 0 0% 0)",
    },
  },
  interface: {
    hidden: { opacity: 0, transform: "translateY(10px)" },
    visible: { opacity: 1, transform: "translateY(0px)" },
  },
  up: {
    hidden: { opacity: 0, transform: "translateY(18px)" },
    visible: { opacity: 1, transform: "translateY(0px)" },
  },
  down: {
    hidden: { opacity: 0, transform: "translateY(-12px)" },
    visible: { opacity: 1, transform: "translateY(0px)" },
  },
  left: {
    hidden: { opacity: 0, transform: "translateX(-16px)" },
    visible: { opacity: 1, transform: "translateX(0px)" },
  },
  right: {
    hidden: { opacity: 0, transform: "translateX(16px)" },
    visible: { opacity: 1, transform: "translateX(0px)" },
  },
  fade: {
    hidden: { opacity: 0, transform: "translateY(8px)" },
    visible: { opacity: 1, transform: "translateY(0px)" },
  },
  scale: {
    hidden: { opacity: 0, transform: "scale(0.96)" },
    visible: { opacity: 1, transform: "scale(1)" },
  },
};

const reducedPresets = Object.fromEntries(
  Object.keys(presets).map((key) => [
    key,
    { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  ])
);

const defaultDurations = {
  editorial: 0.28,
  interface: 0.22,
  up: 0.28,
  down: 0.26,
  left: 0.28,
  right: 0.28,
  fade: 0.24,
  scale: 0.28,
};

function useRevealMotion(direction) {
  const reduceMotion = useReducedMotion();
  const variant = (reduceMotion ? reducedPresets : presets)[direction] ?? presets.up;
  return { reduceMotion, variant };
}

function revealTransition(reduceMotion, duration, delay = 0) {
  return {
    duration: reduceMotion ? 0.16 : duration,
    delay: reduceMotion ? 0 : delay,
    ease: easeOut,
  };
}

/** Shared props builder — JSX always uses stable motion.* components. */
function revealViewProps({
  className,
  style,
  variant,
  reduceMotion,
  duration,
  delay,
  once,
  amount,
  rest,
}) {
  return {
    className,
    style,
    initial: "hidden",
    whileInView: "visible",
    viewport: { once, amount },
    variants: variant,
    transition: revealTransition(reduceMotion, duration, delay),
    ...rest,
  };
}

export function Reveal({
  children,
  as = "div",
  direction = "up",
  delay = 0,
  duration,
  className,
  once = true,
  amount = 0.2,
  style,
  ...rest
}) {
  const { reduceMotion, variant } = useRevealMotion(direction);
  const resolvedDuration = duration ?? defaultDurations[direction] ?? 0.28;
  const props = revealViewProps({
    className,
    style,
    variant,
    reduceMotion,
    duration: resolvedDuration,
    delay,
    once,
    amount,
    rest,
  });

  if (as === "p") return <motion.p {...props}>{children}</motion.p>;
  if (as === "h2") return <motion.h2 {...props}>{children}</motion.h2>;
  if (as === "h3") return <motion.h3 {...props}>{children}</motion.h3>;
  if (as === "section") return <motion.section {...props}>{children}</motion.section>;
  if (as === "article") return <motion.article {...props}>{children}</motion.article>;
  if (as === "span") return <motion.span {...props}>{children}</motion.span>;
  if (as === "li") return <motion.li {...props}>{children}</motion.li>;
  if (as === "ul") return <motion.ul {...props}>{children}</motion.ul>;
  return <motion.div {...props}>{children}</motion.div>;
}

export function RevealGroup({
  children,
  as = "div",
  className,
  stagger = 0.05,
  delay = 0,
  once = true,
  amount = 0.15,
  style,
  ...rest
}) {
  const reduceMotion = useReducedMotion();
  const props = {
    className,
    style,
    initial: "hidden",
    whileInView: "visible",
    viewport: { once, amount },
    variants: {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: reduceMotion ? 0 : stagger,
          delayChildren: reduceMotion ? 0 : delay,
        },
      },
    },
    ...rest,
  };

  if (as === "ul") return <motion.ul {...props}>{children}</motion.ul>;
  if (as === "section") return <motion.section {...props}>{children}</motion.section>;
  return <motion.div {...props}>{children}</motion.div>;
}

export function RevealItem({
  children,
  as = "div",
  direction = "interface",
  className,
  duration,
  style,
  ...rest
}) {
  const { reduceMotion, variant } = useRevealMotion(direction);
  const resolvedDuration = duration ?? defaultDurations[direction] ?? 0.22;
  const props = {
    className,
    style,
    variants: variant,
    transition: revealTransition(reduceMotion, resolvedDuration),
    ...rest,
  };

  if (as === "li") return <motion.li {...props}>{children}</motion.li>;
  if (as === "article") return <motion.article {...props}>{children}</motion.article>;
  return <motion.div {...props}>{children}</motion.div>;
}

export function SectionHeader({ label, title }) {
  return (
    <>
      <Reveal as="p" className="section-label" direction="fade" duration={0.2}>
        {label}
      </Reveal>
      <Reveal
        as="h2"
        className="section-title"
        direction="editorial"
        delay={0.05}
        duration={0.28}
      >
        {title}
      </Reveal>
    </>
  );
}
