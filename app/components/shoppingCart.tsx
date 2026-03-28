'use client'

import { useMemo, useState } from 'react'

type Product = {
  id: string
  item: string
  description: string
  price: number
}

type CartItem = {
  product: Product
  quantity: number
}

const products: Product[] = [
  {
    id: '1',
    item: 'Apples',
    description: 'Fresh red apples, crisp and sweet.',
    price: 2.99,
  },
  {
    id: '2',
    item: 'Bananas',
    description: 'Ripe bananas rich in potassium.',
    price: 1.49,
  },
  {
    id: '3',
    item: 'Milk',
    description: 'Creamy whole milk for daily use.',
    price: 1.89,
  },
  {
    id: '4',
    item: 'Bread',
    description: 'Whole grain brown bread.',
    price: 2.49,
  },
]

export default function CartClient() {
  const [cart, setCart] = useState<CartItem[]>([])

  // Add to cart
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(i => i.product.id === product.id)

      if (existing) {
        return prev.map(i =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
        )
      }

      return [...prev, { product, quantity: 1 }]
    })
  }

  // Increase quantity
  const increaseQuantity = (id: string) => {
    setCart(prev =>
      prev.map(i => (i.product.id === id ? { ...i, quantity: i.quantity + 1 } : i)),
    )
  }

  // Decrease quantity
  const decreaseQuantity = (id: string) => {
    setCart(prev =>
      prev
        .map(i => (i.product.id === id ? { ...i, quantity: i.quantity - 1 } : i))
        .filter(i => i.quantity > 0),
    )
  }

  // Total price
  const total = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  }, [cart])

  return (
    <div className="flex gap-6 md:p-4 p-2 sm:w-full md:w-5/6 mx-auto">
      {/* MENU (2/3) */}
      <div className="w-2/3">
        <h1 className="text-2xl font-bold mb-4">Menu</h1>

        <table className="w-full border border-gray-300 bg-gray-100 text-gray-500">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2 text-left">Item & Price</th>
              <th className="border p-2 text-left">Description</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map(product => (
              <tr key={product.id} className="border-t">
                {/* Combined column */}
                <td className="p-2">
                  <div className="font-medium">{product.item}</div>
                  <div className="text-sm text-gray-500">£{product.price.toFixed(2)}</div>
                </td>

                <td className="p-2 text-sm text-gray-600">{product.description}</td>

                <td className="p-2 text-center">
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Add
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CART (1/3) */}
      <div className="w-1/3 border-l pl-4">
        <h2 className="text-xl font-bold mb-4">Cart</h2>

        {cart.length === 0 ? (
          <p className="text-gray-100">Cart is empty</p>
        ) : (
          <table className="w-full border border-gray-300 bg-gray-300 text-gray-800">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2 text-left">Item & Price</th>
                <th className="border p-2">Qty</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>

            <tbody>
              {cart.map(item => (
                <tr key={item.product.id} className="border-t">
                  {/* Combined column */}
                  <td className="p-2">
                    <div className="font-medium">{item.product.item}</div>
                    <div className="text-sm text-gray-500">
                      £{item.product.price.toFixed(2)}
                    </div>
                  </td>

                  {/* Quantity */}
                  <td className="p-2 text-center">{item.quantity}</td>

                  {/* Actions */}
                  <td className="p-2">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => decreaseQuantity(item.product.id)}
                        className="bg-gray-200 px-2 rounded"
                      >
                        -
                      </button>

                      <button
                        onClick={() => increaseQuantity(item.product.id)}
                        className="bg-gray-200 px-2 rounded"
                      >
                        +
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Total */}
        {cart.length > 0 && (
          <div className="mt-4 text-right font-bold">Total: £{total.toFixed(2)}</div>
        )}
      </div>
    </div>
  )
}
