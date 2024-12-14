import { Card } from '@radix-ui/themes'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

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
