'use client'

import { useCallback, useRef, useState, type KeyboardEvent } from 'react'
import Image from 'next/image'

import { FOUNDING, TIMELINE } from '@/data/journey-timeline'

/* "Our Journey": a full-width cinematic timeline. One photograph per year is
   stacked behind the content and the active one is cross-faded in; the large
   year, heading and description are re-mounted (keyed by year) so they fade and
   slide in. The year row is a tablist: click, tap, or use the arrow / Home /
   End keys. Nothing advances on its own.

   Images: the active year and its neighbours load eagerly so a switch never
   flashes; the rest load lazily when needed. */

export default function JourneyTimeline() {
  const [active, setActive] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const strip = useRef<HTMLDivElement>(null)

  const select = useCallback((i: number, focus = false) => {
    setActive(i)
    const tab = tabs.current[i]
    const box = strip.current
    if (tab && box) {
      // keep the chosen year in view inside the strip without scrolling the page
      box.scrollTo({ left: tab.offsetLeft - (box.clientWidth - tab.offsetWidth) / 2, behavior: 'smooth' })
      if (focus) tab.focus({ preventScroll: true })
    }
  }, [])

  const onKeyDown = (e: KeyboardEvent) => {
    const last = TIMELINE.length - 1
    const next =
      e.key === 'ArrowRight' ? Math.min(active + 1, last) : e.key === 'ArrowLeft' ? Math.max(active - 1, 0) : e.key === 'Home' ? 0 : e.key === 'End' ? last : null
    if (next === null) return
    e.preventDefault()
    select(next, true)
  }

  const entry = TIMELINE[active]

  return (
    <div className="jt-wrap">
      <section className="jt" aria-labelledby="jt-title">
        <div className="jt__bg" aria-hidden>
          {TIMELINE.map((t, i) => (
            <Image
              key={t.year}
              className={`jt__img${i === active ? ' is-on' : ''}`}
              src={t.image}
              alt=""
              fill
              sizes="100vw"
              quality={70}
              loading={Math.abs(i - active) <= 1 ? 'eager' : 'lazy'}
            />
          ))}
        </div>
        <div className="jt__shade" aria-hidden />

        <div className="shell jt__inner">
          <header className="jt__head">
            <p className="jt__label">
              Our Journey
              {FOUNDING && <span> · Since {FOUNDING.year}</span>}
            </p>
            <h2 id="jt-title" className="jt__title">
              10 Years of Innovation, Learning &amp; Growth
            </h2>
          </header>

          <div className="jt__story" aria-live="polite" id="jt-panel" role="tabpanel" aria-labelledby={`jt-tab-${entry.year}`}>
            <div key={entry.year} className="jt__fade">
              <p className="jt__year">{entry.year}</p>
              <h3 className="jt__heading">{entry.heading}</h3>
              <p className="jt__text">{entry.description}</p>
            </div>
          </div>

          <div className="jt__rail">
            <div className="jt__strip" ref={strip}>
              <div className="jt__tabs" role="tablist" aria-label="Techcadd timeline, by year" onKeyDown={onKeyDown}>
                {TIMELINE.map((t, i) => (
                  <button
                    key={t.year}
                    ref={(el) => {
                      tabs.current[i] = el
                    }}
                    id={`jt-tab-${t.year}`}
                    type="button"
                    role="tab"
                    aria-selected={i === active}
                    aria-controls="jt-panel"
                    tabIndex={i === active ? 0 : -1}
                    className={`jt__tab${i === active ? ' is-active' : ''}`}
                    onClick={() => select(i)}
                  >
                    {t.year}
                  </button>
                ))}
                <span
                  className="jt__mark"
                  aria-hidden
                  style={{ width: `${100 / TIMELINE.length}%`, transform: `translateX(${active * 100}%)` }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
