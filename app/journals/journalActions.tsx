'use client'

import { Button } from '@radix-ui/themes'
import Link from 'next/link'

const JournalActions = () => {
  return (
    <div className="mb-2">
      <Button asChild>
        <Link href="/journals/new">New Journal</Link>
      </Button>
    </div>
  )
}

export default JournalActions
