// src/hooks/useCopyToClipboard.ts

import { useState } from 'react'

interface CopyToClipboardResult {
  value: string | null
  success: boolean | null
  copy: (text: string) => Promise<void>
  reset: () => void
}

/**
 * Hook to copy text to clipboard
 * @returns object with copy function, copied value, and success state
 * 
 * @example
 * const { copy, success } = useCopyToClipboard()
 * <button onClick={() => copy('text to copy')}>
 *   {success ? 'Copied!' : 'Copy'}
 * </button>
 */
export function useCopyToClipboard(): CopyToClipboardResult {
  const [value, setValue] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean | null>(null)

  const copy = async (text: string) => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported')
      setSuccess(false)
      return
    }

    try {
      await navigator.clipboard.writeText(text)
      setValue(text)
      setSuccess(true)
    } catch (error) {
      console.error('Failed to copy:', error)
      setValue(null)
      setSuccess(false)
    }
  }

  const reset = () => {
    setValue(null)
    setSuccess(null)
  }

  return { value, success, copy, reset }
}