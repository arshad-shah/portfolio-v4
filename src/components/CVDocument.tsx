// Professional CV PDF Generator using @react-pdf/renderer
// Generates role-tailored CVs on-the-fly using actual portfolio data

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
} from '@react-pdf/renderer'
import type { RoleConfig } from '@/lib/cv-data'

// Import actual data from portfolio
import experienceData from '@/data/experience.json'
import projectsData from '@/data/projects.json'
import skillsData from '@/data/skills.json'
import personalData from '@/data/personal.json'
import contactData from '@/data/contact.json'

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

// Spacing system (in points)
const spacing = {
  xs: 4,
  sm: 6,
  md: 10,
  lg: 14,
  xl: 18,
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
    fontFamily: 'Helvetica',
    fontSize: fontSize.base,
    color: colors.primary,
    backgroundColor: colors.white,
    paddingTop: 32,
    paddingBottom: 40,
    paddingHorizontal: 36,
    lineHeight: 1.4,
  },
  header: {
    marginBottom: spacing.xl,
    paddingBottom: spacing.lg,
    borderBottomWidth: 2,
    borderBottomColor: colors.accent,
  },
  name: {
    fontSize: fontSize.xxl,
    fontFamily: 'Helvetica-Bold',
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  title: {
    fontSize: fontSize.lg,
    fontFamily: 'Helvetica-Bold',
    color: colors.accent,
    marginBottom: spacing.md,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
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
  },
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
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: fontSize.md,
    fontFamily: 'Helvetica-Bold',
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.md,
    paddingBottom: spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  skillsContainer: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  skillCategory: {
    flex: 1,
    padding: spacing.sm,
    backgroundColor: colors.bgLight,
  },
  skillCategoryTitle: {
    fontSize: fontSize.xs,
    fontFamily: 'Helvetica-Bold',
    color: colors.accent,
    textTransform: 'uppercase',
    marginBottom: spacing.xs,
  },
  skillList: {
    fontSize: fontSize.sm,
    color: colors.secondary,
    lineHeight: 1.5,
  },
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
    fontFamily: 'Helvetica-Bold',
    color: colors.primary,
  },
  experienceCompany: {
    fontSize: fontSize.md,
    fontFamily: 'Helvetica-Bold',
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
  },
  projectName: {
    fontSize: fontSize.sm,
    fontFamily: 'Helvetica-Bold',
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
    fontFamily: 'Helvetica-Bold',
    color: colors.accent,
  },
  educationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: spacing.md,
    backgroundColor: colors.bgLight,
  },
  educationMain: {
    flex: 1,
  },
  educationDegree: {
    fontSize: fontSize.base,
    fontFamily: 'Helvetica-Bold',
    color: colors.primary,
  },
  educationSchool: {
    fontSize: fontSize.sm,
    fontFamily: 'Helvetica-Bold',
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
    fontFamily: 'Helvetica-Bold',
    color: colors.accent,
  },
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
        primary: skills.frontend.skills.slice(0, 6),
        secondary: skills.devops.skills.slice(0, 6),
        additional: skills.testing.skills.slice(0, 4),
      }
    case 'backend':
      return {
        primary: skills.backend.skills.slice(0, 6),
        secondary: skills.database.skills.slice(0, 6),
        additional: skills.devops.skills.slice(0, 4),
      }
    case 'fullstack':
      return {
        primary: [...skills.frontend.skills.slice(0, 3), ...skills.backend.skills.slice(0, 3)],
        secondary: [...skills.database.skills.slice(0, 3), ...skills.devops.skills.slice(0, 3)],
        additional: skillsData.core_competencies.slice(0, 4),
      }
    case 'mobile':
      return {
        primary: skills.mobile.skills.slice(0, 6),
        secondary: skills.backend.skills.slice(0, 6),
        additional: skills.database.skills.slice(0, 4),
      }
    default:
      return {
        primary: [...skills.frontend.skills.slice(0, 3), ...skills.backend.skills.slice(0, 3)],
        secondary: [...skills.database.skills.slice(0, 3), ...skills.devops.skills.slice(0, 3)],
        additional: skillsData.core_competencies.slice(0, 4),
      }
  }
}

// Get experience bullets based on role - uses actual experienceData
type Experience = typeof experienceData.experience[0]

