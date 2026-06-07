'use client'

import { DEV_NO_AUTH } from '@/app/lib/devSession'
import { useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import JournalFormSkeleton from './loading'

const JournalForm = dynamic(() => import('@/app/journals/_components/JournalForm'), {
  ssr: false,
  loading: () => <JournalFormSkeleton />,
})

const NewJournalPage = () => {
  const { data: session } = useSession()
  const router = useRouter()
  if (!session && !DEV_NO_AUTH) router.push('/')

  return (
    <main className="grow bg_journals">
      <JournalForm />
    </main>
  )
}

export default NewJournalPage
