'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import type { IconType } from 'react-icons'
import {
  FiChevronDown,
  FiMenu,
  FiX,
  FiPhone,
  FiArrowRight,
  FiCloud,
  FiSmartphone,
  FiCode,
  FiZap,
  FiTrendingUp,
  FiBarChart2,
  FiDatabase,
  FiShield,
  FiCpu,
  FiLayers,
  FiBookOpen,
  FiTool,
} from 'react-icons/fi'

import DemoLink from '@/components/ui/DemoLink'
import { NAV, SITE, type NavItem, type NavLink } from '@/data/site'

/** `icon` keys used by the Internships tiles in data/site.ts. */
const CARD_ICONS: Record<string, IconType> = {
  cloud: FiCloud,
  mobile: FiSmartphone,
  code: FiCode,
  zap: FiZap,
  trending: FiTrendingUp,
  chart: FiBarChart2,
  database: FiDatabase,
  shield: FiShield,
  cpu: FiCpu,
  layers: FiLayers,
  book: FiBookOpen,
  tool: FiTool,
}

const QUOTE = {
  text: 'Everybody should learn to program a computer, because it teaches you how to think.',
  author: 'Steve Jobs',
}

/** True for an item that opens one of the wide panels. */
const hasPanel = (item: NavItem) => Boolean(item.columns || item.cards || item.featured)

