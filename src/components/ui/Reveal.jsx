import { motion, useReducedMotion } from "framer-motion";
import { easeOut } from "../../lib/motion";

const presets = {
  up: {
    hidden: { opacity: 0, transform: "translateY(20px)" },
    visible: { opacity: 1, transform: "translateY(0px)" },
  },
  down: {
    hidden: { opacity: 0, transform: "translateY(-12px)" },
    visible: { opacity: 1, transform: "translateY(0px)" },
  },
  left: {
    hidden: { opacity: 0, transform: "translateX(-20px)" },
    visible: { opacity: 1, transform: "translateX(0px)" },
  },
  right: {
    hidden: { opacity: 0, transform: "translateX(20px)" },
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

const reducedPresets = {
  up: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  down: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  left: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  right: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  fade: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  scale: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
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
  duration = 0.28,
  className,
  once = true,
  amount = 0.2,
  style,
  ...rest
}) {
  const { reduceMotion, variant } = useRevealMotion(direction);
  const props = revealViewProps({
    className,
    style,
    variant,
    reduceMotion,
    duration,
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
  direction = "up",
  className,
  duration = 0.28,
  style,
  ...rest
}) {
  const { reduceMotion, variant } = useRevealMotion(direction);
  const props = {
    className,
    style,
    variants: variant,
    transition: revealTransition(reduceMotion, duration),
    ...rest,
  };

  if (as === "li") return <motion.li {...props}>{children}</motion.li>;
  if (as === "article") return <motion.article {...props}>{children}</motion.article>;
  return <motion.div {...props}>{children}</motion.div>;
}

export function SectionHeader({ label, title }) {
  return (
    <>
      <Reveal as="p" className="section-label" direction="fade" duration={0.22}>
        {label}
      </Reveal>
      <Reveal as="h2" className="section-title" direction="fade" delay={0.04} duration={0.26}>
        {title}
      </Reveal>
    </>
  );
}
