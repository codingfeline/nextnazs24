'use client'

import { useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import JournalFormSkeleton from './loading'

const JournalForm = dynamic(() => import('@/app/(journals)/_components/JournalForm'), {
  ssr: false,
  loading: () => <JournalFormSkeleton />,
})

const NewJournalPage = () => {
  const { data: session } = useSession()
  const router = useRouter()
  if (!session) router.push('/')

  return <JournalForm />
}

export default NewJournalPage
