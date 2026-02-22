'use client'

import { ChangeEvent, useState } from 'react'

interface LeapYearProps {
  initialYear?: number
}

const LeapYearChecker = ({ initialYear = 2024 }: LeapYearProps) => {
  // Typing the state as number | string to handle empty input fields gracefully
  const [year, setYear] = useState<number | string>(initialYear)

  const checkLeapYear = (num: number | string): string => {
    const numericYear = Number(num)

    if (!num && num !== 0) return 'Please enter a year.'

    // Logic: Divisible by 4, but if divisible by 100, must also be divisible by 400
    if (numericYear % 4 === 0) {
      if (numericYear % 100 === 0 && numericYear % 400 !== 0) {
        return `${numericYear} is not a leap year.`
      }
      return `${numericYear} is a leap year.`
    }

    return `${numericYear} is not a leap year.`
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value
    // Allow empty string so user can clear the input, otherwise convert to number
    setYear(value === '' ? '' : Number(value))
  }

  return (
    <div className="flex_center">
      <div className="p-2 border border-gray-600 rounded-md mt-2 bg-gray-200 w-full  text-gray-500">
        <form>
          <h3>Leap Year Checker</h3>
          <label htmlFor="year-input" style={{ display: 'block', marginBottom: '8px' }}>
            Enter Year:
          </label>
          <input
            id="year-input"
            type="number"
            value={year}
            onChange={handleInputChange}
            className="p-2 rounded-md outline-none  border-gray-400 border"
          />
          <div style={{ marginTop: '16px', color: '#007bff', fontWeight: 'bold' }}>
            {checkLeapYear(year)}
          </div>
        </form>
      </div>
    </div>
  )
}

export default LeapYearChecker
