'use client'

import { useEffect, useState } from 'react'
import { Check, Copy } from '../components'
import MyContainer from '../components/MyContainer'
import PasswordForm from './PasswordForm'
import { CheckState } from './interface'

const SETS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()-_=+[]{};:,.<>?',
} as const
const CONSONANTS = 'bcdfghjklmnpqrstvwxyz'
const VOWELS = 'aeiou'

// Cryptographically secure random int in [0, n).
const randInt = (n: number) => {
  const a = new Uint32Array(1)
  crypto.getRandomValues(a)
  return a[0] % n
}

const pick = (str: string) => str[randInt(str.length)]

const shuffle = <T,>(arr: T[]): T[] => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = randInt(i + 1)
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

// One guaranteed character from each selected set, then fill the rest.
const generateRandom = (len: number, checks: CheckState): string | null => {
  const active = (Object.keys(SETS) as (keyof typeof SETS)[]).filter(k => checks[k])
  if (active.length === 0) return null
  const pool = active.map(k => SETS[k]).join('')
  const chars = active.map(k => pick(SETS[k]))
  while (chars.length < len) chars.push(pick(pool))
  return shuffle(chars).join('')
}

// Reserves trailing slots for digits/symbols when selected, then alternates
// consonants and vowels so the result reads as syllables.
const generatePronounceable = (len: number, checks: CheckState): string | null => {
  if (!checks.uppercase && !checks.lowercase && !checks.numbers && !checks.symbols) return null

  let extra = ''
  if (checks.numbers) extra += pick(SETS.numbers) + pick(SETS.numbers)
  if (checks.symbols) extra += pick(SETS.symbols)
  const letterCount = Math.max(1, len - extra.length)

  let word = ''
  let consonant = randInt(2) === 0
  for (let i = 0; i < letterCount; i++) {
    word += pick(consonant ? CONSONANTS : VOWELS)
    consonant = !consonant
  }

  const up = checks.uppercase
  const low = checks.lowercase
  let cased = ''
  for (const ch of word) {
    if (up && !low) cased += ch.toUpperCase()
    else if (up && low) cased += randInt(100) < 30 ? ch.toUpperCase() : ch
    else cased += ch // lowercase only, or no case selected
  }
  return cased + extra
}

const PasswordGenerator = () => {
  const [checks, setChecks] = useState<CheckState>({
    numbers: false,
    symbols: false,
    length: '8',
    lowercase: true,
    uppercase: false,
    pronounceable: false,
    noChecks: false,
  })
  const [password, setPassword] = useState('')
  const [copied, setCopied] = useState(false)

  const generatePassword = () => {
    const length = parseInt(checks.length)
    const pw = checks.pronounceable
      ? generatePronounceable(length, checks)
      : generateRandom(length, checks)

    if (pw === null) {
      setPassword('')
      setChecks(prev => (prev.noChecks ? prev : { ...prev, noChecks: true }))
      return
    }
    setChecks(prev => (prev.noChecks ? { ...prev, noChecks: false } : prev))
    setPassword(pw)
  }

  // Regenerate live whenever a character-set toggle or the length changes,
  // matching the source tool's auto-update behaviour.
  useEffect(() => {
    generatePassword()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checks.uppercase, checks.lowercase, checks.numbers, checks.symbols, checks.pronounceable, checks.length])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    generatePassword()
  }

  const handleChecks = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setChecks(prev => ({ ...prev, noChecks: false, [name]: checked }))
  }

  const handleCopy = async () => {
    if (!password) return
    try {
      await navigator.clipboard.writeText(password)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
      alert('Failed to copy. Please copy the password manually.')
    }
  }

  const handleLength = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecks(prev => ({ ...prev, length: e.target.value }))
  }

  const handlers = { handleChecks, handleClick, handleLength }

  return (
    <MyContainer header="Password Generator">
      <div className="flex flex-col justify-center items-center p-0 m-0">
        <PasswordForm checks={checks} handlers={handlers} />

        <div className="mt-3 w-full flex items-center gap-2">
          <input
            type="text"
            value={password}
            readOnly
            placeholder="Your password appears here…"
            className="flex-1 min-w-0 border-2 border-gray-200 rounded-lg p-2 outline-none text-black font-mono text-sm truncate"
          />
          <button
            onClick={handleCopy}
            disabled={!password}
            className={`transition-colors shrink-0 ${
              !password
                ? 'text-gray-300 cursor-not-allowed'
                : copied
                  ? 'text-green-500'
                  : 'text-gray-400 hover:text-gray-600'
            }`}
            aria-label="Copy"
          >
            {copied ? <Check size={22} /> : <Copy size={20} />}
          </button>
        </div>
      </div>
    </MyContainer>
  )
}

export default PasswordGenerator
