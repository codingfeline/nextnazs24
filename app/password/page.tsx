'use client'

import { useState } from 'react'
import { Copy } from '../components'
import GoogleMapWithConsent from '../components/GoogleMapWithConsent'
import MainPage from '../components/MainPage'
import PasswordForm from './PasswordForm'
import { CheckState } from './interface'

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
    password: '',
    noChecks: false,
  })
  // const copiedRef = useRef()
  const [history, setHistory] = useState([] as string[])
  const [showSpan, setShowSpan] = useState([] as number[])
  const [count, setCount] = useState(1)

  // const { data, loading, error } = useFetch('/api/pass')
  const addAndTrim = (newItem: string) => {
    const newArr = [newItem, ...history]
    const trimmedArr = newArr.slice(0, 10)

    setHistory(trimmedArr)
  }

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
    // #a6cfe3 #e3c1f5 #c1f5d9
    const colour = count % 2 === 0 ? '#bbd3f0' : '#bbe3f0'
    addAndTrim(pass + colour)
    setChecks(prev => ({
      ...prev,
      password: pass + colour,
    }))
    setCount(prev => prev + 1)
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!checks.lowercase && !checks.uppercase && !checks.numbers && !checks.symbols) {
      setChecks(prev => ({ ...prev, noChecks: true }))
      setChecks(prev => ({ ...prev, password: '' }))
      return
    }
    generatePassword()
  }

  const handleChecks = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecks(prev => ({ ...prev, noChecks: false }))
    // setPassword('')
    const { name, checked } = e.target
    setChecks(prev => ({ ...prev, [name]: checked }))
  }

  const handleCopy = async (p: string, i: number) => {
    if (!p) return

    try {
      await navigator.clipboard.writeText(p.slice(0, -7)) // copy password minus the hex colours
      setChecks(prev => ({ ...prev, copied: true }))
      setShowSpan(prev => [...prev, i])

      setTimeout(() => {
        setChecks(prev => ({ ...prev, copied: false }))
        setShowSpan([])
      }, 500)
    } catch (err) {
      console.log('Failed to copy text: ', err)
      alert('Failed to copy. Please copy the password manually.')
    }
  }

  const handleLength = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecks(prev => ({ ...prev, length: e.target.value }))
  }

  const handlers = {
    handleChecks,
    handleClick,
    handleLength,
  }

  // if (loading) return <div>Loading...</div>
  // if (error) return <div className="bg-white">Error occurred: {error.message}</div>

  return (
    <MainPage bg="bg_password">
      <div className={` flex flex-col justify-center items-center rounded-md p-4 m-4`}>
        {/* <p className="bg-white ">{data}</p> */}
        <PasswordForm checks={checks} handlers={handlers} />

        {history.length > 0 && (
          <div className={`mt-3 bg-[#e1f6f7]  rounded-md w-[305px]  select-none`}>
            {history.length > 1 && (
              <p
                className={`bg-[#cafcfa] p-2 pl-5 rounded-t-md  justify-between items-center hidden`}
              >
                History
              </p>
            )}

            <ol className="list-decimal list-inside marker:text-gray-600 rounded-md border pb-2 pt-2 bg-[#a1d3eb] border-blue-300">
              {history.map((item, index) => {
                const bgCol = item.slice(-7)
                return (
                  <div
                    key={index}
                    className={`p-1 flex gap- items-center border-b  roboto-mono justify-around hover:text[red]`}
                    style={{ backgroundColor: bgCol }}
                  >
                    <span
                      className={`${
                        history.length > 1 ? ' text-[#8d8da1] ' : 'text-[#e1f6f7]'
                      } w-[35px] flex justify-start items-start flex-col`}
                    >
                      {index + 1}
                    </span>
                    <span
                      className={`${
                        showSpan.includes(index) ? 'text-[orange] ' : 'text-[#3b3b3b]'
                      } transition delay-150 w-[210px] `}
                    >
                      {item.slice(0, -7)}
                    </span>

                    <span
                      className={`${
                        showSpan.includes(index) ? 'text-[green] ' : 'text-[#a3acad]'
                      }   cursor-pointer transition delay-150`}
                    >
                      <Copy
                        onClick={() => handleCopy(item, index)}
                        title="Click to copy"
                      />
                      {/* ✓ */}
                    </span>
                  </div>
                )
              })}
            </ol>
          </div>
        )}
      </div>
      <GoogleMapWithConsent src="https://www.google.com/maps/embed?pb=YOUR_EMBED_URL" />
    </MainPage>
  )
}

export default Password
