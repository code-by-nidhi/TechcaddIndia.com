'use client'

import { useRef, type CSSProperties } from 'react'
import Link from 'next/link'
import { FiArrowRight, FiMessageCircle, FiMonitor, FiBriefcase, FiAward } from 'react-icons/fi'

import SectionHeading from '@/components/ui/SectionHeading'
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap'
import { STEPS } from '@/data/site'

/* ==========================================================================
   How it works — sticky stacking cards. The heading stays pinned on the left
   while the four step cards pin one after another on the right, each sliding
   up over the last (a little lower each time so the stack's edges show).
   Covered cards ease back in scale as the next one arrives.

   The pinning is plain CSS `position: sticky`; GSAP only scrubs the scale.
   ========================================================================== */

const ICONS = [FiMessageCircle, FiMonitor, FiBriefcase, FiAward]

export default function HowItWorks() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const cards = gsap.utils.toArray<HTMLElement>('.how__card')

      // each card shrinks while the next one slides up over it; deeper cards
      // end up smaller, so the stack reads as receding
      cards.slice(0, -1).forEach((card, i) => {
        gsap.to(card, {
          scale: 1 - (cards.length - 1 - i) * 0.04,
          ease: 'none',
          scrollTrigger: {
            trigger: cards[i + 1],
            start: 'top bottom',
            end: 'top 30%',
            scrub: true,
          },
        })
      })
    },
    { scope: root }
  )

  return (
    <section ref={root} className="section how" id="how-it-works">
      <div className="shell how__inner">
        <div className="how__intro">
          <SectionHeading
            eyebrow="How it works"
            title={['From first call to', { text: 'first offer', className: 'gradient-text' }]}
            lead="The same four-step path in every city — whether you walk into a centre or log in from home."
          />
          <Link href="/contact" className="btn btn--gold">
            Get Started <FiArrowRight aria-hidden />
          </Link>
        </div>

        <ol className="how__cards">
          {STEPS.map((s, i) => {
            const Icon = ICONS[i % ICONS.length]
            return (
              <li key={s.title} className="how__card" style={{ '--i': i } as CSSProperties}>
                <div className="how__card-top">
                  <span className="how__step-tag">Step {String(i + 1).padStart(2, '0')}</span>
                  <span className="how__icon">
                    <Icon aria-hidden />
                  </span>
                </div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <span className="how__big" aria-hidden>
                  {String(i + 1).padStart(2, '0')}
                </span>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
