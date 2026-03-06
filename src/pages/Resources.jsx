// ── Resources.jsx ─────────────────────────────────────
// Curated books, articles, tools, and learning resources
// ─────────────────────────────────────────────────────
import React from 'react'
import { Link } from 'react-router-dom'
import {
  FiBookOpen,
  FiCpu,
  FiZap,
  FiActivity,
  FiTool,
  FiGrid,
  FiBarChart2,
  FiAward,
  FiClipboard,
  FiMessageCircle,
  FiTwitter,
  FiMail,
} from 'react-icons/fi'
import ArticleLayout from '../components/ArticleLayout.jsx'

const TOC = [
  { id: 'books',     label: 'Books & Papers',       level: 2 },
  { id: 'tools',     label: 'Tools & Playgrounds',  level: 2 },
  { id: 'courses',   label: 'Courses & Guides',     level: 2 },
  { id: 'community', label: 'Community & Practice', level: 2 },
]

function ResourceCard({ icon: Icon, title, description, tag, tagColor = 'amber', href }) {
  const colors = {
    amber:   'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400',
    emerald: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400',
    rose:    'bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-400',
    blue:    'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400',
    purple:  'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-400',
  }

  const content = (
    <div className="flex items-start gap-3 p-4 rounded-2xl
                    bg-white dark:bg-ink-900
                    border border-ink-200 dark:border-ink-800
                    hover:border-amber-300 dark:hover:border-amber-700
                    hover:shadow-sm transition-all duration-200
                    group cursor-pointer">
      <span className="text-2xl mt-0.5">
        {Icon && <Icon />}
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h4 className="font-display font-600 text-ink-900 dark:text-ink-50
                         group-hover:text-amber-600 dark:group-hover:text-amber-400
                         transition-colors text-sm leading-snug">
            {title}
          </h4>
          {tag && (
            <span className={`badge shrink-0 text-xs ${colors[tagColor]}`}>{tag}</span>
          )}
        </div>
        <p className="text-xs text-ink-500 dark:text-ink-400 leading-relaxed">{description}</p>
      </div>
      {href && (
        <svg className="w-4 h-4 text-ink-400 group-hover:text-amber-500 transition-colors shrink-0 mt-1"
             fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      )}
    </div>
  )

  return href ? <a href={href} target="_blank" rel="noopener noreferrer">{content}</a> : content
}

