'use client'
import BrainsContainer from '@/app/components/BrainsContainer'
import MyCodeHighlighter from '@/app/components/MyCodeHighlighter'
import MyContainer from '@/app/components/MyContainer'
import { Clear } from '@/app/components'
import { ChangeEvent, useMemo, useState } from 'react'

const LABELS = ['a', 'b', 'c', 'd'] as const
type Field = (typeof LABELS)[number]

// Trim trailing float noise from the computed answer for a cleaner display.
const fmt = (n: number) => (Number.isFinite(n) ? `${+n.toFixed(6)}` : '—')

// Solve the blank value from the other three, using a*d = b*c.
const solve = (empty: number, a: number, b: number, c: number, d: number): number => {
  switch (empty) {
    case 0: return (b * c) / d
    case 1: return (a * d) / c
    case 2: return (a * d) / b
    default: return (b * c) / a
  }
}

export default function CrossMultiplication({ hideBrains }: { hideBrains?: boolean }) {
  const [values, setValues] = useState<Record<Field, string>>({ a: '', b: '', c: '', d: '' })

  const handleChange = (field: Field) => (e: ChangeEvent<HTMLInputElement>) =>
    setValues(prev => ({ ...prev, [field]: e.target.value }))

  const handleClear = () => setValues({ a: '', b: '', c: '', d: '' })

  const result = useMemo(() => {
    const raw = LABELS.map(f => values[f].trim())
    const empty = raw.map((v, i) => (v === '' ? i : -1)).filter(i => i >= 0)

    if (empty.length === 0) {
      if (raw.some(v => isNaN(Number(v)))) return { text: 'Enter valid numbers.', error: true }
      const [a, b, c, d] = raw.map(Number)
      const holds = a * d === b * c
      return {
        text: holds
          ? `Proportion holds: ${fmt(a)} : ${fmt(b)} = ${fmt(c)} : ${fmt(d)}`
          : `Not equal: a×d = ${fmt(a * d)}, b×c = ${fmt(b * c)}`,
        error: !holds,
      }
    }

    if (empty.length > 1) {
      return { text: 'Leave exactly one field blank to solve a : b = c : d.', error: false }
    }

    const emptyIndex = empty[0]
    const invalid = raw.some((v, i) => i !== emptyIndex && isNaN(Number(v)))
    if (invalid) return { text: 'Enter valid numbers in the other three fields.', error: true }

    const [a, b, c, d] = LABELS.map(f => Number(values[f]))
    const divisors = [d, c, b, a]
    if (divisors[emptyIndex] === 0) return { text: 'Cannot solve: division by zero.', error: true }

    const answer = solve(emptyIndex, a, b, c, d)
    return { text: `${LABELS[emptyIndex]} = ${fmt(answer)}`, error: false }
  }, [values])

  const hasValue = LABELS.some(f => values[f] !== '')

  const codeSnippet = `// a : b = c : d  ->  a*d = b*c
const solve = (empty, a, b, c, d) => {
  if (empty === 0) return (b * c) / d
  if (empty === 1) return (a * d) / c
  if (empty === 2) return (a * d) / b
  return (b * c) / a
}`

  return (
    <MyContainer header="Cross-Multiplication">
      <div className="flex flex-wrap items-center gap-2 mb-3">
        {(['a', 'b'] as const).map((f, i) => (
          <span key={f} className="flex items-center gap-2">
            <input
              type="number"
              value={values[f]}
              onChange={handleChange(f)}
              placeholder={f}
              className="w-20 min-w-0 flex-1 border-2 border-gray-200 rounded-lg p-2 focus:border-blue-500 outline-none transition-all text-black text-sm"
            />
            {i === 0 && <span className="text-gray-400 font-semibold">:</span>}
          </span>
        ))}
        <span className="text-gray-400 font-semibold">=</span>
        {(['c', 'd'] as const).map((f, i) => (
          <span key={f} className="flex items-center gap-2">
            <input
              type="number"
              value={values[f]}
              onChange={handleChange(f)}
              placeholder={f}
              className="w-20 min-w-0 flex-1 border-2 border-gray-200 rounded-lg p-2 focus:border-blue-500 outline-none transition-all text-black text-sm"
            />
            {i === 0 && <span className="text-gray-400 font-semibold">:</span>}
          </span>
        ))}
        <button
          type="button"
          onClick={handleClear}
          disabled={!hasValue}
          title="Clear all"
          aria-label="Clear all"
          className={`transition-colors shrink-0 ${
            hasValue ? 'text-gray-400 hover:text-red-500' : 'text-gray-300 cursor-not-allowed'
          }`}
        >
          <Clear size={20} />
        </button>
      </div>

      <p className={`text-sm ${result.error ? 'text-red-500' : 'text-gray-500'}`}>
        {result.text}
      </p>

      <BrainsContainer hidden={hideBrains}>
        <MyCodeHighlighter item={codeSnippet} />
      </BrainsContainer>
    </MyContainer>
  )
}
