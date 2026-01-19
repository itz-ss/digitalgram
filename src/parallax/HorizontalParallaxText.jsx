import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";


export default function HorizontalParallaxText({ text = "PARALLAX", distance = 150 }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const xRaw = useTransform(scrollYProgress, [0, 1], [-distance, distance]);
  const x = useSpring(xRaw, { stiffness: 120, damping: 25 });

  return (
    <section ref={ref} style={{ padding: "80px 0", overflow: "hidden" }}>
      <motion.div style={{ x, fontSize: "clamp(2rem, 8vw, 6rem)", fontWeight: 800, whiteSpace: "nowrap" }}>
        {text}
      </motion.div>
    </section>
  );
}
