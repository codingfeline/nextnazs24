'use client'

import { useBalloons } from '@/providers/BalloonsProvider'
import { useEffect, useRef, useState } from 'react'

const COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFEAA7',
  '#DDA0DD', '#FF9F43', '#48DBFB', '#FF9FF3',
  '#54A0FF', '#A29BFE',
]

interface Balloon {
  id: number
  color: string
  size: number
  bottom: number
  duration: number
  delay: number
  bobDuration: number
}

function BalloonSvg({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size * 1.7} viewBox="0 0 40 68" fill="none">
      <ellipse cx="20" cy="19" rx="16" ry="18" fill={color} />
      <ellipse cx="13" cy="11" rx="4" ry="5" fill="white" opacity="0.25" />
      <path d="M20 37 C17 40 23 40 20 37Z" fill={color} />
      <path d="M20 40 C17 48 23 54 20 68" stroke="#bbb" strokeWidth="0.8" fill="none" />
    </svg>
  )
}

function randomDifferentColor(current: string) {
  const others = COLORS.filter(c => c !== current)
  return others[Math.floor(Math.random() * others.length)]
}

export default function Balloons() {
  const { enabled } = useBalloons()
  const [balloons, setBalloons] = useState<Balloon[]>([])
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [hoverColors, setHoverColors] = useState<Record<number, string>>({})
  const [poppingIds, setPoppingIds] = useState<Set<number>>(new Set())
  const nextId = useRef(9)

  useEffect(() => {
    setBalloons(
      Array.from({ length: 9 }, (_, i) => ({
        id: i,
        color: COLORS[i % COLORS.length],
        size: 26 + Math.random() * 20,
        bottom: 8 + Math.random() * 55,
        duration: 28 + Math.random() * 22,
        delay: -(Math.random() * 55),
        bobDuration: 2.5 + Math.random() * 2,
      }))
    )
  }, [])

  const handleEnter = (b: Balloon) => {
    setHoveredId(b.id)
    setHoverColors(prev => ({ ...prev, [b.id]: randomDifferentColor(b.color) }))
  }

  const handleLeave = () => setHoveredId(null)

  const handlePop = (id: number) => {
    setPoppingIds(prev => new Set(prev).add(id))
    setTimeout(() => {
      const newId = nextId.current++
      const popped = balloons.find(b => b.id === id)
      const newBalloon: Balloon = {
        id: newId,
        color: randomDifferentColor(popped?.color ?? COLORS[0]),
        size: 26 + Math.random() * 20,
        bottom: 8 + Math.random() * 55,
        duration: 28 + Math.random() * 22,
        delay: 0,
        bobDuration: 2.5 + Math.random() * 2,
      }
      setBalloons(prev => [...prev.filter(b => b.id !== id), newBalloon])
      setPoppingIds(prev => { const s = new Set(prev); s.delete(id); return s })
    }, 350)
  }

  if (!enabled) return null

  return (
    <>
      <style>{`
        @keyframes floatAcross {
          from { transform: translateX(105vw); }
          to   { transform: translateX(-120px); }
        }
        @keyframes bob {
          0%, 100% { translate: 0 0px; }
          50%       { translate: 0 -14px; }
        }
        @keyframes pop {
          0%   { transform: scale(1);   opacity: 1; }
          40%  { transform: scale(1.5); opacity: 0.9; }
          100% { transform: scale(0);   opacity: 0; }
        }
      `}</style>
      <div className="fixed bottom-0 left-0 w-full z-10" style={{ height: 130, pointerEvents: 'none' }}>
        {balloons.map(b => {
          const color = hoveredId === b.id ? hoverColors[b.id] : b.color
          return (
            <div
              key={b.id}
              onMouseEnter={() => handleEnter(b)}
              onMouseLeave={handleLeave}
              onClick={() => handlePop(b.id)}
              style={{
                position: 'absolute',
                bottom: b.bottom,
                pointerEvents: 'auto',
                cursor: 'pointer',
                animation: poppingIds.has(b.id)
                  ? 'pop 0.35s ease-out forwards'
                  : `floatAcross ${b.duration}s linear ${b.delay}s infinite, bob ${b.bobDuration}s ease-in-out infinite`,
                filter: hoveredId === b.id ? 'brightness(1.15) drop-shadow(0 0 6px currentColor)' : 'none',
              }}
            >
              <BalloonSvg color={color} size={b.size} />
            </div>
          )
        })}
      </div>
    </>
  )
}
