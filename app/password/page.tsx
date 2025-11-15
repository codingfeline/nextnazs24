'use client'

import { useState } from 'react'

interface CheckState {
  [key: string]: boolean
}

const Password: React.FC = () => {
  const [checks, setChecks] = useState<CheckState>({
    numbers: false,
    symbols: false,
  })

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log('first')
  }

  const handleChecks = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.checked)
    const { name, checked } = e.target
    setChecks(prev => ({ ...prev, [name]: checked }))
  }

  return (
    <div className="bg-white flex flex-col justify-center items-center rounded-md p-6 m-4">
      <h1>Password Generator</h1>
      <form id="password">
        <div className="">
          <label htmlFor="numbers">
            <input
              type="checkbox"
              id="numbers"
              name="numbers"
              checked={checks.numbers}
              onChange={handleChecks}
            />{' '}
            Numbers
          </label>
          <label htmlFor="symbols">
            <input
              type="checkbox"
              id="symbols"
              name="symbols"
              checked={checks.symbols}
              onChange={handleChecks}
            />{' '}
            Symbols
          </label>
        </div>
        <button
          onClick={handleClick}
          className="bg-[#a1d3eb] p-2 rounded-md border-[#1a6368] border hover:bg-[#c0e2f1]"
        >
          Generate
        </button>
      </form>
    </div>
  )
}

export default Password
