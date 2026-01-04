'use client'

import MyButton from '@/app/components/Button'
import { useSession } from 'next-auth/react'

const JournalActions = () => {
  const { data: session } = useSession()

  if (!session) return null

  return (
    <div className="mb-2">
      <MyButton url="/journals/new" label="New Journal"></MyButton>
    </div>
  )
}

export default JournalActions
