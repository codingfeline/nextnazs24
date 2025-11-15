'use client'

import { useEffect } from 'react'
import { useCookieConsent } from './CookieConsentContext'

const CookiesAccepted = () => {
  const { accepted } = useCookieConsent()

  useEffect(() => {
    if (accepted) {
      console.log('cookie accepted', accepted)
      // const script = document.createElement('script');
      // script.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX';
      // script.async = true;
      // document.head.appendChild(script);

      // window.dataLayer = window.dataLayer || [];
      // function gtag(...args: any[]) {
      //   window.dataLayer.push(args);
      // }
      // gtag('js', new Date());
      // gtag('config', 'G-XXXXXXX');
    }
  }, [accepted])

  return null
}

export default CookiesAccepted
