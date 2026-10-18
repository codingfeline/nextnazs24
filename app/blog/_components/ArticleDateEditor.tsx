'use client'

import { Check, Clear, Pencil, Spinner } from '@/app/components'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import ArticleTime from './ArticleTime'
import { toLocalInput } from './toLocalInput'

// Article date on the /blog list; admins get a pencil to re-date it in place
const ArticleDateEditor = ({ id, date, canEdit }: { id: string; date: Date; canEdit: boolean }) => {
  const router = useRouter()
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(false)

  if (!canEdit) return <ArticleTime date={date} />

  if (!editing)
    return (
      <span className="flex items-center gap-2">
        <ArticleTime date={date} />
        <button
          type="button"
          title="Edit date"
          aria-label="Edit date"
          className="opacity-70 hover:opacity-100 cursor-pointer"
          onClick={() => {
            setValue(toLocalInput(new Date(date)))
            setError(false)
            setEditing(true)
          }}
        >
          <Pencil size={18} />
        </button>
      </span>
    )

  const save = async () => {
    if (!value) return
    try {
      setSaving(true)
      await axios.patch(`/api/articles/${id}`, { createdAt: new Date(value).toISOString() })
      setEditing(false)
      router.refresh()
    } catch (err) {
      console.log(err)
      setError(true)
    } finally {
      setSaving(false)
    }
  }

  return (
    <span className="flex items-center gap-2">
      <input
        type="datetime-local"
        aria-label="Article date"
        value={value}
        autoFocus
        onChange={e => setValue(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter') save()
          if (e.key === 'Escape') setEditing(false)
        }}
        className={`roboto-mono text-sm px-1 rounded bg-white text-black ${error ? 'outline outline-red-500' : ''}`}
      />
      {saving ? (
        <Spinner />
      ) : (
        <>
          <button type="button" title="Save date" aria-label="Save date" className="cursor-pointer" onClick={save}>
            <Check size={20} />
          </button>
          <button
            type="button"
            title="Cancel"
            aria-label="Cancel"
            className="cursor-pointer"
            onClick={() => setEditing(false)}
          >
            <Clear size={20} />
          </button>
        </>
      )}
    </span>
  )
}

export default ArticleDateEditor
