// src/components/common/Container.tsx

import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ContainerProps {
  children: ReactNode
  className?: string
  as?: 'div' | 'section' | 'article' | 'main' | 'header' | 'footer'
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

const sizeClasses = {
  sm: 'max-w-2xl',
  md: 'max-w-4xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  full: 'max-w-full',
}

/**
 * Container component for consistent content width
 *
 * @example
 * <Container>
 *   <h1>Content</h1>
 * </Container>
 *
 * @example
 * <Container size="sm" as="section">
 *   <p>Narrow content</p>
 * </Container>
 */
export function Container({
  children,
  className,
  as: Component = 'div',
  size = 'xl',
}: ContainerProps) {
  return (
    <Component className={cn('mx-auto w-full px-6', sizeClasses[size], className)}>
      {children}
    </Component>
  )
}
