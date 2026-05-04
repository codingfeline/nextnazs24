import { CheckState, HandleInput } from './interface'

interface Handlers {
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  handleChecks: HandleInput
  handleLength: HandleInput
}

export interface Props {
  handlers: Handlers
  checks: CheckState
}
