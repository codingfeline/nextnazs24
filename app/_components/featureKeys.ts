export const FEATURE_KEYS = [
  'word',
  'changeCase',
  'password',
  'ipv4',
  'daysBetween',
  'time',
  'quickBudget',
  'crossMultiplication',
] as const

export type FeatureKey = (typeof FEATURE_KEYS)[number]
