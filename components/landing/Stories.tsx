'use client'

import { useRef, useState } from 'react'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'

import DemoLink from '@/components/ui/DemoLink'
import usePauseOffscreen from '@/components/fx/usePauseOffscreen'
import { TESTIMONIALS } from '@/data/site'

/* The dark band: one student's story large on the left, the whole class as
   a list on the right. The list advances by itself — the bar under the
   picked name is a CSS animation, and its end moves to the next story — and
   holds still while the pointer or focus is inside, or the band is off
   screen. */

const COUNT = TESTIMONIALS.length

const initials = (name: string) =>
  name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)

export default function Stories() {
  const band = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)
  usePauseOffscreen(band)

  const step = (dir: 1 | -1) => setActive((i) => (i + dir + COUNT) % COUNT)
  const t = TESTIMONIALS[active]

  return (
    <section className="section cx-stories" id="testimonials" ref={band}>
      <div className="shell">
        <div className="cx-head cx-head--split">
          <h2 className="cx-title" data-aos="fade-up">
            Heard from our students
          </h2>
          <p data-aos="fade-up" data-aos-delay="100">
            Every techcadd learner leaves with shipped projects, an internship letter and interview practice. Here is
            what that turned into for them.
          </p>
        </div>

        <div className="cx-stories__grid">
          <figure key={t.name} className="cx-spot">
            <span className="eyebrow">Student story</span>
            <blockquote>&ldquo;{t.quote}&rdquo;</blockquote>
            <figcaption>
              <span className="cx-avatar" aria-hidden>
                {initials(t.name)}
              </span>
              <span>
                <b>{t.name}</b>
                {t.role} · {t.city}
              </span>
            </figcaption>
            <div className="cx-spot__foot">
              <DemoLink className="btn btn--sm cx-btn-light">Start like {t.name.split(' ')[0]}</DemoLink>
              <div className="cx-arrows cx-arrows--dark">
                <button type="button" aria-label="Previous story" onClick={() => step(-1)}>
                  <FiArrowLeft />
                </button>
                <button type="button" aria-label="Next story" onClick={() => step(1)}>
                  <FiArrowRight />
                </button>
              </div>
            </div>
          </figure>

          <ul className="cx-voices">
            {TESTIMONIALS.map((v, i) => (
              <li key={v.name}>
                <button
                  type="button"
                  className={i === active ? 'is-active' : undefined}
                  aria-pressed={i === active}
                  onClick={() => setActive(i)}
                >
                  <span className="cx-avatar" aria-hidden>
                    {initials(v.name)}
                  </span>
                  <span className="cx-voices__who">
                    <b>{v.name}</b>
                    {v.role} · {v.city}
                  </span>
                  <span className="cx-voices__bar" aria-hidden onAnimationEnd={() => step(1)} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
