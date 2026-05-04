'use client'

import { useBalloons } from '@/providers/BalloonsProvider'

export default function BalloonToggle() {
  const { enabled, toggle } = useBalloons()

  return (
    <button
      onClick={toggle}
      title={enabled ? 'Hide balloons' : 'Show balloons'}
      className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 transition-colors select-none"
    >
      <span>🎈</span>
      <div
        className={`relative w-8 h-4 rounded-full transition-colors duration-200 ${
          enabled ? 'bg-blue-400' : 'bg-gray-300'
        }`}
      >
        <div
          className={`absolute top-0.5 w-3 h-3 bg-white rounded-full shadow transition-transform duration-200 ${
            enabled ? 'translate-x-4' : 'translate-x-0.5'
          }`}
        />
      </div>
    </button>
  )
}
