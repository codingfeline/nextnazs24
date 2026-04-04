'use client'

import BrainsContainer from '@/app/components/BrainsContainer'
import MyCodeHighlighter from '@/app/components/MyCodeHighlighter'
import MyContainer from '@/app/components/MyContainer'
import { useState } from 'react'

export default function DateFormatter() {
  const [selectedDate, setSelectedDate] = useState<string>('')

  const date = selectedDate ? new Date(selectedDate) : new Date()

  const currentDateFormat = `Current Date and Time: ${date}`

  function formatDateMMDDYYYY(date: Date) {
    return date.toLocaleDateString('en-GB')
  }

  function formatDateLong(date: Date) {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }

    return date.toLocaleDateString('en-GB', options)
  }

  const snippet = `function formatDateMMDDYYYY(date: Date) {
    const formattedDate = date.toLocaleDateString('en-GB')
    return \`Formatted Date (MM/DD/YYYY): \${formattedDate}\`
  }

  function formatDateLong(date: Date) {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }

    const formattedDate = date.toLocaleDateString('en-GB', options)

    return \`Formatted Date (Month Day, Year): \${formattedDate}\`
  `

  return (
    <MyContainer header="Date Formatter">
      <div className="p-6 space-y-4 font-mono bg-gray-200 rounded-md">
        <div>
          <label className="block mb-2 font-semibold">Choose a date:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={e => setSelectedDate(e.target.value)}
            className="border p-2 rounded"
          />
        </div>

        <div className="space-y-2">
          <p>{currentDateFormat}</p>
          <p>
            <span className="font-sans">Formatted Date (MM/DD/YYYY): </span>
            {formatDateMMDDYYYY(date)}
          </p>
          <p>
            <span className="font-sans">Formatted Date (Day, Month, Year): </span>
            {formatDateLong(date)}
          </p>
        </div>
      </div>
      <BrainsContainer>
        <MyCodeHighlighter item={snippet} />
      </BrainsContainer>
    </MyContainer>
  )
}
