'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { FiMapPin, FiWifi, FiArrowUpRight } from 'react-icons/fi'

import SectionHeading from '@/components/ui/SectionHeading'
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap'
import { CITIES, CENTRES, type City } from '@/data/site'

/* Equirectangular projection of India's bounding box into the SVG viewBox. */
const W = 560
const H = 620
const BOUNDS = { lonMin: 68, lonMax: 97.5, latMin: 6.5, latMax: 37.5 }
const project = (c: City) => ({
  x: ((c.lon - BOUNDS.lonMin) / (BOUNDS.lonMax - BOUNDS.lonMin)) * W,
  y: ((BOUNDS.latMax - c.lat) / (BOUNDS.latMax - BOUNDS.latMin)) * H,
})

const HQ = CITIES.find((c) => c.hq)!
const ONLINE = CITIES.filter((c) => c.kind === 'online')
/* Cities whose label would collide with a neighbour if drawn to the right. */
const LABEL_LEFT = new Set(['mumbai', 'ahmedabad', 'bengaluru', 'kochi'])

/** Curved arc from HQ to a city, bowed perpendicular to the straight line. */
function arcPath(to: City) {
  const a = project(HQ)
  const b = project(to)
  const mx = (a.x + b.x) / 2
  const my = (a.y + b.y) / 2
  const dx = b.x - a.x
  const dy = b.y - a.y
  const bow = 0.22
  return `M${a.x},${a.y} Q${mx - dy * bow},${my + dx * bow} ${b.x},${b.y}`
}

export default function IndiaPresence() {
  const root = useRef<HTMLElement>(null)
  const [active, setActive] = useState<string | null>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const arcs = gsap.utils.toArray<SVGPathElement>('.map__arc')
      arcs.forEach((p) => {
        const len = p.getTotalLength()
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len })
      })
      const tl = gsap.timeline({ scrollTrigger: { trigger: '.map', start: 'top 70%' } })
      tl.from('.map__hq', { scale: 0, transformOrigin: 'center', duration: 0.8, ease: 'back.out(2)' })
        .to(arcs, { strokeDashoffset: 0, duration: 1.2, ease: 'power2.inOut', stagger: 0.07 }, 0.2)
        .from('.map__city', { scale: 0, opacity: 0, transformOrigin: 'center', duration: 0.5, stagger: 0.07, ease: 'back.out(3)' }, 0.8)
    },
    { scope: root }
  )

  const hq = project(HQ)

  return (
    <section ref={root} className="section india" id="across-india">
      <div className="shell india__inner">
        <div className="india__copy">
          <SectionHeading
            eyebrow="Across India"
            icon={<FiMapPin />}
            title={['One institute.', { text: 'Every corner of India.', className: 'gradient-text' }]}
            lead="Seven centres across Punjab and Chandigarh, and live online batches that bring the same mentors, labs and placement drives to learners in every state."
          />

          <div className="india__block" data-aos="fade-up">
            <h3>
              <FiMapPin aria-hidden /> Classroom centres
            </h3>
            <ul className="india__chips">
              {CENTRES.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/branches/${c.slug}`}
                    className={`chip${active === c.slug ? ' is-active' : ''}`}
                    onMouseEnter={() => setActive(c.slug)}
                    onMouseLeave={() => setActive(null)}
                  >
                    {c.name}
                    {c.hq && <em>HQ</em>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="india__block" data-aos="fade-up" data-aos-delay="100">
            <h3>
              <FiWifi aria-hidden /> Live online — learners from
            </h3>
            <ul className="india__chips">
              {ONLINE.map((c) => (
                <li key={c.slug}>
                  <span
                    className={`chip chip--ghost${active === c.slug ? ' is-active' : ''}`}
                    onMouseEnter={() => setActive(c.slug)}
                    onMouseLeave={() => setActive(null)}
                  >
                    {c.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <Link href="/branches" className="btn btn--gold" data-aos="fade-up">
            Find a centre near you <FiArrowUpRight />
          </Link>
        </div>

        <div className="map" aria-hidden>
          <svg viewBox={`-20 -20 ${W + 40} ${H + 40}`}>
            <defs>
              <pattern id="dots" width="14" height="14" patternUnits="userSpaceOnUse">
                <circle cx="1.5" cy="1.5" r="1.2" className="map__grid-dot" />
              </pattern>
              <radialGradient id="hqGlow">
                <stop offset="0%" stopColor="#ffc81c" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#ffc81c" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="arcGrad" x1="0" x2="1">
                <stop offset="0%" stopColor="#ffc81c" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>

            <rect x="-20" y="-20" width={W + 40} height={H + 40} fill="url(#dots)" rx="30" />

            {ONLINE.map((c) => (
              <path key={c.slug} className={`map__arc${active === c.slug ? ' is-active' : ''}`} d={arcPath(c)} />
            ))}

            {ONLINE.map((c) => {
              const p = project(c)
              const on = active === c.slug
              return (
                <g key={c.slug} className={`map__city${on ? ' is-active' : ''}`}>
                  <circle cx={p.x} cy={p.y} r="12" className="map__pulse" />
                  <circle cx={p.x} cy={p.y} r="5" className="map__dot" />
                  {LABEL_LEFT.has(c.slug) ? (
                    <text x={p.x - 10} y={p.y + 4} textAnchor="end">
                      {c.name}
                    </text>
                  ) : (
                    <text x={p.x + 10} y={p.y + 4}>
                      {c.name}
                    </text>
                  )}
                </g>
              )
            })}

            {/* Punjab cluster: centres sit too close to label individually at this scale */}
            {CENTRES.filter((c) => !c.hq).map((c) => {
              const p = project(c)
              return <circle key={c.slug} cx={p.x} cy={p.y} r="3.5" className={`map__centre${active === c.slug ? ' is-active' : ''}`} />
            })}

            <g className="map__hq">
              <circle cx={hq.x} cy={hq.y} r="46" fill="url(#hqGlow)" />
              <circle cx={hq.x} cy={hq.y} r="8" className="map__hq-dot" />
              <text x={hq.x + 16} y={hq.y - 14} className="map__hq-label">
                Punjab · 7 centres
              </text>
            </g>
          </svg>
        </div>
      </div>
    </section>
  )
}
