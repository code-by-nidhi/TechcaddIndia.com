'use client'

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import { FiBriefcase } from 'react-icons/fi'

import SectionHeading from '@/components/ui/SectionHeading'
import { TECH_DOMAINS } from '@/data/tech-domains'

/* Technologies — underlined domain tabs over a panel: the domain and the
   careers it leads to on the left; on the right a folder carrying the
   domain's icon, whose flap opens and lets the tools fly out to a ring of
   chips around it, where they keep bobbing gently up and down. Picking another domain re-keys the panel, so the folder
   opens again with the new tools. It also plays every time the section
   scrolls into view, and again when the folder itself is clicked.

   Each chip starts at the folder's mouth: the offset from its place on the
   ring is measured here and handed to the CSS animation as --fx / --fy. */
export default function Technologies() {
  const [index, setIndex] = useState(0)
  const domain = TECH_DOMAINS[index]
  const root = useRef<HTMLElement>(null)
  const box = useRef<HTMLDivElement>(null)
  // how many times the fly-out has been started; 0 = not yet (tiles at rest)
  const [run, setRun] = useState(0)

  useEffect(() => {
    const el = root.current
    if (!el) return
    let inside = false
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) inside = false
        else if (!inside && entry.intersectionRatio >= 0.3) {
          inside = true
          setRun((r) => r + 1)
        }
      },
      { threshold: [0, 0.3] },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useLayoutEffect(() => {
    const el = box.current
    const folder = el?.querySelector<HTMLElement>('.sq-folder')
    if (!el || !folder) return
    const f = folder.getBoundingClientRect()
    const mouth = { x: f.left + f.width / 2, y: f.top + f.height * 0.35 }
    el.querySelectorAll<HTMLElement>('.sq-tool').forEach((tile) => {
      // the chip is only scaled about its centre at this point, so its centre is its resting one
      const r = tile.getBoundingClientRect()
      tile.style.setProperty('--fx', `${(mouth.x - (r.left + r.width / 2)).toFixed(1)}px`)
      tile.style.setProperty('--fy', `${(mouth.y - (r.top + r.height / 2)).toFixed(1)}px`)
    })
  }, [index, run])

  return (
    <section className="section section--navy sq-tech" id="technologies" ref={root}>
      <div className="shell">
        <SectionHeading
          eyebrow="Technologies"
          title={['The tools you will', { text: 'actually use at work', className: 'gold-text' }]}
          lead="Pick a domain to see the tools we teach in it — updated as the industry moves."
        />

        <div className="sq-tabs" role="tablist" aria-label="Domains">
          {TECH_DOMAINS.map((d, i) => (
            <button
              key={d.id}
              type="button"
              role="tab"
              id={`tech-tab-${d.id}`}
              aria-selected={i === index}
              aria-controls="tech-panel"
              className={`sq-tab${i === index ? ' is-active' : ''}`}
              onClick={() => setIndex(i)}
            >
              {d.label}
            </button>
          ))}
        </div>

        {/* keyed so the panel fades in again for each domain */}
        <div
          key={domain.id}
          id="tech-panel"
          role="tabpanel"
          aria-labelledby={`tech-tab-${domain.id}`}
          className="sq-tech__panel"
        >
          <div className="sq-tech__about">
            <h3>
              <domain.Icon aria-hidden /> {domain.label}
            </h3>
            <p>{domain.tagline}</p>
            <ul className="sq-tech__roles" aria-label={`Careers in ${domain.label}`}>
              {domain.careers.map((c) => (
                <li key={c}>
                  <FiBriefcase aria-hidden /> {c}
                </li>
              ))}
            </ul>
          </div>

          {/* keyed by run so every start replays the animations */}
          <div key={run} className={`sq-techbox${run ? ' is-in' : ''}`} ref={box}>
            <ul className="sq-tools" aria-label={`${domain.label} tools`}>
              {domain.tools.map((t, i) => {
                // evenly round an ellipse, starting at the top
                const a = (i / domain.tools.length) * Math.PI * 2 - Math.PI / 2
                const spot = {
                  '--i': i,
                  // out of step with the neighbours
                  '--bob': `${3 + (i % 4) * 0.45}s`,
                  '--bob-delay': `${-(i * 0.7).toFixed(1)}s`,
                  left: `${(50 + 42 * Math.cos(a)).toFixed(2)}%`,
                  top: `${(50 + 41 * Math.sin(a)).toFixed(2)}%`,
                } as CSSProperties
                return (
                  <li className="sq-tool" key={t.name} style={spot}>
                    <span className="sq-tool__float">
                      <span className="sq-tool__logo" aria-hidden>
                        {t.Icon ? (
                          <t.Icon style={{ color: t.color }} />
                        ) : (
                          <span className="sq-tool__mark" style={{ background: t.color, color: t.ink ?? '#fff' }}>
                            {t.mark}
                          </span>
                        )}
                      </span>
                      {t.name}
                    </span>
                  </li>
                )
              })}
            </ul>

            <button
              type="button"
              className="sq-folder"
              aria-label={`Replay the ${domain.label} tools animation`}
              onClick={() => setRun((r) => r + 1)}
            >
              <span className="sq-folder__back" />
              <span className="sq-folder__sheet" />
              <span className="sq-folder__front">
                <span className="sq-folder__icon">
                  <domain.Icon />
                </span>
                <span className="sq-folder__label">{domain.label}</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
