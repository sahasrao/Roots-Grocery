import { Link } from 'wouter'

export default function NotFoundPage() {
  return (
    <div className="flex-1 flex flex-col h-[100dvh] items-center justify-center p-6 md:p-10 text-center bg-background text-foreground">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Page not found</h1>
      <Link href="/" className="text-accent font-bold text-lg">
        Return home
      </Link>
    </div>
  )
}
