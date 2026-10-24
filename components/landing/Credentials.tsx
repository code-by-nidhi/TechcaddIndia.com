'use client'

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from 'react'
import Image from 'next/image'
import { LuBadgeCheck, LuCalendarDays, LuFileText, LuLandmark, LuLayers, LuRocket } from 'react-icons/lu'
import type { IconType } from 'react-icons'

import usePauseOffscreen from '@/components/fx/usePauseOffscreen'
import { SITE } from '@/data/site'
import { CREDENTIALS, CREDENTIAL_TICKER, type CredentialIcon } from '@/data/credentials'

/* ==========================================================================
   Credentials — the certifications as a deck of certificate documents.

   The deck (left) is three drawn certificates stacked in 3D: the picked one
   at the front with a slowly turning seal and a shine that sweeps across
   it, the others fanned behind. It tilts towards the pointer, and fans out
   from a single stack when the section first scrolls into view.

   The list (right) names the three; the picked one opens to show what it
   means. It advances by itself — the bar under the open item is a CSS
   animation whose end moves to the next — and holds still while the pointer
   or focus is inside or the section is off screen. A ticker of credential
   chips runs along the bottom.
   ========================================================================== */

const ICONS: Record<CredentialIcon, IconType> = { iso: LuBadgeCheck, msme: LuLandmark, startup: LuRocket }
const COUNT = CREDENTIALS.length

/** A QR-style mark for the certificate's side panel: three finder squares
    and a pattern of modules seeded from the id, so each certificate looks
    different. It is decoration on a SAMPLE preview and encodes nothing. */
function QrMark({ seed }: { seed: string }) {
  const N = 21
  let h = 2166136261
  for (const ch of seed) h = Math.imul(h ^ ch.charCodeAt(0), 16777619)
  const rand = () => {
    h ^= h << 13
    h ^= h >>> 17
    h ^= h << 5
    return (h >>> 0) / 4294967296
  }
  const inFinder = (x: number, y: number) => (x < 8 && y < 8) || (x > N - 9 && y < 8) || (x < 8 && y > N - 9)
  const cells: string[] = []
  for (let y = 0; y < N; y++)
    for (let x = 0; x < N; x++) if (!inFinder(x, y) && rand() < 0.48) cells.push(`M${x} ${y}h1v1h-1z`)
  const finder = (x: number, y: number) => `M${x} ${y}h7v7h-7zM${x + 1} ${y + 1}v5h5v-5zM${x + 2} ${y + 2}h3v3h-3z`
  return (
    <svg className="cx-cert__qr" viewBox={`-1 -1 ${N + 2} ${N + 2}`} aria-hidden>
      <path fillRule="evenodd" d={finder(0, 0) + finder(N - 7, 0) + finder(0, N - 7) + cells.join('')} />
    </svg>
  )
}

/** where a card sits relative to the picked one: 0 front, 1 behind right, -1 behind left */
const slot = (i: number, active: number) => {
  const d = (i - active + COUNT) % COUNT
  return d === 0 ? 0 : d === 1 ? 1 : -1
}

