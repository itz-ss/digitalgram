/**
 * Timeline Animation Utilities
 * Professional timeline/step-by-step animations for process sections
 */

import { useScroll, useTransform, useSpring } from "framer-motion";

/**
 * Hook for timeline step animation
 * Creates a smooth reveal effect as user scrolls
 */
export const useTimelineStep = (ref, index, totalSteps, options = {}) => {
  const {
    startOffset = "start 0.7",
    endOffset = "start 0.3",
    reduceMotion = false
  } = options;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [startOffset, endOffset]
  });

  // Smooth spring animation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Calculate when this step should be visible
  const stepProgress = useTransform(
    smoothProgress,
    [index / totalSteps, (index + 0.5) / totalSteps, (index + 1) / totalSteps],
    [0, 1, 1]
  );

  // Y position for smooth slide effect
  const y = useTransform(stepProgress, (p) => {
    if (reduceMotion) return 0;
    return 40 * (1 - Math.max(0, Math.min(1, p * 1.5)));
  });

  // Scale for subtle zoom effect
  const scale = useTransform(stepProgress, (p) => {
    if (reduceMotion) return 1;
    return 0.9 + 0.1 * Math.max(0, Math.min(1, p * 1.5));
  });

  return { y, scale, stepProgress: smoothProgress };
};

/**
 * Hook for connecting line animation in timeline
 */
export const useTimelineLine = (ref, index, totalSteps, options = {}) => {
  const {
    startOffset = "start 0.7",
    endOffset = "start 0.3",
    reduceMotion = false
  } = options;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [startOffset, endOffset]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Line should fill as we progress through steps
  const lineProgress = useTransform(
    smoothProgress,
    [index / totalSteps, (index + 1) / totalSteps],
    [0, 1]
  );

  const scaleY = useTransform(lineProgress, (p) => {
    if (reduceMotion) return 1;
    return Math.max(0, Math.min(1, p));
  });

  return { scaleY, lineProgress: smoothProgress };
};
