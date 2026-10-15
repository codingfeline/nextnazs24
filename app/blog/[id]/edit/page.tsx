import MainPage from '@/app/components/MainPage'
import { requireAdminPage } from '@/app/lib/authGuard'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import ArticleFormLoader from '../../_components/ArticleFormLoader'

interface Props {
  params: Promise<{ id: string }>
}

const EditArticlePage = async ({ params }: Props) => {
  const { id } = await params
  await requireAdminPage(`/blog/${id}/edit`)

  if (!/^[0-9a-f]{24}$/i.test(id)) notFound()

  const article = await prisma.article.findUnique({ where: { id } })
  if (!article) notFound()

  return (
    <MainPage>
      <ArticleFormLoader article={article} />
    </MainPage>
  )
}

export default EditArticlePage
