// Professional CV PDF Generator using @react-pdf/renderer
// Generates role-tailored CVs on-the-fly using actual portfolio data
// ATS-optimized layout with clean formatting

import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer'
import type { RoleConfig } from '@/lib/cv-data'

// Import actual data from portfolio
import experienceData from '@/data/experience.json'
import projectsData from '@/data/projects.json'
import skillsData from '@/data/skills.json'
import personalData from '@/data/personal.json'
import contactData from '@/data/contact.json'

// ATS-friendly color palette
const colors = {
  black: '#1a1a1a',
  darkGray: '#2d2d2d',
  gray: '#4a4a4a',
  lightGray: '#7a7a7a',
  accent: '#2563eb',
  accentLight: '#3b82f6',
  divider: '#e5e7eb',
  sectionBg: '#f8fafc',
}

// Consistent spacing system (in points)
const sp = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 20,
}

// ATS-optimized typography
const font = {
  xs: 8.5,
  sm: 9.5,
  base: 10,
  md: 10.5,
  lg: 11.5,
  xl: 13,
  name: 18,
}

const styles = StyleSheet.create({
  // Page layout
  page: {
    fontFamily: 'Helvetica',
    fontSize: font.base,
    color: colors.darkGray,
    paddingTop: 32,
    paddingBottom: 32,
    paddingHorizontal: 40,
    lineHeight: 1.4,
  },

  // Header
  header: {
    marginBottom: sp.lg,
    paddingBottom: sp.md,
    borderBottomWidth: 2,
    borderBottomColor: colors.accent,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: sp.sm,
  },
  name: {
    fontSize: font.name,
    fontFamily: 'Helvetica-Bold',
    color: colors.black,
    letterSpacing: 0.3,
  },
  title: {
    fontSize: font.xl,
    color: colors.accent,
    fontFamily: 'Helvetica-Bold',
    marginBottom: sp.sm,
  },
  contactLine: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: sp.sm,
    alignItems: 'center',
  },
  contactText: {
    fontSize: font.sm,
    color: colors.gray,
  },
  contactLink: {
    fontSize: font.sm,
    color: colors.accent,
    textDecoration: 'none',
  },
  contactSep: {
    fontSize: font.sm,
    color: colors.lightGray,
    marginHorizontal: sp.xs,
  },

  // Summary
  summary: {
    marginBottom: sp.lg,
    paddingVertical: sp.md,
    paddingHorizontal: sp.lg,
    backgroundColor: colors.sectionBg,
  },
  summaryText: {
    fontSize: font.base,
    color: colors.darkGray,
    lineHeight: 1.55,
  },

  // Section styling
  section: {
    marginBottom: sp.lg,
  },
  sectionTitle: {
    fontSize: font.lg,
    fontFamily: 'Helvetica-Bold',
    color: colors.accent,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: sp.sm,
    paddingBottom: sp.xs,
    borderBottomWidth: 0.75,
    borderBottomColor: colors.divider,
  },

  // Skills
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: sp.sm,
    marginBottom: sp.sm,
  },
  skillsRow: {
    marginBottom: sp.sm,
  },
  skillLabel: {
    fontSize: font.sm,
    fontFamily: 'Helvetica-Bold',
    color: colors.darkGray,
  },
  skillText: {
    fontSize: font.sm,
    color: colors.gray,
    lineHeight: 1.4,
  },

  // Experience
  expItem: {
    marginBottom: sp.lg,
  },
  expHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: sp.xs,
  },
  expLeft: {
    flex: 1,
  },
  expRight: {
    textAlign: 'right',
  },
  expPosition: {
    fontSize: font.md,
    fontFamily: 'Helvetica-Bold',
    color: colors.black,
  },
  expCompany: {
    fontSize: font.base,
    color: colors.accent,
    fontFamily: 'Helvetica-Bold',
  },
  expDate: {
    fontSize: font.sm,
    color: colors.gray,
  },
  expLocation: {
    fontSize: font.xs,
    color: colors.lightGray,
  },
  bulletList: {
    marginTop: sp.sm,
    paddingLeft: sp.md,
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  bulletDot: {
    width: 10,
    fontSize: font.sm,
    color: colors.accent,
  },
  bulletText: {
    flex: 1,
    fontSize: font.sm,
    color: colors.darkGray,
    lineHeight: 1.45,
  },

  // Projects
  projectItem: {
    marginBottom: sp.md,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: sp.xs,
  },
  projectName: {
    fontSize: font.base,
    fontFamily: 'Helvetica-Bold',
    color: colors.black,
  },
  projectImpact: {
    fontSize: font.xs,
    color: colors.accent,
    fontFamily: 'Helvetica-Bold',
  },
  projectDesc: {
    fontSize: font.sm,
    color: colors.darkGray,
    marginBottom: sp.xs,
    lineHeight: 1.4,
  },
  projectTech: {
    fontSize: font.xs,
    color: colors.gray,
    fontFamily: 'Helvetica-Oblique',
  },

  // Education
  eduItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  eduLeft: {
    flex: 1,
  },
  eduRight: {
    textAlign: 'right',
  },
  eduDegree: {
    fontSize: font.base,
    fontFamily: 'Helvetica-Bold',
    color: colors.black,
  },
  eduSchool: {
    fontSize: font.sm,
    color: colors.accent,
  },
  eduDate: {
    fontSize: font.sm,
    color: colors.gray,
  },
  eduGrade: {
    fontSize: font.sm,
    color: colors.darkGray,
  },

  // Footer
  footer: {
    marginTop: 'auto',
    paddingTop: sp.sm,
    borderTopWidth: 0.5,
    borderTopColor: colors.divider,
  },
  footerText: {
    fontSize: font.xs,
    color: colors.lightGray,
    textAlign: 'center',
  },
})

