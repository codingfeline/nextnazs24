// components/GoogleMapWithConsent.tsx
'use client'

import { useCookieConsent } from '@/providers/CookieConsentProvider'

export default function GoogleMapWithConsent({ src }: { src: string }) {
  const { consent } = useCookieConsent()

  if (!consent.externalMedia) {
    return (
      <div
        style={{
          background: '#f3f4f6',
          padding: '2rem',
          textAlign: 'center',
          borderRadius: 8,
        }}
      >
        <p>This map is disabled because you have not accepted external media.</p>
      </div>
    )
  }

  return (
    <iframe
      src={src}
      width="100%"
      height="400"
      style={{ border: 0 }}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
    />
  )
}
