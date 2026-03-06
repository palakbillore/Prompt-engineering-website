// ── Home.jsx ──────────────────────────────────────────
// Landing page: hero, intro copy, and featured topic cards
// ─────────────────────────────────────────────────────
import React from 'react'
import { Link } from 'react-router-dom'
import TopicCard from '../components/TopicCard.jsx'

// Featured topic cards
const TOPICS = [
  {
    icon: '📖',
    title: 'Introduction',
    description: 'Understand what prompt engineering is and why it has become a critical skill in the AI era.',
    path: '/introduction',
    badge: 'Start Here',
    badgeColor: 'emerald',
    delay: 100,
  },
  {
    icon: '🧠',
    title: 'Core Concepts',
    description: 'Master the fundamentals: tokens, context windows, temperature, and how LLMs process your input.',
    path: '/concepts',
    badge: 'Fundamentals',
    badgeColor: 'amber',
    delay: 150,
  },
  {
    icon: '⚡',
    title: 'Prompting Techniques',
    description: 'Explore zero-shot, few-shot, chain-of-thought, role prompting, and more advanced strategies.',
    path: '/techniques',
    badge: 'Popular',
    badgeColor: 'rose',
    delay: 200,
  },
  {
    icon: '💡',
    title: 'Prompt Examples',
    description: 'Real-world examples comparing good vs bad prompts across coding, writing, and reasoning tasks.',
    path: '/examples',
    badge: 'Hands-on',
    badgeColor: 'blue',
    delay: 250,
  },
  {
    icon: '✅',
    title: 'Best Practices',
    description: 'Proven tips, common pitfalls, and optimization strategies for writing reliable prompts.',
    path: '/best-practices',
    badgeColor: 'amber',
    delay: 300,
  },
  {
    icon: '📚',
    title: 'Resources',
    description: 'Curated books, articles, playgrounds, and communities to continue your learning journey.',
    path: '/resources',
    badgeColor: 'emerald',
    delay: 350,
  },
]

// Statistics bar
const STATS = [
  { value: '6', label: 'Comprehensive Modules' },
  { value: '20+', label: 'Techniques Covered' },
  { value: '50+', label: 'Prompt Examples' },
  { value: '100%', label: 'Free to Learn' },
]

export default function Home() {
  return (
    <div>
      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden
                           bg-gradient-to-br from-ink-900 via-ink-800 to-ink-950
                           dark:from-ink-950 dark:via-ink-900 dark:to-ink-950">
        {/* Decorative grid pattern */}
        <div className="absolute inset-0 opacity-[0.04]"
             style={{
               backgroundImage: `linear-gradient(to right, #f59e0b 1px, transparent 1px),
                                  linear-gradient(to bottom, #f59e0b 1px, transparent 1px)`,
               backgroundSize: '40px 40px',
             }} />

        {/* Glowing amber orb */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2
                        w-96 h-96 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />

        <div className="page-container relative py-20 md:py-28 lg:py-32 text-center">
          {/* Eyebrow label */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                          bg-amber-400/15 border border-amber-400/30 mb-6
                          animate-fade-up" style={{ animationFillMode: 'both' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse-slow" />
            <span className="text-xs font-display font-600 text-amber-400 tracking-wider uppercase">
              The Definitive Guide
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display font-800 text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl
                         leading-[1.1] tracking-tight mb-6
                         animate-fade-up animation-delay-100"
              style={{ animationFillMode: 'both', opacity: 0 }}>
            Master the Art of
            <br />
            <span className="text-amber-400">Prompt Engineering</span>
          </h1>

          {/* Subheading */}
          <p className="max-w-2xl mx-auto text-ink-300 text-lg md:text-xl leading-relaxed mb-8
                        animate-fade-up animation-delay-200"
             style={{ animationFillMode: 'both', opacity: 0 }}>
            Learn how to communicate with AI systems effectively. From core concepts to
            advanced techniques — everything you need to get better results from LLMs.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3
                          animate-fade-up animation-delay-300"
               style={{ animationFillMode: 'both', opacity: 0 }}>
            <Link to="/introduction" className="btn-primary text-base px-6 py-3">
              Start Learning
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link to="/examples" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl
                                             text-base font-display font-600
                                             border border-ink-600 text-ink-300
                                             hover:border-ink-400 hover:text-white
                                             transition-all duration-200">
              See Examples
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="bg-amber-400">
        <div className="page-container py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {STATS.map((stat, i) => (
              <div key={i} className="py-2">
                <div className="font-display font-800 text-ink-950 text-2xl">{stat.value}</div>
                <div className="font-body text-xs text-ink-800 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What is Prompt Engineering ── */}
      <section className="page-container py-16 md:py-20">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="font-display font-700 text-3xl md:text-4xl text-ink-900 dark:text-ink-50 mb-4">
            What is Prompt Engineering?
          </h2>
          <p className="text-ink-500 dark:text-ink-400 text-lg leading-relaxed">
            Prompt engineering is the discipline of crafting inputs to AI language models to
            produce desired outputs. It bridges human intent and machine understanding —
            making it one of the most valuable skills in modern AI development.
          </p>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-3xl mx-auto">
          {[
            { icon: '🎯', title: 'Precision', desc: 'Get exactly the output you need' },
            { icon: '🔄', title: 'Repeatability', desc: 'Build reliable, consistent workflows' },
            { icon: '🚀', title: 'Leverage', desc: 'Multiply your productivity with AI' },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center p-5
                                     bg-white dark:bg-ink-900
                                     border border-ink-200 dark:border-ink-800 rounded-2xl">
              <span className="text-3xl mb-3">{item.icon}</span>
              <h3 className="font-display font-700 text-ink-900 dark:text-ink-50 mb-1">{item.title}</h3>
              <p className="text-sm text-ink-500 dark:text-ink-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured Topics ── */}
      <section className="bg-ink-50 dark:bg-ink-900/50 py-16 md:py-20">
        <div className="page-container">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-display font-600 uppercase tracking-widest
                             text-amber-600 dark:text-amber-400 mb-1">
                Curriculum
              </p>
              <h2 className="font-display font-700 text-2xl md:text-3xl text-ink-900 dark:text-ink-50">
                All Topics
              </h2>
            </div>
            <Link to="/introduction"
                  className="text-sm font-display font-600 text-amber-600 dark:text-amber-400
                             hover:underline hidden sm:block">
              Start from beginning →
            </Link>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TOPICS.map((topic, i) => (
              <TopicCard key={i} {...topic} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="page-container py-16 md:py-20">
        <div className="relative overflow-hidden rounded-3xl
                        bg-gradient-to-r from-ink-900 to-ink-800
                        dark:from-ink-800 dark:to-ink-900
                        px-8 py-12 md:py-16 text-center">
          {/* Decorative dot grid */}
          <div className="absolute inset-0 opacity-[0.06]"
               style={{
                 backgroundImage: 'radial-gradient(circle, #f59e0b 1.5px, transparent 1.5px)',
                 backgroundSize: '24px 24px',
               }} />
          <div className="relative">
            <h2 className="font-display font-800 text-white text-3xl md:text-4xl mb-4">
              Ready to become a prompt engineer?
            </h2>
            <p className="text-ink-300 text-lg mb-7 max-w-lg mx-auto">
              Start with the fundamentals and work your way through each module at your own pace.
            </p>
            <Link to="/introduction" className="btn-primary text-base px-7 py-3">
              Begin the Course
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}