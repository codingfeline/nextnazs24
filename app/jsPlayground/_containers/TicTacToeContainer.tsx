import Reveal from '@/app/components/Reveal'
import TicTacToe from '../_components/TicTacToe'

const TicTacToeContainer = ({ delay = 0 }: { delay?: number }) => {
  return (
    <Reveal delay={delay}>
      <TicTacToe />
    </Reveal>
  )
}

export default TicTacToeContainer
