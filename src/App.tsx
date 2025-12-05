// src/App.tsx

import { HelmetProvider } from 'react-helmet-async'
import { SEO } from '@/components/common/SEO'
import { Navigation } from '@/components/sections/Navigation'
import { Hero } from '@/components/sections/Hero'
import { Experience } from '@/components/sections/Experience'
import { Projects } from '@/components/sections/Projects'
import { Contact } from '@/components/sections/Contact'

// Import data
import personalData from '@/data/personal.json'
import experienceData from '@/data/experience.json'
import projectsDataRaw from '@/data/projects.json'
import contactDataRaw from '@/data/contact.json'
import type { Project, Contact as ContactType } from '@/types/index'

// Type assertion for projects data
const projectsData = projectsDataRaw as { projects: Project[] }
const contactData = contactDataRaw as ContactType

/**
 * Main App Component
 */
function App() {
  return (
    <HelmetProvider>
      <SEO
        title="Software Engineer & Full-Stack Developer"
        description={personalData.description}
        type="profile"
      />

      <div className="bg-primary text-text-primary min-h-screen">
        {/* Navigation */}
        <Navigation />

        {/* Main Content */}
        <main>
          {/* Hero Section */}
          <Hero data={personalData} />

          {/* Experience Section */}
          <Experience data={experienceData.experience} />

          {/* Projects Section */}
          <Projects data={projectsData.projects} />

          {/* Contact Section */}
          <Contact data={contactData} />
        </main>
      </div>
    </HelmetProvider>
  )
}

export default App
