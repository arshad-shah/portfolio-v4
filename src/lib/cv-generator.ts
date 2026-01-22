import { jsPDF } from 'jspdf'
import personalData from '../data/personal.json'
import experienceData from '../data/experience.json'
import projectsData from '../data/projects.json'
import cvRolesData from '../data/cv-roles.json'

interface CVRole {
  id: string
  title: string
  subtitle: string
  icon: string
  color: string
  description: string
  summary: string
  highlightedSkills: string[]
  experienceEmphasis: Record<string, number[] | string[]>
  projectIds: string[]
}

interface Experience {
  id: string
  company: string
  position: string
  location: string
  startDate: string
  endDate: string | null
  current: boolean
  description: string
  responsibilities: string[]
  technologies: string[]
  achievements: string[]
}

interface Project {
  id: string
  title: string
  category: string
  type: string
  description: string
  impact: string[]
  technologies: string[]
  year: number
}

// Color palette for the CV
const COLORS = {
  primary: '#0a0e27',
  secondary: '#4a9eff',
  accent: '#d4a574',
  text: '#1a1a2e',
  textLight: '#4a4a6a',
  divider: '#e0e0e0',
}

// PDF dimensions and margins
const PAGE_WIDTH = 210 // A4 width in mm
const PAGE_HEIGHT = 297 // A4 height in mm
const MARGIN = 20
const CONTENT_WIDTH = PAGE_WIDTH - 2 * MARGIN

