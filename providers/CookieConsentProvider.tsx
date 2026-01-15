// providers/CookieConsentProvider.tsx
'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Consent = {
  necessary: true
  analytics: boolean
  externalMedia: boolean
}

type Context = {
  consent: Consent
  updateConsent: (updates: Partial<Consent>) => void
}

const defaultConsent: Consent = {
  necessary: true,
  analytics: false,
  externalMedia: false,
}

const CookieConsentContext = createContext<Context | null>(null)

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<Consent>(defaultConsent)

  useEffect(() => {
    const stored = localStorage.getItem('cookie_consent')
    if (stored) setConsent(JSON.parse(stored))
  }, [])

  useEffect(() => {
    // Google Consent Mode v2
    window.gtag?.('consent', 'update', {
      analytics_storage: consent.analytics ? 'granted' : 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    })
  }, [consent])

  const updateConsent = async (updates: Partial<Consent>) => {
    const updated = { ...consent, ...updates }
    setConsent(updated)
    localStorage.setItem('cookie_consent', JSON.stringify(updated))

    await fetch('/api/consent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        analytics: updated.analytics,
        externalMedia: updated.externalMedia,
      }),
    })
  }

  return (
    <CookieConsentContext.Provider value={{ consent, updateConsent }}>
      {children}
    </CookieConsentContext.Provider>
  )
}

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext)
  if (!ctx) throw new Error('useCookieConsent must be used inside provider')
  return ctx
}
