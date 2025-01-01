import prisma from '@/prisma/client'
import { Box, Card, Flex, Text } from '@radix-ui/themes'
// import parse from 'html-react-parser'

import { Link } from '../components'
import ButtonWithComponent from '../components/ButtonLink'

const JournalsPage = async () => {
  const journals = await prisma.journals.findMany()
  // await delay(2000)

  return (
    <div className=" ">
      <ButtonWithComponent href="/journals/new">New Journal</ButtonWithComponent>

      <Box mt="1">
        {journals.map(j => {
          return (
            <Card key={j.id} className="gap-2 mb-1 bg-slate-100">
              <Flex justify="between">
                <Link href={`/journals/${j.id}`}>{j.topic}</Link>
                <Text>{j.date.toLocaleString()}</Text>
              </Flex>
            </Card>
          )
        })}
      </Box>
    </div>
  )
}

export const dynamic = 'force-dynamic'

export default JournalsPage
