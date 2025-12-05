// src/components/sections/Experience.tsx

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, MapPin, ChevronRight, Briefcase } from 'lucide-react'
import { Container } from '@/components/common/Container'
import { SectionHeader } from '@/components/common/SectionHeader'
import { AnimatedSection } from '@/components/common/AnimatedSection'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Badge, BadgeGroup } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'
import { formatDate, calculateDuration } from '@/lib/utils'
import { fadeInUp, fadeInLeft, staggerContainer, staggerItem } from '@/lib/animations'
import { useAccessibleAnimation } from '@/hooks/usePreferredMotion'
import { useIsMobile } from '@/hooks/useMediaQuery'
import type { Experience as ExperienceType } from '@/types/index'

interface ExperienceProps {
  data: ExperienceType[]
}

/**
 * Experience section with timeline layout
 */
export function Experience({ data }: ExperienceProps) {
  const [activeJob, setActiveJob] = useState(0)
  const [expandedJobs, setExpandedJobs] = useState<Set<number>>(new Set([0]))
  const isMobile = useIsMobile()

  const containerAnimation = useAccessibleAnimation(staggerContainer)
  const itemAnimation = useAccessibleAnimation(staggerItem)

  const toggleJobExpansion = (index: number) => {
    const newExpanded = new Set(expandedJobs)
    if (newExpanded.has(index)) {
      newExpanded.delete(index)
    } else {
      newExpanded.add(index)
    }
    setExpandedJobs(newExpanded)
  }

  // Get all unique technologies
  const allTechnologies = Array.from(
    new Set(data.flatMap((job) => job.technologies))
  ).sort()

  return (
    <AnimatedSection id="experience" className="bg-primary py-24">
      <Container>
        <SectionHeader>
          <span className="font-mono text-accent-gold">function</span>{' '}
          <span className="text-text-primary">Experience</span>
          <span className="text-accent-gold">()</span>
        </SectionHeader>

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Timeline Selector - Left Side */}
          <div className="lg:col-span-4">
            <div className={cn('space-y-4', !isMobile && 'sticky top-24')}>
              {/* Job selector buttons */}
              <div className="space-y-2">
                {data.map((job, index) => (
                  <motion.button
                    key={job.id}
                    onClick={() => {
                      setActiveJob(index)
                      if (!expandedJobs.has(index)) {
                        toggleJobExpansion(index)
                      }
                    }}
                    variants={itemAnimation}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={index}
                    whileHover={{ x: 4 }}
                    className={cn(
                      'group relative w-full rounded-sm border-l-4 p-4 text-left transition-all duration-300',
                      activeJob === index
                        ? 'border-accent-gold bg-secondary-light'
                        : 'border-text-secondary/20 hover:border-accent-gold/50 hover:bg-secondary'
                    )}
                  >
                    {/* Timeline dot */}
                    <div
                      className={cn(
                        'absolute -left-2 top-6 h-4 w-4 rounded-full border-4 border-primary transition-colors',
                        activeJob === index
                          ? 'bg-accent-gold'
                          : 'bg-text-secondary/50 group-hover:bg-accent-gold/50'
                      )}
                    />

                    <div className="space-y-1">
                      <p
                        className={cn(
                          'text-sm font-medium transition-colors',
                          activeJob === index
                            ? 'text-accent-gold'
                            : 'text-text-secondary group-hover:text-accent-gold'
                        )}
                      >
                        {formatDate(job.startDate)} -{' '}
                        {job.current ? 'Present' : job.endDate ? formatDate(job.endDate) : 'N/A'}
                      </p>
                      <h3
                        className={cn(
                          'font-display text-lg font-semibold transition-colors',
                          activeJob === index
                            ? 'text-text-primary'
                            : 'text-text-secondary group-hover:text-text-primary'
                        )}
                      >
                        {job.position}
                      </h3>
                      <p className="text-sm text-text-secondary">
                        {job.company}
                      </p>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Terminal-style info box */}
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="rounded-sm border border-secondary-light bg-secondary p-4 font-mono text-xs"
              >
                <div className="mb-2 flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-red-500" />
                  <div className="h-2 w-2 rounded-full bg-yellow-500" />
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                </div>
                <div className="space-y-1 text-text-secondary">
                  <p>
                    <span className="text-accent-blue">const</span>{' '}
                    <span className="text-text-primary">totalJobs</span> ={' '}
                    <span className="text-accent-gold">{data.length}</span>;
                  </p>
                  <p>
                    <span className="text-accent-blue">let</span>{' '}
                    <span className="text-text-primary">activeIndex</span> ={' '}
                    <span className="text-accent-gold">{activeJob}</span>;
                  </p>
                  <p>
                    <span className="text-accent-blue">const</span>{' '}
                    <span className="text-text-primary">duration</span> = "
                    <span className="text-green-400">
                      {calculateDuration(
                        data[activeJob].startDate,
                        data[activeJob].endDate
                      )}
                    </span>
                    ";
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Job Details - Right Side */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeJob}
                variants={fadeInLeft}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-6"
              >
                {/* Job Header Card */}
                <Card padding="lg">
                  <CardHeader className="border-b border-border-subtle pb-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="mb-2">
                          {data[activeJob].position}{' '}
                          <span className="bg-gradient-to-r from-accent-gold to-accent-blue bg-clip-text text-transparent">
                            @ {data[activeJob].company}
                          </span>
                        </CardTitle>

                        <div className="flex flex-wrap gap-4 text-sm text-text-secondary">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-accent-gold" />
                            <span className="font-mono">
                              {formatDate(data[activeJob].startDate)} -{' '}
                              {data[activeJob].current
                                ? 'Present'
                                : data[activeJob].endDate ? formatDate(data[activeJob].endDate) : 'N/A'}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-accent-gold" />
                            <span>{data[activeJob].location}</span>
                          </div>
                        </div>
                      </div>

                      {data[activeJob].current && (
                        <Badge variant="success" size="sm">
                          Current
                        </Badge>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="pt-4">
                    <p className="text-text-secondary">
                      {data[activeJob].description}
                    </p>
                  </CardContent>
                </Card>

                {/* Responsibilities */}
                <Card padding="lg">
                  <h4 className="mb-4 font-mono text-sm text-accent-gold">
                    // Key Responsibilities:
                  </h4>
                  <motion.ul
                    variants={containerAnimation}
                    initial="hidden"
                    animate="visible"
                    className="space-y-4"
                  >
                    {data[activeJob].responsibilities.map(
                      (responsibility, idx) => (
                        <motion.li
                          key={idx}
                          variants={itemAnimation}
                          custom={idx}
                          className="group flex gap-3 transition-all hover:-translate-y-0.5"
                        >
                          <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-sm bg-secondary transition-colors group-hover:bg-accent-gold/20">
                            <ChevronRight className="h-4 w-4 text-accent-gold" />
                          </div>
                          <span className="text-text-secondary group-hover:text-text-primary">
                            {responsibility}
                          </span>
                        </motion.li>
                      )
                    )}
                  </motion.ul>
                </Card>

                {/* Achievements (if available) */}
                {data[activeJob].achievements &&
                  data[activeJob].achievements!.length > 0 && (
                    <Card padding="lg" className="border-accent-gold/20">
                      <h4 className="mb-4 flex items-center gap-2 font-mono text-sm text-accent-gold">
                        <Briefcase className="h-4 w-4" />
                        // Key Achievements:
                      </h4>
                      <motion.ul
                        variants={containerAnimation}
                        initial="hidden"
                        animate="visible"
                        className="space-y-3"
                      >
                        {data[activeJob].achievements!.map(
                          (achievement, idx) => (
                            <motion.li
                              key={idx}
                              variants={itemAnimation}
                              custom={idx}
                              className="flex gap-3 text-sm text-text-secondary"
                            >
                              <span className="text-accent-gold">▸</span>
                              <span>{achievement}</span>
                            </motion.li>
                          )
                        )}
                      </motion.ul>
                    </Card>
                  )}

                {/* Technologies */}
                <Card padding="lg">
                  <h4 className="mb-4 font-mono text-sm text-accent-gold">
                    // Technologies Used:
                  </h4>
                  <BadgeGroup>
                    {data[activeJob].technologies.map((tech, idx) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        size="sm"
                        animated
                        index={idx}
                        className="font-mono"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </BadgeGroup>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* All Technologies Section */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-20 rounded-sm border border-secondary-light bg-secondary/30 p-6 backdrop-blur-sm lg:p-8"
        >
          <h3 className="mb-6 font-mono text-xl font-bold text-text-primary">
            <span className="text-accent-gold">import</span>{' '}
            <span className="text-green-400">{'{ Skills }'}</span>{' '}
            <span className="text-accent-gold">from</span>{' '}
            <span className="text-orange-400">'./experience'</span>;
          </h3>

          <BadgeGroup>
            {allTechnologies.map((tech, idx) => (
              <Badge
                key={tech}
                variant="default"
                size="sm"
                animated
                index={idx}
                className="font-mono hover:border-accent-gold/50"
              >
                {tech}
              </Badge>
            ))}
          </BadgeGroup>
        </motion.div>
      </Container>
    </AnimatedSection>
  )
}