import TitleCase from '@/app/jsPlayground/_components/ChangeCase'
import LeapYear from '@/app/jsPlayground/_components/leapYear'
import { Flex } from '@radix-ui/themes'

const Utilities = () => {
  return (
    <Flex
      direction={{ initial: 'column', sm: 'row' }}
      gap="2"
      align={{ initial: 'center', sm: 'start' }}
    >
      <TitleCase />
      <LeapYear />
    </Flex>
  )
}

export default Utilities
