import { Container } from '@radix-ui/themes'
import Link from 'next/link'
// import ManageCookiesButton from './ManageCookiesButton'
import CookieConsentManager from './CookieConsentManager'

const AppFooter = () => {
  const year = new Date().getFullYear().toString()
  return (
    <footer className=" bg-gray-200 footer">
      <Container>
        <div className="flex justify-between">
          {/* <div> */}
          <Link href="/"> {year} Nazsnet </Link>
          {/* </div> */}
          {/* <div>Terms and conditions</div> */}
          {/* <ManageCookiesButton /> */}
          <CookieConsentManager />
        </div>
      </Container>
    </footer>
  )
}

export default AppFooter
