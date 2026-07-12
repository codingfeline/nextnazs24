'use client'
import BrainsContainer from '@/app/components/BrainsContainer'
import MyCodeHighlighter from '@/app/components/MyCodeHighlighter'
import MyContainer from '@/app/components/MyContainer'
import { ChangeEvent, useMemo, useState } from 'react'

type TimeUnit = 'days' | 'hours' | 'minutes' | 'seconds'

// Seconds per unit, used to normalise then re-express the value.
const PER_SECOND: Record<TimeUnit, number> = { days: 86400, hours: 3600, minutes: 60, seconds: 1 }

// Break a duration (in seconds) into a single combined breakdown across
// days, hours, minutes and seconds, e.g. 20000s -> "5 hours, 33 minutes, 20 seconds".
// Leading zero units are omitted; seconds keep any fraction.
const breakdown = (totalSeconds: number): string => {
  if (!Number.isFinite(totalSeconds)) return '—'
  const sign = totalSeconds < 0 ? '-' : ''
  let abs = Math.abs(totalSeconds)

  const days = Math.floor(abs / PER_SECOND.days)
  abs %= PER_SECOND.days
  const hours = Math.floor(abs / PER_SECOND.hours)
  abs %= PER_SECOND.hours
  const mins = Math.floor(abs / PER_SECOND.minutes)
  const secs = +(abs % PER_SECOND.minutes).toFixed(6)

  const units: [number, string][] = [
    [days, 'day'],
    [hours, 'hour'],
    [mins, 'minute'],
    [secs, 'second'],
  ]

  let started = false
  const parts: string[] = []
  units.forEach(([value, label]) => {
    if (value === 0 && !started) return
    started = true
    parts.push(`${value} ${label}${value === 1 ? '' : 's'}`)
  })
  if (parts.length === 0) parts.push('0 seconds')

  return sign + parts.join(', ')
}

export default function TimeConverter({ hideBrains }: { hideBrains?: boolean }) {
  const [value, setValue] = useState('')
  const [unit, setUnit] = useState<TimeUnit>('days')

  const result = useMemo(() => {
    const raw = value.trim()
    if (raw === '') return 'Enter a number to convert.'
    const n = Number(raw)
    if (isNaN(n)) return 'Enter a valid number.'
    return breakdown(n * PER_SECOND[unit])
  }, [value, unit])

  const codeSnippet = `const PER_SECOND = { days: 86400, hours: 3600, minutes: 60, seconds: 1 }
const seconds = value * PER_SECOND[unit]
// then re-express seconds as days/hours/minutes/seconds`

  return (
    <MyContainer header="Time">
      <div className="mb-4">
        <p className="font-semibold text-lg">{result}</p>
      </div>

      <input
        type="number"
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        placeholder="Enter a number…"
        className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 outline-none transition-all text-black mb-3"
      />

      <div className="flex flex-wrap gap-3">
        {(['days', 'hours', 'minutes', 'seconds'] as const).map(u => (
          <label key={u} className="flex items-center gap-2 cursor-pointer group">
            <input
              type="radio"
              name="timeUnit"
              checked={unit === u}
              onChange={() => setUnit(u)}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="text-sm capitalize text-gray-600 group-hover:text-blue-600 transition-colors">
              {u}
            </span>
          </label>
        ))}
      </div>

      <BrainsContainer hidden={hideBrains}>
        <MyCodeHighlighter item={codeSnippet} />
      </BrainsContainer>
    </MyContainer>
  )
}
