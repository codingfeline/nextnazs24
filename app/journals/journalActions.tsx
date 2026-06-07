'use client'

import MyButton from '@/app/components/Button'
import { DEV_NO_AUTH } from '@/app/lib/devSession'
import { useSession } from 'next-auth/react'

const JournalActions = () => {
  const { data: session } = useSession()

  if (!session && !DEV_NO_AUTH) return null

  return (
    <div className="mb-2">
      <MyButton url="/journals/new" label="New Journal"></MyButton>
    </div>
  )
}

export default JournalActions
