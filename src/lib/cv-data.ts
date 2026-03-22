// CV Content Data for on-the-fly PDF generation
// Contains role-specific content for beautiful CV generation

export const personalInfo = {
  name: 'Arshad Shah',
  title: 'Senior Software Engineer',
  email: 'arshad@arshadshah.com',
  location: 'Dublin, Ireland',
  website: 'arshadshah.com',
  linkedin: 'linkedin.com/in/arshadshah',
  github: 'github.com/arshad-shah',
}

export const education = {
  degree: 'BSc (Hons) in Computer Science',
  institution: 'Technological University Dublin',
  location: 'Dublin, Ireland',
  year: '2019 - 2023',
  grade: 'Second Class Honours (2.1)',
}

export interface ExperienceItem {
  company: string
  position: string
  location: string
  period: string
  highlights: Record<string, string[]>
}

export const experience: ExperienceItem[] = [
  {
    company: 'Houghton Mifflin Harcourt',
    position: 'Senior Software Engineer',
    location: 'Dublin, Ireland',
    period: 'Mar 2026 - Present',
    highlights: {
      default: [
        'Rebuilt RCE platform from scratch using modern tech, reducing bundle size from 10MB to 500KB (95% reduction)',
        'Optimized internal EPUB parser using low-level algorithm improvements, cutting parse time from 8s to under 3s on large books',
        'Added enhanced customization capabilities across the RCE platform for content authoring',
        'Maintaining and managing multiple backend services for real-time test-to-proctor API integrations',
      ],
      frontend: [
        'Rebuilt RCE platform from scratch with modern React, reducing bundle size from 10MB to 500KB (95% reduction)',
        'Optimized internal EPUB parser with low-level algorithm improvements, reducing parse time from 8s to under 3s',
        'Added enhanced content customization capabilities expanding authoring features for educators',
        'Architected clean component structure enabling faster feature development and maintenance',
      ],
      backend: [
        'Maintaining and managing multiple backend services for real-time test-to-proctor API integrations',
        'Optimized EPUB parser using low-level algorithm improvements, cutting parse time from 8s to under 3s',
        'Ensuring reliability of proctoring services handling concurrent test sessions at scale',
        'Rebuilt RCE platform backend integrations with cleaner architecture and modern patterns',
      ],
      fullstack: [
        'Rebuilt RCE platform from scratch, reducing bundle size from 10MB to 500KB with modern architecture',
        'Optimized internal EPUB parser with low-level algorithm improvements (8s → under 3s on large books)',
        'Maintaining multiple backend services for real-time test-to-proctor API integrations',
        'Added enhanced customization capabilities across the RCE platform',
      ],
      mobile: [
        'Rebuilt RCE platform with responsive design optimized for tablet content authoring',
        'Optimized EPUB parser performance for faster content rendering on mobile devices',
        'Maintained backend services for real-time test proctoring across device types',
        'Ensured enhanced customization features work seamlessly on mobile form factors',
      ],
    },
  },
  {
    company: 'Houghton Mifflin Harcourt',
    position: 'Software Engineer',
    location: 'Dublin, Ireland',
    period: 'Mar 2024 - Mar 2026',
    highlights: {
      default: [
        'Delivered MAP Growth on Ed integration platform end-to-end with Hasura GraphQL and Spring Boot, achieving 8,250+ RPS',
        'Migrated 600+ package monorepo from Babel to SWC, cutting build times by 65-70%',
        'Led GHES to GHEC migration with zero downtime, rebuilding CI/CD on GitHub Actions',
        'Created reusable hasura-client-map package standardizing GraphQL patterns across teams',
      ],
      frontend: [
        'Led microfrontend architecture implementation using Module Federation for independent deployments',
        'Migrated 600+ package monorepo from Babel to SWC, cutting build times by 65-70%',
        'Enhanced monorepo DX via webpack optimization, caching strategies, and build improvements',
        'Built reusable React component library with TypeScript, improving development velocity',
      ],
      backend: [
        'Delivered MAP Growth on Ed integration with Hasura GraphQL and Spring Boot reactive handlers',
        'Achieved 8,250+ RPS with 3,456+ concurrent users at 50% utilization via connection pooling',
        'Developed session management services using GraphQL and PostgreSQL with observability',
        'Optimized Aurora PostgreSQL performance, reducing P95 latency from 7+ seconds to sub-100ms',
      ],
      fullstack: [
        'Delivered MAP Growth on Ed integration end-to-end with Hasura GraphQL and Spring Boot',
        'Achieved 8,250+ RPS with 3,456+ concurrent users at 50% resource utilization',
        'Migrated 600+ package monorepo from Babel to SWC, cutting build times by 65-70%',
        'Created reusable hasura-client-map package standardizing GraphQL patterns across teams',
      ],
      mobile: [
        'Delivered cross-platform educational features supporting millions of K-12 students',
        'Implemented real-time classroom integrations with third-party solutions at scale',
        'Built responsive, accessible interfaces optimized for tablet devices in classrooms',
        'Developed WebSocket-based real-time features for interactive learning experiences',
      ],
    },
  },
  {
    company: 'Houghton Mifflin Harcourt',
    position: 'Associate Software Engineer',
    location: 'Dublin, Ireland',
    period: 'Jun 2023 - Mar 2024',
    highlights: {
      default: [
        'Implemented session management and insights collection for ED Platform enabling real-time analytics',
        'Migrated universal analytics to GA4 across products ahead of sunset with zero tracking gaps',
        'Deployed session management to Kubernetes with health checks, resource limits, and autoscaling',
        'Migrated monorepo to PNPM, cutting build time by ~50% and improving dependency management',
      ],
      frontend: [
        'Implemented session management and insights collection for ED Platform and RCE products',
        'Migrated universal analytics to GA4 across all products with zero tracking gaps',
        'Migrated monorepo to PNPM, cutting build time by ~50% and improving dependency resolution',
        'Improved frontend performance through code splitting and lazy loading strategies',
      ],
      backend: [
        'Deployed session management service to Kubernetes with health checks and autoscaling',
        'Created and deployed Concourse CI/CD pipelines for backend automation and reliability',
        'Built Node.js services for real-time analytics and session tracking',
        'Designed RESTful APIs for cross-service communication and data synchronization',
      ],
      fullstack: [
        'Implemented session management and insights collection enabling real-time analytics',
        'Deployed session management to Kubernetes with health checks and autoscaling',
        'Migrated monorepo to PNPM, cutting build time by ~50%',
        'Migrated universal analytics to GA4 across products with zero tracking gaps',
      ],
      mobile: [
        'Contributed to responsive web features optimized for mobile and tablet devices',
        'Implemented cross-platform analytics and user behavior tracking',
        'Built accessible interfaces following WCAG guidelines for educational applications',
        'Created documentation for mobile-first development best practices',
      ],
    },
  },
]

