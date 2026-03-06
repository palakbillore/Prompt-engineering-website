// ── App.jsx ───────────────────────────────────────────
// Root component: handles dark mode state + routing
// ─────────────────────────────────────────────────────
import React, { useState, useEffect, createContext, useContext } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

// Layout
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

// Pages
import Home from './pages/Home.jsx'
import Introduction from './pages/Introduction.jsx'
import Concepts from './pages/Concepts.jsx'
import Techniques from './pages/Techniques.jsx'
import Examples from './pages/Examples.jsx'
import BestPractices from './pages/BestPractices.jsx'
import Resources from './pages/Resources.jsx'

// ── Dark Mode Context ─────────────────────────────────
export const DarkModeContext = createContext({
  darkMode: false,
  toggleDarkMode: () => {},
})

export function useDarkMode() {
  return useContext(DarkModeContext)
}

// ── Scroll to top on route change ────────────────────
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  // Initialise dark mode from localStorage or system preference
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('promptcraft-darkmode')
    if (stored !== null) return stored === 'true'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  // Apply/remove 'dark' class on <html>
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem('promptcraft-darkmode', darkMode)
  }, [darkMode])

  const toggleDarkMode = () => setDarkMode(prev => !prev)

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <div className="min-h-screen bg-ink-50 dark:bg-ink-950 transition-colors duration-300 flex flex-col">
        <ScrollToTop />
        <Navbar />
        {/* Main content area grows to fill viewport */}
        <main className="flex-1">
          <Routes>
            <Route path="/"               element={<Home />} />
            <Route path="/introduction"   element={<Introduction />} />
            <Route path="/concepts"       element={<Concepts />} />
            <Route path="/techniques"     element={<Techniques />} />
            <Route path="/examples"       element={<Examples />} />
            <Route path="/best-practices" element={<BestPractices />} />
            <Route path="/resources"      element={<Resources />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </DarkModeContext.Provider>
  )
} 