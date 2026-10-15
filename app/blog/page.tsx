import { Plus } from '@/app/components'
import ButtonWithComponent from '@/app/components/ButtonLink'
import MainPage from '@/app/components/MainPage'
import Reveal from '@/app/components/Reveal'
import prisma from '@/prisma/client'
import { Flex, Heading, Text } from '@radix-ui/themes'
import type { Metadata } from 'next'
import NextLink from 'next/link'
import ArticleTime from './_components/ArticleTime'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Articles and write-ups.',
}

//? Render on every request so "an hour ago" stays current instead of freezing at build time
export const dynamic = 'force-dynamic'

const BlogPage = async () => {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: 'desc' },
    select: { id: true, title: true, createdAt: true },
  })

  return (
    <MainPage>
      <Flex justify="between" align="center" mb="3">
        <Heading size="7">Blog</Heading>
        <ButtonWithComponent href="/blog/new" Icon={Plus} classes="theme-surface">
          New Article
        </ButtonWithComponent>
      </Flex>

      {articles.length === 0 && <Text className="opacity-70">No articles yet.</Text>}

      <Flex direction="column" gap="2">
        {articles.map((article, index) => (
          <Reveal delay={index * 80} key={article.id}>
            <NextLink
              href={`/blog/${article.id}`}
              className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 p-3 rounded theme-surface hover:opacity-90"
            >
              <span className="text-lg">{article.title}</span>
              <ArticleTime date={article.createdAt} />
            </NextLink>
          </Reveal>
        ))}
      </Flex>
    </MainPage>
  )
}

export default BlogPage
