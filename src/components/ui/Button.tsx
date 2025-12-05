// src/components/ui/Button.tsx

import { forwardRef, type ReactNode } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'
import { tapScale } from '@/lib/animations'
import { useAccessibleAnimation } from '@/hooks/usePreferredMotion'

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'link'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  fullWidth?: boolean
  asChild?: boolean
}

const variantClasses = {
  primary: 'bg-accent-gold text-primary hover:bg-accent-gold-light font-semibold',
  secondary:
    'border border-text-secondary text-text-secondary hover:border-accent-gold hover:text-accent-gold',
  ghost: 'text-text-secondary hover:text-accent-gold hover:bg-secondary',
  link: 'text-accent-blue hover:text-accent-blue-light underline-offset-4 hover:underline',
}

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

/**
 * Button component with multiple variants and animations
 * 
 * @example
 * <Button variant="primary" onClick={handleClick}>
 *   Click me
 * </Button>
 * 
 * @example
 * <Button variant="secondary" leftIcon={<Icon />} isLoading>
 *   Submit
 * </Button>
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const animation = useAccessibleAnimation(tapScale)

    return (
      <motion.button
        ref={ref}
        type={type}
        variants={animation}
        whileTap="tap"
        disabled={disabled || isLoading}
        className={cn(
          // Base styles
          'inline-flex items-center justify-center gap-2',
          'rounded-none font-medium',
          'transition-all duration-300',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:ring-offset-2 focus-visible:ring-offset-primary',
          'disabled:pointer-events-none disabled:opacity-50',
          // Variant styles
          variantClasses[variant],
          // Size styles
          sizeClasses[size],
          // Width
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {isLoading ? (
          <>
            <LoadingSpinner size={size} />
            <span>Loading...</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="inline-flex">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="inline-flex">{rightIcon}</span>}
          </>
        )}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'

/**
 * Loading spinner component for button loading state
 */
function LoadingSpinner({ size }: { size: 'sm' | 'md' | 'lg' }) {
  const sizeMap = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  }

  return (
    <svg
      className={cn('animate-spin', sizeMap[size])}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  )
}

/**
 * Icon button variant - square button for icons with enhanced design
 */
interface IconButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  icon: ReactNode
  'aria-label': string
  variant?: 'default' | 'ghost' | 'outline' | 'accent'
  size?: 'sm' | 'md' | 'lg'
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, className, size = 'md', variant = 'default', ...props }, ref) => {
    const animation = useAccessibleAnimation(tapScale)

    const sizeMap = {
      sm: 'h-8 w-8 text-sm',
      md: 'h-10 w-10 text-base',
      lg: 'h-12 w-12 text-lg',
    }

    const variantMap = {
      default: cn(
        'bg-secondary/50 text-text-secondary backdrop-blur-sm',
        'hover:bg-secondary hover:text-accent-gold',
        'border border-border-subtle hover:border-accent-gold/50',
        'shadow-sm hover:shadow-md hover:shadow-accent-gold/10'
      ),
      ghost: cn(
        'text-text-secondary',
        'hover:bg-secondary/80 hover:text-accent-gold',
        'hover:backdrop-blur-sm'
      ),
      outline: cn(
        'border-2 border-border-medium text-text-secondary',
        'hover:border-accent-gold hover:text-accent-gold',
        'hover:bg-accent-gold/5'
      ),
      accent: cn(
        'bg-accent-gold/10 text-accent-gold border border-accent-gold/20',
        'hover:bg-accent-gold/20 hover:border-accent-gold/40',
        'shadow-sm hover:shadow-md hover:shadow-accent-gold/20'
      ),
    }

    return (
      <motion.button
        ref={ref}
        type="button"
        variants={animation}
        whileTap="tap"
        whileHover={{ scale: 1.05 }}
        className={cn(
          // Base styles
          'group relative inline-flex items-center justify-center',
          'rounded-sm overflow-hidden',
          'transition-all duration-300 ease-out',
          // Focus styles for accessibility
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold',
          'focus-visible:ring-offset-2 focus-visible:ring-offset-primary',
          // Disabled state
          'disabled:pointer-events-none disabled:opacity-40 disabled:grayscale',
          // Active state
          'active:scale-95',
          // Variant styles
          variantMap[variant],
          // Size
          sizeMap[size],
          className
        )}
        {...props}
      >
        {/* Hover glow effect */}
        <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-accent-gold/0 via-accent-gold/5 to-accent-gold/0" />
        
        {/* Icon with smooth transition */}
        <span className="relative z-10 transition-transform duration-300 group-hover:scale-110">
          {icon}
        </span>
      </motion.button>
    )
  }
)

IconButton.displayName = 'IconButton'