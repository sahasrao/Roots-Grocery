import { Link } from 'wouter'
import { ArrowLeft, Minus, Plus, X } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/products'

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeItem } = useCart()
  const isEmpty = items.length === 0

  return (
    <div className="flex-1 flex flex-col h-[100dvh] bg-background text-foreground">
      <header className="px-6 md:px-8 lg:px-12 xl:px-16 py-4 md:py-5 flex items-center justify-between border-b border-border bg-secondary">
        <Link href="/" className="text-foreground p-1" aria-label="Back to shop">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="font-sans font-bold text-xl md:text-2xl text-foreground">Your Cart</h1>
        <div className="w-8" />
      </header>

      {isEmpty ? (
        <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-10 text-center">
          <div className="w-24 h-24 md:w-28 md:h-28 bg-secondary rounded-full flex items-center justify-center mb-6">
            <X className="w-10 h-10 md:w-12 md:h-12 text-muted" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-foreground">Your cart is empty</h2>
          <p className="text-muted mb-8 text-lg md:text-xl max-w-md">
            Looks like you haven&apos;t added any fresh produce yet.
          </p>
          <Link
            href="/"
            className="bg-accent text-accent-foreground px-8 py-4 md:px-10 md:py-5 rounded-full font-bold text-lg md:text-xl shadow-lg active:scale-95 transition-transform"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto px-6 md:px-8 lg:px-12 xl:px-16 py-6 md:py-8">
            <div className="space-y-4 md:space-y-5 lg:grid lg:grid-cols-2 xl:grid-cols-3 lg:gap-5 lg:space-y-0 w-full">
              {items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="bg-card text-card-foreground rounded-2xl p-4 md:p-5 lg:p-6 flex gap-4 md:gap-5 shadow-md"
                >
                  <div className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 bg-[#e8dfc8] rounded-xl overflow-hidden shrink-0">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover mix-blend-multiply"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-sm md:text-base lg:text-lg leading-tight">
                          {product.name}
                        </h3>
                        <p className="font-mono text-accent text-sm md:text-base mt-1">
                          {formatPrice(product.price)}
                          <span className="text-[10px] md:text-xs text-[#a0947c] ml-0.5">
                            {' '}
                            {product.priceUnit}
                          </span>
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(product.id)}
                        className="text-muted hover:text-foreground p-1"
                        aria-label={`Remove ${product.name}`}
                      >
                        <X className="w-4 h-4 md:w-5 md:h-5" />
                      </button>
                    </div>

                    <div className="mt-3 md:mt-4 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        disabled={quantity <= 1}
                        className="w-8 h-8 md:w-9 md:h-9 rounded-full border border-card-border flex items-center justify-center disabled:opacity-40"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-mono font-bold w-4 text-center md:text-lg">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="w-8 h-8 md:w-9 md:h-9 rounded-full border border-card-border flex items-center justify-center"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 md:p-8 lg:px-12 xl:px-16 border-t border-border bg-secondary rounded-t-3xl lg:rounded-none">
            <div className="max-w-lg md:max-w-xl lg:max-w-none mx-auto w-full lg:flex lg:items-center lg:justify-between lg:gap-8">
              <div className="flex items-center justify-between mb-4 md:mb-6 lg:mb-0 lg:flex-1">
                <span className="text-muted md:text-lg">Subtotal</span>
                <span className="font-mono font-bold text-xl md:text-2xl text-accent">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <Link
                href="/checkout"
                className="block w-full lg:w-auto lg:min-w-[16rem] lg:px-12 text-center bg-accent text-accent-foreground font-bold text-lg md:text-xl py-4 md:py-5 rounded-full shadow-lg active:scale-95 transition-transform"
              >
                Checkout
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
