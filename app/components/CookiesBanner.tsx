'use client'

import { useCookieConsent } from '@/app/CookiePolicy/CookieConsentContext'

const CookiesBanner = () => {
  const { accepted, setAccepted } = useCookieConsent()

  if (accepted) return null

  return (
    <div className="fixed bottom-0 w-full bg-gray-900 text-white px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 z-50">
      <p className="text-sm">
        We use cookies to improve your experience. By using our site, you agree to our{' '}
        <a href="/cookies-policy" className="underline text-blue-400 hover:text-blue-300">
          Cookies Policy
        </a>
        .
      </p>
      <button
        onClick={() => setAccepted(true)}
        className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded"
      >
        Accept
      </button>
    </div>
  )
}

export default CookiesBanner
