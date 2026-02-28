'use client'

import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes'
import classnames from 'classnames'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { FaLaptopCode } from 'react-icons/fa6'

const AppHeader = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="borber-b  px-0  bg-gray-200 justify-between py-0">
      <Container>
        <Flex justify="between">
          <Flex
            justify="between"
            gapX="0"
            align="center"
            width={{ initial: '100%', sm: 'auto' }}
            display="flex"
            direction={{ initial: 'column', sm: 'row' }}
          >
            <Link
              href="#"
              onClick={() => setIsOpen(!isOpen)}
              className="w-full flex justify-center  p-2"
            >
              <FaLaptopCode size="24px" />
            </Link>
            <NavLinks isOpen={isOpen} setIsOpen={setIsOpen} />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  )
}

interface OpenProp {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}

const NavLinks = ({ isOpen, setIsOpen }: OpenProp) => {
  const currentPath = usePathname()

  const colourLink = (link: string) =>
    classnames({
      'text-zinc-900 bg-gray-300 ': link === currentPath,
      'text-zinc-500 ': link !== currentPath,
      'hover:text-zinc-800 transition-colors  p-2 w-full flex justify-center  md:w-max ': true,
    })

  const links = [
    { label: 'home', url: '/' },
    { label: 'Journals', url: '/journals' },
    { label: 'Password', url: '/password' },
    { label: 'Contact', url: '/contact' },
    { label: 'JS Playground', url: '/jsPlayground' },
  ]

  const isVertical = true

  return (
    <Flex
      align="center"
      justify="center"
      gap="0"
      p="0"
      width="100%"
      direction={{ initial: 'column', sm: 'row' }}
      display={{ initial: isOpen ? 'flex' : 'none', sm: 'flex' }}
      // display={isVertical && isOpen ? 'flex' : 'none'}
    >
      {links.map(link => (
        <Link
          className={colourLink(link.url)}
          href={link.url}
          key={link.url}
          onClick={() => setIsOpen(false)}
        >
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

  if (status === 'unauthenticated') return null
  // return (
  //   <Link className="" href="/api/auth/signin">
  //     SignIn
  //   </Link>
  // )

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
