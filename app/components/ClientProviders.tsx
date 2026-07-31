'use client'

import AuthProvider from '@/app/auth/Provider'
import { BalloonsProvider } from '@/providers/BalloonsProvider'
import { ThemeColorProvider } from '@/providers/ThemeColorProvider'
import EscClearInput from './EscClearInput'

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ThemeColorProvider>
        <BalloonsProvider>
          <EscClearInput />
          {children}
        </BalloonsProvider>
      </ThemeColorProvider>
    </AuthProvider>
  )
}
