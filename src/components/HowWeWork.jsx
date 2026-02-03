import { useRef } from "react";
import { motion } from "framer-motion";
import ScrollParallax from "../parallax/ScrollParallax";
import ControlledDiceParallax from "../parallax/ControlledDiceParallax";
import howWeWorkData from "../data/howWeWork.json";
import "./style/HowWeWork.css";

const HowWeWork = () => {
  const sectionRef = useRef(null);

  return (
    <section id="how" ref={sectionRef} className="how-section">
      <div className="background-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
      </div>

      <div className="how-container">
        <ScrollParallax speed={40}>
          <h2 className="how-title">{howWeWorkData.title}</h2>
        </ScrollParallax>
         <ScrollParallax speed={40}>
          <h3 className="how-subheading">{howWeWorkData.subheading}</h3>
        </ScrollParallax>
        <ScrollParallax speed={40}>
          <p className="how-description">{howWeWorkData.description}</p>
        </ScrollParallax>

        <div className="timeline-wrapper">
          {howWeWorkData.steps.map((step, index) => (
            <TimelineStep
              key={step.id}
              step={step}
              index={index}
              isLast={index === howWeWorkData.steps.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const TimelineStep = ({ step, index, isLast }) => {
  return (
    <section>
    <ScrollParallax speed={index * 10 + 20}>
      <ControlledDiceParallax
        className="dice-step"
        rotate={-16}            // controlled rotate
        yFrom={30}
        scaleFrom={0.985}
        offset={["start 92%", "start 48%"]} // scroll controlled timing
      >
        <div className="timeline-step">
          <div className="step-layout">
            {/* Step Badge */}
            <div className="step-badge-container">
              <motion.div
                className="step-badge"
                whileHover={{ scale: 1.15, rotate: 360 }}
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
                <div className="gradient-overlay" />

                <div className="card-content">
                  <span className="step-label">Step {index + 1}</span>
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-description">{step.description}</p>

                  <motion.div
                    className="step-image-wrapper"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="image-overlay" />
                    <img
                      src={step.image}
                      alt={step.title}
                      className="step-image"
                      loading="lazy"
                    />
                  </motion.div>
                </div>

                <div className="corner-accent" />
              </div>
            </motion.div>
          </div>
        </div>
      </ControlledDiceParallax>
    </ScrollParallax>
    </section>
  );
};

export default HowWeWork;
