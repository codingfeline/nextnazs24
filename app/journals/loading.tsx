import { Container, Table } from '@radix-ui/themes'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import JournalActions from './journalActions'

const Loading = () => {
  const journals = Array.from({ length: 10 }, (_, i) => i + 1)

  return (
    <div>
      <JournalActions />
      <Container>
        <Table.Root variant="surface" className="">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell className="hidden md:table-cell">
                Topic
              </Table.ColumnHeaderCell>
              {/* <Table.ColumnHeaderCell>Journal</Table.ColumnHeaderCell> */}
              <Table.ColumnHeaderCell className="hidden md:table-cell">
                Created
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
      </Container>
    </div>
  )
}

export default Loading
