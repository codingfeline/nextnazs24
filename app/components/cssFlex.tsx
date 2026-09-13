import React, { CSSProperties } from 'react'

export default function CssFlex() {
  return (
    <div>
      <h1>Flex Adrenaline</h1>
      <div className="flex-container" style={container}>
        <div style={item} className="item">Item 1</div>
        <div style={item} className="item">Item 2</div>
        <div style={item} className="item">Item 3</div>
        <div style={item} className="item">Item 4</div>
        <div style={item} className="item">Item 5</div>
      </div>
    </div>
  )
}

const container: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '1rem',
  background: 'blue',
}

const item: CSSProperties = {
  color: 'navy',
  margin: '.5em 0',
  background: 'pink',
  padding: '0.5rem 1rem',
}
