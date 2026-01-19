import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function RotatingParallaxText({ texts = ["TEXT"], speed = 50, interval = 2000 }) {
  const ref = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, speed]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    }, interval);
    return () => clearInterval(timer);
  }, [texts.length, interval]);

  const currentText = texts[currentIndex];
  const text = typeof currentText === 'string' ? currentText : currentText.text;
  const color = typeof currentText === 'object' ? currentText.color : 'inherit';

  return (
    <section ref={ref} style={{ overflow: "hidden", display: "inline" }}>
      <motion.span
        key={currentIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        style={{ color, y }}
      >
        {text}
      </motion.span>
    </section>
  );
}