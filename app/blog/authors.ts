// Pseudonyms an article can be published under — add new ones here
export const AUTHORS = ['Coding Paws', 'Coding Feline', 'Next Feline', 'Next Paws'] as const

export type Author = (typeof AUTHORS)[number]

// Shown for articles saved before author existed
export const DEFAULT_AUTHOR: Author = 'Coding Paws'
