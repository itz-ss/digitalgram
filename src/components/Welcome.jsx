import React, { useState } from "react";
import RotatingParallaxText from "../parallax/RotatingParallaxText";
import ScrollParallax from "../parallax/ScrollParallax";
import TiltParallaxCard from "../parallax/TiltParallaxCard";
import FormModal from "./FormModal";
import "./style/Welcome.css";
import { Link } from "react-router-dom";

const Welcome = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <section className="welcome-section" aria-label="Welcome">

      <div className="welcome-inner">
        <ScrollParallax speed={50}>
          <h1 className="welcome-headline">
           We create scroll-stopping content and marketing campaigns that convert audience into customers.
          </h1>
        </ScrollParallax>

        <ScrollParallax speed={30}>
          <div className="welcome-subtext">
            {/* We craft{" "}
            <RotatingParallaxText
              texts={[
                { text: "elegant", color: "#ff0000" },
                { text: "fast", color: "#55006e" },
                { text: "measurable", color: "#6d5200" }
              ]}
              speed={10}
              interval={3000}
            />{" "}
            digital experiences for ambitious people. */}

            We’re a content creation & marketing agency helping brands stand out online with creative content, smart strategy, and marketing that converts attention into results.
          </div>
        </ScrollParallax>

        <ScrollParallax speed={20}>
          <div className="welcome-cta-group">
            <TiltParallaxCard>
              <Link className="welcome-cta" to="/services">
                See Our Work
              </Link>
            </TiltParallaxCard>

            <TiltParallaxCard>
              <button
                className="welcome-cta welcome-cta-secondary"
                onClick={() => setIsFormOpen(true)}
                role="button"
              >
                Get a Free Strategy Call
              </button>
            </TiltParallaxCard>
          </div>
        </ScrollParallax>
      </div>

      <FormModal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </section>
  );
};

export default Welcome;
