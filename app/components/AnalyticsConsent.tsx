'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'

const GA_MEASUREMENT_ID = 'G-VXMNGDLCJV'

type Consent = 'accepted' | 'rejected' | null

export default function AnalyticsConsent() {
  const [consent, setConsent] = useState<Consent>(null)
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('analytics_consent') as Consent
    setConsent(stored)
    if (!stored) setShowBanner(true)

    const openHandler = () => setShowBanner(true)
    window.addEventListener('open-cookie-consent', openHandler)

    return () => window.removeEventListener('open-cookie-consent', openHandler)
  }, [])

  const acceptAnalytics = () => {
    localStorage.setItem('analytics_consent', 'accepted')
    setConsent('accepted')
    setShowBanner(false)

    window.gtag?.('consent', 'update', {
      analytics_storage: 'granted',
    })
  }

  const rejectAnalytics = () => {
    localStorage.setItem('analytics_consent', 'rejected')
    setConsent('rejected')
    setShowBanner(false)

    // Disable analytics immediately
    window.gtag?.('consent', 'update', {
      analytics_storage: 'denied',
    })

    // Stop future hits
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(window as any)[`ga-disable-${GA_MEASUREMENT_ID}`] = true
  }

  return (
    <>
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
              gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}

      {showBanner && (
        <div style={styles.banner}>
          <p style={styles.text}>
            We use analytics cookies to improve the site. You can change this anytime.
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
    zIndex: 1000,
  },
  text: { marginBottom: '0.5rem' },
  buttons: { display: 'flex', gap: '0.5rem' },
  accept: { background: '#4ade80', padding: '0.5rem 1rem' },
  reject: { background: '#ef4444', padding: '0.5rem 1rem' },
}
