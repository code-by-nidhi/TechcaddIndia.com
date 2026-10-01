'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FiArrowRight, FiPlus } from 'react-icons/fi'

import SectionHeading from '@/components/ui/SectionHeading'
import { STEPS } from '@/data/site'

/* How it works — the heading stays pinned on the left while the four steps
   sit on the right as a numbered accordion, one open at a time. */
export default function HowItWorks() {
  const [open, setOpen] = useState(0)

  return (
    <section className="section sq-tint sq-how" id="how-it-works">
      <div className="shell sq-how__inner">
        <div className="sq-how__intro">
          <SectionHeading
            eyebrow="How it works"
            title={['From first call to', { text: 'first offer', className: 'sq-hl' }]}
            lead="The same four-step path in every city — whether you walk into a centre or log in from home."
          />
          <Link href="/contact" className="btn">
            Get Started <FiArrowRight aria-hidden />
          </Link>
        </div>

        <ol className="sq-steps">
          {STEPS.map((s, i) => {
            const isOpen = open === i
            return (
              <li key={s.title} className={`sq-step${isOpen ? ' is-open' : ''}`}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`step-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    <span className="sq-step__num">{String(i + 1).padStart(2, '0')}</span>
                    {s.title}
                    <FiPlus aria-hidden />
                  </button>
                </h3>
                <div className="sq-acc" id={`step-${i}`} role="region" inert={!isOpen}>
                  <div>
                    <p>{s.text}</p>
                  </div>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
