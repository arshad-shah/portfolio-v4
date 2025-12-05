// src/components/common/AnimatedSection.tsx

import { type ReactNode } from 'react'
import { motion, type Variants } from 'framer-motion'
import { cn } from '@/lib/utils'
import { fadeInUp } from '@/lib/animations'
import { useAccessibleAnimation } from '@/hooks/usePreferredMotion'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  id?: string
  variants?: Variants
  delay?: number
  once?: boolean
}

/**
 * Wrapper component that animates content on scroll
 *
 * @example
 * <AnimatedSection id="about">
 *   <h2>About Me</h2>
 *   <p>Content here...</p>
 * </AnimatedSection>
 */
export function AnimatedSection({
  children,
  className,
  id,
  variants = fadeInUp,
  delay = 0,
  once = true,
}: AnimatedSectionProps) {
  const animation = useAccessibleAnimation(variants)

  return (
    <motion.section
      id={id}
      variants={animation}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-100px' }}
      transition={{ delay }}
      className={cn('relative', className)}
    >
      {children}
    </motion.section>
  )
}
