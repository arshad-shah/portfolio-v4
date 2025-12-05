// src/components/ui/Badge.tsx

import { type HTMLAttributes, type ReactNode, forwardRef } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'
import { badgeEntrance } from '@/lib/animations'
import { useAccessibleAnimation } from '@/hooks/usePreferredMotion'

interface BadgeProps extends Omit<HTMLMotionProps<'span'>, 'children'> {
  children: ReactNode
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error'
  size?: 'sm' | 'md' | 'lg'
  animated?: boolean
  index?: number
}

const variantClasses = {
  default: 'bg-secondary border-text-secondary/20 text-text-secondary',
  primary: 'bg-accent-gold/10 border-accent-gold/20 text-accent-gold',
  secondary: 'bg-accent-blue/10 border-accent-blue/20 text-accent-blue',
  success: 'bg-green-500/10 border-green-500/20 text-green-400',
  warning: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400',
  error: 'bg-red-500/10 border-red-500/20 text-red-400',
}

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-1.5 text-base',
}

/**
 * Badge component for labels and tags
 *
 * @example
 * <Badge variant="primary">Featured</Badge>
 *
 * @example
 * <Badge variant="secondary" size="sm">
 *   TypeScript
 * </Badge>
 *
 * @example
 * <Badge animated index={0}>
 *   Animated Badge
 * </Badge>
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      children,
      className,
      variant = 'default',
      size = 'md',
      animated = false,
      index = 0,
      ...props
    },
    ref
  ) => {
    const animation = useAccessibleAnimation(badgeEntrance)

    const baseClasses = cn(
      'inline-flex items-center justify-center',
      'rounded-sm border font-medium',
      'transition-all duration-300',
      'hover:scale-105',
      variantClasses[variant],
      sizeClasses[size],
      className
    )

    if (animated) {
      return (
        <motion.span
          ref={ref}
          variants={animation}
          initial="hidden"
          animate="visible"
          custom={index}
          className={baseClasses}
          {...props}
        >
          {children}
        </motion.span>
      )
    }

    // For non-animated badges, just render a regular span
    // Motion props will be ignored by the DOM
    return (
      <span ref={ref} className={baseClasses}>
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'

/**
 * Technology Badge - specialized badge for tech stack
 */
interface TechBadgeProps extends Omit<BadgeProps, 'variant'> {
  technology: string
}

export const TechBadge = forwardRef<HTMLSpanElement, TechBadgeProps>(
  ({ technology, className, ...props }, ref) => {
    // Determine variant based on technology category
    const getVariant = (tech: string): BadgeProps['variant'] => {
      const frontend = ['React', 'TypeScript', 'JavaScript', 'Next.js', 'Tailwind']
      const backend = ['Spring Boot', 'Node.js', 'Java', 'Kotlin', 'Python']

      if (frontend.some((t) => tech.includes(t))) return 'secondary'
      if (backend.some((t) => tech.includes(t))) return 'primary'
      return 'default'
    }

    return (
      <Badge ref={ref} variant={getVariant(technology)} className={className} {...props}>
        {technology}
      </Badge>
    )
  }
)

TechBadge.displayName = 'TechBadge'

/**
 * Status Badge - for current/featured items
 */
interface StatusBadgeProps extends Omit<BadgeProps, 'variant' | 'children'> {
  status: 'current' | 'featured' | 'new' | 'updated'
}

export const StatusBadge = forwardRef<HTMLSpanElement, StatusBadgeProps>(
  ({ status, ...props }, ref) => {
    const statusConfig = {
      current: { variant: 'success' as const, text: 'Current' },
      featured: { variant: 'primary' as const, text: 'Featured' },
      new: { variant: 'secondary' as const, text: 'New' },
      updated: { variant: 'warning' as const, text: 'Updated' },
    }

    const config = statusConfig[status]

    return (
      <Badge ref={ref} variant={config.variant} {...props}>
        {config.text}
      </Badge>
    )
  }
)

StatusBadge.displayName = 'StatusBadge'

/**
 * Badge Group - wrapper for multiple badges
 */
interface BadgeGroupProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  animated?: boolean
}

export const BadgeGroup = forwardRef<HTMLDivElement, BadgeGroupProps>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ children, className, animated: _animated = false, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('flex flex-wrap gap-2', className)} {...props}>
        {children}
      </div>
    )
  }
)

BadgeGroup.displayName = 'BadgeGroup'