export interface ProjectItem {
  name: string
  description: string
  technologies: string[]
  impact: string
  link?: string
}

export const projects: Record<string, ProjectItem[]> = {
  default: [
    {
      name: 'HMH Learning Platform',
      description:
        'High-performance EdTech platform serving millions of students with sub-100ms P99 latency',
      technologies: ['React', 'TypeScript', 'Spring Boot', 'GraphQL', 'Kubernetes'],
      impact: '8,250+ RPS, 99.9% uptime',
    },
    {
      name: 'RCE Platform Rebuild',
      description: 'Ground-up rebuild of Rich Content Editor, reducing bundle from 10MB to 500KB',
      technologies: ['React', 'TypeScript', 'Webpack', 'Module Federation'],
      impact: '95% bundle size reduction',
    },
    {
      name: 'Database Performance Optimization',
      description: 'Resolved critical Aurora PostgreSQL bottlenecks through connection pooling',
      technologies: ['Aurora PostgreSQL', 'Hasura', 'Datadog', 'Gatling'],
      impact: '90% reduction in P95 latency',
    },
  ],
  frontend: [
    {
      name: 'Microfrontend Architecture',
      description: 'Module Federation implementation enabling independent team deployments',
      technologies: ['React', 'TypeScript', 'Webpack', 'Module Federation'],
      impact: 'Improved team autonomy',
    },
    {
      name: 'Build Performance Engineering',
      description: 'Babel to SWC migration with webpack caching and optimization',
      technologies: ['SWC', 'Webpack', 'PNPM', 'TypeScript'],
      impact: '65-70% faster builds',
    },
    {
      name: 'Multi-Tool Application',
      description: '22 productivity tools in a single React application',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
      link: 'tools.arshadshah.com',
      impact: '< 2s initial load',
    },
  ],
  backend: [
    {
      name: 'HMH Integration Platform',
      description: 'Hasura GraphQL backend with Spring Boot reactive handlers',
      technologies: ['Spring Boot', 'Hasura', 'GraphQL', 'PostgreSQL'],
      impact: '8,250+ RPS at 50% util',
    },
    {
      name: 'Database Optimization',
      description: 'Aurora PostgreSQL optimization with connection pooling',
      technologies: ['Aurora PostgreSQL', 'Hasura', 'Datadog', 'Gatling'],
      impact: '90% latency reduction',
    },
    {
      name: 'Test Proctor API Services',
      description: 'Backend services for real-time test-to-proctor integrations',
      technologies: ['Spring Boot', 'GraphQL', 'Kubernetes', 'Datadog'],
      impact: 'Zero-downtime during peak testing',
    },
  ],
  fullstack: [
    {
      name: 'HMH Learning Platform',
      description: 'End-to-end EdTech platform with React frontend and Spring Boot backend',
      technologies: ['React', 'Spring Boot', 'GraphQL', 'Kubernetes'],
      impact: 'Millions of students served',
    },
    {
      name: 'RCE Platform Rebuild',
      description: 'Ground-up rebuild reducing bundle from 10MB to 500KB',
      technologies: ['React', 'TypeScript', 'Webpack', 'GraphQL'],
      impact: '95% bundle size reduction',
    },
    {
      name: 'Expense Tracker',
      description: 'Real-time expense tracking with Firebase and visualizations',
      technologies: ['React', 'TypeScript', 'Firebase', 'Tailwind CSS'],
      link: 'github.com/arshad-shah/expense-frontend',
      impact: 'Real-time sync',
    },
  ],
  mobile: [
    {
      name: 'Nimaz - Islamic Companion',
      description: 'Offline-first Android app with location-based prayer times',
      technologies: ['Kotlin', 'Android SDK', 'Room', 'WorkManager'],
      link: 'nimaz.arshadshah.com',
      impact: 'Reliable offline behavior',
    },
    {
      name: 'HMH Mobile Features',
      description: 'Responsive educational features optimized for tablets',
      technologies: ['React', 'TypeScript', 'WebSockets', 'PWA'],
      impact: 'Millions of K-12 students',
    },
    {
      name: 'Multi-Tool PWA',
      description: 'Progressive web app with 22 tools optimized for mobile',
      technologies: ['React', 'TypeScript', 'PWA', 'Tailwind CSS'],
      link: 'tools.arshadshah.com',
      impact: 'Fully responsive',
    },
  ],
}

