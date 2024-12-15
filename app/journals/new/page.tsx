'use client'

import dynamic from 'next/dynamic'
import JournalFormSkeleton from './loading'

const JournalForm = dynamic(() => import('@/app/journals/_components/JournalForm'), {
  ssr: false,
  loading: () => <JournalFormSkeleton />,
})

const NewJournalPage = () => {
  return <JournalForm />
}

export default NewJournalPage
