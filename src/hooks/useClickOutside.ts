// src/hooks/useClickOutside.ts

import { useEffect, type RefObject } from 'react'

/**
 * Hook to detect clicks outside of a ref element
 * @param ref - React ref to the element
 * @param handler - Callback function to execute on outside click
 * 
 * @example
 * const ref = useRef<HTMLDivElement>(null)
 * useClickOutside(ref, () => setIsOpen(false))
 */
export function useClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null>,
  handler: (event: MouseEvent | TouchEvent) => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const element = ref.current
      if (!element || element.contains(event.target as Node)) {
        return
      }
      handler(event)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler])
}