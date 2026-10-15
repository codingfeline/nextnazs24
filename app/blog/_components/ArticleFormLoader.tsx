'use client'

import type { Article } from '@prisma/client'
import dynamic from 'next/dynamic'

// SimpleMDE touches `window`, so the editor only renders in the browser
const ArticleForm = dynamic(() => import('@/app/blog/_components/ArticleForm'), {
  ssr: false,
  loading: () => <p className="p-4">Loading editor...</p>,
})

const ArticleFormLoader = ({ article }: { article?: Article }) => <ArticleForm article={article} />

export default ArticleFormLoader
