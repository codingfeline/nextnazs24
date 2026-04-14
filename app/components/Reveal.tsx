'use client'

import { useIntersectionObserver } from './useIntersectionObserver'

interface RevealProps {
  children: React.ReactNode
  delay?: number
  direction?: 'up' | 'left' | 'right'
  distance?: number
}

export default function Reveal({
  children,
  delay = 0,
  direction = 'up',
  distance,
}: RevealProps) {
  const directionClasses = {
    // up: `translate-y-${distance}`,
    // left: `-translate-x-${distance}`,
    // right: `translate-x-${distance}`,
    up: `translate-y-3`,
    left: `-translate-x-3`,
    right: `translate-x-3`,
  }

  const startClass = directionClasses[direction]

  // Use our custom hook!
  const ref = useIntersectionObserver({ directionClass: startClass })

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out opacity-0 ${startClass}`}
    >
      {children}
    </div>
  )
}
