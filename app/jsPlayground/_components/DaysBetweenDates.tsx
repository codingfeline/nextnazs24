'use client'
import BrainsContainer from '@/app/components/BrainsContainer'
import MyCodeHighlighter from '@/app/components/MyCodeHighlighter'
import MyContainer from '@/app/components/MyContainer'
import { ChangeEvent, useMemo, useState } from 'react'

const MS_PER_DAY = 24 * 60 * 60 * 1000

const plural = (n: number, unit: string) => `${n} ${unit}${n === 1 ? '' : 's'}`

// Calendar-aware years/months/days between two "YYYY-MM-DD" strings (earlier -> later).
const calendarBreakdown = (earlier: string, later: string): string => {
  const [y1, m1, d1] = earlier.split('-').map(Number)
  const [y2, m2, d2] = later.split('-').map(Number)
  let years = y2 - y1
  let months = m2 - m1
  let days = d2 - d1
  if (days < 0) {
    months -= 1
    days += new Date(Date.UTC(y2, m2 - 1, 0)).getUTCDate()
  }
  if (months < 0) {
    years -= 1
    months += 12
  }
  const parts: string[] = []
  if (years) parts.push(plural(years, 'year'))
  if (months) parts.push(plural(months, 'month'))
  if (days) parts.push(plural(days, 'day'))
  return parts.join(', ')
}

export default function DaysBetweenDates({ hideBrains }: { hideBrains?: boolean }) {
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')

  const { result, breakdown } = useMemo(() => {
    if (!start || !end) return { result: 'Pick two dates to see the difference.', breakdown: '' }

    // Parse as UTC midnight so DST shifts can't skew the day count.
    const a = Date.parse(start + 'T00:00:00Z')
    const b = Date.parse(end + 'T00:00:00Z')
    if (Number.isNaN(a) || Number.isNaN(b)) return { result: 'Pick two dates to see the difference.', breakdown: '' }

    const days = Math.round(Math.abs(b - a) / MS_PER_DAY)
    const result = days === 1 ? '1 day' : `${days.toLocaleString()} days`

    let breakdown = ''
    if (days > 30) {
      const [earlier, later] = a <= b ? [start, end] : [end, start]
      const text = calendarBreakdown(earlier, later)
      if (text) breakdown = `= ${text}`
    }
    return { result, breakdown }
  }, [start, end])

  const codeSnippet = `const days = Math.round(Math.abs(Date.parse(end) - Date.parse(start)) / 86400000)`

  return (
    <MyContainer header="Days Between Dates">
      <div className="flex items-center justify-between gap-4 mb-4">
        <p className="font-semibold text-lg">{result}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-2">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-500 mb-1">Start date</label>
          <input
            type="date"
            value={start}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setStart(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-lg p-2 focus:border-blue-500 outline-none transition-all text-black text-sm"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-500 mb-1">End date</label>
          <input
            type="date"
            value={end}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEnd(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-lg p-2 focus:border-blue-500 outline-none transition-all text-black text-sm"
          />
        </div>
      </div>

      {breakdown && <p className="text-sm text-gray-500">{breakdown}</p>}

      <BrainsContainer hidden={hideBrains}>
        <MyCodeHighlighter item={codeSnippet} />
      </BrainsContainer>
    </MyContainer>
  )
}