function formatDate(dateStr: string | null, isCurrent: boolean): string {
  if (isCurrent) return 'Present'
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

function wrapText(doc: jsPDF, text: string, maxWidth: number, fontSize: number): string[] {
  doc.setFontSize(fontSize)
  const words = text.split(' ')
  const lines: string[] = []
  let currentLine = ''

  words.forEach((word) => {
    const testLine = currentLine ? `${currentLine} ${word}` : word
    const testWidth = doc.getTextWidth(testLine)

    if (testWidth > maxWidth && currentLine) {
      lines.push(currentLine)
      currentLine = word
    } else {
      currentLine = testLine
    }
  })

  if (currentLine) {
    lines.push(currentLine)
  }

  return lines
}

class CVGenerator {
  private doc: jsPDF
  private y: number
  private role: CVRole

  constructor(roleId: string) {
    this.doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    })
    this.y = MARGIN
    this.role = cvRolesData.roles.find((r) => r.id === roleId) || cvRolesData.roles[0]
  }

  private checkPageBreak(neededSpace: number): void {
    if (this.y + neededSpace > PAGE_HEIGHT - MARGIN) {
      this.doc.addPage()
      this.y = MARGIN
    }
  }

  private drawHeader(): void {
    // Name
    this.doc.setFont('helvetica', 'bold')
    this.doc.setFontSize(28)
    this.doc.setTextColor(COLORS.primary)
    const fullName = `${personalData.name.first} ${personalData.name.last}`
    this.doc.text(fullName, MARGIN, this.y)
    this.y += 10

    // Title
    this.doc.setFont('helvetica', 'normal')
    this.doc.setFontSize(14)
    this.doc.setTextColor(COLORS.secondary)
    this.doc.text(this.role.title, MARGIN, this.y)
    this.y += 8

    // Contact info line
    this.doc.setFontSize(10)
    this.doc.setTextColor(COLORS.textLight)
    const contactLine = [
      personalData.email,
      personalData.location.display,
      'linkedin.com/in/arshadshah',
      'github.com/arshad-shah',
    ].join('  |  ')
    this.doc.text(contactLine, MARGIN, this.y)
    this.y += 5

    // Divider
    this.drawDivider()
  }

  private drawDivider(): void {
    this.y += 3
    this.doc.setDrawColor(COLORS.divider)
    this.doc.setLineWidth(0.5)
    this.doc.line(MARGIN, this.y, PAGE_WIDTH - MARGIN, this.y)
    this.y += 6
  }

  private drawSectionTitle(title: string): void {
    this.checkPageBreak(15)
    this.doc.setFont('helvetica', 'bold')
    this.doc.setFontSize(12)
    this.doc.setTextColor(COLORS.primary)
    this.doc.text(title.toUpperCase(), MARGIN, this.y)
    this.y += 2

    // Section underline
    this.doc.setDrawColor(COLORS.secondary)
    this.doc.setLineWidth(1)
    this.doc.line(MARGIN, this.y, MARGIN + 40, this.y)
    this.y += 6
  }

  private drawSummary(): void {
    this.drawSectionTitle('Professional Summary')

    this.doc.setFont('helvetica', 'normal')
    this.doc.setFontSize(10)
    this.doc.setTextColor(COLORS.text)

    const lines = wrapText(this.doc, this.role.summary, CONTENT_WIDTH, 10)
    lines.forEach((line) => {
      this.checkPageBreak(5)
      this.doc.text(line, MARGIN, this.y)
      this.y += 5
    })

    this.y += 4
  }

  private drawSkills(): void {
    this.drawSectionTitle('Technical Skills')

    const skills = this.role.highlightedSkills
    const skillsPerRow = 4
    const skillWidth = CONTENT_WIDTH / skillsPerRow

    this.doc.setFont('helvetica', 'normal')
    this.doc.setFontSize(10)
    this.doc.setTextColor(COLORS.text)

    for (let i = 0; i < skills.length; i += skillsPerRow) {
      this.checkPageBreak(6)
      const rowSkills = skills.slice(i, i + skillsPerRow)
      rowSkills.forEach((skill, index) => {
        const x = MARGIN + index * skillWidth
        // Bullet point
        this.doc.setFillColor(COLORS.secondary)
        this.doc.circle(x + 1.5, this.y - 1.5, 1, 'F')
        this.doc.text(skill, x + 5, this.y)
      })
      this.y += 6
    }

    this.y += 2
  }

  private drawExperience(): void {
    this.drawSectionTitle('Professional Experience')

    const experiences = experienceData.experience as Experience[]

    experiences.forEach((exp) => {
      this.checkPageBreak(30)

      // Company and position
      this.doc.setFont('helvetica', 'bold')
      this.doc.setFontSize(11)
      this.doc.setTextColor(COLORS.primary)
      this.doc.text(exp.position, MARGIN, this.y)

      // Date on the right
      this.doc.setFont('helvetica', 'normal')
      this.doc.setFontSize(10)
      this.doc.setTextColor(COLORS.textLight)
      const dateRange = `${formatDate(exp.startDate, false)} - ${formatDate(exp.endDate, exp.current)}`
      const dateWidth = this.doc.getTextWidth(dateRange)
      this.doc.text(dateRange, PAGE_WIDTH - MARGIN - dateWidth, this.y)
      this.y += 5

      // Company and location
      this.doc.setFont('helvetica', 'italic')
      this.doc.setFontSize(10)
      this.doc.setTextColor(COLORS.textLight)
      this.doc.text(`${exp.company}  |  ${exp.location}`, MARGIN, this.y)
      this.y += 6

      // Get responsibilities based on role emphasis
      const emphasis = this.role.experienceEmphasis[exp.id]
      let responsibilities = exp.responsibilities

      if (emphasis && Array.isArray(emphasis) && emphasis[0] !== 'all') {
        responsibilities = (emphasis as number[])
          .map((i) => exp.responsibilities[i])
          .filter(Boolean)
      }

      // Responsibilities
      this.doc.setFont('helvetica', 'normal')
      this.doc.setFontSize(9)
      this.doc.setTextColor(COLORS.text)

      responsibilities.forEach((resp) => {
        this.checkPageBreak(8)
        const bulletX = MARGIN + 2
        const textX = MARGIN + 6
        const lines = wrapText(this.doc, resp, CONTENT_WIDTH - 6, 9)

        this.doc.text('\u2022', bulletX, this.y)
        lines.forEach((line, lineIndex) => {
          if (lineIndex > 0) {
            this.checkPageBreak(4)
          }
          this.doc.text(line, textX, this.y)
          this.y += 4
        })
      })

      // Key achievements (first 2)
      if (exp.achievements && exp.achievements.length > 0) {
        this.y += 1
        this.doc.setFont('helvetica', 'bold')
        this.doc.setFontSize(9)
        this.doc.setTextColor(COLORS.secondary)
        this.doc.text('Key Achievements:', MARGIN + 2, this.y)
        this.y += 4

        this.doc.setFont('helvetica', 'normal')
        this.doc.setTextColor(COLORS.text)

        exp.achievements.slice(0, 2).forEach((achievement) => {
          this.checkPageBreak(8)
          const bulletX = MARGIN + 4
          const textX = MARGIN + 8
          const lines = wrapText(this.doc, achievement, CONTENT_WIDTH - 8, 9)

          this.doc.text('\u25B8', bulletX, this.y)
          lines.forEach((line, lineIndex) => {
            if (lineIndex > 0) {
              this.checkPageBreak(4)
            }
            this.doc.text(line, textX, this.y)
            this.y += 4
          })
        })
      }

      this.y += 4
    })
  }

  private drawProjects(): void {
    this.drawSectionTitle('Notable Projects')

    const allProjects = projectsData.projects as Project[]
    const relevantProjects = this.role.projectIds
      .map((id) => allProjects.find((p) => p.id === id))
      .filter(Boolean)
      .slice(0, 3) as Project[]

    relevantProjects.forEach((project) => {
      this.checkPageBreak(20)

      // Project title and type
      this.doc.setFont('helvetica', 'bold')
      this.doc.setFontSize(10)
      this.doc.setTextColor(COLORS.primary)
      this.doc.text(project.title, MARGIN, this.y)

      this.doc.setFont('helvetica', 'normal')
      this.doc.setFontSize(9)
      this.doc.setTextColor(COLORS.textLight)
      const typeWidth = this.doc.getTextWidth(project.type)
      this.doc.text(project.type, PAGE_WIDTH - MARGIN - typeWidth, this.y)
      this.y += 5

      // Description
      this.doc.setFont('helvetica', 'normal')
      this.doc.setFontSize(9)
      this.doc.setTextColor(COLORS.text)

      const descLines = wrapText(this.doc, project.description, CONTENT_WIDTH, 9)
      descLines.slice(0, 2).forEach((line) => {
        this.checkPageBreak(4)
        this.doc.text(line, MARGIN, this.y)
        this.y += 4
      })

      // Impact (first item)
      if (project.impact && project.impact.length > 0) {
        this.checkPageBreak(4)
        this.doc.setTextColor(COLORS.secondary)
        const impactLines = wrapText(this.doc, `\u2713 ${project.impact[0]}`, CONTENT_WIDTH, 9)
        impactLines.forEach((line) => {
          this.doc.text(line, MARGIN, this.y)
          this.y += 4
        })
      }

      // Technologies
      this.doc.setFont('helvetica', 'italic')
      this.doc.setFontSize(8)
      this.doc.setTextColor(COLORS.textLight)
      const techStr = `Technologies: ${project.technologies.slice(0, 6).join(', ')}`
      const techLines = wrapText(this.doc, techStr, CONTENT_WIDTH, 8)
      techLines.forEach((line) => {
        this.checkPageBreak(4)
        this.doc.text(line, MARGIN, this.y)
        this.y += 4
      })

      this.y += 3
    })
  }

  private drawEducation(): void {
    this.drawSectionTitle('Education')

    const edu = cvRolesData.education

    this.doc.setFont('helvetica', 'bold')
    this.doc.setFontSize(11)
    this.doc.setTextColor(COLORS.primary)
    this.doc.text(edu.degree, MARGIN, this.y)

    this.doc.setFont('helvetica', 'normal')
    this.doc.setFontSize(10)
    this.doc.setTextColor(COLORS.textLight)
    const yearWidth = this.doc.getTextWidth(edu.graduationYear)
    this.doc.text(edu.graduationYear, PAGE_WIDTH - MARGIN - yearWidth, this.y)
    this.y += 5

    this.doc.setFont('helvetica', 'italic')
    this.doc.text(`${edu.institution}  |  ${edu.location}`, MARGIN, this.y)
    this.y += 6
  }

  private drawLanguages(): void {
    this.checkPageBreak(15)
    this.drawSectionTitle('Languages')

    const languages = cvRolesData.languages
    this.doc.setFont('helvetica', 'normal')
    this.doc.setFontSize(10)
    this.doc.setTextColor(COLORS.text)

    const langStr = languages.map((l) => `${l.name} (${l.level})`).join('  |  ')
    this.doc.text(langStr, MARGIN, this.y)
    this.y += 6
  }

  private drawFooter(): void {
    // Add a subtle footer on the last page
    const footerY = PAGE_HEIGHT - 10
    this.doc.setFont('helvetica', 'italic')
    this.doc.setFontSize(8)
    this.doc.setTextColor(COLORS.textLight)

    const footerText = `Generated on ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} | arshadshah.com`
    const footerWidth = this.doc.getTextWidth(footerText)
    this.doc.text(footerText, (PAGE_WIDTH - footerWidth) / 2, footerY)
  }

  public generate(): jsPDF {
    this.drawHeader()
    this.drawSummary()
    this.drawSkills()
    this.drawExperience()
    this.drawProjects()
    this.drawEducation()
    this.drawLanguages()
    this.drawFooter()

    return this.doc
  }

  public download(): void {
    const doc = this.generate()
    const fileName = `Arshad_Shah_${this.role.title.replace(/\s+/g, '_')}_CV.pdf`
    doc.save(fileName)
  }

  public getBlob(): Blob {
    const doc = this.generate()
    return doc.output('blob')
  }
}

export function generateCV(roleId: string): void {
  const generator = new CVGenerator(roleId)
  generator.download()
}

export function getCVBlob(roleId: string): Blob {
  const generator = new CVGenerator(roleId)
  return generator.getBlob()
}

export function getCVRoles(): CVRole[] {
  return cvRolesData.roles
}

export { CVGenerator }
