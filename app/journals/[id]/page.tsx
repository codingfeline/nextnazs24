import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import prisma from '@/prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'
import DeleteJournalButton from './DeleteJournalButton'
import EditJournalButton from './EditJournalButton'
import JournalDetails from './JournalDetails'

interface Props {
  params: Promise<{ id: string }> // * making this a Promise to await below (await params)
}

const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions)

  if ((await params).id.length !== 24) notFound()

  const journal = await prisma.journals.findUnique({
    where: { id: (await params).id }, // * await to prevent error at the bottom
  })

  if (!journal) notFound()

  return (
    <Grid columns={{ initial: '1', sm: '5' }} gap="5">
      <Box className="md:col-span-4">
        <JournalDetails journal={journal} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="2">
            <EditJournalButton journalId={journal.id} />
            <DeleteJournalButton journalId={journal.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  )
}

export default IssueDetailPage

//Error: Route "/journals/[id]" used `params.id`. `params` should be awaited before using its properties
