'use client'

import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { FiMapPin, FiClock, FiPhone, FiArrowUpRight, FiArrowRight } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'

import SectionHeading from '@/components/ui/SectionHeading'
import { BRANCHES } from '@/data/branches'

const fmt = new Intl.NumberFormat('en-IN')

/* The ghost name: the city spelled down the panel's right edge, one upright
   letter per row. It is drawn as SVG text so each letter can be placed by its
   own ink height — a fixed row per letter leaves a tall "l" touching its
   neighbours and a short "a" floating — with the same gap between every pair
   and all of them centred on one axis. Sizes are in units of EM per em.
   The panel is keyed by branch, so the name types itself in on every pick. */
const EM = 100
const GAP = 14

type Glyph = { a: number; d: number; w: number } // ink above / below the baseline, advance

// rough metrics for the first paint; the real font is measured once it loads
function estimate(ch: string): Glyph {
  const d = 'gjpqy'.includes(ch) ? 20 : 0
  if (ch !== ch.toLowerCase()) return { a: 70, d, w: 70 }
  if ('bdfhklij'.includes(ch)) return { a: 73, d, w: 60 }
  if (ch === 't') return { a: 64, d, w: 45 }
  return { a: 53, d, w: 62 }
}

function GhostName({ name }: { name: string }) {
  const svg = useRef<SVGSVGElement>(null)
  const letters = useMemo(() => [...name], [name])
  const [glyphs, setGlyphs] = useState(() => letters.map(estimate))

  useEffect(() => {
    const el = svg.current
    if (!el) return
    let live = true
    const font = `800 ${EM}px ${getComputedStyle(el).fontFamily}`
    document.fonts
      .load(font)
      .then(() => {
        const ctx = document.createElement('canvas').getContext('2d')
        if (!live || !ctx) return
        ctx.font = font
        setGlyphs(
          letters.map((ch) => {
            const m = ctx.measureText(ch)
            return { a: m.actualBoundingBoxAscent, d: Math.max(0, m.actualBoundingBoxDescent), w: m.width }
          })
        )
      })
      .catch(() => {})
    return () => {
      live = false
    }
  }, [letters])

  // stack the letters: each baseline sits its own ascent below the running top
  let top = 0
  const baselines = glyphs.map((g) => {
    const y = top + g.a
    top += g.a + g.d + GAP
    return y
  })
  const height = top - GAP
  const width = Math.max(...glyphs.map((g) => g.w))

  return (
    <span className="sq-br__ghost" aria-hidden>
      <svg
        ref={svg}
        className="sq-br__letters"
        viewBox={`0 0 ${width} ${height}`}
        style={{ '--rows': height / EM } as CSSProperties}
      >
        {/* typed in from the top, one letter at a time */}
        {letters.map((ch, i) => (
          <text key={i} x={width / 2} y={baselines[i]} style={{ '--i': i } as CSSProperties}>
            {ch}
          </text>
        ))}
      </svg>
    </span>
  )
}

/* Our Branches — a city picker beside one large navy panel.

   The cities are a numbered list of tabs on the left (a scrolling row of
   chips on small screens); the panel on the right shows the picked branch:
   its name beside a giant outlined copy of itself set vertically, address, timings and phone,
   the courses taught there, two big numbers and the three ways to reach it.
   Hovering, focusing or tapping a city picks it. The panel is keyed by
   branch, so it fades in again on every pick. */
export default function Branches() {
  const [index, setIndex] = useState(0)
  const b = BRANCHES[index]
  const hq = b.type === 'Head Office'
  // data/branches.ts still carries TODO placeholders for some addresses; never show those
  const address = b.address.startsWith('TODO') ? null : b.address

  return (
    <section className="section sq-tint sq-br" id="our-branches">
      <div className="shell">
        <SectionHeading
          eyebrow="Our Branches"
          title={['Find a techcadd centre', { text: 'near you', className: 'sq-hl' }]}
          lead="Walk into any branch for a free counselling session — same mentors, same labs, same placement support."
        />

        <div className="sq-br__layout">
          <div className="sq-br__list" role="tablist" aria-label="Branches" aria-orientation="vertical">
            {BRANCHES.map((br, i) => (
              <button
                key={br.id}
                type="button"
                role="tab"
                id={`branch-tab-${br.id}`}
                aria-selected={i === index}
                aria-controls="branch-panel"
                className={`sq-br__city${i === index ? ' is-active' : ''}`}
                onClick={() => setIndex(i)}
                // a mouse picks on hover; touch still picks on tap
                onPointerEnter={(e) => e.pointerType === 'mouse' && setIndex(i)}
                onFocus={() => setIndex(i)}
              >
                <span className="sq-br__no">{String(i + 1).padStart(2, '0')}</span>
                <span className="sq-br__name">{br.city}</span>
                {br.type === 'Head Office' && <span className="sq-br__hq">Head Office</span>}
                <FiArrowRight className="sq-br__arrow" aria-hidden />
              </button>
            ))}
          </div>

          <div
            key={b.id}
            id="branch-panel"
            role="tabpanel"
            aria-labelledby={`branch-tab-${b.id}`}
            className="sq-br__panel"
          >
            <GhostName name={b.city} />

            <header className="sq-br__top">
              <span className={`sq-br__tag${hq ? ' sq-br__tag--hq' : ''}`}>
                <FiMapPin aria-hidden /> {b.type}
              </span>
              <h3>{b.city}</h3>
            </header>

            <ul className="sq-br__facts">
              {address && (
                <li>
                  <FiMapPin aria-hidden /> {address}
                </li>
              )}
              <li>
                <FiClock aria-hidden /> {b.timings}
              </li>
              <li>
                <FiPhone aria-hidden /> {b.phone}
              </li>
            </ul>

            <ul className="sq-br__courses" aria-label={`Courses at the ${b.city} branch`}>
              {b.courses.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>

            <dl className="sq-br__stats">
              {/* label first for valid <dl>; CSS shows the number on top */}
              <div>
                <dt>Students trained</dt>
                <dd>{fmt.format(b.studentsTrained)}+</dd>
              </div>
              <div>
                <dt>Years running</dt>
                <dd>{b.yearsRunning}</dd>
              </div>
            </dl>

            <div className="sq-br__actions">
              <a href={`tel:${b.phone.replace(/\s/g, '')}`} className="btn btn--gold" aria-label={`Call the ${b.city} branch`}>
                <FiPhone aria-hidden /> Call
              </a>
              <a
                href={`https://wa.me/${b.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--ghost"
                aria-label={`WhatsApp the ${b.city} branch`}
              >
                <FaWhatsapp aria-hidden /> WhatsApp
              </a>
              <a
                href={b.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--ghost"
                aria-label={`Get directions to the ${b.city} branch`}
              >
                Directions <FiArrowUpRight aria-hidden />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
