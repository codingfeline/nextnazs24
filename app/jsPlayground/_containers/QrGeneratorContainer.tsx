import Reveal from '@/app/components/Reveal'
import QrGenerator from '../_components/QrGenerator'

const QrGeneratorContainer = ({ delay = 0 }: { delay?: number }) => {
  return (
    <Reveal delay={delay}>
      <QrGenerator />
    </Reveal>
  )
}

export default QrGeneratorContainer
