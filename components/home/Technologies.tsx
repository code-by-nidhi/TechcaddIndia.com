'use client'

import { useRef } from 'react'

import SectionHeading from '@/components/ui/SectionHeading'
import CountUp from '@/components/fx/CountUp'
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap'
import { TECH_ROWS } from '@/data/site'

/** Rows of tools that slide in opposite directions as the page scrolls. */
export default function Technologies() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.utils.toArray<HTMLElement>('.tech__row').forEach((row, i) => {
        const dir = i % 2 ? 1 : -1
        gsap.fromTo(
          row,
          { xPercent: dir > 0 ? -18 : 0 },
          {
            xPercent: dir > 0 ? 0 : -18,
            ease: 'none',
            scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 0.5 },
          }
        )
      })
    },
    { scope: root }
  )

  return (
    <section ref={root} className="section tech" id="technologies">
      <div className="shell tech__head">
        <SectionHeading
          eyebrow="Technologies"
          title={['The tools you will', { text: 'actually use at work', className: 'gradient-text' }]}
          lead="Programming, frameworks, AI & ML, databases, DevOps, cloud and CAD/CAM — updated as the industry moves."
        />
        <div className="tech__count" data-aos="zoom-in">
          <strong>
            <CountUp value={100} suffix="+" />
          </strong>
          <span>technologies taught, and growing</span>
        </div>
      </div>

      <div className="tech__rows" aria-label="Technologies taught">
        {TECH_ROWS.map((row, i) => (
          <ul className="tech__row" key={i}>
            {[...row, ...row].map((t, j) => (
              <li key={j} aria-hidden={j >= row.length} className={j % 4 === 1 ? 'is-hl' : undefined}>
                {t}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  )
}
