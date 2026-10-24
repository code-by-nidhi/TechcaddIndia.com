'use client'

import { useEffect, useRef, type CSSProperties } from 'react'
import Link from 'next/link'
import { FiArrowDown, FiCheck } from 'react-icons/fi'

import SplitHeading from '@/components/fx/SplitHeading'
import DemoLink from '@/components/ui/DemoLink'
import { gsap, prefersReducedMotion } from '@/lib/gsap'
import { STATS } from '@/data/site'

/* ==========================================================================
   Careers hero — copy on the left; on the right an indigo stage holding an
   isometric staircase of milestones that a glowing orb climbs on a loop,
   with an aiming reticle locked onto the top step. Labels and the orb are
   billboarded (counter-rotated) so they face the viewer. The stage tilts
   with the pointer through --px/--py (-1…1).
   ========================================================================== */

const STEPS = ['Learn', 'Intern', 'Build', 'Interview', 'Hired']

export default function CareersHero({ title, lead, services }: { title: string; lead: string; services: number }) {
  const hero = useRef<HTMLElement>(null)
  const partners = STATS[1]

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

  /* "From training to" / "your first job" */
  const words = title.split(' ')
  const head = words.slice(0, -3).join(' ')
  const tail = words.slice(-3).join(' ')

  return (
    <section className="ch-hero" ref={hero}>
      <div className="shell ch-hero__grid">
        <div className="ch-hero__copy">
          <nav aria-label="Breadcrumb" className="crumbs">
            <span>
              <Link href="/">Home</Link> /{' '}
            </span>
            <span>Careers</span>
          </nav>

          <span className="eyebrow ch-hero__eyebrow">
            <span className="eyebrow__dot">✦</span>
            Careers
          </span>

          <SplitHeading
            as="h1"
            immediate
            delay={0.1}
            lines
            className="ch-hero__title"
            parts={[head, { text: tail, className: 'ch-hero__em' }]}
          />

          <p className="ch-hero__lead">{lead}</p>

          <ul className="ch-hero__checks">
            <li>
              <FiCheck aria-hidden /> {partners.value.toLocaleString('en-IN')}
              {partners.suffix} {partners.label.toLowerCase()}
            </li>
            <li>
              <FiCheck aria-hidden /> {services} career services
            </li>
            <li>
              <FiCheck aria-hidden /> Freshers to working professionals
            </li>
          </ul>

          <div className="ch-hero__actions">
            <a href="#journey" className="btn">
              See your path <FiArrowDown aria-hidden />
            </a>
            <DemoLink className="btn btn--ghost">Book a free demo</DemoLink>
          </div>
        </div>

        <div className="ch-scene" aria-hidden>
          <div className="ch-scene__beam" />
          <div className="ch-stage">
            <div className="ch-iso">
              <div className="ch-iso__floor" />
              {STEPS.map((s, i) => (
                <div className={`ch-step${i === STEPS.length - 1 ? ' ch-step--goal' : ''}`} key={s} style={{ '--i': i } as CSSProperties}>
                  <span className="ch-step__label">
                    <b>{String(i + 1).padStart(2, '0')}</b> {s}
                  </span>
                </div>
              ))}
              <span className="ch-orb" />
              {/* the reticle, hovering over the goal step */}
              <div className="ch-reticle">
                <span className="ch-reticle__ping" />
                <span className="ch-reticle__ring" />
                <span className="ch-reticle__ring ch-reticle__ring--dash" />
                <span className="ch-reticle__cross" />
                <span className="ch-reticle__dot" />
              </div>
            </div>
          </div>
          <span className="ch-scene__tag">
            <i /> Target locked: <b>your first job</b>
          </span>
        </div>
      </div>
    </section>
  )
}
