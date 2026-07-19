export const FEATURE_KEYS = [
  'word',
  'changeCase',
  'password',
  'ipv4',
  'daysBetween',
  'datePlusMinus',
  'time',
  'quickBudget',
  'crossMultiplication',
] as const

export type FeatureKey = (typeof FEATURE_KEYS)[number]
