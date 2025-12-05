// src/components/common/SectionHeader.tsx

import { type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { fadeInUp, fadeInRight } from '@/lib/animations'
import { useAccessibleAnimation } from '@/hooks/usePreferredMotion'

interface SectionHeaderProps {
  children: ReactNode
  className?: string
  subtitle?: string
  align?: 'left' | 'center'
  showLine?: boolean
}

/**
 * Section header with title and optional decorative line
 *
 * @example
 * <SectionHeader>
 *   <span className="text-accent-gold">#</span> Experience
 * </SectionHeader>
 *
 * @example
 * <SectionHeader subtitle="What I've been working on" align="center">
 *   Projects
 * </SectionHeader>
 */
export function SectionHeader({
  children,
  className,
  subtitle,
  align = 'left',
  showLine = true,
}: SectionHeaderProps) {
  const titleAnimation = useAccessibleAnimation(fadeInUp)
  const lineAnimation = useAccessibleAnimation(fadeInRight)

  return (
    <div className={cn('mb-16', align === 'center' ? 'text-center' : '', className)}>
      <div className={cn('flex items-center gap-6', align === 'center' && 'justify-center')}>
        <motion.h2
          variants={titleAnimation}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="font-display text-display text-text-primary"
        >
          {children}
        </motion.h2>

        {showLine && (
          <motion.div
            variants={lineAnimation}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className={cn(
              'from-text-secondary/30 h-px flex-1 bg-gradient-to-r to-transparent',
              align === 'center' && 'hidden'
            )}
          />
        )}
      </div>

      {subtitle && (
        <motion.p
          variants={titleAnimation}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className={cn(
            'text-text-secondary mt-4',
            align === 'center' ? 'mx-auto max-w-2xl' : 'max-w-xl'
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
