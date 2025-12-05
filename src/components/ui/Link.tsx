// src/components/ui/Link.tsx

import { type AnchorHTMLAttributes, type ReactNode, forwardRef } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

interface LinkProps extends Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  | 'onDrag' | 'onDragStart' | 'onDragEnd'
  | 'onAnimationStart' | 'onAnimationEnd'
> {
  children: ReactNode
  href: string
  external?: boolean
  variant?: 'default' | 'primary' | 'secondary' | 'nav'
  showUnderline?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

const variantClasses = {
  default: 'text-text-secondary hover:text-text-primary',
  primary: 'text-accent-gold hover:text-accent-gold-light',
  secondary: 'text-accent-blue hover:text-accent-blue-light',
  nav: 'text-text-secondary hover:text-accent-gold',
}

/**
 * Link component with external link handling and animations
 * 
 * @example
 * <Link href="/about">About Me</Link>
 * 
 * @example
 * <Link href="https://github.com" external>
 *   GitHub
 * </Link>
 * 
 * @example
 * <Link href="#projects" variant="nav" showUnderline>
 *   Projects
 * </Link>
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      children,
      href,
      external = false,
      variant = 'default',
      showUnderline = false,
      leftIcon,
      rightIcon,
      className,
      ...props
    },
    ref
  ) => {
    // Auto-detect external links
    const isExternal = external || href.startsWith('http') || href.startsWith('mailto:')

    const externalProps = isExternal
      ? {
          target: '_blank',
          rel: 'noopener noreferrer',
        }
      : {}

    return (
      <motion.a
        ref={ref}
        href={href}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          'inline-flex items-center gap-1',
          'transition-all duration-300',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded-sm',
          variantClasses[variant],
          showUnderline && 'relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100',
          className
        )}
        {...externalProps}
        {...props}
      >
        {leftIcon && <span className="inline-flex">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="inline-flex">{rightIcon}</span>}
        {isExternal && !rightIcon && (
          <svg
            className="h-3.5 w-3.5 opacity-70"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        )}
      </motion.a>
    )
  }
)

Link.displayName = 'Link'

/**
 * Nav Link - specialized link for navigation
 */
interface NavLinkProps extends Omit<LinkProps, 'variant'> {
  active?: boolean
}

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ active = false, className, children, ...props }, ref) => {
    return (
      <Link
        ref={ref}
        variant="nav"
        showUnderline
        className={cn(
          'font-medium',
          active && 'text-accent-gold after:scale-x-100',
          className
        )}
        {...props}
      >
        {children}
      </Link>
    )
  }
)

NavLink.displayName = 'NavLink'

/**
 * Social Link - specialized link for social media with icon
 */
interface SocialLinkProps extends Omit<
  HTMLMotionProps<'a'>,
  'children' | 'onDrag' | 'onDragStart' | 'onDragEnd'
> {
  platform: string
  icon: ReactNode
  label?: string
  href: string
}

export const SocialLink = forwardRef<HTMLAnchorElement, SocialLinkProps>(
  ({ platform, icon, label, className, href, ...props }, ref) => {
    return (
      <motion.a
        ref={ref}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label || `${platform} profile`}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          // Base styles
          'group relative inline-flex items-center justify-center',
          'rounded-sm overflow-hidden',
          'transition-all duration-300 ease-out',
          // Background and border
          'bg-secondary/50 backdrop-blur-sm',
          'border border-border-subtle',
          'hover:border-accent-gold/50',
          // Colors
          'text-text-secondary hover:text-accent-gold',
          // Shadow
          'shadow-sm hover:shadow-md hover:shadow-accent-gold/10',
          // Focus styles for accessibility
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold',
          'focus-visible:ring-offset-2 focus-visible:ring-offset-primary',
          className
        )}
        {...props}
      >
        {/* Hover glow effect */}
        <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-accent-gold/0 via-accent-gold/5 to-accent-gold/0" />
        
        {/* Icon with smooth transition */}
        <span className="relative z-10 transition-transform duration-300 group-hover:rotate-6">
          {icon}
        </span>
      </motion.a>
    )
  }
)

SocialLink.displayName = 'SocialLink'

/**
 * Button Link - link styled as button
 */
interface ButtonLinkProps extends Omit<LinkProps, 'variant'> {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
}

export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      className,
      children,
      leftIcon,
      rightIcon,
      ...props
    },
    ref
  ) => {
    const variantStyles = {
      primary: 'bg-accent-gold text-primary hover:bg-accent-gold-light',
      secondary: 'border border-text-secondary text-text-secondary hover:border-accent-gold hover:text-accent-gold',
    }

    const sizeStyles = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    }

    return (
      <Link
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2',
          'font-semibold',
          'transition-all duration-300',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        {...props}
      >
        {children}
      </Link>
    )
  }
)

ButtonLink.displayName = 'ButtonLink'