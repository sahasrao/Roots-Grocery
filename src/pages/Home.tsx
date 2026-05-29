import { useMemo, useState } from 'react'
import { Link, useLocation } from 'wouter'
import { Leaf, Menu, Search, ShoppingBag, User } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { filterProducts, formatPrice } from '../data/products'
import type { Product } from '../types/product'

import { DIETS } from '../data/diets'

function ProductCard({
  product,
  onAdd,
  onOpen,
}: {
  product: Product
  onAdd: (productId: number, event: React.MouseEvent) => void
  onOpen: (productId: number) => void
}) {
  return (
    <div
      onClick={() => onOpen(product.id)}
      className="bg-card rounded-2xl p-3 flex flex-col shadow-lg cursor-pointer active:scale-[0.98] transition-transform"
    >
      <div className="h-36 sm:h-40 md:h-44 lg:h-48 mb-3 bg-[#e8dfc8] rounded-xl flex items-center justify-center overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover mix-blend-multiply"
          loading="lazy"
        />
      </div>

      <h3 className="font-bold text-card-foreground text-sm md:text-base leading-tight mb-2">
        {product.name}
      </h3>

      <div className="flex flex-wrap gap-1 mb-3">
        {product.tags.slice(0, 1).map((tag) => (
          <span
            key={tag}
            className="text-[9px] uppercase tracking-wider bg-[#d1c6b0] text-card-foreground px-2 py-0.5 rounded-full font-bold"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between">
        <div>
          <span className="font-mono font-medium text-accent text-sm">
            {formatPrice(product.price)}
          </span>
          <span className="text-[10px] text-[#a0947c] ml-0.5">
            {' '}
            {product.priceUnit}
          </span>
        </div>
        <button
          type="button"
          onClick={(event) => onAdd(product.id, event)}
          className="bg-accent text-white w-7 h-7 rounded-full flex items-center justify-center text-base shadow-md active:scale-95 transition-transform"
          aria-label={`Add ${product.name} to cart`}
        >
          +
        </button>
      </div>
    </div>
  )
}

export default function Home() {
  const [, setLocation] = useLocation()
  const { user } = useAuth()
  const { totalItems, addItem } = useCart()
  const [search, setSearch] = useState('')
  const [activeDiet, setActiveDiet] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  const visibleProducts = useMemo(
    () => filterProducts({ search, diet: activeDiet }),
    [search, activeDiet],
  )

  const handleAddToCart = (productId: number, event: React.MouseEvent) => {
    event.stopPropagation()
    addItem(productId)
  }

  return (
    <div className="flex-1 flex flex-col h-[100dvh] overflow-y-auto pb-8">
      <header className="sticky top-0 z-20 bg-secondary px-6 md:px-8 lg:px-12 xl:px-16 py-4 md:py-5 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4 md:gap-8">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="text-foreground p-1 md:hidden"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          <Link href="/" className="flex items-center gap-2">
            <Leaf className="w-6 h-6 text-accent" />
            <h1 className="font-sans font-extrabold text-2xl md:text-3xl tracking-tight text-foreground">
              Roots
            </h1>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-base font-bold hover:text-accent transition-colors text-foreground"
            >
              Home
            </Link>
            <Link
              href="/cart"
              className="text-base font-bold hover:text-accent transition-colors text-foreground"
            >
              Cart
            </Link>
            <Link
              href="/profile"
              className="text-base font-bold hover:text-accent transition-colors text-foreground"
            >
              Profile
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2">
        <Link href="/profile" className="relative p-1" aria-label="Profile">
          {user?.picture ? (
            <img
              src={user.picture}
              alt={user.name}
              className="w-7 h-7 rounded-full border-2 border-accent object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <User className="w-6 h-6 text-foreground" />
          )}
        </Link>
        <Link href="/cart" className="relative p-1" aria-label="View cart">
          <ShoppingBag className="w-6 h-6 text-foreground" />
          {totalItems > 0 && (
            <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-accent text-accent-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Link>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          />
          <div className="relative w-64 md:w-80 bg-secondary h-full flex flex-col shadow-2xl animate-in slide-in-from-left">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-12">
                <Leaf className="w-6 h-6 text-accent" />
                <span className="font-sans font-extrabold text-2xl text-foreground">
                  Roots
                </span>
              </div>
              <nav className="flex flex-col gap-6">
                <Link
                  href="/"
                  onClick={() => setMenuOpen(false)}
                  className="text-xl font-bold hover:text-accent transition-colors text-foreground"
                >
                  Home
                </Link>
                <Link
                  href="/cart"
                  onClick={() => setMenuOpen(false)}
                  className="text-xl font-bold hover:text-accent transition-colors text-foreground"
                >
                  Cart
                </Link>
                <Link
                  href="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="text-xl font-bold hover:text-accent transition-colors text-foreground"
                >
                  Profile
                </Link>
              </nav>
            </div>
          </div>
        </div>
      )}

      <div className="px-6 md:px-8 lg:px-12 xl:px-16 pt-6 md:pt-8 pb-4">
        <div className="relative max-w-2xl md:max-w-none mx-auto md:mx-0 lg:max-w-3xl">
          <Search className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-muted" />
          <input
            type="text"
            placeholder="Search our farmstand..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full bg-[#f0e8d6] text-[#2a1f0e] rounded-full py-3 md:py-3.5 pl-11 md:pl-12 pr-5 text-sm md:text-base border border-[#d9ccb4] focus:outline-none focus:border-accent/70 focus:ring-1 focus:ring-accent/40 transition-all placeholder:text-[#9c8b70]"
          />
        </div>
      </div>

      <div className="flex gap-2 md:gap-3 overflow-x-auto pb-4 px-6 md:px-8 lg:px-12 xl:px-16 hide-scrollbar md:flex-wrap md:overflow-visible">
        {DIETS.map((diet) => {
          const isActive = activeDiet === diet
          return (
            <button
              key={diet}
              type="button"
              onClick={() => setActiveDiet(isActive ? null : diet)}
              className={`shrink-0 text-xs md:text-sm font-semibold tracking-wide px-4 md:px-5 py-2 md:py-2.5 rounded-full border transition-all ${
                isActive
                  ? 'bg-accent text-white border-accent'
                  : 'bg-transparent text-muted-foreground border-white/10 hover:border-white/25 hover:text-foreground'
              }`}
            >
              {diet}
            </button>
          )
        })}
      </div>

      <div className="px-6 md:px-8 lg:px-12 xl:px-16 mb-8 md:mb-12">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6 text-accent">
          This week&apos;s specials
        </h2>

        {visibleProducts.length === 0 ? (
          <p className="text-muted text-center py-12 md:text-lg">
            No products match your search. Try a different filter.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5 lg:gap-6">
            {visibleProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAdd={handleAddToCart}
                onOpen={(id) => setLocation(`/product/${id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
