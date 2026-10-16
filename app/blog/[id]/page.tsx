import { BackButton, Pencil } from '@/app/components'
import ButtonWithComponent from '@/app/components/ButtonLink'
import MainPage from '@/app/components/MainPage'
import { getSession } from '@/app/lib/authGuard'
import prisma from '@/prisma/client'
import { Role } from '@prisma/client'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { cache } from 'react'
import ReactMarkDown from 'react-markdown'
import ArticleTime from '../_components/ArticleTime'
import ShareArticle from '../_components/ShareArticle'

interface Props {
  params: Promise<{ id: string }>
}

// Shared by generateMetadata and the page so the article is fetched once
const getArticle = cache(async (id: string) =>
  /^[0-9a-f]{24}$/i.test(id) ? prisma.article.findUnique({ where: { id } }) : null
)

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticle((await params).id)
  if (!article) return { title: 'Blog' }

  // Plain-text excerpt for link previews when the article is shared
  const description = article.content
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_`~|-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 160)

  return {
    title: `${article.title} — Blog`,
    description,
    openGraph: {
      title: article.title,
      description,
      type: 'article',
      publishedTime: article.createdAt.toISOString(),
      authors: [article.author],
    },
    twitter: { card: 'summary', title: article.title, description },
  }
}

const ArticlePage = async ({ params }: Props) => {
  const article = await getArticle((await params).id)
  if (!article) notFound()

  // getSession returns the fake admin session when the local dev bypass is on
  const session = await getSession()
  const canEdit = session?.user?.role === Role.ADMIN

  return (
    <MainPage>
      <Flex gap="2" wrap="wrap">
        <ButtonWithComponent href="/blog" Icon={BackButton} classes="bg-gray-600 hover:bg-gray-500">
          Back to blog
        </ButtonWithComponent>
        {canEdit && (
          <ButtonWithComponent href={`/blog/${article.id}/edit`} Icon={Pencil}>
            Edit Article
          </ButtonWithComponent>
        )}
      </Flex>
      <article className="p-3">
        <Heading size="8" mt="3">
          {article.title}
        </Heading>
        <Flex align="center" justify="between" gap="3" wrap="wrap" mt="1">
          <Text size="2" className="opacity-80">
            By <span className="font-semibold">{article.author}</span> ·{' '}
            <ArticleTime date={article.createdAt} />
          </Text>
          <ShareArticle title={article.title} />
        </Flex>
        {/* prose wraps inline `code` in literal backticks via ::before/::after; hide them */}
        <Card
          className="prose max-w-none bg-gray-100 prose-code:before:content-none prose-code:after:content-none"
          mt="4"
        >
          <ReactMarkDown>{article.content}</ReactMarkDown>
        </Card>
      </article>
    </MainPage>
  )
}

export default ArticlePage
