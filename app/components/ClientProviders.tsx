'use client'

import AuthProvider from '@/app/auth/Provider'
import { BalloonsProvider } from '@/providers/BalloonsProvider'
import { ThemeColorProvider } from '@/providers/ThemeColorProvider'

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ThemeColorProvider>
        <BalloonsProvider>{children}</BalloonsProvider>
      </ThemeColorProvider>
    </AuthProvider>
  )
}
