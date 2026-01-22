import { Button, IconProps } from '@radix-ui/themes'
import Link from 'next/link'
import { ComponentType, ReactNode } from 'react'

interface Prop {
  href: string
  Icon?: ComponentType<IconProps>
  children: ReactNode
  full?: boolean
  margin?: string
}

const ButtonWithComponent = async ({ href, Icon, children, full, margin }: Prop) => {
  // const session = await getServerSession(authOptions)
  // if (!session) return null
  // if (session!.user!.email !== 'post@nazs.net') return null

  return (
    <div>
      <Link href={href}>
        <Button className={`my-1 cursor-pointer ${full} ? 'w-full' :'' ${margin}`}>
          <div className="flex items-center gap-2">
            {Icon && <Icon />} {children}
          </div>
        </Button>
      </Link>
    </div>
  )
}

export default ButtonWithComponent
