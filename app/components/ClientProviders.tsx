'use client'

import { CookieConsentProvider } from '@/app/CookiesPolicy/CookieConsentContext'
import AuthProvider from '@/app/auth/Provider'

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CookieConsentProvider>{children}</CookieConsentProvider>
    </AuthProvider>
  )
}
