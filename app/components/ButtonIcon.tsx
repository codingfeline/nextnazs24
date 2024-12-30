import { Button, IconProps } from '@radix-ui/themes'
import Link from 'next/link'
import { ComponentType, ReactNode } from 'react'

interface Prop {
  href: string
  Icon?: ComponentType<IconProps>
  children: ReactNode
  full?: boolean
}

const ButtonIcon = ({ href, Icon, children, full }: Prop) => {
  return (
    <div>
      <Link href={href}>
        <Button className={`my-1 cursor-pointer mr-1 ${full} ? 'w-full' :''`}>
          <div className="flex items-center gap-2">
            {Icon && <Icon />} {children}
          </div>
        </Button>
      </Link>
    </div>
  )
}

export default ButtonIcon
