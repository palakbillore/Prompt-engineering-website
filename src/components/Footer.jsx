// ── Footer.jsx ────────────────────────────────────────
// Site footer with logo, navigation links, and credits
// ─────────────────────────────────────────────────────
import React from 'react'
import { Link } from 'react-router-dom'

const FOOTER_LINKS = [
  { label: 'Introduction',   path: '/introduction' },
  { label: 'Concepts',       path: '/concepts' },
  { label: 'Techniques',     path: '/techniques' },
  { label: 'Examples',       path: '/examples' },
  { label: 'Best Practices', path: '/best-practices' },
  { label: 'Resources',      path: '/resources' },
]

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-ink-200 dark:border-ink-800
                       bg-white dark:bg-ink-900">
      <div className="page-container py-10">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">

          {/* Brand */}
          <div className="max-w-xs">
            <Link to="/" className="flex items-center gap-2 mb-3 group">
              <div className="w-7 h-7 rounded-md bg-amber-400 flex items-center justify-center
                              group-hover:scale-105 transition-transform">
                <span className="font-display font-800 text-ink-950 text-xs">P</span>
              </div>
              <span className="font-display font-700 text-ink-900 dark:text-ink-50">
                Prompt<span className="text-amber-500">Craft</span>
              </span>
            </Link>
            <p className="text-sm text-ink-500 dark:text-ink-400 leading-relaxed">
              The definitive guide to mastering prompt engineering for AI language models.
            </p>
          </div>

          {/* Nav links */}
          <div>
            <p className="text-xs font-display font-600 uppercase tracking-widest
                           text-ink-400 dark:text-ink-500 mb-3">
              Topics
            </p>
            <div className="grid grid-cols-2 gap-x-8 gap-y-1.5">
              {FOOTER_LINKS.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-sm text-ink-500 dark:text-ink-400
                             hover:text-amber-600 dark:hover:text-amber-400
                             transition-colors duration-150 font-body"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-5 border-t border-ink-100 dark:border-ink-800
                        flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-ink-400 dark:text-ink-500 font-body">
            © {new Date().getFullYear()} PromptCraft. Built for learners everywhere.
          </p>
          <p className="text-xs text-ink-400 dark:text-ink-500 font-body">
            React · Vite · Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  )
}