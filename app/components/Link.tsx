import { Link as RadixLink } from '@radix-ui/themes'
import NextLink from 'next/link'

interface Props {
  href?: string
  children: React.ReactNode
  onClick?: () => void
}

const Link = ({ href, children, onClick }: Props) => {
  if (href) {
    return (
      <RadixLink asChild onClick={onClick}>
        <NextLink href={href}>{children}</NextLink>
      </RadixLink>
    )
  }
  return <RadixLink onClick={onClick} style={{ cursor: 'pointer' }}>{children}</RadixLink>
}

export default Link

// * this component allows the use of Radix Link while maintaining client side navigation using Next Link
