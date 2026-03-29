import { Button, IconProps } from '@radix-ui/themes'
import Link from 'next/link'
import { ComponentType, ReactNode } from 'react'
import { auth } from '../api/auth/[...nextauth]/authOptions'

interface Prop {
  href: string
  Icon?: ComponentType<IconProps>
  children: ReactNode
  full?: boolean
  classes?: string
}

const ButtonWithComponent = async ({ href, Icon, children, full, classes }: Prop) => {
  console.log(process.env.NODE_ENV)
  const session = await auth()
  // if (!session) return null
  // if (session!.user!.email !== 'post@nazs.net') return null
  if (process.env.NODE_ENV !== 'development') {
    if (!session) return null
    if (session!.user!.email !== 'post@nazs.net') return null
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
