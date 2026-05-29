import { Link } from 'wouter'
import { Leaf } from 'lucide-react'

export default function ConfirmationPage() {
  return (
    <div className="flex-1 flex flex-col h-[100dvh] items-center justify-center p-6 md:p-10 text-center bg-background text-foreground">
      <div className="w-20 h-20 md:w-24 md:h-24 bg-secondary rounded-full flex items-center justify-center mb-6">
        <Leaf className="w-10 h-10 md:w-12 md:h-12 text-accent" />
      </div>
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3">Order placed!</h1>
      <p className="text-muted text-lg md:text-xl mb-8 max-w-sm md:max-w-md">
        Your farmstand favorites are on their way. Thanks for shopping with Roots.
      </p>
      <Link
        href="/"
        className="bg-accent text-accent-foreground px-8 py-4 md:px-10 md:py-5 rounded-full font-bold text-lg md:text-xl shadow-lg active:scale-95 transition-transform"
      >
        Back to shop
      </Link>
    </div>
  )
}
