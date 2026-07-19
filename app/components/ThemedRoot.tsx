'use client'

import { useThemeColor } from '@/providers/ThemeColorProvider'
import { Theme } from '@radix-ui/themes'

export default function ThemedRoot({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const { color, contrast } = useThemeColor()
  return (
    <Theme
      accentColor="blue"
      className={className}
      style={{ '--theme-primary': color, '--theme-primary-contrast': contrast } as React.CSSProperties}
    >
      {children}
    </Theme>
  )
}