// Get summary based on role
const getSummary = (variant: string): string => {
  const summaries: Record<string, string> = {
    default: `Senior Software Engineer with 3+ years of progressive experience at Houghton Mifflin Harcourt. Rebuilt the RCE platform from scratch (10MB → 500KB), optimized EPUB parsing performance (8s → under 3s), and delivered high-throughput systems handling 8,250+ RPS. Expert in React, TypeScript, Spring Boot, and GraphQL. Proven track record in platform engineering, performance optimization, and maintaining real-time backend services at scale.`,
    frontend: `Senior Frontend Engineer with 3+ years specializing in React, TypeScript, and modern web architecture. Rebuilt the RCE platform from scratch achieving 95% bundle size reduction (10MB → 500KB). Expert in microfrontend systems, build optimization (65-70% faster builds via Babel → SWC), and performance-critical platform engineering.`,
    backend: `Senior Backend Engineer with 3+ years building high-throughput microservices with Spring Boot, GraphQL, and distributed systems. Achieved 8,250+ RPS at 50% resource utilization. Currently maintaining multiple backend services for real-time test-to-proctor API integrations and optimizing content delivery pipelines.`,
    fullstack: `Senior Full-Stack Developer with 3+ years delivering end-to-end platforms at HMH. Rebuilt the RCE platform from scratch (95% bundle reduction), optimized EPUB parsing (62% faster), and built systems serving millions with 99.9% uptime. Expert in React, TypeScript, Spring Boot, and GraphQL.`,
    mobile: `Senior Software Engineer with mobile development expertise in native Android (Kotlin) and cross-platform solutions. Built Nimaz, an offline-first app with location-based features. Currently delivering mobile-optimized features and content authoring experiences for educational platforms.`,
  }
  return summaries[variant] || summaries.default
}

