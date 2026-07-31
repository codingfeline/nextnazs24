'use client'

import { useEffect } from 'react'

// Clears the focused input/textarea when Escape is pressed and it has a value.
// Uses the native value setter + a real 'input' event so React's onChange
// (which these controlled inputs rely on) fires correctly.
export default function EscClearInput() {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key !== 'Escape') return

      const el = document.activeElement
      if (!(el instanceof HTMLInputElement) && !(el instanceof HTMLTextAreaElement)) return
      if (!el.value) return

      const prototype = el instanceof HTMLTextAreaElement
        ? HTMLTextAreaElement.prototype
        : HTMLInputElement.prototype
      const setter = Object.getOwnPropertyDescriptor(prototype, 'value')?.set
      setter?.call(el, '')
      el.dispatchEvent(new Event('input', { bubbles: true }))
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return null
}
