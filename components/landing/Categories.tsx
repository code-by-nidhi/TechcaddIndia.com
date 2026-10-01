'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'

import SectionHeading from '@/components/ui/SectionHeading'
import { prefersReducedMotion } from '@/lib/gsap'
import { CATEGORIES } from '@/data/site'

/* Course categories — a scroll-snap rail of cards. It scrolls natively
   (touch, trackpad, keyboard); the two buttons move it one card at a time. */
export default function Categories() {
  const rail = useRef<HTMLUListElement>(null)

  const step = (dir: 1 | -1) => {
    const el = rail.current
    const card = el?.firstElementChild
    if (!el || !card) return
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0
    el.scrollBy({
      left: dir * (card.getBoundingClientRect().width + gap),
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    })
  }

  return (
    <section className="section sq-tint sq-cats" id="categories">
      <div className="shell">
        <div className="sq-head">
          <SectionHeading
            eyebrow="Course categories"
            title={['Six tracks,', { text: 'thirty-plus programs', className: 'sq-hl' }]}
            lead="Pick a direction first, then a duration. Counselling is free if you want help choosing."
          />
          <div className="sq-arrows">
            <button type="button" aria-label="Previous categories" onClick={() => step(-1)}>
              <FiArrowLeft aria-hidden />
            </button>
            <button type="button" aria-label="Next categories" onClick={() => step(1)}>
              <FiArrowRight aria-hidden />
            </button>
          </div>
        </div>

        <ul ref={rail} className="sq-rail">
          {CATEGORIES.map((c) => (
            <li key={c.slug}>
              <Link href={`/courses?category=${c.slug}`} className="sq-card">
                <div className="sq-card__img">
                  <Image
                    src={`/images/categories/${c.slug}.webp`}
                    alt=""
                    fill
                    sizes="(max-width: 900px) 70vw, 400px"
                  />
                </div>
                <h3>{c.title}</h3>
                <p>{c.blurb}</p>
                <span className="sq-card__foot">
                  {c.count} program{c.count === 1 ? '' : 's'}
                  <FiArrowRight aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <Link href="/courses" className="sq-link sq-cats__all">
          All courses <FiArrowRight aria-hidden />
        </Link>
      </div>
    </section>
  )
}
