'use client'
import { ChangeEvent, useState } from 'react'

// Helper for Title Case
const toTitleCase = (str: string): string =>
  str.toLowerCase().replace(/\b\w/g, char => char.toUpperCase())

export default function TextTransformer() {
  const [inputText, setInputText] = useState<string>('')
  const [copiedId, setCopiedId] = useState<string | null>(null)

  // Define our transformations in an array for easy rendering
  const transformations = [
    { id: 'title', label: 'Title Case', value: toTitleCase(inputText) },
    { id: 'lower', label: 'Lower Case', value: inputText.toLowerCase() },
    { id: 'upper', label: 'Upper Case', value: inputText.toUpperCase() },
  ]

  const handleCopy = async (id: string, textToCopy: string) => {
    if (!textToCopy) return
    try {
      await navigator.clipboard.writeText(textToCopy)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (err) {
      console.error('Failed to copy!', err)
    }
  }

  return (
    <div className="max-w-xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-center">Text Converter</h2>

      {/* Central Input Field */}
      <div className="mb-8">
        <label className="block text-sm font-medium mb-2 text-gray-600">
          Enter your text:
        </label>
        <input
          type="text"
          value={inputText}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setInputText(e.target.value)}
          placeholder="Start typing..."
          className="w-full p-3 border-2 border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 text-lg"
        />
      </div>

      {/* Conversion Results */}
      <div className="space-y-4">
        {transformations.map(item => (
          <div
            key={item.id}
            className="flex flex-col p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-100"
          >
            <span className="text-xs font-semibold uppercase text-gray-500 mb-2">
              {item.label}
            </span>
            <div className="flex items-center justify-between gap-4">
              <span className="font-mono text-gray-800 dark:text-gray-200 break-all">
                {item.value || (
                  <span className="text-gray-400 italic">Waiting for input...</span>
                )}
              </span>

              <button
                onClick={() => handleCopy(item.id, item.value)}
                disabled={!inputText}
                className={`flex-shrink-0 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                  !inputText
                    ? 'bg-gray-300 cursor-not-allowed'
                    : copiedId === item.id
                      ? 'bg-green-500 text-white'
                      : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }`}
              >
                {copiedId === item.id ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
