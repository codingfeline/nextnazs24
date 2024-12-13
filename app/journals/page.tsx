import prisma from '@/prisma/client'
import { Table } from '@radix-ui/themes'
// import parse from 'html-react-parser'
import Link from '../components/Link'
import JournalActions from './journalActions'

const JournalsPage = async () => {
  const journals = await prisma.journals.findMany()
  // await delay(2000)

  return (
    <div className="w-full">
      <JournalActions />
      <Table.Root variant="surface" className="w-2/3 bg-red-50">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Topic
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Journal</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Date
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {journals.map(j => {
            return (
              <Table.Row key={j.id} className="w-full">
                <Table.Cell className="w-full">
                  <Link href={`/journals/${j.id}`}>{j.topic}</Link>
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">{j.comment}</Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  {j.date.toDateString()}
                </Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table.Root>
    </div>
  )
}

export default JournalsPage
