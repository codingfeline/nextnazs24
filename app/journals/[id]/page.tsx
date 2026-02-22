import { auth } from '@/app/api/auth/[...nextauth]/authOptions'
import { Pencil } from '@/app/components'
import ButtonWithComponent from '@/app/components/ButtonLink'
import MainPage from '@/app/components/MainPage'
import Reveal from '@/app/components/Reveal'
import prisma from '@/prisma/client'
import { Box, Container, Flex } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import DeleteJournalButton from './DeleteJournalButton'
import JournalDetails from './JournalDetails'

interface Props {
  params: Promise<{ id: string }> // * making this a Promise to await below (await params)
}

const IssueDetailPage = async ({ params }: Props) => {
  const session = await auth()

  if ((await params).id.length !== 24) notFound()

  const journal = await prisma.journals.findUnique({
    where: { id: (await params).id }, // * await to prevent error at the bottom
  })

  if (!journal) notFound()

  return (
    <MainPage bg="bg_journals">
      <Container>
        {/* <Grid columns={{ initial: '1', sm: '5' }} gap="5"> */}
        <Box className="md:col-span-4">
          <Reveal>
            <JournalDetails journal={journal} />
          </Reveal>
        </Box>
        {/* {!session && ( */}
        {session && session.user!.email === 'post@nazs.net' && (
          <Box mt="3">
            <Flex direction="column" gap="2">
              <ButtonWithComponent
                full
                Icon={Pencil}
                href={`/journals/${journal.id}/edit`}
              >
                Edit Journal
              </ButtonWithComponent>
              {/* <EditJournalButton journalId={journal.id} /> */}
              <DeleteJournalButton journalId={journal.id} />
            </Flex>
          </Box>
        )}
        {/* </Grid> */}
      </Container>
    </MainPage>
  )
}

export default IssueDetailPage

//Error: Route "/journals/[id]" used `params.id`. `params` should be awaited before using its properties
