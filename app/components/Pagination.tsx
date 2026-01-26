import { DoubleArrowLeft, DoubleArrowRight } from '@/app/components'
import { Flex, Text } from '@radix-ui/themes'

interface PageProps {
  itemCount: number
  pageSize: number
  currentPage: number
}

const Page = ({ itemCount, pageSize, currentPage }: PageProps) => {
  const pageCount = Math.ceil(itemCount / pageSize)
  if (pageCount === 0) return null

  return (
    <Flex className="text-white items-center  gap-4 mb-2">
      <Text className="text-white">
        Page {currentPage} of {pageCount}
      </Text>
      <DoubleArrowLeft />
      <DoubleArrowRight />
    </Flex>
  )
}

export default Page
