'use client'

import { useEffect, useRef, useState } from 'react'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'

import DemoLink from '@/components/ui/DemoLink'
import usePauseOffscreen from '@/components/fx/usePauseOffscreen'
import { TESTIMONIALS } from '@/data/site'

/* The dark band: an automatic slider of student stories across the full
   width — two cards in view on desktop, one on smaller screens — moving one
   card at a time. Dots, arrows or a swipe pick a position. It advances by
   itself: the bar under the cards is a CSS animation whose end moves the
   slider on, and it holds still while the pointer or focus is inside or the
   band is off screen. */

const COUNT = TESTIMONIALS.length
/** matches the breakpoint in landing.css where the slider shows one card */
const ONE_UP = '(max-width: 960px)'

const initials = (name: string) =>
  name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)

export default function Stories() {
  const band = useRef<HTMLElement>(null)
  const swipeX = useRef<number | null>(null)
  const [perView, setPerView] = useState(2)
  const [active, setActive] = useState(0)
  usePauseOffscreen(band)

  useEffect(() => {
    const mq = window.matchMedia(ONE_UP)
    const sync = () => setPerView(mq.matches ? 1 : 2)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  /* the positions the slider can stop at, so the last card is never followed by a gap */
  const stops = COUNT - perView + 1
  const at = Math.min(active, stops - 1)
  const step = (dir: 1 | -1) => setActive((i) => (Math.min(i, stops - 1) + dir + stops) % stops)

  return (
    <section className="section cx-stories" id="testimonials" ref={band} data-fx="band">
      <div className="shell">
        <div className="cx-head cx-head--split">
          <h2 className="cx-title" data-fx="words">
            Heard from our students
          </h2>
          <p data-fx="reveal" data-fx-delay="0.1">
            Every techcadd learner leaves with shipped projects, an internship letter and interview practice. Here is
            what that turned into for them.
          </p>
        </div>

        <div className="cx-reviews" role="region" aria-roledescription="carousel" aria-label="Student stories">
          <div
            className="cx-slider"
            onPointerDown={(e) => {
              swipeX.current = e.clientX
            }}
            onPointerUp={(e) => {
              const dx = e.clientX - (swipeX.current ?? e.clientX)
              swipeX.current = null
              if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1)
            }}
          >
            <div className="cx-slider__track" style={{ transform: `translateX(${(-at * 100) / perView}%)` }} aria-live="polite">
              {TESTIMONIALS.map((s, i) => {
                const shown = i >= at && i < at + perView
                return (
                  <figure
                    key={s.name}
                    className={`cx-slide${shown ? ' is-active' : ''}`}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${i + 1} of ${COUNT}`}
                    aria-hidden={!shown}
                    inert={!shown}
                  >
                    <div className="cx-spot">
                      <span className="eyebrow">Student story</span>
                      <blockquote>&ldquo;{s.quote}&rdquo;</blockquote>
                      <figcaption>
                        <span className="cx-avatar" aria-hidden>
                          {initials(s.name)}
                        </span>
                        <span>
                          <b>{s.name}</b>
                          {s.role} · {s.city}
                        </span>
                      </figcaption>
                    </div>
                  </figure>
                )
              })}
            </div>
          </div>

          <div className="cx-reviews__foot">
            {/* keyed by position, so the timer restarts on every move */}
            <span className="cx-reviews__timer" aria-hidden>
              <span key={at} onAnimationEnd={() => step(1)} />
            </span>
            <DemoLink className="btn btn--sm cx-btn-light">Start your story</DemoLink>
            <div className="cx-dots" role="tablist" aria-label="Choose a story">
              {Array.from({ length: stops }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === at}
                  aria-label={`Go to story ${i + 1}`}
                  className={i === at ? 'is-active' : undefined}
                  onClick={() => setActive(i)}
                />
              ))}
            </div>
            <div className="cx-arrows cx-arrows--dark">
              <button type="button" aria-label="Previous story" onClick={() => step(-1)}>
                <FiArrowLeft />
              </button>
              <button type="button" aria-label="Next story" onClick={() => step(1)}>
                <FiArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
