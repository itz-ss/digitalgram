import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";


/**
 * 3D hover tilt using Framer Motion only.
 */
export default function TiltParallaxCard({ children, className = "" }) {
  const ref = useRef(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const x = useSpring(mx, { stiffness: 220, damping: 18 });
  const y = useSpring(my, { stiffness: 220, damping: 18 });

  const rotateY = useTransform(x, [-0.5, 0.5], [-18, 18]);
  const rotateX = useTransform(y, [-0.5, 0.5], [18, -18]);

  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    mx.set(px);
    my.set(py);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        transformStyle: "preserve-3d",
        perspective: 900,
        rotateX,
        rotateY,
        willChange: "transform",
        // translateZ: 80 
      }}
    >
      {children}
    </motion.div>
  );
}
