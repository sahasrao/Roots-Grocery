import { useEffect, useState } from 'react'
import { Link } from 'wouter'
import {
  ArrowLeft,
  Leaf,
  LogOut,
  Mail,
  MapPin,
  ShoppingBag,
  User,
} from 'lucide-react'
import GoogleSignInButton from '../components/GoogleSignInButton'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { DIETS, type Diet } from '../data/diets'
import { formatPrice } from '../data/products'
import {
  readProfilePreferences,
  writeProfilePreferences,
  type ProfilePreferences,
} from '../lib/profileStorage'

function ProfileSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="bg-card text-card-foreground rounded-2xl p-5 md:p-6 shadow-lg">
      <h3 className="text-lg md:text-xl font-bold mb-4 text-card-foreground">
        {title}
      </h3>
      {children}
    </section>
  )
}

export default function ProfilePage() {
  const { user, isAuthenticated, signOut } = useAuth()
  const { totalItems, subtotal } = useCart()
  const [preferences, setPreferences] = useState<ProfilePreferences>({
    diets: [],
    address: '',
  })
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (user) {
      setPreferences(readProfilePreferences(user.id))
    }
  }, [user])

  const toggleDiet = (diet: Diet) => {
    if (!user) return
    setPreferences((current) => {
      const diets = current.diets.includes(diet)
        ? current.diets.filter((item) => item !== diet)
        : [...current.diets, diet]
      const next = { ...current, diets }
      writeProfilePreferences(user.id, next)
      return next
    })
    setSaved(true)
    window.setTimeout(() => setSaved(false), 2000)
  }

  const updateAddress = (address: string) => {
    if (!user) return
    setPreferences((current) => {
      const next = { ...current, address }
      writeProfilePreferences(user.id, next)
      return next
    })
  }

  const saveAddress = () => {
    if (!user) return
    writeProfilePreferences(user.id, preferences)
    setSaved(true)
    window.setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="flex-1 flex flex-col min-h-[100dvh] bg-background text-foreground">
      <header className="sticky top-0 z-20 px-6 md:px-8 lg:px-12 xl:px-16 py-4 md:py-5 flex items-center justify-between border-b border-border bg-secondary">
        <Link href="/" className="text-foreground p-1" aria-label="Back to shop">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="font-sans font-bold text-xl md:text-2xl text-foreground">
          My Profile
        </h1>
        <div className="w-8" />
      </header>

      <div className="flex-1 overflow-y-auto px-6 md:px-8 lg:px-12 xl:px-16 py-8 md:py-12">
        <div className="max-w-2xl lg:max-w-4xl mx-auto lg:mx-0 space-y-6 md:space-y-8">
          {isAuthenticated && user ? (
            <>
              <div className="bg-card text-card-foreground rounded-2xl p-6 md:p-8 shadow-lg">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  {user.picture ? (
                    <img
                      src={user.picture}
                      alt={user.name}
                      className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-[#d1c6b0] object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-[#e8dfc8] flex items-center justify-center">
                      <User className="w-10 h-10 text-card-foreground" />
                    </div>
                  )}

                  <div className="flex-1 text-center sm:text-left">
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-accent font-bold mb-2">
                      <Leaf className="w-4 h-4" />
                      <span className="text-sm uppercase tracking-wider">
                        Roots member
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-extrabold leading-tight mb-2">
                      {user.name}
                    </h2>
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-[#6b6251]">
                      <Mail className="w-4 h-4 shrink-0" />
                      <span className="text-sm md:text-base break-all">
                        {user.email}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-secondary rounded-2xl p-4 md:p-5 border border-white/10">
                  <p className="text-xs uppercase tracking-wider text-muted mb-1">
                    Cart items
                  </p>
                  <p className="text-2xl md:text-3xl font-extrabold">{totalItems}</p>
                </div>
                <div className="bg-secondary rounded-2xl p-4 md:p-5 border border-white/10">
                  <p className="text-xs uppercase tracking-wider text-muted mb-1">
                    Cart total
                  </p>
                  <p className="text-2xl md:text-3xl font-extrabold font-mono text-accent">
                    {formatPrice(subtotal)}
                  </p>
                </div>
                <div className="bg-secondary rounded-2xl p-4 md:p-5 border border-white/10 col-span-2 md:col-span-1">
                  <p className="text-xs uppercase tracking-wider text-muted mb-1">
                    Dietary prefs
                  </p>
                  <p className="text-2xl md:text-3xl font-extrabold">
                    {preferences.diets.length}
                  </p>
                </div>
              </div>

              <ProfileSection title="Dietary preferences">
                <p className="text-sm text-[#6b6251] mb-4">
                  We&apos;ll highlight farmstand items that match your diet on
                  future visits.
                </p>
                <div className="flex flex-wrap gap-2">
                  {DIETS.map((diet) => {
                    const active = preferences.diets.includes(diet)
                    return (
                      <button
                        key={diet}
                        type="button"
                        onClick={() => toggleDiet(diet)}
                        className={`text-xs md:text-sm font-semibold tracking-wide px-4 py-2 rounded-full border transition-all ${
                          active
                            ? 'bg-accent text-white border-accent'
                            : 'bg-transparent text-card-foreground border-[#d9ccb4] hover:border-accent/50'
                        }`}
                      >
                        {diet}
                      </button>
                    )
                  })}
                </div>
              </ProfileSection>

              <ProfileSection title="Default delivery address">
                <div className="flex items-start gap-2 mb-3">
                  <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <p className="text-sm text-[#6b6251]">
                    Saved for checkout. You can still edit it when placing an
                    order.
                  </p>
                </div>
                <textarea
                  rows={3}
                  value={preferences.address}
                  onChange={(event) => updateAddress(event.target.value)}
                  placeholder="123 Farm Lane, Portland, OR 97201"
                  className="w-full bg-[#f0e8d6] text-[#2a1f0e] rounded-xl py-3 px-4 text-sm md:text-base border border-[#d9ccb4] focus:outline-none focus:border-accent/70 resize-none mb-4"
                />
                <button
                  type="button"
                  onClick={saveAddress}
                  className="bg-accent text-accent-foreground font-bold px-6 py-3 rounded-full text-sm md:text-base active:scale-95 transition-transform"
                >
                  Save address
                </button>
              </ProfileSection>

              <div className="grid sm:grid-cols-2 gap-4">
                <Link
                  href="/"
                  className="flex items-center justify-center gap-2 bg-[#f0e8d6] text-[#2a1f0e] font-bold py-4 rounded-full border border-[#d9ccb4] hover:border-accent/50 transition-colors"
                >
                  <Leaf className="w-5 h-5 text-accent" />
                  Browse farmstand
                </Link>
                <Link
                  href="/cart"
                  className="flex items-center justify-center gap-2 bg-[#f0e8d6] text-[#2a1f0e] font-bold py-4 rounded-full border border-[#d9ccb4] hover:border-accent/50 transition-colors"
                >
                  <ShoppingBag className="w-5 h-5 text-accent" />
                  View cart
                </Link>
              </div>

              {saved && (
                <p className="text-center text-sm text-accent font-semibold">
                  Profile updated
                </p>
              )}

              <button
                type="button"
                onClick={signOut}
                className="w-full flex items-center justify-center gap-2 bg-secondary text-foreground font-bold py-4 rounded-full border border-white/10 hover:border-white/25 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Sign out
              </button>
            </>
          ) : (
            <div className="max-w-lg mx-auto text-center">
              <div className="bg-card text-card-foreground rounded-2xl p-6 md:p-10 shadow-lg">
                <div className="w-20 h-20 bg-[#e8dfc8] rounded-full flex items-center justify-center mx-auto mb-6">
                  <User className="w-10 h-10 text-card-foreground" />
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold mb-3">
                  Your Roots profile
                </h2>
                <p className="text-[#6b6251] text-base md:text-lg mb-6 leading-relaxed">
                  Sign in to save dietary preferences, store a delivery address,
                  and pre-fill checkout with your Google account.
                </p>
                <ul className="text-left text-sm text-[#6b6251] space-y-2 mb-8 max-w-xs mx-auto">
                  <li>• Save dietary preferences</li>
                  <li>• Store a default delivery address</li>
                  <li>• Faster checkout with Google</li>
                  <li>• View cart summary from your account</li>
                </ul>
                <GoogleSignInButton />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
