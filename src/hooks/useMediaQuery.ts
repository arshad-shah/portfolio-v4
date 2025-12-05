// src/hooks/useMediaQuery.ts

import { useState, useEffect } from 'react'
import { BREAKPOINTS } from '@/lib/constants'

/**
 * Hook to detect media query matches
 * @param query - Media query string or breakpoint key
 * @returns boolean indicating if media query matches
 *
 * @example
 * const isMobile = useMediaQuery('sm')
 * const isDesktop = useMediaQuery('(min-width: 1024px)')
 */
export function useMediaQuery(query: string | keyof typeof BREAKPOINTS): boolean {
  // Convert breakpoint key to media query if needed
  const mediaQuery =
    typeof query === 'string' && query in BREAKPOINTS
      ? `(min-width: ${BREAKPOINTS[query as keyof typeof BREAKPOINTS]}px)`
      : query

  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(mediaQuery).matches
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQueryList = window.matchMedia(mediaQuery)

    // Update state when media query changes
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    // Add event listener
    mediaQueryList.addEventListener('change', handleChange)

    // Cleanup
    return () => {
      mediaQueryList.removeEventListener('change', handleChange)
    }
  }, [mediaQuery])

  return matches
}

/**
 * Predefined hooks for common breakpoints
 */
export const useIsMobile = () => useMediaQuery(`(max-width: ${BREAKPOINTS.sm - 1}px)`)
export const useIsTablet = () =>
  useMediaQuery(`(min-width: ${BREAKPOINTS.sm}px) and (max-width: ${BREAKPOINTS.lg - 1}px)`)
export const useIsDesktop = () => useMediaQuery(`(min-width: ${BREAKPOINTS.lg}px)`)

/**
 * Hook to get current breakpoint
 * @returns Current breakpoint key
 */
export function useBreakpoint(): keyof typeof BREAKPOINTS | null {
  const [breakpoint, setBreakpoint] = useState<keyof typeof BREAKPOINTS | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const updateBreakpoint = () => {
      const width = window.innerWidth

      if (width >= BREAKPOINTS['2xl']) {
        setBreakpoint('2xl')
      } else if (width >= BREAKPOINTS.xl) {
        setBreakpoint('xl')
      } else if (width >= BREAKPOINTS.lg) {
        setBreakpoint('lg')
      } else if (width >= BREAKPOINTS.md) {
        setBreakpoint('md')
      } else if (width >= BREAKPOINTS.sm) {
        setBreakpoint('sm')
      } else {
        setBreakpoint(null)
      }
    }

    // Set initial value
    updateBreakpoint()

    // Update on resize
    window.addEventListener('resize', updateBreakpoint)

    return () => {
      window.removeEventListener('resize', updateBreakpoint)
    }
  }, [])

  return breakpoint
}
