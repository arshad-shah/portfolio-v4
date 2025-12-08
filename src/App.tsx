// src/App.tsx

import { Suspense, lazy } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { SEO } from '@/components/common/SEO'
import { ErrorBoundary } from '@/components/common/ErrorBoundary'
import { Navigation } from '@/components/sections/Navigation'
import { Hero } from '@/components/sections/Hero'

// Lazy load below-the-fold components for better initial load performance
const Experience = lazy(() =>
  import('@/components/sections/Experience').then((m) => ({ default: m.Experience }))
)
const Projects = lazy(() =>
  import('@/components/sections/Projects').then((m) => ({ default: m.Projects }))
)
const Contact = lazy(() =>
  import('@/components/sections/Contact').then((m) => ({ default: m.Contact }))
)

// Import data with type safety
import personalDataRaw from '@/data/personal.json'
import experienceDataRaw from '@/data/experience.json'
import projectsDataRaw from '@/data/projects.json'
import contactDataRaw from '@/data/contact.json'
import type {
  Personal,
  Experience as ExperienceType,
  Project,
  Contact as ContactType,
} from '@/types/index'

// Loading fallback component
function SectionLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="border-accent-gold h-8 w-8 animate-spin rounded-full border-2 border-t-transparent" />
    </div>
  )
}

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

        {/* Skip to main content link for accessibility - hidden until focused */}
        <a
          href="#main-content"
          className="bg-accent-gold text-primary sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded focus:px-4 focus:py-2 focus:font-medium"
        >
          Skip to main content
        </a>

        <div className="bg-primary text-text-primary min-h-screen">
          {/* Navigation */}
          <Navigation />

          {/* Main Content */}
          <main id="main-content">
            {/* Hero Section - loaded immediately */}
            <Hero data={personalData} />

            {/* Below-the-fold sections - lazy loaded */}
            <Suspense fallback={<SectionLoader />}>
              {/* Experience Section */}
              <Experience data={experienceData.experience} />

              {/* Projects Section */}
              <Projects data={projectsData.projects} />

              {/* Contact Section */}
              <Contact data={contactData} />
            </Suspense>
          </main>
        </div>
      </HelmetProvider>
    </ErrorBoundary>
  )
}

export default App
