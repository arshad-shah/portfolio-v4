// src/hooks/useIntersectionObserver.ts

import { useEffect, useRef, useState } from 'react'

interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean
  onChange?: (isIntersecting: boolean, entry: IntersectionObserverEntry) => void
}

/**
 * Hook to observe element visibility using IntersectionObserver
 * @param options - IntersectionObserver options
 * @returns ref to attach to element and isIntersecting state
 *
 * @example
 * const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.5 })
 * return <div ref={ref}>{isIntersecting ? 'Visible!' : 'Not visible'}</div>
 */
export function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>(
  options: UseIntersectionObserverOptions = {}
) {
  const {
    threshold = 0.1,
    root = null,
    rootMargin = '0px',
    freezeOnceVisible = false,
    onChange,
  } = options

  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasIntersected, setHasIntersected] = useState(false)
  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // If frozen and already intersected, don't observe
    if (freezeOnceVisible && hasIntersected) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting

        setIsIntersecting(isElementIntersecting)

        if (isElementIntersecting) {
          setHasIntersected(true)
        }

        // Call onChange callback if provided
        onChange?.(isElementIntersecting, entry)

        // If freezeOnceVisible and now visible, disconnect observer
        if (freezeOnceVisible && isElementIntersecting) {
          observer.disconnect()
        }
      },
      { threshold, root, rootMargin }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [threshold, root, rootMargin, freezeOnceVisible, hasIntersected, onChange])

  return { ref, isIntersecting, hasIntersected }
}

/**
 * Hook to observe multiple elements
 * @param options - IntersectionObserver options
 * @returns function to register elements and Map of element visibility
 */
export function useIntersectionObservers<T extends HTMLElement = HTMLDivElement>(
  options: UseIntersectionObserverOptions = {}
) {
  const { threshold = 0.1, root = null, rootMargin = '0px' } = options

  const [entries, setEntries] = useState<Map<Element, boolean>>(new Map())
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (observedEntries) => {
        setEntries((prev) => {
          const next = new Map(prev)
          observedEntries.forEach((entry) => {
            next.set(entry.target, entry.isIntersecting)
          })
          return next
        })
      },
      { threshold, root, rootMargin }
    )

    return () => {
      observerRef.current?.disconnect()
    }
  }, [threshold, root, rootMargin])

  const observe = (element: T | null) => {
    if (element && observerRef.current) {
      observerRef.current.observe(element)
    }
  }

  const unobserve = (element: T | null) => {
    if (element && observerRef.current) {
      observerRef.current.unobserve(element)
    }
  }

  return { observe, unobserve, entries }
}

/**
 * Hook specifically for animating elements on scroll
 * Returns true once when element becomes visible
 */
export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  options: Omit<UseIntersectionObserverOptions, 'freezeOnceVisible'> = {}
) {
  return useIntersectionObserver<T>({
    ...options,
    freezeOnceVisible: true,
  })
}

/**
 * Hook for lazy loading images
 * Returns src to use (placeholder or actual) and ref to attach to img
 */
export function useLazyImage(
  src: string,
  placeholder: string = '',
  options: UseIntersectionObserverOptions = {}
) {
  const { ref, isIntersecting, hasIntersected } = useIntersectionObserver<HTMLImageElement>({
    ...options,
    freezeOnceVisible: true,
  })

  const [imageSrc, setImageSrc] = useState(placeholder)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (hasIntersected && src !== imageSrc) {
      const img = new Image()
      img.src = src
      img.onload = () => {
        setImageSrc(src)
        setIsLoaded(true)
      }
    }
  }, [hasIntersected, src, imageSrc])

  return { ref, src: imageSrc, isLoaded, isIntersecting }
}

/**
 * Hook to detect if element is in viewport
 * Useful for pausing/playing videos, animations, etc.
 */
export function useIsInViewport<T extends HTMLElement = HTMLDivElement>(
  options: UseIntersectionObserverOptions = {}
) {
  const { ref, isIntersecting } = useIntersectionObserver<T>({
    threshold: 0.5,
    ...options,
    freezeOnceVisible: false, // Always observe
  })

  return { ref, isInViewport: isIntersecting }
}
