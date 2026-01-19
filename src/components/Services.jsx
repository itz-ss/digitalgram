// ============================================
// TEMPLATE 1: Services.jsx (Card Grid Layout)
// ============================================

import { useState, useRef } from "react";
import ScrollParallax from "../parallax/ScrollParallax";
import TiltParallaxCard from "../parallax/TiltParallaxCard";
import { useDevice } from "../hooks/useDevice";
import { useNavigate } from "react-router-dom";
import services from "../data/services.json";
import "./style/Services.css";

function Services() {
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
        <ScrollParallax speed={40}>
          <h2 className="services__title">
            Our Services
          </h2>
        </ScrollParallax>

        <ScrollParallax speed={30}>
          <div className="services__grid">
          {services.tabs.map((service) => (
            <TiltParallaxCard key={service.id} className="services__card">
              <div className="services__card-content">
                <h3 className="services__card-title">{service.title}</h3>
                <div className="services__card-underline"></div>
                <p className="services__card-description">
                  {service.description}
                </p>
                <TiltParallaxCard>
                  <button
                    className="services__read-more-btn"
                    onClick={() => handleReadMore(service.id)}
                  >
                    READ MORE
                  </button>
                </TiltParallaxCard>
              </div>
            </TiltParallaxCard>
          ))}
        </div>
      </ScrollParallax>
      </div>
    </section>
  );
}

export default Services;
