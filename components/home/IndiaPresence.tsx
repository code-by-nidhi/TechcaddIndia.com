'use client'

import { useRef, useState, type CSSProperties } from 'react'
import Link from 'next/link'
import type { IconType } from 'react-icons'
import { FiMapPin, FiWifi, FiMap, FiUsers, FiChevronDown, FiArrowRight } from 'react-icons/fi'

import DemoLink from '@/components/ui/DemoLink'
import SectionHeading from '@/components/ui/SectionHeading'
import CountUp from '@/components/fx/CountUp'
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap'
import { CITIES, CENTRES, STATS, type City } from '@/data/site'

/* ==========================================================================
   Across India — centred heading, a city picker, a dotted map of India with
   a pin per city (the picked one carries a callout), and a row of numbers.

   The map is drawn, not an image: a dot grid is laid over India's bounding
   box and only the dots that fall inside a simplified outline are kept. At
   this dot spacing (~0.5°) the outline only needs to be roughly right.
   ========================================================================== */

/* Equirectangular projection of India's bounding box into the SVG viewBox. */
const W = 560
const H = 620
const BOUNDS = { lonMin: 68, lonMax: 97.5, latMin: 6.5, latMax: 37.5 }
const toX = (lon: number) => ((lon - BOUNDS.lonMin) / (BOUNDS.lonMax - BOUNDS.lonMin)) * W
const toY = (lat: number) => ((BOUNDS.latMax - lat) / (BOUNDS.latMax - BOUNDS.latMin)) * H
const project = (c: City) => ({ x: toX(c.lon), y: toY(c.lat) })

/* Simplified mainland outline, [lon, lat], anticlockwise from Kutch. */
const OUTLINE: [number, number][] = [
  [68.2, 23.6], [69.1, 22.8], [70.4, 22.9], [70.0, 22.5], [69.1, 22.3], [69.6, 21.6], [70.4, 20.9],
  [71.0, 20.7], [71.9, 21.0], [72.3, 22.2], [72.7, 22.1], [72.8, 21.2], [72.9, 20.1], [72.8, 19.0],
  [73.0, 18.0], [73.3, 17.0], [73.7, 15.8], [74.1, 14.9], [74.5, 13.8], [74.8, 12.9], [75.4, 11.8],
  [75.8, 11.0], [76.2, 10.0], [76.6, 9.0], [77.0, 8.3], [77.55, 8.07], [78.1, 8.5], [78.3, 9.1],
  [79.1, 9.3], [79.3, 10.3], [79.85, 10.3], [79.85, 11.8], [80.3, 13.1], [80.2, 14.2], [80.1, 15.1],
  [80.4, 15.9], [81.2, 16.3], [82.3, 16.6], [83.3, 17.6], [84.2, 18.3], [85.1, 19.3], [86.4, 19.9],
  [86.9, 20.8], [87.3, 21.5], [88.0, 21.6], [88.7, 21.6], [89.05, 21.9],
  // around Bangladesh: west side north, then its north and east sides
  [88.8, 22.9], [88.6, 24.2], [88.1, 24.6], [88.5, 25.2], [88.1, 25.8], [88.45, 26.6], [89.8, 26.0],
  [89.9, 25.3], [91.5, 25.15], [92.4, 24.9], [92.2, 24.3], [91.3, 24.0], [91.2, 23.5], [91.8, 23.0],
  [92.3, 22.7], [92.6, 21.95],
  // Myanmar border north, then Arunachal and the Himalaya westward
  [93.2, 22.2], [93.4, 23.9], [94.2, 23.9], [94.6, 24.8], [95.2, 26.0], [95.3, 26.6], [96.1, 27.2],
  [97.1, 27.2], [97.3, 28.2], [96.6, 28.6], [96.2, 29.4], [95.4, 29.0], [94.6, 29.3], [94.0, 28.9],
  [93.0, 28.2], [92.5, 27.8], [91.6, 27.8], [92.1, 27.3], [92.1, 26.8], [91.0, 26.8], [89.1, 26.7],
  [88.9, 27.3], [88.8, 27.9], [88.6, 28.1], [88.1, 27.9], [88.1, 27.4], [88.0, 26.7], [88.1, 26.4],
  // Nepal's southern border
  [87.3, 26.4], [86.0, 26.6], [85.0, 26.8], [84.2, 27.4], [82.7, 27.5], [81.9, 27.9], [81.0, 28.4],
  [80.1, 28.8], [80.4, 29.8], [81.0, 30.2],
  // Uttarakhand, Himachal and Ladakh up to the northern tip
  [80.2, 30.8], [79.1, 31.3], [78.8, 31.9], [78.7, 32.5], [79.5, 32.6], [79.3, 33.2], [80.1, 35.0],
  [80.3, 35.5], [79.9, 35.9], [78.0, 35.5], [77.0, 36.0], [76.5, 36.4], [75.8, 36.8], [74.9, 37.1],
  [74.5, 37.0], [72.6, 36.8], [72.5, 35.8], [73.3, 35.0], [73.4, 34.3], [73.7, 33.0],
  // Pakistan border south to the Rann of Kutch
  [74.6, 32.8], [75.3, 32.2], [74.7, 31.9], [74.55, 31.4], [74.6, 31.0], [74.0, 30.3], [73.4, 29.9],
  [72.9, 29.2], [72.3, 28.1], [71.0, 27.9], [70.5, 27.1], [70.1, 26.4], [70.2, 25.7], [71.1, 24.7],
  [70.0, 24.3], [68.8, 24.3],
]

