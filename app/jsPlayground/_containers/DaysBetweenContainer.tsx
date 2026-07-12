import Reveal from '@/app/components/Reveal'
import DaysBetweenDates from '../_components/DaysBetweenDates'

const DaysBetweenContainer = () => {
  return (
    <Reveal delay={700}>
      <DaysBetweenDates hideBrains />
    </Reveal>
  )
}

export default DaysBetweenContainer
