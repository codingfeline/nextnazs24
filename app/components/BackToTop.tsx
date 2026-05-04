'use client'

import { useEffect, useState } from 'react'
import { ArrowUp } from '.'

const BackToTop = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 0)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 bg-blue-100 text-blue-800 hover:bg-blue-200 border border-blue-200 rounded-full p-3 shadow-md transition-colors z-50"
      aria-label="Back to top"
    >
      <ArrowUp size={20} />
    </button>
  )
}

export default BackToTop
