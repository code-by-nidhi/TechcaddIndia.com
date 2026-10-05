'use client'

import { useState, type KeyboardEvent } from 'react'
import { FiCheck, FiPlus } from 'react-icons/fi'

import SectionHeading from '@/components/ui/SectionHeading'
import { FRANCHISE_FAQS, FRANCHISE_SCOPE, FRANCHISE_SUPPORT, FRANCHISE_WHY } from '@/data/franchise'

const TABS = [
  { id: 'why', label: 'Why techcadd?' },
  { id: 'support', label: 'Franchise support' },
  { id: 'faq', label: 'FAQ' },
  { id: 'scope', label: 'Business model' },
]

/** The body of the page: four tabs over one panel. */
export default function FranchiseTabs() {
  const [tab, setTab] = useState(0)
  const [open, setOpen] = useState(0)

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!step) return
    e.preventDefault()
    const next = (tab + step + TABS.length) % TABS.length
    setTab(next)
    document.getElementById(`fr-tab-${TABS[next].id}`)?.focus()
  }

  const panel = (i: number) => ({
    id: `fr-panel-${TABS[i].id}`,
    role: 'tabpanel',
    'aria-labelledby': `fr-tab-${TABS[i].id}`,
    hidden: tab !== i,
    className: 'fr-tabs__panel',
  })

  return (
    <section className="section fr-tabs" id="benefits">
      <div className="shell">
        <SectionHeading
          center
          eyebrow="Why Franchise with techcadd?"
          title={['A Business That Creates Both', { text: 'Profit and Purpose', className: 'gold-text' }]}
          lead="Technology education is no longer optional. Every industry now requires digital skills."
        />

        <div className="fr-tabs__list" role="tablist" aria-label="Franchise details" onKeyDown={onKey}>
          {TABS.map((t, i) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              id={`fr-tab-${t.id}`}
              aria-selected={tab === i}
              aria-controls={`fr-panel-${t.id}`}
              tabIndex={tab === i ? 0 : -1}
              onClick={() => setTab(i)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div {...panel(0)}>
          <div className="fr-prose fr-prose--center">
            {FRANCHISE_WHY.lead.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <ul className="fr-cards fr-cards--4">
            {FRANCHISE_WHY.points.map((p, i) => (
              <li className="glass" key={p.title}>
                <span className="fr-cards__num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </li>
            ))}
          </ul>
        </div>

        <div {...panel(1)}>
          <div className="fr-prose fr-prose--center">
            <h3>{FRANCHISE_SUPPORT.title}</h3>
            <p>{FRANCHISE_SUPPORT.lead}</p>
          </div>
          <ul className="fr-cards fr-cards--3">
            {FRANCHISE_SUPPORT.phases.map((s, i) => (
              <li className="glass" key={s.title}>
                <span className="fr-cards__num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{s.title}</h3>
                <ul className="fr-checks">
                  {s.items.map((item) => (
                    <li key={item}>
                      <FiCheck aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>

        <div {...panel(2)}>
          <div className="faq__list fr-faq">
            {FRANCHISE_FAQS.map((f, i) => {
              const isOpen = open === i
              return (
                <div className={`faq__item glass${isOpen ? ' is-open' : ''}`} key={f.q}>
                  <h3>
                    <button aria-expanded={isOpen} aria-controls={`fr-faq-${i}`} onClick={() => setOpen(isOpen ? -1 : i)}>
                      {f.q}
                      <FiPlus aria-hidden />
                    </button>
                  </h3>
                  <div className="faq__a" id={`fr-faq-${i}`} role="region">
                    <div>
                      <p>{f.a}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div {...panel(3)}>
          <div className="fr-split">
            <div className="fr-prose">
              <h3>{FRANCHISE_SCOPE.title}</h3>
              {FRANCHISE_SCOPE.lead.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <ul className="fr-checks">
                {FRANCHISE_SCOPE.reasons.map((r) => (
                  <li key={r}>
                    <FiCheck aria-hidden />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            <div className="fr-panel glass">
              <h4>{FRANCHISE_SCOPE.streamsTitle}</h4>
              <ul className="fr-chips">
                {FRANCHISE_SCOPE.streams.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
