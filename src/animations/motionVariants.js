// ============================================
// SCROLL-DRIVEN ANIMATIONS
// ============================================
/**
 * Slide up animation - scroll-driven (smooth without opacity)
 */
export const fadeUp = {
  hidden: { y: 50, scale: 0.95 },
  visible: {
    y: 0,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.1, 0.25, 1],
      scale: { duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }
    }
  }
};

/**
 * Slide in from left - scroll-driven
 */
export const slideInLeft = {
  hidden: { x: -60, scale: 0.9 },
  visible: {
    x: 0,
    scale: 1,
    transition: {
      duration: 1.0,
      ease: [0.25, 0.1, 0.25, 1],
      scale: { duration: 1.3, ease: [0.25, 0.1, 0.25, 1] }
    }
  }
};

/**
 * Slide in from right - scroll-driven
 */
export const slideInRight = {
  hidden: { x: 60, scale: 0.9 },
  visible: {
    x: 0,
    scale: 1,
    transition: {
      duration: 1.0,
      ease: [0.25, 0.1, 0.25, 1],
      scale: { duration: 1.3, ease: [0.25, 0.1, 0.25, 1] }
    }
  }
};

/**
 * Scale in animation - scroll-driven
 */
export const scaleIn = {
  hidden: { scale: 0.8, y: 20 },
  visible: {
    scale: 1,
    y: 0,
    transition: {
      duration: 1.1,
      ease: [0.25, 0.1, 0.25, 1],
      scale: { duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }
    }
  }
};

/**
 * Stagger container for children animations
 */
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

/**
 * Stagger item for use within stagger container
 */
export const staggerItem = {
  hidden: { y: 30, scale: 0.95 },
  visible: {
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
      scale: { duration: 1.1, ease: [0.25, 0.1, 0.25, 1] }
    }
  }
};

// ============================================
// TIME-DRIVEN ANIMATIONS (for specific use cases)
// ============================================

// ============================================
// TIME-DRIVEN ANIMATIONS (for specific use cases)
// ============================================

/**
 * Tab content transition - time-driven (needed for smooth tab switching)
 */
export const tabContentVariants = {
  hidden: { y: 15, scale: 0.98 },
  visible: {
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
  },
  exit: {
    y: -15,
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
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.02,
    y: -4,
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
