'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FiArrowUpRight, FiBriefcase, FiCpu, FiStar } from 'react-icons/fi'

import SplitHeading from '@/components/fx/SplitHeading'
import CountUp from '@/components/fx/CountUp'
import { CATEGORIES, SITE, STATS } from '@/data/site'
import { legacyCategoryHref } from '@/data/courses-menu'
import { gsap, prefersReducedMotion } from '@/lib/gsap'

/* ==========================================================================
   Hero — a split corporate banner. Kicker and headline on the left;
   on the right a layered collage of two photographs with a floating figure
   card. Under both runs a numbered index of the first four tracks, each with
   a rule that fills on hover.

   Motion: aurora blobs drift behind everything, a soft spotlight follows the
   pointer, the collage layers shift by depth with the pointer (through the
   --px/--py custom properties, so they compose with the CSS float loops).
   ========================================================================== */

export default function Hero() {
  const lead = STATS[0]
  const hero = useRef<HTMLElement>(null)

  /* pointer → spotlight position and eased parallax offsets (-1…1) */
  useEffect(() => {
    const el = hero.current
    if (!el || prefersReducedMotion() || !window.matchMedia('(pointer: fine)').matches) return
    const p = { x: 0, y: 0 }
    const toX = gsap.quickTo(p, 'x', { duration: 0.9, ease: 'power3.out', onUpdate: () => el.style.setProperty('--px', p.x.toFixed(3)) })
    const toY = gsap.quickTo(p, 'y', { duration: 0.9, ease: 'power3.out', onUpdate: () => el.style.setProperty('--py', p.y.toFixed(3)) })

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${e.clientX - r.left}px`)
      el.style.setProperty('--my', `${e.clientY - r.top}px`)
      toX(((e.clientX - r.left) / r.width) * 2 - 1)
      toY(((e.clientY - r.top) / r.height) * 2 - 1)
    }
    const leave = () => {
      toX(0)
      toY(0)
    }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  }, [])

  return (
    <section className="cx-hero" ref={hero}>
      <div className="cx-hero__aurora" aria-hidden>
        <span />
        <span />
        <span />
      </div>
      <div className="cx-hero__bg" aria-hidden />
      <div className="cx-hero__spot" aria-hidden />

      <div className="shell cx-hero__grid">
        <div className="cx-hero__copy">
          <p className="cx-hero__kicker">
            <span className="cx-hero__dot" aria-hidden />
            <FiStar aria-hidden />
            <strong>{SITE.rating.score}</strong> rated by {SITE.rating.reviews} learners
          </p>

          <SplitHeading
            as="h1"
            immediate
            delay={0.1}
            lines
            className="cx-hero__title"
            parts={['Learn the tech', { text: 'India runs on', className: 'cx-hero__em' }]}
          />

        </div>

        <div className="cx-hero__visual" aria-hidden>
          <div className="cx-hero__ring" />
          <div className="cx-hero__img cx-hero__img--main">
            <Image
              src="/images/franchise/benefits.webp"
              alt=""
              fill
              priority
              quality={90}
              sizes="(max-width: 960px) 92vw, 46vw"
            />
          </div>
          <div className="cx-hero__figure">
            <b>
              <CountUp value={lead.value} suffix={lead.suffix} />
            </b>
            <span>{lead.label}</span>
          </div>
          <span className="cx-hero__chip cx-hero__chip--ai">
            <FiCpu /> AI-first curriculum
          </span>
          <span className="cx-hero__chip cx-hero__chip--job">
            <FiBriefcase /> Placement support
          </span>
        </div>
      </div>

      <div className="shell">
        <ul className="cx-hero__index">
          {CATEGORIES.slice(0, 4).map((c, i) => (
            <li key={c.slug} data-aos="fade-up" data-aos-delay={300 + i * 80}>
              <Link href={legacyCategoryHref(c.slug)}>
                <span className="cx-hero__no">{String(i + 1).padStart(2, '0')}</span>
                <h2>{c.title}</h2>
                <p>{c.blurb}</p>
                <span className="cx-hero__more">
                  Know more <FiArrowUpRight aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
