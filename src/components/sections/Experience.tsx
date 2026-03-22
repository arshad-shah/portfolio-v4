// src/components/sections/Experience.tsx

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, MapPin, ChevronRight, Briefcase, TrendingUp } from 'lucide-react'
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
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set())
  const isMobile = useIsMobile()

  const containerAnimation = useAccessibleAnimation(staggerContainer)
  const itemAnimation = useAccessibleAnimation(staggerItem)

  const toggleSection = (key: string) => {
    const next = new Set(expandedSections)
    if (next.has(key)) {
      next.delete(key)
    } else {
      next.add(key)
    }
    setExpandedSections(next)
  }

  return (
    <AnimatedSection id="experience" className="bg-primary py-24">
      <Container>
        <SectionHeader
          subtitle="My career progression and key contributions"
        >
          <span className="text-accent-gold font-mono">{'{'}</span>{' '}
          <span className="text-text-primary">Experience</span>{' '}
          <span className="text-accent-gold font-mono">{'}'}</span>
        </SectionHeader>

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Timeline Selector — Left Side */}
          <div className="lg:col-span-4">
            <div className={cn('space-y-3', !isMobile && 'sticky top-24')}>
              {data.map((job, index) => (
                <motion.button
                  key={job.id}
                  onClick={() => setActiveJob(index)}
                  variants={itemAnimation}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={index}
                  className={cn(
                    'group relative w-full border-l-2 p-4 text-left transition-all duration-300',
                    activeJob === index
                      ? 'border-accent-gold bg-accent-gold/5'
                      : 'border-text-secondary/15 hover:border-accent-gold/40 hover:bg-secondary/50'
                  )}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <h3
                        className={cn(
                          'font-display text-base font-semibold transition-colors',
                          activeJob === index
                            ? 'text-text-primary'
                            : 'text-text-secondary group-hover:text-text-primary'
                        )}
                      >
                        {job.position}
                      </h3>
                      {job.current && (
                        <span className="bg-accent-gold/20 text-accent-gold px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="text-text-secondary text-sm">{job.company}</p>
                    <p
                      className={cn(
                        'font-mono text-xs transition-colors',
                        activeJob === index
                          ? 'text-accent-gold'
                          : 'text-text-muted'
                      )}
                    >
                      {formatDate(job.startDate)} —{' '}
                      {job.current ? 'Present' : job.endDate ? formatDate(job.endDate) : 'N/A'}
                      <span className="text-text-muted ml-2">
                        ({calculateDuration(job.startDate, job.endDate)})
                      </span>
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Job Details — Right Side */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeJob}
                variants={fadeInLeft}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-5"
              >
                {/* Job Header */}
                <Card padding="lg">
                  <CardHeader className="border-border-subtle border-b pb-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="mb-2">
                          {data[activeJob].position}{' '}
                          <span className="from-accent-gold to-accent-blue bg-gradient-to-r bg-clip-text text-transparent">
                            @ {data[activeJob].company}
                          </span>
                        </CardTitle>

                        <div className="text-text-secondary flex flex-wrap gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="text-accent-gold h-4 w-4" />
                            <span className="font-mono text-xs">
                              {formatDate(data[activeJob].startDate)} —{' '}
                              {data[activeJob].current
                                ? 'Present'
                                : data[activeJob].endDate
                                  ? formatDate(data[activeJob].endDate)
                                  : 'N/A'}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="text-accent-gold h-4 w-4" />
                            <span>{data[activeJob].location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-4">
                    <p className="text-text-secondary leading-relaxed">{data[activeJob].description}</p>
                  </CardContent>
                </Card>

                {/* Key Achievements */}
                {data[activeJob].achievements && data[activeJob].achievements.length > 0 && (
                  <Card padding="lg" className="border-accent-gold/15">
                    <button
                      type="button"
                      onClick={() => toggleSection(`achievements-${activeJob}`)}
                      className="flex w-full items-center justify-between"
                    >
                      <h4 className="text-accent-gold flex items-center gap-2 font-mono text-sm font-medium">
                        <TrendingUp className="h-4 w-4" />
                        Key Achievements
                      </h4>
                      <ChevronRight
                        className={cn(
                          'text-text-muted h-4 w-4 transition-transform',
                          expandedSections.has(`achievements-${activeJob}`) && 'rotate-90'
                        )}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {(expandedSections.has(`achievements-${activeJob}`) ||
                        !expandedSections.size) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <motion.ul
                            variants={containerAnimation}
                            initial="hidden"
                            animate="visible"
                            className="mt-4 space-y-3"
                          >
                            {data[activeJob].achievements!.map((achievement, idx) => (
                              <motion.li
                                key={idx}
                                variants={itemAnimation}
                                custom={idx}
                                className="text-text-secondary flex gap-3 text-sm"
                              >
                                <span className="text-accent-gold mt-0.5 flex-shrink-0">▹</span>
                                <span>{achievement}</span>
                              </motion.li>
                            ))}
                          </motion.ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                )}

                {/* Responsibilities */}
                <Card padding="lg">
                  <button
                    type="button"
                    onClick={() => toggleSection(`responsibilities-${activeJob}`)}
                    className="flex w-full items-center justify-between"
                  >
                    <h4 className="text-accent-blue flex items-center gap-2 font-mono text-sm font-medium">
                      <Briefcase className="h-4 w-4" />
                      Responsibilities
                    </h4>
                    <ChevronRight
                      className={cn(
                        'text-text-muted h-4 w-4 transition-transform',
                        expandedSections.has(`responsibilities-${activeJob}`) && 'rotate-90'
                      )}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {(expandedSections.has(`responsibilities-${activeJob}`) ||
                      !expandedSections.size) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <motion.ul
                          variants={containerAnimation}
                          initial="hidden"
                          animate="visible"
                          className="mt-4 space-y-3"
                        >
                          {data[activeJob].responsibilities.map((responsibility, idx) => (
                            <motion.li
                              key={idx}
                              variants={itemAnimation}
                              custom={idx}
                              className="text-text-secondary group flex gap-3 text-sm transition-colors hover:text-text-primary"
                            >
                              <span className="text-accent-blue mt-0.5 flex-shrink-0">▹</span>
                              <span>{responsibility}</span>
                            </motion.li>
                          ))}
                        </motion.ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>

                {/* Technologies */}
                <Card padding="lg">
                  <h4 className="text-text-muted mb-4 font-mono text-xs uppercase tracking-wider">
                    Technologies
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
      </Container>
    </AnimatedSection>
  )
}
