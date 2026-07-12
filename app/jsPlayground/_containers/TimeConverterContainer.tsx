import Reveal from '@/app/components/Reveal'
import TimeConverter from '../_components/TimeConverter'

const TimeConverterContainer = () => {
  return (
    <Reveal delay={800}>
      <TimeConverter hideBrains />
    </Reveal>
  )
}

export default TimeConverterContainer
