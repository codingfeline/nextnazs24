import prisma from '@/prisma/client'
import { Heading, Table } from '@radix-ui/themes'
import parse from 'html-react-parser'
import Link from '../components/Link'

const JournalsPage = async () => {
  const journals = await prisma.journals.findMany()
  return (
    <div>
      <div className="mb-2">
        <Link href="/journals/new">New Journal</Link>
      </div>
      <Heading></Heading>
      <Table.Root variant="surface">
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
                <Table.Cell className="hidden md:table-cell">{j.topic}</Table.Cell>
                <Table.Cell>{parse(j.comment)}</Table.Cell>
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
