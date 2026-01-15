import { CookieConsentProvider } from '@/providers/CookieConsentProvider'
import { Theme } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import AnalyticsConsent from './components/AnalyticsConsent'
import AppFooter from './components/appFooter'
import AppHeader from './components/appHeader'
import BottomLogo from './components/bottomLogo'
import ClientProviders from './components/ClientProviders'
import './globals.css'
import QueryClientProvider from './QueryClientProvider'
import './theme-config.css'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})

// const dancing = Dancing_Script({
//   subsets: ['latin'],
//   weight: ['400', '700'],
//   variable: '--font-dancing',
//   display: 'swap',
// })
// const dosis = Dosis({
//   subsets: ['latin'],
//   weight: ['400', '700'],
//   variable: '--font-dosis',
//   display: 'swap',
// })

// const agdasima = Agdasima({
//   subsets: ['latin'],
//   weight: ['400', '700'],
//   variable: '--font-agdasima',
// })

export const metadata: Metadata = {
  title: 'NextNazs',
  description: 'Web Journals',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon-32x32.png" sizes="any" />
      <body className={geistSans.className}>
        <QueryClientProvider>
          <ClientProviders>
            <CookieConsentProvider>
              <Theme accentColor="blue" className="mb-auto flex flex-col ">
                <AppHeader />
                {children}
                <AnalyticsConsent />
                <BottomLogo />
                <AppFooter />
              </Theme>
            </CookieConsentProvider>
          </ClientProviders>
        </QueryClientProvider>
      </body>
    </html>
  )
}
