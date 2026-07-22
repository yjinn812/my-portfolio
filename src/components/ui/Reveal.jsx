import { motion, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

const presets = {
  up: { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } },
  down: { hidden: { opacity: 0, y: -16 }, visible: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -28 }, visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 28 }, visible: { opacity: 1, x: 0 } },
  fade: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  scale: { hidden: { opacity: 0, scale: 0.96 }, visible: { opacity: 1, scale: 1 } },
};

export function Reveal({
  children,
  as = "div",
  direction = "up",
  delay = 0,
  duration = 0.55,
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
      transition={{ duration, delay, ease }}
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
  duration = 0.5,
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
      transition={{ duration, ease }}
      {...rest}
    >
      {children}
    </Component>
  );
}

export function SectionHeader({ label, title }) {
  return (
    <>
      <Reveal as="p" className="section-label" direction="fade" duration={0.45}>
        {label}
      </Reveal>
      <Reveal as="h2" className="section-title" delay={0.06} duration={0.55}>
        {title}
      </Reveal>
    </>
  );
}
