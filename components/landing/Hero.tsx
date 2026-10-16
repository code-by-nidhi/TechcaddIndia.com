'use client'

import { useState, type FormEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FiArrowRight, FiArrowUpRight, FiStar, FiZap } from 'react-icons/fi'

import DemoLink from '@/components/ui/DemoLink'
import SplitHeading from '@/components/fx/SplitHeading'
import CountUp from '@/components/fx/CountUp'
import { CATEGORIES, SITE, STATS } from '@/data/site'

/* ==========================================================================
   Hero — a split corporate banner. Headline and the prompt box on the left;
   on the right a layered collage of two photographs with a floating figure
   card. Under both runs a numbered index of the first four tracks, each with
   a rule that fills on hover.
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
  const lead = STATS[0]

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    /* short words must match whole ("ai" is not in "training") */
    const q = ` ${query.toLowerCase().replace(/[^a-z0-9 ]/g, ' ')} `
    const hit = KEYWORDS.find(([, words]) => words.some((w) => q.includes(w.length <= 3 ? ` ${w} ` : w)))
    router.push(hit ? `/courses?category=${hit[0]}` : '/courses')
  }

  return (
    <section className="cx-hero">
      <div className="cx-hero__bg" aria-hidden />

      <div className="shell cx-hero__grid">
        <div className="cx-hero__copy">
          <p className="cx-hero__kicker">
            <span className="cx-hero__dot" aria-hidden />
            <FiStar aria-hidden />
            <strong>{SITE.rating.score}</strong> rated by {SITE.rating.reviews} learners
          </p>

          <SplitHeading
            as="h1"
            immediate
            delay={0.1}
            lines
            className="cx-hero__title"
            parts={['Learn the tech', { text: 'India runs on', className: 'cx-hero__em' }]}
          />

          <form className="cx-ask" onSubmit={onSubmit} data-aos="fade-up" data-aos-delay="250">
            <label htmlFor="cx-ask-input">
              <FiZap aria-hidden /> Tell us what you want to learn
            </label>
            <div className="cx-ask__field">
              <textarea
                id="cx-ask-input"
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
              <button type="submit" className="btn btn--sm">
                Find my course <FiArrowRight aria-hidden />
              </button>
            </div>
            <div className="cx-ask__foot">
              <ul className="cx-ask__chips">
                {SUGGESTIONS.map((s) => (
                  <li key={s.label}>
                    <Link href={s.href}>{s.label}</Link>
                  </li>
                ))}
              </ul>
              <DemoLink className="cx-ask__demo">Book a free demo</DemoLink>
            </div>
          </form>
        </div>

        <div className="cx-hero__visual" aria-hidden>
          <div className="cx-hero__ring" />
          <div className="cx-hero__img cx-hero__img--main">
            <Image src="/images/course/classroom.webp" alt="" fill priority sizes="(max-width: 960px) 90vw, 44vw" />
          </div>
          <div className="cx-hero__img cx-hero__img--side">
            <Image src="/images/course/lab.webp" alt="" fill sizes="(max-width: 960px) 40vw, 18vw" />
          </div>
          <div className="cx-hero__figure">
            <b>
              <CountUp value={lead.value} suffix={lead.suffix} />
            </b>
            <span>{lead.label}</span>
          </div>
        </div>
      </div>

      <div className="shell">
        <ul className="cx-hero__index">
          {CATEGORIES.slice(0, 4).map((c, i) => (
            <li key={c.slug} data-aos="fade-up" data-aos-delay={300 + i * 80}>
              <Link href={`/courses?category=${c.slug}`}>
                <span className="cx-hero__no">{String(i + 1).padStart(2, '0')}</span>
                <h2>{c.title}</h2>
                <p>{c.blurb}</p>
                <span className="cx-hero__more">
                  Know more <FiArrowUpRight aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
