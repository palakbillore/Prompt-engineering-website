// ── SearchBar.jsx ─────────────────────────────────────
// Frontend-only search bar. Filters topics and shows
// a dropdown of matching results with navigation.
// ─────────────────────────────────────────────────────
import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// Search index — all searchable topics across the site
const SEARCH_INDEX = [
  // Introduction
  { title: 'What is Prompt Engineering?', path: '/introduction', section: 'Introduction' },
  { title: 'Why Prompt Engineering Matters', path: '/introduction', section: 'Introduction' },
  { title: 'Applications in AI Systems', path: '/introduction', section: 'Introduction' },
  // Concepts
  { title: 'Prompts', path: '/concepts', section: 'Concepts' },
  { title: 'Tokens & Tokenization', path: '/concepts', section: 'Concepts' },
  { title: 'Context Window', path: '/concepts', section: 'Concepts' },
  { title: 'Temperature & Sampling', path: '/concepts', section: 'Concepts' },
  { title: 'System vs User Prompts', path: '/concepts', section: 'Concepts' },
  // Techniques
  { title: 'Zero-Shot Prompting', path: '/techniques', section: 'Techniques' },
  { title: 'Few-Shot Prompting', path: '/techniques', section: 'Techniques' },
  { title: 'Chain-of-Thought Prompting', path: '/techniques', section: 'Techniques' },
  { title: 'Role Prompting', path: '/techniques', section: 'Techniques' },
  { title: 'Instruction Prompting', path: '/techniques', section: 'Techniques' },
  // Examples
  { title: 'Good vs Bad Prompts', path: '/examples', section: 'Examples' },
  { title: 'Code Generation Prompts', path: '/examples', section: 'Examples' },
  { title: 'Creative Writing Prompts', path: '/examples', section: 'Examples' },
  // Best Practices
  { title: 'Writing Better Prompts', path: '/best-practices', section: 'Best Practices' },
  { title: 'Common Mistakes', path: '/best-practices', section: 'Best Practices' },
  { title: 'Prompt Optimization', path: '/best-practices', section: 'Best Practices' },
  // Resources
  { title: 'Books & Articles', path: '/resources', section: 'Resources' },
  { title: 'AI Tools & Playgrounds', path: '/resources', section: 'Resources' },
  { title: 'Learning Resources', path: '/resources', section: 'Resources' },
]

export default function SearchBar({ compact = false, onSelect }) {
  const [query, setQuery]       = useState('')
  const [focused, setFocused]   = useState(false)
  const [results, setResults]   = useState([])
  const [activeIdx, setActiveIdx] = useState(-1)
  const inputRef  = useRef(null)
  const wrapRef   = useRef(null)
  const navigate  = useNavigate()

  // Filter search index on query change
  useEffect(() => {
    if (query.trim().length < 1) { setResults([]); return }
    const q = query.toLowerCase()
    const matches = SEARCH_INDEX.filter(item =>
      item.title.toLowerCase().includes(q) ||
      item.section.toLowerCase().includes(q)
    ).slice(0, 7)
    setResults(matches)
    setActiveIdx(-1)
  }, [query])

  // Close dropdown on outside click
  useEffect(() => {
    const handler = e => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setFocused(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleSelect = (item) => {
    navigate(item.path)
    setQuery('')
    setFocused(false)
    onSelect?.()
  }

  const handleKeyDown = (e) => {
    if (!results.length) return
    if (e.key === 'ArrowDown')  { e.preventDefault(); setActiveIdx(i => Math.min(i + 1, results.length - 1)) }
    if (e.key === 'ArrowUp')    { e.preventDefault(); setActiveIdx(i => Math.max(i - 1, 0)) }
    if (e.key === 'Enter' && activeIdx >= 0) handleSelect(results[activeIdx])
    if (e.key === 'Escape') { setFocused(false); setQuery('') }
  }

  const showDropdown = focused && (results.length > 0 || query.length > 0)

  return (
    <div ref={wrapRef} className={`relative ${compact ? 'w-48 lg:w-56' : 'w-full'}`}>
      {/* Input */}
      <div className="relative">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400 pointer-events-none"
             fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search topics…"
          className="w-full pl-9 pr-3 py-2 rounded-xl text-sm font-body
                     bg-ink-100 dark:bg-ink-800
                     text-ink-800 dark:text-ink-100
                     placeholder-ink-400 dark:placeholder-ink-500
                     border border-transparent
                     focus:outline-none focus:border-amber-400 dark:focus:border-amber-500
                     transition-colors duration-200"
        />
        {/* Clear button */}
        {query && (
          <button
            onClick={() => { setQuery(''); inputRef.current?.focus() }}
            className="absolute right-2 top-1/2 -translate-y-1/2
                       text-ink-400 hover:text-ink-600 dark:hover:text-ink-200 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-1.5 z-50
                        bg-white dark:bg-ink-800
                        border border-ink-200 dark:border-ink-700
                        rounded-xl shadow-lg overflow-hidden
                        animate-fade-in">
          {results.length === 0 ? (
            <div className="px-4 py-3 text-sm text-ink-500 dark:text-ink-400 font-body">
              No results for "<span className="font-medium">{query}</span>"
            </div>
          ) : (
            <ul>
              {results.map((item, i) => (
                <li key={i}>
                  <button
                    onMouseDown={() => handleSelect(item)}
                    className={`w-full text-left px-4 py-2.5 flex items-center gap-3 transition-colors
                                ${i === activeIdx
                                  ? 'bg-amber-50 dark:bg-amber-900/30'
                                  : 'hover:bg-ink-50 dark:hover:bg-ink-700'}`}
                  >
                    <svg className="w-3.5 h-3.5 text-amber-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <div>
                      <div className="text-sm font-medium text-ink-800 dark:text-ink-100 font-body">
                        {item.title}
                      </div>
                      <div className="text-xs text-ink-500 dark:text-ink-400 font-body">
                        {item.section}
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}