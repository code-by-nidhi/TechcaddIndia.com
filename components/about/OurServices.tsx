'use client'

import { useEffect, useRef, useState } from 'react'
import type { IconType } from 'react-icons'
import { FiCode, FiDroplet, FiLayers, FiPlus, FiTrendingUp } from 'react-icons/fi'

/* "Your Technology Partner": four glass service cards feed one shared
   connector that ends at a "Your Business" node.

   Desktop draws the connector in SVG — each card has its own route (down,
   across, to the centre) so hovering a card can light its route, and all four
   meet at one glowing point above a single trunk. Each path has
   `pathLength="1"`, so the draw-in is a plain stroke-dashoffset 1 → 0 whatever
   the rendered width. Below 800px the SVG is hidden and each card carries a
   short vertical line instead.

   Motion starts once, when the section first scrolls into view. Until the
   component has mounted, and for reduced-motion users, everything is simply
   shown in its final state. */

const SERVICES: { name: string; text: string; Icon: IconType }[] = [
  { name: 'Branding', text: 'Brand identity and visual systems.', Icon: FiDroplet },
  { name: 'Web Development', text: 'Websites and digital platforms.', Icon: FiCode },
  { name: 'Motion & Creative', text: 'Motion graphics and creative production.', Icon: FiLayers },
  { name: 'Digital Marketing', text: 'Digital campaigns and audience growth.', Icon: FiTrendingUp },
]

/* x of each card's centre in the 1000-wide connector viewBox */
const XS = [125, 375, 625, 875]
const BUS_Y = 56
const H = 150

export default function OurServices() {
  const ref = useRef<HTMLElement>(null)
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
            Your Technology Partner
          </h2>
          <p className="osv__lead">
            Delivering innovative IT solutions, intelligent digital experiences, and scalable technologies that help businesses grow
            and succeed.
          </p>

          <div className="osv__stage">
            <ul className="osv__nodes">
              {SERVICES.map(({ name, text, Icon }, i) => (
                <li
                  key={name}
                  className="osv__node"
                  style={{ ['--i' as string]: i }}
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                >
                  <div className="osv__card">
                    <div className="osv__panel" tabIndex={0} role="group" aria-label={name}>
                      <span className="osv__icon" aria-hidden>
                        <Icon />
                      </span>
                      <h3 className="osv__name">{name}</h3>
                      <p className="osv__text">{text}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="osv__bus">
              <svg className="osv__wires" viewBox={`0 0 1000 ${H}`} preserveAspectRatio="none" aria-hidden focusable="false">
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
