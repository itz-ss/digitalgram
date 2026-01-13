// ============================================
// SCROLL-DRIVEN ANIMATIONS
// ============================================
/**
 * Fade up animation - scroll-driven
 */
export const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }
  }
};

/**
 * Fade in animation - scroll-driven
 */
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
  }
};

/**
 * Fade in from left - scroll-driven
 */
export const fadeInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }
  }
};

/**
 * Fade in from right - scroll-driven
 */
export const fadeInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }
  }
};

/**
 * Scale in animation - scroll-driven
 */
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.2 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
  }
};

/**
 * Stagger container for children animations
 */
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2
    }
  }
};

/**
 * Stagger item for use within stagger container
 */
export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
  }
};

// ============================================
// TIME-DRIVEN ANIMATIONS (for specific use cases)
// ============================================

/**
 * Tab content transition - time-driven (needed for smooth tab switching)
 */
export const tabContentVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.98,
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }
  }
};

/**
 * Button hover animation - time-driven (for interactive feedback)
 */
export const buttonHover = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.02,
    y: -2,
    transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.1 }
  }
};

/**
 * Card hover animation - time-driven (for interactive cards)
 */
export const cardHover = {
  rest: { scale: 1, y: 0, boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)" },
  hover: {
    scale: 1.02,
    y: -4,
    boxShadow: "0 12px 24px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }
  }
};

/**
 * Link hover animation - time-driven (for navigation links)
 */
export const linkHover = {
  rest: { y: 0 },
  hover: {
    y: -2,
    transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }
  }
};

// ============================================
// SCROLL PROGRESS UTILITIES
// ============================================

/**
 * Default viewport settings for scroll-driven animations
 */
export const defaultViewport = {
  once: true,
  amount: 0.2,
  margin: "-100px"
};

/**
 * Viewport settings for more aggressive triggers
 */
export const earlyViewport = {
  once: true,
  amount: 0.1,
  margin: "-50px"
};

/**
 * Viewport settings for subtle triggers
 */
export const subtleViewport = {
  once: true,
  amount: 0.3,
  margin: "-150px"
};
