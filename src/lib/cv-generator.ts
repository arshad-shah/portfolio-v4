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

// Colors - professional and ATS-friendly
const COLORS = {
  black: '#000000',
  darkGray: '#333333',
  gray: '#666666',
  lightGray: '#999999',
  accent: '#2563eb', // Professional blue
}

// PDF dimensions and margins
const PAGE_WIDTH = 210 // A4 width in mm
const PAGE_HEIGHT = 297 // A4 height in mm
const MARGIN_LEFT = 18
const MARGIN_RIGHT = 18
const MARGIN_TOP = 18
const MARGIN_BOTTOM = 18
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN_LEFT - MARGIN_RIGHT

function formatDate(dateStr: string | null, isCurrent: boolean): string {
  if (isCurrent) return 'Present'
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

function wrapText(doc: jsPDF, text: string, maxWidth: number): string[] {
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
    this.y = MARGIN_TOP
    this.role = cvRolesData.roles.find((r) => r.id === roleId) || cvRolesData.roles[0]
  }

  private checkPageBreak(neededSpace: number): void {
    if (this.y + neededSpace > PAGE_HEIGHT - MARGIN_BOTTOM) {
      this.doc.addPage()
      this.y = MARGIN_TOP
    }
  }

  private drawHeader(): void {
    // Name - large and bold
    this.doc.setFont('helvetica', 'bold')
    this.doc.setFontSize(24)
    this.doc.setTextColor(COLORS.black)
    const fullName = `${personalData.name.first} ${personalData.name.last}`
    this.doc.text(fullName, MARGIN_LEFT, this.y)
    this.y += 8

    // Title
    this.doc.setFont('helvetica', 'normal')
    this.doc.setFontSize(12)
    this.doc.setTextColor(COLORS.accent)
    this.doc.text(this.role.title, MARGIN_LEFT, this.y)
    this.y += 6

    // Contact info - single line
    this.doc.setFontSize(9)
    this.doc.setTextColor(COLORS.gray)
    const contactParts = [
      personalData.email,
      personalData.location.display,
      'linkedin.com/in/arshadshah',
      'github.com/arshad-shah',
    ]
    this.doc.text(contactParts.join('  •  '), MARGIN_LEFT, this.y)
    this.y += 8

    // Horizontal line
    this.doc.setDrawColor(COLORS.lightGray)
    this.doc.setLineWidth(0.3)
    this.doc.line(MARGIN_LEFT, this.y, PAGE_WIDTH - MARGIN_RIGHT, this.y)
    this.y += 6
  }

  private drawSectionTitle(title: string): void {
    this.checkPageBreak(12)
    this.doc.setFont('helvetica', 'bold')
    this.doc.setFontSize(11)
    this.doc.setTextColor(COLORS.black)
    this.doc.text(title.toUpperCase(), MARGIN_LEFT, this.y)
    this.y += 1

    // Underline
    this.doc.setDrawColor(COLORS.accent)
    this.doc.setLineWidth(0.8)
    this.doc.line(MARGIN_LEFT, this.y, MARGIN_LEFT + 30, this.y)
    this.y += 5
  }

  private drawSummary(): void {
    this.drawSectionTitle('Summary')

    this.doc.setFont('helvetica', 'normal')
    this.doc.setFontSize(9.5)
    this.doc.setTextColor(COLORS.darkGray)

    const lines = wrapText(this.doc, this.role.summary, CONTENT_WIDTH)
    lines.forEach((line) => {
      this.checkPageBreak(4)
      this.doc.text(line, MARGIN_LEFT, this.y)
      this.y += 4.5
    })

    this.y += 4
  }

  private drawSkills(): void {
    this.drawSectionTitle('Technical Skills')

    this.doc.setFont('helvetica', 'normal')
    this.doc.setFontSize(9.5)
    this.doc.setTextColor(COLORS.darkGray)

    // Display skills in a comma-separated format for ATS
    const skillsText = this.role.highlightedSkills.join('  •  ')
    const lines = wrapText(this.doc, skillsText, CONTENT_WIDTH)

    lines.forEach((line) => {
      this.checkPageBreak(4)
      this.doc.text(line, MARGIN_LEFT, this.y)
      this.y += 4.5
    })

    this.y += 4
  }

  private drawExperience(): void {
    this.drawSectionTitle('Experience')

    const experiences = experienceData.experience as Experience[]

    experiences.forEach((exp) => {
      this.checkPageBreak(25)

      // Position and dates on same line
      this.doc.setFont('helvetica', 'bold')
      this.doc.setFontSize(10.5)
      this.doc.setTextColor(COLORS.black)
      this.doc.text(exp.position, MARGIN_LEFT, this.y)

      // Date on the right
      this.doc.setFont('helvetica', 'normal')
      this.doc.setFontSize(9)
      this.doc.setTextColor(COLORS.gray)
      const dateRange = `${formatDate(exp.startDate, false)} – ${formatDate(exp.endDate, exp.current)}`
      const dateWidth = this.doc.getTextWidth(dateRange)
      this.doc.text(dateRange, PAGE_WIDTH - MARGIN_RIGHT - dateWidth, this.y)
      this.y += 4.5

      // Company and location
      this.doc.setFont('helvetica', 'normal')
      this.doc.setFontSize(9.5)
      this.doc.setTextColor(COLORS.gray)
      this.doc.text(`${exp.company} • ${exp.location}`, MARGIN_LEFT, this.y)
      this.y += 5

      // Get responsibilities based on role emphasis
      const emphasis = this.role.experienceEmphasis[exp.id]
      let responsibilities = exp.responsibilities

      if (emphasis && Array.isArray(emphasis) && emphasis[0] !== 'all') {
        responsibilities = (emphasis as number[])
          .map((i) => exp.responsibilities[i])
          .filter(Boolean)
      }

      // Responsibilities as bullet points
      this.doc.setFont('helvetica', 'normal')
      this.doc.setFontSize(9)
      this.doc.setTextColor(COLORS.darkGray)

      responsibilities.forEach((resp) => {
        this.checkPageBreak(8)
        const bulletX = MARGIN_LEFT + 2
        const textX = MARGIN_LEFT + 5
        const lines = wrapText(this.doc, resp, CONTENT_WIDTH - 5)

        this.doc.text('•', bulletX, this.y)
        lines.forEach((line, lineIndex) => {
          if (lineIndex > 0) {
            this.checkPageBreak(4)
          }
          this.doc.text(line, textX, this.y)
          this.y += 4
        })
      })

      // Key achievements (if any)
      if (exp.achievements && exp.achievements.length > 0) {
        this.y += 1
        this.doc.setFont('helvetica', 'italic')
        this.doc.setFontSize(9)
        this.doc.setTextColor(COLORS.accent)

        exp.achievements.slice(0, 2).forEach((achievement) => {
          this.checkPageBreak(8)
          const bulletX = MARGIN_LEFT + 2
          const textX = MARGIN_LEFT + 5
          const lines = wrapText(this.doc, `✓ ${achievement}`, CONTENT_WIDTH - 5)

          lines.forEach((line, lineIndex) => {
            if (lineIndex > 0) {
              this.checkPageBreak(4)
            }
            this.doc.text(line, lineIndex === 0 ? bulletX : textX, this.y)
            this.y += 4
          })
        })
      }

      this.y += 3
    })
  }

  private drawProjects(): void {
    this.drawSectionTitle('Projects')

    const allProjects = projectsData.projects as Project[]
    const relevantProjects = this.role.projectIds
      .map((id) => allProjects.find((p) => p.id === id))
      .filter(Boolean)
      .slice(0, 3) as Project[]

    relevantProjects.forEach((project) => {
      this.checkPageBreak(18)

      // Project title
      this.doc.setFont('helvetica', 'bold')
      this.doc.setFontSize(10)
      this.doc.setTextColor(COLORS.black)
      this.doc.text(project.title, MARGIN_LEFT, this.y)

      // Project type on right
      this.doc.setFont('helvetica', 'normal')
      this.doc.setFontSize(9)
      this.doc.setTextColor(COLORS.gray)
      const typeWidth = this.doc.getTextWidth(project.type)
      this.doc.text(project.type, PAGE_WIDTH - MARGIN_RIGHT - typeWidth, this.y)
      this.y += 4.5

      // Description
      this.doc.setFont('helvetica', 'normal')
      this.doc.setFontSize(9)
      this.doc.setTextColor(COLORS.darkGray)

      const descLines = wrapText(this.doc, project.description, CONTENT_WIDTH)
      descLines.slice(0, 2).forEach((line) => {
        this.checkPageBreak(4)
        this.doc.text(line, MARGIN_LEFT, this.y)
        this.y += 4
      })

      // Impact (first item)
      if (project.impact && project.impact.length > 0) {
        this.doc.setTextColor(COLORS.accent)
        const impactText = `→ ${project.impact[0]}`
        const impactLines = wrapText(this.doc, impactText, CONTENT_WIDTH)
        impactLines.forEach((line) => {
          this.checkPageBreak(4)
          this.doc.text(line, MARGIN_LEFT, this.y)
          this.y += 4
        })
      }

      // Technologies
      this.doc.setFont('helvetica', 'italic')
      this.doc.setFontSize(8)
      this.doc.setTextColor(COLORS.gray)
      const techStr = project.technologies.slice(0, 6).join(', ')
      this.doc.text(techStr, MARGIN_LEFT, this.y)
      this.y += 5
    })
  }

  private drawEducation(): void {
    this.drawSectionTitle('Education')

    const edu = cvRolesData.education

    // Degree and year on same line
    this.doc.setFont('helvetica', 'bold')
    this.doc.setFontSize(10)
    this.doc.setTextColor(COLORS.black)
    this.doc.text(edu.degree, MARGIN_LEFT, this.y)

    this.doc.setFont('helvetica', 'normal')
    this.doc.setFontSize(9)
    this.doc.setTextColor(COLORS.gray)
    const yearWidth = this.doc.getTextWidth(edu.graduationYear)
    this.doc.text(edu.graduationYear, PAGE_WIDTH - MARGIN_RIGHT - yearWidth, this.y)
    this.y += 4.5

    // Institution
    this.doc.setFont('helvetica', 'normal')
    this.doc.setFontSize(9.5)
    this.doc.setTextColor(COLORS.gray)
    this.doc.text(`${edu.institution} • ${edu.location}`, MARGIN_LEFT, this.y)
    this.y += 6
  }

  private drawLanguages(): void {
    this.checkPageBreak(12)
    this.drawSectionTitle('Languages')

    const languages = cvRolesData.languages
    this.doc.setFont('helvetica', 'normal')
    this.doc.setFontSize(9.5)
    this.doc.setTextColor(COLORS.darkGray)

    const langStr = languages.map((l) => `${l.name} (${l.level})`).join('  •  ')
    this.doc.text(langStr, MARGIN_LEFT, this.y)
    this.y += 6
  }

  public generate(): jsPDF {
    this.drawHeader()
    this.drawSummary()
    this.drawSkills()
    this.drawExperience()
    this.drawProjects()
    this.drawEducation()
    this.drawLanguages()

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
