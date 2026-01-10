import prisma from '@/prisma/client'
import { Box, Container, Flex, Text } from '@radix-ui/themes'
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
                    <Flex justify="between">
                      <span>{j.topic}</span>
                      {/* <Link href={`/journals/${j.id}`}>{j.topic}</Link> */}
                      <Text className="text-gray-500">
                        {j.date.toLocaleString('en-gb', dateOptions)}
                      </Text>
                    </Flex>
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
