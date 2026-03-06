// ── BestPractices.jsx ─────────────────────────────────
// Tips, common mistakes, and optimization techniques
// ─────────────────────────────────────────────────────
import React from 'react'
import { Link } from 'react-router-dom'
import { FiAlertTriangle, FiXCircle, FiCheckCircle, FiZap } from 'react-icons/fi'
import ArticleLayout from '../components/ArticleLayout.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

const TOC = [
  { id: 'tips',       label: 'Tips for Better Prompts',   level: 2 },
  { id: 'mistakes',   label: 'Common Mistakes',           level: 2 },
  { id: 'optimize',   label: 'Prompt Optimization',       level: 2 },
  { id: 'checklist',  label: 'Pre-Deploy Checklist',      level: 2 },
]

function TipCard({ number, title, children }) {
  return (
    <div className="flex gap-4 p-5 rounded-2xl bg-white dark:bg-ink-900
                    border border-ink-200 dark:border-ink-800 mb-4">
      <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center
                      text-ink-950 font-display font-800 text-sm shrink-0 mt-0.5">
        {number}
      </div>
      <div>
        <h3 className="font-display font-700 text-ink-900 dark:text-ink-50 mb-2">{title}</h3>
        {children}
      </div>
    </div>
  )
}

function MistakeCard({ title, wrong, right }) {
  return (
    <div className="mb-6 rounded-2xl overflow-hidden border border-ink-200 dark:border-ink-800">
      <div className="px-4 py-2.5 bg-ink-50 dark:bg-ink-900 border-b border-ink-200 dark:border-ink-800">
        <p className="text-sm font-display font-700 text-ink-800 dark:text-ink-100 flex items-center gap-2">
          <FiAlertTriangle className="text-amber-500" />
          <span>{title}</span>
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x
                      divide-ink-200 dark:divide-ink-800">
        <div className="p-4 bg-rose-50 dark:bg-rose-900/10">
          <p className="text-xs font-display font-600 text-rose-600 dark:text-rose-400 mb-2 uppercase tracking-wider flex items-center gap-1">
            <FiXCircle className="text-rose-500" />
            <span>Avoid</span>
          </p>
          <p className="font-mono text-sm text-ink-700 dark:text-ink-300 whitespace-pre-wrap">{wrong}</p>
        </div>
        <div className="p-4 bg-emerald-50 dark:bg-emerald-900/10">
          <p className="text-xs font-display font-600 text-emerald-600 dark:text-emerald-400 mb-2 uppercase tracking-wider flex items-center gap-1">
            <FiCheckCircle className="text-emerald-500" />
            <span>Better</span>
          </p>
          <p className="font-mono text-sm text-ink-700 dark:text-ink-300 whitespace-pre-wrap">{right}</p>
        </div>
      </div>
    </div>
  )
}