/* Islands are too slim for the grid to catch, so they get hand-placed dots. */
const ISLANDS: [number, number][] = [
  [92.8, 13.4], [92.8, 12.8], [92.75, 12.2], [92.7, 11.6], [92.6, 11.0], [92.55, 10.6], [92.8, 9.2],
  [93.5, 8.2], [93.85, 7.2], [72.7, 11.2], [73.0, 10.5], [72.6, 10.0],
]

function inside(lon: number, lat: number) {
  let hit = false
  for (let i = 0, j = OUTLINE.length - 1; i < OUTLINE.length; j = i++) {
    const [xi, yi] = OUTLINE[i]
    const [xj, yj] = OUTLINE[j]
    if (yi > lat !== yj > lat && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) hit = !hit
  }
  return hit
}

/* Every dot as one path of tiny circles — one DOM node instead of ~1,500. */
const STEP = 10
const R = 2.6
const dot = (x: number, y: number) => `M${x - R},${y}a${R},${R} 0 1,0 ${R * 2},0a${R},${R} 0 1,0 ${-R * 2},0`
const DOTS = (() => {
  let d = ''
  for (let y = STEP / 2; y < H; y += STEP) {
    for (let x = STEP / 2; x < W; x += STEP) {
      const lon = BOUNDS.lonMin + (x / W) * (BOUNDS.lonMax - BOUNDS.lonMin)
      const lat = BOUNDS.latMax - (y / H) * (BOUNDS.latMax - BOUNDS.latMin)
      if (inside(lon, lat)) d += dot(x, y)
    }
  }
  // snap island dots to the grid so they line up with the mainland
  const snap = (v: number) => Math.floor(v / STEP) * STEP + STEP / 2
  for (const [lon, lat] of ISLANDS) d += dot(snap(toX(lon)), snap(toY(lat)))
  return d
})()

const HQ = CITIES.find((c) => c.hq)!
const ONLINE = CITIES.filter((c) => c.kind === 'online')

const NUMBERS: { Icon: IconType; value: number; suffix?: string; label: string }[] = [
  { Icon: FiMapPin, value: CENTRES.length, label: 'Classroom centres' },
  { Icon: FiWifi, value: ONLINE.length, suffix: '+', label: 'Cities learning online' },
  { Icon: FiMap, value: new Set(CITIES.map((c) => c.state)).size, suffix: '+', label: 'States reached' },
  { Icon: FiUsers, value: STATS[0].value, suffix: STATS[0].suffix, label: STATS[0].label },
]

