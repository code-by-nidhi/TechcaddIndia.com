'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FiCheck, FiClock, FiCopy, FiHeadphones, FiMail, FiPhone, FiStar } from 'react-icons/fi'

import SplitHeading from '@/components/fx/SplitHeading'
import { gsap, prefersReducedMotion } from '@/lib/gsap'
import { SITE } from '@/data/site'

/* ==========================================================================
   Contact hero — copy and the three ways to reach us on the left (call,
   email with a copy button, and hours with a live open/closed state); on
   the right a counselling photograph with two floating badges and a chat
   that plays out over it. The photo tilts with the pointer through
   --px/--py (-1…1).
   ========================================================================== */

/* opening hours in IST; keep in step with SITE.hours */
const OPEN = { days: [1, 2, 3, 4, 5, 6], from: 9, to: 19 }

/** "Open now" / "Closed" from the current time in India */
function useOpenNow() {
  const [open, setOpen] = useState<boolean | null>(null)
  useEffect(() => {
    const check = () => {
      const parts = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Kolkata',
        weekday: 'short',
        hour: 'numeric',
        hour12: false,
      }).formatToParts(new Date())
      const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(parts.find((p) => p.type === 'weekday')?.value ?? '')
      const hour = Number(parts.find((p) => p.type === 'hour')?.value)
      setOpen(OPEN.days.includes(day) && hour >= OPEN.from && hour < OPEN.to)
    }
    check()
    const id = setInterval(check, 60_000)
    return () => clearInterval(id)
  }, [])
  return open
}

export default function ContactHero({ lead }: { lead: string }) {
  const hero = useRef<HTMLElement>(null)
  const open = useOpenNow()
  const [copied, setCopied] = useState(false)

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

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard unavailable: the mailto link still works */
    }
  }

  return (
    <section className="ct-hero" ref={hero}>
      <div className="shell ct-hero__grid">
        <div className="ct-hero__copy">
          <nav aria-label="Breadcrumb" className="crumbs">
            <span>
              <Link href="/">Home</Link> /{' '}
            </span>
            <span>Contact</span>
          </nav>

          <span className="eyebrow ct-hero__eyebrow">
            <span className="eyebrow__dot">✦</span>
            Contact
          </span>

          <SplitHeading
            as="h1"
            immediate
            delay={0.1}
            lines
            className="ct-hero__title"
            parts={['Talk to a', { text: 'counsellor', className: 'ct-hero__em' }]}
          />

          <p className="ct-hero__lead">{lead}</p>

          <ul className="ct-ways">
            <li style={{ '--i': 0 } as CSSProperties}>
              <span className="ct-ways__icon" aria-hidden>
                <FiPhone />
              </span>
              <span className="ct-ways__text">
                <small>Call us</small>
                <a href={SITE.phoneHref}>{SITE.phone}</a>
              </span>
              <a href={SITE.phoneHref} className="ct-ways__act">
                Call now
              </a>
            </li>
            <li style={{ '--i': 1 } as CSSProperties}>
              <span className="ct-ways__icon" aria-hidden>
                <FiMail />
              </span>
              <span className="ct-ways__text">
                <small>Email</small>
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </span>
              <button type="button" className="ct-ways__act" onClick={copyEmail} aria-live="polite">
                {copied ? (
                  <>
                    <FiCheck aria-hidden /> Copied
                  </>
                ) : (
                  <>
                    <FiCopy aria-hidden /> Copy
                  </>
                )}
              </button>
            </li>
            <li style={{ '--i': 2 } as CSSProperties}>
              <span className="ct-ways__icon" aria-hidden>
                <FiClock />
              </span>
              <span className="ct-ways__text">
                <small>Hours</small>
                <span>{SITE.hours}</span>
              </span>
              {open !== null && (
                <span className={`ct-ways__status${open ? ' is-open' : ''}`}>
                  <i aria-hidden /> {open ? 'Open now' : 'Closed now'}
                </span>
              )}
            </li>
          </ul>
        </div>

        <div className="ct-scene" aria-hidden>
          <span className="ct-scene__ring" />
          <div className="ct-photo">
            <Image src="/images/how/counselling.webp" alt="" fill priority quality={90} sizes="(max-width: 960px) 92vw, 46vw" />
          </div>
          <span className="ct-badge ct-badge--help">
            <FiHeadphones /> Free career counselling
          </span>
          <span className="ct-badge ct-badge--rating">
            <FiStar /> <b>{SITE.rating.score}</b> from {SITE.rating.reviews} learners
          </span>

          <div className="ct-chat">
            <p className="ct-chat__msg ct-chat__msg--me">Hi! Which course suits a data career?</p>
            <p className="ct-chat__typing">
              <i />
              <i />
              <i />
            </p>
            <p className="ct-chat__msg ct-chat__msg--us">
              Great question. A counsellor will call you within one working day.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
