'use client'
import { Clear } from '@/app/components'
import MyContainer from '@/app/components/MyContainer'
import { QRCodeCanvas, QRCodeSVG } from 'qrcode.react'
import { useState } from 'react'

type Mode = 'text' | 'contact'

// Which contact fields go into the vCard
const CONTACT_OPTIONS = [
  { value: 'number', label: 'Number only' },
  { value: 'name-number', label: 'Name and number' },
  { value: 'all', label: 'Name, number and email' },
] as const
type ContactFields = (typeof CONTACT_OPTIONS)[number]['value']

// vCard text values escape \ , ; and turn line breaks into a literal \n
const escapeVCard = (value: string) =>
  value.replace(/\\/g, '\\\\').replace(/[,;]/g, m => `\\${m}`).replace(/\r?\n/g, '\\n')

function buildVCard(name: string, mobile: string, email: string, note = '') {
  return [
    'BEGIN:VCARD',
    'VERSION:3.0',
    // FN is required in vCard 3.0, so a number-only card uses the number as its name
    `FN:${name || mobile || email}`,
    mobile && `TEL;TYPE=CELL:${mobile}`,
    email  && `EMAIL:${email}`,
    note   && `NOTE:${escapeVCard(note)}`,
    'END:VCARD',
  ].filter(Boolean).join('\n')
}

function Field({
  label, value, onChange, type = 'text', placeholder,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
  placeholder?: string
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full border-2 border-gray-200 rounded-lg p-2.5 pr-8 focus:border-blue-500 outline-none transition-all text-black text-sm"
        />
        {value && (
          <button
            onClick={() => onChange('')}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Clear className="text-xl cursor-pointer" />
          </button>
        )}
      </div>
    </div>
  )
}

export default function QrGenerator() {
  const [mode, setMode] = useState<Mode>('contact')
  const [text, setText] = useState('')
  const [name, setName] = useState('')
  const [mobile, setMobile] = useState('')
  const [email, setEmail] = useState('')
  const [note, setNote] = useState('')
  const [contactFields, setContactFields] = useState<ContactFields>('all')
  const [qrValue, setQrValue] = useState('')

  // Hidden fields keep what was typed (for switching back) but are left out of the QR
  const showName = contactFields !== 'number'
  const showEmail = contactFields === 'all'
  const contactName = showName ? name.trim() : ''
  const contactEmail = showEmail ? email.trim() : ''
  const contactNote = showEmail ? note.trim() : '' // note sits with email, in the third option

  const canGenerate =
    mode === 'text' ? !!text.trim()
    : !!(contactName || mobile.trim() || contactEmail || contactNote)

  const handleGenerate = () => {
    if (!canGenerate) return
    setQrValue(
      mode === 'text' ? text.trim()
      : buildVCard(contactName, mobile.trim(), contactEmail, contactNote)
    )
  }

  const handleModeSwitch = (m: Mode) => setMode(m)

  const clearText = () => { setText(''); setQrValue('') }
  const clearContact = () => { setName(''); setMobile(''); setEmail(''); setNote(''); setQrValue('') }

  const downloadSvg = () => {
    const svg = document.querySelector('#qr-svg svg') as SVGElement
    if (!svg) return
    const blob = new Blob([svg.outerHTML], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'qrcode.svg'
    a.click()
    URL.revokeObjectURL(url)
  }

  const downloadPng = () => {
    const canvas = document.querySelector('#qr-png canvas') as HTMLCanvasElement
    if (!canvas) return
    const a = document.createElement('a')
    a.href = canvas.toDataURL('image/png')
    a.download = 'qrcode.png'
    a.click()
  }

  return (
    <MyContainer header="QR Code Generator">
      <div className="flex flex-col gap-4">

        {/* Mode tabs */}
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1 w-fit">
          {(['text', 'contact'] as Mode[]).map(m => (
            <button
              key={m}
              onClick={() => handleModeSwitch(m)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors capitalize ${
                mode === m
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        {/* Fields */}
        {mode === 'text' ? (
          <Field
            label="URL or text"
            value={text}
            onChange={v => { setText(v); setQrValue('') }}
            placeholder="https://example.com"
          />
        ) : (
          <div className="flex flex-col gap-3">
            <fieldset className="flex flex-wrap gap-x-4 gap-y-1">
              <legend className="sr-only">Fields to include</legend>
              {CONTACT_OPTIONS.map(option => (
                <label key={option.value} className="flex items-center gap-1.5 text-sm text-gray-600 cursor-pointer">
                  <input
                    type="radio"
                    name="contact-fields"
                    value={option.value}
                    checked={contactFields === option.value}
                    onChange={() => { setContactFields(option.value); setQrValue('') }}
                    className="accent-blue-600 cursor-pointer"
                  />
                  {option.label}
                </label>
              ))}
            </fieldset>
            {showName && <Field label="Name" value={name} onChange={setName} placeholder="Jane Smith" />}
            <Field label="Mobile" value={mobile} onChange={setMobile} type="tel" placeholder="+44 7700 900000" />
            {showEmail && <Field label="Email" value={email} onChange={setEmail} type="email" placeholder="jane@example.com" />}
            {showEmail && (
              <div>
                <label htmlFor="qr-note" className="block text-xs font-medium text-gray-500 mb-1">Note</label>
                <div className="relative">
                  <textarea
                    id="qr-note"
                    value={note}
                    onChange={e => setNote(e.target.value)}
                    placeholder="Met at the conference, follow up in May"
                    rows={3}
                    className="w-full border-2 border-gray-200 rounded-lg p-2.5 pr-8 focus:border-blue-500 outline-none transition-all text-black text-sm resize-y"
                  />
                  {note && (
                    <button
                      onClick={() => setNote('')}
                      className="absolute right-2 top-2.5 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <Clear className="text-xl cursor-pointer" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="flex gap-2">
          <button
            onClick={handleGenerate}
            disabled={!canGenerate}
            className="flex-1 bg-blue-100 text-blue-800 p-2 rounded-lg border border-blue-200 hover:bg-blue-200 transition-colors font-medium text-sm disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Generate
          </button>
          <button
            onClick={mode === 'text' ? clearText : clearContact}
            disabled={mode === 'text' ? !text : !name && !mobile && !email && !note}
            className="flex-1 bg-gray-100 text-gray-600 p-2 rounded-lg border border-gray-200 hover:bg-gray-200 transition-colors font-medium text-sm disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Clear
          </button>
        </div>

        {qrValue && (
          <div className="flex flex-col items-center gap-3 p-4 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <div id="qr-svg">
              <QRCodeSVG value={qrValue} size={180} bgColor="#fff" fgColor="#1e293b" />
            </div>
            <div id="qr-png" className="hidden">
              <QRCodeCanvas value={qrValue} size={512} bgColor="#fff" fgColor="#1e293b" />
            </div>
            <div className="flex gap-3">
              <button
                onClick={downloadSvg}
                className="text-xs text-gray-400 hover:text-blue-600 transition-colors"
              >
                Download SVG
              </button>
              <span className="text-gray-300">|</span>
              <button
                onClick={downloadPng}
                className="text-xs text-gray-400 hover:text-blue-600 transition-colors"
              >
                Download PNG
              </button>
            </div>
          </div>
        )}
      </div>
    </MyContainer>
  )
}
