import prisma from '@/prisma/client'
import { Card, Flex, Text } from '@radix-ui/themes'
// import parse from 'html-react-parser'

import { Link } from '../components'
import ButtonWithComponent from '../components/ButtonLink'

const JournalsPage = async () => {
  const journals = await prisma.journals.findMany()
  // await delay(2000)

  return (
    <div className=" mt-1 h-">
      <ButtonWithComponent href="/journals/new">New Journal2</ButtonWithComponent>

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
    </div>
  )
}

export const dynamic = 'force-dynamic'

export default JournalsPage
