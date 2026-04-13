import { HashRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import MenuSection from './components/Menu'
import Gallery from './components/Gallery'
import Reservations from './components/Reservations'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'
import LadoB from './pages/LadoB'

function LaLenaCriollaInner() {
  const { theme } = useTheme()
  return (
    <div className={theme === 'dark' ? 'lena-dark' : ''}>
      <Navbar />
      <main>
        <Hero />
        <About />
        <MenuSection />
        <Gallery />
        <Reservations />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
    </div>
  )
}

function LaLenaCriolla() {
  return (
    <ThemeProvider defaultTheme="light">
      <LaLenaCriollaInner />
    </ThemeProvider>
  )
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LaLenaCriolla />} />
        <Route path="/ladob" element={<LadoB />} />
      </Routes>
    </HashRouter>
  )
}
