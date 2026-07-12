'use client'
import { Clear, Download, Plus } from '@/app/components'
import BrainsContainer from '@/app/components/BrainsContainer'
import MyCodeHighlighter from '@/app/components/MyCodeHighlighter'
import MyContainer from '@/app/components/MyContainer'
import { useMemo, useState } from 'react'

interface BudgetRow {
  id: number
  name: string
  amount: string
}

let nextId = 1
const newRow = (): BudgetRow => ({ id: nextId++, name: '', amount: '' })

const sum = (rows: BudgetRow[]) =>
  rows.reduce((acc, r) => {
    const n = parseFloat(r.amount)
    return acc + (Number.isFinite(n) ? n : 0)
  }, 0)

// Escape a CSV field: wrap in quotes and double any quotes when it
// contains a comma, quote, or newline.
const escCsv = (v: string) => (/[",\r\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v)

function BudgetSection({
  title,
  rows,
  onChange,
}: {
  title: string
  rows: BudgetRow[]
  onChange: (rows: BudgetRow[]) => void
}) {
  const updateRow = (id: number, field: 'name' | 'amount', value: string) => {
    onChange(rows.map(r => (r.id === id ? { ...r, [field]: field === 'amount' ? value.replace(/-/g, '') : value } : r)))
  }

  const removeRow = (id: number) => {
    if (rows.length > 1) {
      onChange(rows.filter(r => r.id !== id))
    } else {
      onChange([newRow()])
    }
  }

  return (
    <div className="mb-3">
      <div className="flex items-center justify-between mb-1">
        <h4 className="text-sm font-medium text-gray-500">{title}</h4>
        <button
          type="button"
          onClick={() => onChange([...rows, newRow()])}
          className="text-gray-400 hover:text-blue-600 transition-colors"
          title={`Add ${title.toLowerCase()}`}
          aria-label={`Add ${title.toLowerCase()} input`}
        >
          <Plus size={18} />
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {rows.map(row => (
          <div key={row.id} className="flex items-center gap-2">
            <input
              type="text"
              value={row.name}
              onChange={e => updateRow(row.id, 'name', e.target.value)}
              placeholder="Label"
              className="flex-1 min-w-0 border-2 border-gray-200 rounded-lg p-2 focus:border-blue-500 outline-none transition-all text-black text-sm"
            />
            <input
              type="number"
              min="0"
              step="any"
              inputMode="decimal"
              value={row.amount}
              onChange={e => updateRow(row.id, 'amount', e.target.value)}
              placeholder="0.00"
              className="w-24 border-2 border-gray-200 rounded-lg p-2 focus:border-blue-500 outline-none transition-all text-black text-sm"
            />
            <button
              type="button"
              onClick={() => removeRow(row.id)}
              className="text-gray-400 hover:text-red-500 transition-colors"
              title="Remove line"
              aria-label="Remove this line"
            >
              <Clear size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function QuickBudget({ hideBrains }: { hideBrains?: boolean }) {
  const [incoming, setIncoming] = useState<BudgetRow[]>([newRow()])
  const [outgoing, setOutgoing] = useState<BudgetRow[]>([newRow()])

  const balance = useMemo(() => sum(incoming) - sum(outgoing), [incoming, outgoing])

  const clearAll = () => {
    if (!window.confirm('Clear all incoming and outgoing entries?')) return
    setIncoming([newRow()])
    setOutgoing([newRow()])
  }

  const exportCsv = () => {
    const rows: string[][] = [['Type', 'Label', 'Amount']]
    const collect = (list: BudgetRow[], type: string) => {
      list.forEach(r => {
        const n = parseFloat(r.amount)
        if (!Number.isFinite(n)) return
        rows.push([type, r.name.trim(), n.toFixed(2)])
      })
    }
    collect(incoming, 'Incoming')
    collect(outgoing, 'Outgoing')
    rows.push(['Balance', '', balance.toFixed(2)])

    const csv = rows.map(r => r.map(escCsv).join(',')).join('\r\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'expenses.csv'
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  const codeSnippet = `const balance = sum(incoming) - sum(outgoing)
const sum = rows => rows.reduce((acc, r) => acc + (parseFloat(r.amount) || 0), 0)`

  return (
    <MyContainer header="Quick Budget">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-500">
          Balance: <span className="font-mono font-semibold text-black">{balance.toFixed(2)}</span>
        </span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={exportCsv}
            className="text-gray-400 hover:text-blue-600 transition-colors"
            title="Export CSV"
            aria-label="Export CSV"
          >
            <Download size={18} />
          </button>
          <button
            type="button"
            onClick={clearAll}
            className="text-gray-400 hover:text-red-500 transition-colors"
            title="Clear all"
            aria-label="Clear all inputs"
          >
            <Clear size={18} />
          </button>
        </div>
      </div>

      <BudgetSection title="Incoming" rows={incoming} onChange={setIncoming} />
      <BudgetSection title="Outgoing" rows={outgoing} onChange={setOutgoing} />

      <BrainsContainer hidden={hideBrains}>
        <MyCodeHighlighter item={codeSnippet} />
      </BrainsContainer>
    </MyContainer>
  )
}
