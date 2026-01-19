import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";


/**
 * Layered hero parallax.
 * layers = [{ src, speed, opacity }]
 *
 * Usage:
 * <LayerParallaxHero
 *   height="100vh"
 *   layers={[
 *     { src: "/img/bg.jpg", speed: 30, opacity: 1 },
 *     { src: "/img/mid.png", speed: 60, opacity: 1 },
 *     { src: "/img/front.png", speed: 120, opacity: 1 },
 *   ]}
 * />
 */
export default function LayerParallaxHero({
  layers = [],
  height = "100vh",
  className = "",
  children,
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  return (
    <section ref={ref} className={className} style={{ height, position: "relative", overflow: "hidden" }}>
      {layers.map((layer, idx) => {
        const yRaw = useTransform(scrollYProgress, [0, 1], [0, layer.speed || 80]);
        const y = useSpring(yRaw, { stiffness: 120, damping: 26, mass: 0.5 });

        return (
          <motion.img
            key={idx}
            src={layer.src}
            alt={layer.alt || `layer-${idx}`}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              y,
              opacity: layer.opacity ?? 1,
              willChange: "transform",
              pointerEvents: "none",
              zIndex: idx + 1,
            }}
          />
        );
      })}

      {/* content */}
      <div style={{ position: "relative", zIndex: layers.length + 10, height: "100%" }}>
        {children}
      </div>
    </section>
  );
}
