import { useMemo, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import "./style/DiceScroll.css";

/**
 * DiceScroll (N-sided)
 * Scroll-driven 3D wheel of faces (dice/prism).
 *
 * props:
 * - sections: array of React nodes
 * - heightVh: scroll room
 * - tiltY: small cinematic twist
 */
export default function DiceScroll({
  sections = [],
  heightVh = 520,
  tiltY = 10,
}) {
  const ref = useRef(null);

  const total = Math.max(1, sections.length);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // smooth scroll
  const p = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    mass: 0.55,
  });

  /**
   * For N faces:
   * rotateX goes 0 to -(N-1)*stepDegrees
   */
  const step = 360 / total;
  const maxRotX = -(total - 1) * step;

  const rotateX = useTransform(p, [0, 1], [0, maxRotX]);
  const rotateY = useTransform(p, [0, 1], [0, tiltY]);

  // subtle zoom
  const scale = useTransform(p, [0, 0.5, 1], [1.05, 1, 1.03]);

  // Create styles for each face
  const faces = useMemo(() => {
    return sections.map((content, i) => {
      // distribute faces around X axis
      const angle = i * step;

      return {
        key: `face-${i}`,
        angle,
        content,
      };
    });
  }, [sections, step]);

  return (
    <section ref={ref} className="diceScroll" style={{ height: `${heightVh}vh` }}>
      <div className="diceScroll__sticky">
        <motion.div className="diceScene" style={{ scale }}>
          <motion.div className="dice" style={{ rotateX, rotateY }}>
            {faces.map((f) => (
              <div
                key={f.key}
                className="face"
                style={{
                  transform: `rotateX(${f.angle}deg) translateZ(var(--diceDepth))`,
                }}
              >
                {f.content}
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className="diceScroll__hint">
          <span className="diceScroll__dot" />
          Scroll to rotate
        </div>
      </div>
    </section>
  );
}
