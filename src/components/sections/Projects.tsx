// src/components/sections/Projects.tsx

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, Star, Calendar, ArrowUpRight } from 'lucide-react'
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
import { Badge, BadgeGroup } from '@/components/ui/Badge'
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
        <SectionHeader subtitle="Selected work showcasing architecture, performance, and craft">
          <span className="text-accent-gold font-mono">{'<'}</span>
          <span className="text-text-primary">Projects</span>
          <span className="text-accent-gold font-mono">{' />'}</span>
        </SectionHeader>

        {/* Filter Tabs */}
        <div className="mb-12 flex justify-center">
          <div className="border-border-subtle bg-primary/80 inline-flex items-center gap-1 border p-1 backdrop-blur-sm">
            {PROJECT_CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                aria-pressed={activeFilter === category}
                className={cn(
                  'relative px-5 py-2 text-sm font-medium transition-all duration-300',
                  activeFilter === category
                    ? 'bg-accent-gold/15 text-accent-gold'
                    : 'text-text-secondary hover:text-text-primary'
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div
          variants={containerAnimation}
          initial="hidden"
          animate="visible"
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
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

        {/* View All */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 flex justify-center"
        >
          <Button
            variant="secondary"
            size="lg"
            onClick={() =>
              window.open(
                'https://github.com/arshad-shah?tab=repositories',
                '_blank',
                'noopener,noreferrer'
              )
            }
            rightIcon={<ArrowUpRight className="h-4 w-4" />}
          >
            All Projects on GitHub
          </Button>
        </motion.div>
      </Container>
    </AnimatedSection>
  )
}

/**
 * Individual Project Card
 */
interface ProjectCardProps {
  project: Project
}

function ProjectCard({ project }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card hover padding="none" className="group flex h-full flex-col overflow-hidden">
      {/* Header */}
      <CardHeader className="border-border-subtle border-b p-5">
        <div className="mb-3 flex items-start justify-between">
          <div className="flex items-center gap-2">
            {project.featured && (
              <span className="bg-accent-gold/15 text-accent-gold flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase">
                <Star className="h-3 w-3" />
                Featured
              </span>
            )}
            <span className="text-text-muted bg-secondary px-2 py-0.5 text-[10px] font-medium tracking-wider uppercase">
              {project.type}
            </span>
          </div>

          <div className="flex gap-1.5">
            {project.links.live && (
              <IconButton
                variant="ghost"
                icon={<ExternalLink className="h-3.5 w-3.5" />}
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  window.open(project.links.live!, '_blank', 'noopener,noreferrer')
                }}
                aria-label="View live project"
              />
            )}
            {project.links.github && (
              <IconButton
                variant="ghost"
                icon={<Github className="h-3.5 w-3.5" />}
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  window.open(project.links.github!, '_blank', 'noopener,noreferrer')
                }}
                aria-label="View source code"
              />
            )}
          </div>
        </div>

        <CardTitle className="group-hover:text-accent-gold mb-2 text-lg transition-colors">
          {project.title}
        </CardTitle>

        <CardDescription className="line-clamp-2 text-sm leading-relaxed">
          {project.description}
        </CardDescription>
      </CardHeader>

      {/* Content */}
      <CardContent className="flex-1 p-5">
        {/* Impact — compact */}
        {!isExpanded && project.impact && project.impact.length > 0 && (
          <div className="mb-4">
            <ul className="space-y-1.5">
              {project.impact.slice(0, 2).map((item, idx) => (
                <li key={idx} className="text-text-secondary flex gap-2 text-sm">
                  <span className="text-accent-gold flex-shrink-0">▹</span>
                  <span className="line-clamp-1">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Expanded details */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="mb-4 space-y-4 overflow-hidden"
            >
              {project.challenge && (
                <div>
                  <h4 className="text-accent-gold mb-1 font-mono text-xs font-medium">Challenge</h4>
                  <p className="text-text-secondary text-sm">{project.challenge}</p>
                </div>
              )}
              {project.solution && (
                <div>
                  <h4 className="text-accent-blue mb-1 font-mono text-xs font-medium">Solution</h4>
                  <p className="text-text-secondary text-sm">{project.solution}</p>
                </div>
              )}
              {project.impact && project.impact.length > 0 && (
                <div>
                  <h4 className="mb-1.5 font-mono text-xs font-medium text-emerald-400">Impact</h4>
                  <ul className="space-y-1.5">
                    {project.impact.map((item, idx) => (
                      <li key={idx} className="text-text-secondary flex gap-2 text-sm">
                        <span className="flex-shrink-0 text-emerald-400">▹</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tech */}
        <BadgeGroup>
          {project.technologies.slice(0, isExpanded ? undefined : 5).map((tech) => (
            <Badge key={tech} variant="secondary" size="sm" className="font-mono text-xs">
              {tech}
            </Badge>
          ))}
          {!isExpanded && project.technologies.length > 5 && (
            <Badge variant="default" size="sm" className="text-xs">
              +{project.technologies.length - 5}
            </Badge>
          )}
        </BadgeGroup>
      </CardContent>

      {/* Footer */}
      <CardFooter className="border-border-subtle border-t p-5 pt-4">
        <div className="flex items-center justify-between">
          <div className="text-text-muted flex items-center gap-1.5 font-mono text-xs">
            <Calendar className="h-3 w-3" />
            {project.year}
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-accent-gold hover:text-accent-gold-light text-xs font-medium transition-colors"
          >
            {isExpanded ? 'Less' : 'Details'}
          </button>
        </div>
      </CardFooter>
    </Card>
  )
}
