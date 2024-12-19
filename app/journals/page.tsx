import prisma from '@/prisma/client'
import { Table } from '@radix-ui/themes'
// import parse from 'html-react-parser'
import Link from '../components/Link'
import JournalActions from './journalActions'

const JournalsPage = async () => {
  const journals = await prisma.journals.findMany()
  // await delay(2000)

  return (
    <div className="">
      <JournalActions />
      <Table.Root variant="surface" className=" bg-red-50">
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
              <Table.Row key={j.id}>
                <Table.Cell className="">
                  <Link href={`/journals/${j.id}`}>{j.topic}</Link>
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell w-full">
                  {j.comment}
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell md:w-[150px]">
                  {j.date.toDateString()}
                  <br /> {j.date.getHours()}
                  {j.date.getMinutes()} hrs
                </Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table.Root>
    </div>
  )
}

export const dynamic = 'force-dynamic'

export default JournalsPage
