'use client'

import AuthProvider from '@/app/auth/Provider'
import { BalloonsProvider } from '@/providers/BalloonsProvider'

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <BalloonsProvider>{children}</BalloonsProvider>
    </AuthProvider>
  )
}
