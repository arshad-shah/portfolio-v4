// CV Content Data for on-the-fly PDF generation
// Contains role-specific content for beautiful CV generation

export const personalInfo = {
  name: 'Arshad Shah',
  title: 'Software Engineer',
  email: 'arshad@arshadshah.com',
  location: 'Dublin, Ireland',
  website: 'arshadshah.com',
  linkedin: 'linkedin.com/in/arshadshah',
  github: 'github.com/arshad-shah',
};

export const education = {
  degree: 'BSc (Hons) in Computer Science',
  institution: 'Technological University Dublin',
  location: 'Dublin, Ireland',
  year: '2019 - 2023',
  grade: 'First Class Honours',
};

export interface ExperienceItem {
  company: string;
  position: string;
  location: string;
  period: string;
  highlights: Record<string, string[]>;
}

export const experience: ExperienceItem[] = [
  {
    company: 'Houghton Mifflin Harcourt',
    position: 'Software Engineer',
    location: 'Dublin, Ireland',
    period: 'Mar 2024 - Present',
    highlights: {
      default: [
        'Delivered MAP Growth on Ed integration platform end-to-end with Hasura GraphQL backend and Spring Boot action handlers, achieving 8,250+ RPS with 3,456+ concurrent users',
        'Migrated 600+ package monorepo from Babel to SWC, cutting build times by 65-70% and saving hundreds of developer hours monthly',
        'Led migration from GHES to GHEC with zero downtime, rebuilding CI/CD pipelines with GitHub Actions',
        'Developed robust session management services using GraphQL and PostgreSQL with production-ready observability',
      ],
      frontend: [
        'Led microfrontend architecture implementation using Module Federation, enabling independent deployments across teams',
        'Migrated 600+ package monorepo from Babel to SWC, cutting build times by 65-70% and improving hot module replacement',
        'Enhanced monorepo developer experience via webpack optimization, caching strategies, and build improvements',
        'Built reusable React component library with TypeScript, improving development velocity across teams',
      ],
      backend: [
        'Delivered MAP Growth on Ed integration platform with Hasura GraphQL backend and Spring Boot reactive action handlers',
        'Achieved 8,250+ RPS with 3,456+ concurrent users at 50% resource utilization via connection pooling and query optimization',
        'Developed robust session management services using GraphQL and PostgreSQL with production-ready observability',
        'Optimized Aurora PostgreSQL performance, reducing P95 latency from 7+ seconds to sub-100ms',
      ],
      fullstack: [
        'Delivered MAP Growth on Ed integration platform end-to-end with Hasura GraphQL backend and Spring Boot action handlers',
        'Achieved 8,250+ RPS with 3,456+ concurrent users at 50% resource utilization via connection pooling',
        'Migrated 600+ package monorepo from Babel to SWC, cutting build times by 65-70%',
        'Created reusable hasura-client-map package with React hooks, standardizing GraphQL patterns across teams',
      ],
      mobile: [
        'Delivered cross-platform educational features supporting millions of K-12 students globally',
        'Implemented real-time classroom integrations with third-party solutions at scale',
        'Built responsive, accessible interfaces optimized for tablet devices used in classrooms',
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
        'Implemented session management and insights collection for ED Platform and RCE, enabling real-time analytics',
        'Migrated universal analytics to GA4 across products ahead of sunset with zero tracking gaps',
        'Deployed session management service to Kubernetes with health checks, resource limits, and autoscaling',
        'Migrated monorepo to PNPM, cutting build time by ~50% and improving dependency management',
      ],
      frontend: [
        'Implemented session management and insights collection for ED Platform and RCE products',
        'Migrated universal analytics to GA4 across all products with zero tracking gaps',
        'Migrated monorepo to PNPM, cutting build time by ~50% and improving dependency resolution',
        'Improved frontend performance through code splitting and lazy loading strategies',
      ],
      backend: [
        'Deployed session management service to Kubernetes with health checks, resource limits, and autoscaling',
        'Created and deployed Concourse CI/CD pipelines for backend automation and release reliability',
        'Built Node.js services for real-time analytics and session tracking',
        'Designed RESTful APIs for cross-service communication and data synchronization',
      ],
      fullstack: [
        'Implemented session management and insights collection for ED Platform enabling real-time analytics',
        'Deployed session management service to Kubernetes with health checks and autoscaling',
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
];

export interface ProjectItem {
  name: string;
  description: string;
  technologies: string[];
  impact: string;
  link?: string;
}

export const projects: Record<string, ProjectItem[]> = {
  default: [
    {
      name: 'HMH Learning Platform',
      description: 'High-performance EdTech platform serving millions of students with sub-100ms P99 latency',
      technologies: ['React', 'TypeScript', 'Spring Boot', 'GraphQL', 'Kubernetes'],
      impact: '8,250+ RPS, 99.9% uptime',
    },
    {
      name: 'Database Performance Optimization',
      description: 'Resolved critical Aurora PostgreSQL bottlenecks through connection pooling',
      technologies: ['Aurora PostgreSQL', 'Hasura', 'Datadog', 'Gatling'],
      impact: '90% reduction in P95 latency',
    },
    {
      name: 'Build Performance Engineering',
      description: 'Migrated 600+ package monorepo from Babel to SWC',
      technologies: ['SWC', 'Webpack', 'PNPM', 'TypeScript'],
      impact: '65-70% faster builds',
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
      name: 'Session Management Service',
      description: 'High-throughput session service with Kubernetes deployment',
      technologies: ['Spring Boot', 'PostgreSQL', 'Kubernetes', 'GraphQL'],
      impact: 'Zero critical incidents',
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
      name: 'Build & Database Optimization',
      description: 'Full-stack performance improvements across build tools and databases',
      technologies: ['SWC', 'Aurora PostgreSQL', 'Webpack', 'Hasura'],
      impact: '65-70% faster builds',
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
};

export const skills: Record<string, { primary: string[]; secondary: string[]; additional: string[] }> = {
  default: {
    primary: ['React', 'TypeScript', 'Spring Boot', 'GraphQL', 'PostgreSQL', 'Kubernetes'],
    secondary: ['Node.js', 'Hasura', 'Docker', 'AWS', 'Git', 'CI/CD'],
    additional: ['Webpack', 'Microservices', 'Performance Engineering', 'System Design'],
  },
  frontend: {
    primary: ['React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS'],
    secondary: ['Webpack', 'Vite', 'Module Federation', 'SWC', 'Framer Motion', 'Next.js'],
    additional: ['State Management', 'Web Accessibility', 'Performance Optimization', 'Responsive Design'],
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
    secondary: ['React Native', 'Material Design', 'Location Services', 'Push Notifications', 'Coroutines'],
    additional: ['Offline-First Architecture', 'Mobile Performance', 'App Store Deployment', 'PWA'],
  },
};

export const summaries: Record<string, string> = {
  default: `Software Engineer with 2+ years of experience building high-performance, scalable systems at Houghton Mifflin Harcourt. Expertise in full-stack development with React, TypeScript, Spring Boot, and GraphQL. Delivered production systems handling 8,250+ RPS with sub-100ms latency. Passionate about developer experience, performance engineering, and building reliable software.`,

  frontend: `Frontend Engineer with 2+ years of experience specializing in React, TypeScript, and modern web technologies. Expert in microfrontend architecture, build optimization, and creating exceptional user experiences. Achieved 65-70% build time reduction through Babel to SWC migration in a 600+ package monorepo. Passionate about performance, accessibility, and developer experience.`,

  backend: `Backend Engineer with 2+ years of experience building high-throughput microservices with Spring Boot and GraphQL. Achieved 8,250+ RPS at 50% resource utilization through connection pooling and query optimization. Expert in database performance, Kubernetes deployments, and building production-ready systems with comprehensive observability.`,

  fullstack: `Full-Stack Developer with 2+ years of experience delivering end-to-end solutions at Houghton Mifflin Harcourt. Expert in React, TypeScript, Spring Boot, and GraphQL. Built platforms serving millions of students with 99.9% uptime. Proven track record in frontend architecture and backend systems.`,

  mobile: `Mobile Developer with experience in native Android development using Kotlin and cross-platform solutions. Built Nimaz, an offline-first Islamic companion app with location-based features and reliable background processing. Skilled in MVVM architecture, Room database, WorkManager, and creating responsive, accessible mobile experiences.`,
};

export type CVVariant = 'default' | 'frontend' | 'backend' | 'fullstack' | 'mobile';

export interface RoleConfig {
  id: string;
  title: string;
  variant: CVVariant;
  color: string;
  colorRgb: string;
}

export const roleConfig: Record<string, RoleConfig> = {
  'software-engineer': {
    id: 'software-engineer',
    title: 'Software Engineer',
    variant: 'default',
    color: '#d4a574',
    colorRgb: '212, 165, 116',
  },
  'fullstack-developer': {
    id: 'fullstack-developer',
    title: 'Full-Stack Developer',
    variant: 'fullstack',
    color: '#4a9eff',
    colorRgb: '74, 158, 255',
  },
  'frontend-developer': {
    id: 'frontend-developer',
    title: 'Frontend Developer',
    variant: 'frontend',
    color: '#22d3ee',
    colorRgb: '34, 211, 238',
  },
  'backend-developer': {
    id: 'backend-developer',
    title: 'Backend Developer',
    variant: 'backend',
    color: '#34d399',
    colorRgb: '52, 211, 153',
  },
  'mobile-developer': {
    id: 'mobile-developer',
    title: 'Mobile Developer',
    variant: 'mobile',
    color: '#a855f7',
    colorRgb: '168, 85, 247',
  },
};
