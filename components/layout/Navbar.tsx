'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { FiChevronDown, FiMenu, FiX, FiPhone, FiArrowRight } from 'react-icons/fi'

import { NAV, SITE } from '@/data/site'

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
  }, [open])

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

  return (
    <>
      <header className={`nav${scrolled || open ? ' nav--scrolled' : ''}`}>
        <div className="shell nav__inner">
          <Link href="/" className="nav__logo" aria-label="techcadd home">
            <Image src="/images/techcadd-logo-white.png" alt="techcadd" width={150} height={40} priority />
          </Link>

          <nav aria-label="Primary" className="nav__links">
            {NAV.map((item) =>
              item.children ? (
                <div className="nav__dd" key={item.href}>
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
                <Link key={item.href} href={item.href} className={`nav__link${isActive(item.href) ? ' is-active' : ''}`}>
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="nav__actions">
            <Link href="/contact#demo" className="btn btn--gold btn--sm nav__cta">
              Book Demo
            </Link>
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
          {NAV.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className="drawer__link"
              style={{ transitionDelay: open ? `${80 + i * 40}ms` : '0ms' }}
              tabIndex={open ? 0 : -1}
            >
              {item.label} <FiArrowRight aria-hidden />
            </Link>
          ))}
        </nav>
        <div className="drawer__foot">
          <Link href="/contact#demo" className="btn btn--gold" tabIndex={open ? 0 : -1}>
            Book a free demo
          </Link>
          <a href={SITE.phoneHref} className="btn btn--ghost" tabIndex={open ? 0 : -1}>
            <FiPhone /> {SITE.phone}
          </a>
        </div>
      </div>
    </>
  )
}
