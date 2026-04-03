'use client'

import BrainsContainer from '@/app/components/BrainsContainer'
import MyCodeHighlighter from '@/app/components/MyCodeHighlighter'
import MyContainer from '@/app/components/MyContainer'
import { useState } from 'react'

export default function PrimeChecker() {
  const [number, setNumber] = useState<string>('')
  const [result, setResult] = useState<string>('')
  const [factors, setFactors] = useState<string[]>([])

  const isPrime = (num: bigint): boolean => {
    if (num <= 1n) return false
    if (num === 2n) return true
    if (num % 2n === 0n) return false

    for (let i = 3n; i * i <= num; i += 2n) {
      if (num % i === 0n) return false
    }
    return true
  }

  const getFactors = (num: bigint): string[] => {
    const result: string[] = []

    for (let i = 1n; i * i <= num; i++) {
      if (num % i === 0n) {
        result.push(i.toString())
        if (i !== num / i) {
          result.push((num / i).toString())
        }
      }
    }

    return result.sort((a, b) => (BigInt(a) < BigInt(b) ? -1 : 1))
  }

  const handleCheck = (value: string) => {
    setNumber(value)
    setFactors([])

    if (!value) {
      setResult('')
      return
    }

    try {
      const parsed = BigInt(value)

      if (isPrime(parsed)) {
        setResult(`${parsed.toString()} is a prime number.`)
      } else {
        const factorList = getFactors(parsed)
        setFactors(factorList)
        setResult(`${parsed.toString()} is not a prime number.`)
      }
    } catch {
      setResult('Invalid input.')
    }
  }

  const snippet = `for (let i = 3n; i * i <= num; i += 2n) {
    if (num % i === 0n) return false
  }
  return true`

  return (
    <MyContainer header="Prime Number Checker" size="max-w-lg">
      <div className=" flex items-center justify-center bg-gray-100 flex-col">
        <input
          type="number"
          value={number}
          onChange={e => handleCheck(e.target.value)}
          placeholder="Enter a number"
          className="w-full p-2 border rounded-lg mb-4"
        />

        {result && <p className="mt-2 text-center font-medium">{result}</p>}

        {factors.length > 0 && (
          <div className="mt-4">
            <p className="font-semibold mb-2 text-center">Factors:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {factors.map(factor => (
                <span key={factor} className="px-2 py-1 bg-gray-200 rounded-lg text-sm">
                  {factor}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      <BrainsContainer>
        <MyCodeHighlighter item={snippet} />
        {/* <div className="mt-5">Take aways</div>
        <ul>
          <li>
            <code>try and catch</code> is still needed despite{' '}
            <code>input type='number'</code>, to overcome copy/paste and decimals
          </li>
        </ul> */}
      </BrainsContainer>
    </MyContainer>
  )
}
