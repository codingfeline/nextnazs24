import React, { CSSProperties } from 'react'
import { TbArrowAutofitContent } from 'react-icons/tb';
import styles from './cssGrid.module.scss'

export default function CssGrid() {
  const {gridContainer, item} = styles

  return (
    <div className={gridContainer}>
      <h1>Grid Adrenaline</h1>
      <div>
        <div className={item}>Item 1</div>
        <div className={item}>Item 2</div>
        <div className={item}>Item 3</div>
        <div className={item}>Item 4</div>
        <div className={item}>Item 5</div>
        <div className={item}>Item 6</div>
        <div className={item}>Item 7</div>
        <div className={item}>Item 8</div>
        <div className={item}>Item 9</div>
      </div>
      <div>
        other
      </div>
    </div>
  )
}