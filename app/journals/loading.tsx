import { Table } from '@radix-ui/themes'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import JournalActions from './journalActions'

const Loading = () => {
  const journals = [1, 2, 3, 4, 5]

  return (
    <div>
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
              <Table.Row key={j} className="w-full">
                <Table.Cell className="w-full">
                  <Skeleton />
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  <Skeleton />
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  <Skeleton />
                </Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table.Root>
    </div>
  )
}

export default Loading
