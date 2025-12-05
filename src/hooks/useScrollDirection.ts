// src/hooks/useScrollDirection.ts

import { useState, useEffect } from 'react'
import { throttle } from '@/lib/utils'

export type ScrollDirection = 'up' | 'down' | null

interface UseScrollDirectionOptions {
  threshold?: number
  throttleMs?: number
}

/**
 * Hook to detect scroll direction
 * @param options - Configuration options
 * @returns Current scroll direction and scroll position
 *
 * @example
 * const { scrollDirection, scrollY } = useScrollDirection({ threshold: 10 })
 * const isScrollingDown = scrollDirection === 'down'
 */
export function useScrollDirection(options: UseScrollDirectionOptions = {}) {
  const { threshold = 10, throttleMs = 100 } = options

  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(null)
  const [scrollY, setScrollY] = useState(() => (typeof window !== 'undefined' ? window.scrollY : 0))
  const [prevScrollY, setPrevScrollY] = useState(() =>
    typeof window !== 'undefined' ? window.scrollY : 0
  )

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleScroll = throttle(() => {
      const currentScrollY = window.scrollY

      // Update scroll position
      setScrollY(currentScrollY)

      // Determine direction only if scroll change exceeds threshold
      if (Math.abs(currentScrollY - prevScrollY) < threshold) {
        return
      }

      if (currentScrollY > prevScrollY) {
        setScrollDirection('down')
      } else if (currentScrollY < prevScrollY) {
        setScrollDirection('up')
      }

      setPrevScrollY(currentScrollY)
    }, throttleMs)

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [prevScrollY, threshold, throttleMs])

  return { scrollDirection, scrollY }
}

/**
 * Hook to detect if user has scrolled past a certain threshold
 * @param threshold - Scroll position threshold in pixels
 * @returns boolean indicating if scrolled past threshold
 */
export function useScrollPast(threshold: number = 100): boolean {
  const [isPast, setIsPast] = useState(() =>
    typeof window !== 'undefined' ? window.scrollY > threshold : false
  )

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleScroll = throttle(() => {
      setIsPast(window.scrollY > threshold)
    }, 100)

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [threshold])

  return isPast
}

/**
 * Hook to detect if user is at the top of the page
 */
export function useIsAtTop(): boolean {
  return !useScrollPast(10)
}

/**
 * Hook to detect if user is at the bottom of the page
 */
export function useIsAtBottom(): boolean {
  const [isAtBottom, setIsAtBottom] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleScroll = throttle(() => {
      const scrollHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY
      const clientHeight = window.innerHeight

      setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 10)
    }, 100)

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return isAtBottom
}
