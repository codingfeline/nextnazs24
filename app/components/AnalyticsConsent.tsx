'use client'

import { useCookieConsent } from '@/providers/CookieConsentProvider'
import Script from 'next/script'

const GA_ID = 'G-VXMNGDLCJV'

export default function AnalyticsConsent() {
  const { consent } = useCookieConsent()

  if (!consent.analytics) return null

  return (
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
  )
}
