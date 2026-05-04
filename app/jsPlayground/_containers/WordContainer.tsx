import Reveal from '@/app/components/Reveal'
import WordUnscrambler from '../_components/WordUnscrambler'

const WordContainer = ({ delay = 300 }: { delay?: number }) => {
  return (
    <Reveal delay={delay}>
      <WordUnscrambler hideBrains />
    </Reveal>
  )
}

export default WordContainer
