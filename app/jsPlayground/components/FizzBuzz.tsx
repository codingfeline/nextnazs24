'use client'

import BrainsContainer from '@/app/components/BrainsContainer'
import MyCodeHighlighter from '@/app/components/MyCodeHighlighter'
import MyContainer from '@/app/components/MyContainer'
import Reveal from '@/app/components/Reveal'

const FizzBuzz = () => {
  // Generate numbers 1 to 100
  const range = Array.from({ length: 20 }, (_, i) => i + 1)

  const snippet = `const range = Array.from({ length: 20 }, (_, i) => i + 1)
  {range.map(num => {
  // Logic: Build the string
  let output = ''
  if (num % 3 === 0) output += 'Fizz'
  if (num % 5 === 0) output += 'Buzz'

  // Final value to display
  const displayValue = output || num
  
  `

  return (
    <Reveal delay={300}>
      <MyContainer header="FizzBuzz Fun">
        <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {/* <ul style={{ listStyle: 'none', lineHeight: '1.6' }}> */}
            {range.map(num => {
              // Logic: Build the string
              let output = ''
              if (num % 3 === 0) output += 'Fizz'
              if (num % 5 === 0) output += 'Buzz'

              // Final value to display
              const displayValue = output || num

              return (
                <li key={num} style={{ color: output ? '#e91e63' : '#333' }}>
                  <strong>{num}:</strong> {displayValue}
                </li>
              )
            })}
          </ul>
        </div>
        <BrainsContainer>
          <MyCodeHighlighter item={snippet} />
        </BrainsContainer>
      </MyContainer>
    </Reveal>
  )
}

export default FizzBuzz
