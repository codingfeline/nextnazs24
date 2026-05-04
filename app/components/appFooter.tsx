import { Container } from '@radix-ui/themes'
import Link from './Link'
// import ManageCookiesButton from './ManageCookiesButton'
import CookieConsentManager from './CookieConsentManager'

const AppFooter = () => {
  const year = new Date().getFullYear().toString()
  return (
    <footer className=" bg-gray-200 footer">
      <Container>
        <div className="flex justify-between">
          {/* <div> */}
          <Link href="/">{year} Nazsnet </Link>
          {/* </div> */}
          {/* <div>Terms and conditions</div> */}
          {/* <ManageCookiesButton /> */}
          <div className="flex sm:gap-4 flex-col sm:flex-row">
            <Link href="/contact">Contact</Link>
            <Link href="/journals">Those Journals</Link>
            <CookieConsentManager />
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default AppFooter
