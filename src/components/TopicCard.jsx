// ── TopicCard.jsx ─────────────────────────────────────
// Reusable card component for displaying topic previews
// on the home page and throughout the portal.
// ─────────────────────────────────────────────────────
import React from 'react'
import { Link } from 'react-router-dom'

export default function TopicCard({
  icon,
  title,
  description,
  path,
  badge,
  badgeColor = 'amber', // 'amber' | 'emerald' | 'rose' | 'blue'
  delay = 0,
}) {
  const badgeStyles = {
    amber:   'bg-amber-100  dark:bg-amber-900/40  text-amber-700  dark:text-amber-400',
    emerald: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400',
    rose:    'bg-rose-100   dark:bg-rose-900/40    text-rose-700   dark:text-rose-400',
    blue:    'bg-blue-100   dark:bg-blue-900/40    text-blue-700   dark:text-blue-400',
  }

  return (
    <Link
      to={path}
      className="group block p-5 rounded-2xl border border-ink-200 dark:border-ink-800
                 bg-white dark:bg-ink-900
                 hover:border-amber-300 dark:hover:border-amber-700
                 hover:shadow-md dark:hover:shadow-ink-950/50
                 transition-all duration-250 hover:-translate-y-1
                 animate-fade-up animate-fade-up-initial"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      {/* Icon */}
      <div className="w-11 h-11 rounded-xl bg-ink-100 dark:bg-ink-800
                      flex items-center justify-center mb-3.5
                      group-hover:bg-amber-100 dark:group-hover:bg-amber-900/30
                      transition-colors duration-200">
        <span className="text-xl">{icon}</span>
      </div>

      {/* Header row */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-display font-700 text-ink-900 dark:text-ink-50
                       text-base leading-snug group-hover:text-amber-600 dark:group-hover:text-amber-400
                       transition-colors duration-200">
          {title}
        </h3>
        {badge && (
          <span className={`badge shrink-0 ${badgeStyles[badgeColor]}`}>
            {badge}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-sm text-ink-500 dark:text-ink-400 leading-relaxed line-clamp-2">
        {description}
      </p>

      {/* Arrow indicator */}
      <div className="mt-3 flex items-center gap-1 text-xs font-display font-600
                      text-amber-600 dark:text-amber-400 opacity-0 group-hover:opacity-100
                      transition-opacity duration-200 -translate-x-1 group-hover:translate-x-0
                      transform duration-200">
        Read more
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  )
}