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
  description: 'Write-ups of the frustrating coding moments I hit, and how I solved them.',
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
        <ButtonWithComponent adminOnly href="/blog/new" Icon={Plus} classes="theme-surface">
          New Article
        </ButtonWithComponent>
      </Flex>

      <div className="max-w-2xl mb-6 space-y-3 opacity-90">
        <Text as="p" size="3">
          This blog is my record of the &lsquo;pulling my hair out&rsquo; moments: the errors that made no sense,
          the bugs that only appeared once I&rsquo;d deployed, and the hours of frustration that eventually ended
          with the right search on Google and a fix that worked.
        </Text>
        <Text as="p" size="3">
          Writing each one up is how I learn. Explaining what went wrong, and why the fix works, turns a lucky
          find into something I actually understand. And from experience, I know I&rsquo;m bound to forget, so
          these posts are here to remind me the next time it happens. If they save you some time too, even better.
        </Text>
      </div>

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
