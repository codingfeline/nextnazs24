'use client'
import { useCookieConsent } from '@/providers/CookieConsentProvider'
import Script from 'next/script'
import { useEffect, useState } from 'react'

const GA_ID = 'G-VXMNGDLCJV'

export default function CookieConsentManager() {
  const { consent, updateConsent } = useCookieConsent()
  const [showModal, setShowModal] = useState(false)
  const [firstVisit, setFirstVisit] = useState(false)

  // Detect first visit
  useEffect(() => {
    const stored = localStorage.getItem('cookie_consent')
    if (!stored) setFirstVisit(true)
  }, [])

  const acceptAll = () => {
    updateConsent({ analytics: true, externalMedia: true })
    setShowModal(false)
    setFirstVisit(false)
  }

  const rejectAll = () => {
    updateConsent({ analytics: false, externalMedia: false })
    setShowModal(false)
    setFirstVisit(false)
  }

  const toggleModal = () => setShowModal(!showModal)

  return (
    <>
      {/* --- Analytics --- */}
      {consent.analytics && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}

      {/* --- Initial Banner --- */}
      {firstVisit && (
        <div style={bannerStyles.container}>
          <p>We use Google Analytics and external media. Do you accept?</p>
          <div style={bannerStyles.buttons}>
            <button onClick={acceptAll} style={bannerStyles.accept}>
              Accept
            </button>
            <button onClick={rejectAll} style={bannerStyles.reject}>
              Reject
            </button>
          </div>
        </div>
      )}

      {/* --- Manage Cookies Button --- */}
      {!firstVisit && (
        <button onClick={toggleModal} style={{ textDecoration: 'underline' }}>
          Manage cookies
        </button>
      )}

      {/* --- Modal --- */}
      {showModal && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h2>Cookie Preferences</h2>

            <label>
              <input type="checkbox" checked disabled /> Necessary (always)
            </label>

            <label>
              <input
                type="checkbox"
                checked={consent.analytics}
                onChange={e => updateConsent({ analytics: e.target.checked })}
              />
              Analytics
            </label>

            <label>
              <input
                type="checkbox"
                checked={consent.externalMedia}
                onChange={e => updateConsent({ externalMedia: e.target.checked })}
              />
              External media (Google Maps)
            </label>

            <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => updateConsent({ analytics: false, externalMedia: false })}
                style={styles.revoke}
              >
                Revoke all optional cookies
              </button>
              <button onClick={toggleModal} style={styles.close}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

const bannerStyles = {
  container: {
    position: 'fixed' as const,
    bottom: 0,
    left: 0,
    width: '100%',
    background: '#f3f4f6',
    padding: '1rem',
    textAlign: 'center' as const,
    boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
    zIndex: 1001,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    marginTop: '0.5rem',
  },
  accept: {
    background: '#4ade80',
    padding: '0.5rem 1rem',
    border: 'none',
    cursor: 'pointer',
  },
  reject: {
    background: '#ef4444',
    padding: '0.5rem 1rem',
    border: 'none',
    cursor: 'pointer',
  },
}

const styles = {
  overlay: {
    position: 'fixed' as const,
    inset: 0,
    background: 'rgba(0,0,0,0.4)',
    zIndex: 1000,
  },
  modal: {
    background: '#fff',
    padding: '2rem',
    maxWidth: 400,
    margin: '10% auto',
    borderRadius: 8,
  },
  revoke: {
    background: '#ef4444',
    color: '#fff',
    padding: '0.5rem 1rem',
    border: 'none',
    cursor: 'pointer',
  },
  close: {
    background: '#4ade80',
    color: '#fff',
    padding: '0.5rem 1rem',
    border: 'none',
    cursor: 'pointer',
  },
}
