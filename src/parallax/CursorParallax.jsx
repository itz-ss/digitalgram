import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * Interactive mouse parallax wrapper.
 * intensity: how much it moves.
 */
export default function CursorParallax({ children, intensity = 25, className = "" }) {
  const ref = useRef(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const x = useSpring(mx, { stiffness: 120, damping: 20 });
  const y = useSpring(my, { stiffness: 120, damping: 20 });

  const moveX = useTransform(x, [-1, 1], [-intensity, intensity]);
  const moveY = useTransform(y, [-1, 1], [-intensity, intensity]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;  // 0..1
      const py = (e.clientY - rect.top) / rect.height;  // 0..1
      mx.set(px * 2 - 1);
      my.set(py * 2 - 1);
    };

    const handleLeave = () => {
      mx.set(0);
      my.set(0);
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);

    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [mx, my]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: moveX, y: moveY, willChange: "transform" }}
    >
      {children}
    </motion.div>
  );
}
