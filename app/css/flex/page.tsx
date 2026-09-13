import type { Metadata } from 'next'
import MainPage from '../../components/MainPage'
import CssFlex from '../../components/cssFlex'

export const metadata: Metadata = {
  title: 'CSS Flex Playground',
  description: 'Interactive CSS Flexbox layout demo.',
}

const CssFlexPage = () => {
  return (
    <MainPage>
      <CssFlex />
    </MainPage>
  )
}

export default CssFlexPage
