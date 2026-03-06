// ── Introduction.jsx ──────────────────────────────────
// Introduction to Prompt Engineering:
// What it is, why it matters, applications
// ─────────────────────────────────────────────────────
import React from 'react'
import { Link } from 'react-router-dom'
import { FiZap, FiCheckCircle, FiCpu, FiEdit3, FiSearch, FiMessageSquare, FiImage, FiBarChart2 } from 'react-icons/fi'
import ArticleLayout from '../components/ArticleLayout.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

// Table of contents for this page
const TOC = [
  { id: 'what-is', label: 'What is Prompt Engineering?', level: 2 },
  { id: 'why-matters', label: 'Why It Matters', level: 2 },
  { id: 'applications', label: 'Applications', level: 2 },
  { id: 'how-llms-work', label: 'How LLMs Process Prompts', level: 2 },
  { id: 'next-steps', label: 'Next Steps', level: 2 },
]

export default function Introduction() {
  return (
    <ArticleLayout
      title="Introduction to Prompt Engineering"
      section="Getting Started"
      toc={TOC}
    >
      {/* ── What is Prompt Engineering ── */}
      <section id="what-is">
        <h2>What is Prompt Engineering?</h2>
        <p>
          <strong>Prompt engineering</strong> is the practice of designing and refining input text
          (called <em>prompts</em>) to guide AI language models toward producing desired, accurate,
          and useful outputs. It sits at the intersection of linguistics, cognitive science, and
          software engineering.
        </p>
        <p>
          Just as a skilled programmer knows which functions to call and how to structure code,
          a prompt engineer knows how to frame questions, provide context, set constraints, and
          structure instructions to get the most out of a large language model (LLM) like
          GPT-4, Claude, or Gemini.
        </p>

        <div className="highlight-box">
          <p className="font-display font-600 text-ink-800 dark:text-ink-100 text-sm mb-1 flex items-center gap-2">
            <FiZap className="text-amber-500" />
            <span>Key Insight</span>
          </p>
          <p className="text-sm">
            Prompt engineering is not about "tricking" the AI — it's about communicating clearly.
            The better your input, the better the output. It's essentially about learning how AI
            models interpret language so you can speak their language fluently.
          </p>
        </div>

        <p>Here's a simple example of the same task expressed as a weak vs strong prompt:</p>

        <CodeBlock
          label="weak-prompt.txt"
          code={`Write something about climate change.`}
        />
        <CodeBlock
          label="strong-prompt.txt"
          code={`You are an environmental science journalist writing for a general audience.
Write a 200-word explainer on the three most significant effects of climate change
observed in the past decade. Use accessible language, include one specific statistic
per effect, and end with a hopeful note about recent progress.`}
        />

        <p>
          Both prompts ask about climate change — but the second one provides context, role,
          length, structure, and tone guidance, which leads to a vastly more useful response.
        </p>
      </section>

      {/* ── Why It Matters ── */}
      <section id="why-matters">
        <h2>Why Prompt Engineering Matters</h2>
        <p>
          As AI models become embedded in every product and workflow, the ability to direct them
          precisely becomes a core professional skill. Prompt engineering matters for several reasons:
        </p>

        <ul>
          <li>
            <strong>Quality of output directly depends on input quality.</strong> LLMs are
            pattern-matching systems — vague inputs produce vague outputs.
          </li>
          <li>
            <strong>Reduces cost and latency.</strong> A well-crafted prompt can achieve in one
            request what a poor prompt requires five back-and-forth turns to accomplish.
          </li>
          <li>
            <strong>Unlocks model capabilities.</strong> Many sophisticated capabilities (step-by-step
            reasoning, structured data extraction, tone adaptation) only emerge with the right
            prompting strategy.
          </li>
          <li>
            <strong>Critical for building AI-powered products.</strong> Every chatbot, AI writing
            tool, and automated pipeline relies on carefully engineered prompts in its system layer.
          </li>
          <li>
            <strong>Increasingly a job requirement.</strong> Roles across engineering, product,
            marketing, and research now list prompt engineering as a key competency.
          </li>
        </ul>

        <div className="highlight-box-success">
          <p className="text-sm font-medium flex items-center gap-2">
            <FiCheckCircle className="text-emerald-500" />
            <span>
              Studies show that optimized prompts can improve model accuracy by 30–60% on complex
              reasoning tasks compared to naive zero-shot prompting.
            </span>
          </p>
        </div>
      </section>

      {/* ── Applications ── */}
      <section id="applications">
        <h2>Applications in AI Systems</h2>
        <p>
          Prompt engineering is applied across a vast range of domains and use cases:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-5">
          {[
            { icon: FiCpu,            title: 'Code Generation',    desc: 'Write, review, refactor, and explain code across languages.' },
            { icon: FiEdit3,          title: 'Content Creation',   desc: 'Drafting articles, emails, social copy, and marketing material.' },
            { icon: FiSearch,         title: 'Data Extraction',    desc: 'Pull structured information from unstructured text.' },
            { icon: FiMessageSquare,  title: 'Chatbots & Agents',  desc: 'Define AI assistant personalities and behavior via system prompts.' },
            { icon: FiImage,          title: 'Image Generation',   desc: 'Prompt engineering for text-to-image models like DALL-E and Midjourney.' },
            { icon: FiBarChart2,      title: 'Analysis & Research', desc: 'Summarize documents, synthesize research, and generate reports.' },
          ].map((app, i) => (
            <div key={i} className="flex items-start gap-3 p-4 rounded-xl
                                     bg-white dark:bg-ink-900
                                     border border-ink-200 dark:border-ink-800">
              <span className="text-2xl mt-0.5">
                <app.icon />
              </span>
              <div>
                <h4 className="font-display font-600 text-ink-900 dark:text-ink-100 mb-0.5">
                  {app.title}
                </h4>
                <p className="text-sm text-ink-500 dark:text-ink-400">{app.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── How LLMs Work ── */}
      <section id="how-llms-work">
        <h2>How LLMs Process Prompts</h2>
        <p>
          Understanding the basics of how LLMs work helps you write better prompts. At a high level:
        </p>
        <ul>
          <li>
            <strong>Tokenization:</strong> Your prompt is split into tokens (roughly word fragments).
            The model processes tokens, not characters or words directly.
          </li>
          <li>
            <strong>Attention:</strong> The model uses attention mechanisms to weigh how relevant
            each token in your prompt is to generating the next token in the response.
          </li>
          <li>
            <strong>Completion:</strong> The model predicts the most statistically likely next
            token, one at a time, until it finishes its response.
          </li>
          <li>
            <strong>Temperature:</strong> This parameter controls how "creative" or "random" the
            completion is. Lower = more deterministic; higher = more varied.
          </li>
        </ul>

        <div className="highlight-box">
          <p className="text-sm">
            <strong>Practical implication:</strong> Because LLMs are completion machines, your
            prompt essentially sets up the beginning of a document that the model will continue.
            Framing your prompt well guides the model to "continue" in the direction you want.
          </p>
        </div>
      </section>

      {/* ── Next Steps ── */}
      <section id="next-steps">
        <h2>Next Steps</h2>
        <p>
          Now that you understand what prompt engineering is, let's dive into the core concepts
          that will form the foundation of your skills.
        </p>
        <div className="flex flex-wrap gap-3 mt-4">
          <Link to="/concepts" className="btn-primary">
            Continue to Core Concepts →
          </Link>
          <Link to="/techniques" className="btn-secondary">
            Jump to Techniques
          </Link>
        </div>
      </section>
    </ArticleLayout>
  )
}