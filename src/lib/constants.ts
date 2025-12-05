// src/lib/constants.ts

/**
 * Color palette - matches design system
 * DO NOT modify these without updating Tailwind config
 */
export const COLORS = {
  // Backgrounds
  primary: '#0a0e27',
  secondary: '#141b3a',
  elevated: '#1a2247',
  
  // Accents
  gold: '#d4a574',
  goldLight: '#e8b889',
  blue: '#4a9eff',
  blueLight: '#6eb0ff',
  
  // Text
  textPrimary: '#e8e9f3',
  textSecondary: '#a0a3bd',
  textMuted: '#6b7280',
  
  // Borders
  borderSubtle: 'rgba(212, 165, 116, 0.1)',
  borderMedium: 'rgba(212, 165, 116, 0.3)',
  borderStrong: 'rgba(212, 165, 116, 0.5)',
} as const

/**
 * Breakpoints - matches Tailwind defaults
 */
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

/**
 * Spacing scale (4px base)
 */
export const SPACING = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  6: 24,
  8: 32,
  12: 48,
  16: 64,
  24: 96,
  32: 128,
} as const

/**
 * Animation durations (ms)
 */
export const DURATION = {
  fast: 150,
  normal: 300,
  slow: 500,
  slowest: 700,
} as const

/**
 * Easing functions
 */
export const EASING = {
  // Custom easings
  outExpo: [0.19, 1, 0.22, 1],
  inOutSmooth: [0.4, 0, 0.2, 1],
  
  // Standard easings
  linear: [0, 0, 1, 1],
  easeIn: [0.42, 0, 1, 1],
  easeOut: [0, 0, 0.58, 1],
  easeInOut: [0.42, 0, 0.58, 1],
} as const

/**
 * Navigation items
 */
export const NAV_ITEMS = [
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
] as const

/**
 * Social media links
 */
export const SOCIAL_LINKS = {
  github: 'https://github.com/arshad-shah',
  linkedin: 'https://www.linkedin.com/in/arshadshah',
  email: 'mailto:arshad@arshadshah.com',
  hackerrank: 'https://www.hackerrank.com/shaharshad57',
} as const

/**
 * External links
 */
export const EXTERNAL_LINKS = {
  resume: '/resume.pdf',
  tools: 'https://tools.arshadshah.com',
  nimaz: 'https://nimaz.arshadshah.com',
  expense: 'https://expense.arshadshah.com',
} as const

/**
 * Site metadata
 */
export const SITE_CONFIG = {
  name: 'Arshad Shah',
  title: 'Arshad Shah - Software Engineer',
  description: 'Software Engineer specializing in high-performance systems, microfrontend architecture, and educational technology solutions.',
  url: 'https://arshadshah.com',
  ogImage: '/og-image.png',
  author: 'Arshad Shah',
  keywords: [
    'Software Engineer',
    'Full Stack Developer',
    'React Developer',
    'TypeScript',
    'Spring Boot',
    'Microservices',
    'Performance Engineering',
    'Dublin',
    'Ireland',
  ],
  locale: 'en-US',
  theme: 'dark',
} as const

/**
 * Contact information
 */
export const CONTACT_INFO = {
  email: 'arshad@arshadshah.com',
  location: 'Dublin, Ireland',
  timezone: 'GMT',
  availability: 'Employed (Open to opportunities)',
  responseTime: 'Within 24 hours',
} as const

/**
 * Project categories
 */
export const PROJECT_CATEGORIES = [
  'All',
  'Professional',
  'Personal',
  'Tools',
] as const

/**
 * Technology tags with colors
 */
export const TECH_COLORS: Record<string, string> = {
  // Frontend
  'React': 'blue',
  'TypeScript': 'blue',
  'JavaScript': 'yellow',
  'Next.js': 'black',
  'Tailwind CSS': 'cyan',
  'Vite': 'purple',
  
  // Backend
  'Spring Boot': 'green',
  'Node.js': 'green',
  'Java': 'orange',
  'Kotlin': 'purple',
  'Python': 'blue',
  
  // Database
  'PostgreSQL': 'blue',
  'MongoDB': 'green',
  'Redis': 'red',
  
  // DevOps
  'Kubernetes': 'blue',
  'Docker': 'blue',
  'AWS': 'orange',
  
  // Tools
  'GraphQL': 'pink',
  'Hasura': 'blue',
  'Firebase': 'orange',
  
  // Default
  'default': 'gray',
}

/**
 * Experience timeline settings
 */
export const TIMELINE_CONFIG = {
  dotSize: 12,
  lineWidth: 2,
  spacing: 40,
  maxWidth: 800,
} as const

/**
 * Project card settings
 */
export const PROJECT_CONFIG = {
  cardsPerPage: 6,
  gridColumns: {
    sm: 1,
    md: 2,
    lg: 3,
  },
  imageAspectRatio: '16/9',
} as const

/**
 * Performance thresholds
 */
export const PERFORMANCE = {
  // Lighthouse targets
  lighthouse: {
    performance: 95,
    accessibility: 95,
    bestPractices: 95,
    seo: 100,
  },
  
  // Core Web Vitals
  webVitals: {
    fcp: 1000, // First Contentful Paint (ms)
    lcp: 2500, // Largest Contentful Paint (ms)
    fid: 100,  // First Input Delay (ms)
    cls: 0.1,  // Cumulative Layout Shift
    ttfb: 600, // Time to First Byte (ms)
  },
  
  // Bundle size limits
  bundleSize: {
    total: 150 * 1024, // 150KB (gzipped)
    js: 100 * 1024,    // 100KB (gzipped)
    css: 20 * 1024,    // 20KB (gzipped)
  },
} as const

/**
 * Intersection Observer options
 */
export const INTERSECTION_OPTIONS = {
  threshold: 0.1,
  rootMargin: '-50px 0px',
} as const

/**
 * Feature flags
 */
export const FEATURES = {
  enableAnimations: true,
  enableAnalytics: false,
  enableContactForm: false,
  enableDarkMode: false, // Only dark mode
  enableSearch: false,
  enableBlog: false,
} as const

/**
 * Z-index layers
 */
export const Z_INDEX = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  modal: 30,
  popover: 40,
  toast: 50,
  tooltip: 60,
} as const

/**
 * Regex patterns
 */
export const PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  url: /^https?:\/\/.+/,
  phone: /^[\d\s\-\+\(\)]+$/,
  github: /^https?:\/\/(www\.)?github\.com\/.+/,
  linkedin: /^https?:\/\/(www\.)?linkedin\.com\/.+/,
} as const

/**
 * Error messages
 */
export const ERRORS = {
  network: 'Network error. Please check your connection.',
  notFound: 'The requested resource was not found.',
  validation: 'Please check your input and try again.',
  generic: 'Something went wrong. Please try again later.',
} as const

/**
 * Success messages
 */
export const SUCCESS = {
  copy: 'Copied to clipboard!',
  submit: 'Message sent successfully!',
  save: 'Saved successfully!',
} as const

/**
 * Accessibility labels
 */
export const A11Y = {
  skipToContent: 'Skip to main content',
  toggleMenu: 'Toggle navigation menu',
  closeModal: 'Close modal',
  previousItem: 'Previous item',
  nextItem: 'Next item',
  playPause: 'Play or pause',
  loading: 'Loading...',
} as const