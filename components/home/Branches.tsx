'use client'

import { useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import Image from 'next/image'
import { FiMapPin, FiClock, FiPhone, FiNavigation } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'

import SectionHeading from '@/components/ui/SectionHeading'
import { prefersReducedMotion } from '@/lib/gsap'
import { BRANCHES } from '@/data/branches'

/* ==========================================================================
   Our Branches — a row of tall portrait cards that works as an accordion.
   Hovering, focusing or clicking a card widens it and reveals the branch's
   details; the others narrow to make room. On phones the row becomes a
   scroll-snap carousel and a tap opens a card.

   Each card is a full-bleed <button> (so Enter/Space work natively) under a
   details layer; the details are `inert` while collapsed, so their links are
   only tabbable — and only announced — once the card is open.
   ========================================================================== */

const fmt = new Intl.NumberFormat('en-IN')

export default function Branches() {
  const row = useRef<HTMLUListElement>(null)
  const [open, setOpen] = useState<number | null>(null)

  // phones: bring a tapped card to the middle once it has finished widening
  const reveal = (i: number) => {
    const el = row.current?.children[i] as HTMLElement | undefined
    if (!el || !window.matchMedia('(max-width: 767px)').matches) return
    const reduce = prefersReducedMotion()
    window.setTimeout(
      () => el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'nearest', inline: 'center' }),
      reduce ? 0 : 520
    )
  }

  const openCard = (i: number) => {
    setOpen(i)
    reveal(i)
  }

  // hover only for real mice; touch opens on tap instead
  const onEnter = (i: number) => (e: PointerEvent) => {
    if (e.pointerType === 'mouse') setOpen(i)
  }
  const onLeaveRow = (e: PointerEvent) => {
    if (e.pointerType === 'mouse' && !row.current?.contains(document.activeElement)) setOpen(null)
  }
  const onKey = (i: number) => (e: KeyboardEvent) => {
    if (e.key === 'Escape' && open === i) {
      setOpen(null)
      row.current?.querySelectorAll<HTMLButtonElement>('.bc__toggle')[i]?.focus()
    }
  }

  return (
    // Wrapped in a div so it sits outside the page's navy/white alternation
    // (main > section:nth-of-type) — adding it doesn't recolour later sections.
    <div className="branches-band">
      <section className="section branches" id="our-branches">
        <div className="shell">
          <SectionHeading
            center
            eyebrow="Our Branches"
            icon={<FiMapPin />}
            title={['Find a techcadd centre', { text: 'near you', className: 'gradient-text' }]}
            lead="Walk into any branch for a free counselling session — same mentors, same labs, same placement support."
          />

          <div className="bc__dots" aria-hidden>
            {BRANCHES.map((b, i) => (
              <span key={b.id} className={open === i ? 'is-on' : undefined} />
            ))}
          </div>

          <ul ref={row} className={`bc__row${open !== null ? ' has-open' : ''}`} onPointerLeave={onLeaveRow}>
            {BRANCHES.map((b, i) => {
              const isOpen = open === i
              const hq = b.type === 'Head Office'
              const detailsId = `branch-${b.id}`
              return (
                <li
                  key={b.id}
                  className={`bc${isOpen ? ' is-open' : ''}${hq ? ' bc--hq' : ''}`}
                  onPointerEnter={onEnter(i)}
                  onKeyDown={onKey(i)}
                  onFocus={() => setOpen(i)}
                >
                  {b.image ? (
                    <Image
                      src={b.image}
                      alt=""
                      fill
                      sizes="(max-width: 767px) 82vw, 380px"
                      loading="lazy"
                      className="bc__img"
                    />
                  ) : (
                    <div className="bc__fallback" aria-hidden>
                      <FiMapPin className="bc__glyph" />
                    </div>
                  )}
                  <span className="bc__shade" aria-hidden />

                  <button
                    type="button"
                    className="bc__toggle"
                    aria-expanded={isOpen}
                    aria-controls={detailsId}
                    aria-label={`${b.city}, ${b.type} — ${isOpen ? 'details shown' : 'show details'}`}
                    onClick={() => openCard(i)}
                  />

                  {/* collapsed face: vertical city name over the tag */}
                  <div className="bc__face" aria-hidden>
                    <span className="bc__vname">{b.city}</span>
                    <span className={`bc__tag${hq ? ' bc__tag--hq' : ''}`}>{b.type}</span>
                  </div>

                  <div className="bc__details" id={detailsId} inert={!isOpen}>
                    <span className={`bc__tag${hq ? ' bc__tag--hq' : ''}`}>{b.type}</span>
                    <h3>{b.city}</h3>
                    <p className="bc__line">
                      <FiMapPin aria-hidden /> {b.address}
                    </p>
                    <p className="bc__line">
                      <FiClock aria-hidden /> {b.timings}
                    </p>
                    <div className="bc__contact">
                      <span className="bc__phone">
                        <FiPhone aria-hidden /> {b.phone}
                      </span>
                      <a href={`tel:${b.phone.replace(/\s/g, '')}`} aria-label={`Call the ${b.city} branch`}>
                        Call
                      </a>
                      <a
                        className="bc__wa"
                        href={`https://wa.me/${b.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`WhatsApp the ${b.city} branch`}
                      >
                        <FaWhatsapp aria-hidden /> WhatsApp
                      </a>
                    </div>
                    <ul className="bc__chips" aria-label="Courses">
                      {b.courses.map((c) => (
                        <li key={c}>{c}</li>
                      ))}
                    </ul>
                    <dl className="bc__stats">
                      {/* label first for valid <dl>; CSS shows the number on top */}
                      <div>
                        <dt>Students Trained</dt>
                        <dd>{fmt.format(b.studentsTrained)}+</dd>
                      </div>
                      <div>
                        <dt>Years Running</dt>
                        <dd>{b.yearsRunning}</dd>
                      </div>
                    </dl>
                    <a
                      className="btn btn--gold btn--sm bc__dir"
                      href={b.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Get directions to the ${b.city} branch`}
                    >
                      Get Directions <FiNavigation aria-hidden />
                    </a>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </section>
    </div>
  )
}
