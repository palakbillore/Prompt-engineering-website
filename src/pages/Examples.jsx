// ── Examples.jsx ──────────────────────────────────────
// Real prompt examples: good vs bad, code generation,
// creative writing, data extraction
// ─────────────────────────────────────────────────────
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiXCircle, FiCheckCircle, FiZap } from 'react-icons/fi'
import ArticleLayout from '../components/ArticleLayout.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

const TOC = [
  { id: 'good-vs-bad',  label: 'Good vs Bad Prompts',    level: 2 },
  { id: 'code',         label: 'Code Generation',         level: 2 },
  { id: 'creative',     label: 'Creative Writing',        level: 2 },
  { id: 'extraction',   label: 'Data Extraction',         level: 2 },
  { id: 'analysis',     label: 'Analysis & Reasoning',    level: 2 },
]

// Good/Bad comparison component
function CompareBlock({ bad, good, task }) {
  const [tab, setTab] = useState('bad')
  return (
    <div className="my-5 rounded-2xl border border-ink-200 dark:border-ink-800 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-2.5 bg-ink-50 dark:bg-ink-900 border-b border-ink-200 dark:border-ink-800">
        <p className="text-xs font-display font-600 text-ink-500 dark:text-ink-400 uppercase tracking-wider">
          Task: {task}
        </p>
      </div>
      {/* Tab switcher */}
      <div className="flex border-b border-ink-200 dark:border-ink-800">
        <button
          onClick={() => setTab('bad')}
          className={`flex-1 py-2.5 text-sm font-display font-600 transition-colors
            ${tab === 'bad'
              ? 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/20 border-b-2 border-rose-500'
              : 'text-ink-500 dark:text-ink-400 hover:bg-ink-50 dark:hover:bg-ink-800'}`}
        >
          <span className="inline-flex items-center gap-1">
            <FiXCircle />
            <span>Weak Prompt</span>
          </span>
        </button>
        <button
          onClick={() => setTab('good')}
          className={`flex-1 py-2.5 text-sm font-display font-600 transition-colors
            ${tab === 'good'
              ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 border-b-2 border-emerald-500'
              : 'text-ink-500 dark:text-ink-400 hover:bg-ink-50 dark:hover:bg-ink-800'}`}
        >
          <span className="inline-flex items-center gap-1">
            <FiCheckCircle />
            <span>Strong Prompt</span>
          </span>
        </button>
      </div>
      {/* Content */}
      <pre className="bg-ink-900 dark:bg-ink-950 text-ink-100 px-5 py-4 font-mono
                      text-sm leading-6 overflow-x-auto whitespace-pre-wrap">
        <code>{tab === 'bad' ? bad : good}</code>
      </pre>
    </div>
  )
}

