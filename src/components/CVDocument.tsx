// Professional CV PDF Generator using @react-pdf/renderer
// Generates ATS-optimized, beautifully formatted CVs on-the-fly

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
  Font,
} from '@react-pdf/renderer'
import type { CVVariant, RoleConfig } from '@/lib/cv-data'

// Register fonts for professional typography
Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff2', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fAZ9hjp-Ek-_EeA.woff2', fontWeight: 500 },
    { src: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hjp-Ek-_EeA.woff2', fontWeight: 600 },
    { src: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hjp-Ek-_EeA.woff2', fontWeight: 700 },
  ],
})

// Color palette
const colors = {
  primary: '#1a1a2e',
  secondary: '#4a4a6a',
  muted: '#6b7280',
  accent: '#2563eb',
  border: '#e5e7eb',
  bgLight: '#f8fafc',
  white: '#ffffff',
}

// Consistent spacing system (in points)
const spacing = {
  xs: 4,
  sm: 6,
  md: 10,
  lg: 14,
  xl: 18,
  xxl: 24,
}

// Typography scale
const fontSize = {
  xs: 8,
  sm: 9,
  base: 10,
  md: 11,
  lg: 14,
  xl: 18,
  xxl: 24,
}

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Inter',
    fontSize: fontSize.base,
    color: colors.primary,
    backgroundColor: colors.white,
    paddingTop: 32,
    paddingBottom: 32,
    paddingHorizontal: 36,
    lineHeight: 1.4,
  },

  // Header styles
  header: {
    marginBottom: spacing.xl,
    paddingBottom: spacing.lg,
    borderBottomWidth: 2,
    borderBottomColor: colors.accent,
  },
  name: {
    fontSize: fontSize.xxl,
    fontWeight: 700,
    color: colors.primary,
    marginBottom: spacing.xs,
    letterSpacing: -0.5,
  },
  title: {
    fontSize: fontSize.lg,
    fontWeight: 600,
    color: colors.accent,
    marginBottom: spacing.md,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  contactItem: {
    fontSize: fontSize.sm,
    color: colors.secondary,
  },
  contactLink: {
    fontSize: fontSize.sm,
    color: colors.accent,
    textDecoration: 'none',
  },
  contactSeparator: {
    fontSize: fontSize.sm,
    color: colors.muted,
    marginHorizontal: spacing.xs,
  },

  // Summary styles
  summary: {
    marginBottom: spacing.xl,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.bgLight,
    borderLeftWidth: 3,
    borderLeftColor: colors.accent,
  },
  summaryText: {
    fontSize: fontSize.base,
    color: colors.secondary,
    lineHeight: 1.6,
  },

  // Section styles
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: fontSize.md,
    fontWeight: 700,
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.md,
    paddingBottom: spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  // Skills styles
  skillsContainer: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  skillCategory: {
    flex: 1,
    padding: spacing.sm,
    backgroundColor: colors.bgLight,
    borderRadius: 3,
  },
  skillCategoryTitle: {
    fontSize: fontSize.xs,
    fontWeight: 600,
    color: colors.accent,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.xs,
  },
  skillList: {
    fontSize: fontSize.sm,
    color: colors.secondary,
    lineHeight: 1.5,
  },

  // Experience styles
  experienceItem: {
    marginBottom: spacing.lg,
    paddingLeft: spacing.md,
    borderLeftWidth: 2,
    borderLeftColor: colors.border,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.xs,
  },
  experienceTitle: {
    fontSize: fontSize.md,
    fontWeight: 700,
    color: colors.primary,
  },
  experienceCompany: {
    fontSize: fontSize.md,
    fontWeight: 600,
    color: colors.accent,
  },
  experienceMeta: {
    fontSize: fontSize.sm,
    color: colors.muted,
    textAlign: 'right',
  },
  bulletList: {
    marginTop: spacing.sm,
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: spacing.xs,
  },
  bullet: {
    width: 12,
    fontSize: fontSize.sm,
    color: colors.accent,
  },
  bulletText: {
    flex: 1,
    fontSize: fontSize.sm,
    color: colors.secondary,
    lineHeight: 1.5,
  },

  // Projects styles
  projectsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  projectCard: {
    width: '31%',
    padding: spacing.sm,
    backgroundColor: colors.bgLight,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 3,
  },
  projectName: {
    fontSize: fontSize.sm,
    fontWeight: 700,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  projectDescription: {
    fontSize: fontSize.xs,
    color: colors.secondary,
    marginBottom: spacing.xs,
    lineHeight: 1.4,
  },
  projectTech: {
    fontSize: 7,
    color: colors.muted,
    marginBottom: spacing.xs,
  },
  projectImpact: {
    fontSize: 7,
    fontWeight: 600,
    color: colors.accent,
  },

  // Education styles
  educationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: spacing.md,
    backgroundColor: colors.bgLight,
    borderRadius: 3,
  },
  educationMain: {
    flex: 1,
  },
  educationDegree: {
    fontSize: fontSize.base,
    fontWeight: 700,
    color: colors.primary,
  },
  educationSchool: {
    fontSize: fontSize.sm,
    fontWeight: 500,
    color: colors.accent,
  },
  educationMeta: {
    fontSize: fontSize.xs,
    color: colors.muted,
    marginTop: spacing.xs,
  },
  educationGrade: {
    textAlign: 'right',
  },
  gradeLabel: {
    fontSize: fontSize.xs,
    color: colors.muted,
  },
  gradeValue: {
    fontSize: fontSize.base,
    fontWeight: 700,
    color: colors.accent,
  },

  // Footer
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 36,
    right: 36,
    textAlign: 'center',
    fontSize: fontSize.xs,
    color: colors.muted,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
})

