export interface CheckState {
  lowercase?: boolean
  uppercase?: boolean
  numbers?: boolean
  symbols?: boolean
  pronounceable?: boolean
  length: string
  noChecks?: boolean
}

export type HandleInput = (e: React.ChangeEvent<HTMLInputElement>) => void