export default function Credentials() {
  const band = useRef<HTMLElement>(null)
  const deck = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [fanned, setFanned] = useState(false)
  usePauseOffscreen(band)

  /* fan the deck out the first time it comes into view */
  useEffect(() => {
    const el = deck.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFanned(true)
          io.disconnect()
        }
      },
      { threshold: 0.35 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const next = () => setActive((i) => (i + 1) % COUNT)

  /* tilt towards the pointer, -1…1 on each axis */
  const tilt = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--tx', (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3))
    e.currentTarget.style.setProperty('--ty', (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3))
  }
  const untilt = (e: PointerEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty('--tx', '0')
    e.currentTarget.style.setProperty('--ty', '0')
  }

  return (
    <section className="section cx-cred" id="certifications" ref={band}>
      <div className="cx-cred__glow" aria-hidden />

      <div className="shell">
        <div className="cx-head cx-head--split">
          <div className="cx-head__text">
            <span className="eyebrow" data-fx="reveal">
              Certified &amp; recognised
            </span>
            <h2 className="cx-title" data-fx="words">
              Credentials you can <span className="cx-hl">verify</span>
            </h2>
          </div>
          <p data-fx="reveal" data-fx-delay="0.15">
            Audited for quality, registered with the Government of India and recognised by DPIIT — the paperwork behind
            every certificate a techcadd learner takes home.
          </p>
        </div>

        <div className="cx-cred__grid">
          <div className="cx-cred__stage">
            <div
              ref={deck}
              className={`cx-deck${fanned ? ' is-fanned' : ''}`}
              onPointerMove={tilt}
              onPointerLeave={untilt}
            >
              {CREDENTIALS.map((c, i) => {
                const Icon = ICONS[c.icon]
                const pos = slot(i, active)
                return (
                  <button
                    key={c.id}
                    type="button"
                    className="cx-cert"
                    data-slot={pos}
                    style={{ '--i': i } as CSSProperties}
                    tabIndex={pos === 0 ? -1 : 0}
                    aria-label={pos === 0 ? c.title : `Show ${c.title}`}
                    onClick={() => setActive(i)}
                  >
                    <span className="cx-cert__paper">
                      {/* the faint seal and SAMPLE stamp behind the text */}
                      <span className="cx-seal" aria-hidden>
                        <svg viewBox="0 0 100 100">
                          <defs>
                            <path id={`seal-${c.id}`} d="M50 50 m-38 0 a38 38 0 1 1 76 0 a38 38 0 1 1 -76 0" />
                          </defs>
                          <text>
                            <textPath href={`#seal-${c.id}`} textLength={236} lengthAdjust="spacingAndGlyphs">
                              {`${c.short} · techcadd · ${c.short} · techcadd · `}
                            </textPath>
                          </text>
                        </svg>
                        <span className="cx-seal__core">
                          <Icon />
                        </span>
                      </span>
                      <span className="cx-cert__sample" aria-hidden>
                        Sample
                      </span>

                      <span className="cx-cert__main">
                        <span className="cx-cert__top">
                          <span>S. No.: TCD/{c.cert.issued}</span>
                          <span>Training | Certification | Placement support</span>
                        </span>
                        <Image
                          className="cx-cert__logo"
                          src="/images/techcadd-logo-navy.png"
                          alt=""
                          width={170}
                          height={46}
                        />
                        <span className="cx-cert__kind">{c.cert.kind}</span>
                        <span className="cx-cert__big">Certificate</span>
                        <span className="cx-cert__intro">This is to certify that</span>
                        <span className="cx-cert__name">techcadd</span>
                        <span className="cx-cert__line">{c.cert.line}</span>
                        <span className="cx-cert__title">{c.title}</span>

                        <span className="cx-cert__facts">
                          <span>
                            <LuCalendarDays aria-hidden />
                            <span>
                              Since
                              <b>{c.since}</b>
                            </span>
                          </span>
                          <span>
                            <LuLayers aria-hidden />
                            <span>
                              {c.cert.basis.label}
                              <b>{c.cert.basis.value}</b>
                            </span>
                          </span>
                          <span>
                            <LuFileText aria-hidden />
                            <span>
                              Scope
                              <b>{c.cert.scope}</b>
                            </span>
                          </span>
                        </span>

                        <span className="cx-cert__signs">
                          <span>
                            <svg viewBox="0 0 120 34" aria-hidden>
                              <path d="M4 26 C 14 6, 22 30, 32 16 S 46 4, 52 22 S 70 30, 78 12 S 98 8, 116 20" />
                            </svg>
                            <i>Authorised Signatory (MD)</i>
                          </span>
                          <span>
                            <svg viewBox="0 0 120 34" aria-hidden>
                              <path d="M6 22 C 18 30, 24 4, 34 18 C 40 28, 50 8, 58 20 L 66 10 C 76 26, 92 6, 114 14" />
                            </svg>
                            <i>Head Department</i>
                          </span>
                        </span>
                      </span>

                      <span className="cx-cert__side">
                        <span className="cx-cert__motto">Empowering skills for a better tomorrow</span>
                        <QrMark seed={c.cert.id} />
                        <span className="cx-cert__scan">Scan to verify</span>
                        <span className="cx-cert__meta">
                          Certificate ID
                          <b>{c.cert.id}</b>
                        </span>
                        <span className="cx-cert__meta">
                          Date of issue
                          <b>{c.cert.issued}</b>
                        </span>
                      </span>

                      <span className="cx-cert__foot">
                        <span>
                          <b>techcadd</b> | Head Office
                          <small>A unit of {SITE.legalName} | An ISO 9001:2015 certified company</small>
                        </span>
                        <span className="cx-cert__logos">
                          {['ISO', 'IAF', 'MSME', 'DPIIT'].map((l) => (
                            <span key={l}>{l} logo</span>
                          ))}
                        </span>
                      </span>
                      <span className="cx-cert__shine" aria-hidden />
                    </span>
                  </button>
                )
              })}
            </div>
            <p className="cx-cred__note">Certificate previews are illustrative — originals are available on request.</p>
          </div>

          <ul className="cx-cred__list" data-fx="stagger">
            {CREDENTIALS.map((c, i) => {
              const Icon = ICONS[c.icon]
              const open = i === active
              return (
                <li key={c.id} className={open ? 'is-open' : undefined}>
                  <button type="button" aria-expanded={open} aria-controls={`cred-${c.id}`} onClick={() => setActive(i)}>
                    <span className="cx-cred__icon">
                      <Icon aria-hidden />
                    </span>
                    <span className="cx-cred__title">
                      <b>{c.title}</b>
                      <span>Since {c.since}</span>
                    </span>
                    <span className="cx-cred__bar" aria-hidden onAnimationEnd={next} />
                  </button>
                  <div className="cx-cred__body" id={`cred-${c.id}`} role="region" inert={!open}>
                    <div>
                      <p className="cx-cred__issuer">{c.issuer}</p>
                      <p>{c.text}</p>
                      <ul>
                        {c.points.map((p) => (
                          <li key={p}>
                            <LuBadgeCheck aria-hidden /> {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      <div className="cx-cred__ticker" aria-hidden>
        <div>
          {[...CREDENTIAL_TICKER, ...CREDENTIAL_TICKER].map((t, i) => (
            <span key={i}>
              <LuBadgeCheck /> {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
