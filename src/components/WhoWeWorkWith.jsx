import { useRef } from "react";
import { motion } from "framer-motion";
import ScrollParallax from "../parallax/ScrollParallax";
import TiltParallaxCard from "../parallax/TiltParallaxCard";
import industriesData from "../data/WhoWeWorkWith.json";
import "./style/WhoWeWorkWith.css";

export default function WhoWeWorkWith() {
  const sectionRef = useRef(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      id="who-we-work-with"
      ref={sectionRef}
      className="who-we-work-with-section"
      aria-label="Who We Work With"
    >
      <div className="who-we-work-with-container">
        <ScrollParallax speed={40}>
          <motion.div
            className="who-we-work-with-header"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="who-we-work-with-title">
              {industriesData.sectionTitle}
            </h2>
            <p className="who-we-work-with-subtitle">
              {industriesData.sectionSubtitle}
            </p>
            <p className="who-we-work-with-description">
              {industriesData.description}
            </p>
          </motion.div>
        </ScrollParallax>

        <ScrollParallax speed={30}>
          <motion.div
            className="who-we-work-with-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {industriesData.industries.map((item, index) => (
              <motion.div key={item.id} variants={itemVariants}>
                <TiltParallaxCard>
                  <motion.div
                    className="who-we-work-with-card"
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="card-content">
                      <motion.div
                        className="who-we-work-with-icon"
                        whileHover={{ scale: 1.15, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        {item.icon}
                      </motion.div>
                      <h4 className="who-we-work-with-card-title">
                        {item.title}
                      </h4>
                      <div className="card-underline"></div>
                      <p className="who-we-work-with-card-description">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                </TiltParallaxCard>
              </motion.div>
            ))}
          </motion.div>
        </ScrollParallax>
      </div>
    </section>
  );
}