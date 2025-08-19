import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import { Footer } from "../components/Footer"
import { CartProvider } from "../contexts/CartContext"
import { useCart } from "../hooks/useCart"
import "../styles/global.css"

const LayoutContent = () => {
  const { totalQuantity } = useCart();

  return (
    <div className="bg-theme-background min-h-screen">
      <Header cartCount={totalQuantity} />
      <main className="main bg-theme-background">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export const RootLayout = () => {
  return (
    <CartProvider>
      <LayoutContent />
    </CartProvider>
  )
}
