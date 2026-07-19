import { Container } from '@radix-ui/themes'
import BalloonToggle from './BalloonToggle'
import Link from './Link'
// import ManageCookiesButton from './ManageCookiesButton'
import CookieConsentManager from './CookieConsentManager'

const AppFooter = () => {
  const year = new Date().getFullYear().toString()
  return (
    <footer className="theme-surface footer">
      <Container>
        <div className="flex justify-between">
          {/* <div> */}
          <Link href="/">{year} Utilities and such... </Link>
          {/* </div> */}
          {/* <div>Terms and conditions</div> */}
          {/* <ManageCookiesButton /> */}
          <div className="flex sm:gap-4 flex-col sm:flex-row items-center">
            <Link href="/contact">Contact</Link>
            <Link href="/journals">Those Journals</Link>
            <CookieConsentManager />
            <BalloonToggle />
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default AppFooter
