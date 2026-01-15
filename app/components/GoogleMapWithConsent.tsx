// components/GoogleMapWithConsent.tsx
'use client'

import { useCookieConsent } from '@/providers/CookieConsentProvider'

export default function GoogleMapWithConsent() {
  const { consent, updateConsent } = useCookieConsent()

  if (!consent.externalMedia) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <p>Google Maps is disabled. Loading it may transfer personal data to Google.</p>
        <button onClick={() => updateConsent({ externalMedia: true })}>Load map</button>
      </div>
    )
  }

  return (
    <iframe
      src="https://www.google.com/maps/embed?pb=YOUR_EMBED_URL"
      width="100%"
      height="450"
      loading="lazy"
      style={{ border: 0 }}
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
    />
  )
}
