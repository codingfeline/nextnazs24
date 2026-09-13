import React, { CSSProperties } from 'react'
import { TbArrowAutofitContent } from 'react-icons/tb';

export default function CssGrid() {
  return (
    <div >
      <h1>Grid Adrenaline</h1>
      <div className="grid-container" style={style}>
        <div style={item} className="item">Item 1</div>
        <div style={item} className="item">Item 2</div>
        <div style={item} className="item">Item 3</div>
        <div style={item} className="item">Item 4</div>
        <div style={item} className="item">Item 5</div>
        <div style={item} className="item">Item 6</div>
        <div style={item} className="item">Item 7</div>
        <div style={item} className="item">Item 8</div>
        <div style={item} className="item">Item 9</div>
      </div>
    </div>
  )
}

const style:CSSProperties = {
        display: 'grid',
        // background: "blue",
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr)',
        gap: '.5em',
    }
    
const item:CSSProperties = {
    color: 'navy',
    margin: '.5em .1em',
    background: 'pink',
    borderRadius: '.2em',
    display: 'grid',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1em 0'
}
