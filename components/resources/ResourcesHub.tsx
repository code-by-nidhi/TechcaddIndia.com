'use client'

import { useEffect, useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from 'react'
import Link from 'next/link'
import type { IconType } from 'react-icons'
import {
  FiArrowUpRight,
  FiBookOpen,
  FiCalendar,
  FiCode,
  FiCompass,
  FiCpu,
  FiFolder,
  FiHelpCircle,
  FiSearch,
  FiShield,
  FiTrendingUp,
  FiX,
} from 'react-icons/fi'

import SplitHeading from '@/components/fx/SplitHeading'
import { gsap, prefersReducedMotion } from '@/lib/gsap'

/* ==========================================================================
   Resources hub — the hero and the library share one search.

   Hero: copy and the search on the left; on the right an indigo stage with
   a CSS 3D open book whose pages keep turning, topic tags floating at
   different depths and two article cards drifting past. The stage tilts
   with the pointer through --px/--py (-1…1).

   Library: every collection as a book with a coloured spine. On hover the
   cover swings open to show the pages behind it and the corner folds.
   Typing filters the shelf live and highlights the match. Books drop onto
   the shelf, staggered, when it first scrolls into view; the hidden start
   state only applies once the section is `is-armed`.
   ========================================================================== */

export type ResourcePage = { slug: string; label: string; href: string }

/* Three shades from the site palette: blue for learning content, violet for
   student help, indigo for projects and events.
   TODO: replace the one-line blurbs with approved copy */
const META: Record<string, { icon: IconType; kind: string; blurb: string; tags: string; ac: string; ac2: string }> = {
  'technology-ai-blogs': {
    icon: FiCpu,
    kind: 'Blog',
    blurb: 'What is changing in AI and software, explained without the hype.',
    tags: 'ai machine learning llm genai technology news',
    ac: '#2e53e1',
    ac2: '#7cb0fb',
  },
  'programming-tutorials': {
    icon: FiCode,
    kind: 'Tutorials',
    blurb: 'Step-by-step lessons in Python, Java, JavaScript, React and more.',
    tags: 'python java javascript react node code coding web development',
    ac: '#2e53e1',
    ac2: '#7cb0fb',
  },
  'digital-marketing-guides': {
    icon: FiTrendingUp,
    kind: 'Guides',
    blurb: 'Playbooks for SEO, ads, social media and content that converts.',
    tags: 'seo ads social media content marketing google',
    ac: '#2e53e1',
    ac2: '#7cb0fb',
  },
  'cybersecurity-forensics-insights': {
    icon: FiShield,
    kind: 'Insights',
    blurb: 'Threats, tools and techniques from ethical hacking to digital forensics.',
    tags: 'cyber security hacking ethical forensics network soc',
    ac: '#2e53e1',
    ac2: '#7cb0fb',
  },
  'career-guidance-articles': {
    icon: FiCompass,
    kind: 'Articles',
    blurb: 'Choosing a track, building a portfolio and preparing for interviews.',
    tags: 'career job interview resume portfolio placement',
    ac: '#7243a7',
    ac2: '#b296f0',
  },
  'student-resources': {
    icon: FiBookOpen,
    kind: 'Downloads',
    blurb: 'Notes, cheat sheets and practice sets to keep beside you while you study.',
    tags: 'notes cheat sheet practice study pdf download student',
    ac: '#7243a7',
    ac2: '#b296f0',
  },
  'course-faqs': {
    icon: FiHelpCircle,
    kind: 'FAQ',
    blurb: 'Fees, batches, certificates and placements: the questions we hear most.',
    tags: 'faq fees batch certificate placement questions admission',
    ac: '#7243a7',
    ac2: '#b296f0',
  },
  'projects-case-studies': {
    icon: FiFolder,
    kind: 'Case studies',
    blurb: 'Real projects our learners and teams have built, and how they did it.',
    tags: 'projects case study portfolio work examples',
    ac: '#4338ca',
    ac2: '#a5b4fc',
  },
  'news-events-seminars': {
    icon: FiCalendar,
    kind: 'Events',
    blurb: 'Seminars, workshops and campus events across our centres.',
    tags: 'news events seminar workshop campus webinar',
    ac: '#4338ca',
    ac2: '#a5b4fc',
  },
}

const FALLBACK = { icon: FiBookOpen, kind: 'Collection', blurb: 'Open the collection.', tags: '', ac: '#2e53e1', ac2: '#7cb0fb' }

const TOPICS = ['AI', 'Python', 'SEO', 'Cyber', 'Interview', 'FAQ']

/* floating tags in the hero scene: label, position, depth */
const FLOATERS: { t: string; x: string; y: string; z: number }[] = [
  { t: '#AI', x: '12%', y: '18%', z: 60 },
  { t: '#Python', x: '70%', y: '12%', z: 30 },
  { t: '#SEO', x: '80%', y: '58%', z: 80 },
  { t: '#Cybersecurity', x: '6%', y: '64%', z: 40 },
  { t: '#Careers', x: '58%', y: '82%', z: 20 },
  { t: '#React', x: '34%', y: '8%', z: -20 },
]

/** wraps the first match of `q` in a <mark> */
function highlight(text: string, q: string): ReactNode {
  if (!q) return text
  const i = text.toLowerCase().indexOf(q.toLowerCase())
  if (i < 0) return text
  return (
    <>
      {text.slice(0, i)}
      <mark>{text.slice(i, i + q.length)}</mark>
      {text.slice(i + q.length)}
    </>
  )
}

function SearchField({ id, value, onChange, onSubmit }: { id: string; value: string; onChange: (v: string) => void; onSubmit?: () => void }) {
  const submit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit?.()
  }
  return (
    <form className="rs-search" role="search" onSubmit={submit}>
      <label htmlFor={id} className="rs-search__icon">
        <FiSearch aria-hidden />
        <span className="sr-only">Search resources</span>
      </label>
      <input
        id={id}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search guides, tutorials, FAQs…"
        autoComplete="off"
      />
      {value && (
        <button type="button" className="rs-search__clear" onClick={() => onChange('')} aria-label="Clear search">
          <FiX aria-hidden />
        </button>
      )}
    </form>
  )
}

