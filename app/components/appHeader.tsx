'use client'

import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes'
import classnames from 'classnames'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaLaptopCode } from 'react-icons/fa6'

const AppHeader = () => {
  return (
    <nav className="borber-b  px-5  bg-[#AAC3F7] justify-between py-3">
      <Container>
        <Flex justify="between">
          <Flex justify="between" gapX="3">
            <Link href="/">
              <FaLaptopCode size="24px" />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  )
}

const NavLinks = () => {
  const { status, data: session } = useSession()
  const currentPath = usePathname()

  const colourLink = (link: string) =>
    classnames({
      'text-zinc-900': link === currentPath,
      'text-zinc-500': link !== currentPath,
      'hover:text-zinc-800 transition-colors': true,
    })

  const links = [
    { label: 'home', url: '/' },
    { label: 'Journals', url: '/journals' },
  ]

  return (
    <Flex align="center" gap="3">
      {links.map(link => (
        <Link className={colourLink(link.url)} href={link.url} key={link.url}>
          {link.label}
        </Link>
      ))}
      {/* {status === 'authenticated' && session.user!.email! === 'post@nazs.net' && (
        <Link href="/Enquiries" className={colourLink('/Enquiries')}>
          Enquiries
        </Link>
      )} */}
    </Flex>
  )
}

const AuthStatus = () => {
  const { status, data: session } = useSession()

  if (status === 'loading') return null

  if (status === 'unauthenticated')
    return (
      <Link className="" href="/api/auth/signin">
        SignIn
      </Link>
    )

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session!.user!.image!}
            fallback="?"
            size="2"
            radius="full"
            className="cursor-pointer"
          />
          {/* <p>test</p> */}
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size="2">{session!.user!.email!}</Text>
            {/* <p>fdff</p> */}
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href="/api/auth/signout">Sign Out</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  )
}

export default AppHeader
