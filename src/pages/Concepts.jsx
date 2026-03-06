// ── Concepts.jsx ──────────────────────────────────────
// Core concepts: Prompts, Tokens, Context, Temperature,
// System vs User prompts
// ─────────────────────────────────────────────────────
import React from 'react'
import { Link } from 'react-router-dom'
import { FiHash, FiMaximize2, FiThermometer, FiZap, FiCheckCircle, FiTool, FiUser } from 'react-icons/fi'
import ArticleLayout from '../components/ArticleLayout.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

const TOC = [
  { id: 'prompts',       label: 'Prompts',              level: 2 },
  { id: 'tokens',        label: 'Tokens',               level: 2 },
  { id: 'context',       label: 'Context Window',       level: 2 },
  { id: 'temperature',   label: 'Temperature',          level: 2 },
  { id: 'system-user',   label: 'System vs User Prompts', level: 2 },
]

// Concept card sub-component
function ConceptCard({ title, icon: Icon, children }) {
  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-ink-900
                    border border-ink-200 dark:border-ink-800 mb-5">
      <div className="flex items-center gap-2 mb-3">
        {Icon && (
          <span className="text-xl">
            <Icon />
          </span>
        )}
        <h3 className="font-display font-700 text-ink-900 dark:text-ink-50">{title}</h3>
      </div>
      {children}
    </div>
  )
}

