// ============================================
// TEMPLATE 1: Services.jsx (Card Grid Layout)
// ============================================

import { useState, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  fadeUp,
  buttonHover,
  defaultViewport,
  staggerContainer,
  staggerItem
} from "../animations/motionVariants";
import { useDevice } from "../hooks/useDevice";
import { useNavigate } from "react-router-dom";
import services from "../data/services.json";
import "./style/Services.css";

function Services() {
  const reduce = useReducedMotion();
  const sectionRef = useRef(null);
  const { isMobile } = useDevice();
  const navigate = useNavigate();

  const handleReadMore = (serviceId) => {
    // Use SPA navigation to service detail
    navigate(`/services/${serviceId}`);
  };

  return (
    <section id="services" ref={sectionRef} className="services">
      <div className="services__container">
        <motion.h2
          className="services__title"
          variants={reduce ? undefined : fadeUp}
          initial="hidden"
          whileInView={reduce ? undefined : "visible"}
          viewport={defaultViewport}
        >
          Our Services
        </motion.h2>

        <motion.div
          className="services__grid"
          variants={reduce ? undefined : fadeUp}
          initial={reduce ? undefined : { y: 30}}
          whileInView={reduce ? undefined : "visible"}
          viewport={defaultViewport}
        >
          {services.tabs.map((service) => (
            <motion.div
              key={service.id}
              className="services__card"
              variants={reduce ? undefined : staggerItem}
            >
              <div className="services__card-content">
                <h3 className="services__card-title">{service.title}</h3>
                <div className="services__card-underline"></div>
                <p className="services__card-description">
                  {service.description}
                </p>
                <motion.button
                  className="services__read-more-btn"
                  onClick={() => handleReadMore(service.id)}
                  variants={reduce ? undefined : buttonHover}
                  whileHover={reduce ? undefined : "hover"}
                  whileTap={reduce ? undefined : "tap"}
                >
                  READ MORE
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Services;
