// components/CookieSettingsModal.tsx
'use client'

import { useCookieConsent } from '@/providers/CookieConsentProvider'
import { useState } from 'react'

export default function CookieSettingsModal() {
  const { consent, updateConsent } = useCookieConsent()
  const [show, setShow] = useState(false)

  const toggleModal = () => setShow(!show)

  const handleRevokeAll = () => {
    updateConsent({ analytics: false, externalMedia: false })
  }

  return (
    <>
      {/* Button anywhere to open modal */}
      <button onClick={toggleModal} style={{ textDecoration: 'underline' }}>
        Manage cookies
      </button>

      {show && (
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
              <button onClick={handleRevokeAll} style={styles.revoke}>
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
