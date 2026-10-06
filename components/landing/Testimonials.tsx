'use client'

import { useRef } from 'react'
import { FiArrowDown, FiStar } from 'react-icons/fi'

import { gsap, useGSAP } from '@/lib/gsap'
import { TESTIMONIALS } from '@/data/site'

/* ==========================================================================
   Testimonials — a scroll-driven scatter on a white stage.

   The stage pins (CSS `position: sticky`) with every review card piled in
   the centre, a short intro above the pile and a scroll hint below it. As
   the page scrolls the intro fades and the pile breaks up: each card slides
   out to its own spot round the edge, leaving the big headline in the
   middle. Spots are measured against the headline, so no card ever lands on
   it — on a short or narrow stage the cards run off the edge instead.

   Below 900px wide, on short viewports, with reduced motion or without JS
   the cards are a plain grid under the heading (see `.sq-testi.is-scatter`).
   ========================================================================== */

/* where each card ends up, as a share of the stage (centre of the card), its
   tilt, and the side of the headline it has to stay clear of */
const SPOTS = [
  { x: 0.2, y: 0.2, r: -4, side: 'top' },
  { x: 0.8, y: 0.19, r: 3, side: 'top' },
  { x: 0.115, y: 0.6, r: 2, side: 'left' },
  { x: 0.885, y: 0.57, r: -3, side: 'right' },
  { x: 0.33, y: 0.83, r: 3, side: 'bottom' },
  { x: 0.67, y: 0.84, r: -2, side: 'bottom' },
]

/* breathing room between the headline block and any card */
const CLEAR = 20

export default function Testimonials() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const el = root.current
      if (!el) return
      const stage = el.querySelector<HTMLElement>('.sq-quotes')!
      const cards = gsap.utils.toArray<HTMLElement>('.sq-quote', el)
      const head = el.querySelector<HTMLElement>('.sq-testi__head')!

      /* the headline block (tag, headline, lead) in stage coordinates; offsets,
         not client rects, so the head's own scale tween doesn't skew them */
      const textBox = () => {
        const parts = Array.from(head.children) as HTMLElement[]
        return {
          top: Math.min(...parts.map((p) => p.offsetTop)),
          bottom: Math.max(...parts.map((p) => p.offsetTop + p.offsetHeight)),
          left: Math.min(...parts.map((p) => p.offsetLeft)),
          right: Math.max(...parts.map((p) => p.offsetLeft + p.offsetWidth)),
        }
      }

      const mm = gsap.matchMedia()
      mm.add('(min-width: 900px) and (min-height: 620px) and (prefers-reduced-motion: no-preference)', () => {
        el.classList.add('is-scatter')

        gsap.set(cards, { xPercent: -50, yPercent: -50 })
        const tl = gsap.timeline({
          defaults: { ease: 'power2.inOut', duration: 1 },
          scrollTrigger: {
            trigger: '.sq-scatter',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        })

        // the intro makes way, and the headline comes up as the pile clears it
        tl.to('.sq-testi__intro', { autoAlpha: 0, y: -24, duration: 0.35, ease: 'power1.in' }, 0)
        tl.fromTo('.sq-testi__head', { autoAlpha: 0, scale: 0.86 }, { autoAlpha: 1, scale: 1, duration: 0.9 }, 0.15)
        cards.forEach((card, i) => {
          const spot = SPOTS[i % SPOTS.length]
          // piled: fanned a little, the first card on top
          const from = { x: 0, y: (i - (cards.length - 1) / 2) * 6, rotation: (i % 2 ? 1 : -1) * (3 + i * 2), scale: 0.92 }
          // its spot, pushed out as far as it takes to leave the headline uncovered
          const to = {
            x: () => {
              const box = textBox()
              const half = card.offsetWidth / 2 + CLEAR
              let x = spot.x * stage.clientWidth
              if (spot.side === 'left') x = Math.min(x, box.left - half)
              if (spot.side === 'right') x = Math.max(x, box.right + half)
              return x - stage.clientWidth / 2
            },
            y: () => {
              const box = textBox()
              const half = card.offsetHeight / 2 + CLEAR
              let y = spot.y * stage.clientHeight
              if (spot.side === 'top') y = Math.min(y, box.top - half)
              if (spot.side === 'bottom') y = Math.max(y, box.bottom + half)
              return y - stage.clientHeight / 2
            },
            rotation: spot.r,
            scale: 1,
          }
          tl.fromTo(card, from, to, i * 0.07)
        })
        // hold the finished layout for the rest of the pin
        tl.to({}, { duration: 0.5 })

        return () => el.classList.remove('is-scatter')
      })
    },
    { scope: root },
  )

  return (
    <section className="section sq-testi" id="testimonials" ref={root}>
      <div className="sq-scatter">
        <div className="sq-scatter__stage">
          <div className="sq-testi__head">
            <p className="sq-testi__tag">
              <span>Student stories</span>
              <b>{String(TESTIMONIALS.length).padStart(2, '0')}</b>
            </p>
            <h2>
              Heard from students
              <br />
              across the country.
            </h2>
            <p className="sq-testi__lead">
              From classrooms in Punjab to live batches in Bengaluru — what our learners say.
            </p>
          </div>

          {/* shown only while pinned, before the pile opens */}
          <div className="sq-testi__intro" aria-hidden>
            <p>
              <span>Student stories</span>
              <strong>From our classrooms to their careers.</strong>
            </p>
            <p className="sq-testi__hint">
              Scroll to open the stack <FiArrowDown />
            </p>
          </div>

          <div className="sq-quotes">
            {TESTIMONIALS.map((t, i) => (
              <figure className="sq-quote" key={t.name} style={{ zIndex: TESTIMONIALS.length - i }}>
                <div className="sq-quote__stars" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }, (_, s) => (
                    <FiStar key={s} className="star" aria-hidden />
                  ))}
                </div>
                <blockquote>“{t.quote}”</blockquote>
                <figcaption>
                  <span className="sq-quote__avatar" aria-hidden>
                    {t.name.charAt(0)}
                  </span>
                  <span>
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                    <span>{t.city}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
