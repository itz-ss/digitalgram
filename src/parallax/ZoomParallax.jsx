import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";


export default function ZoomParallax({ children, from = 1.1, to = 1, className = "" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scaleRaw = useTransform(scrollYProgress, [0, 1], [from, to]);
  const scale = useSpring(scaleRaw, { stiffness: 120, damping: 25 });

  return (
    <motion.div ref={ref} className={className} style={{ scale, willChange: "transform" }}>
      {children}
    </motion.div>
  );
}
