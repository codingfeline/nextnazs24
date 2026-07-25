'use client'

import { useThemeColor } from '@/providers/ThemeColorProvider'
import { FaShuffle } from 'react-icons/fa6'

const randomHexColor = () =>
  '#' + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0')

const ThemeColorPicker = () => {
  const { color, setColor } = useThemeColor()

  return (
    <div className="flex items-center gap-2">
      <input
        type="color"
        value={color}
        onChange={e => setColor(e.target.value)}
        title="Theme colour"
        aria-label="Theme colour"
        className="w-6 h-6 rounded border-2 border-[var(--theme-primary-contrast)] cursor-pointer shrink-0 bg-transparent p-0 [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:border-none [&::-webkit-color-swatch]:rounded [&::-moz-color-swatch]:border-none [&::-moz-color-swatch]:rounded"
      />
      <button
        type="button"
        onClick={() => setColor(randomHexColor())}
        title="Randomize theme colour"
        aria-label="Randomize theme colour"
        className="shrink-0 cursor-pointer opacity-70 hover:opacity-100"
        style={{ color: 'var(--theme-primary-contrast)' }}
      >
        <FaShuffle size={16} />
      </button>
    </div>
  )
}

export default ThemeColorPicker
