export const FEATURE_KEYS = [
  'word',
  'changeCase',
  'password',
  'ipv4',
  'daysBetween',
  'time',
  'quickBudget',
] as const

export type FeatureKey = (typeof FEATURE_KEYS)[number]
