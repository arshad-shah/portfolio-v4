// src/App.tsx

import { HelmetProvider } from 'react-helmet-async'
import { SEO } from '@/components/common/SEO'
import { ErrorBoundary } from '@/components/common/ErrorBoundary'
import { Navigation } from '@/components/sections/Navigation'
import { Hero } from '@/components/sections/Hero'
import { Experience } from '@/components/sections/Experience'
import { Projects } from '@/components/sections/Projects'
import { Contact } from '@/components/sections/Contact'
import { Footer } from '@/components/sections/Footer'

// Import data with type safety
import personalDataRaw from '@/data/personal.json'
import experienceDataRaw from '@/data/experience.json'
import projectsDataRaw from '@/data/projects.json'
import contactDataRaw from '@/data/contact.json'
import type { Personal, Experience as ExperienceType, Project, Contact as ContactType } from '@/types/index'

// Type-safe data assertions using satisfies for compile-time validation
const personalData = personalDataRaw satisfies Personal
const experienceData = experienceDataRaw satisfies { experience: ExperienceType[] }
const projectsData = projectsDataRaw satisfies { projects: Project[] }
const contactData = contactDataRaw satisfies ContactType

/**
 * Main App Component
 */
function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <SEO
          title="Software Engineer & Full-Stack Developer"
          description={personalData.description}
          type="profile"
        />

        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="bg-accent-gold text-primary fixed left-4 top-4 z-[100] -translate-y-full rounded px-4 py-2 font-medium transition-transform focus:translate-y-0"
        >
          Skip to main content
        </a>

        <div className="bg-primary text-text-primary min-h-screen">
          {/* Navigation */}
          <Navigation />

          {/* Main Content */}
          <main id="main-content">
            {/* Hero Section */}
            <Hero data={personalData} />

            {/* Experience Section */}
            <Experience data={experienceData.experience} />

            {/* Projects Section */}
            <Projects data={projectsData.projects} />

            {/* Contact Section */}
            <Contact data={contactData} />
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </HelmetProvider>
    </ErrorBoundary>
  )
}

export default App
