import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, slideInLeft, buttonHover, defaultViewport} from "../animations/motionVariants";
import RotatingText from "../hooks/RotatingText";
import FormModal from "./FormModal";
import "./style/Welcome.css";

const Welcome = () => {
  const reduce = useReducedMotion();
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <section className="welcome-section" aria-label="Welcome">

      <div className="welcome-inner">
        <motion.h1
          className="welcome-headline"
          variants={reduce ? undefined : fadeUp}
          initial="hidden"
          whileInView={reduce ? undefined : "visible"}
          viewport={defaultViewport}
          transition={{ delay: 0.1}}
        >
         Transforming Ideas Into Digital Reality
        </motion.h1>

        <motion.p
          className="welcome-subtext"
          variants={reduce ? undefined : fadeUp}
          initial="hidden"
          whileInView={reduce ? undefined : "visible"}
          viewport={defaultViewport}
          transition={{ delay: 0.3 }}
        >
          We craft{" "}
          <RotatingText 
          className="rotateText"
            words={[
              { text: "elegant", color: "#ff0000" },
              { text: "fast", color: "#55006e" },
              { text: "measurable", color: "#6d5200" }
            ]}
            interval={3000}
            direction="up"
          />{" "}
          digital experiences for ambitious people.
        </motion.p>

        <motion.a
          className="welcome-cta"
          href="/services"
          role="button"
          variants={reduce ? undefined : fadeUp}
          initial={reduce ? undefined : "hidden"}
          whileInView={reduce ? undefined : "visible"}
          viewport={defaultViewport}
          transition={{ delay: 0.5 }}
          whileHover={reduce ? undefined : buttonHover.hover}
          whileTap={reduce ? undefined : buttonHover.tap}
        >
          Our Work
        </motion.a>

        <motion.button
          className="welcome-cta welcome-cta-secondary"
          onClick={() => setIsFormOpen(true)}
          role="button"
          variants={reduce ? undefined : fadeUp}
          initial={reduce ? undefined : "hidden"}
          whileInView={reduce ? undefined : "visible"}
          viewport={defaultViewport}
          transition={{ delay: 0.7 }}
          whileHover={reduce ? undefined : buttonHover.hover}
          whileTap={reduce ? undefined : buttonHover.tap}
        >
          Get in Touch
        </motion.button>
      </div>

      <FormModal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </section>
  );
};

export default Welcome;
