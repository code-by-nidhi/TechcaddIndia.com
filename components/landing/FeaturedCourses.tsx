'use client'

import { useRef, type CSSProperties } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FiArrowRight } from 'react-icons/fi'

import SectionHeading from '@/components/ui/SectionHeading'
import { gsap, useGSAP } from '@/lib/gsap'
import { FEATURED_COURSES } from '@/data/site'

/* ==========================================================================
   Featured courses — a scroll-driven stack.

   The stage is one screen: a compact heading, the cards over a giant
   "Courses" watermark, and the browse button. It pins (CSS `position:
   sticky`, as in HowItWorks) and the scroll deals the course cards in one at a time from below: the first lands on the
   left, the second on the right, the third on the left again… so two piles
   build up, each card a little higher and tilted against the one under it.
   The last card lands in the centre, on top and slightly larger.

   Without JS, with reduced motion, or on very short viewports the cards are
   the plain grid (see `.sq-fc.is-stack` in landing.css).
   ========================================================================== */

const N = FEATURED_COURSES.length

export default function FeaturedCourses() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const el = root.current
      if (!el) return
      const stage = el.querySelector<HTMLElement>('.sq-courses')!
      const cards = gsap.utils.toArray<HTMLElement>('.sq-course', el)

      const mm = gsap.matchMedia()
      mm.add('(min-height: 560px) and (prefers-reduced-motion: no-preference)', () => {
        el.classList.add('is-stack')

        // how far a pile sits from the centre: a share of the stage, but never off its edge
        const reach = () => Math.min(stage.clientWidth * 0.31, stage.clientWidth / 2 - cards[0].offsetWidth / 2 - 8)

        gsap.set(cards, { xPercent: -50, yPercent: -50 })
        const tl = gsap.timeline({
          defaults: { ease: 'power3.out', duration: 1 },
          scrollTrigger: {
            trigger: '.sq-stack',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        })

        cards.forEach((card, i) => {
          const last = i === cards.length - 1
          const side = i % 2 ? 1 : -1 // left first, then right
          const layer = Math.floor(i / 2) // height in its pile
          const from = { x: 0, y: () => stage.clientHeight, rotation: side * 10, scale: 0.9 }
          const to = last
            ? { x: 0, y: 0, rotation: 0, scale: 1.08 }
            : {
                x: () => side * (reach() - layer * 6),
                y: 18 - layer * 16,
                rotation: side * (layer % 2 ? 2.5 : -3.5),
                scale: 1,
              }
          tl.fromTo(card, from, to, i * 0.8)
        })
        // hold the finished stack for the rest of the pin
        tl.to({}, { duration: 0.6 })
        // the word behind slides across for the whole pin
        tl.fromTo('.sq-stack__word', { xPercent: -56, yPercent: -50 }, { xPercent: -44, yPercent: -50, ease: 'none', duration: tl.duration() }, 0)

        return () => el.classList.remove('is-stack')
      })
    },
    { scope: root },
  )

  return (
    <section className="section sq-fc" id="featured-courses" ref={root}>
      <div className="sq-stack" style={{ '--n': N } as CSSProperties}>
        <div className="sq-stack__stage">
          {/* decorative: a giant word behind the piles, drifting as the cards land */}
          <span className="sq-stack__word" aria-hidden>
            Courses
          </span>

          <div className="shell sq-stack__inner">
            <SectionHeading
              eyebrow="Featured courses"
              title={['What most students', { text: 'are enrolling in', className: 'sq-hl' }]}
              lead="Every one of these runs in classroom and live-online formats, with lab hours, a live project and placement support."
            />

            <div className="sq-courses">
              {FEATURED_COURSES.map((c) => (
                <Link href={`/courses/${c.slug}`} className="sq-course" key={c.slug}>
                  <div className="sq-course__img">
                    {/* eager: a card waits below the stage, where lazy loading would leave it blank as it flies in */}
                    <Image src={c.image} alt="" fill sizes="(max-width: 760px) 50vw, 25vw" loading="eager" />
                    {c.highlight && <span className="sq-course__badge">{c.highlight}</span>}
                  </div>
                  <h3>
                    {c.title}
                    <span className="sq-course__go" aria-hidden>
                      <FiArrowRight />
                    </span>
                  </h3>
                  <span className="sq-course__meta">
                    {c.duration} · {c.mode}
                  </span>
                  <span className="sq-course__topics">{c.topics.join(', ')}</span>
                </Link>
              ))}
            </div>

            <div className="sq-courses__foot">
              <Link href="/courses" className="btn">
                Browse all courses <FiArrowRight aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
