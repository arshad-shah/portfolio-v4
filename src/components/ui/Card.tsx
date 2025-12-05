// src/components/ui/Card.tsx

import { type HTMLAttributes, type ReactNode, forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { cardHover } from '@/lib/animations'
import { useAccessibleAnimation } from '@/hooks/usePreferredMotion'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
  interactive?: boolean
  as?: 'div' | 'article' | 'section'
}

const paddingClasses = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

/**
 * Card component with optional hover animation
 *
 * @example
 * <Card>
 *   <h3>Title</h3>
 *   <p>Content</p>
 * </Card>
 *
 * @example
 * <Card hover interactive padding="lg">
 *   <CardHeader>...</CardHeader>
 *   <CardContent>...</CardContent>
 * </Card>
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      className,
      hover = false,
      padding = 'md',
      interactive = false,
      as: Component = 'div',
      ...props
    },
    ref
  ) => {
    const animation = useAccessibleAnimation(cardHover)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const MotionComponent = motion[Component as keyof typeof motion] as any

    const baseClasses = cn(
      'bg-secondary border border-border-subtle',
      'transition-all duration-300',
      paddingClasses[padding],
      interactive && 'cursor-pointer',
      className
    )

    if (hover) {
      return (
        <MotionComponent
          ref={ref}
          variants={animation}
          initial="initial"
          whileHover="hover"
          className={baseClasses}
          {...props}
        >
          {children}
        </MotionComponent>
      )
    }

    return (
      <Component ref={ref} className={baseClasses} {...props}>
        {children}
      </Component>
    )
  }
)

Card.displayName = 'Card'

/**
 * Card Header component
 */
interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('mb-4', className)} {...props}>
        {children}
      </div>
    )
  }
)

CardHeader.displayName = 'CardHeader'

/**
 * Card Title component
 */
interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ children, className, as: Component = 'h3', ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn('font-display text-h3 text-text-primary font-semibold', className)}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

CardTitle.displayName = 'CardTitle'

/**
 * Card Description component
 */
interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode
}

export const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <p ref={ref} className={cn('text-text-secondary', className)} {...props}>
        {children}
      </p>
    )
  }
)

CardDescription.displayName = 'CardDescription'

/**
 * Card Content component
 */
interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('', className)} {...props}>
        {children}
      </div>
    )
  }
)

CardContent.displayName = 'CardContent'

/**
 * Card Footer component
 */
interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('border-border-subtle mt-4 flex items-center gap-2 border-t pt-4', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

CardFooter.displayName = 'CardFooter'
