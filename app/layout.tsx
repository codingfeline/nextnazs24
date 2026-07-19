import { CookieConsentProvider } from '@/providers/CookieConsentProvider'
import '@radix-ui/themes/styles.css'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import AppFooter from './components/appFooter'
import AppHeader from './components/appHeader'
import Balloons from './components/Balloons'
import BottomLogo from './components/bottomLogo'
import ClientProviders from './components/ClientProviders'
import ThemedRoot from './components/ThemedRoot'
import './globals.css'
import MyFancyLogComp from './hooks/MyFancyLogComp'
import QueryClientProvider from './QueryClientProvider'
import SignInShortcut from './components/SignInShortcut'
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
  title: {
    default: 'NazsNet',
    template: '%s | NazsNet',
  },
  description:
    'NazsNet — a personal site with browser-based utilities (word unscrambler, case converter, password generator), an interactive JavaScript playground, and dev journals.',
  keywords: [
    'NazsNet', 'javascript tools', 'word unscrambler', 'password generator',
    'case converter', 'js playground', 'dev journals', 'web utilities',
  ],
  openGraph: {
    siteName: 'NazsNet',
    type: 'website',
  },
  icons: { icon: '/favicon-32x32.png' },
  other: { 'google-adsense-account': 'ca-pub-8140259375048003' },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={geistSans.className}>
        <QueryClientProvider>
          <ClientProviders>
            <CookieConsentProvider>
              <ThemedRoot className="mb-auto flex flex-col ">
                <AppHeader />
                <SignInShortcut />
                {children}
                {/* <AnalyticsConsent /> */}
                <BottomLogo />
                <MyFancyLogComp
                  txt="NazsNet aka CodingPaws"
                  back="#531bad"
                  colour="#fff"
                />
                <Balloons />
                <AppFooter />
              </ThemedRoot>
            </CookieConsentProvider>
          </ClientProviders>
        </QueryClientProvider>
      </body>
    </html>
  )
}
