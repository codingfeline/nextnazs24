import { dateOptions } from '@/app/components'
import { requireAdminPage } from '@/app/lib/authGuard'
import prisma from '@/prisma/client'
import { Prisma } from '@prisma/client'
import { Badge, Flex, Text } from '@radix-ui/themes'
import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import AccessLogTable, { AccessLogRow } from './AccessLogTable'

export const metadata: Metadata = {
  title: 'Access log — Admin',
  robots: { index: false, follow: false },
}

const PAGE_SIZE = 50

interface Query {
  page?: string
  ip?: string
  status?: string
}

const AccessLogPage = async ({ searchParams }: { searchParams: Promise<Query> }) => {
  await requireAdminPage('/admin/access-log')

  const params = await searchParams
  const page = Math.max(1, parseInt(params.page ?? '1', 10) || 1)
  const status = params.status ? parseInt(params.status, 10) : undefined

  const where: Prisma.AccessLogWhereInput = {
    ...(params.ip && { ip: params.ip }),
    ...(status && { status }),
  }

  const [logs, total] = await Promise.all([
    prisma.accessLog.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.accessLog.count({ where }),
  ])

  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE))

  // Keeps current filters when changing page or adding a filter
  const href = (overrides: Partial<Query>) => {
    const merged = { ip: params.ip, status: params.status, page: String(page), ...overrides }
    const query = new URLSearchParams()
    if (merged.ip) query.set('ip', merged.ip)
    if (merged.status) query.set('status', merged.status)
    if (merged.page && merged.page !== '1') query.set('page', merged.page)
    const qs = query.toString()
    return `/admin/access-log${qs ? `?${qs}` : ''}`
  }

  // Deleting every row on the last page leaves you past the end; step back
  if (page > pageCount) redirect(href({ page: String(pageCount) }))

  const rows: AccessLogRow[] = logs.map(log => ({
    id: log.id,
    time: log.createdAt.toLocaleString('en-GB', dateOptions),
    ip: log.ip,
    ipHref: href({ ip: log.ip, page: '1' }),
    method: log.method,
    path: log.path,
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
          <Link href="/admin/access-log" className="text-sm underline">
            Clear filters
          </Link>
        )}
      </Flex>

      <AccessLogTable rows={rows} />

      <Flex align="center" gap="4" justify="center">
        {pageLink(1, page > 1, '« Newest')}
        {pageLink(page - 1, page > 1, '← Newer')}
        <Text size="2">
          Page {page} of {pageCount}
        </Text>
        {pageLink(page + 1, page < pageCount, 'Older →')}
        {pageLink(pageCount, page < pageCount, 'Oldest »')}
      </Flex>
    </Flex>
  )
}

export default AccessLogPage
