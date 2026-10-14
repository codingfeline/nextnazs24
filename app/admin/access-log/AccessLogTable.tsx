'use client'

import { Spinner } from '@/app/components'
import { AlertDialog, Badge, Button, Checkbox, Flex, Table, Text } from '@radix-ui/themes'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export interface AccessLogRow {
  id: string
  time: string // formatted on the server so it matches during hydration
  ip: string
  ipHref: string
  method: string
  path: string
  status: number
  statusHref: string
  userAgent: string | null
}

const statusColor = (status: number) =>
  status >= 500 ? 'red' : status >= 400 ? 'orange' : status >= 300 ? 'blue' : 'green'

const AccessLogTable = ({ rows }: { rows: AccessLogRow[] }) => {
  const router = useRouter()
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [isDeleting, setDeleting] = useState(false)
  const [error, setError] = useState(false)

  // Drop selections for rows no longer shown (after paging, filtering or deleting)
  const visible = selected.size ? new Set(rows.filter(r => selected.has(r.id)).map(r => r.id)) : selected
  const allChecked = rows.length > 0 && visible.size === rows.length
  const checkAllState = allChecked ? true : visible.size > 0 ? 'indeterminate' : false

  const toggle = (id: string) => {
    const next = new Set(visible)
    if (!next.delete(id)) next.add(id)
    setSelected(next)
  }

  const toggleAll = () => setSelected(allChecked ? new Set() : new Set(rows.map(r => r.id)))

  const deleteSelected = async () => {
    try {
      setDeleting(true)
      await axios.delete('/api/access-logs', { data: { ids: [...visible] } })
      setSelected(new Set())
      router.refresh()
    } catch (err) {
      console.log(err)
      setError(true)
    } finally {
      setDeleting(false)
    }
  }

  return (
    <>
      <Flex align="center" gap="3" minHeight="32px">
        <Text size="2" className="opacity-70">
          {visible.size} selected
        </Text>
        <AlertDialog.Root>
          <AlertDialog.Trigger>
            <Button color="red" size="1" disabled={visible.size === 0 || isDeleting}>
              Delete selected
              {isDeleting && <Spinner />}
            </Button>
          </AlertDialog.Trigger>
          <AlertDialog.Content>
            <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
            <AlertDialog.Description>
              Delete {visible.size} log entr{visible.size === 1 ? 'y' : 'ies'}? This can&apos;t be undone.
            </AlertDialog.Description>
            <Flex mt="3" gap="2">
              <AlertDialog.Cancel>
                <Button variant="soft" color="gray">
                  Cancel
                </Button>
              </AlertDialog.Cancel>
              <AlertDialog.Action>
                <Button color="red" onClick={deleteSelected}>
                  Delete
                </Button>
              </AlertDialog.Action>
            </Flex>
          </AlertDialog.Content>
        </AlertDialog.Root>
      </Flex>

      <Table.Root variant="surface" size="1">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell width="32px">
              <Checkbox
                aria-label="Select all rows on this page"
                checked={checkAllState}
                onCheckedChange={toggleAll}
                disabled={rows.length === 0}
              />
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Time</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>IP</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Method</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Path</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">User agent</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {rows.map(log => (
            <Table.Row key={log.id}>
              <Table.Cell>
                <Checkbox
                  aria-label={`Select ${log.method} ${log.path} at ${log.time}`}
                  checked={visible.has(log.id)}
                  onCheckedChange={() => toggle(log.id)}
                />
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap">{log.time}</Table.Cell>
              <Table.Cell>
                <Link href={log.ipHref} className="hover:underline">
                  {log.ip}
                </Link>
              </Table.Cell>
              <Table.Cell>{log.method}</Table.Cell>
              <Table.Cell className="break-all">{log.path}</Table.Cell>
              <Table.Cell>
                <Link href={log.statusHref}>
                  <Badge color={statusColor(log.status)}>{log.status}</Badge>
                </Link>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell max-w-xs truncate" title={log.userAgent ?? ''}>
                {log.userAgent}
              </Table.Cell>
            </Table.Row>
          ))}
          {rows.length === 0 && (
            <Table.Row>
              <Table.Cell colSpan={7}>No requests logged.</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table.Root>

      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>The selected entries were not deleted.</AlertDialog.Description>
          <Button color="gray" variant="soft" mt="2" onClick={() => setError(false)}>
            Ok
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  )
}

export default AccessLogTable
