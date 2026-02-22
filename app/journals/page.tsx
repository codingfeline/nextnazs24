import prisma from '@/prisma/client'
import { Box, Container, Table, Text } from '@radix-ui/themes'

import { ArrowDown, ArrowUp, dateOptions } from '@/app/components'
import ButtonWithComponent from '@/app/components/ButtonLink'
import { Journals } from '@prisma/client'
import NextLink from 'next/link'
import { redirect } from 'next/navigation'
import MainPage from '../components/MainPage'
import RevealLoop from '../components/RevealLoop'
// import Pagination from '../components/Pagination'

interface JournalQuery {
  orderBy?: keyof Journals
  date: 'asc' | 'desc'
}

const JournalsPage = async ({
  searchParams,
}: {
  searchParams: Promise<JournalQuery>
}) => {
  const params = await searchParams
  const columns: { label: string; value: keyof Journals; className?: string }[] = [
    {
      label: 'Topic',
      value: 'topic',
    },
    { label: 'Created', value: 'date', className: 'hidden md:float-right md:table-cell' },
  ]

  const { orderBy: col, date: rawDate } = params

  const isInvalideDate = rawDate && rawDate !== 'asc' && rawDate !== 'desc'
  const isInvalideCol = col && !columns.some(c => c.value === col)

  if (isInvalideCol || isInvalideDate) {
    return redirect('/journals')
  }

  // const orderBy = columns.some(c => c.value === col)
  //   ? { [col as string]: date || 'asc' }
  //   : { date: 'desc' as const }

  const orderBy = columns.some(c => c.value === col)
    ? { [col as string]: rawDate === 'asc' || rawDate === 'desc' ? rawDate : 'asc' }
    : { date: 'desc' as const }

  const journals = await prisma.journals.findMany({ orderBy })

  // const selectedOrder = params.orderBy
  // const isValidColumn =
  //   selectedOrder && columns.map(col => col.value).includes(selectedOrder)
  // const orderBy = isValidColumn ? { [selectedOrder]: params.date || 'asc' } : undefined
  // const journals = await prisma.journals.findMany({
  //   orderBy,
  // })

  if (process.env.NODE_ENV === 'development') {
    console.log('dev')
  }

  return (
    <MainPage bg="bg_journals">
      <Container>
        <div className="p-4">
          {/* <Pagination itemCount={journals.length} pageSize={10} currentPage={1} /> */}
          <ButtonWithComponent margin="mb-1" href="/journals/new">
            New Journal
          </ButtonWithComponent>
          <Table.Root variant="surface" className="mt-1">
            <Table.Header>
              <Table.Row>
                {columns.map(col => (
                  <Table.ColumnHeaderCell key={col.value} className={col.className}>
                    {/* <NextLink href={`/journals?orderBy=${col.value}`}> */}
                    <NextLink
                      href={{
                        query: {
                          ...params,
                          orderBy: col.value,
                          date:
                            params.orderBy === col.value && params.date === 'asc'
                              ? 'desc'
                              : 'asc',
                        },
                      }}
                    >
                      {col.label}
                    </NextLink>
                    {(params.orderBy === col.value ||
                      (!params.orderBy && col.value === 'date')) &&
                      (params.date === 'asc' ? (
                        <ArrowUp className="inline pl-[3px] text-lg" />
                      ) : (
                        <ArrowDown className="inline pl-[3px] text-lg" />
                      ))}
                  </Table.ColumnHeaderCell>
                ))}
              </Table.Row>
            </Table.Header>
          </Table.Root>
          <Box mt="1">
            {journals.map((j, index) => {
              return (
                <RevealLoop delay={index * 80}>
                  <NextLink href={`/journals/${j.id}`} key={j.id}>
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
                </RevealLoop>
              )
            })}
          </Box>
        </div>
      </Container>
    </MainPage>
  )
}

export const dynamic = 'force-dynamic'

export default JournalsPage
