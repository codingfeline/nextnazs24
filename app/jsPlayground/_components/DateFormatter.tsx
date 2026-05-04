'use client'

import { Copy } from '@/app/components'
import BrainsContainer from '@/app/components/BrainsContainer'
import MyCodeHighlighter from '@/app/components/MyCodeHighlighter'
import MyContainer from '@/app/components/MyContainer'
import { useState } from 'react'
import RevealPlayGround from './RevealPlayGround'

export default function DateFormatter() {
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const date = selectedDate ? new Date(selectedDate) : new Date()

  function formatShort(date: Date) {
    return date.toLocaleDateString('en-GB')
  }

  function formatLong(date: Date) {
    return date.toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  function formatWithDay(date: Date) {
    return date.toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  async function handleCopy(key: string, value: string) {
    await navigator.clipboard.writeText(value)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const rows: { label: string; key: string; value: string }[] = [
    { label: 'DD/MM/YYYY',            key: 'short',   value: formatShort(date) },
    { label: 'Day, Month, Year',       key: 'long',    value: formatLong(date) },
    { label: 'Weekday, Day Month Year',key: 'withDay', value: formatWithDay(date) },
  ]

  const snippet = `// DD/MM/YYYY
date.toLocaleDateString('en-GB')

// Day, Month, Year
date.toLocaleDateString('en-GB', {
  year: 'numeric', month: 'long', day: 'numeric',
})

// Weekday, Day Month Year
date.toLocaleDateString('en-GB', {
  weekday: 'long', year: 'numeric',
  month: 'long',   day: 'numeric',
})`

  return (
    <RevealPlayGround>
      <MyContainer header="Date Formatter">
        <div className="p-6 space-y-4 font-mono bg-gray-200 rounded-md">
          <div>
            <label className="block mb-2 font-semibold">Choose a date:</label>
            <input
              type="date"
              value={selectedDate}
              onChange={e => setSelectedDate(e.target.value)}
              className="border p-2 rounded"
            />
          </div>

          <div className="space-y-2">
            {rows.map(({ label, key, value }) => (
              <div key={key} className="flex items-center justify-between gap-4">
                <p>
                  <span className="font-sans text-gray-600">{label}: </span>
                  {value}
                </p>
                <button
                  onClick={() => handleCopy(key, value)}
                  className="shrink-0 text-gray-500 hover:text-blue-600 transition-colors"
                  aria-label={`Copy ${label}`}
                >
                  {copiedKey === key ? (
                    <span className="text-xs text-green-600 font-sans">Copied!</span>
                  ) : (
                    <Copy size={16} />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        <BrainsContainer>
          <MyCodeHighlighter item={snippet} />
        </BrainsContainer>
      </MyContainer>
    </RevealPlayGround>
  )
}
