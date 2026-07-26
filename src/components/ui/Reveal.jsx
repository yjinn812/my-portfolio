import { motion, useReducedMotion } from "framer-motion";
import { easeOut } from "../../lib/motion";

const presets = {
  up: {
    hidden: { opacity: 0, transform: "translateY(28px)" },
    visible: { opacity: 1, transform: "translateY(0px)" },
  },
  down: {
    hidden: { opacity: 0, transform: "translateY(-16px)" },
    visible: { opacity: 1, transform: "translateY(0px)" },
  },
  left: {
    hidden: { opacity: 0, transform: "translateX(-28px)" },
    visible: { opacity: 1, transform: "translateX(0px)" },
  },
  right: {
    hidden: { opacity: 0, transform: "translateX(28px)" },
    visible: { opacity: 1, transform: "translateX(0px)" },
  },
  fade: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  scale: {
    hidden: { opacity: 0, transform: "scale(0.96)" },
    visible: { opacity: 1, transform: "scale(1)" },
  },
};

export function Reveal({
  children,
  as = "div",
  direction = "up",
  delay = 0,
  duration = 0.4,
  className,
  once = true,
  amount = 0.2,
  style,
  ...rest
}) {
  const reduceMotion = useReducedMotion();
  const Component = motion.create(as);
  const variant = presets[direction] ?? presets.up;

  if (reduceMotion) {
    const Static = as;
    return (
      <Static className={className} style={style} {...rest}>
        {children}
      </Static>
    );
  }

  return (
    <Component
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variant}
      transition={{ duration, delay, ease: easeOut }}
      {...rest}
    >
      {children}
    </Component>
  );
}

export function RevealGroup({
  children,
  as = "div",
  className,
  stagger = 0.08,
  delay = 0,
  once = true,
  amount = 0.15,
  style,
  ...rest
}) {
  const reduceMotion = useReducedMotion();
  const Component = motion.create(as);

  if (reduceMotion) {
    const Static = as;
    return (
      <Static className={className} style={style} {...rest}>
        {children}
      </Static>
    );
  }

  return (
    <Component
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
      {...rest}
    >
      {children}
    </Component>
  );
}

export function RevealItem({
  children,
  as = "div",
  direction = "up",
  className,
  duration = 0.4,
  style,
  ...rest
}) {
  const reduceMotion = useReducedMotion();
  const Component = motion.create(as);
  const variant = presets[direction] ?? presets.up;

  if (reduceMotion) {
    const Static = as;
    return (
      <Static className={className} style={style} {...rest}>
        {children}
      </Static>
    );
  }

  return (
    <Component
      className={className}
      style={style}
      variants={variant}
      transition={{ duration, ease: easeOut }}
      {...rest}
    >
      {children}
    </Component>
  );
}

export function SectionHeader({ label, title }) {
  return (
    <>
      <Reveal as="p" className="section-label" direction="fade" duration={0.28}>
        {label}
      </Reveal>
      <Reveal as="h2" className="section-title" direction="fade" delay={0.04} duration={0.32}>
        {title}
      </Reveal>
    </>
  );
}
