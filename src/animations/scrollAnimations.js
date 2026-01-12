/**
 * Scroll-driven animation utilities
 * Custom hooks and utilities for scroll-based animations
 */

import { useScroll, useTransform, useSpring } from "framer-motion";

/**
 * Hook for creating scroll-driven curve animations
 * Used in HowWeWork component for the curved path effect
 */
export const useScrollCurve = (ref, options = {}) => {
  const {
    radius = 260,
    arcAngle = 0.6,
    isRight = true,
    reduceMotion = false,
    scrollOffset = ["start 0.3", "end 0.7"],
    opacityRange = [0.6, 0.9, 1],
    opacityValues = [1, 0.6, 0]
  } = options;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: scrollOffset
  });

  // Smooth spring animation for better performance
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Progress mapped for curve exit
  const curveProgress = useTransform(
    smoothProgress,
    [0.6, 1],
    [0, 1]
  );

  // X follows circular arc
  const x = useTransform(curveProgress, (p) => {
    if (reduceMotion) return 0;
    const angle = p * Math.PI * arcAngle;
    return isRight
      ? radius * Math.sin(angle)
      : -radius * Math.sin(angle);
  });

  // Y complements curve
  const y = useTransform(curveProgress, (p) => {
    if (reduceMotion) return 0;
    const angle = p * Math.PI * arcAngle;
    return -radius * (1 - Math.cos(angle));
  });

  // Opacity fade out
  const opacity = useTransform(
    smoothProgress,
    opacityRange,
    opacityValues
  );

  return { x, y, opacity, scrollYProgress: smoothProgress };
};

/**
 * Hook for parallax scroll effect
 */
export const useParallax = (ref, speed = 0.5) => {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100]);

  return { y };
};

/**
 * Hook for fade in on scroll
 */
export const useFadeInScroll = (ref, options = {}) => {
  const {
    startOffset = "start 0.8",
    endOffset = "start 0.5",
    yOffset = 30
  } = options;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [startOffset, endOffset]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [yOffset, 0]);

  return { opacity, y };
};
