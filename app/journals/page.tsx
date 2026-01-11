import prisma from '@/prisma/client'
import { Box, Container, Text } from '@radix-ui/themes'
// import parse from 'html-react-parser'

import { dateOptions } from '@/app/components'
import ButtonWithComponent from '@/app/components/ButtonLink'
import NextLink from 'next/link'

const JournalsPage = async () => {
  const journals = await prisma.journals.findMany()
  // await delay(2000)

  return (
    <main className="grow bg_journals">
      <Container>
        <div className="p-4">
          <ButtonWithComponent href="/journals/new">New Journal</ButtonWithComponent>

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
