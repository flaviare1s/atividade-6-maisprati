import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import { Footer } from "../components/Footer"
import "../styles/global.css"

export const RootLayout = () => {
  return (
    <div>
      <Header />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