export default function BestPractices() {
  return (
    <ArticleLayout
      title="Best Practices"
      section="Advanced"
      toc={TOC}
    >
      <p>
        Prompt engineering is as much craft as science. These best practices are distilled
        from research papers, industry experience, and systematic experimentation. Apply them
        to consistently produce better AI outputs.
      </p>

      {/* ── Tips ── */}
      <section id="tips">
        <h2>Tips for Writing Better Prompts</h2>

        <TipCard number="1" title="Be Specific About Output Format">
          <p className="text-sm text-ink-600 dark:text-ink-300 mb-2">
            Always specify exactly what format you want: JSON, markdown, bullet points,
            numbered list, table, prose. Don't leave format to chance — models will choose
            whatever is most common in training data.
          </p>
          <CodeBlock label="output-format.txt" code={`Return your answer as a JSON object with keys:
"summary" (string, max 2 sentences),
"key_points" (array of 3-5 strings),
"confidence" (number 0-1)`} />
        </TipCard>

        <TipCard number="2" title="Use Positive Instructions, Not Negative">
          <p className="text-sm text-ink-600 dark:text-ink-300 mb-2">
            Tell the model what TO do rather than what NOT to do. Negative instructions are
            less reliable and can actually focus the model's attention on the forbidden behavior.
          </p>
          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-900/20">
              <div className="text-rose-500 mb-1 inline-flex items-center gap-1">
                <FiXCircle />
                <span>Weak</span>
              </div>
              Don't use passive voice.
            </div>
            <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20">
              <div className="text-emerald-500 mb-1 inline-flex items-center gap-1">
                <FiCheckCircle />
                <span>Better</span>
              </div>
              Use active voice in all sentences.
            </div>
          </div>
        </TipCard>

        <TipCard number="3" title="Provide Context About Your Audience">
          <p className="text-sm text-ink-600 dark:text-ink-300">
            Specifying who the output is for dramatically improves appropriateness of vocabulary,
            complexity, tone, and examples. "Explain to a 10-year-old" vs "Explain to a PhD in
            the field" produces entirely different — and correctly calibrated — responses.
          </p>
        </TipCard>

        <TipCard number="4" title="Use Delimiters to Separate Instructions from Data">
          <p className="text-sm text-ink-600 dark:text-ink-300 mb-2">
            When your prompt contains both instructions and input data, use clear delimiters
            (triple backticks, XML tags, dashes) to prevent the model from conflating them.
          </p>
          <CodeBlock label="delimiters.txt" code={`Summarize the article below in 3 bullet points.

<article>
[Your article text goes here]
</article>`} />
        </TipCard>

        <TipCard number="5" title="Ask for Reasoning Before Conclusion">
          <p className="text-sm text-ink-600 dark:text-ink-300 mb-2">
            For tasks requiring judgment or analysis, ask the model to reason first, then
            conclude. This is a form of chain-of-thought that reduces hasty errors.
          </p>
          <CodeBlock label="reason-first.txt" code={`Review this marketing strategy and identify weaknesses.
First, analyze each component individually.
Then, assess how the components work together.
Finally, provide your top 3 concerns with supporting reasoning.`} />
        </TipCard>

        <TipCard number="6" title="Iterate Systematically">
          <p className="text-sm text-ink-600 dark:text-ink-300">
            Treat prompt development like software development: change one variable at a time,
            test against multiple inputs, and track changes. Maintain a prompt version history.
            Small, focused improvements compound into dramatically better results.
          </p>
        </TipCard>
      </section>

      {/* ── Common Mistakes ── */}
      <section id="mistakes">
        <h2>Common Mistakes</h2>
        <p>These are the most frequent pitfalls that undermine prompt quality:</p>

        <MistakeCard
          title="Ambiguous Instructions"
          wrong={`Write a short summary.`}
          right={`Write a 3-sentence summary covering:
1. The main topic
2. Key conclusion
3. Why it matters`}
        />

        <MistakeCard
          title="Missing Context"
          wrong={`Is this a good idea?`}
          right={`I'm a solo founder considering building a B2B SaaS for
restaurant inventory management. My budget is $50k. I have
no prior restaurant industry experience. Is this a good idea?`}
        />

        <MistakeCard
          title="Overloading One Prompt"
          wrong={`Analyze our competitors, identify our positioning,
write 5 blog post ideas, create social captions
for each, and draft an email newsletter.`}
          right={`[Send 5 separate, focused prompts]
1. Analyze these 3 competitors: [data]
2. Based on that analysis, suggest our positioning
3. Given our positioning, suggest blog topics...`}
        />

        <MistakeCard
          title="Not Specifying Length"
          wrong={`Explain quantum computing.`}
          right={`Explain quantum computing in exactly 150 words,
suitable for a general business audience.`}
        />

        <div className="highlight-box-danger">
          <p className="text-sm">
            <strong>
              <FiAlertTriangle className="inline-block mr-2 text-amber-500" />
              Most dangerous mistake:
            </strong>{' '}
            Using LLM outputs without verification
            for high-stakes decisions. LLMs can confidently produce plausible-sounding but
            incorrect information (hallucination). Always validate critical facts from authoritative sources.
          </p>
        </div>
      </section>

      {/* ── Optimization ── */}
      <section id="optimize">
        <h2>Prompt Optimization Techniques</h2>

        <h3>1. Automatic Prompt Optimization (APO)</h3>
        <p>
          For production systems, use the LLM itself to improve your prompts. Provide failing
          examples and ask the model to identify why the current prompt fails and suggest
          improvements.
        </p>
        <CodeBlock label="meta-prompt.txt" code={`You are a prompt engineer. I have a prompt that is producing
inconsistent outputs. Here is my current prompt:
---
[YOUR CURRENT PROMPT]
---

Here are 3 examples where it produced bad outputs:
[Example 1]: [output]
[Example 2]: [output]
[Example 3]: [output]

Analyze the failure patterns and rewrite the prompt to fix them.`} />

        <h3>2. A/B Testing Prompts</h3>
        <p>
          For important use cases, systematically test prompt variants against a benchmark set
          of inputs. Measure quality using consistent criteria: accuracy, format adherence,
          completion rate, and user satisfaction scores.
        </p>

        <h3>3. Temperature Sweeping</h3>
        <p>
          For creative or open-ended tasks, run the same prompt at temperatures 0.3, 0.7, and
          1.0 to find the sweet spot between reliability and variety for your specific use case.
        </p>

        <div className="highlight-box">
          <p className="text-sm">
            <strong>
              <FiZap className="inline-block mr-2 text-amber-500" />
              Pro tip:
            </strong>{' '}
            Maintain a prompt library — a versioned collection
            of your best-performing prompts with notes on what works and why. This becomes an
            invaluable organizational asset as your AI usage scales.
          </p>
        </div>
      </section>

      {/* ── Checklist ── */}
      <section id="checklist">
        <h2>Pre-Deploy Checklist</h2>
        <p>Before deploying a prompt to production, verify:</p>

        <div className="space-y-2 my-5">
          {[
            'Output format is explicitly specified',
            'Edge cases are handled (empty input, unusual formatting)',
            'Tested on at least 10 representative inputs',
            'Output length is appropriate for the use case',
            'Temperature is set appropriately (low for factual, higher for creative)',
            'Sensitive outputs have safety guidelines specified',
            'Prompt is versioned and documented',
            'Cost per request is within acceptable range',
            'Latency tested under expected load',
            'Fallback behavior defined for low-confidence outputs',
          ].map((item, i) => (
            <label key={i} className="flex items-start gap-3 p-3 rounded-xl
                                       bg-white dark:bg-ink-900
                                       border border-ink-200 dark:border-ink-800
                                       hover:border-amber-300 dark:hover:border-amber-700
                                       transition-colors cursor-pointer group">
              <input type="checkbox" className="mt-0.5 accent-amber-500 w-4 h-4 shrink-0" />
              <span className="text-sm text-ink-700 dark:text-ink-300 group-hover:text-ink-900 dark:group-hover:text-ink-100
                               transition-colors">
                {item}
              </span>
            </label>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/resources"   className="btn-primary">Explore Resources →</Link>
          <Link to="/examples"    className="btn-secondary">← Back to Examples</Link>
        </div>
      </section>
    </ArticleLayout>
  )
}