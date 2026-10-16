'use client'

import { useId, useState } from 'react'
import Link from 'next/link'
import { FiArrowRight, FiMessageCircle, FiPhone, FiPlus } from 'react-icons/fi'

import SectionHeading from '@/components/ui/SectionHeading'
import DemoLink from '@/components/ui/DemoLink'
import { SITE } from '@/data/site'

type QA = { q: string; a: string }

/**
 * Internship FAQ: a sticky heading and counsellor card on the left, numbered
 * accordion on the right. Emits FAQPage structured data for the same answers.
 */
export default function InternshipFAQ({ items, title = 'internships' }: { items: QA[]; title?: string }) {
  const [open, setOpen] = useState(0)
  const uid = useId()

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }

  return (
    <section className="section ifaq" id="faq">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="shell ifaq__inner">
        <aside className="ifaq__aside">
          <SectionHeading
            eyebrow="FAQ"
            title={['Questions about ', { text: title, className: 'gradient-text' }]}
            lead="Straight answers on fees, certificates, online batches and placements — the things students across India ask us most."
          />

          <div className="ifaq__help" data-aos="fade-up" data-aos-delay="150">
            <span className="ifaq__help-icon">
              <FiMessageCircle aria-hidden />
            </span>
            <h3>Still have a question?</h3>
            <p>A counsellor will call you back within one working day — free, and with no obligation to enrol.</p>
            <div className="ifaq__help-actions">
              <DemoLink className="btn btn--gold btn--sm">
                Book a free demo <FiArrowRight aria-hidden />
              </DemoLink>
              <a href={SITE.phoneHref} className="ifaq__phone">
                <FiPhone aria-hidden /> {SITE.phone}
              </a>
            </div>
          </div>
        </aside>

        <div>
          <ol className="ifaq__list">
            {items.map((f, i) => {
              const isOpen = open === i
              const id = `${uid}-${i}`
              return (
                <li className={`ifaq__item${isOpen ? ' is-open' : ''}`} key={f.q} data-aos="fade-up" data-aos-delay={Math.min(i, 5) * 50}>
                  <h3>
                    <button type="button" aria-expanded={isOpen} aria-controls={id} onClick={() => setOpen(isOpen ? -1 : i)}>
                      <span className="ifaq__num">{String(i + 1).padStart(2, '0')}</span>
                      <span className="ifaq__q">{f.q}</span>
                      <span className="ifaq__toggle" aria-hidden>
                        <FiPlus />
                      </span>
                    </button>
                  </h3>
                  <div className="ifaq__a" id={id} role="region" aria-hidden={!isOpen}>
                    <div>
                      <p>{f.a}</p>
                    </div>
                  </div>
                </li>
              )
            })}
          </ol>
          <p className="ifaq__more">
            Looking for something else? <Link href="/contact">Contact us</Link> or see the <Link href="/#faq">general FAQ</Link>.
          </p>
        </div>
      </div>
    </section>
  )
}
