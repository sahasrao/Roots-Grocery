import { useMemo, useState } from 'react'
import { Link, useRoute } from 'wouter'
import { ArrowLeft, Minus, Plus, ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { formatPrice, getProductById } from '../data/products'

export default function ProductPage() {
  const [, params] = useRoute('/product/:id')
  const productId = Number(params?.id)
  const product = getProductById(productId)
  const { totalItems, addItem } = useCart()
  const [quantity, setQuantity] = useState(1)

  const lineTotal = useMemo(
    () => (product ? product.price * quantity : 0),
    [product, quantity],
  )

  if (!product) {
    return (
      <div className="flex-1 flex flex-col h-[100dvh] items-center justify-center p-6 md:p-10 text-center bg-background text-foreground">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">Product not found</h1>
        <Link href="/" className="text-accent font-bold text-lg">
          Back to shop
        </Link>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col h-[100dvh] bg-card text-card-foreground md:flex-row md:overflow-hidden">
      <div className="relative md:w-1/2 md:shrink-0 md:flex md:flex-col">
        <div className="absolute top-0 inset-x-0 z-10 flex items-center justify-between px-6 md:px-8 lg:px-12 xl:px-16 py-6 md:py-8">
          <Link
            href="/"
            className="w-10 h-10 md:w-11 md:h-11 bg-background/80 backdrop-blur-md rounded-full flex items-center justify-center text-foreground shadow-md"
            aria-label="Back to shop"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <Link
            href="/cart"
            className="w-10 h-10 md:w-11 md:h-11 bg-background/80 backdrop-blur-md rounded-full flex items-center justify-center text-foreground shadow-md relative"
            aria-label="View cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>

        <div className="h-[45vh] md:h-full md:min-h-0 md:flex-1 bg-[#e8dfc8] flex items-center justify-center pt-12 md:pt-0 rounded-b-[2rem] md:rounded-none shadow-sm relative overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover mix-blend-multiply opacity-90"
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-0 md:w-1/2 md:overflow-y-auto">
        <div className="flex-1 px-6 md:px-8 lg:px-12 xl:px-16 pt-8 md:pt-10 pb-6 md:pb-8">
          <div className="flex flex-wrap gap-2 mb-4 md:mb-5">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs md:text-sm uppercase tracking-wider bg-background text-foreground px-3 py-1 rounded-full font-bold shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-2 leading-tight">
            {product.name}
          </h1>

          <p className="font-mono text-2xl md:text-3xl text-accent mb-6 md:mb-8 font-medium">
            {formatPrice(product.price)}
            <span className="text-lg md:text-xl text-[#a0947c] ml-1">
              {' '}
              {product.priceUnit}
            </span>
          </p>

          <p className="text-[#6b6251] leading-relaxed text-lg md:text-xl max-w-prose">
            {product.description}
          </p>
        </div>

        <div className="sticky bottom-0 shrink-0 bg-background p-6 md:p-8 lg:px-12 xl:px-16 rounded-t-3xl lg:rounded-none shadow-[0_-10px_40px_rgba(0,0,0,0.2)]">
          <div className="flex items-center gap-6 max-w-xl md:max-w-none lg:max-w-none mx-auto">
            <div className="flex items-center gap-4 bg-secondary rounded-full px-4 py-3 md:px-5 md:py-3.5">
              <button
                type="button"
                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                className="text-muted-foreground hover:text-foreground p-1"
                aria-label="Decrease quantity"
              >
                <Minus className="w-5 h-5" />
              </button>
              <span className="font-mono font-bold text-lg w-4 text-center text-foreground">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((value) => value + 1)}
                className="text-foreground p-1"
                aria-label="Increase quantity"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => addItem(product.id, quantity)}
              className="flex-1 bg-accent text-accent-foreground font-bold text-lg md:text-xl py-4 md:py-5 rounded-full shadow-lg active:scale-95 transition-transform"
            >
              Add {formatPrice(lineTotal)}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
