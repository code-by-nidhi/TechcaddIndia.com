'use client'

import { useState } from 'react'
import { FiBriefcase } from 'react-icons/fi'

import SectionHeading from '@/components/ui/SectionHeading'
import { TECH_DOMAINS } from '@/data/tech-domains'

/* Technologies — underlined domain tabs over a panel: the domain and the
   careers it leads to on the left, its tools as a grid of tiles on the right. */
export default function Technologies() {
  const [index, setIndex] = useState(0)
  const domain = TECH_DOMAINS[index]

  return (
    <section className="section section--navy sq-tech" id="technologies">
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

          <ul className="sq-tools" aria-label={`${domain.label} tools`}>
            {domain.tools.map((t) => (
              <li className="sq-tool" key={t.name}>
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
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
