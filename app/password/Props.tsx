import { CheckState, HandleInput } from './interface'

interface Handlers {
  handleChecks: HandleInput
  handleLength: HandleInput
}

export interface Props {
  handlers: Handlers
  checks: CheckState
}
