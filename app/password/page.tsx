'use client'

import { useState } from 'react'
import { Copy } from '../components'

interface CheckState {
  numbers: boolean
  symbols: boolean
  lowercase: boolean
  uppercase: boolean
  length: string
  copied: boolean
}

// const fetcher = (url: string) => fetch(url).then(res => res.text())

// const useFetch = (url: string) => {
//   const { data, error } = useSwr(url, fetcher)

//   return {
//     data,
//     loading: !error && !data,
//     error: error,
//   }
// }

const Password = () => {
  const [checks, setChecks] = useState<CheckState>({
    numbers: false,
    symbols: false,
    length: '8',
    lowercase: true,
    uppercase: false,
    copied: false,
  })
  const [password, setPassword] = useState('')
  const [noChecks, setNoChecks] = useState(false)

  // const { data, loading, error } = useFetch('/api/pass')

  const generatePassword = () => {
    const CHARS = {
      allcases: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
      uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      lowercase: 'abcdefghijklmnopqrstuvwxyz',
      numbers: '0123456789',
      symbols: '!@#$%^&*()_+[]{}|;:,.<>/?',
    }
    let pass = ''
    let characters = ''

    if (checks.lowercase) characters += CHARS.lowercase
    if (checks.uppercase) characters += CHARS.uppercase
    if (checks.numbers) characters += CHARS.numbers
    if (checks.symbols) characters += CHARS.symbols

    const length = parseInt(checks.length)
    for (let i = 0; i < length; i++) {
      const n = Math.floor(Math.random() * characters.length)
      pass += characters[n]
    }
    setPassword(pass)
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!checks.lowercase && !checks.uppercase && !checks.numbers && !checks.symbols) {
      setNoChecks(true)
      setPassword('')
      return
    }
    generatePassword()
  }

  const handleChecks = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNoChecks(false)
    // setPassword('')
    const { name, checked } = e.target
    setChecks(prev => ({ ...prev, [name]: checked }))
    // generatePassword()
  }

  const handleCopy = async () => {
    if (!password) return

    try {
      await navigator.clipboard.writeText(password)
      setChecks(prev => ({ ...prev, copied: true }))

      setTimeout(() => {
        setChecks(prev => ({ ...prev, copied: false }))
      }, 3000)
    } catch (err) {
      console.log('Failed to copy text: ', err)
      alert('Failed to copy. Please copy the password manually.')
    }
  }

  const handleLength = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecks(prev => ({ ...prev, length: e.target.value }))
  }
  // if (loading) return <div>Loading...</div>
  // if (error) return <div className="bg-white">Error occurred: {error.message}</div>

  return (
    <div className="bg-[#cecdcd] flex flex-col justify-center items-center rounded-md p-4 m-4">
      <h1>Password Generator</h1>
      {/* <p className="bg-white ">{data}</p> */}
      <form id="password" className="flex flex-col">
        <div className="bg-[#d7eef8] border border-[#999898] mb-2 p-5 rounded-xl">
          <label htmlFor="lowercase">
            <input
              type="checkbox"
              id="lowercase"
              name="lowercase"
              checked={checks.lowercase}
              onChange={handleChecks}
            />
            Lowercase
          </label>
          <label htmlFor="uppercase">
            <input
              type="checkbox"
              id="uppercase"
              name="uppercase"
              checked={checks.uppercase}
              onChange={handleChecks}
            />{' '}
            Uppercase
          </label>
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
          <label htmlFor="">
            Length
            <input
              type="range"
              min="10"
              max="25"
              onChange={handleLength}
              value={checks.length}
            />{' '}
            {checks.length}
          </label>
        </div>
        <button
          onClick={handleClick}
          className="bg-[#a1d3eb] p-2 rounded-md border-[#1a6368] border hover:bg-[#c0e2f1]"
        >
          Generate
        </button>

        {/* <div className="  h-[] justify-center"> */}
        <div
          className={`mt-2 flex justify-between rounded-md ${
            !noChecks && 'bg-[#f3f3f3]'
          }`}
        >
          {password && (
            <>
              <p className="font-['Consolas'] text-lg pl-2 w-[200px] flex flex-col justify-center ">
                {password}
              </p>
              <div className="bg-[white] p-1 flex flex-col items-center rounded-r-md">
                <Copy
                  size={25}
                  onClick={handleCopy}
                  fill={`${checks.copied ? 'green' : '#666'}`}
                  className="cursor-pointer"
                  title="Copy password"
                />{' '}
                <span className={`${checks.copied ? 'text-[green]' : 'text-[#fff]'}`}>
                  ✓
                </span>
              </div>
            </>
          )}
          {noChecks && (
            <p
              className={`text-sm mt-1 text-center w-full ${
                noChecks ? 'text-[#a10325] ' : 'text-[#cecdcd]'
              }`}
            >
              Please make your selection
            </p>
          )}
        </div>
        {/* </div> */}
      </form>
    </div>
  )
}

export default Password
