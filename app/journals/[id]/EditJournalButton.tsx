import { Pencil } from '@/app/components'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'

const EditJournalButton = ({ journalId }: { journalId: string }) => {
  return (
    <Button>
      <Pencil />
      <Link href={`/journals/${journalId}/edit`}>Edit Journal</Link>
    </Button>
  )
}

export default EditJournalButton
