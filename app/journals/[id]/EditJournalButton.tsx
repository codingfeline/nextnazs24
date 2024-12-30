import { Pencil } from '@/app/components'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'

const EditJournalButton = ({ journalId }: { journalId: string }) => {
  return (
    <Link href={`/journals/${journalId}/edit`}>
      <Button className="w-full">
        <Pencil /> Edit Journal
      </Button>
    </Link>
    // <Button onClick={() => router.push(`/journals/${journalId}/edit`)}>
    //   <a href="#" className="flex items-center gap-1 ">
    //     <Pencil /> Edit Journal
    //   </a>
    // </Button>
  )
}

export default EditJournalButton
