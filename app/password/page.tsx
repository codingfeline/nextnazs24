'use client'

import { useState } from 'react'
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
  // const [password, setPassword] = useState('')
  // const [noChecks, setNoChecks] = useState(false)

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
    setChecks(prev => ({ ...prev, password: pass }))
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
    console.log(checks)
  }

  const handleCopy = async () => {
    if (!checks.password) return

    try {
      await navigator.clipboard.writeText(checks.password)
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

  const handlers = {
    handleChecks,
    handleClick,
    handleCopy,
    handleLength,
  }
  // if (loading) return <div>Loading...</div>
  // if (error) return <div className="bg-white">Error occurred: {error.message}</div>

  return (
    <div className="bg-[#cecdcd] flex flex-col justify-center items-center rounded-md p-4 m-4">
      <h1>Password Generator</h1>
      {/* <p className="bg-white ">{data}</p> */}
      <PasswordForm checks={checks} handlers={handlers} />
    </div>
  )
}

export default Password
