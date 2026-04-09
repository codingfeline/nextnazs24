'use client'

import BrainsContainer from '@/app/components/BrainsContainer'
import MyCodeHighlighter from '@/app/components/MyCodeHighlighter'
import MyContainer from '@/app/components/MyContainer'
import Reveal from '@/app/components/Reveal'
import { useEffect, useState } from 'react'

export default function FibonacciPage() {
  const [count, setCount] = useState<number>(10)
  const [sequence, setSequence] = useState<number[]>([])

  const generateFibonacci = (n: number) => {
    if (n <= 0) return []
    if (n === 1) return [0]

    const seq = [0, 1]

    for (let i = 2; i < n; i++) {
      seq.push(seq[i - 1] + seq[i - 2])
    }

    return seq
  }

  // Generate Fibonacci sequence in real-time whenever input changes
  useEffect(() => {
    const result = generateFibonacci(count)
    setSequence(result)
  }, [count])

  const snippet = ` const generateFibonacci = (n: number) => {
    if (n <= 0) return []
    if (n === 1) return [0]
    const seq = [0, 1]
    for (let i = 2; i < n; i++) {
      seq.push(seq[i - 1] + seq[i - 2])
    }
    return seq
  }`

  return (
    <Reveal delay={300}>
      <MyContainer header="Fibonacci Sequence">
        <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
          <input
            type="number"
            value={count}
            onChange={e => setCount(Number(e.target.value))}
            className="border rounded-lg p-2"
            placeholder="Enter number of terms"
            min={0}
          />
        </div>

        {sequence.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Result:</h2>
            <div className="flex flex-wrap gap-2">
              {sequence.map((num, index) => (
                <span key={index} className="px-3 py-1 bg-gray-200 rounded-full">
                  {num}
                </span>
              ))}
            </div>
          </div>
        )}
        <BrainsContainer>
          <MyCodeHighlighter item={snippet} />
        </BrainsContainer>
      </MyContainer>
    </Reveal>
  )
}
