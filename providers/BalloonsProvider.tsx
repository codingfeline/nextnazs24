'use client'

import { createContext, useContext, useState } from 'react'

const BalloonsContext = createContext({ enabled: true, toggle: () => {} })

export function BalloonsProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(true)
  return (
    <BalloonsContext.Provider value={{ enabled, toggle: () => setEnabled(v => !v) }}>
      {children}
    </BalloonsContext.Provider>
  )
}

export const useBalloons = () => useContext(BalloonsContext)
