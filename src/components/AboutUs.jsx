import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ScrollParallax from "../parallax/ScrollParallax";
import aboutUs from "../data/aboutUs.json";
import TiltedCard from "./Background/TiltedCard";
import "./style/AboutUs.css";

function AboutUs() {
  const navigate = useNavigate();

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

  const paragraphs = aboutUs.about?.overview?.split("\n\n").filter(Boolean) || [];

  return (
    <section className="about-us">
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
            <ScrollParallax speed={20}>
              <p className="about-us__eyebrow">About Digitalgram</p>
            </ScrollParallax>

            <ScrollParallax speed={25}>
              <h1 className="about-us__title">
                {aboutUs.company || "Digitalgram"}
              </h1>
            </ScrollParallax>

            <ScrollParallax speed={18}>
              <p className="about-us__desc">
                {aboutUs.tagline || "Digital growth agency"}
              </p>
            </ScrollParallax>

            <ScrollParallax speed={30}>
              <div className="about-us__hero-actions">
                <button className="about-us__primary" onClick={handleClose}>
                  Back to Home
                </button>
              </div>
            </ScrollParallax>
          </div>

          {/* RIGHT */}
          <ScrollParallax speed={35}>
            <div className="about-us__hero-right">
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
                  showMobileWarning={false}
                  showTooltip={true}
                  displayOverlayContent={true}
                  overlayContent={<p>DigitalGram</p>}
                />
              </div>
            </div>
          </ScrollParallax>
        </div>

        {/* CONTENT */}
        <div className="about-us__content" id="about-us-content">
          {/* Detailed Description */}
          {paragraphs.length > 0 && (
            <div className="about-us__copy">
              {paragraphs.map((p, index) => (
                <p key={`p-${index}`} className="about-us__paragraph">
                  {p}
                </p>
              ))}
            </div>
          )}

          {/* What We Do */}
          <div className="about-us__section">
            <div>
              <h2 className="about-us__section-title">What We Do</h2>
              <p className="about-us__section-subtitle">
                Strategic digital solutions that drive measurable growth and lasting impact.
              </p>
            </div>

            <ul className="about-us__offer-grid">
              {aboutUs.whatWeDo?.map((item, index) => (
                <li key={`what-we-do-${index}`} className="about-us__offer-item">
                  <span className="about-us__check">✓</span>
                  <span className="about-us__offer-text">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Core Expertise */}
          <div className="about-us__section">
            <div>
              <h2 className="about-us__section-title">Core Expertise</h2>
              <p className="about-us__section-subtitle">
                Specialized skills and proven methodologies that set us apart.
              </p>
            </div>

            <ul className="about-us__offer-grid">
              {aboutUs.coreExpertise?.map((item, index) => (
                <li key={`expertise-${index}`} className="about-us__offer-item">
                  <span className="about-us__check">✓</span>
                  <span className="about-us__offer-text">{item.title}</span>
                  <p className="about-us__offer-desc">{item.description}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Approach */}
          <div className="about-us__section">
            <div>
              <h2 className="about-us__section-title">Our Approach</h2>
              <p className="about-us__section-subtitle">
                A systematic methodology that ensures consistent results and sustainable growth.
              </p>
            </div>

            <ul className="about-us__offer-grid">
              {aboutUs.approach?.steps?.map((item, index) => (
                <li key={`approach-${index}`} className="about-us__offer-item">
                  <span className="about-us__check">✓</span>
                  <span className="about-us__offer-text">{item.title}</span>
                  <p className="about-us__offer-desc">{item.description}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Who We Work With */}
          <div className="about-us__section">
            <div>
              <h2 className="about-us__section-title">Who We Work With</h2>
              <p className="about-us__section-subtitle">
                Partnering with ambitious businesses ready to dominate their digital landscape.
              </p>
            </div>

            <ul className="about-us__offer-grid">
              {aboutUs.whoWeWorkWith?.map((item, index) => (
                <li key={`who-we-work-${index}`} className="about-us__offer-item">
                  <span className="about-us__check">✓</span>
                  <span className="about-us__offer-text">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Philosophy */}
          <div className="about-us__philosophy">
            <blockquote className="about-us__quote">
              "{aboutUs.philosophy?.quote || ""}"
            </blockquote>
            <p className="about-us__quote-summary">
              {aboutUs.philosophy?.summary || ""}
            </p>
          </div>

          {/* Bottom spacer */}
          <div className="about-us__bottom" />
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
