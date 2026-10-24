'use client'

import { Fragment, useRef } from 'react'

import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from '@/lib/gsap'
import { SITE, STATS } from '@/data/site'
import { FRANCHISE_STATS } from '@/data/franchise'

/* ==========================================================================
   Marquee — a band of oversized statements about the company, in two rows
   running opposite ways: solid grey on top, outlined below, each phrase
   divided by a pixel mark in the brand blue. Company claims only — no
   course or programme names. The figures come from the site data, so they
   stay in step with the rest of the page.

   Motion is GSAP: each row loops endlessly, scrolling quickly speeds both
   rows up, and scrolling back up turns them round. Under reduced motion the
   rows simply stand still.
   ========================================================================== */

const fig = (label: RegExp, list: { label: string; value: string | number; suffix?: string }[]) => {
  const s = list.find((x) => label.test(x.label))
  return s ? `${typeof s.value === 'number' ? s.value.toLocaleString('en-IN') : s.value}${s.suffix ?? ''}` : ''
}

const ROWS: string[][] = [
  [
    "Building India's tech network",
    'A decade of trust',
    `${fig(/franchise partners/i, FRANCHISE_STATS)} partner centres`,
    `${fig(/trained/i, STATS)} careers launched`,
    `${fig(/hiring/i, STATS)} hiring partners`,
    'ISO 9001:2015 certified',
  ],
  [
    'Your Skill. Technology. Career.',
    'Made in Punjab, built for India',
    `Rated ${SITE.rating.score} by learners`,
    'Government registered',
    'DPIIT-recognised startup',
    'Growing with every partner',
  ],
]

/** the divider: three pixels stepped like the brand mark */
const Pixel = () => (
  <svg className="cx-marquee__mark" viewBox="0 0 2 3" aria-hidden>
    <path d="M1 0h1v1H1zM0 1h1v1H0zM1 2h1v1H1z" />
  </svg>
)

export default function Marquee() {
  const band = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const tracks = gsap.utils.toArray<HTMLElement>('.cx-marquee__track')
      /* each track holds its phrases twice, so sliding by half loops seamlessly;
         the second row runs the other way */
      const loops = tracks.map((t, i) =>
        gsap.fromTo(
          t,
          { xPercent: i % 2 ? -50 : 0 },
          { xPercent: i % 2 ? 0 : -50, duration: 38 + i * 6, ease: 'none', repeat: -1 }
        )
      )
      /* start deep into the loop so it can also play backwards for a long time */
      loops.forEach((l) => l.totalTime(l.duration() * 500))

      let dir = 1
      const settle = { scale: 1 }
      ScrollTrigger.create({
        trigger: band.current,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: (self) => loops.forEach((l) => (self.isActive ? l.resume() : l.pause())),
        onUpdate: (self) => {
          dir = self.direction
          /* a burst of speed with the scroll, easing back to the cruising pace */
          settle.scale = Math.min(1 + Math.abs(self.getVelocity()) / 350, 6)
          gsap.killTweensOf(settle)
          gsap.to(settle, {
            scale: 1,
            duration: 0.9,
            ease: 'power2.out',
            onUpdate: () => loops.forEach((l) => l.timeScale(dir * settle.scale)),
          })
        },
      })
    },
    { scope: band }
  )

  return (
    <div className="cx-marquee" ref={band}>
      {ROWS.map((row, r) => (
        <div className={`cx-marquee__row${r % 2 ? ' cx-marquee__row--outline' : ''}`} key={r}>
          {/* the first copy is read once; the second only completes the loop */}
          <p className="cx-marquee__track">
            {[0, 1].map((copy) => (
              <span key={copy} aria-hidden={copy === 1 || undefined} className="cx-marquee__set">
                {row.map((phrase) => (
                  <Fragment key={phrase}>
                    <span className="cx-marquee__phrase">{phrase}</span>
                    <Pixel />
                  </Fragment>
                ))}
              </span>
            ))}
          </p>
        </div>
      ))}
    </div>
  )
}
