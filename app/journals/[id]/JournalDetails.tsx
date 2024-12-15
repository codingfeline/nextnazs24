import { Journals } from '@prisma/client'
import { Card, Heading } from '@radix-ui/themes'
import ReactMarkDown from 'react-markdown'

const JournalDetails = ({ journal }: { journal: Journals }) => {
  return (
    <>
      <Heading>{journal.topic}</Heading>
      <Card className="prose w-full" mt="4">
        <ReactMarkDown>{journal.comment}</ReactMarkDown>
      </Card>
      <div className="flex justify-end p-1">
        <p>{journal.date.toDateString()}</p>
      </div>
    </>
  )
}

export default JournalDetails
