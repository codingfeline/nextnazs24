import CookiesAccepted from '@/app/(CookiesPolicy-group)/CookiesPolicy/cookiesAccepted'
import AppFooter from '@/app/components/appFooter'
import AppHeader from '@/app/components/appHeader'
import ClientProviders from '@/app/components/ClientProviders'
import CookiesBanner from '@/app/components/CookiesBanner'
import '@/app/globals.css'
import QueryClientProvider from '@/app/QueryClientProvider'
import '@/app/theme-config.css'
import { Container, Theme } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'
import type { Metadata } from 'next'
import localFont from 'next/font/local'

const geistSans = localFont({
  src: '../../fonts/GeistVF.woff',
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
            <Theme accentColor="blue" className="mb-auto flex flex-col ">
              <AppHeader />
              <main className="grow bg_password bg-gray-800">
                <Container>{children}</Container>
                {/* <Container>{children}</Container> */}
              </main>
              <AppFooter />
              <CookiesBanner />
              <CookiesAccepted />
            </Theme>
          </ClientProviders>
        </QueryClientProvider>
      </body>
    </html>
  )
}
