import { motion, useReducedMotion } from "framer-motion";
import { easeOut } from "../../lib/motion";
import HeroCommandBar from "./HeroCommandBar";
import "./Hero.css";

/** Reduced motion keeps the entrance legible but drops travel. */
const fadeOnly = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const fadeName = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const revealNameLine = {
  hidden: { opacity: 0, transform: "translateY(108%)" },
  visible: { opacity: 1, transform: "translateY(0%)" },
};

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const transition = reduceMotion
    ? { duration: 0.16, ease: easeOut }
    : { duration: 0.24, ease: easeOut };
  const blockVariants = fadeOnly;
  const lineVariants = reduceMotion ? fadeOnly : revealNameLine;

  return (
    <section className="hero" id="hero">
      <div className="container hero__inner">
        <div className="hero__content">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: reduceMotion ? 0.04 : 0.08,
                  delayChildren: reduceMotion ? 0 : 0.08,
                },
              },
            }}
          >
            <motion.p
              className="hero__kicker"
              variants={blockVariants}
              transition={transition}
            >
              Melbourne / Sydney
            </motion.p>

            <motion.h1 className="hero__name" variants={fadeName}>
              <span className="hero__name-line">
                <motion.span
                  className="hero__name-line-inner"
                  variants={lineVariants}
                  transition={transition}
                >
                  Yu Jin
                </motion.span>
              </span>
              <span className="hero__name-line">
                <motion.span
                  className="hero__name-line-inner"
                  variants={lineVariants}
                  transition={transition}
                >
                  Wong
                </motion.span>
              </span>
            </motion.h1>

            <motion.p
              className="hero__title"
              variants={blockVariants}
              transition={transition}
            >
              Software Engineer
              <span className="hero__title-rest"> Enterprise CRM · Application Architect · AI-augmented delivery</span>
            </motion.p>

            <motion.div
              className="hero__cmd-wrap"
              variants={blockVariants}
              transition={transition}
            >
              <HeroCommandBar />
            </motion.div>
          </motion.div>
        </div>

        <motion.a
          href="#profile"
          className="hero__scroll"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={
            reduceMotion
              ? { duration: 0.16, ease: easeOut }
              : { duration: 0.24, delay: 0.55, ease: easeOut }
          }
        >
          <span className="hero__scroll-mark" aria-hidden="true">
            ↓
          </span>
          profile.json
        </motion.a>
      </div>
    </section>
  );
}
