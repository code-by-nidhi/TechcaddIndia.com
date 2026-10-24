'use client'

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from 'react'
import Link from 'next/link'
import type { IconType } from 'react-icons'
import {
  FiArrowUpRight,
  FiAward,
  FiBookOpen,
  FiBriefcase,
  FiCloudSnow,
  FiCode,
  FiCpu,
  FiMapPin,
  FiMonitor,
  FiSliders,
  FiSun,
  FiTool,
  FiTrendingUp,
  FiUsers,
} from 'react-icons/fi'

import { prefersReducedMotion } from '@/lib/gsap'

/* ==========================================================================
   Training programs — filter tabs over a grid of 3D tilt cards. Each card
   leans toward the pointer (--rx/--ry) with a glare that follows it (--gx/
   --gy); its icon and title sit forward in depth. Cards rise in, staggered,
   when the grid first scrolls into view and again on every filter change.
   ========================================================================== */

type Audience = 'students' | 'professionals' | 'organisations' | 'formats'

export type TrainingProgram = { slug: string; label: string; href: string }

/* TODO: replace the one-line blurbs with approved copy */
const META: Record<string, { icon: IconType; blurb: string; audience: Audience }> = {
  'professional-it-training': {
    icon: FiBriefcase,
    blurb: 'Career-track programs in development, data, cloud and security, built around live projects.',
    audience: 'professionals',
  },
  'industrial-training': {
    icon: FiTool,
    blurb: 'Hands-on training inside real project workflows, aligned to your university requirements.',
    audience: 'students',
  },
  'summer-training': {
    icon: FiSun,
    blurb: 'Make the most of the summer break with a focused, project-led course.',
    audience: 'students',
  },
  'winter-training': {
    icon: FiCloudSnow,
    blurb: 'A short, intensive winter batch to pick up a new skill before the next semester.',
    audience: 'students',
  },
  'short-term-certificate-courses': {
    icon: FiAward,
    blurb: 'Compact courses that end in a certificate and a portfolio project.',
    audience: 'students',
  },
  'advanced-training-programs': {
    icon: FiTrendingUp,
    blurb: 'Deep-dive programs for learners who know the basics and want to specialise.',
    audience: 'professionals',
  },
  'project-based-training': {
    icon: FiCode,
    blurb: 'Learn by shipping: every module ends in a working project you can show.',
    audience: 'students',
  },
  'corporate-training': {
    icon: FiUsers,
    blurb: 'Upskilling for teams, scheduled around your business and mapped to your stack.',
    audience: 'organisations',
  },
  'college-university-training': {
    icon: FiBookOpen,
    blurb: 'Campus programs, workshops and bootcamps delivered alongside your faculty.',
    audience: 'organisations',
  },
  'customized-training-programs': {
    icon: FiSliders,
    blurb: 'A syllabus, schedule and format designed around your exact goals.',
    audience: 'organisations',
  },
  'ai-automation-workshops': {
    icon: FiCpu,
    blurb: 'Practical sessions on generative AI, agents and automating everyday work.',
    audience: 'professionals',
  },
  'online-training': {
    icon: FiMonitor,
    blurb: 'Live, instructor-led batches you can join from anywhere in India.',
    audience: 'formats',
  },
  'classroom-training': {
    icon: FiMapPin,
    blurb: 'In-person learning in our labs, with mentors right beside you.',
    audience: 'formats',
  },
}

const FALLBACK = { icon: FiBriefcase, blurb: 'Explore the program, outcomes and next batch.', audience: 'professionals' as Audience }

const FILTERS: { key: Audience | 'all'; label: string }[] = [
  { key: 'all', label: 'All programs' },
  { key: 'students', label: 'Students' },
  { key: 'professionals', label: 'Professionals' },
  { key: 'organisations', label: 'Organisations' },
  { key: 'formats', label: 'Learning formats' },
]

const TAG: Record<Audience, string> = {
  students: 'For students',
  professionals: 'For professionals',
  organisations: 'For organisations',
  formats: 'Format',
}

/** pointer → tilt angles and glare position on the card under it */
function tilt(e: PointerEvent<HTMLAnchorElement>) {
  if (e.pointerType !== 'mouse') return
  const card = e.currentTarget
  const r = card.getBoundingClientRect()
  const x = (e.clientX - r.left) / r.width
  const y = (e.clientY - r.top) / r.height
  card.style.setProperty('--rx', `${((0.5 - y) * 14).toFixed(2)}deg`)
  card.style.setProperty('--ry', `${((x - 0.5) * 16).toFixed(2)}deg`)
  card.style.setProperty('--gx', `${(x * 100).toFixed(1)}%`)
  card.style.setProperty('--gy', `${(y * 100).toFixed(1)}%`)
}

function untilt(e: PointerEvent<HTMLAnchorElement>) {
  const s = e.currentTarget.style
  s.removeProperty('--rx')
  s.removeProperty('--ry')
}

export default function TrainingPrograms({ programs }: { programs: TrainingProgram[] }) {
  const [filter, setFilter] = useState<Audience | 'all'>('all')
  const [seen, setSeen] = useState(false)
  const [still, setStill] = useState(false)
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    setStill(prefersReducedMotion())
    const el = root.current
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

  const items = programs
    .map((p) => ({ ...p, ...(META[p.slug] ?? FALLBACK) }))
    .filter((p) => filter === 'all' || p.audience === filter)

  return (
    <section className="section tp" id="programs" ref={root}>
      <div className="tp__bg" aria-hidden />
      <div className="shell">
        <div className="tp__head">
          <div>
            <span className="eyebrow">
              <span className="eyebrow__dot">✦</span>
              Programs
            </span>
            <h2 className="tp__title">
              Find the track that <span className="tp__hl">fits where you are</span>
            </h2>
          </div>
          <div className="tp__filters" role="group" aria-label="Filter programs">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                type="button"
                className="tp__filter"
                aria-pressed={filter === f.key}
                onClick={() => setFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* re-keyed per filter so the cards rise in again */}
        <ul className={`tp__grid${seen ? ' is-in' : ''}`} key={filter}>
          {items.map(({ slug, label, href, icon: Icon, blurb, audience }, i) => (
            <li key={slug} style={{ '--i': i } as CSSProperties}>
              <Link
                href={href}
                className="tp-card"
                onPointerMove={still ? undefined : tilt}
                onPointerLeave={still ? undefined : untilt}
              >
                <span className="tp-card__glare" aria-hidden />
                <span className="tp-card__top">
                  <span className="tp-card__icon" aria-hidden>
                    <Icon />
                  </span>
                  <span className="tp-card__no" aria-hidden>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </span>
                <h3>{label}</h3>
                <p>{blurb}</p>
                <span className="tp-card__foot">
                  <em>{TAG[audience]}</em>
                  <span className="tp-card__go">
                    Explore <FiArrowUpRight aria-hidden />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
