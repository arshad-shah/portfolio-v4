// src/hooks/useKeyPress.ts

import { useEffect, useState, useCallback } from 'react'

/**
 * Hook to detect key press
 * @param targetKey - Key to detect (e.g., 'Escape', 'Enter')
 * @param handler - Optional callback to execute on key press
 * @returns boolean indicating if key is pressed
 * 
 * @example
 * const escapePressed = useKeyPress('Escape')
 * useKeyPress('Enter', () => handleSubmit())
 */
export function useKeyPress(
  targetKey: string,
  handler?: (event: KeyboardEvent) => void
): boolean {
  const [isPressed, setIsPressed] = useState(false)

  const downHandler = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === targetKey) {
        setIsPressed(true)
        handler?.(event)
      }
    },
    [targetKey, handler]
  )

  const upHandler = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === targetKey) {
        setIsPressed(false)
      }
    },
    [targetKey]
  )

  useEffect(() => {
    window.addEventListener('keydown', downHandler)
    window.addEventListener('keyup', upHandler)

    return () => {
      window.removeEventListener('keydown', downHandler)
      window.removeEventListener('keyup', upHandler)
    }
  }, [downHandler, upHandler])

  return isPressed
}

/**
 * Hook to detect multiple key combination
 * @param keys - Array of keys to detect (e.g., ['Control', 'k'])
 * @param handler - Callback to execute when combination is pressed
 * 
 * @example
 * useKeyCombination(['Control', 'k'], () => openSearch())
 */
export function useKeyCombination(
  keys: string[],
  handler: (event: KeyboardEvent) => void
) {
  useEffect(() => {
    const pressedKeys = new Set<string>()

    const downHandler = (event: KeyboardEvent) => {
      pressedKeys.add(event.key)

      const allKeysPressed = keys.every((key) => pressedKeys.has(key))

      if (allKeysPressed) {
        event.preventDefault()
        handler(event)
      }
    }

    const upHandler = (event: KeyboardEvent) => {
      pressedKeys.delete(event.key)
    }

    window.addEventListener('keydown', downHandler)
    window.addEventListener('keyup', upHandler)

    return () => {
      window.removeEventListener('keydown', downHandler)
      window.removeEventListener('keyup', upHandler)
    }
  }, [keys, handler])
}

/**
 * Predefined hooks for common keys
 */
export const useEscapeKey = (handler: () => void) => {
  useKeyPress('Escape', handler)
}

export const useEnterKey = (handler: () => void) => {
  useKeyPress('Enter', handler)
}

export const useArrowKeys = (handlers: {
  onUp?: () => void
  onDown?: () => void
  onLeft?: () => void
  onRight?: () => void
}) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault()
          handlers.onUp?.()
          break
        case 'ArrowDown':
          event.preventDefault()
          handlers.onDown?.()
          break
        case 'ArrowLeft':
          handlers.onLeft?.()
          break
        case 'ArrowRight':
          handlers.onRight?.()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handlers])
}