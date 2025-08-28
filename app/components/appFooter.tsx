import { Container } from '@radix-ui/themes'
import Link from 'next/link'

const AppFooter = () => {
  const year = new Date().getFullYear().toString()
  return (
    <footer className=" bg-gray-200 py-6 px-4">
      <Container>
        <div className="flex justify-between">
          {/* <div> */}
          <Link href="/"> {year} Nazsnet </Link>
          {/* </div> */}
          {/* <div>Terms and conditions</div> */}
        </div>
      </Container>
    </footer>
  )
}

export default AppFooter
