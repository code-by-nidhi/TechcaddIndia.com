'use client'

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react'
import Link from 'next/link'
import type { IconType } from 'react-icons'
import {
  FiArrowRight,
  FiBookOpen,
  FiBriefcase,
  FiCheck,
  FiMapPin,
  FiMessageCircle,
  FiPhoneCall,
  FiUsers,
} from 'react-icons/fi'

import { prefersReducedMotion } from '@/lib/gsap'
import { SITE } from '@/data/site'

/* ==========================================================================
   Contact desk — "How can we help?" as a help desk. The enquiry types are
   tabs down the left with a highlight that slides to the chosen one; the
   panel on the right flips in with who it is for, what to have ready (the
   checks tick in one by one) and the button to start. The tabs follow the
   WAI-ARIA pattern: arrow keys move between them.
   The two columns slide in when the desk first scrolls into view; the
   hidden start state only applies once the section is `is-armed`.
   ========================================================================== */

export type EnquiryPage = { slug: string; label: string; href: string }

/* TODO: replace the descriptions and checklists with approved copy */
const META: Record<string, { icon: IconType; who: string; blurb: string; ready: string[]; cta: string }> = {
  'course-enquiry': {
    icon: FiBookOpen,
    who: 'For learners',
    blurb: 'Ask about the syllabus, fees, batch timings and which course fits your goal.',
    ready: ['The course or career you have in mind', 'Your current education or experience', 'A centre near you, or online'],
    cta: 'Start a course enquiry',
  },
  'corporate-enquiry': {
    icon: FiBriefcase,
    who: 'For companies',
    blurb: 'Upskill your team with training planned around your stack and your schedule.',
    ready: ['Team size and roles', 'The technologies to cover', 'Your timeline and preferred format'],
    cta: 'Enquire for your team',
  },
  'training-partnership-enquiry': {
    icon: FiUsers,
    who: 'For institutions',
    blurb: 'Bring techcadd programs, workshops and bootcamps to your college or university.',
    ready: ['Institution name and city', 'The programs you are interested in', 'Approximate batch size'],
    cta: 'Discuss a partnership',
  },
  'request-a-callback': {
    icon: FiPhoneCall,
    who: 'For anyone',
    blurb: 'Leave your number and a counsellor will call you back.',
    ready: ['Your name and mobile number', 'A good time to call', 'What you would like to talk about'],
    cta: 'Request a callback',
  },
  'all-branch-locations': {
    icon: FiMapPin,
    who: 'Visit us',
    blurb: 'Find the techcadd centre nearest to you, with its address and directions.',
    ready: ['Your city or area', 'Weekday or weekend batches', 'A time you can visit'],
    cta: 'See all branches',
  },
  'feedback-support': {
    icon: FiMessageCircle,
    who: 'For students',
    blurb: 'Share feedback, or get help with something that has not gone right.',
    ready: ['Your course and batch', 'What happened', 'How we can make it right'],
    cta: 'Share feedback',
  },
}

export default function ContactDesk({ pages }: { pages: EnquiryPage[] }) {
  const items = pages.filter((p) => META[p.slug]).map((p) => ({ ...p, ...META[p.slug] }))
  const [active, setActive] = useState(0)
  const [seen, setSeen] = useState(false)
  const [armed, setArmed] = useState(false)
  const root = useRef<HTMLElement>(null)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])

  useEffect(() => {
    if (prefersReducedMotion()) return
    setArmed(true)
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

  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key]
    let next: number | null = step ? (active + step + items.length) % items.length : null
    if (e.key === 'Home') next = 0
    if (e.key === 'End') next = items.length - 1
    if (next === null) return
    e.preventDefault()
    setActive(next)
    tabs.current[next]?.focus()
  }

  const it = items[active]
  if (!it) return null
  const Icon = it.icon

  return (
    <section className={`section ct-desk${armed ? ' is-armed' : ''}${seen ? ' is-in' : ''}`} ref={root}>
      <div className="ct-desk__bg" aria-hidden />
      <div className="shell">
        <div className="ct-desk__head">
          <span className="eyebrow">
            <span className="eyebrow__dot">✦</span>
            Help desk
          </span>
          <h2 className="ct-desk__title">
            How can we <span className="ct-desk__hl">help you today?</span>
          </h2>
          <p>Pick what you need and we will point you to the right team.</p>
        </div>

        <div className="ct-desk__body">
          <div
            className="ct-tabs"
            role="tablist"
            aria-label="Enquiry type"
            aria-orientation="vertical"
            style={{ '--idx': active, '--count': items.length } as CSSProperties}
          >
            <span className="ct-tabs__bar" aria-hidden />
            {items.map((x, i) => {
              const TabIcon = x.icon
              return (
                <button
                  key={x.slug}
                  ref={(el) => {
                    tabs.current[i] = el
                  }}
                  type="button"
                  role="tab"
                  id={`ct-tab-${x.slug}`}
                  aria-selected={i === active}
                  aria-controls="ct-panel"
                  tabIndex={i === active ? 0 : -1}
                  className="ct-tab"
                  onClick={() => setActive(i)}
                  onKeyDown={onKey}
                >
                  <span className="ct-tab__icon" aria-hidden>
                    <TabIcon />
                  </span>
                  <span className="ct-tab__text">
                    <b>{x.label}</b>
                    <small>{x.who}</small>
                  </span>
                </button>
              )
            })}
          </div>

          {/* re-keyed per tab so it flips in again */}
          <div className="ct-panel" role="tabpanel" id="ct-panel" aria-labelledby={`ct-tab-${it.slug}`} key={it.slug}>
            <div className="ct-panel__top">
              <span className="ct-panel__icon" aria-hidden>
                <i />
                <i />
                <Icon />
              </span>
              <em>{it.who}</em>
            </div>
            <h3>{it.label}</h3>
            <p className="ct-panel__blurb">{it.blurb}</p>

            <p className="ct-panel__label">Have these ready</p>
            <ul className="ct-panel__ready">
              {it.ready.map((r, i) => (
                <li key={r} style={{ '--i': i } as CSSProperties}>
                  <span aria-hidden>
                    <FiCheck />
                  </span>
                  {r}
                </li>
              ))}
            </ul>

            <div className="ct-panel__actions">
              <Link href={it.href} className="btn">
                {it.cta} <FiArrowRight aria-hidden />
              </Link>
              <a href={SITE.phoneHref} className="ct-panel__call">
                or call {SITE.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
