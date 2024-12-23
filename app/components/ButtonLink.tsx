import { Button, IconProps } from '@radix-ui/themes'
import Link from 'next/link'
import { ComponentType, ReactNode } from 'react'

interface Prop {
  href: string
  Icon?: ComponentType<IconProps>
  children: ReactNode
}

const ButtonWithComponent = ({ href, Icon, children }: Prop) => {
  return (
    <Link href={href}>
      <Button className="my-1 cursor-pointer mr-1">
        <div className="flex items-center gap-1">
          {Icon && <Icon />} {children}
        </div>
      </Button>
    </Link>
  )
}

export default ButtonWithComponent
