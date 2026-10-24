'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import Link from 'next/link'
import type { IconType } from 'react-icons'
import {
  FiAperture,
  FiArrowUpRight,
  FiCloud,
  FiCode,
  FiCpu,
  FiGlobe,
  FiLayers,
  FiMessageSquare,
  FiSearch,
  FiShare2,
  FiShoppingCart,
  FiTrendingUp,
} from 'react-icons/fi'

import { prefersReducedMotion } from '@/lib/gsap'

/* ==========================================================================
   Services bento — the services in a mixed-size grid, coloured by group.
   Each card carries a small live illustration for its group (a code window
   typing, a pulsing neural node, a bar chart, servers passing a packet).
   The legend focuses a group: hovering or clicking it dims the others.
   Cards blur and scale in, staggered, when the grid scrolls into view; the
   hidden start state only applies once the section is `is-armed`.
   ========================================================================== */

type Group = 'build' | 'ai' | 'growth' | 'cloud'

export type ServicePage = { slug: string; label: string; href: string }

/* shades from the site palette only: blue, violet, indigo, navy */
const GROUPS: { key: Group; label: string; ac: string; ac2: string }[] = [
  { key: 'build', label: 'Build', ac: '#2e53e1', ac2: '#7cb0fb' },
  { key: 'ai', label: 'AI', ac: '#7243a7', ac2: '#b296f0' },
  { key: 'growth', label: 'Growth', ac: '#4338ca', ac2: '#a5b4fc' },
  { key: 'cloud', label: 'Cloud', ac: '#1e3a8a', ac2: '#6f9ffb' },
]

/* TODO: replace the one-line blurbs with approved copy */
const META: Record<string, { icon: IconType; group: Group; blurb: string; wide?: boolean }> = {
  'website-development': {
    icon: FiGlobe,
    group: 'build',
    wide: true,
    blurb: 'Fast, responsive websites on modern frameworks, tuned for search from day one.',
  },
  'custom-software-development': {
    icon: FiCode,
    group: 'build',
    blurb: 'Software shaped around your workflows, from internal tools to full platforms.',
  },
  'saas-application-development': {
    icon: FiLayers,
    group: 'build',
    blurb: 'Auth, billing, dashboards and APIs: SaaS products built to scale.',
  },
  'shopify-ecommerce-development': {
    icon: FiShoppingCart,
    group: 'build',
    blurb: 'Shopify and custom storefronts that load fast and convert.',
  },
  'ai-solutions-automation': {
    icon: FiCpu,
    group: 'ai',
    wide: true,
    blurb: 'Automate repetitive work with AI that plugs into the tools you already use.',
  },
  'chatbots-ai-agents': {
    icon: FiMessageSquare,
    group: 'ai',
    blurb: 'Assistants and agents that answer customers and handle tasks around the clock.',
  },
  'digital-marketing-services': {
    icon: FiTrendingUp,
    group: 'growth',
    blurb: 'Performance campaigns across search, social and display, measured end to end.',
  },
  'seo-services': {
    icon: FiSearch,
    group: 'growth',
    blurb: 'Technical, on-page and content SEO that grows organic traffic.',
  },
  'geo-aeo-ai-search-optimization': {
    icon: FiAperture,
    group: 'growth',
    wide: true,
    blurb: 'Get your brand cited in AI assistants and AI search results, not just ranked on Google.',
  },
  'social-media-marketing': {
    icon: FiShare2,
    group: 'growth',
    wide: true,
    blurb: 'Content, community and paid social that builds an audience around your brand.',
  },
  'cloud-devops-solutions': {
    icon: FiCloud,
    group: 'cloud',
    wide: true,
    blurb: 'CI/CD, containers and cloud infrastructure that keep you shipping safely.',
  },
}

const FALLBACK = { icon: FiCode, group: 'build' as Group, blurb: 'Find out more.' }

/** the small live illustration for a group */
function Viz({ group }: { group: Group }) {
  if (group === 'build')
    return (
      <span className="sv-viz sv-viz--build">
        <span className="sv-viz__dots">
          <i />
          <i />
          <i />
        </span>
        <span className="sv-viz__code">
          <i />
          <i />
          <i />
          <i />
        </span>
      </span>
    )
  if (group === 'ai')
    return (
      <span className="sv-viz sv-viz--ai">
        <i />
        <i />
        <i />
        <b />
        <em />
      </span>
    )
  if (group === 'growth')
    return (
      <span className="sv-viz sv-viz--growth">
        <i />
        <i />
        <i />
        <i />
        <i />
      </span>
    )
  return (
    <span className="sv-viz sv-viz--cloud">
      <i />
      <i />
      <i />
      <b />
    </span>
  )
}

export default function ServicesBento({ services }: { services: ServicePage[] }) {
  const [focus, setFocus] = useState<Group | null>(null)
  const [pinned, setPinned] = useState<Group | null>(null)
  const [seen, setSeen] = useState(false)
  const [armed, setArmed] = useState(false)
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    setArmed(true)
    const el = root.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true)
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -15% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const active = focus ?? pinned
  const items = services.map((s) => ({ ...s, ...(META[s.slug] ?? FALLBACK) }))
  const count = (g: Group) => items.filter((s) => s.group === g).length

  return (
    <section
      className={`section sv${armed ? ' is-armed' : ''}${seen ? ' is-in' : ''}${active ? ' has-focus' : ''}`}
      id="services"
      ref={root}
    >
      <div className="sv__bg" aria-hidden />
      <div className="shell">
        <div className="sv__head">
          <div>
            <span className="eyebrow">
              <span className="eyebrow__dot">✦</span>
              What we build
            </span>
            <h2 className="sv__title">
              One team for your product, <span className="sv__hl">your AI and your growth</span>
            </h2>
          </div>

          <div className="sv__legend" role="group" aria-label="Highlight a group of services">
            {GROUPS.map((g) => (
              <button
                key={g.key}
                type="button"
                className="sv__key"
                style={{ '--ac': g.ac, '--ac2': g.ac2 } as CSSProperties}
                aria-pressed={pinned === g.key}
                data-on={active === g.key || undefined}
                onMouseEnter={() => setFocus(g.key)}
                onMouseLeave={() => setFocus(null)}
                onClick={() => setPinned((p) => (p === g.key ? null : g.key))}
              >
                <i aria-hidden />
                {g.label}
                <small>{count(g.key)}</small>
              </button>
            ))}
          </div>
        </div>

        <ul className="sv__grid">
          {items.map(({ slug, label, href, icon: Icon, group, blurb, wide }, i) => {
            const g = GROUPS.find((x) => x.key === group)!
            return (
              <li
                key={slug}
                className={`${wide ? 'is-wide' : ''}${active && active !== group ? ' is-dim' : ''}`}
                style={{ '--i': i, '--ac': g.ac, '--ac2': g.ac2 } as CSSProperties}
              >
                <Link href={href} className="sv-card">
                  <span className="sv-card__viz" aria-hidden>
                    <Viz group={group} />
                    <span className="sv-card__icon">
                      <Icon />
                    </span>
                  </span>
                  <span className="sv-card__body">
                    <em>{g.label}</em>
                    <h3>{label}</h3>
                    <p>{blurb}</p>
                    <span className="sv-card__go">
                      Explore <FiArrowUpRight aria-hidden />
                    </span>
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
