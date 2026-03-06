// ── Navbar.jsx ────────────────────────────────────────
// Sticky top navigation bar with logo, links, search,
// and dark-mode toggle. Collapses to hamburger on mobile.
// ─────────────────────────────────────────────────────
import React, { useState, useEffect } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useDarkMode } from '../App.jsx'
import DarkModeToggle from './DarkModeToggle.jsx'
import SearchBar from './SearchBar.jsx'

// Navigation items shared with mobile menu
const NAV_ITEMS = [
  { label: 'Introduction', path: '/introduction' },
  { label: 'Concepts',     path: '/concepts' },
  { label: 'Techniques',   path: '/techniques' },
  { label: 'Examples',     path: '/examples' },
  { label: 'Best Practices', path: '/best-practices' },
  { label: 'Resources',    path: '/resources' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled]     = useState(false)
  const { darkMode } = useDarkMode()

  // Add shadow when page is scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  const closeMobile = () => setMobileOpen(false)

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300
        bg-white/90 dark:bg-ink-900/90 backdrop-blur-md
        border-b border-ink-200/60 dark:border-ink-800/60
        ${scrolled ? 'shadow-sm' : ''}`}
    >
      <div className="page-container">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* ── Logo ── */}
          <Link
            to="/"
            className="flex items-center gap-2.5 shrink-0 group"
            onClick={closeMobile}
          >
            {/* Animated logo mark */}
            <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center
                            group-hover:scale-105 transition-transform duration-200">
              <span className="font-display font-800 text-ink-950 text-sm leading-none">P</span>
            </div>
            <span className="font-display font-700 text-ink-900 dark:text-ink-50 text-lg">
              Prompt<span className="text-amber-500">Craft</span>
            </span>
          </Link>

          {/* ── Desktop Nav Links ── */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  isActive ? 'nav-link-active' : 'nav-link'
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* ── Right side: Search + Dark Mode ── */}
          <div className="flex items-center gap-2 ml-auto lg:ml-0">
            <div className="hidden sm:block">
              <SearchBar compact />
            </div>
            <DarkModeToggle />

            {/* Hamburger for mobile */}
            <button
              onClick={() => setMobileOpen(o => !o)}
              className="lg:hidden p-2 rounded-lg text-ink-600 dark:text-ink-400
                         hover:bg-ink-100 dark:hover:bg-ink-800 transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Menu Drawer ── */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-ink-200 dark:border-ink-800
                        bg-white dark:bg-ink-900 animate-fade-in">
          <div className="page-container py-3 space-y-1">
            {/* Search on mobile */}
            <div className="pb-2 sm:hidden">
              <SearchBar compact onSelect={closeMobile} />
            </div>
            {NAV_ITEMS.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={closeMobile}
                className={({ isActive }) =>
                  `block px-3 py-2.5 rounded-lg text-sm font-medium font-display transition-colors
                   ${isActive
                     ? 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30'
                     : 'text-ink-700 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-800'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}