export default function Concepts() {
  return (
    <ArticleLayout
      title="Core Concepts of Prompt Engineering"
      section="Fundamentals"
      toc={TOC}
    >
      <p>
        Before mastering prompt engineering techniques, you must understand the fundamental
        concepts that govern how AI language models interpret and respond to your inputs.
        These building blocks will inform every prompting decision you make.
      </p>

      {/* ── Prompts ── */}
      <section id="prompts">
        <h2>Prompts</h2>
        <p>
          A <strong>prompt</strong> is the text input you send to an AI language model to elicit
          a response. It is your primary interface for communicating intent to the model.
          Prompts can range from a single word to thousands of words containing detailed
          instructions, context, examples, and constraints.
        </p>

        <p>Prompts typically contain one or more of these elements:</p>
        <ul>
          <li><strong>Instruction</strong> — What task you want the model to perform</li>
          <li><strong>Context</strong> — Background information to improve accuracy</li>
          <li><strong>Input data</strong> — The specific content to process</li>
          <li><strong>Output format</strong> — How you want the response structured</li>
          <li><strong>Examples</strong> — Demonstrations of the desired behavior (few-shot)</li>
        </ul>

        <CodeBlock
          label="anatomy-of-a-prompt.txt"
          code={`[INSTRUCTION]
Summarize the following customer feedback in 2 sentences.
Focus on the main complaint and the suggested improvement.

[CONTEXT]
This feedback is from a SaaS product review platform.

[INPUT DATA]
"I've been using your tool for 6 months and love the dashboard,
but the export feature keeps crashing whenever I try to export
more than 500 rows. Please fix the export limit or at least
give us a progress indicator."

[OUTPUT FORMAT]
Return: Main complaint | Suggested improvement`}
        />

        <div className="highlight-box">
          <p className="text-sm">
            <strong>
              <FiZap className="inline-block mr-2 text-amber-500" />
              Tip:
            </strong>{' '}
            Not every prompt needs all four elements — start minimal
            and add elements only when output quality is insufficient.
          </p>
        </div>
      </section>

      {/* ── Tokens ── */}
      <section id="tokens">
        <h2>Tokens</h2>
        <p>
          Language models don't process text character by character or word by word — they use
          <strong> tokens</strong>. A token is a chunk of text that can be a whole word, a partial
          word, punctuation, or whitespace. Tokenization is the process of converting text into
          these chunks before the model processes it.
        </p>

        <ConceptCard title="Token Examples" icon={FiHash}>
          <div className="font-mono text-sm space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-ink-500 dark:text-ink-400 text-xs">Input:</span>
              <span className="text-ink-800 dark:text-ink-100">"Hello, world!"</span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-ink-500 dark:text-ink-400 text-xs">Tokens:</span>
              {['Hello', ',', ' world', '!'].map((t, i) => (
                <span key={i} className="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-900/40
                                          text-amber-800 dark:text-amber-300 text-xs border border-amber-200 dark:border-amber-800">
                  {t}
                </span>
              ))}
              <span className="text-ink-400 text-xs">= 4 tokens</span>
            </div>
          </div>
        </ConceptCard>

        <p>Why tokens matter for prompt engineers:</p>
        <ul>
          <li>
            <strong>Cost:</strong> Most AI APIs charge per token (input + output combined).
            Longer prompts cost more money.
          </li>
          <li>
            <strong>Context limits:</strong> Models have a maximum token limit per request.
            Exceeding it truncates your input or causes errors.
          </li>
          <li>
            <strong>Rules of thumb:</strong> 1 token ≈ 4 characters ≈ ¾ of a word.
            1,000 tokens ≈ 750 words.
          </li>
        </ul>

        <div className="highlight-box">
          <p className="text-sm">
            <strong>
              <FiZap className="inline-block mr-2 text-amber-500" />
              Tip:
            </strong>{' '}
            Use OpenAI's Tokenizer or Anthropic's token counter to
            estimate token usage before deploying prompts in production.
          </p>
        </div>
      </section>

      {/* ── Context ── */}
      <section id="context">
        <h2>Context Window</h2>
        <p>
          The <strong>context window</strong> (also called context length) is the maximum number
          of tokens a model can process in a single request — including both your input prompt
          and the model's output. Think of it as the model's working memory.
        </p>

        <ConceptCard title="Context Window Sizes (2024)" icon={FiMaximize2}>
          <div className="space-y-2 text-sm">
            {[
              { model: 'GPT-4o',        tokens: '128K tokens', note: '~96,000 words' },
              { model: 'Claude 3.5 Sonnet', tokens: '200K tokens', note: '~150,000 words' },
              { model: 'Gemini 1.5 Pro', tokens: '1M tokens',  note: '~750,000 words' },
            ].map((m, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="font-medium text-ink-800 dark:text-ink-200">{m.model}</span>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-amber-600 dark:text-amber-400">{m.tokens}</span>
                  <span className="text-ink-400 dark:text-ink-500">{m.note}</span>
                </div>
              </div>
            ))}
          </div>
        </ConceptCard>

        <p>
          Context management is crucial: if a conversation or document exceeds the context window,
          older content is truncated. Smart context management strategies include:
        </p>
        <ul>
          <li>Summarizing earlier conversation turns before continuing</li>
          <li>Using retrieval-augmented generation (RAG) to inject only relevant chunks</li>
          <li>Chunking long documents and processing them in parts</li>
        </ul>
      </section>

      {/* ── Temperature ── */}
      <section id="temperature">
        <h2>Temperature</h2>
        <p>
          <strong>Temperature</strong> is a model hyperparameter (usually settable via API) that
          controls the randomness of the model's outputs. It typically ranges from 0 to 2.
        </p>

        <ConceptCard title="Temperature Scale" icon={FiThermometer}>
          <div className="space-y-3 text-sm">
            {[
              { val: '0.0', label: 'Deterministic', color: 'bg-blue-400', desc: 'Always picks the most likely next token. Best for factual Q&A, extraction.' },
              { val: '0.7', label: 'Balanced', color: 'bg-amber-400', desc: 'Good default. Mix of creativity and accuracy. Suits most use cases.' },
              { val: '1.5+', label: 'Creative', color: 'bg-rose-400', desc: 'High randomness. Can produce surprising or incoherent outputs. Best for creative writing.' },
            ].map((t, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`w-1.5 h-full min-h-[2.5rem] rounded-full ${t.color} shrink-0 mt-1`} />
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <code className="text-xs font-mono bg-ink-100 dark:bg-ink-800 px-1.5 py-0.5 rounded">{t.val}</code>
                    <span className="font-medium text-ink-800 dark:text-ink-200">{t.label}</span>
                  </div>
                  <p className="text-ink-500 dark:text-ink-400">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </ConceptCard>

        <div className="highlight-box">
          <p className="text-sm">
            <strong>
              <FiZap className="inline-block mr-2 text-amber-500" />
              Tip:
            </strong>{' '}
            For production applications requiring consistency (like data
            extraction or classification), use temperature=0. For brainstorming or creative tasks,
            try 0.7–1.0.
          </p>
        </div>
      </section>

      {/* ── System vs User Prompts ── */}
      <section id="system-user">
        <h2>System vs User Prompts</h2>
        <p>
          Modern LLM APIs distinguish between different types of messages in a conversation.
          The most important distinction is between the <strong>system prompt</strong> and
          the <strong>user prompt</strong>.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-5">
          <div className="p-4 rounded-xl border-2 border-amber-300 dark:border-amber-700
                          bg-amber-50 dark:bg-amber-900/20">
            <h4 className="font-display font-700 text-ink-900 dark:text-ink-100 mb-2 flex items-center gap-2">
              <FiTool />
              <span>System Prompt</span>
            </h4>
            <p className="text-sm text-ink-600 dark:text-ink-300 mb-3">
              Sent once at the beginning. Sets the AI's persona, rules, capabilities, and
              behavioral constraints. The user typically doesn't see this.
            </p>
            <p className="text-xs font-mono text-ink-500 dark:text-ink-400">
              Role: <code>system</code>
            </p>
          </div>
          <div className="p-4 rounded-xl border-2 border-ink-300 dark:border-ink-700
                          bg-ink-50 dark:bg-ink-800/50">
            <h4 className="font-display font-700 text-ink-900 dark:text-ink-100 mb-2 flex items-center gap-2">
              <FiUser />
              <span>User Prompt</span>
            </h4>
            <p className="text-sm text-ink-600 dark:text-ink-300 mb-3">
              The actual message from the user in each conversation turn. This is what
              the end user types or your application generates dynamically.
            </p>
            <p className="text-xs font-mono text-ink-500 dark:text-ink-400">
              Role: <code>user</code>
            </p>
          </div>
        </div>

        <CodeBlock
          label="api-message-structure.json"
          code={`{
  "model": "claude-sonnet-4-20250514",
  "system": "You are a helpful coding assistant specializing in Python.
             Always explain your code with comments.
             Never write code with security vulnerabilities.",
  "messages": [
    {
      "role": "user",
      "content": "Write a function to validate an email address."
    }
  ]
}`}
        />

        <div className="highlight-box-success">
          <p className="text-sm">
            <strong>
              <FiCheckCircle className="inline-block mr-2 text-emerald-500" />
              Best Practice:
            </strong>{' '}
            Put stable instructions (persona, rules, output format)
            in the system prompt. Keep user prompts focused on the dynamic input/task. This makes
            your application easier to maintain and improves consistency.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/techniques" className="btn-primary">Continue to Techniques →</Link>
          <Link to="/introduction" className="btn-secondary">← Back to Introduction</Link>
        </div>
      </section>
    </ArticleLayout>
  )
}