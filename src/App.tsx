import { Route, Switch } from 'wouter'
import { CartProvider } from './context/CartContext'
import CartPage from './pages/Cart'
import CheckoutPage from './pages/Checkout'
import ConfirmationPage from './pages/Confirmation'
import Home from './pages/Home'
import NotFoundPage from './pages/NotFound'
import ProductPage from './pages/Product'

function Router() {
  return (
    <div className="min-h-[100dvh] w-full flex justify-center bg-zinc-950 px-0 sm:px-4 md:px-6 lg:px-0 lg:bg-background">
      <div className="w-full max-w-[430px] sm:max-w-xl md:max-w-3xl md:rounded-2xl md:my-4 md:min-h-[calc(100dvh-2rem)] md:shadow-2xl bg-background relative overflow-hidden flex flex-col shadow-2xl min-h-[100dvh] sm:rounded-none lg:max-w-none lg:rounded-none lg:my-0 lg:min-h-[100dvh] lg:shadow-none">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/product/:id" component={ProductPage} />
          <Route path="/cart" component={CartPage} />
          <Route path="/checkout" component={CheckoutPage} />
          <Route path="/confirmation" component={ConfirmationPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <CartProvider>
      <Router />
    </CartProvider>
  )
}
