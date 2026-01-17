import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  fadeUp,
  staggerContainer,
  staggerItem,
  defaultViewport
} from "../animations/motionVariants";
import aboutUs from "../data/aboutUs.json";
import TiltedCard from "./Background/TiltedCard";
import "./style/AboutUs.css";

function AboutUs() {
  const navigate = useNavigate();
  const reduce = useReducedMotion();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleClose = () => {
    navigate(-1);
  };

  // Safety check for aboutUs data
  if (!aboutUs) {
    return (
      <div className="about-us">
        <div className="about-us__wrapper">
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }

  const paragraphs =
    aboutUs.about && aboutUs.about.overview
      ? aboutUs.about.overview.split("\n\n").filter(Boolean)
      : [];

  return (
    <motion.section
      className="about-us"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* Top Floating Back / Close */}
      <button
        className="about-us__close-btn"
        onClick={handleClose}
        aria-label="Go back"
        title="Go back"
      >
        ✕
      </button>

      <div className="about-us__wrapper">
        {/* HERO */}
        <div className="about-us__hero">
          {/* LEFT */}
          <div className="about-us__hero-left">
            <motion.p
              className="about-us__eyebrow"
              variants={reduce ? undefined : fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
            >
              About Digitalgram
            </motion.p>

            <motion.h1
              className="about-us__title"
              variants={reduce ? undefined : fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
            >
              {aboutUs.company || "Digitalgram"}
            </motion.h1>

            <motion.p
              className="about-us__desc"
              variants={reduce ? undefined : fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
            >
              {aboutUs.tagline || "Digital growth agency"}
            </motion.p>

            <motion.div
              className="about-us__hero-actions"
              variants={reduce ? undefined : fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
            >
              <button className="about-us__primary" onClick={handleClose}>
                Back to Home
              </button>
            </motion.div>
          </div>

          {/* RIGHT */}
          <motion.div
            className="about-us__hero-right"
            variants={reduce ? undefined : fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
          >
            {/* <div className="about-us__image-card"> */}
              {/* <div className="about-us__image-fallback"> */}
              <div className="about-us-img">
                 <TiltedCard
                imageSrc="/assets/about.png"
                altText="DigitalGram"
                captionText="DigitalGram"
                containerHeight="300px"
                containerWidth="400px"
                imageHeight="300px"
                imageWidth="500px"
                rotateAmplitude={12}
                // scaleOnHover={1.2}
                showMobileWarning={false}
                showTooltip={true}
                displayOverlayContent={true}
                overlayContent={
                    <p className="">
                    DigitalGram
                    </p>
                }
                />
                </div>
              {/* </div> */}
            {/* </div> */}
          </motion.div>
        </div>

        {/* CONTENT */}
        <div className="about-us__content" id="about-us-content">
          {/* Detailed Description */}
          {paragraphs.length > 0 && (
            <motion.div
              className="about-us__copy"
              variants={reduce ? undefined : staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
            >
              {paragraphs.map((p, index) => (
                <motion.p
                  key={`p-${index}`}
                  variants={reduce ? undefined : staggerItem}
                  className="about-us__paragraph"
                >
                  {p}
                </motion.p>
              ))}
            </motion.div>
          )}

          {/* What We Do */}
          <motion.div
            className="about-us__section"
            variants={reduce ? undefined : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
          >
            <motion.div variants={reduce ? undefined : fadeUp}>
              <h2 className="about-us__section-title">What We Do</h2>
              <p className="about-us__section-subtitle">
                Strategic digital solutions that drive measurable growth and lasting impact.
              </p>
            </motion.div>

            <motion.ul className="about-us__offer-grid">
              {aboutUs.whatWeDo && aboutUs.whatWeDo.map((item, index) => (
                <motion.li
                  key={`what-we-do-${index}`}
                  variants={reduce ? undefined : staggerItem}
                  className="about-us__offer-item"
                >
                  <span className="about-us__check">✓</span>
                  <span className="about-us__offer-text">{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Core Expertise */}
          <motion.div
            className="about-us__section"
            variants={reduce ? undefined : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
          >
            <motion.div variants={reduce ? undefined : fadeUp}>
              <h2 className="about-us__section-title">Core Expertise</h2>
              <p className="about-us__section-subtitle">
                Specialized skills and proven methodologies that set us apart.
              </p>
            </motion.div>

            <motion.ul className="about-us__offer-grid">
              {aboutUs.coreExpertise && aboutUs.coreExpertise.map((item, index) => (
                <motion.li
                  key={`expertise-${index}`}
                  variants={reduce ? undefined : staggerItem}
                  className="about-us__offer-item"
                >
                  <span className="about-us__check">✓</span>
                  <span className="about-us__offer-text">{item.title}</span>
                  <p className="about-us__offer-desc">{item.description}</p>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Our Approach */}
          <motion.div
            className="about-us__section"
            variants={reduce ? undefined : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
          >
            <motion.div variants={reduce ? undefined : fadeUp}>
              <h2 className="about-us__section-title">Our Approach</h2>
              <p className="about-us__section-subtitle">
                A systematic methodology that ensures consistent results and sustainable growth.
              </p>
            </motion.div>

            <motion.ul className="about-us__offer-grid">
              {aboutUs.approach && aboutUs.approach.steps && aboutUs.approach.steps.map((item, index) => (
                <motion.li
                  key={`approach-${index}`}
                  variants={reduce ? undefined : staggerItem}
                  className="about-us__offer-item"
                >
                  <span className="about-us__check">✓</span>
                  <span className="about-us__offer-text">{item.title}</span>
                  <p className="about-us__offer-desc">{item.description}</p>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Who We Work With */}
          <motion.div
            className="about-us__section"
            variants={reduce ? undefined : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
          >
            <motion.div variants={reduce ? undefined : fadeUp}>
              <h2 className="about-us__section-title">Who We Work With</h2>
              <p className="about-us__section-subtitle">
                Partnering with ambitious businesses ready to dominate their digital landscape.
              </p>
            </motion.div>

            <motion.ul className="about-us__offer-grid">
              {aboutUs.whoWeWorkWith && aboutUs.whoWeWorkWith.map((item, index) => (
                <motion.li
                  key={`who-we-work-${index}`}
                  variants={reduce ? undefined : staggerItem}
                  className="about-us__offer-item"
                >
                  <span className="about-us__check">✓</span>
                  <span className="about-us__offer-text">{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Philosophy */}
          <motion.div
            className="about-us__philosophy"
            variants={reduce ? undefined : fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
          >
            <blockquote className="about-us__quote">
              "{aboutUs.philosophy && aboutUs.philosophy.quote}"
            </blockquote>
            <p className="about-us__quote-summary">
              {aboutUs.philosophy && aboutUs.philosophy.summary}
            </p>
          </motion.div>

          {/* Bottom back */}
          <motion.div
            className="about-us__bottom"
            variants={reduce ? undefined : fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
          >
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

export default AboutUs;