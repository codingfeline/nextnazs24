import { dateOptions } from '@/app/components'
import { requireAdminPage } from '@/app/lib/authGuard'
import prisma from '@/prisma/client'
import { Prisma } from '@prisma/client'
import { Badge, Flex, Text } from '@radix-ui/themes'
import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import AccessLogTable, { AccessLogRow } from './AccessLogTable'
import DeleteOlderLogs from './DeleteOlderLogs'

export const metadata: Metadata = {
  title: 'Access log — Admin',
  robots: { index: false, follow: false },
}

const PAGE_SIZES = [25, 50, 100, 200]
const DEFAULT_PAGE_SIZE = 50

interface Query {
  page?: string
  size?: string
  ip?: string
  status?: string
}

const AccessLogPage = async ({ searchParams }: { searchParams: Promise<Query> }) => {
  await requireAdminPage('/admin/access-log')

  const params = await searchParams
  const page = Math.max(1, parseInt(params.page ?? '1', 10) || 1)
  const status = params.status ? parseInt(params.status, 10) : undefined
  // Only the offered sizes are accepted, so ?size=100000 can't pull the whole collection
  const sizeParam = parseInt(params.size ?? '', 10)
  const pageSize = PAGE_SIZES.includes(sizeParam) ? sizeParam : DEFAULT_PAGE_SIZE

  const where: Prisma.AccessLogWhereInput = {
    ...(params.ip && { ip: params.ip }),
    ...(status && { status }),
  }

  const [logs, total] = await Promise.all([
    prisma.accessLog.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.accessLog.count({ where }),
  ])

  const pageCount = Math.max(1, Math.ceil(total / pageSize))

  // Keeps current filters when changing page or adding a filter
  const href = (overrides: Partial<Query>) => {
    const merged = { ip: params.ip, status: params.status, page: String(page), size: String(pageSize), ...overrides }
    const query = new URLSearchParams()
    if (merged.ip) query.set('ip', merged.ip)
    if (merged.status) query.set('status', merged.status)
    if (merged.page && merged.page !== '1') query.set('page', merged.page)
    if (merged.size && merged.size !== String(DEFAULT_PAGE_SIZE)) query.set('size', merged.size)
    const qs = query.toString()
    return `/admin/access-log${qs ? `?${qs}` : ''}`
  }

  // Deleting every row on the last page leaves you past the end; step back
  if (page > pageCount) redirect(href({ page: String(pageCount) }))

  // Titles for article visits (/blog/<id> and its sub-pages), looked up now so renames show the current title
  const articleId = (path: string) => path.match(/^\/blog\/([0-9a-f]{24})(\/|$)/i)?.[1]
  const articleIds = [...new Set(logs.map(log => articleId(log.path)).filter(id => id !== undefined))]
  const articles = articleIds.length
    ? await prisma.article.findMany({ where: { id: { in: articleIds } }, select: { id: true, title: true } })
    : []
  const titles = new Map(articles.map(a => [a.id, a.title]))

  const rows: AccessLogRow[] = logs.map(log => ({
    id: log.id,
    time: log.createdAt.toLocaleString('en-GB', dateOptions),
    ip: log.ip,
    ipHref: href({ ip: log.ip, page: '1' }),
    method: log.method,
    path: log.path,
    title: titles.get(articleId(log.path) ?? ''),
    status: log.status,
    statusHref: href({ status: String(log.status), page: '1' }),
    userAgent: log.userAgent,
  }))

  // Greyed-out text instead of a link when the target is the current page
  const pageLink = (target: number, enabled: boolean, label: string) =>
    enabled ? (
      <Link href={href({ page: String(target) })}>{label}</Link>
    ) : (
      <span className="opacity-40">{label}</span>
    )

  // Shown above and below the table
  const pager = (
    <Flex align="center" gap="4" justify="center" wrap="wrap">
      {pageLink(1, page > 1, '« Newest')}
      {pageLink(page - 1, page > 1, '← Newer')}
      <Text size="2">
        Page {page} of {pageCount}
      </Text>
      {pageLink(page + 1, page < pageCount, 'Older →')}
      {pageLink(pageCount, page < pageCount, 'Oldest »')}
    </Flex>
  )

  const isFiltered = !!(params.ip || params.status)

  return (
    <Flex direction="column" gap="3">
      <Flex align="center" gap="3" wrap="wrap">
        <Text size="2" className="opacity-70">
          {total} request{total === 1 ? '' : 's'} (last 30 days)
        </Text>
        {params.ip && <Badge>ip: {params.ip}</Badge>}
        {params.status && <Badge>status: {params.status}</Badge>}
        {isFiltered && (
          <Link href={href({ ip: undefined, status: undefined, page: '1' })} className="text-sm underline">
            Clear filters
          </Link>
        )}
      </Flex>

      <DeleteOlderLogs />

      {pager}

      <AccessLogTable rows={rows} />

      {pager}

      <Flex align="center" gap="3" justify="center">
        <Text size="2" className="opacity-70">
          Per page:
        </Text>
        {/* changing size goes back to page 1, since the old page number may no longer exist */}
        {PAGE_SIZES.map(size =>
          size === pageSize ? (
            <Text key={size} size="2" weight="bold">
              {size}
            </Text>
          ) : (
            <Link key={size} href={href({ size: String(size), page: '1' })} className="text-sm">
              {size}
            </Link>
          )
        )}
      </Flex>
    </Flex>
  )
}

export default AccessLogPage
