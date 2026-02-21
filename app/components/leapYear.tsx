import React, { ChangeEvent, useState } from 'react'

interface LeapYearProps {
  initialYear?: number
}

const LeapYearChecker: React.FC<LeapYearProps> = ({ initialYear = 2024 }) => {
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
    <div
      style={{
        padding: '20px',
        maxWidth: '300px',
        border: '1px solid #ccc',
        borderRadius: '8px',
      }}
    >
      <h3 style={{ marginTop: 0 }}>TS Leap Year Checker</h3>
      <label htmlFor="year-input" style={{ display: 'block', marginBottom: '8px' }}>
        Enter Year:
      </label>
      <input
        id="year-input"
        type="number"
        value={year}
        onChange={handleInputChange}
        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
      />
      <div style={{ marginTop: '16px', color: '#007bff', fontWeight: 'bold' }}>
        {checkLeapYear(year)}
      </div>
    </div>
  )
}

export default LeapYearChecker
