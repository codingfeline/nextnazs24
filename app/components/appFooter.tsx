import { Container } from '@radix-ui/themes'
import Link from './Link'

const AppFooter = () => {
  const year = new Date().getFullYear().toString()
  return (
    <footer className=" bg-red-200 py-6 px-4">
      <Container>
        <div className="flex justify-between">
          <div>
            <Link href="/"> {year} website </Link>
          </div>
          <div>Terms and conditions</div>
        </div>
      </Container>
    </footer>
  )
}

export default AppFooter
