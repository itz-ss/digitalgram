import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTimelineStep, useTimelineLine } from "../animations/timelineAnimations";
import { fadeUp, staggerItem, defaultViewport } from "../animations/motionVariants";
import howWeWorkData from "../data/howWeWork.json";
import "./style/HowWeWork.css";

/* =========================
   HOW WE WORK
========================= */

const HowWeWork = () => {
  const reduce = useReducedMotion();
  const sectionRef = useRef(null);
  const totalSteps = howWeWorkData.steps.length;

  return (
    <section id="how" ref={sectionRef} className="how-section">
      <motion.h2
        className="how-title"
        variants={reduce ? undefined : fadeUp}
        initial="hidden"
        whileInView={reduce ? undefined : "visible"}
        viewport={defaultViewport}
      >
        {howWeWorkData.title}
      </motion.h2>

      <div className="how-timeline">
        {howWeWorkData.steps.map((step, index) => (
          <TimelineStep
            key={step.id}
            step={step}
            index={index}
            totalSteps={totalSteps}
            reduce={reduce}
            sectionRef={sectionRef}
            isLast={index === totalSteps - 1}
          />
        ))}
      </div>
    </section>
  );
};

export default HowWeWork;

/* =========================
   TIMELINE STEP
========================= */

const TimelineStep = ({
  step,
  index,
  totalSteps,
  reduce,
  sectionRef,
  isLast
}) => {
  const { opacity, y, scale } = useTimelineStep(
    sectionRef,
    index,
    totalSteps,
    { reduceMotion: reduce }
  );

  const { scaleY } = useTimelineLine(
    sectionRef,
    index,
    totalSteps,
    { reduceMotion: reduce }
  );

  return (
    <div className="how-step">
      {/* Timeline Line */}
      {!isLast && (
        <motion.div
          className="timeline-line"
          style={{ scaleY, transformOrigin: "top" }}
        />
      )}

      {/* Step Badge */}
      <motion.div
        className="step-badge"
        style={{ opacity, y, scale }}
        whileHover={
          reduce ? undefined : { scale: 1.1, transition: { duration: 0.2 } }
        }
      >
        <span className="step-number">
          {String(index + 1).padStart(2, "0")}
        </span>
      </motion.div>

      {/* Content */}
      <motion.div
        className="step-content"
        style={{ opacity, y, scale }}
        variants={reduce ? undefined : staggerItem}
        initial="hidden"
        whileInView={reduce ? undefined : "visible"}
        viewport={defaultViewport}
        whileHover={
          reduce ? undefined : { y: -4, transition: { duration: 0.2 } }
        }
      >
        <div className="step-content-inner">
          <span className="step-label">Step {index + 1}</span>
          <h3>{step.title}</h3>
          <p>{step.description}</p>
        </div>

        <motion.div
          className="step-image"
          whileHover={
            reduce ? undefined : { scale: 1.05, transition: { duration: 0.3 } }
          }
        >
          <img
            src={step.image}
            alt={step.title}
            loading="lazy"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};