export default function Examples() {
  return (
    <ArticleLayout
      title="Prompt Examples"
      section="Hands-On Learning"
      toc={TOC}
    >
      <p>
        Nothing cements understanding faster than seeing real examples. This section walks through
        concrete prompt comparisons, showing exactly what separates weak prompts from highly effective
        ones across common use cases.
      </p>

      {/* ── Good vs Bad ── */}
      <section id="good-vs-bad">
        <h2>Good vs Bad Prompts</h2>
        <p>
          The difference between a good and bad prompt often comes down to specificity, context,
          and format guidance. Let's examine side-by-side comparisons:
        </p>

        <CompareBlock
          task="Explain a technical concept"
          bad={`Explain machine learning.`}
          good={`Explain machine learning to a non-technical product manager who
has never studied statistics or programming.

Use an everyday analogy to introduce the concept, then cover:
1. What "training" means in plain English
2. The difference between supervised and unsupervised learning
3. One real-world business application of each type

Keep the total explanation under 300 words. Avoid jargon.`}
        />

        <CompareBlock
          task="Write marketing copy"
          bad={`Write about our new coffee maker.`}
          good={`Write a product launch tweet thread (4 tweets) for the BrewMaster Pro,
a $299 smart coffee maker that syncs with your morning alarm.

Target audience: tech-savvy professionals aged 28-45 who take coffee seriously.
Tone: witty, confident, not corporate.

Tweet 1: Hook with the problem
Tweet 2: Introduce the solution
Tweet 3: Key feature that's genuinely surprising
Tweet 4: CTA with launch discount code BREW30

Include relevant hashtags. Each tweet must be under 240 characters.`}
        />

        <CompareBlock
          task="Code debugging"
          bad={`Fix my code.`}
          good={`Debug the following Python function. It should return the nth Fibonacci
number but is producing incorrect results for n > 10.

\`\`\`python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
\`\`\`

Please:
1. Identify the bug (hint: consider performance for large n)
2. Explain why it fails for large inputs
3. Provide a corrected version using memoization
4. Add a brief docstring to the fixed function`}
        />
      </section>

      {/* ── Code Generation ── */}
      <section id="code">
        <h2>Code Generation Examples</h2>
        <p>
          Code generation is one of the highest-value use cases for LLMs. The key is providing
          language, context, constraints, and expected behavior — not just the task.
        </p>

        <CodeBlock
          label="api-endpoint.txt"
          code={`You are a senior Node.js developer who writes clean, production-ready code.

Create an Express.js REST API endpoint with these requirements:
- Route: POST /api/users/register
- Input validation: email (valid format), password (min 8 chars, 1 number, 1 uppercase)
- Password hashing: use bcrypt with salt rounds = 12
- Database: PostgreSQL using pg library (assume pool is imported as 'db')
- Error handling: return proper HTTP status codes (400, 409, 500)
- Success: return { id, email, createdAt } with 201 status

Add JSDoc comments. Do not use any external validation libraries.`}
        />

        <CodeBlock
          label="data-transformation.txt"
          code={`Write a Python function that transforms the following data structure.

INPUT FORMAT (list of dicts):
[
  {"name": "Alice Johnson", "dept": "Engineering", "salary": 95000, "start": "2021-03-15"},
  ...
]

OUTPUT FORMAT (nested dict grouped by department):
{
  "Engineering": {
    "employees": [{"name": "Alice Johnson", "salary": 95000, "tenure_years": 3.1}],
    "avg_salary": 95000,
    "headcount": 1
  }
}

Requirements:
- Calculate tenure_years from start date to today (round to 1 decimal)
- Sort employees within each dept by salary descending
- Include type hints and docstring
- Handle edge cases: empty input, missing fields`}
        />
      </section>

      {/* ── Creative Writing ── */}
      <section id="creative">
        <h2>Creative Writing Examples</h2>
        <p>
          Creative prompts benefit enormously from style guidance, constraints, and structural
          requirements. The more specific your creative brief, the more tailored and useful
          the output.
        </p>

        <CodeBlock
          label="short-story.txt"
          code={`Write a 400-word short story opening with the following constraints:

SETTING: Near-future city, 2047, monsoon season
PROTAGONIST: A 60-year-old food delivery drone operator who has started
             receiving mysterious tips from an anonymous customer
TONE: Noir meets magical realism — melancholy but with flashes of wonder
POV: Third person limited
OPENING LINE: Must start with a sensory description of rain
FORBIDDEN: No flashbacks in the opening. No dialogue yet.

The opening should end on an intriguing question or ambiguous discovery
that makes the reader want to continue.`}
        />

        <div className="highlight-box">
          <p className="text-sm">
            <strong>
              <FiZap className="inline-block mr-2 text-amber-500" />
              Creative prompt anatomy:
            </strong>{' '}
            Setting + character + tone + POV +
            constraints + ending goal. This framework produces dramatically more usable
            creative output than "write a story about X."
          </p>
        </div>
      </section>

      {/* ── Data Extraction ── */}
      <section id="extraction">
        <h2>Data Extraction Examples</h2>
        <p>
          Extracting structured data from unstructured text is one of the most powerful
          LLM use cases. The key is specifying your exact output schema.
        </p>

        <CodeBlock
          label="entity-extraction.txt"
          code={`Extract the following entities from the job posting below.
Return ONLY a valid JSON object with no additional text.

Schema:
{
  "job_title": string,
  "company": string,
  "location": string,
  "work_type": "remote" | "hybrid" | "onsite",
  "salary_min": number | null,
  "salary_max": number | null,
  "required_skills": string[],
  "years_experience": number | null,
  "visa_sponsorship": boolean
}

Job Posting:
---
Senior Full-Stack Engineer at DataPulse Inc.
San Francisco, CA (hybrid 3 days/week)
$140,000 - $180,000 + equity

We're looking for 5+ years of experience with React, Node.js,
and PostgreSQL. TypeScript experience preferred. We do not offer
visa sponsorship at this time.
---`}
        />
      </section>

      {/* ── Analysis ── */}
      <section id="analysis">
        <h2>Analysis & Reasoning Examples</h2>

        <CodeBlock
          label="product-analysis.txt"
          code={`Analyze the following customer support tickets and provide:

1. Top 3 recurring issue categories (with frequency %)
2. Urgency distribution (Critical / High / Medium / Low)
3. One actionable recommendation per category to reduce ticket volume
4. Overall sentiment score (1-10)

Format your response as a structured report with section headers.
Cite specific tickets by number as evidence for each finding.

TICKETS:
[Ticket #1042] "App crashes every time I try to export to PDF" - submitted 3x
[Ticket #1043] "How do I change my billing cycle?"
[Ticket #1044] "Export to PDF not working" (duplicate of #1042)
[Ticket #1045] "My account was charged twice this month - need refund ASAP"
[Ticket #1046] "Can't find dark mode settings"
[Ticket #1047] "PDF export broken for large files" (related to #1042)
[Ticket #1048] "Billing page shows wrong currency"`}
        />

        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/best-practices" className="btn-primary">Best Practices →</Link>
          <Link to="/techniques"     className="btn-secondary">← Back to Techniques</Link>
        </div>
      </section>
    </ArticleLayout>
  )
}