export const skills: Record<
  string,
  { primary: string[]; secondary: string[]; additional: string[] }
> = {
  default: {
    primary: ['React', 'TypeScript', 'Spring Boot', 'GraphQL', 'PostgreSQL', 'Kubernetes'],
    secondary: ['Node.js', 'Hasura', 'Docker', 'AWS', 'CI/CD', 'Datadog'],
    additional: ['System Design', 'Performance Engineering', 'Technical Leadership', 'Mentoring'],
  },
  frontend: {
    primary: ['React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS'],
    secondary: ['Webpack', 'Vite', 'Module Federation', 'SWC', 'Framer Motion', 'Next.js'],
    additional: [
      'State Management',
      'Web Accessibility',
      'Performance Optimization',
      'Responsive Design',
    ],
  },
  backend: {
    primary: ['Spring Boot', 'Java', 'GraphQL', 'PostgreSQL', 'Kubernetes', 'Docker'],
    secondary: ['Hasura', 'Node.js', 'REST APIs', 'Microservices', 'Redis', 'AWS'],
    additional: ['Database Optimization', 'Connection Pooling', 'System Design', 'CI/CD'],
  },
  fullstack: {
    primary: ['React', 'TypeScript', 'Spring Boot', 'GraphQL', 'PostgreSQL', 'Kubernetes'],
    secondary: ['Hasura', 'Node.js', 'Docker', 'AWS', 'Webpack', 'Module Federation'],
    additional: ['Microservices', 'Database Design', 'API Development', 'Performance Engineering'],
  },
  mobile: {
    primary: ['Kotlin', 'Android SDK', 'MVVM', 'Room Database', 'WorkManager', 'Jetpack Compose'],
    secondary: [
      'React Native',
      'Material Design',
      'Location Services',
      'Push Notifications',
      'Coroutines',
    ],
    additional: ['Offline-First Architecture', 'Mobile Performance', 'App Store Deployment', 'PWA'],
  },
}

