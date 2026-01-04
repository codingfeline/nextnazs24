'use client'

import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

type ConsentState = {
  accepted: boolean
  setAccepted: (value: boolean) => void
}

const CookieConsentContext = createContext<ConsentState | undefined>(undefined)

export const useCookieConsent = (): ConsentState => {
  const context = useContext(CookieConsentContext)
  if (!context) {
    throw new Error('useCookieConsent must be used within CookieConsentProvider')
  }
  return context
}

export const CookieConsentProvider = ({ children }: { children: ReactNode }) => {
  const [accepted, setAcceptedState] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookiesAccepted')
    if (consent === 'true') {
      setAcceptedState(true)
    }
  }, [])

  const setAccepted = (value: boolean) => {
    localStorage.setItem('cookiesAccepted', value ? 'true' : 'false')
    setAcceptedState(value)
  }

  return (
    <CookieConsentContext.Provider value={{ accepted, setAccepted }}>
      {children}
    </CookieConsentContext.Provider>
  )
}
