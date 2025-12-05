// src/types/index.ts

export interface Personal {
  name: {
    first: string
    last: string
  }
  title: string
  headline: string
  description: string
  location: {
    city: string
    country: string
    display: string
  }
  email: string
  tagline: string
  technologies: string[]
  availability: {
    status: string
    openTo: string[]
    workingHours: string
    responseTime: string
  }
  expertise: string[]
}

export interface Experience {
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
  achievements?: string[]
}

export interface Project {
  id: string
  title: string
  category: 'Professional' | 'Tools' | 'Personal'
  type: string
  description: string
  challenge?: string
  solution?: string
  impact?: string[]
  technologies: string[]
  links: {
    live: string | null
    github: string | null
    case_study: string | null
  }
  featured: boolean
  year: number
}

export interface TechnicalSkills {
  [key: string]: {
    label: string
    skills: string[]
  }
}

export interface Skills {
  technical_skills: TechnicalSkills
  core_competencies: string[]
  soft_skills: string[]
  learning_focus: string[]
}

export interface Contact {
  heading: string
  subheading: string
  description: string
  email: {
    address: string
    display: string
  }
  social_links: Array<{
    platform: string
    url: string
    label: string
    primary: boolean
  }>
  availability: {
    status: string
    status_type: 'available' | 'limited' | 'unavailable'
    open_to: string[]
    response_time: string
    working_hours: string
    preferred_contact: string
  }
  expertise: string[]
  location: {
    city: string
    country: string
    timezone: string
    display: string
  }
  resume: {
    filename: string
    path: string
    last_updated: string
  }
  footer: {
    copyright: string
    tagline: string
    year: string | number
  }
}

export interface AnimationVariant {
  hidden?: {
    opacity?: number
    y?: number
    x?: number
    scale?: number
  }
  visible?: {
    opacity?: number
    y?: number
    x?: number
    scale?: number
    transition?: {
      duration?: number
      delay?: number
      ease?: string | number[]
      staggerChildren?: number
      delayChildren?: number
    }
  }
  exit?: {
    opacity?: number
    y?: number
    x?: number
    scale?: number
    transition?: {
      duration?: number
      ease?: string | number[]
    }
  }
}

export interface NavigationItem {
  label: string
  href: string
  external?: boolean
}

export interface SocialLink {
  platform: string
  url: string
  icon: string
  label: string
}