'use client'

import { useState } from 'react'

type Product = {
  id: number
  name: string
  price: number
}

type CartItem = Product & {
  quantity: number
}

const products: Product[] = [
  { id: 1, name: 'T-Shirt', price: 20 },
  { id: 2, name: 'Jeans', price: 50 },
  { id: 3, name: 'Sneakers', price: 80 },
]

export default function ShoppingCartPage() {
  const [cart, setCart] = useState<CartItem[]>([])

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id))
  }

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return
    setCart(prev => prev.map(item => (item.id === id ? { ...item, quantity } : item)))
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Shopping Cart</h1>

      <h2>Products</h2>
      <div style={{ display: 'flex', gap: '1rem' }}>
        {products.map(product => (
          <div key={product.id} style={{ border: '1px solid #ccc', padding: '1rem' }}>
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>

      <h2 style={{ marginTop: '2rem' }}>Cart</h2>
      {cart.length === 0 && <p>Your cart is empty</p>}

      {cart.map(item => (
        <div
          key={item.id}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '1rem',
          }}
        >
          <div>
            <strong>{item.name}</strong> - ${item.price}
          </div>

          <div>
            <input
              type="number"
              value={item.quantity}
              min={1}
              onChange={e => updateQuantity(item.id, Number(e.target.value))}
              style={{ width: '60px', marginRight: '10px' }}
            />
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </div>
        </div>
      ))}

      {cart.length > 0 && <h3>Total: ${total.toFixed(2)}</h3>}
    </div>
  )
}
