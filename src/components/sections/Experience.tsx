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
  const [expandedAchievements, setExpandedAchievements] = useState<Set<number>>(new Set())
  const [expandedResponsibilities, setExpandedResponsibilities] = useState<Set<number>>(new Set())
  const [expandedTechnologies, setExpandedTechnologies] = useState<Set<number>>(new Set())
  const isMobile = useIsMobile()

  const responsibilitiesPreviewCount = 4
  const achievementsPreviewCount = 3
  const technologiesPreviewCount = 8

  const containerAnimation = useAccessibleAnimation(staggerContainer)
  const itemAnimation = useAccessibleAnimation(staggerItem)

  const toggleAchievementExpansion = (index: number) => {
    const next = new Set(expandedAchievements)
    if (next.has(index)) {
      next.delete(index)
    } else {
      next.add(index)
    }
    setExpandedAchievements(next)
  }

  const toggleResponsibilities = (index: number) => {
    const next = new Set(expandedResponsibilities)
    if (next.has(index)) {
      next.delete(index)
    } else {
      next.add(index)
    }
    setExpandedResponsibilities(next)
  }

  const toggleTechnologies = (index: number) => {
    const next = new Set(expandedTechnologies)
    if (next.has(index)) {
      next.delete(index)
    } else {
      next.add(index)
    }
    setExpandedTechnologies(next)
  }

  // Get all unique technologies
  const allTechnologies = Array.from(new Set(data.flatMap((job) => job.technologies))).sort()

  return (
    <AnimatedSection id="experience" className="bg-primary py-24">
      <Container>
        <SectionHeader>
          <span className="text-accent-gold font-mono">function</span>{' '}
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
                        'border-primary absolute top-6 -left-2 h-4 w-4 rounded-full border-4 transition-colors',
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
                      <p className="text-text-secondary text-sm">{job.company}</p>
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
                className="border-secondary-light bg-secondary rounded-sm border p-4 font-mono text-xs"
              >
                <div className="mb-2 flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-red-500" />
                  <div className="h-2 w-2 rounded-full bg-yellow-500" />
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                </div>
                <div className="text-text-secondary space-y-1">
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
                      {calculateDuration(data[activeJob].startDate, data[activeJob].endDate)}
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
                            <span className="font-mono">
                              {formatDate(data[activeJob].startDate)} -{' '}
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

                      {data[activeJob].current && (
                        <Badge variant="success" size="sm">
                          Current
                        </Badge>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="pt-4">
                    <p className="text-text-secondary">{data[activeJob].description}</p>

                    {/* Impact snapshot keeps key outcomes scannable */}
                    {data[activeJob].achievements && data[activeJob].achievements.length > 0 && (
                      <div className="border-accent-gold/30 bg-secondary/40 mt-6 rounded-sm border p-4">
                        <h4 className="text-accent-gold mb-3 flex items-center gap-2 font-mono text-sm">
                          <Briefcase className="h-4 w-4" />
                          // Impact snapshot
                        </h4>
                        <ul className="text-text-secondary space-y-2 text-sm">
                          {data[activeJob].achievements
                            .slice(0, achievementsPreviewCount)
                            .map((item, idx) => (
                              <li key={idx} className="flex gap-2">
                                <span className="text-accent-gold">▸</span>
                                <span>{item}</span>
                              </li>
                            ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Responsibilities */}
                <Card padding="lg">
                  <h4 className="text-accent-gold mb-4 font-mono text-sm">
                    // Key Responsibilities:
                  </h4>
                  <motion.ul
                    variants={containerAnimation}
                    initial="hidden"
                    animate="visible"
                    className="space-y-4"
                  >
                    {data[activeJob].responsibilities
                      .slice(
                        0,
                        expandedResponsibilities.has(activeJob)
                          ? data[activeJob].responsibilities.length
                          : responsibilitiesPreviewCount
                      )
                      .map((responsibility, idx) => (
                        <motion.li
                          key={idx}
                          variants={itemAnimation}
                          custom={idx}
                          className="group flex gap-3 transition-all hover:-translate-y-0.5"
                        >
                          <div className="bg-secondary group-hover:bg-accent-gold/20 mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-sm transition-colors">
                            <ChevronRight className="text-accent-gold h-4 w-4" />
                          </div>
                          <span className="text-text-secondary group-hover:text-text-primary">
                            {responsibility}
                          </span>
                        </motion.li>
                      ))}
                  </motion.ul>

                  {data[activeJob].responsibilities.length > responsibilitiesPreviewCount && (
                    <button
                      type="button"
                      onClick={() => toggleResponsibilities(activeJob)}
                      className="text-accent-gold mt-4 text-sm font-medium hover:underline"
                    >
                      {expandedResponsibilities.has(activeJob) ? 'Show fewer' : 'Show more'}
                    </button>
                  )}
                </Card>

                {/* Achievements (if available) */}
                {data[activeJob].achievements && data[activeJob].achievements!.length > 0 && (
                  <Card padding="lg" className="border-accent-gold/20">
                    <h4 className="text-accent-gold mb-4 flex items-center gap-2 font-mono text-sm">
                      <Briefcase className="h-4 w-4" />
                      // Key Achievements:
                    </h4>
                    <motion.ul
                      variants={containerAnimation}
                      initial="hidden"
                      animate="visible"
                      className="space-y-3"
                    >
                      {data[activeJob]
                        .achievements!.slice(
                          0,
                          expandedAchievements.has(activeJob)
                            ? data[activeJob].achievements!.length
                            : achievementsPreviewCount
                        )
                        .map((achievement, idx) => (
                          <motion.li
                            key={idx}
                            variants={itemAnimation}
                            custom={idx}
                            className="text-text-secondary flex gap-3 text-sm"
                          >
                            <span className="text-accent-gold">▸</span>
                            <span>{achievement}</span>
                          </motion.li>
                        ))}
                    </motion.ul>

                    {data[activeJob].achievements!.length > achievementsPreviewCount && (
                      <button
                        type="button"
                        onClick={() => toggleAchievementExpansion(activeJob)}
                        className="text-accent-gold mt-4 text-sm font-medium hover:underline"
                      >
                        {expandedAchievements.has(activeJob) ? 'Show fewer' : 'Show more'}
                      </button>
                    )}
                  </Card>
                )}

                {/* Technologies */}
                <Card padding="lg">
                  <h4 className="text-accent-gold mb-4 font-mono text-sm">// Technologies Used:</h4>
                  <BadgeGroup>
                    {data[activeJob].technologies
                      .slice(
                        0,
                        expandedTechnologies.has(activeJob)
                          ? data[activeJob].technologies.length
                          : technologiesPreviewCount
                      )
                      .map((tech, idx) => (
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

                  {data[activeJob].technologies.length > technologiesPreviewCount && (
                    <button
                      type="button"
                      onClick={() => toggleTechnologies(activeJob)}
                      className="text-accent-gold mt-4 text-sm font-medium hover:underline"
                    >
                      {expandedTechnologies.has(activeJob) ? 'Show fewer' : 'Show more'}
                    </button>
                  )}
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
          className="border-secondary-light bg-secondary/30 mt-20 rounded-sm border p-6 backdrop-blur-sm lg:p-8"
        >
          <h3 className="text-text-primary mb-6 font-mono text-xl font-bold">
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
                className="hover:border-accent-gold/50 font-mono"
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
