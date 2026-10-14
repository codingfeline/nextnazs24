import { requireAdminPage } from '@/app/lib/authGuard'
import { Flex, Heading } from '@radix-ui/themes'
import Link from 'next/link'
import { ReactNode } from 'react'
import MainPage from '../components/MainPage'

const adminLinks = [{ label: 'Access log', url: '/admin/access-log' }]

//? Layouts don't re-render on client navigation between child pages, so every
//? admin page must also call requireAdminPage itself. This guard is the outer layer.
const AdminLayout = async ({ children }: { children: ReactNode }) => {
  await requireAdminPage('/admin')

  return (
    <MainPage>
      <Flex align="center" gap="4" mb="4" wrap="wrap">
        <Heading size="6">Admin</Heading>
        {adminLinks.map(link => (
          <Link key={link.url} href={link.url} className="underline-offset-4 hover:underline">
            {link.label}
          </Link>
        ))}
      </Flex>
      {children}
    </MainPage>
  )
}

export default AdminLayout
