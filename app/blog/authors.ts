// Pseudonyms an article can be published under — add new ones here
export const AUTHORS = ['Coding Paws', 'Coding Feline', 'Next Feline', 'Next Paws'] as const

export type Author = (typeof AUTHORS)[number]

// Keep in sync with the @default on Article.author in prisma/schema.prisma
export const DEFAULT_AUTHOR: Author = 'Coding Paws'
