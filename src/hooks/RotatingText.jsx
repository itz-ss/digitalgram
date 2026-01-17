import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const getVariants = (direction) => {
  const offset = 15;
  const scaleOffset = 0.05;
  const transition = { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] };

  if (direction === "down") {
    return {
      initial: { y: -offset, scale: 1 - scaleOffset },
      animate: { y: 0, scale: 1, transition },
      exit: { y: offset, scale: 1 - scaleOffset, transition }
    };
  }

  // DEFAULT → UP
  return {
    initial: { y: offset, scale: 1 - scaleOffset },
    animate: { y: 0, scale: 1, transition },
    exit: { y: -offset, scale: 1 - scaleOffset, transition }
  };
};

const RotatingText = ({
  words,
  interval = 2000,
  direction = "up", // ✅ DEFAULT
  className = ""
}) => {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);

    return () => clearInterval(id);
  }, [interval, words.length]);

  const variants = getVariants(direction);

  return (
    <span className={`rotating-text ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          style={{ color: words[index].color }}
          variants={reduce ? undefined : variants}
          initial={reduce ? undefined : "initial"}
          animate={reduce ? undefined : "animate"}
          exit={reduce ? undefined : "exit"}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {words[index].text}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

export default RotatingText;
