'use client'
import { Check, Clear, Copy } from '@/app/components'
import BrainsContainer from '@/app/components/BrainsContainer'
import MyCodeHighlighter from '@/app/components/MyCodeHighlighter'
import MyContainer from '@/app/components/MyContainer'
import { ChangeEvent, useState } from 'react'
// Helper for Title Case
const toTitleCase = (str: string): string =>
  str.toLowerCase().replace(/\b\w/g, char => char.toUpperCase())

// Define the valid modes for better type safety
type TransformationMode = 'title' | 'lower' | 'upper'

export default function TextTransformer({ hideBrains }: { hideBrains?: boolean }) {
  const [text, setText] = useState<string>('')
  const [mode, setMode] = useState<TransformationMode>('title')
  const [isCopied, setIsCopied] = useState<boolean>(false)

  // Determine the transformed text based on the active mode
  const getTransformedText = (): string => {
    switch (mode) {
      case 'title':
        return toTitleCase(text)
      case 'lower':
        return text.toLowerCase()
      case 'upper':
        return text.toUpperCase()
      default:
        return text
    }
  }

  const max = 60
  const transformedText =
    getTransformedText().length === 0
      ? ''
      : getTransformedText().length < max
        ? getTransformedText()
        : getTransformedText().slice(0, max) + '...'

  const handleCopy = async () => {
    if (!transformedText) return
    try {
      await navigator.clipboard.writeText(getTransformedText())
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy!', err)
    }
  }

  const codeSnippet = `
  const toTitleCase = (str: string): string =>
  str.toLowerCase().replace(/\\b\\w/g, char => char.toUpperCase())
  OR without regex:
  str.split(' ').map(word => word.charAt(0).toUpperCase() +
  word.slice(1).toLowerCase()).join(' ')

  str.toLowerCase()
  str.toUpperCase()
  `

  return (
    <MyContainer header="Case Converter">
      {/* 1. Main Input */}
      <div className="mb-6 w-full">
        <label className="block text-sm font-medium text-gray-500 mb-2">
          Source Text
        </label>
        <div className="relative w-full ">
          <input
            type="text"
            value={text}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
            placeholder="Type something..."
            // Added pr-10 (padding-right) so text doesn't overlap the icon
            className="w-full border-2 border-gray-200 rounded-lg p-3 pr-10 focus:border-blue-500 outline-none transition-all text-black"
          />

          {/* Only show the button if there is text to clear */}
          {text && (
            <button
              onClick={() => setText('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Clear text"
            >
              <Clear className="text-3xl cursor-pointer" />
            </button>
          )}
        </div>
      </div>
      {/* 2. Radio Selection */}
      <div className="flex gap-3 mb-8 ">
        {(['title', 'lower', 'upper'] as const).map(m => (
          <label key={m} className="flex items-center gap-2 cursor-pointer group">
            <input
              type="radio"
              name="mode"
              checked={mode === m}
              onChange={() => setMode(m)}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="text-sm capitalize text-gray-600 group-hover:text-blue-600 transition-colors">
              {m} Case
            </span>
          </label>
        ))}
      </div>
      {/* 3. Output & Copy Action */}
      <div className="p-4 bg-gray-50  rounded-lg border border-dashed border-gray-300 ">
        <div className="flex items-center justify-between gap-4">
          <span className="font-mono text-lg break-all">{transformedText}</span>
          <button
            onClick={handleCopy}
            disabled={!text}
            className={`transition-colors ${
              !text
                ? 'text-gray-300 cursor-not-allowed'
                : isCopied
                  ? 'text-green-500'
                  : 'text-gray-400 hover:text-gray-600'
            }`}
            aria-label="Copy"
          >
            {isCopied ? <Check size={22} /> : <Copy size={20} />}
          </button>
        </div>
      </div>

      <BrainsContainer hidden={hideBrains}>
        <MyCodeHighlighter item={codeSnippet} />
      </BrainsContainer>
    </MyContainer>
  )
}
