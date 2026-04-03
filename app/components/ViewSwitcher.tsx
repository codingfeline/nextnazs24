'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

type LinkItem = {
  href: string
  label: string
}

type Props = {
  links: LinkItem[]
  currentView: string
}

export default function ViewSwitcher({ links, currentView }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [mode, setMode] = useState<'links' | 'dropdown'>('links')

  // Load saved preference
  useEffect(() => {
    const savedMode = localStorage.getItem('viewMode') as 'links' | 'dropdown' | null

    if (savedMode) {
      setMode(savedMode)
    }
  }, [])

  // Persist preference
  const handleModeChange = (newMode: 'links' | 'dropdown') => {
    setMode(newMode)
    localStorage.setItem('viewMode', newMode)
  }

  // Handle dropdown navigation
  const handleDropdownChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('view', value)

    router.push(`/jsPlayground?${params.toString()}`)
  }

  return (
    <div className="w-full p-2">
      {/* Toggle Buttons */}
      <div className="flex gap-2 mb-3">
        <button
          onClick={() => handleModeChange('links')}
          className={`px-3 py-1 rounded transition-all duration-300 ${
            mode === 'links' ? 'bg-violet-700' : 'bg-gray-600 hover:bg-gray-500'
          }`}
        >
          Links
        </button>

        <button
          onClick={() => handleModeChange('dropdown')}
          className={`px-3 py-1 rounded transition-all duration-300 ${
            mode === 'dropdown' ? 'bg-violet-700' : 'bg-gray-600 hover:bg-gray-500'
          }`}
        >
          Dropdown
        </button>
      </div>

      {/* LINKS MODE */}
      <div
        className={`transition-all duration-500 ease-in-out ${
          mode === 'links' ? 'opacity-100 max-h-40' : 'opacity-0 max-h-0 overflow-hidden'
        }`}
      >
        <nav className="flex flex-wrap gap-2 text-gray-200">
          {links.map(link => (
            <Link
              key={link.href}
              href={`/jsPlayground?view=${link.href}`}
              className={`p-2 rounded transition ${
                currentView === link.href
                  ? 'bg-blue-500'
                  : 'hover:bg-blue-400 bg-gray-600'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* DROPDOWN MODE */}
      <div
        className={`transition-all duration-500 ease-in-out ${
          mode === 'dropdown'
            ? 'opacity-100 max-h-40'
            : 'opacity-0 max-h-0 overflow-hidden'
        }`}
      >
        <select
          value={currentView}
          onChange={e => handleDropdownChange(e.target.value)}
          className="p-2 rounded bg-gray-700 text-gray-200"
        >
          {links.map(link => (
            <option key={link.href} value={link.href}>
              {link.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
