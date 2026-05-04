'use client'
import { ChevronRight, Clear } from '@/app/components'
import BrainsContainer from '@/app/components/BrainsContainer'
import MyCodeHighlighter from '@/app/components/MyCodeHighlighter'
import MyContainer from '@/app/components/MyContainer'
import { ChangeEvent, useMemo, useState } from 'react'
import WORDS from '../_data/words.json'

function canForm(word: string, letters: string): boolean {
  const pool = letters.toLowerCase().split('')
  for (const ch of word) {
    const idx = pool.indexOf(ch)
    if (idx === -1) return false
    pool.splice(idx, 1)
  }
  return true
}

const codeSnippet = `function canForm(word: string, letters: string): boolean {
  const pool = letters.toLowerCase().split('')
  for (const ch of word) {
    const idx = pool.indexOf(ch)
    if (idx === -1) return false
    pool.splice(idx, 1)
  }
  return true
}
// Filter dictionary words that can be built
// from the available letters (no reuse):
const results = WORDS
  .filter(w => canForm(w, input))
  .filter(w => !startLetter || w.startsWith(startLetter))
  .filter(w => !endLetter   || w.endsWith(endLetter))
  .filter(w => !wordLength  || w.length === wordLength)
  .sort((a, b) => b.length - a.length)
`

export default function WordUnscrambler({ hideBrains }: { hideBrains?: boolean }) {
  const [input, setInput] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [startLetter, setStartLetter] = useState('')
  const [endLetter, setEndLetter] = useState('')
  const [wordLength, setWordLength] = useState('')

  const hasActiveFilters = startLetter || endLetter || wordLength

  const results = useMemo(() => {
    const letters = input.replace(/\s/g, '')
    if (letters.length < 2) return []
    const len = wordLength ? parseInt(wordLength, 10) : 0
    return WORDS.filter(w => canForm(w, letters))
      .filter(w => !startLetter || w.startsWith(startLetter.toLowerCase()))
      .filter(w => !endLetter || w.endsWith(endLetter.toLowerCase()))
      .filter(w => !len || w.length === len)
      .sort((a, b) => b.length - a.length || a.localeCompare(b))
  }, [input, startLetter, endLetter, wordLength])

  function clearFilters() {
    setStartLetter('')
    setEndLetter('')
    setWordLength('')
  }

  return (
    // <RevealPlayGround>
    <MyContainer header="Word Unscrambler">
      {/* Input */}
      <div className="mb-4 ">
        <label className="block text-sm font-medium text-gray-500 mb-2">
          Enter letters
        </label>
        <div className="relative w-full">
          <input
            type="text"
            value={input}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
            placeholder="e.g. aelpps"
            className="w-full border-2 border-gray-200 rounded-lg p-3 pr-10 focus:border-blue-500 outline-none transition-all text-black"
          />
          {input && (
            <button
              onClick={() => setInput('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Clear input"
            >
              <Clear className="text-3xl cursor-pointer" />
            </button>
          )}
        </div>
      </div>

      {/* Filters toggle */}
      <div className="mb-6">
        <button
          onClick={() => setShowFilters(v => !v)}
          className="flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors"
        >
          <ChevronRight
            size={14}
            className={`transition-transform duration-200 ${showFilters ? 'rotate-90' : 'rotate-0'}`}
          />
          Filters
          {hasActiveFilters && (
            <span className="ml-1 px-1.5 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-full">
              active
            </span>
          )}
        </button>

        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            showFilters ? 'max-h-40 opacity-100 mt-3' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-wrap gap-4 items-end p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">Starts with</label>
              <input
                type="text"
                value={startLetter}
                maxLength={1}
                onChange={e => setStartLetter(e.target.value.replace(/[^a-zA-Z]/g, ''))}
                placeholder="a"
                className="w-16 border border-gray-300 rounded-md p-2 text-center text-black text-sm focus:border-blue-500 outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">Ends with</label>
              <input
                type="text"
                value={endLetter}
                maxLength={1}
                onChange={e => setEndLetter(e.target.value.replace(/[^a-zA-Z]/g, ''))}
                placeholder="z"
                className="w-16 border border-gray-300 rounded-md p-2 text-center text-black text-sm focus:border-blue-500 outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">Length</label>
              <input
                type="number"
                value={wordLength}
                min={2}
                max={15}
                onChange={e => setWordLength(e.target.value)}
                placeholder="5"
                className="w-20 border border-gray-300 rounded-md p-2 text-center text-black text-sm focus:border-blue-500 outline-none"
              />
            </div>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-xs text-gray-400 hover:text-red-500 transition-colors self-end pb-2"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="p-4 bg-gray-50 rounded-lg border border-dashed border-gray-300 min-h-[100px]">
        {results.length === 0 ? (
          <p className="text-gray-400 text-sm">
            {input.replace(/\s/g, '').length < 2
              ? 'Type at least 2 letters to find words.'
              : 'No words found. Try different letters.'}
          </p>
        ) : (
          <>
            <p className="text-xs text-gray-400 mb-3">
              {results.length} word{results.length !== 1 ? 's' : ''} found
            </p>
            <div className="flex flex-wrap gap-2">
              {results.map(word => (
                <span
                  key={word}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-mono"
                >
                  {word}
                </span>
              ))}
            </div>
          </>
        )}
      </div>

      <BrainsContainer hidden={hideBrains}>
        <MyCodeHighlighter item={codeSnippet} />
      </BrainsContainer>
    </MyContainer>
    // </RevealPlayGround>
  )
}
