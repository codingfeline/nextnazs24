'use client'
import BrainsContainer from '@/app/components/BrainsContainer'
import MyCodeHighlighter from '@/app/components/MyCodeHighlighter'
import MyContainer from '@/app/components/MyContainer'
import { ChangeEvent, useMemo, useState } from 'react'

const MS_PER_DAY = 24 * 60 * 60 * 1000

type Direction = 'future' | 'past'

const longFormatter = new Intl.DateTimeFormat('en-GB', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
})

export default function DatePlusMinus({ hideBrains }: { hideBrains?: boolean }) {
  const [start, setStart] = useState('')
  const [days, setDays] = useState('')
  const [direction, setDirection] = useState<Direction>('future')

  const { long, iso } = useMemo(() => {
    if (!start) return { long: 'Pick a start date to see the result.', iso: '' }

    // Parse as UTC midnight so DST shifts can't skew the day count.
    const base = Date.parse(start + 'T00:00:00Z')
    if (Number.isNaN(base)) return { long: 'Pick a start date to see the result.', iso: '' }

    const n = Number(days)
    if (days.trim() === '' || !Number.isFinite(n)) return { long: 'Enter a number of days.', iso: '' }

    const offset = (direction === 'past' ? -n : n) * MS_PER_DAY
    const result = new Date(base + offset)
    return { long: longFormatter.format(result), iso: result.toISOString().slice(0, 10) }
  }, [start, days, direction])

  const codeSnippet = `const offsetMs = (direction === 'past' ? -days : days) * 86400000
const result = new Date(Date.parse(start + 'T00:00:00Z') + offsetMs)`

  return (
    <MyContainer header="Date +/- Days">
      <div className="mb-4">
        <p className="font-semibold text-lg">{long}</p>
        {iso && <p className="text-sm text-gray-500">{iso}</p>}
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-500 mb-1">Start date</label>
        <input
          type="date"
          value={start}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setStart(e.target.value)}
          className="w-full border-2 border-gray-200 rounded-lg p-2 focus:border-blue-500 outline-none transition-all text-black text-sm"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-500 mb-1">Days</label>
          <input
            type="number"
            min="0"
            value={days}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setDays(e.target.value)}
            placeholder="e.g. 10"
            className="w-full border-2 border-gray-200 rounded-lg p-2 focus:border-blue-500 outline-none transition-all text-black text-sm"
          />
        </div>

        <div className="flex items-center gap-4 sm:pt-6">
          {(['future', 'past'] as const).map(d => (
            <label key={d} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="datePlusMinusDirection"
                checked={direction === d}
                onChange={() => setDirection(d)}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="text-sm capitalize text-gray-600 group-hover:text-blue-600 transition-colors">
                {d}
              </span>
            </label>
          ))}
        </div>
      </div>

      <BrainsContainer hidden={hideBrains}>
        <MyCodeHighlighter item={codeSnippet} />
      </BrainsContainer>
    </MyContainer>
  )
}
