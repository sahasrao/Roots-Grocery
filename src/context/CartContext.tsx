import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { getProductById } from '../data/products'
import type { CartItem, Product } from '../types/product'

interface CartLineItem {
  product: Product
  quantity: number
}

interface CartContextValue {
  items: CartLineItem[]
  totalItems: number
  subtotal: number
  addItem: (productId: number, quantity?: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  removeItem: (productId: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

const STORAGE_KEY = 'roots-cart'

function readStoredCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as CartItem[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeStoredCart(items: CartItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => readStoredCart())

  const addItem = useCallback((productId: number, quantity = 1) => {
    setCartItems((prev) => {
      const next = prev.some((item) => item.productId === productId)
        ? prev.map((item) =>
            item.productId === productId
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          )
        : [...prev, { productId, quantity }]
      writeStoredCart(next)
      return next
    })
  }, [])

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    if (quantity < 1) return
    setCartItems((prev) => {
      const next = prev.map((item) =>
        item.productId === productId ? { ...item, quantity } : item,
      )
      writeStoredCart(next)
      return next
    })
  }, [])

  const removeItem = useCallback((productId: number) => {
    setCartItems((prev) => {
      const next = prev.filter((item) => item.productId !== productId)
      writeStoredCart(next)
      return next
    })
  }, [])

  const clearCart = useCallback(() => {
    setCartItems([])
    writeStoredCart([])
  }, [])

  const items = useMemo(
    () =>
      cartItems
        .map((item) => {
          const product = getProductById(item.productId)
          return product ? { product, quantity: item.quantity } : null
        })
        .filter((item): item is CartLineItem => item !== null),
    [cartItems],
  )

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  )

  const subtotal = useMemo(
    () =>
      items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0,
      ),
    [items],
  )

  const value = useMemo(
    () => ({
      items,
      totalItems,
      subtotal,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    }),
    [items, totalItems, subtotal, addItem, updateQuantity, removeItem, clearCart],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}
