// components/ManageCookiesButton.tsx
'use client'

export default function ManageCookiesButton() {
  const openConsent = () => {
    window.dispatchEvent(new Event('open-cookie-consent'))
  }

  return (
    <button
      onClick={openConsent}
      style={{ textDecoration: 'underline', cursor: 'pointer' }}
    >
      Manage cookies
    </button>
  )
}
