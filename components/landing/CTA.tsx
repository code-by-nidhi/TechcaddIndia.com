'use client'

import { useState, type FormEvent } from 'react'
import { FiArrowRight, FiPhone, FiCheck } from 'react-icons/fi'

import SplitHeading from '@/components/fx/SplitHeading'
import { SITE } from '@/data/site'

const REASSURANCE = ['Free career counselling', 'No registration fee', 'Placement support included']

/* The dark closing band: the headline and its promise on the left, the
   enquiry on a frosted card on the right, over a faint grid and a violet
   glow. */
export default function CTA() {
  const [sent, setSent] = useState(false)

  // TODO: wire to the enquiry API / CRM. Currently only confirms client-side.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section className="section sq-cta" id="demo">
      <div className="shell sq-cta__inner">
        <div className="sq-cta__copy">
          <SplitHeading parts={['Ready to', { text: 'get started?', className: 'gold-text' }]} className="sq-cta__title" />
          <p className="sq-cta__lead">
            Book a free demo class — at a centre near you or live online. A counsellor will call you within one working
            day.
          </p>
        </div>

        <div className="sq-cta__card" data-aos="fade-up">
          {sent ? (
            <p className="sq-cta__done" role="status">
              <FiCheck aria-hidden /> Thanks! We&apos;ll call you shortly.
            </p>
          ) : (
            <form className="sq-cta__form" onSubmit={onSubmit}>
              <label htmlFor="cta-phone" className="sr-only">
                Mobile number
              </label>
              <span className="sq-cta__prefix">+91</span>
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
              <button type="submit" className="btn btn--gold">
                Book Demo <FiArrowRight aria-hidden />
              </button>
            </form>
          )}

          <ul className="sq-cta__assure">
            {REASSURANCE.map((r) => (
              <li key={r}>
                <FiCheck aria-hidden /> {r}
              </li>
            ))}
          </ul>

          <a href={SITE.phoneHref} className="sq-link">
            <FiPhone aria-hidden /> Or call now {SITE.phone}
          </a>
        </div>
      </div>
    </section>
  )
}
