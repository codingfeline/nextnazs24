'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const DEFAULT_COLOR = '#0090ff'
const STORAGE_KEY = 'themeColor'
const HEX_RE = /^#[\da-f]{6}$/i

// Perceived brightness (YIQ) decides whether light or dark text reads
// better on a solid fill of this colour.
function contrastColor(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  const yiq = (r * 299 + g * 587 + b * 114) / 1000
  return yiq >= 150 ? '#1a1a1a' : '#fff'
}

type ThemeColorContextValue = {
  color: string
  contrast: string
  setColor: (color: string) => void
}

const ThemeColorContext = createContext<ThemeColorContextValue>({
  color: DEFAULT_COLOR,
  contrast: contrastColor(DEFAULT_COLOR),
  setColor: () => {},
})

export function ThemeColorProvider({ children }: { children: React.ReactNode }) {
  const [color, setColorState] = useState(DEFAULT_COLOR)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored && HEX_RE.test(stored)) {
      setColorState(stored)
    }
  }, [])

  const setColor = (next: string) => {
    if (!HEX_RE.test(next)) return
    setColorState(next)
    localStorage.setItem(STORAGE_KEY, next)
  }

  const contrast = useMemo(() => contrastColor(color), [color])

  return (
    <ThemeColorContext.Provider value={{ color, contrast, setColor }}>
      {children}
    </ThemeColorContext.Provider>
  )
}

export const useThemeColor = () => useContext(ThemeColorContext)
