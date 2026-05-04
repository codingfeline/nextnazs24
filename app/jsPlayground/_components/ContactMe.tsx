'use client'
import { Send } from '@/app/components'
import MyContainer from '@/app/components/MyContainer'
import { useState } from 'react'
import RevealPlayGround from './RevealPlayGround'

interface FormState {
  name: string
  email: string
  phone: string
  message: string
}

function newChallenge() {
  const a = Math.floor(Math.random() * 9) + 1
  const b = Math.floor(Math.random() * 9) + 1
  return { a, b, answer: a + b }
}

export default function ContactMe() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [challenge, setChallenge] = useState(newChallenge)
  const [captchaInput, setCaptchaInput] = useState('')
  const [captchaError, setCaptchaError] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (parseInt(captchaInput, 10) !== challenge.answer) {
      setCaptchaError(true)
      setCaptchaInput('')
      setChallenge(newChallenge())
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed to send')
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setForm({ name: '', email: '', phone: '', message: '' })
    setCaptchaInput('')
    setCaptchaError(false)
    setChallenge(newChallenge())
    setSubmitted(false)
  }

  const inputClass =
    'w-full border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 outline-none transition-all text-black bg-white'
  const labelClass = 'block text-sm font-medium text-gray-500 mb-1'

  if (submitted) {
    return (
      <RevealPlayGround>
        <MyContainer header="Contact Me">
          <div className="text-center py-6 mt-3">
            <Send size={40} className="mx-auto mb-3 text-blue-500" />
            <p className="text-gray-600 font-medium">Message sent!</p>
            <p className="text-sm text-gray-400 mt-1">
              Thanks, {form.name}. I'll be in touch.
            </p>
            <button
              onClick={handleReset}
              className="mt-4 text-sm text-blue-500 hover:underline"
            >
              Send another
            </button>
          </div>
        </MyContainer>
      </RevealPlayGround>
    )
  }

  return (
    <RevealPlayGround>
      <MyContainer header="Contact Me">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
          <div>
            <label className={labelClass} htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              required
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="phone">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="Your phone number"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What's on your mind?"
              required
              rows={4}
              className={`${inputClass} resize-none`}
            />
          </div>

          {/* Captcha */}
          <div>
            <label className={labelClass} htmlFor="captcha">
              Quick check: what is {challenge.a} + {challenge.b}?
            </label>
            <input
              id="captcha"
              type="number"
              value={captchaInput}
              onChange={e => {
                setCaptchaInput(e.target.value)
                setCaptchaError(false)
              }}
              placeholder="Your answer"
              required
              className={`${inputClass} ${captchaError ? 'border-red-400 focus:border-red-400' : ''}`}
            />
            {captchaError && (
              <p className="text-red-400 text-xs mt-1">
                Incorrect — try the new question.
              </p>
            )}
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            {loading ? (
              'Sending…'
            ) : (
              <>
                <span>Send</span>
                <Send size={16} />
              </>
            )}
          </button>
        </form>
      </MyContainer>
    </RevealPlayGround>
  )
}
