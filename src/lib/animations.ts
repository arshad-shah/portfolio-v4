// src/lib/animations.ts

import { type Variants, type Transition } from 'framer-motion'
import { DURATION, EASING } from './constants'

/**
 * Default transition settings
 */
export const defaultTransition: Transition = {
  duration: DURATION.normal / 1000,
  ease: EASING.outExpo,
}

/**
 * Fade in animation
 * Usage: variants={fadeIn}
 */
export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: defaultTransition,
  },
  exit: {
    opacity: 0,
    transition: {
      duration: DURATION.fast / 1000,
    },
  },
}

/**
 * Fade in from bottom
 * Usage: variants={fadeInUp}
 */
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: DURATION.fast / 1000,
    },
  },
}

/**
 * Fade in from top
 * Usage: variants={fadeInDown}
 */
export const fadeInDown: Variants = {
  hidden: {
    opacity: 0,
    y: -20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: {
      duration: DURATION.fast / 1000,
    },
  },
}

/**
 * Fade in from left
 * Usage: variants={fadeInLeft}
 */
export const fadeInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: defaultTransition,
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: {
      duration: DURATION.fast / 1000,
    },
  },
}

/**
 * Fade in from right
 * Usage: variants={fadeInRight}
 */
export const fadeInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: defaultTransition,
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: {
      duration: DURATION.fast / 1000,
    },
  },
}

/**
 * Scale in animation
 * Usage: variants={scaleIn}
 */
export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: defaultTransition,
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: DURATION.fast / 1000,
    },
  },
}

/**
 * Stagger container - for parent elements
 * Usage: variants={staggerContainer} with staggerChildren prop
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
}

/**
 * Stagger item - for child elements
 * Usage: variants={staggerItem} inside staggerContainer
 */
export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
  exit: {
    opacity: 0,
    y: -10,
  },
}

/**
 * Slide in from bottom - for modals/drawers
 * Usage: variants={slideInBottom}
 */
export const slideInBottom: Variants = {
  hidden: {
    y: '100%',
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      ...defaultTransition,
      duration: DURATION.slow / 1000,
    },
  },
  exit: {
    y: '100%',
    opacity: 0,
    transition: {
      duration: DURATION.normal / 1000,
    },
  },
}

/**
 * Slide in from top - for notifications
 * Usage: variants={slideInTop}
 */
export const slideInTop: Variants = {
  hidden: {
    y: '-100%',
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      ...defaultTransition,
      duration: DURATION.slow / 1000,
    },
  },
  exit: {
    y: '-100%',
    opacity: 0,
    transition: {
      duration: DURATION.normal / 1000,
    },
  },
}

/**
 * Expand width animation
 * Usage: variants={expandWidth}
 */
export const expandWidth: Variants = {
  hidden: {
    width: 0,
    opacity: 0,
  },
  visible: {
    width: 'auto',
    opacity: 1,
    transition: defaultTransition,
  },
  exit: {
    width: 0,
    opacity: 0,
    transition: {
      duration: DURATION.fast / 1000,
    },
  },
}

/**
 * Expand height animation
 * Usage: variants={expandHeight}
 */
export const expandHeight: Variants = {
  hidden: {
    height: 0,
    opacity: 0,
  },
  visible: {
    height: 'auto',
    opacity: 1,
    transition: defaultTransition,
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: {
      duration: DURATION.fast / 1000,
    },
  },
}

/**
 * Rotate in animation
 * Usage: variants={rotateIn}
 */
export const rotateIn: Variants = {
  hidden: {
    opacity: 0,
    rotate: -10,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: defaultTransition,
  },
  exit: {
    opacity: 0,
    rotate: 10,
    scale: 0.95,
    transition: {
      duration: DURATION.fast / 1000,
    },
  },
}

/**
 * Hover lift effect
 * Usage: whileHover="hover" variants={hoverLift}
 */
export const hoverLift: Variants = {
  initial: {
    y: 0,
  },
  hover: {
    y: -4,
    transition: {
      duration: DURATION.fast / 1000,
      ease: EASING.easeOut,
    },
  },
}

/**
 * Hover scale effect
 * Usage: whileHover="hover" variants={hoverScale}
 */
export const hoverScale: Variants = {
  initial: {
    scale: 1,
  },
  hover: {
    scale: 1.02,
    transition: {
      duration: DURATION.fast / 1000,
      ease: EASING.easeOut,
    },
  },
}

/**
 * Tap scale effect
 * Usage: whileTap="tap" variants={tapScale}
 */
export const tapScale: Variants = {
  initial: {
    scale: 1,
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: DURATION.fast / 1000,
      ease: EASING.easeOut,
    },
  },
}

/**
 * Page transition - for route changes
 * Usage: variants={pageTransition}
 */
export const pageTransition: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ...defaultTransition,
      duration: DURATION.slow / 1000,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: DURATION.normal / 1000,
    },
  },
}

/**
 * Navigation link underline animation
 * Usage: variants={navLinkUnderline}
 */
export const navLinkUnderline: Variants = {
  hidden: {
    width: 0,
    opacity: 0,
  },
  visible: {
    width: '100%',
    opacity: 1,
    transition: {
      duration: DURATION.normal / 1000,
      ease: EASING.easeOut,
    },
  },
}

/**
 * Counter animation - for numbers
 * Usage: custom counter with useMotionValue
 */
export const counterAnimation = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: DURATION.slow / 1000,
    ease: EASING.outExpo,
  },
}

/**
 * Typewriter effect settings
 */
export const typewriterEffect = {
  duration: 0.05,
  delay: 0.5,
}

/**
 * Scroll reveal animation - for sections
 * Usage: with InView component from Framer Motion
 */
export const scrollReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ...defaultTransition,
      duration: DURATION.slow / 1000,
    },
  },
}

/**
 * Card hover effect - lift and border glow
 */
export const cardHover: Variants = {
  initial: {
    y: 0,
    boxShadow: '0 0 0 0 rgba(212, 165, 116, 0)',
  },
  hover: {
    y: -4,
    boxShadow: '0 8px 16px rgba(212, 165, 116, 0.1)',
    transition: {
      duration: DURATION.normal / 1000,
      ease: EASING.easeOut,
    },
  },
}

/**
 * Timeline dot pulse animation
 */
export const timelineDotPulse: Variants = {
  initial: {
    scale: 1,
    opacity: 1,
  },
  animate: {
    scale: [1, 1.2, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

/**
 * Badge entrance animation
 */
export const badgeEntrance: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.05,
      duration: DURATION.normal / 1000,
      ease: EASING.easeOut,
    },
  }),
}

/**
 * Hero image border animation
 */
export const heroBorderAnimation: Variants = {
  initial: {
    pathLength: 0,
    opacity: 0,
  },
  animate: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 2,
      ease: 'easeInOut',
    },
  },
}

/**
 * Menu animation
 */
export const menuAnimation: Variants = {
  closed: {
    opacity: 0,
    height: 0,
    transition: {
      duration: DURATION.normal / 1000,
      ease: EASING.easeInOut,
    },
  },
  open: {
    opacity: 1,
    height: 'auto',
    transition: {
      duration: DURATION.normal / 1000,
      ease: EASING.easeInOut,
    },
  },
}

/**
 * Logo animation on load
 */
export const logoAnimation: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: DURATION.slow / 1000,
      ease: EASING.outExpo,
    },
  },
}
