'use client'

import { useEffect, useRef, useState } from 'react'
import { FiPlus } from 'react-icons/fi'

/* "Your Digital Powerhouse": four glass service panels feed one shared
   connector that ends at a "Your Business" node.

   Desktop draws the connector in SVG — each panel has its own route
   (down, across, to the centre) so hovering a panel can light its route, and
   all four meet at one glowing point above a single trunk. Each path has
   `pathLength="1"`, so the draw-in is a plain stroke-dashoffset 1 → 0 whatever
   the rendered width. Below 800px the SVG is hidden and each panel carries a
   short vertical line instead.

   Motion starts once, when the section first scrolls into view. Until the
   component has mounted, and for reduced-motion users, everything is simply
   shown in its final state. */

const SERVICES = [
  { name: 'Branding', text: 'Brand identity, visual systems, and digital experiences.' },
  { name: 'Web Development', text: 'Modern websites, web applications, and scalable digital platforms.' },
  { name: 'Motion & Creative', text: 'Motion graphics, visual storytelling, and creative production.' },
  { name: 'Digital Marketing', text: 'Digital campaigns, search optimization, and audience growth.' },
]

/* x of each panel's centre in the 1000-wide connector viewBox */
const XS = [125, 375, 625, 875]
const BUS_Y = 56
const H = 150

export default function OurServices() {
  const ref = useRef<HTMLDivElement>(null)
  const [armed, setArmed] = useState(false)
  const [seen, setSeen] = useState(false)
  const [active, setActive] = useState<number | null>(null)

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
      { threshold: 0.25 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div className="osv-wrap">
      <section
        ref={ref}
        className={`osv${armed ? ' is-armed' : ''}${seen ? ' is-in' : ''}`}
        aria-labelledby="osv-title"
        data-active={active ?? undefined}
      >
        <div className="shell osv__inner">
          <span className="osv__pill">Our Services</span>
          <h2 id="osv-title" className="osv__title">
            Your Digital Powerhouse
          </h2>
          <p className="osv__lead">
            Delivering technology-driven solutions that help businesses innovate, grow, and succeed in an evolving digital world.
          </p>

          <div className="osv__stage">
            <ul className="osv__nodes">
              {SERVICES.map((s, i) => (
                <li
                  key={s.name}
                  className="osv__node"
                  style={{ ['--i' as string]: i }}
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                >
                  {/* a focusable stop so keyboard users get the same highlight as hover */}
                  <div className="osv__panel" tabIndex={0} aria-label={`${s.name}: ${s.text}`}>
                    <svg className="osv__ring" viewBox="0 0 40 40" aria-hidden>
                      <circle className="osv__ring-track" cx="20" cy="20" r="16" />
                      <circle className="osv__ring-arc" cx="20" cy="20" r="16" pathLength="100" />
                    </svg>
                    <span className="osv__status" aria-hidden />
                    <span className="osv__lines" aria-hidden>
                      <i />
                      <i />
                      <i />
                    </span>
                    <p className="osv__text">{s.text}</p>
                  </div>
                  <span className="osv__label">{s.name}</span>
                </li>
              ))}
            </ul>

            <div className="osv__bus">
            <svg
              className="osv__wires"
              viewBox={`0 0 1000 ${H}`}
              preserveAspectRatio="none"
              aria-hidden
              focusable="false"
            >
              {XS.map((x, i) => (
                <path
                  key={x}
                  className={`osv__wire osv__wire--${i}`}
                  d={`M${x} 0 V${BUS_Y} H500`}
                  pathLength={1}
                  style={{ ['--i' as string]: i }}
                />
              ))}
              <path className="osv__wire osv__wire--trunk" d={`M500 ${BUS_Y} V${H}`} pathLength={1} />
            </svg>
            <span className="osv__core" aria-hidden />
            </div>

            <div className="osv__business">
              <span className="osv__plus" aria-hidden>
                <FiPlus />
              </span>
              Your Business
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
