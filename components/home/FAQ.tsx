'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FiPlus } from 'react-icons/fi'

import SectionHeading from '@/components/ui/SectionHeading'
import { FAQS, SITE } from '@/data/site'

export default function FAQ() {
  const [open, setOpen] = useState(0)

  return (
    <section className="section faq" id="faq">
      <div className="shell faq__inner">
        <div>
          <SectionHeading
            eyebrow="FAQ"
            title={['Questions,', { text: 'answered', className: 'gradient-text' }]}
            lead={
              <>
                Can&apos;t find yours? <Link href="/contact">Talk to a counsellor</Link> or call{' '}
                <a href={SITE.phoneHref}>{SITE.phone}</a>.
              </>
            }
          />
        </div>

        <div className="faq__list">
          {FAQS.map((f, i) => {
            const isOpen = open === i
            return (
              <div className={`faq__item glass${isOpen ? ' is-open' : ''}`} key={f.q} data-aos="fade-up" data-aos-delay={i * 60}>
                <h3>
                  <button aria-expanded={isOpen} aria-controls={`faq-${i}`} onClick={() => setOpen(isOpen ? -1 : i)}>
                    {f.q}
                    <FiPlus aria-hidden />
                  </button>
                </h3>
                <div className="faq__a" id={`faq-${i}`} role="region">
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
