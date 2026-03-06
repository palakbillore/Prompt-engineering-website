// ── Sidebar.jsx ───────────────────────────────────────
// Left sidebar for article pages. Shows:
//   • All section navigation links
//   • Table of contents for the current page
// On mobile it becomes a collapsible drawer.
// ─────────────────────────────────────────────────────
import React, { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

// Section nav items for the sidebar
const SECTIONS = [
  {
    label: 'Getting Started',
    items: [
      { label: 'Introduction',    path: '/introduction',   icon: '📖' },
    ],
  },
  {
    label: 'Core Knowledge',
    items: [
      { label: 'Concepts',        path: '/concepts',       icon: '🧠' },
      { label: 'Techniques',      path: '/techniques',     icon: '⚡' },
      { label: 'Examples',        path: '/examples',       icon: '💡' },
    ],
  },
  {
    label: 'Advanced',
    items: [
      { label: 'Best Practices',  path: '/best-practices', icon: '✅' },
      { label: 'Resources',       path: '/resources',      icon: '📚' },
    ],
  },
]

export default function Sidebar({ toc = [] }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeId, setActiveId]     = useState('')
  const location = useLocation()

  // Highlight TOC item on scroll
  useEffect(() => {
    if (!toc.length) return
    const headings = toc.map(item => document.getElementById(item.id)).filter(Boolean)

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: '-10% 0px -80% 0px' }
    )
    headings.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [toc, location.pathname])

  const SidebarContent = () => (
    <>
      {/* Section Navigation */}
      <div className="mb-6">
        {SECTIONS.map((group, gi) => (
          <div key={gi} className="mb-4">
            <p className="px-3 mb-1.5 text-xs font-display font-600 uppercase tracking-widest
                           text-ink-400 dark:text-ink-500">
              {group.label}
            </p>
            {group.items.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  isActive ? 'sidebar-link-active' : 'sidebar-link'
                }
              >
                <span className="text-base leading-none">{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </div>
        ))}
      </div>

      {/* Table of Contents */}
      {toc.length > 0 && (
        <div className="border-t border-ink-200 dark:border-ink-800 pt-4">
          <p className="px-3 mb-2 text-xs font-display font-600 uppercase tracking-widest
                         text-ink-400 dark:text-ink-500">
            On this page
          </p>
          <nav className="space-y-0.5">
            {toc.map(item => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`block px-3 py-1.5 text-sm rounded-lg transition-colors duration-150
                            ${item.level === 3 ? 'pl-6' : ''}
                            ${activeId === item.id
                              ? 'text-amber-600 dark:text-amber-400 font-medium'
                              : 'text-ink-500 dark:text-ink-400 hover:text-ink-800 dark:hover:text-ink-200'
                            }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  )

  return (
    <>
      {/* ── Desktop Sidebar ── */}
      <aside className="hidden lg:block w-60 shrink-0">
        <div className="sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto
                        pr-2 pb-8 scrollbar-thin">
          <SidebarContent />
        </div>
      </aside>

      {/* ── Mobile: Floating TOC button ── */}
      <div className="lg:hidden fixed bottom-5 left-4 z-40">
        <button
          onClick={() => setMobileOpen(o => !o)}
          className="flex items-center gap-2 px-3 py-2 rounded-xl shadow-lg
                     bg-amber-400 text-ink-950 text-sm font-display font-600
                     hover:bg-amber-300 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h10" />
          </svg>
          Contents
        </button>
      </div>

      {/* ── Mobile Drawer ── */}
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <div
            className="lg:hidden fixed inset-0 bg-ink-950/40 z-40 animate-fade-in"
            onClick={() => setMobileOpen(false)}
          />
          {/* Drawer panel */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50
                          bg-white dark:bg-ink-900
                          border-t border-ink-200 dark:border-ink-800
                          rounded-t-2xl p-5 max-h-[70vh] overflow-y-auto
                          animate-fade-up">
            <div className="flex items-center justify-between mb-4">
              <span className="font-display font-700 text-ink-900 dark:text-ink-50">Navigation</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="text-ink-500 hover:text-ink-800 dark:hover:text-ink-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <SidebarContent />
          </div>
        </>
      )}
    </>
  )
}