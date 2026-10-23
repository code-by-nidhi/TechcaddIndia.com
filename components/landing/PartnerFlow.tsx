'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { FiZap } from 'react-icons/fi'

import { FRANCHISE_STATS } from '@/data/franchise'

/* ==========================================================================
   Partner flow — who partners with us on the left flows through the
   techcadd core into what partners get on the right. The highlighted row on
   each side steps through the list every few seconds.
   ========================================================================== */

const PERSONAS = ['I am an entrepreneur…', 'I run a coaching centre…', 'I want to invest in education…']

/** Revenue growth, enrolments and support — paired by index with PERSONAS. */
const OUTCOMES = [FRANCHISE_STATS[2], FRANCHISE_STATS[1], FRANCHISE_STATS[3]]

const STEP_MS = 2800

export default function PartnerFlow() {
  const [active, setActive] = useState(1)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => setActive((i) => (i + 1) % PERSONAS.length), STEP_MS)
    return () => window.clearInterval(id)
  }, [])

  return (
    <section className="section cx-partner" id="partner">
      <div className="shell">
        <div className="cx-head cx-head--center">
          <span className="eyebrow" data-aos="fade-up">
            Grow with techcadd
          </span>
          <h2 className="cx-title" data-aos="fade-up" data-aos-delay="80">
            Whoever you are, <span className="cx-hl">there is a place for you</span>
          </h2>
        </div>

        <div className="cx-flow" aria-hidden data-aos="fade-up" data-aos-delay="160">
          <ul className="cx-flow__in">
            {PERSONAS.map((p, i) => (
              <li key={p} className={i === active ? 'is-on' : undefined}>
                {i === active && <FiZap />}
                {p}
              </li>
            ))}
          </ul>

          <span className="cx-flow__beam cx-flow__beam--in" />

          <div className="cx-flow__core">
            <div className="cx-flow__disc">
              <Image src="/images/techcadd-logo-navy.png" alt="" width={120} height={32} />
              <strong>Franchise Network</strong>
              <span>Brand · Systems · Support</span>
              <i className="cx-flow__pip" />
            </div>
          </div>

          <span className="cx-flow__beam cx-flow__beam--out" />

          <ul className="cx-flow__out">
            {OUTCOMES.map((o, i) => (
              <li key={o.label} className={i === active ? 'is-on' : undefined}>
                <b>{o.value}</b>
                <span>{o.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
