import { dateOptions } from '@/app/components'
import { Journals } from '@prisma/client'
import { Card, Heading } from '@radix-ui/themes'
import ReactMarkDown from 'react-markdown'

const JournalDetails = ({ journal }: { journal: Journals }) => {
  return (
    <div className="p-3">
      <Heading className="text-white mt-3">{journal.topic}</Heading>
      <Card className="prose flex flex-col w-full bg-gray-100 " mt="4">
        <ReactMarkDown>{journal.comment}</ReactMarkDown>
        <p className="text-gray-400 text-right roboto-mono text-sm">
          {journal.date.toLocaleString('en-gb', dateOptions)}
        </p>
      </Card>
    </div>
  )
}

export default JournalDetails
