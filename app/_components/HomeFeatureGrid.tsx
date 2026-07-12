'use client'

import { Dialog, Flex, Switch, Text } from '@radix-ui/themes'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { DEV_NO_AUTH } from '../lib/devSession'
import ChangeCaseContainer from '../jsPlayground/_containers/ChangeCaseContainer'
import DaysBetweenContainer from '../jsPlayground/_containers/DaysBetweenContainer'
import Ipv4Container from '../jsPlayground/_containers/Ipv4Container'
import PasswordContainer from '../jsPlayground/_containers/PasswordContainer'
import QuickBudgetContainer from '../jsPlayground/_containers/QuickBudgetContainer'
import TimeConverterContainer from '../jsPlayground/_containers/TimeConverterContainer'
import WordContainer from '../jsPlayground/_containers/WordContainer'

const FEATURES = [
  { key: 'word', label: 'Word Unscrambler', Component: WordContainer },
  { key: 'changeCase', label: 'Case Converter', Component: ChangeCaseContainer },
  { key: 'password', label: 'Password Generator', Component: PasswordContainer },
  { key: 'ipv4', label: 'IPv4', Component: Ipv4Container },
  { key: 'daysBetween', label: 'Days Between Dates', Component: DaysBetweenContainer },
  { key: 'time', label: 'Time', Component: TimeConverterContainer },
  { key: 'quickBudget', label: 'Quick Budget', Component: QuickBudgetContainer },
] as const

type ToggleState = Record<(typeof FEATURES)[number]['key'], boolean>

const defaultToggles = (): ToggleState =>
  Object.fromEntries(FEATURES.map(f => [f.key, true])) as ToggleState

const STORAGE_KEY = 'homeFeatureToggles'

const isTyping = (el: EventTarget | null) => {
  const target = el as HTMLElement | null
  return !!target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)
}

const SEQ_MS = 1000

export default function HomeFeatureGrid() {
  const { data: session } = useSession()
  const isAdmin = session?.user?.role === 'ADMIN' || DEV_NO_AUTH

  const [toggles, setToggles] = useState<ToggleState>(defaultToggles)
  const [open, setOpen] = useState(false)

  // Load any admin-saved visibility choices once the client mounts.
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      setToggles(prev => ({ ...prev, ...saved }))
    } catch {}
  }, [])

  const setToggle = (key: string, value: boolean) => {
    setToggles(prev => {
      const next = { ...prev, [key]: value }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch {}
      return next
    })
  }

  // Admin-only shortcut: press "?" then "f" (within 1s) to open the feature
  // picker. Ignored while typing in a field so it never hijacks a literal "?".
  useEffect(() => {
    if (!isAdmin) return

    let armed = 0
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.altKey || e.metaKey || isTyping(e.target)) return

      if (e.key === 'Escape' && open) {
        setOpen(false)
      } else if (e.key === '?') {
        armed = Date.now()
      } else if (e.key.toLowerCase() === 'f' && Date.now() - armed < SEQ_MS) {
        armed = 0
        e.preventDefault()
        setOpen(prev => !prev)
      } else {
        armed = 0
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isAdmin, open])

  const visibleFeatures = FEATURES.filter(f => toggles[f.key])

  return (
    <>
      <div className="gap-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 mt-3 p-2 items-start [&>*:last-child]:sm:col-span-2 [&>*:last-child]:sm:justify-self-center [&>*:last-child]:lg:col-span-1 [&>*:last-child]:lg:justify-self-auto">
        {visibleFeatures.map(({ key, Component }) => (
          <div key={key}>
            <Component />
          </div>
        ))}
      </div>

      {isAdmin && (
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Content maxWidth="360px">
            <Dialog.Title>Features</Dialog.Title>
            <Dialog.Description size="2" mb="4">
              Choose which utilities show on the home page. Saved to this browser only.
            </Dialog.Description>
            <Flex direction="column" gap="3">
              {FEATURES.map(({ key, label }) => (
                <Flex key={key} justify="between" align="center">
                  <Text size="2">{label}</Text>
                  <Switch checked={toggles[key]} onCheckedChange={value => setToggle(key, value)} />
                </Flex>
              ))}
            </Flex>
          </Dialog.Content>
        </Dialog.Root>
      )}
    </>
  )
}
