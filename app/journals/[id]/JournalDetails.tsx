import { Journals } from '@prisma/client'
import { Card, Heading } from '@radix-ui/themes'
import ReactMarkDown from 'react-markdown'

const JournalDetails = ({ journal }: { journal: Journals }) => {
  return (
    <>
      <Heading className="text-white mt-3">{journal.topic}</Heading>
      <Card className="prose flex flex-col w-full bg-gray-100 " mt="4">
        <ReactMarkDown>{journal.comment}</ReactMarkDown>
      </Card>
      <div className="flex justify-end p-1">
        <p>{journal.date.toLocaleString()}</p>
      </div>
    </>
  )
}

export default JournalDetails
