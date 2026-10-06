'use client'

import { useState, type FormEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FiArrowRight, FiStar, FiZap } from 'react-icons/fi'

import DemoLink from '@/components/ui/DemoLink'
import SplitHeading from '@/components/fx/SplitHeading'
import { CATEGORIES, SITE } from '@/data/site'

/* ==========================================================================
   Hero — a rounded panel framed 10px in from the page edge: a washed-out
   classroom photograph behind a very large light headline, a prompt box that
   routes a typed interest to the matching course track, and a row of four
   quick cards along the bottom edge.
   ========================================================================== */

/** Words in the prompt that point at a course category. First match wins. */
const KEYWORDS: [slug: string, words: string[]][] = [
  ['cyber', ['cyber', 'hack', 'security', 'soc']],
  ['cloud', ['cloud', 'devops', 'aws', 'azure', 'docker', 'kubernetes', 'linux']],
  ['marketing', ['market', 'seo', 'ads', 'social']],
  ['data-science', ['data', 'analytics', 'analyst', 'sql', 'power bi', 'tableau', 'statistics']],
  ['ai', ['ai', 'machine', 'llm', 'prompt', 'agent', 'rag', 'chatgpt', 'ml']],
  ['full-stack', ['web', 'full', 'stack', 'react', 'node', 'java', 'python', 'mern', 'program', 'develop', 'code', 'app']],
]

const SUGGESTIONS = [
  { label: 'AI & Machine Learning', href: '/courses/ai-machine-learning' },
  { label: 'Full-Stack Development', href: '/courses/full-stack-development' },
  { label: 'All courses', href: '/courses' },
]

export default function Hero() {
  const router = useRouter()
  const [query, setQuery] = useState('')

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    /* short words must match whole ("ai" is not in "training") */
    const q = ` ${query.toLowerCase().replace(/[^a-z0-9 ]/g, ' ')} `
    const hit = KEYWORDS.find(([, words]) => words.some((w) => q.includes(w.length <= 3 ? ` ${w} ` : w)))
    router.push(hit ? `/courses?category=${hit[0]}` : '/courses')
  }

  return (
    <section className="ix-hero">
      <div className="ix-hero__media" aria-hidden>
        <Image src="/images/course/classroom.webp" alt="" fill priority sizes="100vw" />
      </div>

      <div className="shell ix-hero__inner">
        <p className="ix-hero__kicker">
          <FiStar aria-hidden />
          <strong>{SITE.rating.score}</strong> rated by {SITE.rating.reviews} learners
        </p>

        <SplitHeading
          as="h1"
          immediate
          delay={0.1}
          lines
          className="ix-hero__title"
          parts={['Learn the tech', { text: 'India runs on', className: 'ix-hero__em' }]}
        />

        <form className="ix-ask" onSubmit={onSubmit}>
          <label htmlFor="ix-ask-input">
            <FiZap aria-hidden /> Tell us what you want to learn
          </label>
          <textarea
            id="ix-ask-input"
            rows={2}
            maxLength={200}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                e.currentTarget.form?.requestSubmit()
              }
            }}
            placeholder="e.g. I want to become a data analyst"
          />
          <div className="ix-ask__foot">
            <ul className="ix-ask__chips">
              {SUGGESTIONS.map((s) => (
                <li key={s.label}>
                  <Link href={s.href}>{s.label}</Link>
                </li>
              ))}
            </ul>
            <div className="ix-ask__actions">
              <DemoLink className="btn btn--ghost btn--sm">Book a free demo</DemoLink>
              <button type="submit" className="btn btn--sm">
                Find my course <FiArrowRight aria-hidden />
              </button>
            </div>
          </div>
        </form>

        <ul className="ix-hero__recs">
          {CATEGORIES.slice(0, 4).map((c) => (
            <li key={c.slug}>
              <h2>{c.title}</h2>
              <p>{c.blurb}</p>
              <Link href={`/courses?category=${c.slug}`} className="cta-link">
                Know more
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
