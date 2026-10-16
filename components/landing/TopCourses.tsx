'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FiArrowLeft, FiArrowRight, FiArrowUpRight } from 'react-icons/fi'

import { CATEGORIES, FEATURED_COURSES } from '@/data/site'

/* An edge-to-edge rail of tall picture cards that snaps card by card. It
   starts on the shell's left edge and runs off the right side of the page;
   arrows, a counter and a progress rule follow the scroll position. */

const COUNT = FEATURED_COURSES.length

const categoryTitle = (slug: string) => CATEGORIES.find((c) => c.slug === slug)?.title ?? 'Course'

export default function TopCourses() {
  const rail = useRef<HTMLUListElement>(null)
  const [active, setActive] = useState(0)
  const [progress, setProgress] = useState(0)

  const cardStep = () => {
    const el = rail.current
    const card = el?.querySelector('li')
    return card ? card.offsetWidth + parseFloat(getComputedStyle(el!).columnGap || '0') : 320
  }

  const onScroll = () => {
    const el = rail.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setProgress(max > 0 ? el.scrollLeft / max : 0)
    setActive(Math.min(COUNT - 1, Math.round(el.scrollLeft / cardStep())))
  }

  const slide = (dir: 1 | -1) => rail.current?.scrollBy({ left: dir * cardStep(), behavior: 'smooth' })

  return (
    <section className="section cx-courses" id="featured-courses">
      <div className="shell cx-head">
        <h2 className="cx-title" data-aos="fade-up">
          Top courses
        </h2>
        <div className="cx-arrows">
          <button type="button" aria-label="Previous course" onClick={() => slide(-1)} disabled={progress <= 0.001}>
            <FiArrowLeft />
          </button>
          <span aria-live="polite">
            <b>{String(active + 1).padStart(2, '0')}</b> / {String(COUNT).padStart(2, '0')}
          </span>
          <button type="button" aria-label="Next course" onClick={() => slide(1)} disabled={progress >= 0.999}>
            <FiArrowRight />
          </button>
        </div>
      </div>

      <ul className="cx-rail" ref={rail} onScroll={onScroll}>
        {FEATURED_COURSES.map((c, i) => (
          <li key={c.slug} className="cx-course" data-aos="fade-up" data-aos-delay={Math.min(i, 3) * 90}>
            <Image src={c.image} alt="" fill sizes="(max-width: 760px) 80vw, 380px" />
            <span className="eyebrow">{c.highlight ?? categoryTitle(c.category)}</span>
            <div className="cx-course__body">
              <h3>{c.title}</h3>
              <p>
                {c.duration} · {c.mode}. You will work with {c.topics.join(', ')}.
              </p>
              <Link href={`/courses/${c.slug}`} className="cx-course__link">
                Read more <FiArrowUpRight aria-hidden />
              </Link>
            </div>
          </li>
        ))}
      </ul>

      <div className="shell">
        <div className="cx-progress" aria-hidden>
          <span style={{ transform: `scaleX(${Math.max(progress, 1 / COUNT)})` }} />
        </div>
      </div>
    </section>
  )
}
