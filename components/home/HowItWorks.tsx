'use client'

import { useRef, type CSSProperties } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FiArrowRight, FiMessageCircle, FiMonitor, FiBriefcase, FiAward } from 'react-icons/fi'

import SectionHeading from '@/components/ui/SectionHeading'
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap'
import { STEPS } from '@/data/site'

/* ==========================================================================
   How it works — full-screen sticky stacking cards. The heading sits above;
   below it the four step cards — each a photo panel as wide and as tall as
   the viewport — pin one after another, each sliding up over the last (a
   little lower each time so the stack's edges show). Covered cards ease back
   in scale as the next one arrives.

   The pinning is plain CSS `position: sticky`; GSAP scrubs the morph between
   one card and the next.
   ========================================================================== */

const ICONS = [FiMessageCircle, FiMonitor, FiBriefcase, FiAward]

// one backdrop photo per step, in STEPS order (decorative — the copy carries the meaning)
const PHOTOS = [
  '/images/how/counselling.webp',
  '/images/course/campus1.webp',
  '/images/how/project.webp',
  '/images/how/placement.webp',
]

export default function HowItWorks() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const cards = gsap.utils.toArray<HTMLElement>('.how__card')

      // The hand-off between two cards is one scrubbed morph, driven by the
      // incoming card's travel from the bottom of the screen to its pin point.
      // `scrub: 0.8` lets the tween trail the scrollbar a little, which is
      // what makes it read as smooth rather than mechanical.
      cards.slice(1).forEach((card, n) => {
        const prev = cards[n]
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'top 22%',
            scrub: 0.8,
          },
        })

        // incoming: opens out from a narrow pill to the full panel while the
        // photo settles back from a zoom and the copy rises into place
        tl.fromTo(
          card,
          { clipPath: 'inset(0% 16% 0% 16% round 160px)' },
          { clipPath: 'inset(0% 0% 0% 0% round 34px)', ease: 'power2.out' },
          0
        )
          .fromTo(card.querySelector('.how__bg'), { scale: 1.3 }, { scale: 1, ease: 'power1.out' }, 0)
          .fromTo(
            card.querySelectorAll('.how__card-top, h3, p'),
            { y: 70, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: 'power2.out' },
            0.4
          )

        // outgoing: eases back, rounds off and dims as it is covered; deeper
        // cards end up smaller, so the stack reads as receding
        tl.to(
          prev,
          {
            scale: 1 - (cards.length - 1 - n) * 0.04,
            borderRadius: 64,
            '--how-dim': 0.6,
            ease: 'power1.inOut',
          },
          0
        )
      })
    },
    { scope: root }
  )

  return (
    <section ref={root} className="section how" id="how-it-works">
      <div className="shell">
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
      </div>

      <ol className="how__cards">
        {STEPS.map((s, i) => {
          const Icon = ICONS[i % ICONS.length]
          return (
            <li key={s.title} className="how__card" style={{ '--i': i } as CSSProperties}>
              <Image
                src={PHOTOS[i % PHOTOS.length]}
                alt=""
                fill
                sizes="100vw"
                className="how__bg"
              />
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
    </section>
  )
}
