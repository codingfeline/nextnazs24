import Reveal from '@/app/components/Reveal'
import WordUnscrambler from '../_components/WordUnscrambler'

const WordContainer = () => {
  return (
    <Reveal delay={300}>
      <WordUnscrambler hideBrains />
    </Reveal>
  )
}

export default WordContainer
