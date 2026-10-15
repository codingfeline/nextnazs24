import MainPage from '@/app/components/MainPage'
import { requireAdminPage } from '@/app/lib/authGuard'
import ArticleFormLoader from '../_components/ArticleFormLoader'

const NewArticlePage = async () => {
  await requireAdminPage('/blog/new')

  return (
    <MainPage>
      <ArticleFormLoader />
    </MainPage>
  )
}

export default NewArticlePage
