'use client'

import { useIntersectionObserver } from './useIntersectionObserver'

interface RevealProps {
  children: React.ReactNode
  delay?: number
  direction?: 'up' | 'left' | 'right'
  distance?: 3 | 5 | 10
}

export default function Reveal({
  children,
  delay = 0,
  direction = 'up',
  distance = 10,
}: RevealProps) {
  const directionClasses = {
    up: `translate-y-${distance}`,
    left: `-translate-x-${distance}`,
    right: `translate-x-${distance}`,
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
