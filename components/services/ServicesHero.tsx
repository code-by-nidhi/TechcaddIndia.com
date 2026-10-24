'use client'

import { useEffect, useRef, type CSSProperties } from 'react'
import Link from 'next/link'
import type { IconType } from 'react-icons'
import { FiArrowDown, FiCloud, FiCode, FiCpu, FiTrendingUp } from 'react-icons/fi'

import SplitHeading from '@/components/fx/SplitHeading'
import { gsap, prefersReducedMotion } from '@/lib/gsap'

/* ==========================================================================
   Services hero — copy on the left; on the right an indigo stage with an
   exploded 3D stack of the four service layers that breathes apart and
   back together, data packets rising through it, and a terminal typing a
   deploy. The stage tilts with the pointer through --px/--py (-1…1).
   ========================================================================== */

/* bottom to top; colours match the service groups below */
const LAYERS: { label: string; icon: IconType; ac: string; ac2: string }[] = [
  { label: 'Cloud & DevOps', icon: FiCloud, ac: '#0f9f8f', ac2: '#4fd6c4' },
  { label: 'Software & SaaS', icon: FiCode, ac: '#2e53e1', ac2: '#7cb0fb' },
  { label: 'AI & Agents', icon: FiCpu, ac: '#7243a7', ac2: '#b296f0' },
  { label: 'Growth & Marketing', icon: FiTrendingUp, ac: '#d6336c', ac2: '#f78fb3' },
]

export default function ServicesHero({ lead, services }: { lead: string; services: number }) {
  const hero = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = hero.current
    if (!el || prefersReducedMotion() || !window.matchMedia('(pointer: fine)').matches) return
    const p = { x: 0, y: 0 }
    const toX = gsap.quickTo(p, 'x', { duration: 1, ease: 'power3.out', onUpdate: () => el.style.setProperty('--px', p.x.toFixed(3)) })
    const toY = gsap.quickTo(p, 'y', { duration: 1, ease: 'power3.out', onUpdate: () => el.style.setProperty('--py', p.y.toFixed(3)) })

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      toX(((e.clientX - r.left) / r.width) * 2 - 1)
      toY(((e.clientY - r.top) / r.height) * 2 - 1)
    }
    const leave = () => {
      toX(0)
      toY(0)
    }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  }, [])

  return (
    <section className="sv-hero" ref={hero}>
      <div className="shell sv-hero__grid">
        <div className="sv-hero__copy">
          <nav aria-label="Breadcrumb" className="crumbs">
            <span>
              <Link href="/">Home</Link> /{' '}
            </span>
            <span>IT Services</span>
          </nav>

          <span className="eyebrow sv-hero__eyebrow">
            <span className="eyebrow__dot">✦</span>
            IT Services
          </span>

          <SplitHeading
            as="h1"
            immediate
            delay={0.1}
            className="sv-hero__title"
            parts={['Technology services,', { text: 'built by the people who teach it', className: 'sv-hero__em' }]}
          />

          <p className="sv-hero__lead">{lead}</p>

          <ul className="sv-hero__chips">
            {LAYERS.map((l) => (
              <li key={l.label} style={{ '--ac': l.ac } as CSSProperties}>
                <l.icon aria-hidden /> {l.label}
              </li>
            ))}
          </ul>

          <div className="sv-hero__actions">
            <a href="#services" className="btn">
              Explore {services} services <FiArrowDown aria-hidden />
            </a>
            <Link href="/contact" className="btn btn--ghost">
              Talk to our team
            </Link>
          </div>
        </div>

        <div className="sv-scene" aria-hidden>
          <div className="sv-scene__glow" />
          <div className="sv-stage">
            <div className="sv-iso">
              {LAYERS.map((l, i) => (
                <div className="sv-layer" key={l.label} style={{ '--i': i, '--ac': l.ac, '--ac2': l.ac2 } as CSSProperties}>
                  <span className="sv-layer__icon">
                    <l.icon />
                  </span>
                  <span className="sv-layer__label">{l.label}</span>
                </div>
              ))}
              {[0, 1, 2].map((n) => (
                <span className="sv-packet" key={n} style={{ '--n': n } as CSSProperties} />
              ))}
            </div>
          </div>

          <div className="sv-term">
            <div className="sv-term__bar">
              <i />
              <i />
              <i />
              <span>deploy.sh</span>
            </div>
            <p className="sv-term__line sv-term__line--1">
              <span>$ techcadd deploy --prod</span>
            </p>
            <p className="sv-term__line sv-term__line--2">
              <span>✓ build ✓ test ✓ secure</span>
            </p>
            <p className="sv-term__line sv-term__line--3">
              <span>● live in production</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
