// src/components/sections/Projects.tsx

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, Filter, Star, Calendar } from 'lucide-react'
import { Container } from '@/components/common/Container'
import { SectionHeader } from '@/components/common/SectionHeader'
import { AnimatedSection } from '@/components/common/AnimatedSection'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/Card'
import { Badge, BadgeGroup, StatusBadge } from '@/components/ui/Badge'
import { Button, IconButton } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { PROJECT_CATEGORIES } from '@/lib/constants'
import { staggerContainer, staggerItem } from '@/lib/animations'
import { useAccessibleAnimation } from '@/hooks/usePreferredMotion'
import type { Project } from '@/types/index'

interface ProjectsProps {
  data: Project[]
}

/**
 * Projects section with filterable grid
 */
export function Projects({ data }: ProjectsProps) {
  const [activeFilter, setActiveFilter] = useState<string>('All')

  const containerAnimation = useAccessibleAnimation(staggerContainer)
  const itemAnimation = useAccessibleAnimation(staggerItem)

  // Filter projects
  const filteredProjects =
    activeFilter === 'All' ? data : data.filter((project) => project.category === activeFilter)

  // Sort by featured first, then by year
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    return b.year - a.year
  })

  return (
    <AnimatedSection id="projects" className="bg-secondary py-24">
      <Container>
        <SectionHeader>
          <span className="text-accent-gold mr-2 font-mono">{'<'}</span>
          <span className="text-text-primary">Projects</span>
          <span className="text-accent-gold ml-2 font-mono">{'/>'}</span>
        </SectionHeader>

        {/* Filter Buttons */}
        <div className="mb-12 flex justify-center">
          <div className="border-secondary-light bg-primary inline-flex items-center gap-2 rounded-sm border p-1">
            <Filter className="text-accent-gold mx-2 h-4 w-4" />
            {PROJECT_CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={cn(
                  'relative rounded-sm px-4 py-2 text-sm font-medium transition-all duration-300',
                  activeFilter === category
                    ? 'bg-accent-gold/20 text-accent-gold'
                    : 'text-text-secondary hover:text-text-primary'
                )}
              >
                <span className="relative z-10">{category}</span>
                {activeFilter === category && (
                  <motion.div
                    layoutId="activeFilter"
                    className="bg-accent-gold/20 absolute inset-0 rounded-sm"
                    transition={{ type: 'spring', duration: 0.5 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div
          variants={containerAnimation}
          initial="hidden"
          animate="visible"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {sortedProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={itemAnimation}
                initial="hidden"
                animate="visible"
                exit="exit"
                custom={index}
                layout
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {sortedProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-20 text-center"
          >
            <p className="text-text-secondary">No projects found in this category.</p>
          </motion.div>
        )}

        {/* View All Projects Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 flex justify-center"
        >
          <Button
            variant="secondary"
            size="lg"
            onClick={() => window.open('https://github.com/arshad-shah?tab=repositories', '_blank')}
            rightIcon={<ExternalLink className="h-5 w-5" />}
          >
            View All Projects on GitHub
          </Button>
        </motion.div>
      </Container>
    </AnimatedSection>
  )
}

/**
 * Individual Project Card Component
 */
interface ProjectCardProps {
  project: Project
}

function ProjectCard({ project }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card hover padding="none" className="group flex h-full flex-col overflow-hidden">
      {/* Card Header */}
      <CardHeader className="border-border-subtle border-b p-4">
        <div className="mb-3 flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-accent-gold/20 rounded-sm p-2">
              <Github className="text-accent-gold h-4 w-4" />
            </div>
            <Badge variant="default" size="sm">
              {project.type}
            </Badge>
          </div>

          <div className="flex gap-2">
            {project.featured && <StatusBadge status="featured" size="sm" />}
            {project.links.live && (
              <IconButton
                variant="ghost"
                icon={<ExternalLink className="h-4 w-4" />}
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  window.open(project.links.live!, '_blank')
                }}
                aria-label="View live project"
              />
            )}
            {project.links.github && (
              <IconButton
                variant="ghost"
                icon={<Github className="h-4 w-4" />}
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  window.open(project.links.github!, '_blank')
                }}
                aria-label="View source code"
              />
            )}
          </div>
        </div>

        <CardTitle className="group-hover:text-accent-gold mb-2 line-clamp-2 transition-colors">
          {project.title}
        </CardTitle>

        <CardDescription className="line-clamp-2 text-sm">{project.description}</CardDescription>
      </CardHeader>

      {/* Card Content */}
      <CardContent className="flex-1 p-4">
        {/* Challenge/Solution (if expanded) */}
        <AnimatePresence>
          {isExpanded && (project.challenge || project.solution) && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-4 space-y-3 overflow-hidden"
            >
              {project.challenge && (
                <div>
                  <h4 className="text-accent-gold mb-1 font-mono text-xs">// Challenge:</h4>
                  <p className="text-text-secondary text-sm">{project.challenge}</p>
                </div>
              )}
              {project.solution && (
                <div>
                  <h4 className="text-accent-blue mb-1 font-mono text-xs">// Solution:</h4>
                  <p className="text-text-secondary text-sm">{project.solution}</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Impact (if expanded) */}
        <AnimatePresence>
          {isExpanded && project.impact && project.impact.length > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="mb-4 overflow-hidden"
            >
              <h4 className="text-accent-gold mb-2 flex items-center gap-2 font-mono text-xs">
                <Star className="h-3 w-3" />
                // Impact:
              </h4>
              <ul className="space-y-1">
                {project.impact.map((item, idx) => (
                  <li key={idx} className="text-text-secondary flex gap-2 text-sm">
                    <span className="text-accent-gold">▸</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Technologies */}
        <div>
          <h4 className="text-accent-gold mb-3 font-mono text-xs">// Tech Stack:</h4>
          <BadgeGroup>
            {project.technologies.slice(0, isExpanded ? undefined : 4).map((tech) => (
              <Badge key={tech} variant="secondary" size="sm" className="font-mono text-xs">
                {tech}
              </Badge>
            ))}
            {!isExpanded && project.technologies.length > 4 && (
              <Badge variant="default" size="sm">
                +{project.technologies.length - 4}
              </Badge>
            )}
          </BadgeGroup>
        </div>
      </CardContent>

      {/* Card Footer */}
      <CardFooter className="border-t-0 p-4 pt-0">
        <div className="flex items-center justify-between gap-4">
          <div className="text-text-muted flex items-center gap-2 text-xs">
            <Calendar className="h-3 w-3" />
            <span>{project.year}</span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs"
          >
            {isExpanded ? 'Show Less' : 'View Details'}
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
