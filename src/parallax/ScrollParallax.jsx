import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";


/**
 * Usage:
 * <ScrollParallax speed={120}>
 *   <img ... />
 * </ScrollParallax>
 *
 * speed: number (px range). Higher = more movement.
 */
export default function ScrollParallax({ children, speed = 120, className = "" }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const yRaw = useTransform(scrollYProgress, [0, 1], [-speed, speed]);
  const y = useSpring(yRaw, { stiffness: 120, damping: 25, mass: 0.4 });

  return (
    <motion.div ref={ref} className={className} style={{ y, willChange: "transform" }}>
      {children}
    </motion.div>
  );
}
