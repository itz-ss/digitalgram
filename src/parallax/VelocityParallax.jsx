import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";


/**
 * Moves element based on scroll velocity (speed of scrolling).
 */
export default function VelocityParallax({ children, intensity = 25, className = "" }) {
  const ref = useRef(null);

  const { scrollY } = useScroll(); // global
  const v = useVelocity(scrollY);

  // smooth velocity
  const vSmooth = useSpring(v, { stiffness: 120, damping: 30 });

  // map velocity to translate (cap safe)
  const yRaw = useTransform(vSmooth, [-1500, 0, 1500], [intensity, 0, -intensity]);

  return (
    <motion.div ref={ref} className={className} style={{ y: yRaw, willChange: "transform" }}>
      {children}
    </motion.div>
  );
}
