// ── DarkModeToggle.jsx ────────────────────────────────
// Animated sun/moon toggle button for dark mode switching
// ─────────────────────────────────────────────────────
import React from 'react'
import { useDarkMode } from '../App.jsx'

export default function DarkModeToggle() {
  const { darkMode, toggleDarkMode } = useDarkMode()

  return (
    <button
      onClick={toggleDarkMode}
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      className="relative w-9 h-9 rounded-xl
                 bg-ink-100 dark:bg-ink-800
                 hover:bg-ink-200 dark:hover:bg-ink-700
                 text-ink-600 dark:text-amber-400
                 transition-all duration-200
                 flex items-center justify-center
                 hover:scale-105"
    >
      {/* Sun icon (shown in dark mode to switch to light) */}
      <svg
        className={`w-4.5 h-4.5 transition-all duration-300 absolute
                    ${darkMode ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-50'}`}
        fill="none" stroke="currentColor" viewBox="0 0 24 24"
        style={{ width: '1.1rem', height: '1.1rem' }}
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l.707.707M6.343 6.343l.707.707M12 7a5 5 0 100 10A5 5 0 0012 7z" />
      </svg>

      {/* Moon icon (shown in light mode to switch to dark) */}
      <svg
        className={`w-4.5 h-4.5 transition-all duration-300 absolute
                    ${!darkMode ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'}`}
        fill="none" stroke="currentColor" viewBox="0 0 24 24"
        style={{ width: '1.1rem', height: '1.1rem' }}
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    </button>
  )
}