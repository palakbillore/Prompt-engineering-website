// ── Techniques.jsx ────────────────────────────────────
// Prompting techniques: Zero-shot, Few-shot, CoT, Role,
// Instruction prompting
// ─────────────────────────────────────────────────────
import React from 'react'
import { Link } from 'react-router-dom'
import { FiZap, FiCheckCircle } from 'react-icons/fi'
import ArticleLayout from '../components/ArticleLayout.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

const TOC = [
  { id: 'zero-shot',    label: 'Zero-Shot Prompting',        level: 2 },
  { id: 'few-shot',     label: 'Few-Shot Prompting',         level: 2 },
  { id: 'cot',          label: 'Chain-of-Thought Prompting', level: 2 },
  { id: 'role',         label: 'Role Prompting',             level: 2 },
  { id: 'instruction',  label: 'Instruction Prompting',      level: 2 },
  { id: 'comparison',   label: 'Technique Comparison',       level: 2 },
]

function TechniqueTag({ label }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-mono
                     bg-ink-100 dark:bg-ink-800 text-ink-600 dark:text-ink-400">
      {label}
    </span>
  )
}

export default function Techniques() {
  return (
    <ArticleLayout
      title="Prompting Techniques"
      section="Core Knowledge"
      toc={TOC}
    >
      <p>
        Prompt engineering has developed a rich vocabulary of techniques, each suited for
        different tasks. Understanding these techniques—and when to apply them—is the hallmark
        of a skilled prompt engineer. Let's explore the most widely used approaches.
      </p>

      {/* ── Zero-Shot ── */}
      <section id="zero-shot">
        <h2>Zero-Shot Prompting</h2>
        <p>
          <strong>Zero-shot prompting</strong> means asking the model to perform a task without
          providing any examples. You rely entirely on the model's pre-trained knowledge and
          your instruction clarity. It's the simplest approach and works surprisingly well for
          many common tasks.
        </p>
        <div className="flex flex-wrap gap-2 mb-3">
          <TechniqueTag label="Complexity: Low" />
          <TechniqueTag label="Best for: Common tasks" />
          <TechniqueTag label="Token usage: Minimal" />
        </div>
        <CodeBlock
          label="zero-shot.txt"
          code={`Classify the sentiment of the following review as:
Positive, Negative, or Neutral.

Review: "The product arrived on time but the packaging was damaged."

Sentiment:`}
        />
        <div className="highlight-box">
          <p className="text-sm">
            <strong>When to use:</strong> Start with zero-shot for any task. If quality is
            insufficient, upgrade to few-shot or chain-of-thought before adding more complexity.
          </p>
        </div>
      </section>

      {/* ── Few-Shot ── */}
      <section id="few-shot">
        <h2>Few-Shot Prompting</h2>
        <p>
          <strong>Few-shot prompting</strong> provides the model with a small number of input/output
          examples (typically 2–8) before the actual task. These examples act as in-context
          demonstrations that guide the model's behavior without any fine-tuning.
        </p>
        <div className="flex flex-wrap gap-2 mb-3">
          <TechniqueTag label="Complexity: Medium" />
          <TechniqueTag label="Best for: Pattern-matching tasks" />
          <TechniqueTag label="Token usage: Moderate" />
        </div>
        <CodeBlock
          label="few-shot.txt"
          code={`Convert the following natural language queries into SQL.

Q: Find all users created after January 2024
SQL: SELECT * FROM users WHERE created_at > '2024-01-01';

Q: Get the top 5 products by revenue
SQL: SELECT name, revenue FROM products ORDER BY revenue DESC LIMIT 5;

Q: Count orders for each customer
SQL: SELECT customer_id, COUNT(*) as order_count FROM orders GROUP BY customer_id;

Q: List all active subscriptions with user emails
SQL:`}
        />
        <div className="highlight-box">
          <p className="text-sm">
            <strong>
              <FiZap className="inline-block mr-2 text-amber-500" />
              Tips for effective few-shot:
            </strong>{' '}
            Use 3–5 examples. Make examples
            representative of the task's diversity. Keep format consistent between examples.
            Ensure examples are correct — mistakes in examples will corrupt outputs.
          </p>
        </div>
      </section>

      {/* ── Chain-of-Thought ── */}
      <section id="cot">
        <h2>Chain-of-Thought (CoT) Prompting</h2>
        <p>
          <strong>Chain-of-thought prompting</strong> encourages the model to "think out loud" —
          breaking complex problems into explicit reasoning steps before reaching a conclusion.
          Introduced in a 2022 Google paper, CoT dramatically improves performance on arithmetic,
          commonsense, and symbolic reasoning tasks.
        </p>
        <div className="flex flex-wrap gap-2 mb-3">
          <TechniqueTag label="Complexity: Medium" />
          <TechniqueTag label="Best for: Reasoning & math" />
          <TechniqueTag label="Token usage: Higher" />
        </div>

        <p>There are two main variants:</p>

        <h3>Standard CoT (with examples)</h3>
        <CodeBlock
          label="chain-of-thought.txt"
          code={`Q: A store has 48 apples. They sell 3/4 of them in the morning
and receive a new shipment of 20 apples in the afternoon.
How many apples do they have at the end of the day?

Let's think step by step:
1. Start: 48 apples
2. Sold in morning: 48 × 3/4 = 36 apples sold
3. Remaining after morning: 48 - 36 = 12 apples
4. Afternoon shipment: 12 + 20 = 32 apples

Answer: 32 apples

Q: A factory produces 240 widgets per hour. Due to maintenance,
it runs at 60% capacity for 5 hours, then full capacity for 3 hours.
How many widgets were produced?

Let's think step by step:`}
        />

        <h3>Zero-Shot CoT (magic phrase)</h3>
        <CodeBlock
          label="zero-shot-cot.txt"
          code={`A recipe calls for 2.5 cups of flour for 12 cookies.
If I want to make 30 cookies, how much flour do I need?

Let's think step by step.`}
        />

        <div className="highlight-box-success">
          <p className="text-sm">
            <strong>
              <FiCheckCircle className="inline-block mr-2 text-emerald-500" />
              Research finding:
            </strong>{' '}
            Simply adding "Let's think step by step" to a
            zero-shot prompt (Zero-Shot CoT) improves accuracy on math benchmarks by over 40%
            compared to naive zero-shot.
          </p>
        </div>
      </section>

      {/* ── Role Prompting ── */}
      <section id="role">
        <h2>Role Prompting</h2>
        <p>
          <strong>Role prompting</strong> assigns a specific persona or expert identity to the
          model. By telling the model to act as a domain expert, you invoke relevant knowledge
          and stylistic conventions associated with that role.
        </p>
        <div className="flex flex-wrap gap-2 mb-3">
          <TechniqueTag label="Complexity: Low" />
          <TechniqueTag label="Best for: Expert knowledge & tone" />
          <TechniqueTag label="Usually in: System prompt" />
        </div>
        <CodeBlock
          label="role-prompting.txt"
          code={`You are a senior cybersecurity engineer with 15 years of experience
in web application security. You specialize in OWASP Top 10 vulnerabilities
and have worked at Fortune 500 companies conducting penetration testing.

When reviewing code, you:
- Identify all security vulnerabilities with severity ratings
- Explain the attack vector for each vulnerability
- Provide specific remediation code
- Follow secure coding best practices

Please review the following authentication code: ...`}
        />
        <div className="highlight-box">
          <p className="text-sm">
            <strong>
              <FiZap className="inline-block mr-2 text-amber-500" />
              Pro tip:
            </strong>{' '}
            Combine role prompting with specific experience levels,
            domain specializations, and behavioral traits for more precise outputs. "You are
            a junior developer" vs "You are a principal engineer" produces meaningfully different
            explanations and code quality.
          </p>
        </div>
      </section>

      {/* ── Instruction ── */}
      <section id="instruction">
        <h2>Instruction Prompting</h2>
        <p>
          <strong>Instruction prompting</strong> uses explicit, structured directives to control
          model behavior. Rather than describing a role or showing examples, you specify precise
          rules, constraints, and output requirements. This is especially powerful in system prompts.
        </p>
        <div className="flex flex-wrap gap-2 mb-3">
          <TechniqueTag label="Complexity: Medium" />
          <TechniqueTag label="Best for: Structured outputs" />
          <TechniqueTag label="Highly composable" />
        </div>
        <CodeBlock
          label="instruction-prompting.txt"
          code={`TASK: Generate a product description for an e-commerce listing.

RULES:
- Length: exactly 3 paragraphs
- Paragraph 1: Hook sentence + 2 key benefits
- Paragraph 2: Technical specifications (use bullet list)
- Paragraph 3: Call to action + social proof reference
- Tone: Confident, professional, not hyperbolic
- Avoid: words like "amazing", "revolutionary", "game-changing"
- Include: A/B test variant marker at the end: [VARIANT-A]

OUTPUT FORMAT:
Return only the product description. No preamble or explanation.

PRODUCT: Noise-cancelling wireless headphones with 40hr battery`}
        />
      </section>

      {/* ── Comparison Table ── */}
      <section id="comparison">
        <h2>Technique Comparison</h2>
        <p>Choosing the right technique depends on your task, token budget, and quality needs:</p>
        <div className="overflow-x-auto my-5">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-ink-100 dark:bg-ink-800">
                <th className="text-left px-4 py-3 font-display font-600 text-ink-800 dark:text-ink-200 rounded-tl-xl">Technique</th>
                <th className="text-left px-4 py-3 font-display font-600 text-ink-800 dark:text-ink-200">Token Cost</th>
                <th className="text-left px-4 py-3 font-display font-600 text-ink-800 dark:text-ink-200">Complexity</th>
                <th className="text-left px-4 py-3 font-display font-600 text-ink-800 dark:text-ink-200 rounded-tr-xl">Best For</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Zero-Shot',     'Low',    'Low',    'Simple tasks, common knowledge'],
                ['Few-Shot',      'Medium', 'Medium', 'Pattern-matching, formatting'],
                ['Chain-of-Thought', 'High', 'Medium', 'Reasoning, math, analysis'],
                ['Role Prompting', 'Low',   'Low',    'Expert tone, domain knowledge'],
                ['Instruction',   'Medium', 'High',   'Complex, structured outputs'],
              ].map(([name, cost, complexity, use], i) => (
                <tr key={i} className="border-b border-ink-100 dark:border-ink-800
                                       hover:bg-ink-50 dark:hover:bg-ink-800/50 transition-colors">
                  <td className="px-4 py-3 font-medium text-amber-600 dark:text-amber-400 font-display">{name}</td>
                  <td className="px-4 py-3 text-ink-600 dark:text-ink-300">{cost}</td>
                  <td className="px-4 py-3 text-ink-600 dark:text-ink-300">{complexity}</td>
                  <td className="px-4 py-3 text-ink-500 dark:text-ink-400">{use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/examples" className="btn-primary">See Real Examples →</Link>
          <Link to="/concepts"  className="btn-secondary">← Back to Concepts</Link>
        </div>
      </section>
    </ArticleLayout>
  )
}