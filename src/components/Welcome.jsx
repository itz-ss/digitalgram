import React, { useState } from "react";
import RotatingParallaxText from "../parallax/RotatingParallaxText";
import ScrollParallax from "../parallax/ScrollParallax";
import TiltParallaxCard from "../parallax/TiltParallaxCard";
import FormModal from "./FormModal";
import "./style/Welcome.css";

const Welcome = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <section className="welcome-section" aria-label="Welcome">

      <div className="welcome-inner">
        <ScrollParallax speed={50}>
          <h1 className="welcome-headline">
           Transforming Ideas Into Digital Reality
          </h1>
        </ScrollParallax>

        <ScrollParallax speed={30}>
          <div className="welcome-subtext">
            We craft{" "}
            <RotatingParallaxText
              texts={[
                { text: "elegant", color: "#ff0000" },
                { text: "fast", color: "#55006e" },
                { text: "measurable", color: "#6d5200" }
              ]}
              speed={10}
              interval={3000}
            />{" "}
            digital experiences for ambitious people.
          </div>
        </ScrollParallax>

        <ScrollParallax speed={20}>
          <TiltParallaxCard>
            <a className="welcome-cta" href="/services" role="button">
              Our Work
            </a>
          </TiltParallaxCard>
        </ScrollParallax>

        <ScrollParallax speed={10}>
          <TiltParallaxCard>
            <button
              className="welcome-cta welcome-cta-secondary"
              onClick={() => setIsFormOpen(true)}
              role="button"
            >
              Get in Touch
            </button>
          </TiltParallaxCard>
        </ScrollParallax>
      </div>

      <FormModal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </section>
  );
};

export default Welcome;
