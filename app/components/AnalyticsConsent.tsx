// app/components/AnalyticsConsent.tsx
'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'

const GA_MEASUREMENT_ID = 'G-VXMNGDLCJV' // <-- replace with your GA4 ID

type Consent = 'accepted' | 'rejected' | null

export default function AnalyticsConsent() {
  const [consent, setConsent] = useState<Consent>(null)
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const storedConsent = localStorage.getItem('analytics_consent') as Consent
    if (storedConsent) {
      setConsent(storedConsent)
    } else {
      setShowBanner(true)
    }
  }, [])

  const acceptAnalytics = () => {
    localStorage.setItem('analytics_consent', 'accepted')
    setConsent('accepted')
    setShowBanner(false)
  }

  const rejectAnalytics = () => {
    localStorage.setItem('analytics_consent', 'rejected')
    setConsent('rejected')
    setShowBanner(false)
  }

  return (
    <>
      {/* Load Google Analytics ONLY if accepted */}
      {consent === 'accepted' && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', {
                anonymize_ip: true
              });
            `}
          </Script>
        </>
      )}

      {/* Consent Banner */}
      {showBanner && (
        <div style={styles.banner}>
          <p style={styles.text}>
            We use cookies to analyze traffic and improve your experience.
          </p>
          <div style={styles.buttons}>
            <button onClick={acceptAnalytics} style={styles.accept}>
              Accept
            </button>
            <button onClick={rejectAnalytics} style={styles.reject}>
              Reject
            </button>
          </div>
        </div>
      )}
    </>
  )
}

const styles: Record<string, React.CSSProperties> = {
  banner: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    background: '#111',
    color: '#fff',
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1000,
    flexWrap: 'wrap',
  },
  text: {
    margin: 0,
    fontSize: '0.9rem',
  },
  buttons: {
    display: 'flex',
    gap: '0.5rem',
  },
  accept: {
    background: '#4ade80',
    color: '#000',
    border: 'none',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
  },
  reject: {
    background: '#ef4444',
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
  },
}
