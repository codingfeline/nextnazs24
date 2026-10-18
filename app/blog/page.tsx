import { Plus } from '@/app/components'
import ButtonWithComponent from '@/app/components/ButtonLink'
import MainPage from '@/app/components/MainPage'
import Reveal from '@/app/components/Reveal'
import { getSession } from '@/app/lib/authGuard'
import prisma from '@/prisma/client'
import { Role } from '@prisma/client'
import { Flex, Heading, Text } from '@radix-ui/themes'
import type { Metadata } from 'next'
import NextLink from 'next/link'
import ArticleDateEditor from './_components/ArticleDateEditor'
import ArticleVisibilityToggle from './_components/ArticleVisibilityToggle'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Articles and write-ups.',
}

//? Render on every request so "an hour ago" stays current instead of freezing at build time
export const dynamic = 'force-dynamic'

const BlogPage = async () => {
  // getSession returns the fake admin session when the local dev bypass is on
  const session = await getSession()
  const canEdit = session?.user?.role === Role.ADMIN

  const articles = await prisma.article.findMany({
    // visitors only get visible articles; older docs have no `hidden` field at all
    where: canEdit ? undefined : { OR: [{ hidden: { isSet: false } }, { hidden: null }, { hidden: false }] },
    orderBy: { createdAt: 'desc' },
    select: { id: true, title: true, createdAt: true, hidden: true },
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
            {/* date editor sits outside the link so its clicks don't navigate */}
            <div
              className={`flex flex-col md:flex-row md:items-center md:justify-between gap-1 p-3 rounded theme-surface hover:opacity-90 ${article.hidden ? 'opacity-50 border border-dashed' : ''}`}
            >
              <NextLink href={`/blog/${article.id}`} className="text-lg grow">
                {article.title}
                {article.hidden && <span className="ml-2 text-xs uppercase tracking-wide">(hidden)</span>}
              </NextLink>
              <span className="flex items-center gap-3">
                <ArticleDateEditor id={article.id} date={article.createdAt} canEdit={canEdit} />
                {canEdit && <ArticleVisibilityToggle id={article.id} hidden={!!article.hidden} />}
              </span>
            </div>
          </Reveal>
        ))}
      </Flex>
    </MainPage>
  )
}

export default BlogPage
