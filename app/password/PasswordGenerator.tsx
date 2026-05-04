'use client'

import { useState } from 'react'
import { Clear, Copy } from '../components'
// import RevealPlayGround from '../jsPlayground/_components/RevealPlayGround'
import MyContainer from '../components/MyContainer'
import PasswordForm from './PasswordForm'
import { CheckState } from './interface'

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
  const [history, setHistory] = useState<string[]>([])
  const [showSpan, setShowSpan] = useState<number[]>([])

  const generatePassword = () => {
    const length = parseInt(checks.length)
    let pass = ''

    if (checks.pronounceable) {
      const vowels = 'aeiou'
      const consonants = 'bcdfghjklmnprstvwz'
      const extras = [
        ...(checks.numbers ? '0123456789'.split('') : []),
        ...(checks.symbols ? '!@#$%^&*'.split('') : []),
      ]
      for (let i = 0; i < length; i++) {
        const isConsonantSlot = i % 2 === 0
        if (isConsonantSlot && extras.length && Math.random() < 0.25) {
          pass += extras[Math.floor(Math.random() * extras.length)]
        } else {
          const pool = isConsonantSlot ? consonants : vowels
          const c = pool[Math.floor(Math.random() * pool.length)]
          pass +=
            checks.uppercase && isConsonantSlot && Math.random() < 0.3
              ? c.toUpperCase()
              : c
        }
      }
    } else {
      const CHARS = {
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        numbers: '0123456789',
        symbols: '!@#$%^&*()_+[]{}|;:,.<>/?',
      }
      let characters = ''
      if (checks.lowercase) characters += CHARS.lowercase
      if (checks.uppercase) characters += CHARS.uppercase
      if (checks.numbers) characters += CHARS.numbers
      if (checks.symbols) characters += CHARS.symbols

      for (let i = 0; i < length; i++) {
        pass += characters[Math.floor(Math.random() * characters.length)]
      }
    }

    setHistory(prev => [pass, ...prev].slice(0, 10))
    setPassword(pass)
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (
      !checks.pronounceable &&
      !checks.lowercase &&
      !checks.uppercase &&
      !checks.numbers &&
      !checks.symbols
    ) {
      setChecks(prev => ({ ...prev, noChecks: true }))
      setPassword('')
      return
    }
    generatePassword()
  }

  const handleChecks = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setChecks(prev => ({ ...prev, noChecks: false, [name]: checked }))
  }

  const handleCopy = async (p: string, i: number) => {
    if (!p) return
    try {
      await navigator.clipboard.writeText(p)
      setCopied(true)
      setShowSpan(prev => [...prev, i])
      setTimeout(() => {
        setCopied(false)
        setShowSpan([])
      }, 500)
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
    // <Reveal delay={600}>
    <MyContainer header="Password Generator">
      <div className="flex flex-col justify-center items-center p-0 m-0">
        <PasswordForm checks={checks} handlers={handlers} />

        {history.length > 0 && (
          <div className="mt-1 bg-gray-50 rounded-lg border border-dashed border-gray-300 w-[305px] select-none">
            <div className="flex justify-center px-1 pt-1">
              <button
                onClick={() => setHistory([])}
                className="text-gray-400 hover:text-red-400 transition-colors  p-1"
                title="Clear history"
              >
                <Clear size={20} />
              </button>
            </div>
            <ol className="list-decimal list-inside marker:text-gray-400 pb-2">
              {history.map((item, index) => (
                <div
                  key={index}
                  className={`px-3 py-1 flex items-center gap-2 border-b border-gray-200 last:border-0 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-blue-50'
                  }`}
                >
                  <span className="text-xs text-gray-400 w-5 shrink-0">{index + 1}</span>
                  <span
                    className={`${
                      showSpan.includes(index) ? 'text-orange-500' : 'text-gray-700'
                    } transition-colors flex-1 font-mono text-sm truncate`}
                  >
                    {item}
                  </span>
                  <span
                    className={`${
                      showSpan.includes(index) ? 'text-green-500' : 'text-gray-400'
                    } cursor-pointer transition-colors hover:text-gray-600 shrink-0`}
                  >
                    <Copy onClick={() => handleCopy(item, index)} title="Click to copy" />
                  </span>
                </div>
              ))}
            </ol>
          </div>
        )}
      </div>
    </MyContainer>
    // </Reveal>
  )
}

export default PasswordGenerator