// Get skills based on role
const getSkills = (variant: string) => {
  const skills = skillsData.technical_skills

  switch (variant) {
    case 'frontend':
      return {
        languages: ['TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS3'],
        frameworks: skills.frontend.skills.slice(0, 8),
        tools: [...skills.devops.skills.slice(0, 4), ...skills.testing.skills.slice(0, 2)],
      }
    case 'backend':
      return {
        languages: ['Java', 'Kotlin', 'TypeScript', 'SQL', 'Python'],
        frameworks: skills.backend.skills.slice(0, 8),
        tools: [...skills.database.skills.slice(0, 4), ...skills.devops.skills.slice(0, 3)],
      }
    case 'fullstack':
      return {
        languages: ['TypeScript', 'Java', 'Kotlin', 'SQL', 'Python'],
        frameworks: [...skills.frontend.skills.slice(0, 4), ...skills.backend.skills.slice(0, 4)],
        tools: [...skills.database.skills.slice(0, 3), ...skills.devops.skills.slice(0, 4)],
      }
    case 'mobile':
      return {
        languages: ['Kotlin', 'Java', 'TypeScript', 'SQL'],
        frameworks: skills.mobile.skills.slice(0, 8),
        tools: [...skills.database.skills.slice(0, 3), ...skills.testing.skills.slice(0, 3)],
      }
    default:
      return {
        languages: ['TypeScript', 'Java', 'Kotlin', 'SQL', 'Python', 'HTML/CSS'],
        frameworks: [...skills.frontend.skills.slice(0, 4), ...skills.backend.skills.slice(0, 4)],
        tools: [...skills.database.skills.slice(0, 3), ...skills.devops.skills.slice(0, 4)],
      }
  }
}

// Get experience bullets based on role
type Experience = (typeof experienceData.experience)[0]

const getExperienceBullets = (exp: Experience, variant: string): string[] => {
  const allBullets = [...exp.responsibilities, ...(exp.achievements || [])]

  const keywords: Record<string, string[]> = {
    frontend: [
      'React',
      'TypeScript',
      'webpack',
      'frontend',
      'microfrontend',
      'build',
      'UI',
      'SWC',
      'Module Federation',
      'PNPM',
      'component',
    ],
    backend: [
      'Spring Boot',
      'GraphQL',
      'API',
      'database',
      'PostgreSQL',
      'Kubernetes',
      'backend',
      'service',
      'RPS',
      'Hasura',
      'observability',
    ],
    fullstack: [
      'end-to-end',
      'GraphQL',
      'React',
      'Spring Boot',
      'platform',
      'integration',
      'CI/CD',
      'migration',
    ],
    mobile: ['mobile', 'Android', 'app', 'real-time', 'engagement', 'responsive'],
    default: [],
  }

  const roleKeywords = keywords[variant] || keywords.default

  if (roleKeywords.length === 0) {
    return allBullets.slice(0, 4)
  }

  const scored = allBullets.map((bullet) => ({
    bullet,
    score: roleKeywords.reduce(
      (acc, kw) => acc + (bullet.toLowerCase().includes(kw.toLowerCase()) ? 1 : 0),
      0
    ),
  }))

  scored.sort((a, b) => b.score - a.score)
  return scored.slice(0, 4).map((s) => s.bullet)
}

// Get projects based on role
const getProjects = (variant: string) => {
  const allProjects = projectsData.projects

  const priorities: Record<string, string[]> = {
    frontend: ['build-optimization', 'multi-tool', 'hmh-platform'],
    backend: ['db-optimization', 'hmh-platform', 'rce-rebuild'],
    fullstack: ['hmh-platform', 'rce-rebuild', 'expense-tracker'],
    mobile: ['nimaz', 'hmh-platform', 'multi-tool'],
    default: ['hmh-platform', 'rce-rebuild', 'db-optimization'],
  }

  const priorityIds = priorities[variant] || priorities.default

  return priorityIds
    .map((id) => allProjects.find((p) => p.id === id))
    .filter((p): p is (typeof allProjects)[0] => p !== undefined)
    .slice(0, 3)
}