const getExperienceBullets = (exp: Experience, variant: string): string[] => {
  const allBullets = [...exp.responsibilities, ...exp.achievements]

  // Role-specific keyword priorities for sorting relevance
  const keywords: Record<string, string[]> = {
    frontend: ['React', 'TypeScript', 'webpack', 'frontend', 'microfrontend', 'build', 'UI', 'SWC', 'Module Federation', 'PNPM'],
    backend: ['Spring Boot', 'GraphQL', 'API', 'database', 'PostgreSQL', 'Kubernetes', 'backend', 'service', 'RPS', 'Hasura'],
    fullstack: ['end-to-end', 'GraphQL', 'React', 'Spring Boot', 'platform', 'integration', 'CI/CD'],
    mobile: ['mobile', 'Android', 'app', 'real-time', 'engagement', 'classroom'],
    default: [],
  }

  const roleKeywords = keywords[variant] || keywords.default

  if (roleKeywords.length === 0) {
    return allBullets.slice(0, 4)
  }

  // Score bullets by keyword relevance and sort
  const scored = allBullets.map(bullet => ({
    bullet,
    score: roleKeywords.reduce((acc, kw) => acc + (bullet.toLowerCase().includes(kw.toLowerCase()) ? 1 : 0), 0),
  }))

  scored.sort((a, b) => b.score - a.score)
  return scored.slice(0, 4).map(s => s.bullet)
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
    .map(id => allProjects.find(p => p.id === id))
    .filter((p): p is typeof allProjects[0] => p !== undefined)
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
  const linkedIn = contactData.social_links.find(s => s.platform === 'LinkedIn')
  const github = contactData.social_links.find(s => s.platform === 'GitHub')

  return (
    <Document title={`${fullName} - ${config.title} CV`} author={fullName}>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{fullName}</Text>
          <Text style={styles.title}>{config.title}</Text>
          <View style={styles.contactRow}>
            <Text style={styles.contactItem}>{personalData.email}</Text>
            <Text style={styles.contactSeparator}> • </Text>
            <Text style={styles.contactItem}>{contactData.location.display}</Text>
            <Text style={styles.contactSeparator}> • </Text>
            <Link src="https://arshadshah.com" style={styles.contactLink}>arshadshah.com</Link>
            <Text style={styles.contactSeparator}> • </Text>
            <Link src={linkedIn?.url || ''} style={styles.contactLink}>LinkedIn</Link>
            <Text style={styles.contactSeparator}> • </Text>
            <Link src={github?.url || ''} style={styles.contactLink}>GitHub</Link>
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
          {experienceData.experience.map((exp) => (
            <View key={exp.id} style={styles.experienceItem}>
              <View style={styles.experienceHeader}>
                <View>
                  <Text style={styles.experienceTitle}>{exp.position}</Text>
                  <Text style={styles.experienceCompany}>{exp.company}</Text>
                </View>
                <View>
                  <Text style={styles.experienceMeta}>
                    {formatDate(exp.startDate, false)} – {formatDate(exp.endDate, exp.current)}
                  </Text>
                  <Text style={styles.experienceMeta}>{exp.location}</Text>
                </View>
              </View>
              <View style={styles.bulletList}>
                {getExperienceBullets(exp, variant).map((bullet, index) => (
                  <View key={index} style={styles.bulletItem}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.bulletText}>{bullet}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>

        {/* Projects */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Projects</Text>
          <View style={styles.projectsGrid}>
            {projects.map((project) => (
              <View key={project.id} style={styles.projectCard}>
                <Text style={styles.projectName}>{project.title}</Text>
                <Text style={styles.projectDescription}>
                  {project.description.length > 100
                    ? project.description.substring(0, 97) + '...'
                    : project.description}
                </Text>
                <Text style={styles.projectTech}>
                  {project.technologies.slice(0, 4).join(' • ')}
                </Text>
                <Text style={styles.projectImpact}>
                  {project.impact[0].length > 50
                    ? project.impact[0].substring(0, 47) + '...'
                    : project.impact[0]}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Education */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          <View style={styles.educationItem}>
            <View style={styles.educationMain}>
              <Text style={styles.educationDegree}>BSc (Hons) Computer Science</Text>
              <Text style={styles.educationSchool}>{personalData.alumniOf.name}</Text>
              <Text style={styles.educationMeta}>2019 – 2023 • Dublin, Ireland</Text>
            </View>
            <View style={styles.educationGrade}>
              <Text style={styles.gradeLabel}>Grade</Text>
              <Text style={styles.gradeValue}>First Class Honours</Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          References available upon request
        </Text>
      </Page>
    </Document>
  )
}

export default CVDocument