/** The drawer has no panels, so each menu collapses to one flat list. */
const drawerLinks = (item: NavItem): NavLink[] | undefined =>
  item.columns?.map((c) => ({ label: c.title, href: c.href })) ?? item.cards ?? item.links ?? item.children

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  /** Label of the open desktop panel, or null. */
  const [panel, setPanel] = useState<string | null>(null)
  /** Label of the expanded drawer sub-list, or null. */
  const [drawerSub, setDrawerSub] = useState<string | null>(null)
  const panelTimer = useRef(0)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
    setPanel(null)
    setDrawerSub(null)
  }, [pathname])

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setOpen(false)
      setPanel(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

  /* The panels are siblings of the link row, not children of their trigger,
     so a short grace period lets the pointer travel from one to the other. */
  const holdPanel = (label: string | null) => {
    window.clearTimeout(panelTimer.current)
    if (label) setPanel(label)
    else panelTimer.current = window.setTimeout(() => setPanel(null), 160)
  }

  /* Closes everything on click: a hash link to the current page never changes
     `pathname`, so the effect above would not fire for it. */
  const close = () => {
    setPanel(null)
    setOpen(false)
  }

  const panelProps = (item: NavItem) => ({
    role: 'menu',
    'aria-label': item.label,
    onMouseEnter: () => holdPanel(item.label),
    onMouseLeave: () => holdPanel(null),
  })

  const panelFoot = (item: NavItem) => (
    <div className="mega__foot">
      <blockquote className="mega__quote">
        <p>
          {QUOTE.text}
          <cite>— {QUOTE.author}</cite>
        </p>
      </blockquote>
      {item.cta && (
        <Link className="mega__browse" href={item.cta.href} onClick={close}>
          {item.cta.label} <FiArrowRight aria-hidden />
        </Link>
      )}
    </div>
  )

  return (
    <>
      <header className={`nav${scrolled || open ? ' nav--scrolled' : ''}`}>
        <div className="shell nav__inner">
          <Link href="/" className="nav__logo" aria-label="techcadd home">
            <Image src="/images/techcadd-logo-navy.png" alt="techcadd" width={150} height={40} priority />
          </Link>

          <nav aria-label="Primary" className="nav__links">
            {NAV.map((item) =>
              hasPanel(item) ? (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`nav__link${isActive(item.href) ? ' is-active' : ''}${panel === item.label ? ' is-open' : ''}`}
                  aria-expanded={panel === item.label}
                  onMouseEnter={() => holdPanel(item.label)}
                  onMouseLeave={() => holdPanel(null)}
                  onFocus={() => holdPanel(item.label)}
                  onClick={close}
                >
                  {item.label} <FiChevronDown aria-hidden className="nav__caret" />
                </Link>
              ) : item.children ? (
                <div className="nav__dd" key={item.label}>
                  <Link href={item.href} className={`nav__link${isActive(item.href) ? ' is-active' : ''}`}>
                    {item.label} <FiChevronDown aria-hidden />
                  </Link>
                  <div className="nav__menu glass">
                    {item.children.map((c) => (
                      <Link href={c.href} key={c.label} className="nav__menu-item">
                        <strong>{c.label}</strong>
                        {c.note && <span>{c.note}</span>}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link key={item.label} href={item.href} className={`nav__link${isActive(item.href) ? ' is-active' : ''}`}>
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {NAV.filter(hasPanel).map((item) => {
            const shown = panel === item.label ? ' is-open' : ''

            if (item.columns) {
              return (
                <div key={item.label} className={`mega${shown}`} {...panelProps(item)}>
                  <div className="mega__grid" style={{ ['--mega-cols' as string]: item.columns.length }}>
                    {item.columns.map((col, i) => (
                      <div className="mega__col" key={col.title}>
                        <div className="mega__col-head">
                          <span className="mega__col-num">{String(i + 1).padStart(2, '0')}</span>
                          <h3 className="mega__col-title">
                            <Link href={col.href} onClick={close}>
                              {col.title}
                            </Link>
                          </h3>
                          <p className="mega__col-blurb">{col.blurb}</p>
                        </div>
                        <ul>
                          {col.items.map((l) => (
                            <li key={l.label}>
                              <Link className="mega__link" href={l.href} role="menuitem" onClick={close}>
                                <span className="mega__dash" aria-hidden />
                                <span>{l.label}</span>
                                {l.badge && <span className="mega__badge">{l.badge}</span>}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  {panelFoot(item)}
                </div>
              )
            }

            if (item.cards) {
              return (
                <div key={item.label} className={`mega mega--cards${shown}`} {...panelProps(item)}>
                  <ul className="progs__grid">
                    {item.cards.map((card) => {
                      const Icon = CARD_ICONS[card.icon] ?? FiCode
                      return (
                        <li key={card.label}>
                          <Link className="progs__card" href={card.href} role="menuitem" onClick={close}>
                            <span className="progs__icon" aria-hidden>
                              <Icon />
                            </span>
                            <span className="progs__label">{card.label}</span>
                            {card.badge && <span className="mega__badge">{card.badge}</span>}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                  {panelFoot(item)}
                </div>
              )
            }

            return (
              <div key={item.label} className={`mega mega--featured${shown}`} {...panelProps(item)}>
                <div className="featured__col">
                  <span className="featured__kicker">{item.linksTitle}</span>
                  <ul className="featured__links">
                    {item.links?.map((l) => (
                      <li key={l.label}>
                        <Link className="featured__link" href={l.href} role="menuitem" onClick={close}>
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  {item.cta && (
                    <Link className="mega__browse featured__cta" href={item.cta.href} onClick={close}>
                      {item.cta.label} <FiArrowRight aria-hidden />
                    </Link>
                  )}
                </div>
                <div className="featured__main">
                  <span className="featured__kicker">Featured</span>
                  <div className="featured__cards">
                    {item.featured?.map((card) => (
                      <Link className="featured__card" href={card.href} key={card.title} role="menuitem" onClick={close}>
                        <span className="featured__art">
                          <Image src={card.image} alt="" fill sizes="280px" />
                        </span>
                        <span className="featured__title">{card.title}</span>
                        <span className="featured__meta">
                          <span className="featured__tag">{card.tag}</span>
                          <span className="featured__note">{card.meta}</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}

          <div className="nav__actions">
            <DemoLink className="btn btn--gold btn--sm nav__cta" onClick={close}>
              Book Demo
            </DemoLink>
            <button
              className="nav__burger"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </header>

      <div className={`drawer${open ? ' drawer--open' : ''}`} aria-hidden={!open}>
        <nav aria-label="Mobile" className="drawer__nav">
          {NAV.map((item, i) => {
            const sub = drawerLinks(item)
            const subOpen = drawerSub === item.label
            const delay = { transitionDelay: open ? `${80 + i * 40}ms` : '0ms' }

            if (!sub) {
              return (
                <Link key={item.label} href={item.href} className="drawer__link" style={delay} tabIndex={open ? 0 : -1} onClick={close}>
                  {item.label} <FiArrowRight aria-hidden />
                </Link>
              )
            }

            return (
              <div key={item.label}>
                <button
                  type="button"
                  className={`drawer__link${subOpen ? ' is-open' : ''}`}
                  style={delay}
                  tabIndex={open ? 0 : -1}
                  aria-expanded={subOpen}
                  onClick={() => setDrawerSub(subOpen ? null : item.label)}
                >
                  {item.label} <FiChevronDown aria-hidden />
                </button>
                {subOpen && (
                  <div className="drawer__sub">
                    {sub.map((l) => (
                      <Link key={l.label} href={l.href} onClick={close}>
                        {l.label}
                      </Link>
                    ))}
                    <Link href={item.href} className="drawer__sub-all" onClick={close}>
                      View all <FiArrowRight aria-hidden />
                    </Link>
                  </div>
                )}
              </div>
            )
          })}
        </nav>
        <div className="drawer__foot">
          <DemoLink className="btn btn--gold" tabIndex={open ? 0 : -1} onClick={close}>
            Book a free demo
          </DemoLink>
          <a href={SITE.phoneHref} className="btn btn--ghost" tabIndex={open ? 0 : -1}>
            <FiPhone /> {SITE.phone}
          </a>
        </div>
      </div>
    </>
  )
}
