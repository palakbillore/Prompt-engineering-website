// ── CodeBlock.jsx ─────────────────────────────────────
// Syntax-highlighted prompt/code block with copy button
// ─────────────────────────────────────────────────────
import React, { useState } from 'react'

export default function CodeBlock({ code, label, language = 'prompt' }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="my-5 rounded-xl overflow-hidden border border-ink-700 dark:border-ink-800">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2
                      bg-ink-800 dark:bg-ink-950
                      border-b border-ink-700 dark:border-ink-800">
        <div className="flex items-center gap-2">
          {/* Traffic light dots */}
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
          {label && (
            <span className="ml-2 text-xs font-mono text-ink-400">{label}</span>
          )}
        </div>
        {/* Copy button */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs font-mono
                     text-ink-400 hover:text-ink-200 transition-colors"
        >
          {copied ? (
            <>
              <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>

      {/* Code content */}
      <pre className="bg-ink-900 dark:bg-ink-950 text-ink-100 px-5 py-4
                      overflow-x-auto font-mono text-sm leading-6 whitespace-pre-wrap">
        <code>{code}</code>
      </pre>
    </div>
  )
}