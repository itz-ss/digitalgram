import { memo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./style/HeroClip.css";
import HeroVid from "../assets/HeroVid.mp4";
import Welcome from "./Welcome";

const VIDEO_SRC = HeroVid;

// const VIDEO_SRC =
//   "https://res.cloudinary.com/docq119tm/video/upload/v1765652933/231596_ji0pg8.mp4";

const HeroClip = ({ children }) => {
  const ref = useRef(null);

  // Track scroll position of this section
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Scale mapping:
  // bottom enter -> center -> top exit
  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 1],
    [0.8, 1.0, 1.0]
  );

  return (
    <motion.section
      ref={ref}
      className="video-hero"
      aria-label="Hero section"
      style={{ scale }}
    >
      {/* Background Video */}
      <video
        className="video-bg"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="video-overlay" aria-hidden="true" />

      {/* Slot for injected JSX */}
      <div className="video-content">
        <Welcome/>
      </div>
    </motion.section>
  );
};

export default memo(HeroClip);
