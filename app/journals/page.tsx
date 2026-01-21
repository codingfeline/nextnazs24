import prisma from '@/prisma/client'
import { Box, Container, Table, Text } from '@radix-ui/themes'

import { ArrowUp, dateOptions } from '@/app/components'
import ButtonWithComponent from '@/app/components/ButtonLink'
import { Journals } from '@prisma/client'
import NextLink from 'next/link'

interface JournalQuery {
  orderBy?: keyof Journals
  date: 'asc' | 'desc'
}

const JournalsPage = async ({
  searchParams,
}: {
  searchParams: Promise<JournalQuery>
}) => {
  const resolvedSearchParams = await searchParams
  const columns: { label: string; value: keyof Journals; className?: string }[] = [
    {
      label: 'Topic',
      value: 'topic',
    },
    { label: 'Created', value: 'date', className: 'hidden md:float-right md:table-cell' },
  ]

  const selectedOrder = resolvedSearchParams.orderBy
  const isValidColumn =
    selectedOrder && columns.map(col => col.value).includes(selectedOrder)
  const orderBy = isValidColumn
    ? { [selectedOrder]: resolvedSearchParams.date || 'asc' }
    : undefined
  const journals = await prisma.journals.findMany({
    orderBy,
  })

  if (process.env.NODE_ENV === 'development') {
    console.log('dev')
  }

  return (
    <main className="grow bg_journals">
      <Container>
        <div className="p-4">
          <ButtonWithComponent href="/journals/new">New Journal</ButtonWithComponent>
          <Table.Root variant="surface">
            <Table.Header>
              <Table.Row>
                {columns.map(col => (
                  <Table.ColumnHeaderCell key={col.value} className={col.className}>
                    {/* <NextLink href={`/journals?orderBy=${col.value}`}> */}
                    <NextLink
                      href={{
                        query: { ...resolvedSearchParams, orderBy: col.value },
                      }}
                    >
                      {col.label}
                    </NextLink>
                    {col.value === resolvedSearchParams.orderBy && (
                      <ArrowUp className="inline pl-[3px] text-lg" />
                    )}
                  </Table.ColumnHeaderCell>
                ))}
                {/* <Table.ColumnHeaderCell>Topic</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className="hidden md:float-right md:table-cell">
                  Date
                </Table.ColumnHeaderCell> */}
              </Table.Row>
            </Table.Header>
          </Table.Root>
          <Box mt="1">
            {journals.map(j => {
              return (
                <NextLink href={`/journals/${j.id}`} key={j.id} legacyBehavior>
                  <div
                    key={j.id}
                    className=" mb-1 bg-slate-200 p-1 rounded cursor-pointer hover:bg-blue-200"
                  >
                    <div className="flex justify-between flex-col md:p-1  md:flex-row">
                      <span className="pl-2">{j.topic}</span>
                      {/* <Link href={`/journals/${j.id}`}>{j.topic}</Link> */}
                      <Text className="text-gray-500 pr-2 roboto-mono text-sm flex justify-end">
                        {j.date.toLocaleString('en-gb', dateOptions)}
                      </Text>
                    </div>
                  </div>
                </NextLink>
              )
            })}
          </Box>
        </div>
      </Container>
    </main>
  )
}

export const dynamic = 'force-dynamic'

export default JournalsPage
