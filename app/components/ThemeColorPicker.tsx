'use client'

import { useThemeColor } from '@/providers/ThemeColorProvider'

const ThemeColorPicker = () => {
  const { color, setColor } = useThemeColor()

  return (
    <input
      type="color"
      value={color}
      onChange={e => setColor(e.target.value)}
      title="Theme colour"
      aria-label="Theme colour"
      className="w-6 h-6 rounded border-2 border-[var(--theme-primary-contrast)] cursor-pointer shrink-0 bg-transparent p-0 [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:border-none [&::-webkit-color-swatch]:rounded [&::-moz-color-swatch]:border-none [&::-moz-color-swatch]:rounded"
    />
  )
}

export default ThemeColorPicker