// CV Content - Improved copy and wording
const personalInfo = {
  name: 'Arshad Shah',
  email: 'arshad@arshadshah.com',
  location: 'Dublin, Ireland',
  website: 'arshadshah.com',
  linkedin: 'linkedin.com/in/arshadshah',
  github: 'github.com/arshad-shah',
}

const education = {
  degree: 'BSc (Hons) Computer Science',
  institution: 'Technological University Dublin',
  location: 'Dublin, Ireland',
  year: '2019 – 2023',
  grade: 'First Class Honours',
}

// Role-specific summaries with improved copy
const summaries: Record<CVVariant, string> = {
  default: 'Results-driven Software Engineer with 2+ years of experience delivering high-performance systems at scale. Built and optimized platforms handling 8,250+ requests per second with sub-100ms latency, serving millions of users. Core expertise in React, TypeScript, Spring Boot, and GraphQL, with a strong focus on performance engineering and developer experience. Proven ability to lead technical initiatives that significantly improve build times, system reliability, and team productivity.',

  frontend: 'Frontend Engineer with 2+ years of experience building performant, accessible web applications using React and TypeScript. Specialist in microfrontend architecture, build optimization, and creating exceptional user experiences at scale. Led migration from Babel to SWC across a 600+ package monorepo, achieving 65-70% faster build times. Passionate about developer tooling, web performance, and delivering polished interfaces that delight users.',

  backend: 'Backend Engineer with 2+ years of experience architecting high-throughput microservices and APIs. Delivered systems handling 8,250+ RPS at 50% resource utilization through strategic connection pooling and query optimization. Expert in Spring Boot, GraphQL, PostgreSQL, and Kubernetes. Track record of reducing P95 latency by 90% and building production-ready systems with comprehensive observability and zero critical incidents.',

  fullstack: 'Full-Stack Developer with 2+ years of experience delivering end-to-end solutions from database to user interface. Built platforms serving millions of students with 99.9% uptime at Houghton Mifflin Harcourt. Equally proficient in frontend architecture (React, microfrontends, build optimization) and backend systems (Spring Boot, GraphQL, database performance). Thrives in fast-paced environments requiring ownership across the entire stack.',

  mobile: 'Mobile Developer with expertise in native Android development using Kotlin and modern architectural patterns. Built Nimaz, a production offline-first app with location-based services, background processing, and Material Design 3. Strong foundation in MVVM, Room database, WorkManager, and Coroutines. Passionate about crafting responsive, accessible mobile experiences that work reliably under any network condition.',
}

