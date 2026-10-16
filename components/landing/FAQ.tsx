'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FiPlus } from 'react-icons/fi'

import SectionHeading from '@/components/ui/SectionHeading'
import { FAQS, SITE } from '@/data/site'

export default function FAQ() {
  const [open, setOpen] = useState(0)

  return (
    <section className="section sq-faq" id="faq">
      <div className="shell sq-faq__inner">
        <div className="sq-faq__intro">
          <SectionHeading
            eyebrow="FAQ"
            title={['Questions,', { text: 'answered', className: 'sq-hl' }]}
            lead={
              <>
                Can&apos;t find yours? <Link href="/contact">Talk to a counsellor</Link> or call{' '}
                <a href={SITE.phoneHref}>{SITE.phone}</a>.
              </>
            }
          />
        </div>

        <div className="sq-faq__list">
          {FAQS.map((f, i) => {
            const isOpen = open === i
            return (
              <div className={`sq-faq__item${isOpen ? ' is-open' : ''}`} key={f.q}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    <span className="sq-faq__no" aria-hidden>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="sq-faq__q">{f.q}</span>
                    <FiPlus aria-hidden />
                  </button>
                </h3>
                <div className="sq-acc" id={`faq-${i}`} role="region" inert={!isOpen}>
                  <div>
                    <p>{f.a}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
