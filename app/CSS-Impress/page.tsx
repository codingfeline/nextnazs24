import BackToTop from '../components/BackToTop';
import MainPage from '../components/MainPage';
import CssGrid from '../components/cssGrid/cssGrid';
import { Metadata } from 'next';
import styles from '../components/cssGrid/cssGrid.module.scss';

export const metadata: Metadata = {
    title: 'CSS Impress'
}

export default function page() {
  return (
    <>
      <MainPage bg={styles.bg_css}>
        <CssGrid />
      </MainPage>
      {/* outside MainPage: bg_css's clip-path would clip this fixed button near the footer */}
      <BackToTop />
    </>
  )
}
