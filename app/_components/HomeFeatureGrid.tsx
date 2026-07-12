'use client'

import { Dialog, Flex, SegmentedControl, Switch, Text } from '@radix-ui/themes'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import ChangeCaseContainer from '../jsPlayground/_containers/ChangeCaseContainer'
import DaysBetweenContainer from '../jsPlayground/_containers/DaysBetweenContainer'
import Ipv4Container from '../jsPlayground/_containers/Ipv4Container'
import PasswordContainer from '../jsPlayground/_containers/PasswordContainer'
import QuickBudgetContainer from '../jsPlayground/_containers/QuickBudgetContainer'
import TimeConverterContainer from '../jsPlayground/_containers/TimeConverterContainer'
import WordContainer from '../jsPlayground/_containers/WordContainer'
import { FeatureKey } from './featureKeys'
import { DEV_NO_AUTH } from '../lib/devSession'

const FEATURES: { key: FeatureKey; label: string; Component: React.ComponentType }[] = [
  { key: 'word', label: 'Word Unscrambler', Component: WordContainer },
  { key: 'changeCase', label: 'Case Converter', Component: ChangeCaseContainer },
  { key: 'password', label: 'Password Generator', Component: PasswordContainer },
  { key: 'ipv4', label: 'IPv4', Component: Ipv4Container },
  { key: 'daysBetween', label: 'Days Between Dates', Component: DaysBetweenContainer },
  { key: 'time', label: 'Time', Component: TimeConverterContainer },
  { key: 'quickBudget', label: 'Quick Budget', Component: QuickBudgetContainer },
]

type ToggleMap = Partial<Record<FeatureKey, boolean>>
type Scope = 'me' | 'everyone'

const STORAGE_KEY = 'homeFeatureToggles'

const isTyping = (el: EventTarget | null) => {
  const target = el as HTMLElement | null
  return !!target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)
}

const SEQ_MS = 1000

export default function HomeFeatureGrid({ initialGlobalToggles }: { initialGlobalToggles: ToggleMap }) {
  const { data: session } = useSession()
  const isAdmin = session?.user?.role === 'ADMIN' || DEV_NO_AUTH

  const [globalToggles, setGlobalToggles] = useState<ToggleMap>(initialGlobalToggles)
  const [personalOverrides, setPersonalOverrides] = useState<ToggleMap>({})
  const [scopeByKey, setScopeByKey] = useState<Record<FeatureKey, Scope>>(
    () => Object.fromEntries(FEATURES.map(f => [f.key, 'me'])) as Record<FeatureKey, Scope>
  )
  const [open, setOpen] = useState(false)

  // Load this admin's personal (this-browser-only) overrides once the client mounts.
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      setPersonalOverrides(prev => ({ ...prev, ...saved }))
    } catch {}
  }, [])

  const isVisible = (key: FeatureKey) => personalOverrides[key] ?? globalToggles[key] ?? true

  const setToggle = async (key: FeatureKey, value: boolean) => {
    if (scopeByKey[key] === 'everyone') {
      // Broadcast: persist to the DB so every visitor sees it, and drop any
      // personal override for this key so it doesn't mask the new default.
      setGlobalToggles(prev => ({ ...prev, [key]: value }))
      setPersonalOverrides(prev => {
        if (!(key in prev)) return prev
        const next = { ...prev }
        delete next[key]
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
        } catch {}
        return next
      })
      try {
        const res = await fetch('/api/feature-toggles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ key, visible: value }),
        })
        if (!res.ok) throw new Error('Failed to save')
      } catch (err) {
        console.error(err)
        setGlobalToggles(prev => ({ ...prev, [key]: !value })) // revert on failure
      }
      return
    }

    // Just me: this browser only.
    setPersonalOverrides(prev => {
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

  const visibleFeatures = FEATURES.filter(f => isVisible(f.key))

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
          <Dialog.Content maxWidth="460px">
            <Dialog.Title>Features</Dialog.Title>
            <Dialog.Description size="2" mb="4">
              Choose which utilities show on the home page — for just this browser, or for every visitor.
            </Dialog.Description>
            <Flex direction="column" gap="4">
              {FEATURES.map(({ key, label }) => (
                <Flex key={key} justify="between" align="center" gap="3" wrap="wrap">
                  <Text size="2" className="flex-1">
                    {label}
                  </Text>
                  <SegmentedControl.Root
                    size="1"
                    value={scopeByKey[key]}
                    onValueChange={value =>
                      setScopeByKey(prev => ({ ...prev, [key]: value as Scope }))
                    }
                  >
                    <SegmentedControl.Item value="me">Just me</SegmentedControl.Item>
                    <SegmentedControl.Item value="everyone">Everyone</SegmentedControl.Item>
                  </SegmentedControl.Root>
                  <Switch checked={isVisible(key)} onCheckedChange={value => setToggle(key, value)} />
                </Flex>
              ))}
            </Flex>
          </Dialog.Content>
        </Dialog.Root>
      )}
    </>
  )
}
