'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FiClock, FiMonitor, FiArrowRight } from 'react-icons/fi'

import SectionHeading from '@/components/ui/SectionHeading'
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap'
import { FEATURED_COURSES } from '@/data/site'

/**
 * Desktop: the section pins and vertical scroll drives the card rail sideways.
 * Touch / narrow screens: a native, snap-scrolling rail (no pin — pinning on
 * mobile fights the browser's own address-bar resize).
 */
export default function FeaturedCourses() {
  const root = useRef<HTMLElement>(null)
  const pinEl = useRef<HTMLDivElement>(null)
  const rail = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const mm = gsap.matchMedia()
      mm.add('(min-width: 1024px)', () => {
        const el = rail.current!
        const track = el.firstElementChild as HTMLElement
        const distance = () => Math.max(0, track.scrollWidth - el.clientWidth)
        gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            // Pin the inner wrapper, not the <section>: ScrollTrigger wraps
            // whatever it pins in a .pin-spacer div, and the navy/white band
            // rhythm counts <main>'s direct <section> children — wrapping the
            // section itself would shift every band below it.
            trigger: pinEl.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            scrub: 0.8,
            pin: pinEl.current,
            invalidateOnRefresh: true,
            onUpdate: (self) => gsap.set('.fc__progress-bar', { scaleX: self.progress }),
          },
        })
      })
      return () => mm.revert()
    },
    { scope: root }
  )

  return (
    <section ref={root} className="fc" id="featured-courses">
      <div ref={pinEl} className="section fc__pin">
        <div className="shell fc__head">
          <SectionHeading
            eyebrow="Featured courses"
            title={['Programs that', { text: 'get people hired', className: 'gradient-text' }]}
            lead="Every flagship course runs in classroom and live-online formats, with the same projects and placement support."
          />
          <div className="fc__progress" aria-hidden>
            <span className="fc__progress-bar" />
          </div>
        </div>

        <div className="fc__rail" ref={rail}>
          <div className="fc__track">
            {FEATURED_COURSES.map((c) => (
              <article className="fcard glass" key={c.slug}>
                <div className="fcard__img">
                  <Image src={c.image} alt="" fill sizes="(max-width: 1024px) 80vw, 420px" />
                  {c.highlight && <span className="fcard__badge">{c.highlight}</span>}
                </div>
                <div className="fcard__body">
                  <h3>{c.title}</h3>
                  <ul className="fcard__meta">
                    <li>
                      <FiClock aria-hidden /> {c.duration}
                    </li>
                    <li>
                      <FiMonitor aria-hidden /> {c.mode}
                    </li>
                  </ul>
                  <ul className="fcard__topics">
                    {c.topics.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                  <Link href={`/courses/${c.slug}`} className="fcard__link">
                    View course <FiArrowRight />
                  </Link>
                </div>
              </article>
            ))}
            <Link href="/courses" className="fcard fcard--all">
              <span>
                See all
                <br />
                courses
              </span>
              <FiArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
