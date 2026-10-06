'use client'

import { useState, type CSSProperties } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'

import { CATEGORIES, FEATURED_COURSES } from '@/data/site'

/* One wide card in focus — picture on the left, copy on the right — with a
   neighbour shrunk and blurred at either side, and a pair of arrows with a
   counter above. The row loops, so there is always a card on both sides. */

const COUNT = FEATURED_COURSES.length

const categoryTitle = (slug: string) => CATEGORIES.find((c) => c.slug === slug)?.title ?? 'Course'

/** Signed distance from the active card, taking the short way round the loop. */
const offset = (i: number, active: number) => {
  const half = Math.floor(COUNT / 2)
  return ((((i - active + half) % COUNT) + COUNT) % COUNT) - half
}

export default function TopCourses() {
  const [active, setActive] = useState(0)
  const step = (dir: 1 | -1) => setActive((i) => (i + dir + COUNT) % COUNT)

  return (
    <section className="ix-stories" id="featured-courses">
      <div className="shell ix-stories__head">
        <h2>Top courses</h2>
        <div className="ix-arrows">
          <button type="button" aria-label="Previous course" onClick={() => step(-1)}>
            <FiArrowLeft />
          </button>
          <span aria-live="polite">
            <b>{active + 1}</b>/{COUNT}
          </span>
          <button type="button" aria-label="Next course" onClick={() => step(1)}>
            <FiArrowRight />
          </button>
        </div>
      </div>

      <div className="ix-stories__view">
        <ul className="ix-stories__track">
          {FEATURED_COURSES.map((c, i) => {
            const o = offset(i, active)
            const on = o === 0
            return (
              <li
                key={c.slug}
                className={`ix-story${on ? ' is-active' : Math.abs(o) === 1 ? ' is-near' : ''}`}
                style={{ '--o': o } as CSSProperties}
                aria-hidden={!on}
                onClick={on ? undefined : () => setActive(i)}
              >
                <div className="ix-story__img">
                  <Image src={c.image} alt="" fill sizes="(max-width: 760px) 90vw, 400px" />
                </div>
                <div className="ix-story__body">
                  <span className="eyebrow">{c.highlight ?? categoryTitle(c.category)}</span>
                  <h3>{c.title}</h3>
                  <p>
                    {c.duration} · {c.mode}. You will work with {c.topics.join(', ')}.
                  </p>
                  <Link href={`/courses/${c.slug}`} className="cta-link" tabIndex={on ? 0 : -1}>
                    Read more
                  </Link>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
