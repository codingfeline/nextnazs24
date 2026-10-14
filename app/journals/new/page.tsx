import { requireAdminPage } from '@/app/lib/authGuard'
import NewJournalForm from './NewJournalForm'

const NewJournalPage = async () => {
  await requireAdminPage('/journals/new')

  return (
    <main className="grow bg_journals">
      <NewJournalForm />
    </main>
  )
}

export default NewJournalPage
