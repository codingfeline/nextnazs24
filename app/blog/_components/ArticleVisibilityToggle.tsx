'use client'

import { Eye, EyeSlash, Spinner } from '@/app/components'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

// Admin-only eye button on the /blog list: hides the article from visitors or shows it again
const ArticleVisibilityToggle = ({ id, hidden }: { id: string; hidden: boolean }) => {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(false)

  if (saving) return <Spinner />

  const label = hidden ? 'Show article' : 'Hide article'
  const toggle = async () => {
    try {
      setSaving(true)
      setError(false)
      await axios.patch(`/api/articles/${id}`, { hidden: !hidden })
      router.refresh()
    } catch (err) {
      console.log(err)
      setError(true)
    } finally {
      setSaving(false)
    }
  }

  return (
    <button
      type="button"
      title={error ? `${label} (failed, try again)` : label}
      aria-label={label}
      aria-pressed={hidden}
      className={`cursor-pointer opacity-70 hover:opacity-100 ${error ? 'text-red-500' : ''}`}
      onClick={toggle}
    >
      {hidden ? <EyeSlash size={20} /> : <Eye size={20} />}
    </button>
  )
}

export default ArticleVisibilityToggle
