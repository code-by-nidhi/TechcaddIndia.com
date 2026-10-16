'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import DemoLink from '@/components/ui/DemoLink'
import { STEPS } from '@/data/site'
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from '@/lib/gsap'

/* The heading and its action stay pinned on the left while the four steps
   scroll past on the right along a vertical rail. The rail fills with the
   scroll, and each step lights up as it crosses the middle of the screen. */

const PHOTOS = ['/images/how/counselling.webp', '/images/course/lab.webp', '/images/how/project.webp', '/images/how/placement.webp']

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
    <section className="section cx-method" id="how-it-works">
      <div className="shell cx-method__grid">
        <div className="cx-method__copy">
          <h2 className="cx-title" data-aos="fade-up">
            From first call to <span className="cx-hl">first offer</span>
          </h2>
          <p data-aos="fade-up" data-aos-delay="100">
            Starting after 12th, switching careers or adding AI to the skills you already have — the path is the same
            four steps, in a techcadd centre or a live online batch.
          </p>
          <div data-aos="fade-up" data-aos-delay="200">
            <DemoLink className="btn">Book a free demo</DemoLink>
          </div>
        </div>

        <div className="cx-steps" ref={root}>
          <span className="cx-steps__rail" aria-hidden>
            <span className="cx-steps__fill" />
          </span>
          <ol>
            {STEPS.map((step, i) => (
              <li key={step.title} className="cx-step">
                <span className="cx-step__no" aria-hidden>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="cx-step__card">
                  <div className="cx-step__img">
                    <Image src={PHOTOS[i]} alt="" fill sizes="(max-width: 900px) 90vw, 260px" />
                  </div>
                  <div className="cx-step__body">
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                    <Link href="/about" className="cta-link">
                      Learn more
                    </Link>
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
