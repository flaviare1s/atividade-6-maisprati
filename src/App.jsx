import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { RootLayout } from "./layouts/RootLayout";
import { Home } from "./pages/Home";
import { Bootstrap } from "./pages/Bootstrap";
import { Material } from "./pages/Material";
import { About } from "./pages/About";
import { Milligram } from "./pages/Milligram";

function App() {

  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="sobre" element={<About />} />
          <Route path="produtos/bootstrap" element={<Bootstrap />} />
          <Route path="produtos/material" element={<Material />} />
          <Route path="produtos/milligram" element={<Milligram />} />
        </Route>
      </Routes>
    </ThemeProvider>
  )
}

export default App
