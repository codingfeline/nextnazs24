'use client'

import { useState } from 'react'
import MyContainer from '../../components/MyContainer'
import Reveal from '../../components/Reveal'

const TempConverter = () => {
  const [celsius, setCelsius] = useState<string>('')
  const [fahrenheit, setFahrenheit] = useState<string>('')

  const handleCelsiusChange = (value: string) => {
    setCelsius(value)
    if (value === '') {
      setFahrenheit('')
      return
    }
    const converted = (parseFloat(value) * 9) / 5 + 32
    setFahrenheit(converted.toFixed(2))
  }

  const handleFahrenheitChange = (value: string) => {
    setFahrenheit(value)
    if (value === '') {
      setCelsius('')
      return
    }
    const converted = ((parseFloat(value) - 32) * 5) / 9
    setCelsius(converted.toFixed(2))
  }

  return (
    <Reveal delay={300}>
      <MyContainer header="Temperature Converter">
        <div className="flex flex-col space-y-4">
          {/* Celsius Input */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600">Celsius (°C)</label>
            <input
              type="number"
              value={celsius}
              onChange={e => handleCelsiusChange(e.target.value)}
              placeholder="0"
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="text-center text-gray-400 font-bold">⇅</div>

          {/* Fahrenheit Input */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600">Fahrenheit (°F)</label>
            <input
              type="number"
              value={fahrenheit}
              onChange={e => handleFahrenheitChange(e.target.value)}
              placeholder="32"
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          onClick={() => {
            setCelsius('')
            setFahrenheit('')
          }}
          className="w-full py-2 text-sm text-blue-600 hover:text-blue-800 font-semibold"
        >
          Reset Fields
        </button>
      </MyContainer>
    </Reveal>
  )
}

export default TempConverter
