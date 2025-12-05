// src/hooks/usePreferredMotion.ts

import { useEffect, useState } from 'react'

/**
 * Hook to detect user's motion preference
 * @returns 'reduce' if user prefers reduced motion, 'no-preference' otherwise
 *
 * @example
 * const prefersReducedMotion = usePreferredMotion() === 'reduce'
 * const animation = prefersReducedMotion ? {} : { animate: { x: 100 } }
 */
export function usePreferredMotion(): 'reduce' | 'no-preference' {
  const [motion, setMotion] = useState<'reduce' | 'no-preference'>(() => {
    if (typeof window === 'undefined') return 'no-preference'
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    return mediaQuery.matches ? 'reduce' : 'no-preference'
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    // Update on change
    const handleChange = (event: MediaQueryListEvent) => {
      setMotion(event.matches ? 'reduce' : 'no-preference')
    }

    mediaQuery.addEventListener('change', handleChange)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [])

  return motion
}

/**
 * Hook to check if user prefers reduced motion
 * @returns boolean indicating if reduced motion is preferred
 */
export function usePrefersReducedMotion(): boolean {
  return usePreferredMotion() === 'reduce'
}

/**
 * Hook to get animation config based on user preference
 * @param animationConfig - Animation configuration to use if motion is allowed
 * @returns Animation config or empty object if reduced motion is preferred
 *
 * @example
 * const animation = useMotionConfig({
 *   initial: { opacity: 0 },
 *   animate: { opacity: 1 }
 * })
 */
export function useMotionConfig<T extends Record<string, unknown>>(
  animationConfig: T
): T | Record<string, never> {
  const prefersReducedMotion = usePrefersReducedMotion()
  return prefersReducedMotion ? {} : animationConfig
}

/**
 * Hook to get conditional animation variants
 * Returns full variants if motion allowed, simplified if reduced motion preferred
 */
export function useAccessibleAnimation<T extends Record<string, unknown>>(
  fullAnimation: T,
  reducedAnimation?: Partial<T>
): T {
  const prefersReducedMotion = usePrefersReducedMotion()

  if (!prefersReducedMotion) {
    return fullAnimation
  }

  // If reduced animation provided, use it
  if (reducedAnimation) {
    return { ...fullAnimation, ...reducedAnimation } as T
  }

  // Otherwise, remove motion properties but keep opacity/visibility changes
  const accessible = { ...fullAnimation }
  const motionKeys = ['x', 'y', 'scale', 'rotate', 'rotateX', 'rotateY', 'rotateZ']

  Object.keys(accessible).forEach((key) => {
    const value = accessible[key]
    if (typeof value === 'object' && value !== null) {
      const objValue = value as Record<string, unknown>
      motionKeys.forEach((motionKey) => {
        if (motionKey in objValue) {
          delete objValue[motionKey]
        }
      })

      // Also update transition to be instant
      if ('transition' in objValue) {
        objValue.transition = { duration: 0 }
      }
    }
  })

  return accessible as T
}
