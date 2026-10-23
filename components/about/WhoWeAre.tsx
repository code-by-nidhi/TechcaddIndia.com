'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

import { STATS } from '@/data/site'

/* "Who we are" — an enterprise-style company profile on a near-black navy band:
   a large headline and description, a wide event photograph beside a tall
   training photograph, and a row of five figures.

   Every figure comes from data/site.ts (STATS) or is a plain fact from the
   site's own copy; nothing here is invented. "10 Years" matches the 2016
   founding recorded in data/franchise.ts.

   The reveal runs once when the section scrolls into view; before the
   component mounts, and with reduced motion, everything is simply shown. */

const [students, partners, technologies, years] = STATS

const FIGURES = [
  { value: `${years.value}${years.suffix}`.replace(/^(\d+)\s*years$/, '$1 Years'), label: 'Years of training' },
  { value: `${students.value.toLocaleString('en-IN')}${students.suffix}`, label: 'Students trained' },
  { value: `${technologies.value}${technologies.suffix}`, label: 'Technologies taught' },
  { value: `${partners.value}${partners.suffix}`, label: 'Hiring partners' },
  { value: 'Live Projects', label: 'Career-focused training', text: true },
]

export default function WhoWeAre() {
  const ref = useRef<HTMLElement>(null)
  const [armed, setArmed] = useState(false)
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return
    setArmed(true)
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setSeen(true)
        io.disconnect()
      },
      { threshold: 0.12 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div className="wwa-wrap">
      <section ref={ref} className={`wwa${armed ? ' is-armed' : ''}${seen ? ' is-in' : ''}`} aria-labelledby="wwa-title">
        <div className="shell">
          <div className="wwa__grid">
            <div className="wwa__main">
              <p className="wwa__eyebrow wwa__in" style={{ ['--i' as string]: 0 }}>
                Who we are
              </p>
              <h2 id="wwa-title" className="wwa__title wwa__in" style={{ ['--i' as string]: 1 }}>
                <span>We Build Skills.</span>
                <span>
                  We Shape <em>Digital Futures.</em>
                </span>
              </h2>
              <p className="wwa__lead wwa__in" style={{ ['--i' as string]: 2 }}>
                Techcadd is a technology training and skill-development organization focused on bridging the gap between
                education and industry. Through practical learning, hands-on projects, and industry-relevant technologies, we
                help learners develop the skills and confidence needed to pursue careers in the digital economy.
              </p>

              <figure className="wwa__photo wwa__photo--wide wwa__in" style={{ ['--i' as string]: 3 }}>
                <Image
                  src="/images/gallery/auditorium-session.webp"
                  alt="A techcadd trainer presenting to a full auditorium"
                  fill
                  sizes="(max-width: 900px) 92vw, 52vw"
                />
                <figcaption>Seminars &amp; events</figcaption>
              </figure>
            </div>

            <figure className="wwa__photo wwa__photo--tall wwa__in" style={{ ['--i' as string]: 4 }}>
              <Image
                src="/images/campus/college-workshop.webp"
                alt="Learners with laptops at a techcadd hands-on workshop"
                fill
                sizes="(max-width: 900px) 92vw, 26vw"
              />
              <figcaption>Hands-on training</figcaption>
            </figure>
          </div>

          <ul className="wwa__stats">
            {FIGURES.map((f, i) => (
              <li key={f.label} className="wwa__stat wwa__in" style={{ ['--i' as string]: 5 + i * 0.6 }}>
                <strong className={f.text ? 'is-text' : undefined}>{f.value}</strong>
                <span>{f.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
