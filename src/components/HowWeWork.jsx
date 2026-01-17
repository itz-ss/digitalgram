import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, defaultViewport } from "../animations/motionVariants";
import howWeWorkData from "../data/howWeWork.json";
import "./style/HowWeWork.css";

const HowWeWork = () => {
  const reduce = useReducedMotion();
  const sectionRef = useRef(null);

  return (
    <section ref={sectionRef} className="how-section">
      <div className="background-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
      </div>

      <div className="how-container">
        <motion.h2
          className="how-title"
          variants={reduce ? undefined : fadeUp}
          initial="hidden"
          whileInView={reduce ? undefined : "visible"}
          viewport={defaultViewport}
        >
          {howWeWorkData.title}
        </motion.h2>

        <div className="timeline-wrapper">
          {howWeWorkData.steps.map((step, index) => (
            <TimelineStep
              key={step.id}
              step={step}
              index={index}
              isLast={index === howWeWorkData.steps.length - 1}
              alignment={step.alignment}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const TimelineStep = ({ step, index, isLast, alignment }) => {
  return (
    <motion.div
      // className={`timeline-step ${alignment === 'left' ? 'timeline-step-left' : 'timeline-step-right'}`}
     className="timeline-step"
      initial={{ y: 60, scale: 0.9 }}
      whileInView={{ y: 0, scale: 1 }}
      viewport={defaultViewport}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
        scale: { duration: 1.1, ease: [0.25, 0.1, 0.25, 1] }
      }}
    >
      <div className="step-layout">
        {/* Step Badge */}
        <div className="step-badge-container">
          <motion.div
            className="step-badge"
            whileHover={{
              scale: 1.15,
              rotate: 360,
            }}
            transition={{ duration: 0.4 }}
          >
            <span className="badge-number">
              {String(index + 1).padStart(2, "0")}
            </span>
          </motion.div>

          {!isLast && <div className="connecting-line" />}
        </div>

        {/* Card */}
        <motion.div
          className="step-card"
          whileHover={{ y: -8 }}
          transition={{ duration: 0.3 }}
        >
          <div className="card-inner">
            <div className="gradient-overlay"></div>

            <div className="card-content">
              <span className="step-label">Step {index + 1}</span>

              <h3 className="step-title">{step.title}</h3>

              <p className="step-description">{step.description}</p>

              <motion.div
                className="step-image-wrapper"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="image-overlay"></div>
                <img
                  src={step.image}
                  alt={step.title}
                  className="step-image"
                  loading="lazy"
                />

                
              </motion.div>
            </div>

            <div className="corner-accent"></div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HowWeWork;
