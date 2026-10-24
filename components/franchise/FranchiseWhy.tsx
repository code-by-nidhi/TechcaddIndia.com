'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import type { IconType } from 'react-icons'
import {
  FiBookOpen,
  FiBriefcase,
  FiCompass,
  FiCpu,
  FiMap,
  FiMonitor,
  FiTrendingUp,
  FiUsers,
} from 'react-icons/fi'

import { prefersReducedMotion } from '@/lib/gsap'

/* ==========================================================================
   Why techcadd — the eight partner benefits as a hub. On the left a sight
   of rings with "Your centre" at the core and a node per benefit, each on a
   spoke; on the right the benefits as a list. One benefit is active at a
   time: its spoke lights with a travelling pulse, its node pings, the core
   shows its name and its row opens with a progress bar. The active one
   advances on its own until the visitor hovers, focuses or picks one.
   ========================================================================== */

type Point = { title: string; text: string }

/* in the order of FRANCHISE_WHY.points */
const ICONS: IconType[] = [FiMap, FiCpu, FiBookOpen, FiTrendingUp, FiUsers, FiBriefcase, FiMonitor, FiCompass]

const STEP_MS = 4200

export default function FranchiseWhy({ points }: { points: Point[] }) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [still, setStill] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => setStill(prefersReducedMotion()), [])

  useEffect(() => {
    if (paused || still) return
    timer.current = setTimeout(() => setActive((a) => (a + 1) % points.length), STEP_MS)
    return () => clearTimeout(timer.current)
  }, [active, paused, still, points.length])

  const n = points.length
  const Icon = ICONS[active] ?? FiCompass

  return (
    <div
      className={`fw${paused || still ? ' is-paused' : ''}`}
      style={{ '--count': n, '--step': `${STEP_MS}ms` } as CSSProperties}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setPaused(false)
      }}
    >
      {/* the sight */}
      <div className="fw-hub" aria-hidden>
        <span className="fw-hub__ring fw-hub__ring--outer" />
        <span className="fw-hub__ring fw-hub__ring--dash" />
        <span className="fw-hub__ring fw-hub__ring--inner" />
        <span className="fw-hub__cross" />

        {points.map((p, i) => {
          const NodeIcon = ICONS[i] ?? FiCompass
          return (
            <span
              key={p.title}
              className={`fw-spoke${i === active ? ' is-on' : ''}`}
              style={{ '--a': `${(360 / n) * i - 90}deg` } as CSSProperties}
            >
              <span className="fw-spoke__line" />
              <button type="button" tabIndex={-1} className="fw-node" onClick={() => setActive(i)}>
                <NodeIcon />
              </button>
            </span>
          )
        })}

        <div className="fw-core" key={active}>
          <span className="fw-core__icon">
            <Icon />
          </span>
          <b>{String(active + 1).padStart(2, '0')}</b>
          <span className="fw-core__title">{points[active]?.title}</span>
        </div>
      </div>

      {/* the list */}
      <ol className="fw-list">
        {points.map((p, i) => {
          const RowIcon = ICONS[i] ?? FiCompass
          const on = i === active
          return (
            <li key={p.title} className={on ? 'is-on' : undefined}>
              <button type="button" aria-expanded={on} aria-controls={`fw-row-${i}`} onClick={() => setActive(i)}>
                <span className="fw-list__icon" aria-hidden>
                  <RowIcon />
                </span>
                <span className="fw-list__num" aria-hidden>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="fw-list__title">{p.title}</span>
              </button>
              <div className="fw-list__body" id={`fw-row-${i}`}>
                <div>
                  <p>{p.text}</p>
                  {/* restarts with the row and on resume; runs for one step */}
                  {on && <span className="fw-list__bar" aria-hidden key={`${active}-${paused}`} />}
                </div>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