export default function Resources() {
  return (
    <ArticleLayout
      title="Resources"
      section="Advanced"
      toc={TOC}
    >
      <p>
        Prompt engineering is a rapidly evolving field. These carefully curated resources will
        deepen your understanding, keep you current with research, and connect you with the
        practitioner community.
      </p>

      {/* ── Books & Papers ── */}
      <section id="books">
        <h2>Books & Papers</h2>
        <p>Essential reading for understanding the research foundations:</p>

        <div className="space-y-3 my-4">
          <ResourceCard
            icon={FiBookOpen}
            title="Chain-of-Thought Prompting Elicits Reasoning in Large Language Models"
            description="The landmark 2022 Google Research paper by Wei et al. that introduced chain-of-thought prompting. Essential reading for understanding why CoT works."
            tag="Research Paper"
            tagColor="blue"
            href="https://arxiv.org/abs/2201.11903"
          />
          <ResourceCard
            icon={FiBookOpen}
            title="Large Language Models are Zero-Shot Reasoners"
            description="Kojima et al. (2022) — introduces the 'Let's think step by step' technique, showing zero-shot chain-of-thought is possible without examples."
            tag="Research Paper"
            tagColor="blue"
            href="https://arxiv.org/abs/2205.11916"
          />
          <ResourceCard
            icon={FiBookOpen}
            title="Pre-train, Prompt, and Predict"
            description="A systematic survey of prompting methods by Liu et al. Comprehensive academic reference covering the full history and taxonomy of prompting techniques."
            tag="Survey Paper"
            tagColor="purple"
            href="https://arxiv.org/abs/2107.13586"
          />
          <ResourceCard
            icon={FiBookOpen}
            title="The Art of Prompt Engineering"
            description="Practical book covering prompt design patterns for business applications. Covers RAG, agents, evaluation, and real-world deployment considerations."
            tag="Book"
            tagColor="amber"
          />
          <ResourceCard
            icon={FiBookOpen}
            title="Prompt Engineering Guide (DAIR.AI)"
            description="Free, comprehensive open-source guide maintained by DAIR.AI. Covers all major techniques with examples across GPT, Claude, and open-source models."
            tag="Free Guide"
            tagColor="emerald"
            href="https://www.promptingguide.ai"
          />
        </div>
      </section>

      {/* ── Tools ── */}
      <section id="tools">
        <h2>Tools & Playgrounds</h2>
        <p>Interactive environments to practice and test your prompts:</p>

        <div className="space-y-3 my-4">
          <ResourceCard
            icon={FiCpu}
            title="Claude.ai"
            description="Anthropic's Claude — excellent for long-context tasks, analysis, and coding. Free tier available. Offers Workspaces for team collaboration."
            tag="Freemium"
            tagColor="amber"
            href="https://claude.ai"
          />
          <ResourceCard
            icon={FiZap}
            title="OpenAI Playground"
            description="Full-featured interface for experimenting with GPT models. Lets you adjust all parameters (temperature, top-p, max tokens) and compare model outputs."
            tag="API Required"
            tagColor="blue"
            href="https://platform.openai.com/playground"
          />
          <ResourceCard
            icon={FiActivity}
            title="Google AI Studio"
            description="Free playground for Gemini models with generous free tier. Great for multimodal prompting (text + images). Exports directly to code."
            tag="Free"
            tagColor="emerald"
            href="https://aistudio.google.com"
          />
          <ResourceCard
            icon={FiTool}
            title="PromptBase"
            description="Marketplace for buying and selling high-quality prompts. Browse what others have built to get inspiration and understand market-value prompt patterns."
            tag="Marketplace"
            tagColor="purple"
            href="https://promptbase.com"
          />
          <ResourceCard
            icon={FiGrid}
            title="Tiktoken — Token Counter"
            description="OpenAI's official tokenizer library. Use the web version to estimate token counts for your prompts before running them against the API."
            tag="Free Tool"
            tagColor="emerald"
            href="https://platform.openai.com/tokenizer"
          />
          <ResourceCard
            icon={FiBarChart2}
            title="PromptLayer"
            description="Observability platform for LLM applications. Log, analyze, and A/B test prompts in production. Track costs, latency, and quality metrics."
            tag="Freemium"
            tagColor="amber"
            href="https://promptlayer.com"
          />
        </div>
      </section>

      {/* ── Courses ── */}
      <section id="courses">
        <h2>Courses & Guides</h2>

        <div className="space-y-3 my-4">
          <ResourceCard
            icon={FiAward}
            title="DeepLearning.AI — Prompt Engineering for Developers"
            description="Free short course by Andrew Ng and Isa Fulford (OpenAI). Best intro for developers. Covers all major techniques with live code examples in Python."
            tag="Free"
            tagColor="emerald"
            href="https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/"
          />
          <ResourceCard
            icon={FiClipboard}
            title="Anthropic's Prompt Engineering Documentation"
            description="Official documentation on how to prompt Claude effectively. Covers Claude-specific behaviors, the ScratchPad technique, and production best practices."
            tag="Official Docs"
            tagColor="amber"
            href="https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview"
          />
          <ResourceCard
            icon={FiBookOpen}
            title="Learn Prompting"
            description="Free, open-source course covering beginner through advanced prompting. Community-maintained with contributions from researchers and practitioners."
            tag="Free"
            tagColor="emerald"
            href="https://learnprompting.org"
          />
          <ResourceCard
            icon={FiTool}
            title="Hugging Face — Prompt Engineering with LLMs"
            description="Hands-on course using open-source models. Great if you want to understand the internals and work with Llama, Mistral, and other open models."
            tag="Free"
            tagColor="emerald"
            href="https://huggingface.co/learn/cookbook"
          />
        </div>
      </section>

      {/* ── Community ── */}
      <section id="community">
        <h2>Community & Practice</h2>
        <p>Stay connected with the prompt engineering community:</p>

        <div className="space-y-3 my-4">
          <ResourceCard
            icon={FiMessageCircle}
            title="r/PromptEngineering"
            description="Active subreddit with over 100k members sharing prompts, techniques, and research. Good source of practical, field-tested prompting strategies."
            tag="Community"
            tagColor="rose"
            href="https://reddit.com/r/PromptEngineering"
          />
          <ResourceCard
            icon={FiTwitter}
            title="Twitter/X — #PromptEngineering"
            description="Follow researchers and practitioners sharing daily discoveries. Key accounts: @deliprao, @goodside, @karpathy, and @AndrewYNg."
            tag="Social"
            tagColor="blue"
          />
          <ResourceCard
            icon={FiMail}
            title="The Prompt Report Newsletter"
            description="Weekly digest of the latest prompt engineering research papers, tool releases, and practical tips. Curated by AI researchers."
            tag="Newsletter"
            tagColor="purple"
          />
        </div>

        {/* Final CTA */}
        <div className="mt-10 p-6 rounded-2xl
                        bg-gradient-to-r from-ink-900 to-ink-800
                        dark:from-ink-800 dark:to-ink-900
                        text-center">
          <h3 className="font-display font-700 text-white text-xl mb-2 flex items-center justify-center gap-2">
            <FiAward className="text-amber-400" />
            <span>You've covered the essentials!</span>
          </h3>
          <p className="text-ink-300 text-sm mb-5 max-w-md mx-auto">
            Now it's time to practice. Open any AI playground and start applying
            what you've learned. The best prompt engineers are those who experiment relentlessly.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/examples"      className="btn-primary">Review Examples</Link>
            <Link to="/best-practices" className="btn-secondary text-ink-300 border-ink-600">
              Best Practices
            </Link>
          </div>
        </div>
      </section>
    </ArticleLayout>
  )
}