import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, fadeIn, buttonHover, defaultViewport } from "../animations/motionVariants";
import RotatingText from "../hooks/RotatingText";
import "./style/Welcome.css";

const Welcome = () => {
  const reduce = useReducedMotion();

  return (
    <section className="welcome-section" aria-label="Welcome">

      <div className="welcome-inner">
        <motion.h1
          className="welcome-headline"
          variants={reduce ? undefined : fadeUp}
          initial="hidden"
          whileInView={reduce ? undefined : "visible"}
          viewport={defaultViewport}
        >
          Premium digital products that scale
        </motion.h1>

        <motion.p
          className="welcome-subtext"
          variants={reduce ? undefined : fadeIn}
          initial="hidden"
          whileInView={reduce ? undefined : "visible"}
          viewport={defaultViewport}
          transition={{ delay: 0.15 }}
        >
          We craft{" "}
          <RotatingText
            words={[
              { text: "elegant", color: "#7C7CFF" },
              { text: "fast", color: "#00C896" },
              { text: "measurable", color: "#F5B700" }
            ]}
            interval={3000}
            direction="up"
          />{" "}
          digital experiences for ambitious people.
        </motion.p>

        <motion.a
          className="welcome-cta"
          href="#services"
          role="button"
          variants={reduce ? undefined : fadeUp}
          initial={reduce ? undefined : "hidden"}
          whileInView={reduce ? undefined : "visible"}
          viewport={defaultViewport}
          transition={{ delay: 0.25 }}
          whileHover={reduce ? undefined : buttonHover.hover}
          whileTap={reduce ? undefined : buttonHover.tap}
        >
          Our Work
        </motion.a>
      </div>
    </section>
  );
};

export default Welcome;