// Format date helper
const formatDate = (dateStr: string | null, current: boolean) => {
  if (current) return 'Present'
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

interface CVDocumentProps {
  roleId: string
  config: RoleConfig
}

export function CVDocument({ config }: CVDocumentProps) {
  const variant = config.variant
  const summary = getSummary(variant)
  const skills = getSkills(variant)
  const projects = getProjects(variant)

  const fullName = `${personalData.name.first} ${personalData.name.last}`
  const linkedIn = contactData.social_links.find((s) => s.platform === 'LinkedIn')
  const github = contactData.social_links.find((s) => s.platform === 'GitHub')

  return (
    <Document title={`${fullName} — ${config.title} CV`} author={fullName}>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{fullName}</Text>
          </View>
          <Text style={styles.title}>{config.title}</Text>
          <View style={styles.contactLine}>
            <Text style={styles.contactText}>{personalData.email}</Text>
            <Text style={styles.contactSep}>•</Text>
            <Text style={styles.contactText}>{contactData.location.display}</Text>
            <Text style={styles.contactSep}>•</Text>
            <Link src="https://arshadshah.com" style={styles.contactLink}>
              arshadshah.com
            </Link>
            <Text style={styles.contactSep}>•</Text>
            <Link src={linkedIn?.url || ''} style={styles.contactLink}>
              LinkedIn
            </Link>
            <Text style={styles.contactSep}>•</Text>
            <Link src={github?.url || ''} style={styles.contactLink}>
              GitHub
            </Link>
          </View>
        </View>

        {/* Professional Summary */}
        <View style={styles.summary}>
          <Text style={styles.summaryText}>{summary}</Text>
        </View>

        {/* Technical Skills */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Technical Skills</Text>
          <View style={styles.skillsRow}>
            <Text>
              <Text style={styles.skillLabel}>Languages: </Text>
              <Text style={styles.skillText}>{skills.languages.join(', ')}</Text>
            </Text>
          </View>
          <View style={styles.skillsRow}>
            <Text>
              <Text style={styles.skillLabel}>Frameworks & Libraries: </Text>
              <Text style={styles.skillText}>{skills.frameworks.join(', ')}</Text>
            </Text>
          </View>
          <View style={styles.skillsRow}>
            <Text>
              <Text style={styles.skillLabel}>Tools & Platforms: </Text>
              <Text style={styles.skillText}>{skills.tools.join(', ')}</Text>
            </Text>
          </View>
        </View>

        {/* Professional Experience */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Experience</Text>
          {experienceData.experience.map((exp) => (
            <View key={exp.id} style={styles.expItem}>
              <View style={styles.expHeader}>
                <View style={styles.expLeft}>
                  <Text style={styles.expPosition}>{exp.position}</Text>
                  <Text style={styles.expCompany}>{exp.company}</Text>
                </View>
                <View style={styles.expRight}>
                  <Text style={styles.expDate}>
                    {formatDate(exp.startDate, false)} — {formatDate(exp.endDate, exp.current)}
                  </Text>
                  <Text style={styles.expLocation}>{exp.location}</Text>
                </View>
              </View>
              <View style={styles.bulletList}>
                {getExperienceBullets(exp, variant).map((bullet, index) => (
                  <View key={index} style={styles.bulletItem}>
                    <Text style={styles.bulletDot}>•</Text>
                    <Text style={styles.bulletText}>{bullet}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>

        {/* Key Projects */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Projects</Text>
          {projects.map((project) => (
            <View key={project.id} style={styles.projectItem}>
              <View style={styles.projectHeader}>
                <Text style={styles.projectName}>{project.title}</Text>
                {project.impact && project.impact.length > 0 && (
                  <Text style={styles.projectImpact}>{project.impact[0]}</Text>
                )}
              </View>
              <Text style={styles.projectDesc}>
                {project.challenge} {project.solution}
              </Text>
              <Text style={styles.projectTech}>
                Technologies: {project.technologies.slice(0, 6).join(', ')}
              </Text>
            </View>
          ))}
        </View>

        {/* Education */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          <View style={styles.eduItem}>
            <View style={styles.eduLeft}>
              <Text style={styles.eduDegree}>BSc (Hons) Computer Science</Text>
              <Text style={styles.eduSchool}>{personalData.alumniOf.name}</Text>
            </View>
            <View style={styles.eduRight}>
              <Text style={styles.eduDate}>2019 — 2023</Text>
              <Text style={styles.eduGrade}>Second Class Honours (2.1)</Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>References available upon request</Text>
        </View>
      </Page>
    </Document>
  )
}

export default CVDocument
