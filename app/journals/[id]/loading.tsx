import { Skeleton } from '@/app/components'
import { Card } from '@radix-ui/themes'

const LoadingJournalDetail = () => {
  return (
    <div className="max-w-xl ">
      <Skeleton />
      <Card className="prose max-w-xl" mt="4">
        <Skeleton />
      </Card>
      <div className="flex justify-end p-1">
        <Skeleton />
      </div>
    </div>
  )
}

export default LoadingJournalDetail
