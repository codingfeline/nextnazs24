import React from 'react'
import CssImpress from '../components/cssImpress';
import MainPage from '../components/MainPage';
import CssGrid from '../components/cssGrid/cssGrid';
import { Metadata } from 'next';
import styles from '../components/cssGrid/cssGrid.module.scss';

export const metadata: Metadata = {
    title: 'CSS Impress'
}

export default function page() {
  return (
    <MainPage bg={styles.bg_css}>
      {/* <CssImpress /> */}
      <CssGrid />
    </MainPage>
  )
}
