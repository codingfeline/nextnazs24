import type { Metadata } from 'next'
import BackToTop from '../../components/BackToTop'
import MainPage from '../../components/MainPage'
import CssGrid from '../../components/cssGrid/cssGrid'

export const metadata: Metadata = {
  title: 'CSS Grid Playground',
  description: 'Interactive CSS Grid layout demo.',
}

const CssGridPage = () => {
  return (
    <>
      <MainPage>
        <CssGrid />
      </MainPage>
      <BackToTop />
    </>
  )
}

export default CssGridPage