// Role-specific experience highlights with improved action verbs and metrics
const experienceHighlights: Record<CVVariant, { current: string[]; previous: string[] }> = {
  default: {
    current: [
      'Architected and delivered MAP Growth integration platform with Hasura GraphQL and Spring Boot, achieving 8,250+ RPS with 3,456 concurrent users at 50% resource utilization',
      'Spearheaded build system migration from Babel to SWC across 600+ package monorepo, reducing build times by 65-70% and saving 200+ developer hours monthly',
      'Led zero-downtime migration from GitHub Enterprise Server to GitHub Enterprise Cloud, redesigning CI/CD pipelines with GitHub Actions',
      'Engineered session management services with GraphQL subscriptions, PostgreSQL, and comprehensive Datadog observability',
    ],
    previous: [
      'Built real-time session tracking and analytics collection for ED Platform, enabling data-driven product decisions',
      'Executed enterprise-wide Google Analytics 4 migration ahead of Universal Analytics sunset with zero tracking gaps',
      'Deployed containerized services to Kubernetes with health checks, resource limits, and horizontal autoscaling',
      'Accelerated monorepo builds by 50% through PNPM migration and dependency optimization',
    ],
  },
  frontend: {
    current: [
      'Led microfrontend architecture implementation using Webpack Module Federation, enabling independent deployments across 8 engineering teams',
      'Spearheaded Babel to SWC migration, achieving 65-70% faster builds and near-instant hot module replacement',
      'Built reusable React component library with TypeScript and Storybook, improving cross-team development velocity by 40%',
      'Optimized webpack configuration with advanced caching strategies, reducing CI pipeline duration by 35%',
    ],
    previous: [
      'Implemented session management UI with real-time analytics dashboards for product stakeholders',
      'Led Google Analytics 4 migration, implementing custom event tracking across all product surfaces',
      'Accelerated local development experience by 50% through PNPM migration and optimized dependency resolution',
      'Improved Core Web Vitals through code splitting, lazy loading, and bundle size optimization',
    ],
  },
  backend: {
    current: [
      'Designed and implemented high-throughput GraphQL backend with Hasura and Spring Boot reactive handlers, achieving 8,250+ RPS',
      'Optimized Aurora PostgreSQL performance through connection pooling tuning and query optimization, reducing P95 latency by 90%',
      'Built production-ready session management microservice with comprehensive Datadog metrics, traces, and alerting',
      'Implemented reactive data pipelines with Spring WebFlux handling thousands of concurrent WebSocket connections',
    ],
    previous: [
      'Deployed containerized microservices to Kubernetes with health probes, resource quotas, and HPA autoscaling',
      'Designed and implemented Concourse CI/CD pipelines for automated testing, building, and deployment',
      'Built Node.js services for real-time event processing and analytics aggregation',
      'Created RESTful APIs with comprehensive OpenAPI documentation and contract testing',
    ],
  },
  fullstack: {
    current: [
      'Delivered end-to-end MAP Growth integration: React frontend, Hasura GraphQL middleware, and Spring Boot backend achieving 8,250+ RPS',
      'Optimized both build pipeline (65-70% faster) and database performance (90% latency reduction) across the stack',
      'Created hasura-client-map npm package with React hooks, standardizing GraphQL patterns across frontend teams',
      'Led GitHub Enterprise Cloud migration, redesigning CI/CD for both frontend and backend deployments',
    ],
    previous: [
      'Built full-stack session management: React dashboard with real-time updates and Node.js backend with PostgreSQL',
      'Executed GA4 migration across frontend tracking and backend event pipelines',
      'Deployed Kubernetes services with full observability stack integration',
      'Improved monorepo developer experience for both frontend and backend packages',
    ],
  },
  mobile: {
    current: [
      'Delivered cross-platform educational features reaching millions of K-12 students on tablet devices',
      'Implemented real-time classroom collaboration features using WebSocket connections with graceful offline fallback',
      'Built responsive, touch-optimized interfaces following WCAG 2.1 AA accessibility guidelines',
      'Optimized rendering performance for smooth 60fps interactions on resource-constrained classroom tablets',
    ],
    previous: [
      'Developed adaptive layouts supporting portrait/landscape orientations across diverse device sizes',
      'Implemented cross-platform analytics with consistent event schema across web and native surfaces',
      'Built offline-capable features with local caching and background sync on connectivity restoration',
      'Created comprehensive mobile development guidelines adopted across engineering organization',
    ],
  },
}

