import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";

/**
 * ControlledDiceParallax
 * Scroll-driven 3D rotate-forward effect (dice feel) but subtle + controlled.
 *
 * Props:
 * - children
 * - rotate: degrees to rotate forward (default -18)
 * - y: translateY range (default 26 -> 0)
 * - scale: zoom range (default 0.98 -> 1)
 * - offset: scroll offsets
 */
export default function ControlledDiceParallax({
  children,
  className = "",
  rotate = -18,
  yFrom = 28,
  yTo = 0,
  scaleFrom = 0.28,
  scaleTo = 1,
  offset = ["start 90%", "start 45%"],
}) {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });

  const p = useSpring(scrollYProgress, {
    stiffness: 170,
    damping: 14,
    mass: 0.35,
  });

  // Subtle "dice rotate forward" feel
  const rotateX = useTransform(p, [0, 1], [reduce ? 0 : rotate, 0]);
  const translateY = useTransform(p, [0, 1], [reduce ? 0 : yFrom, yTo]);
  const scale = useTransform(p, [0, 1], [reduce ? 1 : scaleFrom, scaleTo]);
  const opacity = useTransform(p, [0, 1], [1, 1]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        perspective: "500px",
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        style={{
          opacity,
          y: translateY,
          scale,
          rotateX,
          transformOrigin: "center top",
          transformStyle: "preserve-3d",
          willChange: "transform, opacity",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
