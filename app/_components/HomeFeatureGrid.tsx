'use client'

import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SortableContext, arrayMove, rectSortingStrategy, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Dialog, Flex, SegmentedControl, Switch, Text } from '@radix-ui/themes'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { RxDragHandleDots2 } from 'react-icons/rx'
import ChangeCaseContainer from '../jsPlayground/_containers/ChangeCaseContainer'
import CrossMultiplicationContainer from '../jsPlayground/_containers/CrossMultiplicationContainer'
import DatePlusMinusContainer from '../jsPlayground/_containers/DatePlusMinusContainer'
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
  { key: 'datePlusMinus', label: 'Date +/- Days', Component: DatePlusMinusContainer },
  { key: 'time', label: 'Time', Component: TimeConverterContainer },
  { key: 'quickBudget', label: 'Quick Budget', Component: QuickBudgetContainer },
  { key: 'crossMultiplication', label: 'Cross-Multiplication', Component: CrossMultiplicationContainer },
]

type ToggleMap = Partial<Record<FeatureKey, boolean>>
type Scope = 'me' | 'everyone'

const STORAGE_KEY = 'homeFeatureToggles'
const ORDER_STORAGE_KEY = 'homeFeatureOrder'
const DEFAULT_ORDER = FEATURES.map(f => f.key)

// Reorders only the currently-visible keys within the full order, so hidden
// features keep their relative slot instead of being dragged along.
const reorderVisible = (
  fullOrder: FeatureKey[],
  visibleKeys: FeatureKey[],
  activeId: FeatureKey,
  overId: FeatureKey
) => {
  const oldIndex = visibleKeys.indexOf(activeId)
  const newIndex = visibleKeys.indexOf(overId)
  if (oldIndex === -1 || newIndex === -1) return fullOrder
  const reordered = arrayMove(visibleKeys, oldIndex, newIndex)
  let i = 0
  return fullOrder.map(key => (visibleKeys.includes(key) ? reordered[i++] : key))
}

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
  const [order, setOrder] = useState<FeatureKey[]>(DEFAULT_ORDER)

  // Load this admin's personal (this-browser-only) overrides once the client mounts.
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      setPersonalOverrides(prev => ({ ...prev, ...saved }))
    } catch {}
  }, [])

  // Load this browser's saved card order. Unknown keys are dropped and any
  // features missing from a stale save are appended at the end.
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(ORDER_STORAGE_KEY) || '[]') as FeatureKey[]
      const known = saved.filter(key => DEFAULT_ORDER.includes(key))
      const missing = DEFAULT_ORDER.filter(key => !known.includes(key))
      if (known.length) setOrder([...known, ...missing])
    } catch {}
  }, [])

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }))

  const isVisible = (key: FeatureKey) => personalOverrides[key] ?? globalToggles[key] ?? true

  const featuresByKey = Object.fromEntries(FEATURES.map(f => [f.key, f])) as Record<
    FeatureKey,
    (typeof FEATURES)[number]
  >
  const visibleFeatures = order.map(key => featuresByKey[key]).filter(f => isVisible(f.key))

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const visibleKeys = visibleFeatures.map(f => f.key)
    setOrder(prev => {
      const next = reorderVisible(prev, visibleKeys, active.id as FeatureKey, over.id as FeatureKey)
      try {
        localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(next))
      } catch {}
      return next
    })
  }

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

  return (
    <>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={visibleFeatures.map(f => f.key)} strategy={rectSortingStrategy}>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 lg:gap-6 mt-3 p-2 [&_.MyContainer]:mt-0">
            {visibleFeatures.map(({ key, Component }) => (
              <SortableFeature key={key} id={key}>
                <Component />
              </SortableFeature>
            ))}
          </div>
        </SortableContext>
      </DndContext>

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

function SortableFeature({ id, children }: { id: FeatureKey; children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 10 : undefined,
      }}
      className="break-inside-avoid mb-3 lg:mb-6 relative"
    >
      <button
        {...attributes}
        {...listeners}
        type="button"
        aria-label="Drag to reorder"
        className="absolute top-2 right-2 z-10 cursor-grab active:cursor-grabbing touch-none rounded opacity-70 hover:opacity-100"
        style={{ color: 'var(--theme-primary-contrast)' }}
      >
        <RxDragHandleDots2 size={18} />
      </button>
      {children}
    </div>
  )
}
