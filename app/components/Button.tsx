'use client'

import { Button } from '@radix-ui/themes'
import Link from 'next/link'

interface Prop {
  url: string
  label: string
}

const MyButton = ({ url, label }: Prop) => {
  return (
    <Button asChild>
      <Link href={`${url}`}>{label}</Link>
    </Button>
  )
}

export default MyButton
