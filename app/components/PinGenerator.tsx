'use client'

// import { Check, Copy, RefreshCw } from 'lucide-react' // Optional: for nice icons
import { useState } from 'react'
import { Check, Copy, Refresh } from '.'
import MyContainer from './MyContainer'
import Reveal from './Reveal'

const PinGenerator = () => {
  const [pin, setPin] = useState<string>('------')
  const [copied, setCopied] = useState(false)

  const generatePin = () => {
    // Generates a random number between 0 and 999999
    // padStart ensures it is always 6 digits (e.g., 001234)
    const newPin = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, '0')

    setPin(newPin)
    setCopied(false)
  }

  const copyToClipboard = async () => {
    if (pin === '------') return
    await navigator.clipboard.writeText(pin)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Reveal>
      <MyContainer header="PIN Generator">
        <div className="flex items-center gap-4 mb-8">
          <div className="flex gap-2">
            {pin.split('').map((digit, i) => (
              <span
                key={i}
                className="w-10 h-12 flex items-center justify-center bg-gray-100 text-2xl font-mono font-bold rounded-md border border-gray-300 "
              >
                {digit}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-3 w-full">
          <button
            onClick={generatePin}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
          >
            <Refresh size={24} className={pin !== '------' ? 'animate-spin-once' : ''} />
            Generate
          </button>

          <button
            onClick={() => copyToClipboard()}
            disabled={pin === '------'}
            className="px-4 py-3 bg-gray-200  hover:bg-gray-300  rounded-lg transition-colors disabled:opacity-50"
          >
            {copied ? <Check size={20} className="text-green-600" /> : <Copy size={20} />}
          </button>
        </div>
      </MyContainer>
    </Reveal>
  )
}

export default PinGenerator
