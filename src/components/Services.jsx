import { useState, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  fadeUp,
  staggerContainer,
  staggerItem,
  tabContentVariants,
  buttonHover,
  defaultViewport
} from "../animations/motionVariants";
import { useDevice } from "../hooks/useDevice";
import services from "../data/services.json";
import "./style/Services.css";

function Services() {
  const [activeTab, setActiveTab] = useState(services.tabs[0].id);
  const reduce = useReducedMotion();
  const sectionRef = useRef(null);
  const { isMobile, isTablet } = useDevice();

  const activeContent = services.tabs.find(
    (tab) => tab.id === activeTab
  );

  const tabsMode = isMobile || isTablet ? "dropdown" : "tabs";

  return (
    <section id="services" ref={sectionRef} className="services">
      <motion.h2
        className="services__title"
        variants={reduce ? undefined : fadeUp}
        initial="hidden"
        whileInView={reduce ? undefined : "visible"}
        viewport={defaultViewport}
      >
        Services
      </motion.h2>

      {/* Tabs */}
      <motion.div key={tabsMode}>
  {tabsMode === "dropdown" ? (
    <motion.div
      className="services__dropdown-container"
      variants={reduce ? undefined : fadeUp}
      initial="hidden"
      animate="visible"
      viewport={defaultViewport}
    >
      <select
        className="services__dropdown"
        value={activeTab}
        onChange={(e) => setActiveTab(e.target.value)}
        aria-label="Select service"
      >
        {services.tabs.map((tab) => (
          <option key={tab.id} value={tab.id}>
            {tab.label}
          </option>
        ))}
      </select>
    </motion.div>
  ) : (
    <motion.div
      className="services__tabs"
      variants={reduce ? undefined : staggerContainer}
      initial="hidden"
      animate="visible"
      viewport={defaultViewport}
    >
      {services.tabs.map((tab) => (
        <motion.button
          key={tab.id}
          className={`services__tab ${
            activeTab === tab.id ? "active" : ""
          }`}
          onClick={() => setActiveTab(tab.id)}
          variants={reduce ? undefined : staggerItem}
          whileHover={reduce ? undefined : buttonHover.hover}
          whileTap={reduce ? undefined : buttonHover.tap}
          aria-selected={activeTab === tab.id}
        >
          {tab.label}
        </motion.button>
      ))}
    </motion.div>
  )}
</motion.div>
      {/* Content */}
      <div className="services__content" id={`tab-content-${activeTab}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={reduce ? undefined : tabContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h3>{activeContent.title}</h3>
            <p>{activeContent.description}</p>
            <motion.ul
              variants={reduce ? undefined : staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {activeContent.items.map((item, index) => (
                <motion.li
                  key={`${activeTab}-${index}`}
                  variants={reduce ? undefined : staggerItem}
                  className="services__item"
                >
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
         
        </AnimatePresence>
      </div>
    </section>
  );
}

export default Services;
