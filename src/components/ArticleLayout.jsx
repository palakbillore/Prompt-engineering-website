// ── ArticleLayout.jsx ─────────────────────────────────
// Shared layout wrapper for article pages:
// Sidebar + main content column with breadcrumb
// ─────────────────────────────────────────────────────
import React from 'react'
import { Link } from 'react-router-dom'
import Sidebar from './Sidebar.jsx'

export default function ArticleLayout({ title, section, toc = [], children }) {
  return (
    <div className="page-container py-8 md:py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-ink-400 dark:text-ink-500 mb-6 font-body">
        <Link to="/" className="hover:text-amber-500 transition-colors">Home</Link>
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-ink-600 dark:text-ink-400">{title}</span>
      </nav>

      {/* Two-column layout: sidebar + article */}
      <div className="flex gap-8 lg:gap-12">
        <Sidebar toc={toc} />

        {/* Article main content */}
        <article className="flex-1 min-w-0">
          {/* Section eyebrow */}
          <p className="text-xs font-display font-600 uppercase tracking-widest
                         text-amber-600 dark:text-amber-400 mb-2">
            {section}
          </p>
          <h1 className="font-display font-800 text-3xl md:text-4xl
                          text-ink-900 dark:text-ink-50 mb-8 leading-tight">
            {title}
          </h1>

          {/* Article body */}
          <div className="prose-custom">
            {children}
          </div>
        </article>
      </div>
    </div>
  )
}