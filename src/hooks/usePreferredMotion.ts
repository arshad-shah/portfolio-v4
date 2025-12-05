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
  const [motion, setMotion] = useState<'reduce' | 'no-preference'>('no-preference')

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    // Set initial value
    setMotion(mediaQuery.matches ? 'reduce' : 'no-preference')

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
export function useMotionConfig<T extends Record<string, any>>(
  animationConfig: T
): T | Record<string, never> {
  const prefersReducedMotion = usePrefersReducedMotion()
  return prefersReducedMotion ? {} : animationConfig
}

/**
 * Hook to get conditional animation variants
 * Returns full variants if motion allowed, simplified if reduced motion preferred
 */
export function useAccessibleAnimation<T extends Record<string, any>>(
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
    if (typeof accessible[key] === 'object' && accessible[key] !== null) {
      motionKeys.forEach((motionKey) => {
        if (motionKey in accessible[key]) {
          delete accessible[key][motionKey]
        }
      })

      // Also update transition to be instant
      if ('transition' in accessible[key]) {
        accessible[key].transition = { duration: 0 }
      }
    }
  })

  return accessible as T
}