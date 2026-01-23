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

// ATS-friendly color palette (high contrast, simple)
const colors = {
  black: '#000000',
  darkGray: '#333333',
  gray: '#555555',
  lightGray: '#888888',
  link: '#0066cc',
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
  xs: 9,
  sm: 10,
  base: 10.5,
  md: 11,
  lg: 12,
  xl: 14,
  name: 20,
}

const styles = StyleSheet.create({
  // Page layout
  page: {
    fontFamily: 'Helvetica',
    fontSize: font.base,
    color: colors.darkGray,
    paddingTop: 36,
    paddingBottom: 36,
    paddingHorizontal: 48,
    lineHeight: 1.35,
  },

  // Header section
  header: {
    marginBottom: sp.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.black,
    paddingBottom: sp.md,
  },
  name: {
    fontSize: font.name,
    fontFamily: 'Helvetica-Bold',
    color: colors.black,
    letterSpacing: 0.5,
    marginBottom: sp.xs,
  },
  title: {
    fontSize: font.xl,
    color: colors.gray,
    marginBottom: sp.md,
  },
  contactLine: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: sp.sm,
    alignItems: 'center',
  },
  contactText: {
    fontSize: font.sm,
    color: colors.darkGray,
  },
  contactLink: {
    fontSize: font.sm,
    color: colors.link,
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
  },
  summaryText: {
    fontSize: font.base,
    color: colors.darkGray,
    lineHeight: 1.5,
  },

  // Section styling
  section: {
    marginBottom: sp.lg,
  },
  sectionTitle: {
    fontSize: font.lg,
    fontFamily: 'Helvetica-Bold',
    color: colors.black,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: sp.sm,
    paddingBottom: sp.xs,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.gray,
  },

  // Skills (simple comma-separated for ATS)
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
    color: colors.gray,
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
    marginBottom: sp.xs,
  },
  bulletDot: {
    width: 10,
    fontSize: font.sm,
    color: colors.darkGray,
  },
  bulletText: {
    flex: 1,
    fontSize: font.sm,
    color: colors.darkGray,
    lineHeight: 1.4,
  },

  // Projects (linear list for ATS)
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
  projectType: {
    fontSize: font.xs,
    color: colors.lightGray,
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
    color: colors.gray,
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
    marginTop: sp.xl,
    paddingTop: sp.sm,
    borderTopWidth: 0.5,
    borderTopColor: colors.lightGray,
  },
  footerText: {
    fontSize: font.xs,
    color: colors.lightGray,
    textAlign: 'center',
  },
})

// Get summary based on role - uses actual personalData.description
const getSummary = (variant: string): string => {
  const base = personalData.description

  switch (variant) {
    case 'frontend':
      return `Frontend-focused ${base} Specializing in React, TypeScript, microfrontend architecture, and build optimization.`
    case 'backend':
      return `Backend-focused ${base} Specializing in Spring Boot, GraphQL, database optimization, and distributed systems.`
    case 'fullstack':
      return `Full-stack ${base.replace('Software engineer', 'developer')} Equally proficient in frontend architecture and backend systems.`
    case 'mobile':
      return `${base} Additional expertise in Android development with Kotlin, offline-first architecture, and mobile app development.`
    default:
      return base
  }
}

// Get skills based on role - uses actual skillsData
const getSkills = (variant: string) => {
  const skills = skillsData.technical_skills

  switch (variant) {
    case 'frontend':
      return {
        languages: ['TypeScript', 'JavaScript', 'HTML5', 'CSS3'],
        frameworks: skills.frontend.skills.slice(0, 6),
        tools: [...skills.devops.skills.slice(0, 4), ...skills.testing.skills.slice(0, 2)],
      }
    case 'backend':
      return {
        languages: ['Java', 'Kotlin', 'TypeScript', 'SQL'],
        frameworks: skills.backend.skills.slice(0, 6),
        tools: [...skills.database.skills.slice(0, 4), ...skills.devops.skills.slice(0, 2)],
      }
    case 'fullstack':
      return {
        languages: ['TypeScript', 'Java', 'Kotlin', 'SQL'],
        frameworks: [...skills.frontend.skills.slice(0, 3), ...skills.backend.skills.slice(0, 3)],
        tools: [...skills.database.skills.slice(0, 3), ...skills.devops.skills.slice(0, 3)],
      }
    case 'mobile':
      return {
        languages: ['Kotlin', 'Java', 'TypeScript', 'SQL'],
        frameworks: skills.mobile.skills.slice(0, 6),
        tools: [...skills.database.skills.slice(0, 3), ...skills.testing.skills.slice(0, 3)],
      }
    default:
      return {
        languages: ['TypeScript', 'Java', 'Kotlin', 'SQL', 'HTML/CSS'],
        frameworks: [...skills.frontend.skills.slice(0, 3), ...skills.backend.skills.slice(0, 3)],
        tools: [...skills.database.skills.slice(0, 2), ...skills.devops.skills.slice(0, 4)],
      }
  }
}

// Get experience bullets based on role - uses actual experienceData
type Experience = (typeof experienceData.experience)[0]

const getExperienceBullets = (exp: Experience, variant: string): string[] => {
  const allBullets = [...exp.responsibilities, ...exp.achievements]

  // Role-specific keyword priorities for sorting relevance
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
    ],
    fullstack: [
      'end-to-end',
      'GraphQL',
      'React',
      'Spring Boot',
      'platform',
      'integration',
      'CI/CD',
    ],
    mobile: ['mobile', 'Android', 'app', 'real-time', 'engagement', 'classroom'],
    default: [],
  }

  const roleKeywords = keywords[variant] || keywords.default

  if (roleKeywords.length === 0) {
    return allBullets.slice(0, 4)
  }

  // Score bullets by keyword relevance and sort
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

// Get projects based on role - uses actual projectsData
const getProjects = (variant: string) => {
  const allProjects = projectsData.projects

  // Role-specific project priorities
  const priorities: Record<string, string[]> = {
    frontend: ['build-optimization', 'multi-tool', 'hmh-platform'],
    backend: ['db-optimization', 'hmh-platform', 'chrome-extension'],
    fullstack: ['hmh-platform', 'db-optimization', 'expense-tracker'],
    mobile: ['nimaz', 'hmh-platform', 'multi-tool'],
    default: ['hmh-platform', 'db-optimization', 'build-optimization'],
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
    <Document title={`${fullName} - ${config.title} CV`} author={fullName}>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{fullName.toUpperCase()}</Text>
          <Text style={styles.title}>{config.title}</Text>
          <View style={styles.contactLine}>
            <Text style={styles.contactText}>{personalData.email}</Text>
            <Text style={styles.contactSep}>|</Text>
            <Text style={styles.contactText}>{contactData.location.display}</Text>
            <Text style={styles.contactSep}>|</Text>
            <Link src="https://arshadshah.com" style={styles.contactLink}>
              arshadshah.com
            </Link>
            <Text style={styles.contactSep}>|</Text>
            <Link src={linkedIn?.url || ''} style={styles.contactLink}>
              LinkedIn
            </Link>
            <Text style={styles.contactSep}>|</Text>
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
                    {formatDate(exp.startDate, false)} - {formatDate(exp.endDate, exp.current)}
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
                <Text style={styles.projectType}>{project.type}</Text>
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
              <Text style={styles.eduDate}>2019 - 2023</Text>
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
