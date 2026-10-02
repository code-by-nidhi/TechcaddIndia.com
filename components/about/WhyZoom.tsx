'use client'

import { useRef } from 'react'
import { FiArrowRight } from 'react-icons/fi'

import DemoLink from '@/components/ui/DemoLink'
import { gsap, useGSAP } from '@/lib/gsap'
import { STATS } from '@/data/site'

/* ==========================================================================
   Why techcadd (About page) — a scroll-driven zoom.

   1. A large headline with a small glowing card, carrying the techcadd
      logo, set inline in the text.
   2. On scroll the stage pins and that card grows until it fills the
      viewport while the headline fades behind it.
   3. Four glass metric cards, the fine print and the CTA reveal on top.

   The pinning is plain CSS `position: sticky` (as in HowItWorks); GSAP only
   scrubs. The card is not scaled: `.whyz__fill` is a full-stage layer whose
   clip-path opens from the inline slot's box to the whole stage, so the
   artwork and the content inside it stay sharp at every step.

   Without JS, with reduced motion, or on very short viewports the section is
   a plain stacked layout: headline, then the panel (see `.whyz.is-pinned`).
   ========================================================================== */

const fmt = new Intl.NumberFormat('en-IN')

const CARDS = [
  { stat: STATS[2], text: 'A curriculum revised every intake against what hiring partners screen for now.' },
  { stat: STATS[3], text: 'Certified trainers who still build and ship in the field they teach.' },
  { stat: STATS[1], text: 'CV clinics, mock interviews and introductions that continue after the last class.' },
  { stat: STATS[0], text: 'Morning, evening, weekend and live online batches that fit around a job or college.' },
]

export default function WhyZoom() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const el = root.current
      if (!el) return
      const stage = el.querySelector<HTMLElement>('.whyz__stage')!
      const slot = el.querySelector<HTMLElement>('.whyz__slot')!
      const mark = el.querySelector<HTMLElement>('.whyz__mark')!

      const mm = gsap.matchMedia()
      mm.add('(min-height: 600px) and (prefers-reduced-motion: no-preference)', () => {
        el.classList.add('is-pinned')

        // The slot's box inside the stage. Offsets, not client rects, so the
        // headline's own scrubbed scale never leaks into the measurement.
        const closed = () => {
          const top = slot.offsetTop
          const left = slot.offsetLeft
          const right = stage.clientWidth - left - slot.offsetWidth
          const bottom = stage.clientHeight - top - slot.offsetHeight
          const radius = parseFloat(getComputedStyle(slot).borderTopLeftRadius) || 0
          return `inset(${top}px ${right}px ${bottom}px ${left}px round ${radius}px)`
        }

        // The logo rides above the fill layer, laid over the slot's box.
        const placeMark = () =>
          gsap.set(mark, {
            top: slot.offsetTop,
            left: slot.offsetLeft,
            width: slot.offsetWidth,
            height: slot.offsetHeight,
          })
        placeMark()

        // Staggered and late tweens don't render their start state up front,
        // so park the reveal content out of sight before the timeline exists.
        gsap.set('.whyz__card, .whyz__label, .whyz__foot', { autoAlpha: 0 })
        gsap.set('.whyz__glow', { opacity: 1 })

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.6,
            invalidateOnRefresh: true,
            onRefresh: placeMark,
          },
        })

        tl.fromTo(
          '.whyz__fill',
          { clipPath: closed },
          { clipPath: 'inset(0px 0px 0px 0px round 0px)', duration: 0.55, ease: 'power2.inOut' },
          0,
        )
          .to(mark, { autoAlpha: 0, scale: 1.8, duration: 0.2, ease: 'power1.in' }, 0.02)
          .to('.whyz__head', { autoAlpha: 0, scale: 1.12, duration: 0.3, ease: 'power1.in' }, 0.04)
          .fromTo('.whyz__glow', { opacity: 1 }, { opacity: 0.28, duration: 0.45 }, 0.15)
          .fromTo(
            '.whyz__card',
            { autoAlpha: 0, y: 48 },
            { autoAlpha: 1, y: 0, duration: 0.2, stagger: 0.04, ease: 'power2.out' },
            0.5,
          )
          .fromTo(
            '.whyz__label, .whyz__foot',
            { autoAlpha: 0, y: 24 },
            { autoAlpha: 1, y: 0, duration: 0.16, ease: 'power2.out' },
            0.66,
          )
          // hold the finished frame for the rest of the pin
          .to({}, { duration: 0.14 })

        return () => el.classList.remove('is-pinned')
      })
    },
    { scope: root },
  )

  return (
    <section className="whyz" id="why-techcadd" ref={root} aria-labelledby="why-title">
      <div className="whyz__stage">
        <div className="whyz__head">
          <span className="eyebrow">
            <span className="eyebrow__dot">✦</span>
            Why techcadd?
          </span>
          <h2 className="whyz__title" id="why-title">
            What takes years to figure out alone takes <span className="whyz__slot" aria-hidden /> months with the
            right mentors
          </h2>
        </div>

        <div className="whyz__fill">
          <div className="whyz__glow" aria-hidden />
          <div className="whyz__content">
            <p className="whyz__label">The techcadd difference</p>
            <div className="whyz__grid">
              {CARDS.map(({ stat, text }) => (
                <article className="whyz__card" key={stat.label}>
                  <strong>
                    {fmt.format(stat.value)}
                    {stat.suffix}
                  </strong>
                  <h3>{stat.label}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
            <div className="whyz__foot">
              <p>Cumulative figures across techcadd classroom centres and live online batches.</p>
              <DemoLink className="whyz__cta">
                Book a Free Demo <FiArrowRight aria-hidden />
              </DemoLink>
            </div>
          </div>
        </div>
        <span className="whyz__mark" aria-hidden />
      </div>
    </section>
  )
}
