import { Button, IconProps } from '@radix-ui/themes'
import { Role } from '@prisma/client'
import Link from 'next/link'
import { ComponentType, ReactNode } from 'react'
import { getSession } from '../lib/authGuard'

interface Prop {
  href: string
  Icon?: ComponentType<IconProps>
  children: ReactNode
  full?: boolean
  classes?: string
}

const ButtonWithComponent = async ({ href, Icon, children, full, classes }: Prop) => {
  const session = await getSession()
  if (process.env.NODE_ENV !== 'development') {
    if (!session) return null
    if (session.user?.role !== Role.ADMIN) return null
  }

  return (
    <div>
      <Link href={href}>
        <Button className={`my-2 cursor-pointer mr-1 ${full ? 'w-full' : ''} ${classes}`}>
          <div className="flex items-center gap-2">
            {Icon && <Icon />} {children}
          </div>
        </Button>
      </Link>
    </div>
  )
}

export default ButtonWithComponent
