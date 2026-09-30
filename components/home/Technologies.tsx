'use client'

import { useRef, useState, type CSSProperties } from 'react'
import { FiBriefcase } from 'react-icons/fi'

import SectionHeading from '@/components/ui/SectionHeading'
import usePauseOffscreen from '@/components/fx/usePauseOffscreen'
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap'
import { TECH_DOMAINS, type Tool } from '@/data/tech-domains'

/* ==========================================================================
   Technologies — domain tabs over an orbit of that domain's tools.

   The chosen domain sits in the centre disc; its tools circle it on two
   rings (inner six, the rest outer; the rings turn opposite ways), with a
   dashed outer arc and a travelling spark for depth. Three careers the
   domain leads to sit underneath. Picking another tab shrinks the current
   tools away, swaps the domain, and pops the new tools in around the ring.

   As in the hero, each tool sits at a fixed angle on its ring: the ring's
   inner layer spins and a wrapper round the chip counter-spins, so tools
   stay upright (and GSAP can scale the chip itself without a clash).
   Hovering the orbit eases it down to a slow drift (the CSS animations'
   playback rate, so nothing jumps) to make a tool's name easy to read.
   ========================================================================== */

const INNER = 6 // tools on the inner ring
const HOVER_RATE = 0.25 // orbit speed while hovered, as a share of normal

function ToolChip({ tool }: { tool: Tool }) {
  return (
    <span className="torb__chip" style={{ '--c': tool.color } as CSSProperties}>
      {tool.Icon ? (
        <tool.Icon className="torb__icon" style={{ color: tool.color }} aria-hidden />
      ) : (
        <span className="torb__mark" style={{ background: tool.color, color: tool.ink ?? '#fff' }} aria-hidden>
          {tool.mark}
        </span>
      )}
      <span className="torb__name">{tool.name}</span>
    </span>
  )
}

export default function Technologies() {
  const root = useRef<HTMLElement>(null)
  usePauseOffscreen(root)
  const [index, setIndex] = useState(0)
  const busy = useRef(false)
  const first = useRef(true)
  const orbit = useRef<HTMLDivElement>(null)
  const speed = useRef({ rate: 1 })

  // set every orbit animation (rings, chips, arc) to the current rate
  const applyRate = () => {
    orbit.current?.getAnimations({ subtree: true }).forEach((a) => (a.playbackRate = speed.current.rate))
  }
  const easeRate = (rate: number) =>
    gsap.to(speed.current, { rate, duration: 0.6, ease: 'power2.out', overwrite: true, onUpdate: applyRate })
  const domain = TECH_DOMAINS[index]
  const inner = domain.tools.slice(0, INNER)
  const outer = domain.tools.slice(INNER)

  // pop the new domain's tools and centre text in (not on first paint)
  useGSAP(
    () => {
      applyRate() // new rings start at full speed; match a hovered orbit
      if (first.current) {
        first.current = false
        return
      }
      if (prefersReducedMotion()) {
        busy.current = false
        return
      }
      gsap
        .timeline({ onComplete: () => void (busy.current = false) })
        .fromTo(
          '.torb__core-text > *',
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.06, duration: 0.5, ease: 'power3.out' }
        )
        .fromTo(
          '.torb__chip',
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, stagger: 0.035, duration: 0.55, ease: 'back.out(2)' },
          0.05
        )
        .fromTo(
          '.torb__role',
          { y: 10, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.08, duration: 0.45, ease: 'power3.out' },
          0.15
        )
    },
    { scope: root, dependencies: [index] }
  )

  const choose = (i: number) => {
    if (i === index || busy.current) return
    busy.current = true
    if (prefersReducedMotion()) {
      setIndex(i)
      return
    }
    // shrink the current set away, then swap
    gsap
      .timeline({ onComplete: () => setIndex(i) })
      .to(root.current!.querySelectorAll('.torb__chip'), {
        scale: 0,
        opacity: 0,
        stagger: 0.02,
        duration: 0.25,
        ease: 'power2.in',
      })
      .to(
        root.current!.querySelectorAll('.torb__core-text > *, .torb__role'),
        { opacity: 0, y: -8, duration: 0.2, ease: 'power2.in' },
        0
      )
  }

  const ring = (tools: Tool[], r: number, dur: number, rev: boolean, offset: number) => (
    <div
      // keyed by domain so the ring's spin restarts with its new chips —
      // otherwise fresh chips counter-spin from 0° against a ring mid-turn
      key={`${domain.id}-${r}`}
      className={`torb__ring${rev ? ' torb__ring--rev' : ''}`}
      style={{ '--r': r, '--dur': `${dur}s` } as CSSProperties}
    >
      <div className="torb__spin">
        {tools.map((t, i) => (
          <span
            key={`${domain.id}-${t.name}`}
            className="torb__slot"
            style={{ '--deg': `${(360 / tools.length) * i + offset}deg` } as CSSProperties}
          >
            <span className="torb__upright">
              <ToolChip tool={t} />
            </span>
          </span>
        ))}
      </div>
    </div>
  )

  return (
    <section ref={root} className="section tech" id="technologies">
      <div className="shell">
        <SectionHeading
          center
          eyebrow="Technologies"
          title={['The tools you will', { text: 'actually use at work', className: 'gradient-text' }]}
          lead="Pick a domain to see the tools we teach in it — updated as the industry moves."
        />

        <div className="tech__tabs" role="tablist" aria-label="Domains">
          {TECH_DOMAINS.map((d, i) => (
            <button
              key={d.id}
              type="button"
              role="tab"
              id={`tech-tab-${d.id}`}
              aria-selected={i === index}
              aria-controls="tech-panel"
              className={`tech__tab${i === index ? ' is-active' : ''}`}
              onClick={() => choose(i)}
            >
              <d.Icon aria-hidden /> {d.label}
            </button>
          ))}
        </div>

        <div id="tech-panel" role="tabpanel" aria-labelledby={`tech-tab-${domain.id}`} className="tech__panel">
          <div
            ref={orbit}
            className="torb"
            onPointerEnter={(e) => e.pointerType === 'mouse' && easeRate(HOVER_RATE)}
            onPointerLeave={() => easeRate(1)}
          >
            <div className="torb__center">
              {/* decorative outer arc with a spark travelling round it */}
              <div className="torb__arc" aria-hidden>
                <span className="torb__spark" />
              </div>
              {ring(inner, 175, 60, false, 0)}
              {ring(outer, 300, 90, true, 18)}

              <div className="torb__core">
                <span className="torb__core-icon" aria-hidden>
                  <domain.Icon />
                </span>
                <div className="torb__core-text">
                  <strong>{domain.label}</strong>
                  <span>{domain.tagline}</span>
                </div>
              </div>
            </div>
          </div>

          <p className="sr-only">
            {domain.label} tools: {domain.tools.map((t) => t.name).join(', ')}.
          </p>

          <ul className="tech__roles" aria-label={`Careers in ${domain.label}`}>
            {domain.careers.map((c) => (
              <li className="torb__role" key={c}>
                <span aria-hidden>
                  <FiBriefcase />
                </span>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