// Role-specific skills
const skillSets: Record<CVVariant, { primary: string[]; secondary: string[]; additional: string[] }> = {
  default: {
    primary: ['React', 'TypeScript', 'Spring Boot', 'GraphQL', 'PostgreSQL', 'Kubernetes'],
    secondary: ['Node.js', 'Hasura', 'Docker', 'AWS', 'GitHub Actions', 'Datadog'],
    additional: ['System Design', 'Performance Engineering', 'Microservices', 'CI/CD'],
  },
  frontend: {
    primary: ['React', 'TypeScript', 'JavaScript ES6+', 'HTML5', 'CSS3', 'Tailwind CSS'],
    secondary: ['Webpack', 'Vite', 'Module Federation', 'SWC', 'Framer Motion', 'Storybook'],
    additional: ['Web Accessibility', 'Performance Optimization', 'Design Systems', 'Testing Library'],
  },
  backend: {
    primary: ['Spring Boot', 'Java', 'GraphQL', 'PostgreSQL', 'Kubernetes', 'Docker'],
    secondary: ['Hasura', 'Node.js', 'Redis', 'Kafka', 'AWS', 'Datadog'],
    additional: ['Database Optimization', 'System Design', 'Microservices', 'Observability'],
  },
  fullstack: {
    primary: ['React', 'TypeScript', 'Spring Boot', 'GraphQL', 'PostgreSQL', 'Kubernetes'],
    secondary: ['Hasura', 'Node.js', 'Docker', 'Webpack', 'Module Federation', 'AWS'],
    additional: ['API Design', 'Database Design', 'Performance Engineering', 'CI/CD'],
  },
  mobile: {
    primary: ['Kotlin', 'Android SDK', 'Jetpack Compose', 'Room Database', 'WorkManager', 'Coroutines'],
    secondary: ['MVVM', 'Material Design 3', 'Location Services', 'Push Notifications', 'Retrofit'],
    additional: ['Offline-First Architecture', 'App Performance', 'Play Store Deployment', 'PWA'],
  },
}

// Role-specific projects with improved descriptions
const projectSets: Record<CVVariant, Array<{ name: string; description: string; tech: string; impact: string }>> = {
  default: [
    {
      name: 'HMH Learning Platform',
      description: 'EdTech platform serving millions of K-12 students globally',
      tech: 'React, Spring Boot, GraphQL, Kubernetes',
      impact: '8,250+ RPS, 99.9% uptime',
    },
    {
      name: 'Database Optimization',
      description: 'Aurora PostgreSQL performance tuning initiative',
      tech: 'PostgreSQL, Hasura, Datadog, Gatling',
      impact: '90% latency reduction',
    },
    {
      name: 'Build Performance',
      description: 'Monorepo build system modernization',
      tech: 'SWC, Webpack, PNPM, TypeScript',
      impact: '65-70% faster builds',
    },
  ],
  frontend: [
    {
      name: 'Microfrontend Architecture',
      description: 'Module Federation enabling independent team deployments',
      tech: 'React, Webpack, Module Federation',
      impact: 'Improved team autonomy',
    },
    {
      name: 'Build Optimization',
      description: 'Babel to SWC migration with caching strategies',
      tech: 'SWC, Webpack, PNPM, TypeScript',
      impact: '65-70% faster builds',
    },
    {
      name: 'Multi-Tool App',
      description: '22 productivity tools in one React application',
      tech: 'React, TypeScript, Tailwind, Vite',
      impact: 'tools.arshadshah.com',
    },
  ],
  backend: [
    {
      name: 'Integration Platform',
      description: 'High-throughput GraphQL API with reactive handlers',
      tech: 'Spring Boot, Hasura, GraphQL',
      impact: '8,250+ RPS achieved',
    },
    {
      name: 'Database Optimization',
      description: 'Connection pooling and query performance tuning',
      tech: 'Aurora PostgreSQL, Datadog, Gatling',
      impact: '90% P95 improvement',
    },
    {
      name: 'Session Service',
      description: 'Production microservice with full observability',
      tech: 'Spring Boot, PostgreSQL, Kubernetes',
      impact: 'Zero critical incidents',
    },
  ],
  fullstack: [
    {
      name: 'HMH Learning Platform',
      description: 'End-to-end EdTech solution at scale',
      tech: 'React, Spring Boot, GraphQL, K8s',
      impact: 'Millions of users served',
    },
    {
      name: 'Performance Engineering',
      description: 'Full-stack optimization initiative',
      tech: 'SWC, PostgreSQL, Webpack, Hasura',
      impact: '65% build, 90% DB gains',
    },
    {
      name: 'Expense Tracker',
      description: 'Real-time expense app with Firebase sync',
      tech: 'React, TypeScript, Firebase',
      impact: 'Open source project',
    },
  ],
  mobile: [
    {
      name: 'Nimaz',
      description: 'Offline-first Islamic companion app',
      tech: 'Kotlin, Room, WorkManager',
      impact: 'nimaz.arshadshah.com',
    },
    {
      name: 'HMH Mobile',
      description: 'Educational features for classroom tablets',
      tech: 'React, TypeScript, WebSockets',
      impact: 'Millions of students',
    },
    {
      name: 'Multi-Tool PWA',
      description: 'Mobile-optimized productivity tools',
      tech: 'React, PWA, Tailwind CSS',
      impact: 'Fully offline-capable',
    },
  ],
}

