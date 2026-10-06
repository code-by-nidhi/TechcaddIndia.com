'use client'

import { useRef } from 'react'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'

import DemoLink from '@/components/ui/DemoLink'
import { TESTIMONIALS } from '@/data/site'

/* The black band: a short pitch on the left with blue arrows, and a rail of
   white cards — each one a student's story — that slides beside it. */

export default function Stories() {
  const rail = useRef<HTMLUListElement>(null)

  const slide = (dir: 1 | -1) => {
    const el = rail.current
    if (!el) return
    const card = el.querySelector('li')
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 320) + 24), behavior: 'smooth' })
  }

  return (
    <section className="section ix-action" id="testimonials">
      <div className="shell ix-action__inner">
        <div className="ix-action__copy">
          <h2>Heard from our students</h2>
          <p>
            Every techcadd learner leaves with shipped projects, an internship letter and interview practice. Here is
            what that turned into for them.
          </p>
          <div className="ix-arrows ix-arrows--blue">
            <button type="button" aria-label="Previous stories" onClick={() => slide(-1)}>
              <FiArrowLeft />
            </button>
            <button type="button" aria-label="Next stories" onClick={() => slide(1)}>
              <FiArrowRight />
            </button>
          </div>
        </div>

        <ul className="ix-action__rail" ref={rail}>
          {TESTIMONIALS.map((t) => (
            <li key={t.name} className="ix-acard">
              <span className="eyebrow">Student story</span>
              <h3>{t.name}</h3>
              <p className="ix-acard__role">
                {t.role} · {t.city}
              </p>
              <p>&ldquo;{t.quote}&rdquo;</p>
              <DemoLink className="btn btn--sm">Start like {t.name.split(' ')[0]}</DemoLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
