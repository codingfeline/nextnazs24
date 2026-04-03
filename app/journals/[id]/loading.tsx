import { BackButton, Skeleton } from '@/app/components'
import ButtonWithComponent from '@/app/components/ButtonLink'
import MainPage from '@/app/components/MainPage'
import { Card, Container } from '@radix-ui/themes'

const LoadingJournalDetail = () => {
  return (
    <MainPage>
      <Container>
        <ButtonWithComponent
          href=""
          classes="ml-3 bg-gray-600 hover:bg-gray-500"
          Icon={BackButton}
        >
          Back to journals
        </ButtonWithComponent>
        <Skeleton />
        <Card className="prose max-w-xl" mt="4">
          <Skeleton />
        </Card>
        <div className="flex justify-end p-1">
          <Skeleton />
        </div>
      </Container>
    </MainPage>
  )
}

export default LoadingJournalDetail
