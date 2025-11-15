'use client'

import AuthProvider from '@/app/auth/Provider'
import { CookieConsentProvider } from '@/app/CookiesPolicy/CookieConsentContext'

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CookieConsentProvider>{children}</CookieConsentProvider>
    </AuthProvider>
  )
}
