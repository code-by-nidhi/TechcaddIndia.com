'use client'

import { useState, type KeyboardEvent } from 'react'
import Link from 'next/link'
import { FiArrowRight } from 'react-icons/fi'

import { trackIcon } from '@/components/ui/trackIcons'
import { CORE_TRACKS, PLAN_LABELS, internshipHref, type PlanLength } from '@/data/internships'

const LENGTHS: PlanLength[] = [3, 6, 9]

/** Hub section: the core tracks at one length, switched by the franchise-style pill tabs. */
export default function DurationTabs() {
  const [tab, setTab] = useState(1)
  const len = LENGTHS[tab]

  const onKey = (e: KeyboardEvent) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    const next = (tab + (e.key === 'ArrowRight' ? 1 : -1) + LENGTHS.length) % LENGTHS.length
    setTab(next)
    document.getElementById(`in-tab-${LENGTHS[next]}`)?.focus()
  }

  return (
    <>
      <div className="fr-tabs__list" role="tablist" aria-label="Program length" onKeyDown={onKey}>
        {LENGTHS.map((l, i) => (
          <button
            key={l}
            type="button"
            role="tab"
            id={`in-tab-${l}`}
            aria-selected={tab === i}
            aria-controls="in-programs"
            tabIndex={tab === i ? 0 : -1}
            onClick={() => setTab(i)}
          >
            {PLAN_LABELS[l].tier.replace(/ \(.*\)/, '')} · {l} Months
          </button>
        ))}
      </div>
      <ul className="fr-cards fr-cards--3 fr-tabs__panel" role="tabpanel" id="in-programs" aria-labelledby={`in-tab-${len}`} key={len}>
        {CORE_TRACKS.map((t) => {
          const Icon = trackIcon(t.icon)
          return (
            <li className="glass in-prog" key={t.slug}>
              <span className="why__icon in-icon-sm">
                <Icon aria-hidden />
              </span>
              <div>
                <h3>
                  <Link href={`${internshipHref(t.slug)}#plan-${len}`}>
                    {len}-Month {t.title}
                  </Link>
                </h3>
                <p>{t.fees?.[len]} · Online & classroom</p>
              </div>
              <FiArrowRight aria-hidden className="in-prog__arrow" />
            </li>
          )
        })}
      </ul>
    </>
  )
}
