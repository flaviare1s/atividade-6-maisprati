import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { RootLayout } from "./layouts/RootLayout";
import { Bootstrap } from "./pages/Bootstrap";
import { Material } from "./pages/Material";
import { Miligram } from "./pages/Miligram";
import { About } from "./pages/About";

function App() {

  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<RootLayout />} />
        <Route path="/sobre" element={<About />} />
        <Route path="/bootstrap" element={<Bootstrap />} />
        <Route path="/material" element={<Material />} />
        <Route path="/miligram" element={<Miligram />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
