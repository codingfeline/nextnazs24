import Reveal from '@/app/components/Reveal'
import TextTransformer from '../_components/ChangeCase'

const ChangeCaseContainer = () => {
  return (
    <Reveal delay={400}>
      <TextTransformer hideBrains />
    </Reveal>
  )
}

export default ChangeCaseContainer
