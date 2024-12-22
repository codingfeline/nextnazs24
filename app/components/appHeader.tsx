'use client'

import { Container, Flex } from '@radix-ui/themes'
import classnames from 'classnames'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { GiSittingDog } from 'react-icons/gi'

const AppHeader = () => {
  const currentPath = usePathname()
  const { status, data: session } = useSession()
  // const status = true

  const links = [
    { label: 'home', url: '/' },
    { label: 'Journals', url: '/journals' },
    // { label: 'New Journal', url: '/journals/new' },
    // { label: 'others', url: '/others' },
    // { label: 'contact', url: '/contact' },
  ]

  return (
    <nav className="borber-b mb-5 px-5  bg-gray-50 justify-between py-3">
      <Container>
        {/* <nav className="flex w-full  bg-gray-200 justify-between h-[40px]"> */}
        {/* <div className="flex justify-between items-center bg-red-50 space-x-6 "> */}
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <GiSittingDog size="24px" />
            </Link>
            {links.map(link => (
              <Link
                // className={`${
                //   link.url === currentPath ? 'text-zinc-900' : 'text-zinc-500'
                // }`}
                className={classnames({
                  'text-zinc-900': link.url === currentPath,
                  'text-zinc-500': link.url !== currentPath,
                  'hover:text-zinc-800 transition-colors': true,
                })}
                href={link.url}
                key={link.url}
              >
                {link.label}
              </Link>
            ))}
          </Flex>
          <Flex justify="between" gapX="3">
            {status === 'unauthenticated' ? (
              <Link className="" href="/api/auth/signin">
                SignIn
              </Link>
            ) : (
              <Link href="/api/auth/signout">SignOut [{session?.user?.name}]</Link>
            )}
            <Link className="" href="#">
              Another
            </Link>
          </Flex>
        </Flex>
      </Container>
      {/* <div className="flex justify-between items-center bg-red-50 w-1/4 ">
      </div> */}
    </nav>
  )
}

export default AppHeader