const describe = (c: City) => (c.kind === 'centre' ? (c.hq ? 'Head office · classroom centre' : 'Classroom centre') : 'Live online batches')

export default function IndiaPresence() {
  const root = useRef<HTMLElement>(null)
  const [slug, setSlug] = useState(HQ.slug)
  const city = CITIES.find((c) => c.slug === slug) ?? HQ
  const at = project(city)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const tl = gsap.timeline({ scrollTrigger: { trigger: '.imap', start: 'top 75%' } })
      tl.from('.imap__dots', { opacity: 0, duration: 1.2, ease: 'power2.out' })
        .from('.imap__pin', { scale: 0, transformOrigin: 'center', duration: 0.5, stagger: 0.04, ease: 'back.out(3)' }, 0.3)
        .from('.imap__callout', { y: 12, opacity: 0, duration: 0.6, ease: 'expo.out' }, 0.9)
    },
    { scope: root }
  )

  // Keep the callout card inside the map; its pointer stays on the pin.
  const left = (at.x / W) * 100
  const cardLeft = Math.min(Math.max(left, 18), 82)

  const cta =
    city.kind === 'centre'
      ? { href: `/branches/${city.slug}`, label: 'Visit centre' }
      : { href: null, label: 'Book an online demo' }

  return (
    <section ref={root} className="section india" id="across-india">
      <div className="shell">
        <SectionHeading
          center
          eyebrow="Across India"
          icon={<FiMapPin />}
          title={['One institute.', { text: 'Every corner of India.', className: 'gradient-text' }]}
          lead="Seven centres across Punjab and Chandigarh, and live online batches that bring the same mentors, labs and placement drives to learners in every state."
        />

        <div className="imap__controls" data-aos="fade-up">
          <label className="imap__select">
            <FiMapPin aria-hidden />
            <select aria-label="Choose a city" value={slug} onChange={(e) => setSlug(e.target.value)}>
              <optgroup label="Classroom centres">
                {CENTRES.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                    {c.hq ? ' (HQ)' : ''}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Live online">
                {ONLINE.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </optgroup>
            </select>
            <FiChevronDown aria-hidden className="imap__chev" />
          </label>
          {cta.href ? (
            <Link href={cta.href} className="btn btn--gold">
              {cta.label} <FiArrowRight aria-hidden />
            </Link>
          ) : (
            <DemoLink className="btn btn--gold">
              {cta.label} <FiArrowRight aria-hidden />
            </DemoLink>
          )}
        </div>

        {/* decorative: the picker above carries the same choices */}
        <div className="imap" aria-hidden>
          <svg viewBox={`0 0 ${W} ${H}`}>
            <path d={DOTS} className="imap__dots" />
            {CITIES.map((c) => {
              const p = project(c)
              return (
                <g
                  key={c.slug}
                  className={`imap__pin imap__pin--${c.kind}${c.slug === slug ? ' is-active' : ''}`}
                  onClick={() => setSlug(c.slug)}
                >
                  <circle cx={p.x} cy={p.y} r="14" className="imap__hit" />
                  {c.slug === slug && <circle cx={p.x} cy={p.y} r="14" className="imap__ring" />}
                  <circle cx={p.x} cy={p.y} r={c.hq ? 6.5 : 5} className="imap__dot" />
                </g>
              )
            })}
          </svg>

          <div className="imap__callout" style={{ '--y': `${(at.y / H) * 100}%` } as CSSProperties}>
            <div key={city.slug} className="imap__card" style={{ left: `${cardLeft}%` }}>
              <strong>{city.name}</strong>
              <span>
                {city.state} · {describe(city)}
              </span>
            </div>
            <span className="imap__marker" style={{ left: `${left}%` }} />
          </div>
        </div>

        <ul className="imap__stats">
          {NUMBERS.map(({ Icon, value, suffix, label }, i) => (
            <li key={label} data-aos="fade-up" data-aos-delay={i * 100}>
              <span className="imap__stat-icon">
                <Icon aria-hidden />
              </span>
              <strong>
                <CountUp value={value} suffix={suffix} />
              </strong>
              <span>{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
