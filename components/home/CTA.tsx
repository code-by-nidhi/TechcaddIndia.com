'use client'

import { useState, type FormEvent } from 'react'
import { FiArrowRight, FiPhone, FiCheck } from 'react-icons/fi'

import SplitHeading from '@/components/fx/SplitHeading'
import Magnetic from '@/components/fx/Magnetic'
import { SITE } from '@/data/site'

const REASSURANCE = ['Free career counselling', 'No registration fee', 'Placement support included']

export default function CTA() {
  const [sent, setSent] = useState(false)

  // TODO: wire to the enquiry API / CRM. Currently only confirms client-side.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section className="section cta" id="demo">
      <div className="shell">
        <div className="cta__card section--navy" data-aos="zoom-in-up">
          <div className="cta__glow" aria-hidden />
          <SplitHeading parts={['Ready to', { text: 'get started?', className: 'gold-text' }]} className="cta__title" />
          <p className="cta__lead">
            Book a free demo class — at a centre near you or live online. A counsellor will call you within one working
            day.
          </p>

          {sent ? (
            <p className="cta__done" role="status">
              <FiCheck /> Thanks! We&apos;ll call you shortly.
            </p>
          ) : (
            <form className="cta__form" onSubmit={onSubmit}>
              <label htmlFor="cta-phone" className="sr-only">
                Mobile number
              </label>
              <span className="cta__prefix">+91</span>
              <input
                id="cta-phone"
                type="tel"
                inputMode="numeric"
                pattern="[6-9][0-9]{9}"
                maxLength={10}
                placeholder="Your mobile number"
                required
                autoComplete="tel-national"
              />
              <Magnetic strength={0.2}>
                <button type="submit" className="btn btn--gold">
                  Book Demo <FiArrowRight />
                </button>
              </Magnetic>
            </form>
          )}

          <a href={SITE.phoneHref} className="cta__call">
            <FiPhone /> Or call now {SITE.phone}
          </a>

          <ul className="cta__assure">
            {REASSURANCE.map((r) => (
              <li key={r}>
                <FiCheck aria-hidden /> {r}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