export default function ResourcesHub({ lead, pages }: { lead: string; pages: ResourcePage[] }) {
  const [query, setQuery] = useState('')
  const [seen, setSeen] = useState(false)
  const [armed, setArmed] = useState(false)
  const hero = useRef<HTMLElement>(null)
  const shelf = useRef<HTMLElement>(null)

  /* pointer tilt on the hero stage */
  useEffect(() => {
    const el = hero.current
    if (!el || prefersReducedMotion() || !window.matchMedia('(pointer: fine)').matches) return
    const p = { x: 0, y: 0 }
    const toX = gsap.quickTo(p, 'x', { duration: 1, ease: 'power3.out', onUpdate: () => el.style.setProperty('--px', p.x.toFixed(3)) })
    const toY = gsap.quickTo(p, 'y', { duration: 1, ease: 'power3.out', onUpdate: () => el.style.setProperty('--py', p.y.toFixed(3)) })
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      toX(((e.clientX - r.left) / r.width) * 2 - 1)
      toY(((e.clientY - r.top) / r.height) * 2 - 1)
    }
    const leave = () => {
      toX(0)
      toY(0)
    }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  }, [])

  /* books drop in when the shelf first comes into view */
  useEffect(() => {
    if (prefersReducedMotion()) return
    setArmed(true)
    const el = shelf.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true)
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -15% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const toShelf = () => shelf.current?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' })
  const pickTopic = (t: string) => {
    setQuery(t)
    toShelf()
  }

  const q = query.trim()
  const items = pages.map((p) => ({ ...p, ...(META[p.slug] ?? FALLBACK) }))
  const shown = q
    ? items.filter((it) => `${it.label} ${it.kind} ${it.blurb} ${it.tags}`.toLowerCase().includes(q.toLowerCase()))
    : items

  return (
    <>
      {/* ------------------------------------------------------------ hero */}
      <section className="rs-hero" ref={hero}>
        <div className="shell rs-hero__grid">
          <div className="rs-hero__copy">
            <nav aria-label="Breadcrumb" className="crumbs">
              <span>
                <Link href="/">Home</Link> /{' '}
              </span>
              <span>Resources</span>
            </nav>

            <span className="eyebrow rs-hero__eyebrow">
              <span className="eyebrow__dot">✦</span>
              Resources
            </span>

            <SplitHeading
              as="h1"
              immediate
              delay={0.1}
              lines
              className="rs-hero__title"
              parts={['Guides, insights and', { text: 'student resources', className: 'rs-hero__em' }]}
            />

            <p className="rs-hero__lead">{lead}</p>

            <SearchField id="rs-q-hero" value={query} onChange={setQuery} onSubmit={toShelf} />

            <div className="rs-hero__topics">
              <span>Popular:</span>
              {TOPICS.map((t) => (
                <button key={t} type="button" onClick={() => pickTopic(t)}>
                  #{t}
                </button>
              ))}
            </div>
          </div>

          <div className="rs-scene" aria-hidden>
            <div className="rs-scene__glow" />
            <div className="rs-stage">
              {FLOATERS.map((f, i) => (
                <span
                  className="rs-float"
                  key={f.t}
                  style={{ left: f.x, top: f.y, '--z': `${f.z}px`, '--d': `${i * -1.1}s` } as CSSProperties}
                >
                  {f.t}
                </span>
              ))}

              <span className="rs-doc rs-doc--a">
                <b />
                <i />
                <i />
                <i />
              </span>
              <span className="rs-doc rs-doc--b">
                <b />
                <i />
                <i />
              </span>

              <div className="rs-book">
                <span className="rs-book__side rs-book__side--l" />
                <span className="rs-book__side rs-book__side--r" />
                {[0, 1, 2].map((n) => (
                  <span className="rs-book__page" key={n} style={{ '--n': n } as CSSProperties} />
                ))}
              </div>
            </div>
            <span className="rs-scene__tag">
              <FiBookOpen /> {pages.length} collections, one library
            </span>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- library */}
      <section
        className={`section rs${armed ? ' is-armed' : ''}${seen ? ' is-in' : ''}`}
        id="library"
        ref={shelf}
      >
        <div className="rs__bg" aria-hidden />
        <div className="shell">
          <div className="rs__head">
            <div>
              <span className="eyebrow">
                <span className="eyebrow__dot">✦</span>
                Library
              </span>
              <h2 className="rs__title">
                Everything you need to learn, <span className="rs__hl">in one place</span>
              </h2>
            </div>
            <div className="rs__tools">
              <SearchField id="rs-q-shelf" value={query} onChange={setQuery} />
              <p className="rs__count" aria-live="polite">
                {q ? (
                  <>
                    <b>{shown.length}</b> of {items.length} collections match “{q}”
                  </>
                ) : (
                  <>
                    <b>{items.length}</b> collections
                  </>
                )}
              </p>
            </div>
          </div>

          {shown.length ? (
            <ul className="rs__grid">
              {shown.map(({ slug, label, href, icon: Icon, kind, blurb, ac, ac2 }, i) => (
                <li key={slug} style={{ '--i': i, '--ac': ac, '--ac2': ac2 } as CSSProperties}>
                  <span className="rs-sheets" aria-hidden />
                  <Link href={href} className="rs-card">
                    <span className="rs-card__spine" aria-hidden />
                    <span className="rs-card__fold" aria-hidden />
                    <span className="rs-card__top">
                      <span className="rs-card__icon" aria-hidden>
                        <Icon />
                      </span>
                      <em>{kind}</em>
                    </span>
                    <h3>{highlight(label, q)}</h3>
                    <p>{highlight(blurb, q)}</p>
                    <span className="rs-card__go">
                      Open collection <FiArrowUpRight aria-hidden />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="rs__empty">
              <FiSearch aria-hidden />
              <p>
                Nothing matches “{q}” yet. Try a broader word, or browse all collections.
              </p>
              <button type="button" className="btn btn--sm" onClick={() => setQuery('')}>
                Show all collections
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
