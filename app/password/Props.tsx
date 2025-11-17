// import { Props } from './interface'
interface CheckState {
  lowercase?: boolean
  uppercase?: boolean
  numbers?: boolean
  symbols?: boolean
  length: string
  copied?: boolean
  noChecks?: boolean
  password: string
}
type HandleInput = (e: React.ChangeEvent<HTMLInputElement>) => void
interface Handlers {
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  handleChecks: HandleInput
  handleLength: HandleInput
  handleCopy: () => void
}
export interface Props {
  handlers: Handlers
  checks: CheckState
}
