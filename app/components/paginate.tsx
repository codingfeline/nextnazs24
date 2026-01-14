'use client'

import { useEffect, useRef, useState } from 'react'

const TOTAL_ITEMS = 200
const ITEM_HEIGHT = 72 // px (approx height incl margin)

// Mock data
const allItems = Array.from({ length: TOTAL_ITEMS }, (_, i) => ({
  id: i + 1,
  text: `Item #${i + 1}`,
}))

export default function Page() {
  const [pageSize, setPageSize] = useState(10)
  const [visibleCount, setVisibleCount] = useState(10)
  const loaderRef = useRef<HTMLDivElement | null>(null)

  // Calculate page size based on viewport
  useEffect(() => {
    const calculatePageSize = () => {
      const viewportHeight = window.innerHeight
      const itemsPerScreen = Math.floor(viewportHeight / ITEM_HEIGHT)

      // Add a buffer so scrolling feels natural
      const dynamicSize = Math.max(itemsPerScreen * 2, 10)

      setPageSize(dynamicSize)
      setVisibleCount(dynamicSize)
    }

    calculatePageSize()
    window.addEventListener('resize', calculatePageSize)

    return () => window.removeEventListener('resize', calculatePageSize)
  }, [])

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount(prev => Math.min(prev + pageSize, TOTAL_ITEMS))
        }
      },
      { threshold: 0.2 }
    )

    if (loaderRef.current) observer.observe(loaderRef.current)
    return () => observer.disconnect()
  }, [pageSize])

  return (
    <main style={styles.page}>
      <h1 style={styles.title}>Dynamic Infinite Scroll</h1>

      <ul style={styles.list}>
        {allItems.slice(0, visibleCount).map(item => (
          <li key={item.id} className="fly-in-item" style={styles.item}>
            {item.text}
          </li>
        ))}
      </ul>

      {visibleCount < TOTAL_ITEMS && (
        <div ref={loaderRef} style={styles.loader}>
          Loading more…
        </div>
      )}

      <style jsx>{`
        .fly-in-item {
          opacity: 0;
          transform: translateY(120px);
          animation: flyIn 0.45s ease-out forwards;
        }

        @keyframes flyIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    padding: '2rem',
    maxWidth: '600px',
    margin: '0 auto',
  },
  title: {
    marginBottom: '1.5rem',
    textAlign: 'center',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  item: {
    background: '#f4f4f5',
    marginBottom: '0.75rem',
    padding: '1rem',
    borderRadius: '8px',
    fontSize: '1rem',
    height: '56px',
    display: 'flex',
    alignItems: 'center',
  },
  loader: {
    textAlign: 'center',
    padding: '1.5rem',
    color: '#666',
  },
}
