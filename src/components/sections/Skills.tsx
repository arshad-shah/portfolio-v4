// src/components/sections/Skills.tsx

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Monitor,
  Server,
  Database,
  Cloud,
  TestTube,
  Smartphone,
  Users,
} from 'lucide-react'
import { Container } from '@/components/common/Container'
import { SectionHeader } from '@/components/common/SectionHeader'
import { AnimatedSection } from '@/components/common/AnimatedSection'
import { Badge, BadgeGroup } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'
import { staggerContainer, staggerItem } from '@/lib/animations'
import { useAccessibleAnimation } from '@/hooks/usePreferredMotion'
import type { Skills as SkillsType } from '@/types/index'

interface SkillsProps {
  data: SkillsType
}

const categoryIcons: Record<string, React.ElementType> = {
  frontend: Monitor,
  backend: Server,
  database: Database,
  devops: Cloud,
  testing: TestTube,
  mobile: Smartphone,
  leadership: Users,
}

const categoryColors: Record<string, string> = {
  frontend: 'text-cyan-400',
  backend: 'text-emerald-400',
  database: 'text-amber-400',
  devops: 'text-blue-400',
  testing: 'text-rose-400',
  mobile: 'text-purple-400',
  leadership: 'text-accent-gold',
}

/**
 * Skills section — showcasing technical expertise by category
 */
export function Skills({ data }: SkillsProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const containerAnimation = useAccessibleAnimation(staggerContainer)
  const itemAnimation = useAccessibleAnimation(staggerItem)

  const categories = Object.entries(data.technical_skills)

  return (
    <AnimatedSection id="skills" className="bg-secondary py-24">
      <Container>
        <SectionHeader
          subtitle="Technologies and tools I work with daily"
        >
          <span className="text-accent-gold font-mono">{'<'}</span>
          <span className="text-text-primary">Skills</span>
          <span className="text-accent-gold font-mono">{' />'}</span>
        </SectionHeader>

        {/* Category Grid */}
        <motion.div
          variants={containerAnimation}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {categories.map(([key, category], index) => {
            const Icon = categoryIcons[key] || Monitor
            const color = categoryColors[key] || 'text-accent-gold'
            const isActive = activeCategory === key

            return (
              <motion.button
                key={key}
                variants={itemAnimation}
                custom={index}
                onClick={() => setActiveCategory(isActive ? null : key)}
                className={cn(
                  'group relative border p-5 text-left transition-all duration-300',
                  isActive
                    ? 'border-accent-gold/40 bg-primary shadow-lg shadow-accent-gold/5'
                    : 'border-border-subtle bg-primary/50 hover:border-border-medium hover:bg-primary'
                )}
              >
                <div className="mb-3 flex items-center gap-3">
                  <div
                    className={cn(
                      'flex h-9 w-9 items-center justify-center border transition-colors',
                      isActive
                        ? 'border-accent-gold/30 bg-accent-gold/10'
                        : 'border-border-subtle bg-secondary group-hover:border-border-medium'
                    )}
                  >
                    <Icon className={cn('h-4 w-4', color)} />
                  </div>
                  <div>
                    <h3 className="text-text-primary text-sm font-semibold">
                      {category.label}
                    </h3>
                    <p className="text-text-muted text-xs">
                      {category.skills.length} skills
                    </p>
                  </div>
                </div>

                {/* Preview — top 4 skills */}
                <div className="flex flex-wrap gap-1">
                  {category.skills.slice(0, 4).map((skill) => (
                    <span
                      key={skill}
                      className="text-text-secondary bg-secondary/80 px-2 py-0.5 font-mono text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                  {category.skills.length > 4 && (
                    <span className="text-text-muted px-2 py-0.5 text-xs">
                      +{category.skills.length - 4}
                    </span>
                  )}
                </div>

                {/* Expand indicator */}
                <div
                  className={cn(
                    'absolute right-3 top-3 h-1.5 w-1.5 rounded-full transition-colors',
                    isActive ? 'bg-accent-gold' : 'bg-text-muted/30'
                  )}
                />
              </motion.button>
            )
          })}
        </motion.div>

        {/* Expanded Skills View */}
        {activeCategory && data.technical_skills[activeCategory] && (
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="border-accent-gold/20 bg-primary mt-6 border p-6"
          >
            <h4 className="text-text-primary mb-4 font-mono text-sm font-semibold">
              <span className="text-accent-gold">const</span>{' '}
              {activeCategory}Skills <span className="text-accent-gold">=</span>{' '}
              <span className="text-text-muted">[</span>
            </h4>
            <BadgeGroup>
              {data.technical_skills[activeCategory].skills.map((skill, idx) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  size="sm"
                  animated
                  index={idx}
                  className="font-mono"
                >
                  {skill}
                </Badge>
              ))}
            </BadgeGroup>
            <p className="text-text-muted mt-4 font-mono text-sm">
              <span>]</span>
            </p>
          </motion.div>
        )}

        {/* Core Competencies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border-border-subtle bg-primary/50 mt-12 border p-6 backdrop-blur-sm"
        >
          <h3 className="text-text-primary mb-4 font-mono text-sm font-semibold">
            <span className="text-accent-gold">export</span>{' '}
            <span className="text-accent-blue">{'{ '}</span>
            coreCompetencies
            <span className="text-accent-blue">{' }'}</span>
          </h3>
          <BadgeGroup>
            {data.core_competencies.map((competency, idx) => (
              <Badge
                key={competency}
                variant="default"
                size="sm"
                animated
                index={idx}
                className="hover:border-accent-gold/50 font-mono"
              >
                {competency}
              </Badge>
            ))}
          </BadgeGroup>
        </motion.div>
      </Container>
    </AnimatedSection>
  )
}
