import prisma from '@/prisma/client'
import { Card, Heading } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import ReactMarkDown from 'react-markdown'

interface Props {
  params: Promise<{ id: string }> // * making this a Promise to await below (await params)
}

const IssueDetailPage = async ({ params }: Props) => {
  const journal = await prisma.journals.findUnique({
    where: { id: (await params).id }, // * await to prevent error at the bottom
  })

  if (!journal) notFound()

  return (
    <div className="max-w-xl ">
      <Heading>{journal.topic}</Heading>
      <Card className="prose max-w-xl" mt="4">
        <ReactMarkDown>{journal.comment}</ReactMarkDown>
      </Card>
      <div className="flex justify-end p-1">
        <p>{journal.date.toDateString()}</p>
      </div>
    </div>
  )
}

export default IssueDetailPage

//Error: Route "/journals/[id]" used `params.id`. `params` should be awaited before using its properties
