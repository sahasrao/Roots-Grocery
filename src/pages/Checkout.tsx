import { useState } from 'react'
import { Link, useLocation } from 'wouter'
import { ArrowLeft } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/products'

export default function CheckoutPage() {
  const [, setLocation] = useLocation()
  const { items, subtotal, clearCart } = useCart()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')

  if (items.length === 0) {
    return (
      <div className="flex-1 flex flex-col h-[100dvh] items-center justify-center p-6 md:p-10 text-center bg-background text-foreground">
        <p className="text-muted mb-6 md:text-lg">Your cart is empty.</p>
        <Link href="/" className="text-accent font-bold text-lg">
          Continue shopping
        </Link>
      </div>
    )
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    clearCart()
    setLocation('/confirmation')
  }

  return (
    <div className="flex-1 flex flex-col h-[100dvh] bg-background text-foreground">
      <header className="px-6 md:px-8 lg:px-12 xl:px-16 py-4 md:py-5 flex items-center justify-between border-b border-border bg-secondary">
        <Link href="/cart" className="text-foreground p-1" aria-label="Back to cart">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="font-sans font-bold text-xl md:text-2xl">Checkout</h1>
        <div className="w-8" />
      </header>

      <form
        onSubmit={handleSubmit}
        className="flex-1 overflow-y-auto px-6 md:px-8 lg:px-12 xl:px-16 py-6 md:py-8"
      >
        <div className="max-w-lg md:max-w-xl lg:max-w-none mx-auto w-full lg:grid lg:grid-cols-[1fr,min(24rem,100%)] lg:gap-12 lg:items-start space-y-5 md:space-y-6 lg:space-y-0">
          <div className="space-y-5 md:space-y-6">
          <div className="md:grid md:grid-cols-2 md:gap-5 md:space-y-0 space-y-5">
            <div className="md:space-y-0">
              <label htmlFor="name" className="block text-sm md:text-base font-semibold mb-2">
                Full name
              </label>
              <input
                id="name"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="w-full bg-[#f0e8d6] text-[#2a1f0e] rounded-xl py-3 md:py-3.5 px-4 text-sm md:text-base border border-[#d9ccb4] focus:outline-none focus:border-accent/70"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm md:text-base font-semibold mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full bg-[#f0e8d6] text-[#2a1f0e] rounded-xl py-3 md:py-3.5 px-4 text-sm md:text-base border border-[#d9ccb4] focus:outline-none focus:border-accent/70"
              />
            </div>
          </div>

          <div>
            <label htmlFor="address" className="block text-sm md:text-base font-semibold mb-2">
              Delivery address
            </label>
            <textarea
              id="address"
              required
              rows={3}
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              className="w-full bg-[#f0e8d6] text-[#2a1f0e] rounded-xl py-3 md:py-3.5 px-4 text-sm md:text-base border border-[#d9ccb4] focus:outline-none focus:border-accent/70 resize-none"
            />
          </div>

          </div>

          <div className="lg:sticky lg:top-6 space-y-5 md:space-y-6">
            <div className="bg-secondary rounded-2xl p-4 md:p-5 flex items-center justify-between">
              <span className="text-muted md:text-lg">Order total</span>
              <span className="font-mono font-bold text-xl md:text-2xl text-accent">
                {formatPrice(subtotal)}
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-accent text-accent-foreground font-bold text-lg md:text-xl py-4 md:py-5 rounded-full shadow-lg active:scale-95 transition-transform"
            >
              Place order
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
