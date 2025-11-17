// import { HandleInput, CheckState } from './CheckState'

export interface CheckState {
  lowercase?: boolean
  uppercase?: boolean
  numbers?: boolean
  symbols?: boolean
  length: string
  copied?: boolean
}
export type HandleInput = (e: React.ChangeEvent<HTMLInputElement>) => void

export interface Props {
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  handleChecks: HandleInput
  handleLength: HandleInput
  handleCopy: () => void
  noChecks: boolean
  password: string
  checks: CheckState
}
