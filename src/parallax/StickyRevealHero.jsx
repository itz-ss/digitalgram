import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";


/**
 * 3-layer sticky reveal hero (cover removal).
 * slides: [{ img, title, desc }]
 */
export default function StickyRevealHero({ slides = [] }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const topH = useTransform(scrollYProgress, [0, 0.4], ["100%", "0%"]);
  const midH = useTransform(scrollYProgress, [0.4, 1], ["100%", "0%"]);

  const text1Opacity = useTransform(scrollYProgress, [0, 0.25, 0.4], [1, 1, 0]);
  const text2Opacity = useTransform(scrollYProgress, [0.25, 0.45, 0.8], [0, 1, 0]);
  const text3Opacity = useTransform(scrollYProgress, [0.65, 0.85, 1], [0, 1, 1]);

  const text1Y = useTransform(scrollYProgress, [0, 0.4], [0, -30]);
  const text2Y = useTransform(scrollYProgress, [0.25, 0.8], [30, -20]);
  const text3Y = useTransform(scrollYProgress, [0.7, 1], [30, 0]);

  // Expect slides[0]=top, slides[1]=mid, slides[2]=bottom
  const top = slides[0];
  const mid = slides[1];
  const bottom = slides[2];

  return (
    <section ref={ref} style={{ height: "300vh", position: "relative" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
        {/* Bottom */}
        {bottom?.img && (
          <img
            src={bottom.img}
            alt="bottom"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        )}

        {/* Mid */}
        {mid?.img && (
          <motion.div style={{ position: "absolute", left: 0, right: 0, top: 0, height: midH, overflow: "hidden" }}>
            <img src={mid.img} alt="mid" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </motion.div>
        )}

        {/* Top */}
        {top?.img && (
          <motion.div style={{ position: "absolute", left: 0, right: 0, top: 0, height: topH, overflow: "hidden" }}>
            <img src={top.img} alt="top" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </motion.div>
        )}

        {/* overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.65), rgba(0,0,0,0.15))",
            zIndex: 3,
          }}
        />

        {/* text */}
        <div
          style={{
            position: "relative",
            zIndex: 5,
            height: "100%",
            display: "grid",
            placeItems: "center",
            padding: "0 16px",
            textAlign: "center",
            color: "white",
          }}
        >
          <motion.div style={{ position: "absolute", opacity: text1Opacity, y: text1Y }}>
            <h1 style={{ fontSize: "clamp(2rem, 6vw, 4rem)", margin: 0 }}>{top?.title}</h1>
            <p style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)", marginTop: 12 }}>{top?.desc}</p>
          </motion.div>

          <motion.div style={{ position: "absolute", opacity: text2Opacity, y: text2Y }}>
            <h1 style={{ fontSize: "clamp(2rem, 6vw, 4rem)", margin: 0 }}>{mid?.title}</h1>
            <p style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)", marginTop: 12 }}>{mid?.desc}</p>
          </motion.div>

          <motion.div style={{ position: "absolute", opacity: text3Opacity, y: text3Y }}>
            <h1 style={{ fontSize: "clamp(2rem, 6vw, 4rem)", margin: 0 }}>{bottom?.title}</h1>
            <p style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)", marginTop: 12 }}>{bottom?.desc}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