interface CVDocumentProps {
  roleId: string
  config: RoleConfig
}

export function CVDocument({ roleId, config }: CVDocumentProps) {
  const variant = config.variant
  const summary = summaries[variant]
  const highlights = experienceHighlights[variant]
  const skills = skillSets[variant]
  const projects = projectSets[variant]

  return (
    <Document title={`${personalInfo.name} - ${config.title} CV`} author={personalInfo.name}>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{personalInfo.name}</Text>
          <Text style={styles.title}>{config.title}</Text>
          <View style={styles.contactRow}>
            <Text style={styles.contactItem}>{personalInfo.email}</Text>
            <Text style={styles.contactSeparator}>•</Text>
            <Text style={styles.contactItem}>{personalInfo.location}</Text>
            <Text style={styles.contactSeparator}>•</Text>
            <Link src={`https://${personalInfo.website}`} style={styles.contactLink}>
              {personalInfo.website}
            </Link>
            <Text style={styles.contactSeparator}>•</Text>
            <Link src={`https://${personalInfo.linkedin}`} style={styles.contactLink}>
              LinkedIn
            </Link>
            <Text style={styles.contactSeparator}>•</Text>
            <Link src={`https://${personalInfo.github}`} style={styles.contactLink}>
              GitHub
            </Link>
          </View>
        </View>

        {/* Summary */}
        <View style={styles.summary}>
          <Text style={styles.summaryText}>{summary}</Text>
        </View>

        {/* Skills */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Technical Skills</Text>
          <View style={styles.skillsContainer}>
            <View style={styles.skillCategory}>
              <Text style={styles.skillCategoryTitle}>Core</Text>
              <Text style={styles.skillList}>{skills.primary.join(' • ')}</Text>
            </View>
            <View style={styles.skillCategory}>
              <Text style={styles.skillCategoryTitle}>Proficient</Text>
              <Text style={styles.skillList}>{skills.secondary.join(' • ')}</Text>
            </View>
            <View style={styles.skillCategory}>
              <Text style={styles.skillCategoryTitle}>Additional</Text>
              <Text style={styles.skillList}>{skills.additional.join(' • ')}</Text>
            </View>
          </View>
        </View>

        {/* Experience */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Experience</Text>

          {/* Current Role */}
          <View style={styles.experienceItem}>
            <View style={styles.experienceHeader}>
              <View>
                <Text style={styles.experienceTitle}>Software Engineer</Text>
                <Text style={styles.experienceCompany}>Houghton Mifflin Harcourt</Text>
              </View>
              <View>
                <Text style={styles.experienceMeta}>Mar 2024 – Present</Text>
                <Text style={styles.experienceMeta}>Dublin, Ireland</Text>
              </View>
            </View>
            <View style={styles.bulletList}>
              {highlights.current.map((item, index) => (
                <View key={index} style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Previous Role */}
          <View style={styles.experienceItem}>
            <View style={styles.experienceHeader}>
              <View>
                <Text style={styles.experienceTitle}>Associate Software Engineer</Text>
                <Text style={styles.experienceCompany}>Houghton Mifflin Harcourt</Text>
              </View>
              <View>
                <Text style={styles.experienceMeta}>Jun 2023 – Mar 2024</Text>
                <Text style={styles.experienceMeta}>Dublin, Ireland</Text>
              </View>
            </View>
            <View style={styles.bulletList}>
              {highlights.previous.map((item, index) => (
                <View key={index} style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Projects */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Projects</Text>
          <View style={styles.projectsGrid}>
            {projects.map((project, index) => (
              <View key={index} style={styles.projectCard}>
                <Text style={styles.projectName}>{project.name}</Text>
                <Text style={styles.projectDescription}>{project.description}</Text>
                <Text style={styles.projectTech}>{project.tech}</Text>
                <Text style={styles.projectImpact}>{project.impact}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Education */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          <View style={styles.educationItem}>
            <View style={styles.educationMain}>
              <Text style={styles.educationDegree}>{education.degree}</Text>
              <Text style={styles.educationSchool}>{education.institution}</Text>
              <Text style={styles.educationMeta}>{education.year} • {education.location}</Text>
            </View>
            <View style={styles.educationGrade}>
              <Text style={styles.gradeLabel}>Grade</Text>
              <Text style={styles.gradeValue}>{education.grade}</Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          References available upon request • Last updated January 2025
        </Text>
      </Page>
    </Document>
  )
}

export default CVDocument