export const summaries: Record<string, string> = {
  default: `Senior Software Engineer with 3+ years of progressive experience at Houghton Mifflin Harcourt. Rebuilt the RCE platform from scratch (10MB → 500KB), optimized EPUB parsing performance (8s → under 3s), and delivered high-throughput systems handling 8,250+ RPS. Expert in React, TypeScript, Spring Boot, and GraphQL. Proven track record in platform engineering, performance optimization, and maintaining real-time backend services at scale.`,

  frontend: `Senior Frontend Engineer with 3+ years specializing in React, TypeScript, and modern web architecture. Rebuilt the RCE platform from scratch, achieving a 95% bundle size reduction (10MB → 500KB). Expert in microfrontend systems, build optimization (65-70% faster builds via Babel → SWC migration), and performance-critical platform engineering.`,

  backend: `Senior Backend Engineer with 3+ years building high-throughput microservices with Spring Boot, GraphQL, and distributed systems. Achieved 8,250+ RPS at 50% resource utilization. Currently maintaining multiple backend services for real-time test-to-proctor API integrations and optimizing content delivery pipelines.`,

  fullstack: `Senior Full-Stack Developer with 3+ years delivering end-to-end platforms at Houghton Mifflin Harcourt. Rebuilt the RCE platform from scratch (95% bundle reduction), optimized EPUB parsing (62% faster), and built systems serving millions with 99.9% uptime. Expert in React, TypeScript, Spring Boot, and GraphQL.`,

  mobile: `Senior Software Engineer with mobile development expertise, including native Android with Kotlin and cross-platform solutions. Built Nimaz, an offline-first Islamic companion app with location-based features and reliable background processing. Currently delivering mobile-optimized features and content authoring experiences for educational platforms.`,
}

export type CVVariant = 'default' | 'frontend' | 'backend' | 'fullstack' | 'mobile'

export interface RoleConfig {
  id: string
  title: string
  variant: CVVariant
  color: string
  colorRgb: string
}

export const roleConfig: Record<string, RoleConfig> = {
  'senior-software-engineer': {
    id: 'senior-software-engineer',
    title: 'Senior Software Engineer',
    variant: 'default',
    color: '#d4a574',
    colorRgb: '212, 165, 116',
  },
  'fullstack-developer': {
    id: 'fullstack-developer',
    title: 'Senior Full-Stack Developer',
    variant: 'fullstack',
    color: '#4a9eff',
    colorRgb: '74, 158, 255',
  },
  'frontend-developer': {
    id: 'frontend-developer',
    title: 'Senior Frontend Developer',
    variant: 'frontend',
    color: '#22d3ee',
    colorRgb: '34, 211, 238',
  },
  'backend-developer': {
    id: 'backend-developer',
    title: 'Senior Backend Developer',
    variant: 'backend',
    color: '#34d399',
    colorRgb: '52, 211, 153',
  },
  'mobile-developer': {
    id: 'mobile-developer',
    title: 'Senior Mobile Developer',
    variant: 'mobile',
    color: '#a855f7',
    colorRgb: '168, 85, 247',
  },
}
