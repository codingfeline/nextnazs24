import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import JournalForm from '../../_components/JournalForm'

interface Props {
  params: Promise<{ id: string }>
}

const EditJournal = async ({ params }: Props) => {
  const journal = await prisma.journals.findUnique({
    where: { id: (await params).id },
  })

  if (!journal) notFound()

  return <JournalForm journal={journal} />
}

export default EditJournal
