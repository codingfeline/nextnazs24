import prisma from '@/prisma/client'
import parse from 'html-react-parser'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ id: string }> // * making this a Promise to await below (await params)
}

const IssueDetailPage = async ({ params }: Props) => {
  // const params = await Props.params
  const journal = await prisma.journals.findUnique({
    where: { id: (await params).id }, // * await to prevent error at the bottom
  })

  if (!journal) notFound()

  return (
    <div>
      <p>{journal.topic}</p>
      <div>{parse(journal.comment)}</div>
      <p>{journal.date.toDateString()}</p>
    </div>
  )
}

export default IssueDetailPage

//Error: Route "/journals/[id]" used `params.id`. `params` should be awaited before using its properties
