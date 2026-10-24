'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { FiArrowRight } from 'react-icons/fi'

import { JOURNEY } from '@/data/site'
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from '@/lib/gsap'

/* Our journey. The heading and its actions stay pinned on the left while the
   milestones, one per year, scroll past on the right along a vertical rail.
   The rail fills with the scroll, and each year lights up as it crosses the
   middle of the screen. */

export default function Method() {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const wrap = root.current
      if (!wrap) return
      const steps = gsap.utils.toArray<HTMLElement>('.cx-step', wrap)
      if (prefersReducedMotion()) {
        steps.forEach((s) => s.classList.add('is-on'))
        return
      }
      gsap.fromTo(
        '.cx-steps__fill',
        { scaleY: 0 },
        { scaleY: 1, ease: 'none', scrollTrigger: { trigger: wrap, start: 'top 55%', end: 'bottom 55%', scrub: true } }
      )
      steps.forEach((s) => ScrollTrigger.create({ trigger: s, start: 'top 60%', toggleClass: 'is-on' }))
    },
    { scope: root }
  )

  return (
    <section className="section cx-method" id="journey">
      <div className="shell cx-method__grid">
        <div className="cx-method__copy">
          <span className="eyebrow" data-aos="fade-up">
            Our journey
          </span>
          <h2 className="cx-title" data-fx="words">
            A decade of <span className="cx-hl">building careers</span>
          </h2>
          <p data-aos="fade-up" data-aos-delay="120">
            What began in 2016 has evolved into a technology-focused training ecosystem with an expanding portfolio of
            courses and practical learning initiatives — and the focus keeps moving towards emerging areas such as
            Artificial Intelligence, automation, cloud technologies, cybersecurity, data and modern software
            development.
          </p>
          <div className="cx-method__ctas" data-aos="fade-up" data-aos-delay="200">
            <Link href="/franchises#apply" className="btn">
              Write the next chapter with us <FiArrowRight aria-hidden />
            </Link>
            <Link href="/about/our-story" className="cta-link">
              Our story
            </Link>
          </div>
        </div>

        <div className="cx-steps" ref={root}>
          <span className="cx-steps__rail" aria-hidden>
            <span className="cx-steps__fill" />
          </span>
          <ol>
            {JOURNEY.map((m) => (
              <li key={m.year} className="cx-step">
                <span className="cx-step__no cx-step__no--year">{m.year}</span>
                <div className="cx-step__card cx-step__card--text">
                  <div className="cx-step__body">
                    <h3>{m.title}</h3>
                    <p>{m.text}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
